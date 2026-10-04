<?php
/**
 * Matrice des distances à pied entre les points d'un parc (allées OpenStreetMap).
 *
 * Usage :
 *   php tools/walk-matrix.php --park-id=<id themeparks.wiki> --bbox=sud,ouest,nord,est \
 *       --entrance=lat,lon [--out=www/parks/<slug>.walk.json] [--access=auto|all|public]
 *       [--osm-cache=fichier.json]
 *
 * Étapes :
 *   1. points du parc : enfants themeparks.wiki ayant des coordonnées, dans la bbox ;
 *   2. allées : chemins piétons et routes de service OSM dans la bbox (Overpass) ;
 *      les places piétonnes (area=yes) se traversent en ligne droite entre sommets visibles ;
 *   3. graphe non orienté pondéré en mètres, plus grande composante connexe ;
 *      les files d'attente (footway=queue, « Warteschlange »…) sont ignorées ;
 *   4. chaque point est rattaché aux nœuds les plus proches (au-delà de 250 m : vol d'oiseau × 1,35) ;
 *   5. Dijkstra depuis chaque point → matrice symétrique en mètres entiers.
 *
 * --access : auto (défaut) écarte les voies access=private|no sauf si ça éloigne un point
 *            de son allée ; all les garde toujours ; public les écarte toujours.
 *
 * --osm-cache : réponse Overpass gardée dans ce fichier et relue ensuite (essais sans réinterroger).
 *
 * Sortie : {"generated","source","ids":["entrance",...],"m":[[...],...]} (JSON compact).
 * Résumé sur la sortie d'erreur. Compatible PHP 7.4+ (curl, json).
 */

declare(strict_types=1);

const OVERPASS   = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
const HIGHWAYS   = 'footway|path|pedestrian|steps|living_street|service|track|residential|unclassified|cycleway|corridor';
const MAX_SNAP   = 250;  // m — au-delà, vol d'oiseau × DETOUR pour ce point
const DETOUR     = 1.35; // facteur des allées quand on n'a pas de chemin
const SEG_MAX    = 15;   // m — on découpe les segments plus longs (meilleur rattachement)
const SNAP_SLACK = 30;   // m — mode auto : écart de rattachement toléré sans les voies privées
const SNAP_BAND  = 25;   // m — nœuds de rattachement : jusqu'au plus proche + SNAP_BAND
const SNAP_MAX_NODES = 60;
const QUEUE      = '/warteschlange|\bqueue\b|file d.attente/i'; // files d'attente : pas des allées
const UA         = 'europapark-live/walk-matrix (appli auto-hébergée)';

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

/* ---------- Arguments ---------- */
$o = getopt('', ['park-id:', 'bbox:', 'entrance:', 'out:', 'access:', 'osm-cache:']);
if (empty($o['park-id']) || empty($o['bbox']) || empty($o['entrance'])) {
    fail("arguments manquants.\nUsage : php tools/walk-matrix.php --park-id=ID --bbox=sud,ouest,nord,est --entrance=lat,lon [--out=fichier.json] [--access=auto|all|public] [--osm-cache=fichier.json]");
}
$bbox = array_map('floatval', explode(',', $o['bbox']));
$ent = array_map('floatval', explode(',', $o['entrance']));
if (count($bbox) !== 4 || count($ent) !== 2) fail('--bbox attend 4 nombres, --entrance 2.');
[$S, $W, $N, $E] = $bbox;
$access = $o['access'] ?? 'auto';
if (!in_array($access, ['auto', 'all', 'public'], true)) fail('--access : auto, all ou public.');
$inBox = function (float $la, float $lo) use ($S, $W, $N, $E): bool { return $la >= $S && $la <= $N && $lo >= $W && $lo <= $E; };

/* ---------- 1. Points du parc ---------- */
try {
    $kids = json_decode(http('https://api.themeparks.wiki/v1/entity/' . rawurlencode($o['park-id']) . '/children'), true);
} catch (RuntimeException $e) { fail('themeparks.wiki : ' . $e->getMessage()); }
$pts = ['entrance' => [$ent[0], $ent[1]]];
$outside = 0;
foreach ($kids['children'] ?? [] as $c) {
    $la = $c['location']['latitude'] ?? null; $lo = $c['location']['longitude'] ?? null;
    if ($la === null || $lo === null) continue;
    if (!$inBox((float) $la, (float) $lo)) { $outside++; continue; }
    $pts[$c['id']] = [(float) $la, (float) $lo];
}
info(sprintf('Points : %d (entrée comprise), %d hors bbox ignorés', count($pts), $outside));
if (count($pts) < 2) fail('aucun point dans la bbox.');

/* ---------- 2. Allées OSM ---------- */
$bb = "$S,$W,$N,$E";
$q = "[out:json][timeout:120];(way[\"highway\"~\"^(" . HIGHWAYS . ")$\"]($bb);way[\"area:highway\"~\"^(" . HIGHWAYS . ")$\"]($bb););out body;>;out skel qt;";
$cache = $o['osm-cache'] ?? null;
$osm = $cache && is_file($cache) ? json_decode((string) file_get_contents($cache), true) : null;
if ($osm) info("Allées lues depuis $cache");
else foreach (OVERPASS as $url) {
    try { $osm = json_decode(http($url, 'data=' . rawurlencode($q)), true); if (isset($osm['elements'])) break; }
    catch (RuntimeException $e) { info('Overpass indisponible : ' . $e->getMessage()); }
    $osm = null;
}
if (!$osm) fail('aucun serveur Overpass n\'a répondu.');
if ($cache && !is_file($cache)) file_put_contents($cache, json_encode($osm));
$coord = []; $ways = [];
foreach ($osm['elements'] as $el) {
    if ($el['type'] === 'node') $coord[$el['id']] = [(float) $el['lat'], (float) $el['lon']];
    elseif ($el['type'] === 'way') $ways[] = $el;
}
$isPrivate = function (array $t): bool {
    if (in_array($t['foot'] ?? '', ['yes', 'designated', 'permissive', 'customers'], true)) return false;
    return in_array($t['access'] ?? '', ['private', 'no'], true) || ($t['foot'] ?? '') === 'no';
};

/* ---------- 3. Graphe ---------- */
// Point dans un polygone (anneau de [lat, lon]).
function inPoly(float $la, float $lo, array $ring): bool {
    $in = false; $n = count($ring);
    for ($i = 0, $j = $n - 1; $i < $n; $j = $i++) {
        [$ai, $oi] = $ring[$i]; [$aj, $oj] = $ring[$j];
        if (($ai > $la) !== ($aj > $la) && $lo < ($oj - $oi) * ($la - $ai) / ($aj - $ai) + $oi) $in = !$in;
    }
    return $in;
}
// Le segment p-q reste-t-il dans le polygone (ne coupe aucun bord, milieu à l'intérieur) ?
function visible(array $p, array $q, array $ring): bool {
    $cross = function (array $a, array $b, array $c): float { return ($b[0] - $a[0]) * ($c[1] - $a[1]) - ($b[1] - $a[1]) * ($c[0] - $a[0]); };
    $n = count($ring);
    for ($i = 0, $j = $n - 1; $i < $n; $j = $i++) {
        $a = $ring[$j]; $b = $ring[$i];
        if ($a == $p || $a == $q || $b == $p || $b == $q) continue;
        $d1 = $cross($p, $q, $a); $d2 = $cross($p, $q, $b); $d3 = $cross($a, $b, $p); $d4 = $cross($a, $b, $q);
        if ((($d1 > 0 && $d2 < 0) || ($d1 < 0 && $d2 > 0)) && (($d3 > 0 && $d4 < 0) || ($d3 < 0 && $d4 > 0))) return false;
    }
    return inPoly(($p[0] + $q[0]) / 2, ($p[1] + $q[1]) / 2, $ring);
}

function buildGraph(array $ways, array $coord, bool $withPrivate, callable $isPrivate): array {
    $pos = []; $adj = []; $next = -1;
    $addEdge = function ($a, $b, float $w) use (&$adj): void {
        if ($a === $b) return;
        if (!isset($adj[$a][$b]) || $adj[$a][$b] > $w) { $adj[$a][$b] = $w; $adj[$b][$a] = $w; }
    };
    $areas = [];
    foreach ($ways as $w) {
        $t = $w['tags'] ?? [];
        if (!$withPrivate && $isPrivate($t)) continue;
        if (($t['footway'] ?? '') === 'queue' || preg_match(QUEUE, ($t['name'] ?? '') . ' ' . ($t['description'] ?? '') . ' ' . ($t['note'] ?? ''))) continue;
        $nds = array_values(array_filter($w['nodes'], function ($id) use ($coord) { return isset($coord[$id]); }));
        if (count($nds) < 2) continue;
        foreach ($nds as $id) $pos[$id] = $coord[$id];
        $closed = $w['nodes'][0] === end($w['nodes']);
        if ($closed && (($t['area'] ?? '') === 'yes' || isset($t['area:highway'])) && count($nds) >= 4) $areas[] = array_slice($nds, 0, -1);
        for ($i = 1; $i < count($nds); $i++) {
            [$la1, $lo1] = $coord[$nds[$i - 1]]; [$la2, $lo2] = $coord[$nds[$i]];
            $d = hav($la1, $lo1, $la2, $lo2);
            $k = (int) ceil($d / SEG_MAX);
            $prev = $nds[$i - 1];
            for ($s = 1; $s < $k; $s++) { // nœuds intermédiaires
                $pos[$next] = [$la1 + ($la2 - $la1) * $s / $k, $lo1 + ($lo2 - $lo1) * $s / $k];
                $addEdge($prev, $next, $d / $k); $prev = $next--;
            }
            $addEdge($prev, $nds[$i], $k > 1 ? $d / $k : $d);
        }
    }
    // Places piétonnes : on relie les sommets qui se voient, et les bouts d'allées à l'intérieur.
    foreach ($areas as $ids) {
        $ring = array_map(function ($id) use ($coord) { return $coord[$id]; }, $ids);
        $las = array_column($ring, 0); $los = array_column($ring, 1);
        [$a0, $a1, $o0, $o1] = [min($las), max($las), min($los), max($los)];
        $inner = [];
        foreach ($adj as $id => $nb) {
            if (count($nb) !== 1 || in_array($id, $ids, true)) continue;
            [$la, $lo] = $pos[$id];
            if ($la >= $a0 && $la <= $a1 && $lo >= $o0 && $lo <= $o1 && inPoly($la, $lo, $ring)) $inner[] = $id;
        }
        $all = array_merge($ids, $inner);
        $n = count($all);
        for ($i = 0; $i < $n; $i++) for ($j = $i + 1; $j < $n; $j++) {
            $p = $pos[$all[$i]]; $q = $pos[$all[$j]];
            if ($j === $i + 1 && $j < count($ids)) continue; // bord déjà présent
            if (visible($p, $q, $ring)) $addEdge($all[$i], $all[$j], hav($p[0], $p[1], $q[0], $q[1]));
        }
    }
    // Plus grande composante connexe.
    $comp = []; $best = [];
    foreach (array_keys($adj) as $s) {
        if (isset($comp[$s])) continue;
        $stack = [$s]; $comp[$s] = true; $cur = [];
        while ($stack) { $u = array_pop($stack); $cur[] = $u; foreach ($adj[$u] as $v => $_) if (!isset($comp[$v])) { $comp[$v] = true; $stack[] = $v; } }
        if (count($cur) > count($best)) $best = $cur;
    }
    $keep = array_flip($best);
    $adj = array_intersect_key($adj, $keep);
    $edges = 0; foreach ($adj as $nb) $edges += count($nb);
    return ['adj' => $adj, 'pos' => array_intersect_key($pos, $keep), 'edges' => $edges / 2, 'areas' => count($areas)];
}

// Rattachement : [distance au nœud le plus proche, [nœud => distance]] avec tous les nœuds à moins
// de SNAP_BAND m de plus que le plus proche (on n'entre pas forcément par l'allée la plus proche :
// file d'attente, bassin…).
function snapAll(array $g, array $pts): array {
    $snap = [];
    foreach ($pts as $id => [$la, $lo]) {
        $near = [];
        foreach ($g['pos'] as $n => [$a, $b]) {
            if (abs($a - $la) > 0.004 || abs($b - $lo) > 0.006) continue; // ~450 m
            $near[$n] = hav($la, $lo, $a, $b);
        }
        asort($near);
        $min = $near ? reset($near) : INF;
        $snap[$id] = [$min, array_slice(array_filter($near, function ($d) use ($min) { return $d <= $min + SNAP_BAND; }), 0, SNAP_MAX_NODES, true)];
    }
    return $snap;
}

$full = buildGraph($ways, $coord, true, $isPrivate);
$snapFull = snapAll($full, $pts);
$g = $full; $snap = $snapFull; $mode = 'toutes les voies';
if ($access !== 'all') {
    $pub = buildGraph($ways, $coord, false, $isPrivate);
    $snapPub = snapAll($pub, $pts);
    $worse = [];
    foreach ($pts as $id => $_) if ($snapPub[$id][0] > $snapFull[$id][0] + SNAP_SLACK) $worse[] = $id;
    if ($access === 'public' || !$worse) { $g = $pub; $snap = $snapPub; $mode = 'sans access=private|no'; }
    else info(sprintf('Voies privées conservées : %d point(s) s\'éloignent de plus de %d m sans elles (%s)', count($worse), SNAP_SLACK, implode(', ', array_slice($worse, 0, 5))));
}
info(sprintf('Graphe (%s) : %d nœuds, %d arêtes, %d places piétonnes, %d voies OSM', $mode, count($g['adj']), $g['edges'], $g['areas'], count($ways)));

$maxSnap = 0.0; $far = [];
foreach ($snap as $id => [$d]) {
    if ($d > MAX_SNAP) { $far[] = $id; continue; }
    $maxSnap = max($maxSnap, $d);
}
info(sprintf('Rattachés : %d/%d, rattachement max %.0f m%s', count($pts) - count($far), count($pts), $maxSnap,
    $far ? ' ; à vol d\'oiseau : ' . implode(', ', $far) : ''));

/* ---------- 4. Dijkstra ---------- */
// Plus courts chemins depuis plusieurs nœuds de départ [nœud => distance initiale].
function dijkstra(array $adj, array $src): array {
    $dist = $src; $done = [];
    $pq = new SplPriorityQueue(); $pq->setExtractFlags(SplPriorityQueue::EXTR_BOTH);
    foreach ($src as $u => $d) $pq->insert($u, -$d);
    while (!$pq->isEmpty()) {
        ['data' => $u, 'priority' => $p] = $pq->extract();
        if (isset($done[$u])) continue;
        $done[$u] = true; $du = -$p;
        foreach ($adj[$u] as $v => $w) {
            $nd = $du + $w;
            if (!isset($dist[$v]) || $nd < $dist[$v]) { $dist[$v] = $nd; $pq->insert($v, -$nd); }
        }
    }
    return $dist;
}

$ids = array_keys($pts);
$n = count($ids);
$m = array_fill(0, $n, array_fill(0, $n, 0));
$ratios = [];
for ($i = 0; $i < $n; $i++) {
    $di = $snap[$ids[$i]][0] <= MAX_SNAP ? dijkstra($g['adj'], $snap[$ids[$i]][1]) : [];
    for ($j = $i + 1; $j < $n; $j++) {
        $line = hav($pts[$ids[$i]][0], $pts[$ids[$i]][1], $pts[$ids[$j]][0], $pts[$ids[$j]][1]);
        $d = INF;
        if ($di && $snap[$ids[$j]][0] <= MAX_SNAP) foreach ($snap[$ids[$j]][1] as $v => $sv) if (isset($di[$v])) $d = min($d, $di[$v] + $sv);
        $d = max(is_finite($d) ? $d : $line * DETOUR, $line);
        if ($line > 100) $ratios[] = $d / $line;
        $m[$i][$j] = $m[$j][$i] = (int) round($d);
    }
}

sort($ratios);
$pct = function (float $p) use ($ratios): float { return $ratios ? $ratios[(int) min(count($ratios) - 1, floor($p * count($ratios)))] : 0.0; };
info(sprintf('Rapport chemin / vol d\'oiseau (%d paires > 100 m) : médiane %.2f, p90 %.2f, min %.2f, max %.2f',
    count($ratios), $pct(0.5), $pct(0.9), $ratios[0] ?? 0, end($ratios) ?: 0));

/* ---------- 5. Sortie ---------- */
$json = json_encode(['generated' => gmdate('c'), 'source' => 'OpenStreetMap contributors (ODbL)', 'ids' => $ids, 'm' => $m], JSON_UNESCAPED_SLASHES);
if (!empty($o['out'])) {
    $dir = dirname($o['out']);
    if (!is_dir($dir) && !mkdir($dir, 0755, true)) fail("impossible de créer $dir");
    if (file_put_contents($o['out'], $json) === false) fail("écriture impossible : {$o['out']}");
    info(sprintf('Écrit : %s (%d Ko%s)', $o['out'], round(strlen($json) / 1024), function_exists('gzencode') ? sprintf(', %d Ko gzip', round(strlen(gzencode($json, 9)) / 1024)) : ''));
} else {
    echo $json, "\n";
}
