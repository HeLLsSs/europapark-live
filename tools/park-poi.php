<?php
/**
 * Points d'intérêt pratiques d'un parc (OpenStreetMap) : toilettes, eau, casiers, secours…
 *
 * Usage :
 *   php tools/park-poi.php --bbox=sud,ouest,nord,est [--out=www/parks/<slug>.poi.json]
 *       [--osm-cache=fichier.json]
 *
 * Types (champ "t") :
 *   toilets  amenity=toilets (changing_table=yes → "baby":true sur l'entrée)
 *   water    amenity=drinking_water|water_point, ou drinking_water=yes (fontaines…)
 *   lockers  amenity=locker|luggage_locker|lockers, vending=*locker*, shop=lockers
 *   firstaid amenity=first_aid|doctors|clinic, healthcare=first_aid|doctor|clinic, emergency=first_aid
 *            (postes de secours ; ni pharmacies, ni trousses, ni défibrillateurs)
 *   atm      amenity=atm (ou banque avec atm=yes)
 *   baby     amenity=baby_changing|changing_table, ou changing_table=yes hors toilettes
 *   parking  amenity=parking dans la bbox élargie de PARK_MARGIN (parkings visiteurs, nom/ref)
 *   exit     entrées/sorties du parc (au mieux) : nœuds entrance=* ou tourniquets/portails sur le
 *            contour tourism=theme_park, ou nommés « Eingang », « Ausgang », « Tor »… ; hors
 *            entrées d'attractions et portes de secours verrouillées
 *
 * Hors parkings, seuls les points dans le contour tourism=theme_park (à IN_PARK m près) sont
 * gardés : la bbox déborde souvent sur le village voisin. Sans contour, toute la bbox compte.
 *
 * Les points réservés au personnel (access=private|no|staff…) sont écartés, sauf pour un type
 * qui n'aurait rien d'autre. Doublons (même type à moins de DEDUP m) fusionnés.
 *
 * --osm-cache : réponse Overpass gardée dans ce fichier et relue ensuite (essais sans réinterroger).
 *
 * Sortie : {"generated","source","poi":[{"t","lat","lon","name"?,"ref"?,"wheelchair"?,"baby"?},...]}
 * (JSON compact, champs nuls omis). Résumé sur la sortie d'erreur. Compatible PHP 7.4+ (curl, json).
 */

declare(strict_types=1);

const OVERPASS    = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
const TYPES       = ['toilets', 'water', 'lockers', 'firstaid', 'atm', 'baby', 'parking', 'exit'];
const PARK_MARGIN = 1200; // m — élargissement de la bbox pour les parkings visiteurs
const DEDUP       = 15;   // m — même type plus proche : doublon
const ON_EDGE     = 12;   // m — nœud entrance=* considéré sur le contour du parc
const IN_PARK     = 40;   // m — tolérance hors contour (parvis, consignes à l'entrée)
const STAFF       = ['private', 'no', 'staff', 'employees', 'delivery'];
const GATE_NAME   = '/eingang|ausgang|entr[ée]e|sortie|entrance|\bexit\b|\btor\b|\bgate\b|portail/i';
const UA          = 'europapark-live/park-poi (appli auto-hébergée)';

function fail(string $msg): void { fwrite(STDERR, "Erreur : $msg\n"); exit(1); }
function info(string $msg): void { fwrite(STDERR, $msg . "\n"); }

function http(string $url, ?string $post = null): string {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true, CURLOPT_TIMEOUT => 180,
        CURLOPT_USERAGENT => UA, CURLOPT_HTTPHEADER => ['Accept: application/json'],
    ]);
    if ($post !== null) curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_POSTFIELDS => $post]);
    $body = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    if ($body === false || $code !== 200) throw new RuntimeException("$url → HTTP $code $err");
    return (string) $body;
}

function hav(float $la1, float $lo1, float $la2, float $lo2): float {
    $t = M_PI / 180;
    $x = sin(($la2 - $la1) * $t / 2) ** 2 + cos($la1 * $t) * cos($la2 * $t) * sin(($lo2 - $lo1) * $t / 2) ** 2;
    return 2 * 6371000 * asin(min(1.0, sqrt($x)));
}

// Distance en mètres d'un point au segment a-b (projection plane locale, suffisante à cette échelle).
function segDist(float $la, float $lo, array $a, array $b): float {
    $k = cos($la * M_PI / 180);
    $ax = ($a[1] - $lo) * $k; $ay = $a[0] - $la; $bx = ($b[1] - $lo) * $k; $by = $b[0] - $la;
    $dx = $bx - $ax; $dy = $by - $ay; $l2 = $dx * $dx + $dy * $dy;
    $u = $l2 > 0 ? max(0.0, min(1.0, -($ax * $dx + $ay * $dy) / $l2)) : 0.0;
    return hypot($ax + $u * $dx, $ay + $u * $dy) * 111195;
}

/* ---------- Arguments ---------- */
$o = getopt('', ['bbox:', 'out:', 'osm-cache:']);
if (empty($o['bbox'])) {
    fail("arguments manquants.\nUsage : php tools/park-poi.php --bbox=sud,ouest,nord,est [--out=fichier.json] [--osm-cache=fichier.json]");
}
$bbox = array_map('floatval', explode(',', $o['bbox']));
if (count($bbox) !== 4) fail('--bbox attend 4 nombres.');
[$S, $W, $N, $E] = $bbox;
if ($S >= $N || $W >= $E) fail('--bbox : sud < nord et ouest < est.');
$dLa = PARK_MARGIN / 111195; $dLo = $dLa / cos(($S + $N) / 2 * M_PI / 180);
$bb = "$S,$W,$N,$E";
$pb = sprintf('%.5f,%.5f,%.5f,%.5f', $S - $dLa, $W - $dLo, $N + $dLa, $E + $dLo);

/* ---------- Requête Overpass ---------- */
$q = "[out:json][timeout:120];("
    . "nwr[\"amenity\"~\"^(toilets|drinking_water|water_point|atm|locker|luggage_locker|lockers|first_aid|doctors|clinic|baby_changing|changing_table)$\"]($bb);"
    . "nwr[\"amenity\"=\"bank\"][\"atm\"=\"yes\"]($bb);"
    . "nwr[\"drinking_water\"=\"yes\"]($bb);"
    . "nwr[\"vending\"~\"locker\"]($bb);"
    . "nwr[\"shop\"=\"lockers\"]($bb);"
    . "nwr[\"healthcare\"~\"^(first_aid|doctor|clinic)$\"]($bb);"
    . "nwr[\"emergency\"=\"first_aid\"]($bb);"
    . "nwr[\"changing_table\"=\"yes\"]($bb);"
    . "node[\"entrance\"]($bb);"
    . "node[\"barrier\"~\"^(turnstile|full-height_turnstile|gate|entrance)$\"]($bb);"
    . "nwr[\"amenity\"=\"parking\"]($pb);"
    . ")->.p;.p out center tags;"
    . "nwr[\"tourism\"=\"theme_park\"]($bb)->.tp;.tp out geom tags;";
$cache = $o['osm-cache'] ?? null;
$osm = $cache && is_file($cache) ? json_decode((string) file_get_contents($cache), true) : null;
if ($osm) info("Données OSM lues depuis $cache");
else foreach (OVERPASS as $url) {
    try { $osm = json_decode(http($url, 'data=' . rawurlencode($q)), true); if (isset($osm['elements'])) break; }
    catch (RuntimeException $e) { info('Overpass indisponible : ' . $e->getMessage()); }
    $osm = null;
}
if (!$osm) fail('aucun serveur Overpass n\'a répondu.');
if ($cache && !is_file($cache)) file_put_contents($cache, json_encode($osm));

/* ---------- Contour du parc ---------- */
// Parcs tourism=theme_park dont le centre (moyenne des sommets) est dans la bbox : pas le voisin qui la touche.
$edges = []; $parks = [];
foreach ($osm['elements'] as $el) {
    if (($el['tags']['tourism'] ?? '') !== 'theme_park') continue;
    $rings = $el['type'] === 'way' ? [$el['geometry'] ?? []] : array_map(function ($m) { return $m['geometry'] ?? []; }, $el['members'] ?? []);
    $pts = array_merge(...array_values($rings ?: [[]]));
    if (!$pts) continue;
    $cLa = array_sum(array_column($pts, 'lat')) / count($pts); $cLo = array_sum(array_column($pts, 'lon')) / count($pts);
    if ($cLa < $S || $cLa > $N || $cLo < $W || $cLo > $E) continue;
    $parks[] = $el['tags']['name'] ?? $el['type'] . $el['id'];
    foreach ($rings as $ring) for ($i = 1, $n = count($ring); $i < $n; $i++) {
        $edges[] = [[(float) $ring[$i - 1]['lat'], (float) $ring[$i - 1]['lon']], [(float) $ring[$i]['lat'], (float) $ring[$i]['lon']]];
    }
}
$edgeDist = function (float $la, float $lo) use ($edges): float {
    $d = INF;
    foreach ($edges as [$a, $b]) $d = min($d, segDist($la, $lo, $a, $b));
    return $d;
};
// Règle pair-impair sur tous les bords : valable aussi pour un multipolygone non assemblé.
$inPoly = function (float $la, float $lo) use ($edges): bool {
    $in = false;
    foreach ($edges as [[$ai, $oi], [$aj, $oj]]) {
        if (($ai > $la) !== ($aj > $la) && $lo < ($oj - $oi) * ($la - $ai) / ($aj - $ai) + $oi) $in = !$in;
    }
    return $in;
};

/* ---------- Classement ---------- */
$yesNo = function (?string $v): ?bool { return in_array($v, ['yes', 'designated'], true) ? true : (in_array($v, ['no'], true) ? false : null); };
$cand = array_fill_keys(TYPES, []); // type => [[poi, privé], ...]
foreach ($osm['elements'] as $el) {
    $t = $el['tags'] ?? [];
    if (($t['tourism'] ?? '') === 'theme_park') continue;
    $la = $el['lat'] ?? $el['center']['lat'] ?? null; $lo = $el['lon'] ?? $el['center']['lon'] ?? null;
    if ($la === null || $lo === null) continue;
    $la = (float) $la; $lo = (float) $lo;
    $inPark = $la >= $S && $la <= $N && $lo >= $W && $lo <= $E && (!$edges || $inPoly($la, $lo) || $edgeDist($la, $lo) <= IN_PARK);
    $a = $t['amenity'] ?? '';
    $types = [];
    if ($a === 'toilets') $types[] = 'toilets';
    if (in_array($a, ['drinking_water', 'water_point'], true) || ($t['drinking_water'] ?? '') === 'yes') $types[] = 'water';
    if (in_array($a, ['locker', 'luggage_locker', 'lockers'], true) || stripos($t['vending'] ?? '', 'locker') !== false || ($t['shop'] ?? '') === 'lockers') $types[] = 'lockers';
    if (in_array($a, ['first_aid', 'doctors', 'clinic'], true) || in_array($t['healthcare'] ?? '', ['first_aid', 'doctor', 'clinic'], true) || ($t['emergency'] ?? '') === 'first_aid') $types[] = 'firstaid';
    if ($a === 'atm' || ($a === 'bank' && ($t['atm'] ?? '') === 'yes')) $types[] = 'atm';
    if (in_array($a, ['baby_changing', 'changing_table'], true) || (($t['changing_table'] ?? '') === 'yes' && $a !== 'toilets')) $types[] = 'baby';
    if ($a === 'parking') $types[] = 'parking';
    // Portails simples : seulement nommés ou ouverts aux piétons (sinon souvent des accès de service).
    $gate = $el['type'] === 'node' && !isset($t['attraction']) && !isset($t['roller_coaster'])
        && (isset($t['entrance']) || in_array($t['barrier'] ?? '', ['turnstile', 'full-height_turnstile', 'entrance'], true)
            || isset($t['name']) || in_array($t['foot'] ?? '', ['yes', 'designated', 'permissive'], true))
        && ($t['entrance'] ?? '') !== 'emergency' && ($t['locked'] ?? '') !== 'yes';
    if ($gate && (($edges && $edgeDist($la, $lo) <= ON_EDGE) || preg_match(GATE_NAME, ($t['name'] ?? '') . ' ' . ($t['alt_name'] ?? '')))) $types[] = 'exit';
    foreach (array_unique($types) as $type) {
        if ($type !== 'parking' && !$inPark) continue;
        // Parkings : ni stationnement en bord de rue, ni petits parkings, ni parkings de bus.
        if ($type === 'parking' && (in_array($t['parking'] ?? '', ['street_side', 'lane', 'layby', 'on_kerb'], true)
            || (isset($t['capacity']) && (int) $t['capacity'] < 20) || !in_array($t['access'] ?? 'yes', array_merge(['yes', 'customers', 'permissive', 'public', 'destination'], STAFF), true))) continue;
        $p = ['t' => $type, 'lat' => round($la, 6), 'lon' => round($lo, 6),
            'name' => $t['name'] ?? (['parking' => $t['operator'] ?? null, 'exit' => $t['alt_name'] ?? null][$type] ?? null),
            'ref' => $type === 'parking' || $type === 'exit' ? ($t['ref'] ?? null) : null,
            'wheelchair' => $yesNo($t['wheelchair'] ?? null),
            'baby' => $type === 'toilets' && ($t['changing_table'] ?? '') === 'yes' ? true : null];
        $private = in_array($t['access'] ?? '', STAFF, true) || in_array($t['toilets:access'] ?? '', STAFF, true);
        $cand[$type][] = [array_filter($p, function ($v) { return $v !== null; }), $private];
    }
}

/* ---------- Filtre personnel, doublons, sortie ---------- */
$poi = []; $stats = [];
foreach (TYPES as $type) {
    $public = array_values(array_filter($cand[$type], function ($c) { return !$c[1]; }));
    $list = array_column($public ?: $cand[$type], 0);
    $staffOnly = !$public && $cand[$type];
    $kept = [];
    foreach ($list as $p) {
        foreach ($kept as &$k) if (hav($k['lat'], $k['lon'], $p['lat'], $p['lon']) < DEDUP) { $k += $p; continue 2; }
        unset($k);
        $kept[] = $p;
    }
    unset($k);
    $stats[$type] = [count($kept), count($cand[$type]) - count($public), $staffOnly];
    array_push($poi, ...$kept);
}

foreach ($stats as $type => [$n, $priv, $staffOnly]) {
    info(sprintf('%-9s %3d%s%s', $type, $n, $priv ? " ($priv réservés au personnel " . ($staffOnly ? 'gardés faute de mieux' : 'écartés') . ')' : '',
        $n ? '' : '  ⚠ aucun résultat dans OSM'));
}
info(sprintf('Toilettes avec table à langer ("baby":true) : %d', count(array_filter($poi, function ($p) { return isset($p['baby']); }))));
info($edges ? 'Contour du parc : ' . implode(', ', $parks) . ' (' . count($edges) . ' segments)' : 'Contour tourism=theme_park introuvable : toute la bbox compte, entrées par nom seulement');

$json = json_encode(['generated' => gmdate('c'), 'source' => 'OpenStreetMap contributors (ODbL)', 'poi' => $poi], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
if (!empty($o['out'])) {
    $dir = dirname($o['out']);
    if (!is_dir($dir) && !mkdir($dir, 0755, true)) fail("impossible de créer $dir");
    if (file_put_contents($o['out'], $json) === false) fail("écriture impossible : {$o['out']}");
    info(sprintf('Écrit : %s (%d points, %.1f Ko%s)', $o['out'], count($poi), strlen($json) / 1024, function_exists('gzencode') ? sprintf(', %.1f Ko gzip', strlen(gzencode($json, 9)) / 1024) : ''));
} else {
    echo $json, "\n";
}
