<?php
/**
 * Europa-Park — relais des temps d'attente (source : api.themeparks.wiki)
 *
 * Routes (?r=...) :
 *   bundle      temps d'attente en direct + statistiques + météo (ce qu'appelle la page)
 *               &u=ID&since=ms : ajoute le profil (état synchronisé s'il est plus récent que since)
 *   live        temps d'attente en direct (JSON amont)
 *   children    liste des attractions / spectacles / restos avec coordonnées GPS
 *   schedule    horaires d'ouverture
 *   weather     prévisions Open-Meteo (JSON amont)
 *   calendar    affluence moyenne des jours passés (11 h – 16 h)
 *   users       liste des profils
 *   user        POST {name} : crée un profil
 *   state       GET / POST &u=ID : état synchronisé du profil (le plus récent gagne)
 *   push-key    clé publique VAPID pour s'abonner aux notifications
 *   push-sub    POST &u=ID : enregistre l'abonnement push du téléphone
 *   push-unsub  POST &u=ID : supprime un abonnement push
 *   push-test   POST &u=ID : envoie une notification de test
 *   collect     force une collecte + alertes push (pour le cron) — aussi en CLI : php api.php collect
 *   health      état du cache et de l'historique
 *
 * Données écrites dans ./data (à rendre inaccessible depuis le web, voir README).
 * Compatible PHP 7.4+. Utilisable comme bibliothèque (tests) : define('EP_LIB', true) avant require.
 */

declare(strict_types=1);

const PARK_ID       = '639738d3-9574-4f60-ab5b-4c392901320b'; // Europa-Park (themeparks.wiki)
const TZ            = 'Europe/Berlin';
const TTL_LIVE      = 60;      // s — cache des temps d'attente
const TTL_CHILDREN  = 86400;   // s — liste des attractions
const TTL_SCHEDULE  = 21600;   // s — horaires
const TTL_WEATHER   = 1800;    // s — prévisions météo
const WEATHER_RETRY = 300;     // s — pause après un échec de la météo
const SNAPSHOT_GAP  = 240;     // s — un point d'historique toutes les 4 min max
const KEEP_DAYS     = 45;      // jours d'historique conservés
const PROFILE_DAYS  = 21;      // jours utilisés pour le profil « habituel »
const BUCKET_MIN    = 30;      // granularité du profil (minutes)
const MAX_STATE     = 262144;  // octets — taille max d'un état synchronisé
const MAX_PUSH_RUN  = 3;       // notifications max par profil et par collecte
const WHERE_KEEP    = 7200000; // ms — positions du groupe effacées après 2 h
const WHERE_FRESH   = 1200000; // ms — positions du groupe affichées si moins de 20 min
const PACES         = ['enfants' => 55, 'normal' => 75, 'rapide' => 90]; // mètres par minute, comme PACES dans index.html
const ENTRANCE      = [48.2689, 7.7232]; // entrée principale, comme ENTRANCE dans index.html
const JSON_OUT      = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES;

// Même URL que WEATHER_URL dans index.html (repli quand le relais ne répond pas)
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=48.266&longitude=7.722&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,wind_gusts_10m&timezone=Europe%2FBerlin&forecast_days=3';

/** Erreur renvoyée telle quelle au client, avec son code HTTP. */
class HttpError extends RuntimeException {}

$UPSTREAM = rtrim(getenv('EP_UPSTREAM') ?: 'https://api.themeparks.wiki/v1/entity', '/') . '/';
$DATA     = getenv('EP_DATA_DIR') ?: __DIR__ . '/data';

date_default_timezone_set(TZ);

if (!defined('EP_LIB')) {
    $route = PHP_SAPI === 'cli' ? ($argv[1] ?? 'health') : ($_GET['r'] ?? 'bundle');

    if (PHP_SAPI !== 'cli') {
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        header('X-Content-Type-Options: nosniff');
    }

    try {
        ensure_dirs($DATA);
        switch ($route) {
            case 'bundle':
                $uid = isset($_GET['u']) ? user_param() : null;
                [$live, $stale, $at] = cached($DATA, 'live', TTL_LIVE, $UPSTREAM . PARK_ID . '/live');
                if (!$stale) record_snapshot($DATA, $live);
                $stats = build_stats($DATA);
                $weather = weather($DATA);
                echo '{"fetchedAt":' . json_encode(gmdate('c', $at)) . ',"stale":' . ($stale ? 'true' : 'false')
                    . ',"stats":' . json_encode($stats, JSON_OUT)
                    . ',"weather":' . ($weather ?? 'null')
                    . ($uid === null ? '' : ',"user":' . json_encode(user_summary($DATA, $uid, (float) ($_GET['since'] ?? 0)), JSON_OUT))
                    . ',"where":' . json_encode(where_list($DATA), JSON_OUT)
                    . ',"live":' . $live . '}';
                break;

            case 'live':
                [$live, $stale] = cached($DATA, 'live', TTL_LIVE, $UPSTREAM . PARK_ID . '/live');
                if (!$stale) record_snapshot($DATA, $live);
                if ($stale && PHP_SAPI !== 'cli') header('X-Stale: 1');
                echo $live;
                break;

            case 'children':
                [$body, $stale] = cached($DATA, 'children', TTL_CHILDREN, $UPSTREAM . PARK_ID . '/children');
                if ($stale && PHP_SAPI !== 'cli') header('X-Stale: 1');
                echo $body;
                break;

            case 'schedule':
                [$body, $stale] = cached($DATA, 'schedule', TTL_SCHEDULE, $UPSTREAM . PARK_ID . '/schedule');
                if ($stale && PHP_SAPI !== 'cli') header('X-Stale: 1');
                echo $body;
                break;

            case 'weather':
                $weather = weather($DATA);
                if ($weather === null) throw new HttpError('Météo Open-Meteo injoignable pour le moment.', 502);
                echo $weather;
                break;

            case 'calendar':
                send(200, calendar($DATA, date('Y-m-d')));
                break;

            case 'users':
                $list = [];
                foreach (user_files($DATA) as $f) {
                    $u = json_decode((string) file_get_contents($f), true);
                    if (is_array($u)) $list[] = ['id' => $u['id'], 'name' => $u['name'], 'updatedAt' => $u['updatedAt'] ?? null];
                }
                usort($list, function ($a, $b) { return strcmp(lower($a['name']), lower($b['name'])); });
                send(200, $list);
                break;

            case 'user':
                require_post();
                $name = read_body(4096)['name'] ?? '';
                $name = is_string($name) ? trim($name) : '';
                if (preg_match("/^[\\p{L}\\p{N} _.'-]{2,24}$/u", $name) !== 1) {
                    throw new HttpError('Pseudo invalide : 2 à 24 lettres, chiffres, espaces ou . _ \' -', 400);
                }
                $id = substr(hash('sha256', lower($name)), 0, 16);
                $file = "$DATA/users/$id.json";
                with_lock($file, function () use ($file, $id, $name) {
                    if (is_file($file)) {
                        $u = json_decode((string) file_get_contents($file), true);
                        send(409, ['error' => 'Ce pseudo existe déjà : choisis-le dans la liste.', 'id' => $id, 'name' => $u['name'] ?? $name]);
                        return;
                    }
                    write_json($file, ['id' => $id, 'name' => $name, 'created' => now_ms(), 'updatedAt' => null, 'state' => null]);
                    send(201, ['id' => $id, 'name' => $name]);
                });
                break;

            case 'state':
                $id = user_param();
                $file = "$DATA/users/$id.json";
                $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
                if ($method === 'GET') {
                    $u = read_user($file);
                    send(200, ['id' => $u->id, 'name' => $u->name, 'updatedAt' => $u->updatedAt ?? null, 'state' => $u->state ?? null]);
                    break;
                }
                require_post();
                $body = read_body(MAX_STATE, false);
                $at = $body->updatedAt ?? null;
                if (!is_int($at) && !is_float($at)) throw new HttpError('Champ « updatedAt » manquant (horodatage en ms).', 400);
                if (!isset($body->state) || !is_object($body->state)) throw new HttpError('Champ « state » manquant ou invalide (objet attendu).', 400);
                with_lock($file, function () use ($file, $at, $body) {
                    $u = read_user($file);
                    if (($u->updatedAt ?? 0) > $at) {
                        send(409, ['updatedAt' => $u->updatedAt, 'state' => $u->state ?? null]);
                        return;
                    }
                    $u->updatedAt = $at;
                    $u->state = $body->state;
                    write_json($file, $u);
                    send(200, ['ok' => true, 'updatedAt' => $at]);
                });
                break;

            case 'push-key':
                send(200, ['key' => vapid_keys($DATA)['public']]);
                break;

            case 'push-sub':
                require_post();
                $id = user_param();
                read_user("$DATA/users/$id.json");
                // Adresse du site, retenue pour le contact VAPID des envois faits par le cron (sans HTTP_HOST)
                $host = $_SERVER['HTTP_HOST'] ?? '';
                if (preg_match('/^[a-z0-9.-]+(:\d+)?$/i', $host) && @file_get_contents("$DATA/site.txt") !== $host) @file_put_contents("$DATA/site.txt", $host);
                $sub = read_body(4096);
                $endpoint = $sub['endpoint'] ?? null;
                $p256dh = b64u_dec((string) ($sub['keys']['p256dh'] ?? ''));
                $auth = b64u_dec((string) ($sub['keys']['auth'] ?? ''));
                if (!is_string($endpoint) || strlen($endpoint) > 2048 || !preg_match('#^https://[^/\s]+/\S*$#', $endpoint)
                    || strlen($p256dh) !== 65 || $p256dh[0] !== "\x04" || strlen($auth) !== 16) {
                    throw new HttpError('Abonnement push invalide.', 400);
                }
                // Un téléphone n'appartient qu'à un profil : on retire cet abonnement des autres
                foreach (glob("$DATA/users/*.push.json") ?: [] as $f) {
                    $other = basename($f, '.push.json');
                    if ($other !== $id) push_update($DATA, $other, function (array &$p) use ($endpoint) { push_remove($p, [$endpoint]); });
                }
                $n = push_update($DATA, $id, function (array &$p) use ($endpoint, $sub) {
                    push_remove($p, [$endpoint]);
                    $p['subs'][] = [
                        'endpoint' => $endpoint,
                        'keys'     => ['p256dh' => (string) $sub['keys']['p256dh'], 'auth' => (string) $sub['keys']['auth']],
                        'added'    => now_ms(),
                    ];
                    return count($p['subs']);
                });
                send(200, ['ok' => true, 'subs' => $n]);
                break;

            case 'push-unsub':
                require_post();
                $id = user_param();
                $endpoint = read_body(4096)['endpoint'] ?? null;
                if (!is_string($endpoint)) throw new HttpError('Champ « endpoint » manquant.', 400);
                if (is_file("$DATA/users/$id.push.json")) {
                    push_update($DATA, $id, function (array &$p) use ($endpoint) { push_remove($p, [$endpoint]); });
                }
                send(200, ['ok' => true]);
                break;

            case 'push-test':
                require_post();
                $id = user_param();
                read_user("$DATA/users/$id.json");
                [$sent, $codes] = push_user($DATA, $id, [[
                    'title' => 'Europa-Park Live',
                    'body'  => 'Les notifications fonctionnent sur ce téléphone.',
                    'tag'   => 'ep-test',
                    'url'   => './#now',
                ]]);
                send(200, ['sent' => $sent, 'codes' => $codes]);
                break;

            case 'where':
                // Positions partagées du groupe (POST : la sienne, lat null pour arrêter de la partager)
                if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
                    $b = read_body(4096);
                    $dev = $b['device'] ?? '';
                    if (!is_string($dev) || !preg_match('/^[a-z0-9]{8,32}$/', $dev)) throw new HttpError('Identifiant d\'appareil invalide.', 400);
                    $nick = trim((string) ($b['nick'] ?? ''));
                    if ($nick === '' || !preg_match('/^[\p{L}\p{N} _.\'-]{1,24}$/u', $nick)) throw new HttpError('Prénom invalide.', 400);
                    $lat = $b['lat'] ?? null; $lon = $b['lon'] ?? null;
                    if ($lat !== null && (!is_numeric($lat) || !is_numeric($lon))) throw new HttpError('Position invalide.', 400);
                    where_update($DATA, $dev, $lat === null ? null : ['nick' => $nick, 'lat' => (float) $lat, 'lon' => (float) $lon, 'ts' => now_ms()]);
                }
                send(200, where_list($DATA));
                break;

            case 'collect':
                [$live, $stale] = cached($DATA, 'live', 30, $UPSTREAM . PARK_ID . '/live');
                $prev = last_snapshot($DATA);
                $saved = $stale ? false : record_snapshot($DATA, $live);
                prune_history($DATA);
                $pushed = 0;
                try {
                    // Données périmées : seules les alertes horaires (VirtualLine, spectacles, repas) partent
                    $pushed = notify_users($DATA, $stale ? [] : (json_decode($live, true) ?: []), $prev, $UPSTREAM);
                } catch (Throwable $e) {
                    error_log('europapark: alertes push : ' . $e->getMessage());
                }
                echo json_encode(['ok' => !$stale, 'snapshot' => $saved, 'pushed' => $pushed, 'at' => date('c')]) . "\n";
                break;

            case 'health':
                $files = glob($DATA . '/hist/*.json') ?: [];
                echo json_encode([
                    'ok'          => true,
                    'php'         => PHP_VERSION,
                    'dataWritable'=> is_writable($DATA),
                    'historyDays' => count($files),
                    'latestDay'   => $files ? basename(end($files), '.json') : null,
                    'liveCacheAge'=> is_file($DATA . '/cache/live.json') ? time() - filemtime($DATA . '/cache/live.json') : null,
                    'users'       => count(user_files($DATA)),
                    'vapid'       => is_file($DATA . '/vapid.json'),
                ], JSON_PRETTY_PRINT) . "\n";
                break;

            default:
                throw new HttpError('Route inconnue. Utilise ?r=bundle, live, children, schedule, weather, calendar, users, user, state, push-key, push-sub, push-unsub, push-test, collect ou health.', 404);
        }
    } catch (Throwable $e) {
        if (PHP_SAPI !== 'cli') http_response_code($e instanceof HttpError ? $e->getCode() : 502);
        echo json_encode(['error' => $e->getMessage()], JSON_OUT) . "\n";
    }
}

/* ------------------------------------------------------------------ */

function ensure_dirs(string $data): void
{
    foreach ([$data, $data . '/cache', $data . '/hist', $data . '/users'] as $d) {
        if (!is_dir($d) && !@mkdir($d, 0775, true) && !is_dir($d)) {
            throw new RuntimeException("Impossible de créer $d : vérifie les droits d'écriture de PHP sur le dossier.");
        }
    }
}

/** Récupère une ressource amont (URL complète) avec cache disque. Retourne [corps JSON, est-ce périmé ?, horodatage]. */
function cached(string $data, string $name, int $ttl, string $url, int $timeout = 10): array
{
    $file = "$data/cache/$name.json";
    if (is_file($file) && time() - filemtime($file) < $ttl) {
        return [file_get_contents($file), false, filemtime($file)];
    }

    // Verrou pour éviter que plusieurs onglets interrogent l'API en même temps
    $lock = fopen("$file.lock", 'c');
    if ($lock) flock($lock, LOCK_EX);
    try {
        clearstatcache(true, $file);
        if (is_file($file) && time() - filemtime($file) < $ttl) {
            return [file_get_contents($file), false, filemtime($file)];
        }
        [$code, $body] = http_req('GET', $url, ['Accept: application/json'], null, $timeout);
        if ($code === 200 && $body !== '' && json_decode($body) !== null) {
            $tmp = "$file." . getmypid() . '.tmp';
            file_put_contents($tmp, $body);
            rename($tmp, $file);
            return [$body, false, time()];
        }
        if (is_file($file)) {
            return [file_get_contents($file), true, filemtime($file)];
        }
        $host = parse_url($url, PHP_URL_HOST) ?: $url;
        throw new RuntimeException("API $host injoignable (HTTP $code) et aucun cache disponible.");
    } finally {
        if ($lock) { flock($lock, LOCK_UN); fclose($lock); }
    }
}

/** Requête HTTP (curl, sinon flux PHP). Retourne [code HTTP (0 si réseau en échec), corps]. */
function http_req(string $method, string $url, array $headers = [], ?string $body = null, int $timeout = 10): array
{
    $headers[] = 'User-Agent: EuropaParkPlanner/1.0 (usage personnel, auto-hébergé)';
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        $opts = [
            CURLOPT_CUSTOMREQUEST  => $method,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => $timeout,
            CURLOPT_CONNECTTIMEOUT => min(5, $timeout),
            CURLOPT_FOLLOWLOCATION => $method === 'GET',
            CURLOPT_ENCODING       => '',
            CURLOPT_HTTPHEADER     => array_merge($headers, ['Expect:']),
        ];
        if ($body !== null) $opts[CURLOPT_POSTFIELDS] = $body;
        curl_setopt_array($ch, $opts);
        $res = curl_exec($ch);
        $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return [$code, is_string($res) ? $res : ''];
    }
    if ($body !== null) $headers[] = 'Content-Length: ' . strlen($body);
    $ctx = stream_context_create(['http' => [
        'method' => $method, 'timeout' => $timeout, 'ignore_errors' => true,
        'protocol_version' => 1.1, 'follow_location' => $method === 'GET' ? 1 : 0,
        'header' => implode("\r\n", array_merge($headers, ['Connection: close'])) . "\r\n",
        'content' => $body ?? '',
    ]]);
    $res = @file_get_contents($url, false, $ctx);
    $lines = function_exists('http_get_last_response_headers') ? (http_get_last_response_headers() ?? []) : ($http_response_header ?? []);
    $code = 0;
    foreach ($lines as $l) {
        if (preg_match('#^HTTP/\S+\s(\d{3})#', $l, $m)) $code = (int) $m[1]; // le dernier statut (après redirection)
    }
    return [$code, $res === false ? '' : $res];
}

/**
 * Prévisions Open-Meteo, en cache 30 min. Ne lève jamais d'exception : null si indisponible.
 * Après un échec, on ne réessaie pas avant 5 min (fichier weather.fail) pour ne pas ralentir la page.
 */
function weather(string $data): ?string
{
    $file = "$data/cache/weather.json";
    $fail = "$data/cache/weather.fail";
    if (is_file($fail) && time() - filemtime($fail) < WEATHER_RETRY) {
        return is_file($file) ? (string) file_get_contents($file) : null;
    }
    try {
        [$body, $stale] = cached($data, 'weather', TTL_WEATHER, WEATHER_URL, 4);
        if ($stale) @touch($fail);
        return $body;
    } catch (Throwable $e) {
        @touch($fail);
        return null;
    }
}

/** Ajoute un point d'historique (attente par attraction) dans data/hist/AAAA-MM-JJ.json. */
function record_snapshot(string $data, string $liveJson): bool
{
    $live = json_decode($liveJson, true);
    if (!is_array($live) || empty($live['liveData'])) return false;

    $w = [];   // attente des attractions ouvertes
    $s = [];   // statut des autres (D = panne, C = fermée, R = rénovation)
    foreach ($live['liveData'] as $e) {
        if (($e['entityType'] ?? '') !== 'ATTRACTION' || ($e['parkId'] ?? PARK_ID) !== PARK_ID) continue;
        if (!isset($e['queue']['STANDBY'])) continue;
        $id = $e['id'];
        $st = $e['status'] ?? '';
        $wt = $e['queue']['STANDBY']['waitTime'] ?? null;
        if ($st === 'OPERATING' && is_numeric($wt)) $w[$id] = (int) $wt;
        else $s[$id] = ['DOWN' => 'D', 'CLOSED' => 'C', 'REFURBISHMENT' => 'R'][$st] ?? 'C';
    }
    if (!$w) return false; // parc fermé : rien à enregistrer

    $file = "$data/hist/" . date('Y-m-d') . '.json';
    $fh = fopen($file, 'c+');
    if (!$fh) return false;
    flock($fh, LOCK_EX);
    $raw  = stream_get_contents($fh);
    $hist = $raw ? json_decode($raw, true) : null;
    if (!is_array($hist)) $hist = ['snapshots' => []];
    $last = end($hist['snapshots']);
    $saved = false;
    if (!$last || time() - (int) $last['t'] >= SNAPSHOT_GAP) {
        $hist['snapshots'][] = ['t' => time(), 'w' => $w, 's' => (object) $s];
        ftruncate($fh, 0);
        rewind($fh);
        fwrite($fh, json_encode($hist, JSON_UNESCAPED_SLASHES));
        $saved = true;
    }
    flock($fh, LOCK_UN);
    fclose($fh);
    return $saved;
}

/** Dernier point d'historique du jour (avant la nouvelle collecte), ou null. */
function last_snapshot(string $data): ?array
{
    $file = "$data/hist/" . date('Y-m-d') . '.json';
    if (!is_file($file)) return null;
    $hist = json_decode((string) file_get_contents($file), true);
    $last = is_array($hist['snapshots'] ?? null) ? end($hist['snapshots']) : false;
    return is_array($last) ? $last : null;
}

function prune_history(string $data): void
{
    $limit = date('Y-m-d', strtotime('-' . KEEP_DAYS . ' days'));
    foreach (glob("$data/hist/*.json") ?: [] as $f) {
        if (basename($f, '.json') < $limit) @unlink($f);
    }
}

function minute_of_day(int $ts): int
{
    return (int) date('G', $ts) * 60 + (int) date('i', $ts);
}

/**
 * Statistiques renvoyées à la page :
 *   typical[id][minuteDuJour] = attente moyenne des jours précédents (tranches de 30 min)
 *   today[id] = [[minuteDuJour, attente], ...] pour aujourd'hui
 */
function build_stats(string $data): array
{
    $today = date('Y-m-d');
    return [
        'tz'      => TZ,
        'bucket'  => BUCKET_MIN,
        'today'   => today_series($data, $today),
    ] + typical_profile($data, $today);
}

function today_series(string $data, string $today): array
{
    $file = "$data/hist/$today.json";
    if (!is_file($file)) return [];
    $hist = json_decode((string) file_get_contents($file), true);
    $out = [];
    foreach ($hist['snapshots'] ?? [] as $snap) {
        $m = minute_of_day((int) $snap['t']);
        foreach ($snap['w'] as $id => $wait) $out[$id][] = [$m, $wait];
        foreach ((array) $snap['s'] as $id => $st) $out[$id][] = [$m, null];
    }
    return $out;
}

/** Profil habituel, mis en cache une fois par jour (les jours passés ne changent plus). */
function typical_profile(string $data, string $today): array
{
    $cacheFile = "$data/cache/typical-$today.json";
    if (is_file($cacheFile)) {
        $c = json_decode((string) file_get_contents($cacheFile), true);
        if (is_array($c)) return $c;
    }

    $isWeekend = (int) date('N') >= 6;
    $files = [];
    foreach (glob("$data/hist/*.json") ?: [] as $f) {
        $day = basename($f, '.json');
        if ($day >= $today) continue;
        $files[$day] = $f;
    }
    krsort($files);
    $files = array_slice($files, 0, PROFILE_DAYS, true);

    // On privilégie les jours du même type (semaine / week-end) s'il y en a
    $same = array_filter($files, function ($f, $day) use ($isWeekend) {
        return ((int) date('N', strtotime($day)) >= 6) === $isWeekend;
    }, ARRAY_FILTER_USE_BOTH);
    $basis = $same ? ($isWeekend ? 'week-end' : 'semaine') : 'tous';
    if ($same) $files = $same;

    $sum = []; $cnt = [];
    foreach ($files as $f) {
        $hist = json_decode((string) file_get_contents($f), true);
        foreach ($hist['snapshots'] ?? [] as $snap) {
            $b = intdiv(minute_of_day((int) $snap['t']), BUCKET_MIN) * BUCKET_MIN;
            foreach ($snap['w'] as $id => $wait) {
                $sum[$id][$b] = ($sum[$id][$b] ?? 0) + $wait;
                $cnt[$id][$b] = ($cnt[$id][$b] ?? 0) + 1;
            }
        }
    }
    $typical = [];
    foreach ($sum as $id => $buckets) {
        ksort($buckets);
        foreach ($buckets as $b => $total) $typical[$id][(string) $b] = round($total / $cnt[$id][$b], 1);
    }

    $result = ['days' => count($files), 'basis' => $basis, 'typical' => (object) $typical];
    foreach (glob("$data/cache/typical-*.json") ?: [] as $old) @unlink($old);
    file_put_contents($cacheFile, json_encode($result, JSON_UNESCAPED_SLASHES));
    return $result;
}

/**
 * Affluence des jours passés : pour chaque point pris entre 11 h et 16 h, attente moyenne de
 * toutes les attractions ouvertes. avg = moyenne de ces points, peak = le plus haut. Cache quotidien.
 */
function calendar(string $data, string $today): array
{
    $cacheFile = "$data/cache/calendar-$today.json";
    if (is_file($cacheFile)) {
        $c = json_decode((string) file_get_contents($cacheFile), true);
        if (is_array($c)) return $c;
    }

    $days = [];
    $files = glob("$data/hist/*.json") ?: [];
    sort($files);
    foreach ($files as $f) {
        $day = basename($f, '.json');
        if ($day >= $today) continue;
        $hist = json_decode((string) file_get_contents($f), true);
        $means = [];
        foreach ($hist['snapshots'] ?? [] as $snap) {
            $m = minute_of_day((int) $snap['t']);
            if ($m < 11 * 60 || $m >= 16 * 60 || empty($snap['w'])) continue;
            $means[] = array_sum($snap['w']) / count($snap['w']);
        }
        if ($means) $days[] = ['day' => $day, 'avg' => round(array_sum($means) / count($means), 1), 'peak' => round(max($means), 1)];
    }

    $result = ['days' => $days];
    foreach (glob("$data/cache/calendar-*.json") ?: [] as $old) @unlink($old);
    file_put_contents($cacheFile, json_encode($result, JSON_UNESCAPED_SLASHES));
    return $result;
}

/* ------------------------------------------------------------------ */
/* Profils (sans mot de passe) : data/users/<id>.json                  */

/** Réponse JSON avec code HTTP. */
function send(int $code, $payload): void
{
    if (PHP_SAPI !== 'cli') http_response_code($code);
    echo json_encode($payload, JSON_OUT) . "\n";
}

function require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        if (PHP_SAPI !== 'cli') header('Allow: POST');
        throw new HttpError('Méthode non autorisée : utilise POST.', 405);
    }
}

/** Corps JSON de la requête (objet). $assoc = false garde les objets vides intacts ({} reste {}). */
function read_body(int $max, bool $assoc = true)
{
    $raw = file_get_contents('php://input', false, null, 0, $max + 1);
    if ($raw !== false && strlen($raw) > $max) throw new HttpError('Requête trop volumineuse.', 413);
    $body = json_decode((string) $raw, $assoc);
    if (!is_array($body) && !is_object($body)) throw new HttpError('Corps JSON invalide.', 400);
    return $body;
}

/** Identifiant de profil passé en ?u= (16 caractères hexadécimaux). */
function user_param(): string
{
    $u = $_GET['u'] ?? '';
    if (!is_string($u) || !preg_match('/^[a-f0-9]{16}$/', $u)) throw new HttpError('Identifiant de profil invalide.', 400);
    return $u;
}

/** Fichiers de profil (sans les abonnements push). */
function user_files(string $data): array
{
    return array_values(array_filter(glob("$data/users/*.json") ?: [], function ($f) {
        return substr($f, -10) !== '.push.json';
    }));
}

/** Profil en objet (les objets vides de l'état restent des objets). 404 s'il n'existe pas. */
function read_user(string $file): stdClass
{
    $u = is_file($file) ? json_decode((string) file_get_contents($file)) : null;
    if (!$u instanceof stdClass) throw new HttpError('Profil inconnu.', 404);
    return $u;
}

/** Résumé du profil pour le bundle : null s'il n'existe pas ; l'état seulement s'il a changé depuis $since. */
function user_summary(string $data, string $id, float $since): ?array
{
    $file = "$data/users/$id.json";
    if (!is_file($file)) return null;
    $u = read_user($file);
    $push = json_decode((string) @file_get_contents("$data/users/$id.push.json"), true);
    $out = ['id' => $u->id, 'name' => $u->name, 'updatedAt' => $u->updatedAt ?? null, 'push' => count($push['subs'] ?? [])];
    if (($u->updatedAt ?? 0) > $since) $out['state'] = $u->state ?? null;
    return $out;
}

function lower(string $s): string
{
    return function_exists('mb_strtolower') ? mb_strtolower($s, 'UTF-8') : strtolower($s);
}

/** Horodatage en millisecondes, comme Date.now() côté page. */
function now_ms(): int
{
    return (int) floor(microtime(true) * 1000);
}

/** Écriture atomique (fichier temporaire + rename) : un lecteur ne voit jamais un fichier à moitié écrit. */
function write_json(string $file, $payload): void
{
    $tmp = "$file." . getmypid() . '.' . bin2hex(random_bytes(4)) . '.tmp';
    if (file_put_contents($tmp, json_encode($payload, JSON_OUT)) === false || !rename($tmp, $file)) {
        @unlink($tmp);
        throw new RuntimeException("Écriture impossible dans $file : vérifie les droits de PHP sur data/.");
    }
}

/** Exécute $fn sous verrou exclusif (fichier .lock à côté de $file, car rename change l'inode). */
function with_lock(string $file, callable $fn)
{
    $lock = fopen("$file.lock", 'c');
    if ($lock) flock($lock, LOCK_EX);
    try {
        return $fn();
    } finally {
        if ($lock) { flock($lock, LOCK_UN); fclose($lock); }
    }
}

/* ------------------------------------------------------------------ */
/* Positions du groupe : data/where.json = {appareil: {nick, lat, lon, ts}} */

function where_update(string $data, string $device, ?array $entry): void
{
    $file = "$data/where.json";
    with_lock($file, function () use ($file, $device, $entry) {
        $all = json_decode((string) @file_get_contents($file), true) ?: [];
        if ($entry === null) unset($all[$device]); else $all[$device] = $entry;
        $all = array_filter($all, function ($e) { return now_ms() - (float) ($e['ts'] ?? 0) < WHERE_KEEP; });
        write_json($file, (object) $all);
    });
}

/** [{device, nick, lat, lon, ts}] des positions récentes. */
function where_list(string $data): array
{
    $out = [];
    foreach (json_decode((string) @file_get_contents("$data/where.json"), true) ?: [] as $dev => $e) {
        if (now_ms() - (float) ($e['ts'] ?? 0) < WHERE_FRESH) $out[] = ['device' => (string) $dev] + $e;
    }
    return $out;
}

/* ------------------------------------------------------------------ */
/* Web Push (RFC 8030 / 8291 / 8292) en PHP pur + OpenSSL              */

function b64u(string $s): string
{
    return rtrim(strtr(base64_encode($s), '+/', '-_'), '=');
}

function b64u_dec(string $s): string
{
    return (string) base64_decode(strtr($s, '-_', '+/'), true);
}

/** Clé publique EC brute (65 octets) d'une clé OpenSSL. */
function ec_raw_public($key): string
{
    $ec = openssl_pkey_get_details($key)['ec'];
    return "\x04" . str_pad($ec['x'], 32, "\0", STR_PAD_LEFT) . str_pad($ec['y'], 32, "\0", STR_PAD_LEFT);
}

function ec_new()
{
    $key = openssl_pkey_new(['curve_name' => 'prime256v1', 'private_key_type' => OPENSSL_KEYTYPE_EC]);
    if (!$key) throw new RuntimeException('OpenSSL ne sait pas générer de clé P-256 : ' . openssl_error_string());
    return $key;
}

/** Clés VAPID du serveur, générées au premier appel dans data/vapid.json. */
function vapid_keys(string $data): array
{
    $file = "$data/vapid.json";
    $keys = is_file($file) ? json_decode((string) file_get_contents($file), true) : null;
    if (is_array($keys)) return $keys;
    return with_lock($file, function () use ($file) {
        clearstatcache(true, $file);
        $keys = is_file($file) ? json_decode((string) file_get_contents($file), true) : null;
        if (is_array($keys)) return $keys;
        $key = ec_new();
        openssl_pkey_export($key, $pem);
        $keys = ['private' => $pem, 'public' => b64u(ec_raw_public($key))];
        $tmp = "$file." . getmypid() . '.tmp';
        file_put_contents($tmp, json_encode($keys, JSON_OUT));
        chmod($tmp, 0600);
        if (!rename($tmp, $file)) throw new RuntimeException("Écriture impossible dans $file.");
        return $keys;
    });
}

/** Contact transmis aux services push : EP_VAPID_SUB, sinon l'adresse du site vue au dernier abonnement. */
function vapid_contact(): string
{
    if ($env = getenv('EP_VAPID_SUB')) return $env;
    global $DATA;
    $host = trim((string) @file_get_contents("$DATA/site.txt"));
    return $host !== '' ? "https://$host" : 'mailto:webpush@localhost';
}

/** JWT VAPID signé en ES256 pour le service push de $endpoint. */
function vapid_jwt(string $endpoint, string $pem): string
{
    $p = parse_url($endpoint);
    $aud = $p['scheme'] . '://' . $p['host'] . (isset($p['port']) ? ':' . $p['port'] : '');
    $h = b64u(json_encode(['typ' => 'JWT', 'alg' => 'ES256']));
    $c = b64u(json_encode(['aud' => $aud, 'exp' => time() + 43200, 'sub' => vapid_contact()], JSON_UNESCAPED_SLASHES));
    if (!openssl_sign("$h.$c", $der, $pem, OPENSSL_ALGO_SHA256)) throw new RuntimeException('Signature VAPID impossible.');

    // OpenSSL signe en DER (SEQUENCE de deux INTEGER) ; JWT veut r||s bruts, 32 octets chacun
    $o = (ord($der[1]) & 0x80) ? 2 + (ord($der[1]) & 0x7f) : 2;
    $raw = '';
    for ($i = 0; $i < 2; $i++) {
        if (ord($der[$o]) !== 0x02) throw new RuntimeException('Signature DER inattendue.');
        $len = ord($der[$o + 1]);
        $raw .= str_pad(ltrim(substr($der, $o + 2, $len), "\0"), 32, "\0", STR_PAD_LEFT);
        $o += 2 + $len;
    }
    return "$h.$c." . b64u($raw);
}

/** Chiffre $payload pour un abonnement (aes128gcm, RFC 8291). $uaPub : point brut 65 octets, $auth : 16 octets. */
function push_encrypt(string $payload, string $uaPub, string $auth): string
{
    $pem = "-----BEGIN PUBLIC KEY-----\n"
        . chunk_split(base64_encode(hex2bin('3059301306072a8648ce3d020106082a8648ce3d030107034200') . $uaPub), 64, "\n")
        . "-----END PUBLIC KEY-----\n";
    $ua = openssl_pkey_get_public($pem);
    if (!$ua) throw new RuntimeException('Clé p256dh invalide.');
    $eph = ec_new();
    $asPub = ec_raw_public($eph);
    $ecdh = openssl_pkey_derive($ua, $eph);
    if ($ecdh === false) throw new RuntimeException('Échange ECDH impossible.');

    $ikm   = hash_hkdf('sha256', $ecdh, 32, "WebPush: info\0" . $uaPub . $asPub, $auth);
    $salt  = random_bytes(16);
    $cek   = hash_hkdf('sha256', $ikm, 16, "Content-Encoding: aes128gcm\0", $salt);
    $nonce = hash_hkdf('sha256', $ikm, 12, "Content-Encoding: nonce\0", $salt);
    $ct = openssl_encrypt($payload . "\x02", 'aes-128-gcm', $cek, OPENSSL_RAW_DATA, $nonce, $tag);
    if ($ct === false) throw new RuntimeException('Chiffrement AES-GCM impossible.');
    return $salt . pack('N', 4096) . chr(65) . $asPub . $ct . $tag;
}

/** Envoie un message à un abonnement. Retourne le code HTTP du service push (0 si échec local). */
function push_send(array $vapid, array $sub, array $message): int
{
    try {
        $body = push_encrypt(json_encode($message, JSON_OUT), b64u_dec($sub['keys']['p256dh'] ?? ''), b64u_dec($sub['keys']['auth'] ?? ''));
        [$code] = http_req('POST', $sub['endpoint'], [
            'Content-Type: application/octet-stream',
            'Content-Encoding: aes128gcm',
            'TTL: 900',
            'Urgency: high',
            'Authorization: vapid t=' . vapid_jwt($sub['endpoint'], $vapid['private']) . ', k=' . $vapid['public'],
        ], $body, 8);
        return $code;
    } catch (Throwable $e) {
        return 0;
    }
}

/** Lecture-modification-écriture de data/users/<id>.push.json sous verrou. Retourne ce que renvoie $fn. */
function push_update(string $data, string $id, callable $fn)
{
    $file = "$data/users/$id.push.json";
    return with_lock($file, function () use ($file, $fn) {
        $p = is_file($file) ? json_decode((string) file_get_contents($file), true) : null;
        if (!is_array($p)) $p = [];
        $p += ['subs' => [], 'sent' => []];
        $before = json_encode($p);
        $res = $fn($p);
        $now = time();
        $p['subs'] = array_values($p['subs']);
        $p['sent'] = array_filter($p['sent'], function ($t) use ($now) { return $now - (int) $t < 86400; });
        if (json_encode($p) !== $before) write_json($file, ['subs' => $p['subs'], 'sent' => (object) $p['sent']]);
        return $res;
    });
}

function push_remove(array &$p, array $endpoints): void
{
    $p['subs'] = array_values(array_filter($p['subs'], function ($s) use ($endpoints) {
        return !in_array($s['endpoint'] ?? null, $endpoints, true);
    }));
}

/**
 * Envoie des messages à tous les téléphones d'un profil (réseau hors verrou), puis supprime les
 * abonnements expirés (404 / 410) et note les clés envoyées. Retourne [messages reçus par au moins un téléphone, codes].
 */
function push_user(string $data, string $id, array $messages, array $keys = []): array
{
    $p = json_decode((string) @file_get_contents("$data/users/$id.push.json"), true);
    $subs = $p['subs'] ?? [];
    if (!$subs || !$messages) return [0, []];
    $vapid = vapid_keys($data);
    $codes = []; $dead = []; $sentKeys = []; $sent = 0;
    foreach ($messages as $i => $msg) {
        $ok = false;
        foreach ($subs as $sub) {
            if (in_array($sub['endpoint'], $dead, true)) continue;
            $code = push_send($vapid, $sub, $msg);
            $codes[] = $code;
            if ($code === 404 || $code === 410) $dead[] = $sub['endpoint'];
            if ($code >= 200 && $code < 300) $ok = true;
        }
        if ($ok) {
            $sent++;
            if (isset($keys[$i])) $sentKeys[$keys[$i]] = time();
        }
    }
    if ($dead || $sentKeys) {
        push_update($data, $id, function (array &$p) use ($dead, $sentKeys) {
            push_remove($p, $dead);
            $p['sent'] = $sentKeys + $p['sent'];
        });
    }
    return [$sent, $codes];
}

/* ------------------------------------------------------------------ */
/* Alertes envoyées par le cron (collect)                              */

/** Nom court d'une attraction : reprend shortName() de index.html (à garder synchronisés). */
function short_name(string $name): string
{
    if (stripos($name, 'cancan') !== false) return 'Eurosat CanCan';
    $name = (string) preg_replace('/^Water rollercoaster\s+/iu', '', $name);
    $name = (preg_split('/\s[-–]\s|\spowered by\s/iu', $name) ?: [$name])[0];
    return trim((string) preg_replace('/\s+Megacoaster$/iu', '', $name));
}

/** Minutes de marche, comme walkMin() de index.html : vol d'oiseau × 1,35, 6 min si une position manque. */
function walk_min(?array $a, ?array $b, string $pace): int
{
    if (!$a || !$b) return 6;
    $t = M_PI / 180;
    $x = sin(($b[0] - $a[0]) * $t / 2) ** 2 + cos($a[0] * $t) * cos($b[0] * $t) * sin(($b[1] - $a[1]) * $t / 2) ** 2;
    $d = 2 * 6371000 * asin(sqrt($x));
    return max(1, (int) round($d * 1.35 / (PACES[$pace] ?? PACES['normal'])));
}

function hhmm(int $m): string
{
    return sprintf('%02d:%02d', intdiv($m, 60) % 24, $m % 60);
}

/**
 * Envoie les alertes du moment aux profils abonnés dont la journée (state.day) est aujourd'hui.
 * $live : JSON live décodé ([] si périmé), $prev : point d'historique précédent. Retourne le nombre de notifications.
 */
function notify_users(string $data, array $live, ?array $prev, string $upstream): int
{
    $today = date('Y-m-d');
    $users = [];
    foreach (glob("$data/users/*.push.json") ?: [] as $f) {
        $id = basename($f, '.push.json');
        $p = json_decode((string) file_get_contents($f), true);
        $u = json_decode((string) @file_get_contents("$data/users/$id.json"), true);
        $st = $u['state'] ?? null;
        if (!empty($p['subs']) && is_array($st) && ($st['day'] ?? null) === $today) $users[$id] = [$st, (array) ($p['sent'] ?? [])];
    }
    if (!$users) return 0;

    // Noms, positions, attentes et statuts des attractions
    $ents = [];
    try {
        [$children] = cached($data, 'children', TTL_CHILDREN, $upstream . PARK_ID . '/children');
        foreach (json_decode($children, true)['children'] ?? [] as $c) {
            $lat = $c['location']['latitude'] ?? null;
            $lon = $c['location']['longitude'] ?? null;
            $ents[$c['id']] = ['name' => short_name((string) ($c['name'] ?? '?')), 'pos' => is_numeric($lat) && is_numeric($lon) ? [(float) $lat, (float) $lon] : null];
        }
    } catch (Throwable $e) {
        // sans coordonnées : 6 min de marche partout
    }
    $wait = []; $status = [];
    foreach ($live['liveData'] ?? [] as $e) {
        $id = $e['id'] ?? null;
        if (!is_string($id)) continue;
        if (!isset($ents[$id])) $ents[$id] = ['name' => short_name((string) ($e['name'] ?? '?')), 'pos' => null];
        $status[$id] = $e['status'] ?? '';
        $w = $e['queue']['STANDBY']['waitTime'] ?? null;
        if ($status[$id] === 'OPERATING' && is_numeric($w)) $wait[$id] = (int) $w;
    }
    $prevStatus = (array) ($prev['s'] ?? []);

    // Pluie dans l'heure qui vient alors qu'il ne pleut pas (mêmes seuils que rainy() dans index.html)
    $rain = null;
    if ($wait) {
        $h = json_decode((string) weather($data), true)['hourly'] ?? [];
        $idx = array_flip($h['time'] ?? []);
        $rainy = function (int $ts) use ($h, $idx) {
            $i = $idx[date('Y-m-d\TH:00', $ts)] ?? null;
            if ($i === null) return null;
            return ($h['precipitation'][$i] ?? 0) >= 0.3 || (($h['precipitation_probability'][$i] ?? 0) >= 60 && ($h['weather_code'][$i] ?? 0) >= 51);
        };
        if ($rainy(time()) === false && $rainy(time() + 3600) === true) $rain = date('G', time() + 3600);
    }
    $name = function ($id) use ($ents) { return $ents[$id]['name'] ?? '?'; };
    $now = minute_of_day(time());
    $pushed = 0;

    foreach ($users as $uid => [$st, $sent]) {
        $done = (array) ($st['done'] ?? []);
        $isDone = function ($id) use ($done) { return (int) ($done[$id] ?? 0) > 0; };
        $pace = is_string($st['pace'] ?? null) ? $st['pace'] : 'normal';

        // Position : GPS de moins de 10 min, sinon dernière attraction faite, sinon l'entrée
        $pos = $st['pos'] ?? null;
        if (is_array($pos) && is_numeric($pos['lat'] ?? null) && is_numeric($pos['lon'] ?? null) && now_ms() - (float) ($pos['ts'] ?? 0) < 600000) {
            $pos = [(float) $pos['lat'], (float) $pos['lon']];
        } else {
            $last = $st['lastDone'] ?? null;
            $pos = (is_string($last) ? ($ents[$last]['pos'] ?? null) : null) ?? ENTRANCE;
        }
        $walk = function ($id) use ($ents, $pos, $pace) { return walk_min($pos, $ents[$id]['pos'] ?? null, $pace); };

        // [clé, délai avant de redire la même chose (s), titre, texte] — les alertes à heure fixe d'abord
        $msgs = [];
        foreach (is_array($st['slots'] ?? null) ? $st['slots'] : [] as $s) {
            if (($s['day'] ?? null) !== $today || !is_string($s['id'] ?? null) || !is_numeric($s['start'] ?? null)) continue;
            $start = (int) $s['start'];
            $w = $walk($s['id']);
            if ($now >= $start - $w - 2 - 1 && $now <= $start + 5) {
                $msgs[] = ["v:{$s['id']}:$start", 86400, 'Pars maintenant', $name($s['id']) . ' : créneau VirtualLine à ' . hhmm($start) . " · $w min à pied"];
            }
        }
        $planned = is_array($st['planned'] ?? null) && ($st['planned']['day'] ?? null) === $today ? $st['planned'] : [];
        foreach (is_array($planned['shows'] ?? null) ? $planned['shows'] : [] as $s) {
            if (!is_string($s['id'] ?? null) || !is_numeric($s['start'] ?? null) || $isDone($s['id'])) continue;
            $start = (int) $s['start'];
            $w = $walk($s['id']);
            if ($now >= $start - $w - 5 - 1 && $now <= $start + 5) {
                $msgs[] = ["s:{$s['id']}:$start", 86400, 'Spectacle', $name($s['id']) . ' à ' . hhmm($start) . " · pars maintenant ($w min à pied)"];
            }
        }
        if (is_numeric($planned['meal'] ?? null) && empty($st['mealDone'])) {
            $meal = (int) $planned['meal'];
            if ($now >= $meal - 2 && $now <= $meal + 20) {
                $msgs[] = ["m:$meal", 86400, 'Pause repas', "C'est le bon moment : les files sont au plus haut."];
            }
        }

        if ($rain !== null) {
            $msgs[] = ["p:$today:$rain", 10800, 'Pluie', "Pluie annoncée vers {$rain} h : l'itinéraire passe aux attractions couvertes."];
        }

        // Alertes sur les files : pas pendant que l'utilisateur fait la queue
        if (empty($st['queue'])) {
            foreach ((array) ($st['alerts'] ?? []) as $id => $thr) {
                $id = (string) $id;
                if (is_numeric($thr) && isset($wait[$id]) && $wait[$id] <= $thr) {
                    $msgs[] = ["a:$id", 1800, 'File courte', $name($id) . " : {$wait[$id]} min (seuil " . (int) $thr . ')'];
                }
            }
            foreach ((array) ($st['again'] ?? []) as $id => $thr) {
                $id = (string) $id;
                if (is_numeric($thr) && $isDone($id) && isset($wait[$id]) && $wait[$id] <= $thr) {
                    $msgs[] = ["g:$id", 1800, 'À refaire', $name($id) . " : {$wait[$id]} min"];
                }
            }
            foreach ((array) ($st['plan'] ?? []) as $id => $kind) {
                $id = (string) $id;
                if (!$isDone($id) && ($prevStatus[$id] ?? null) === 'D' && isset($wait[$id])) {
                    $msgs[] = ["r:$id", 1800, 'Réouverture', $name($id) . " vient de rouvrir · file {$wait[$id]} min"];
                }
            }
        }

        $out = []; $keys = [];
        foreach ($msgs as [$key, $cooldown, $title, $body]) {
            if (isset($sent[$key]) && time() - (int) $sent[$key] < $cooldown) continue;
            $out[] = ['title' => $title, 'body' => $body, 'tag' => $key, 'url' => './#now'];
            $keys[] = $key;
            if (count($out) >= MAX_PUSH_RUN) break;
        }
        if ($out) $pushed += push_user($data, $uid, $out, $keys)[0];
    }
    return $pushed;
}
