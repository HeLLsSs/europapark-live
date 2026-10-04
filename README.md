# Europa-Park Live

Appli web pour téléphone, à installer sur l'écran d'accueil, qui t'accompagne pendant une journée à Europa-Park :

- elle affiche les temps d'attente en direct ;
- elle te dit à chaque instant **quelle attraction faire maintenant** et propose **l'itinéraire du reste de la journée** ;
- elle t'envoie des **notifications**, même téléphone en poche.

Elle s'auto-héberge sur n'importe quel petit serveur avec nginx et PHP 8 (un Raspberry Pi suffit). Il n'y a ni base de données, ni Composer, ni service payant. Projet non officiel, sans lien avec Europa-Park.

Dans ce document, `europapark.example.com` désigne l'adresse de ton installation.

```
www/                              ← racine web (/var/www/europapark/www)
  index.html                      l'appli complète (style + logique)
  api.php                         relais du serveur : temps d'attente, historique, météo, profils, notifications push
  sw.js, manifest.webmanifest     installation sur l'écran d'accueil, ouverture hors réseau, réception des notifications
  data/                           créé par api.php, jamais servi, ignoré par git (voir « Données »)
deploy/
  nginx/europapark.conf              vhost nginx (à adapter)
  cron/europapark                    collecte + notifications, chaque minute de 8 h à 21 h
```

---

# Utilisation

## 1. Installer l'appli sur le téléphone

Ouvre `https://europapark.example.com`. L'onglet **Maintenant** affiche une carte « Installer l'appli » (on la retrouve dans **Réglages → Application**).

- **Android** (Chrome, Edge, Samsung Internet) : touche **Installer l'appli**, puis confirme. Sans la carte : menu ⋮ → *Installer l'application*.
- **iPhone** : dans **Safari**, touche **Partager** (carré avec une flèche) → **Sur l'écran d'accueil**. Ouvre ensuite l'appli **depuis l'icône** : c'est obligatoire pour les notifications (iOS 16.4 ou plus).

Installée, l'appli s'ouvre en plein écran. Elle reste utilisable quand le réseau du parc sature : elle affiche les dernières données reçues et reprend toute seule.

## 2. Choisir son profil

Au premier lancement, l'appli demande **« Qui es-tu ? »**. Choisis ton pseudo dans la liste ou crée-le (de 2 à 24 caractères, sans mot de passe).

Tout ce que tu fais est enregistré sur le serveur à chaque changement : programme, attractions faites, créneaux, réglages, position dans la file. Si le téléphone s'éteint, qu'on vide le navigateur ou que tu changes de téléphone, choisis simplement ton pseudo : tu reprends où tu en étais. Le bouton en haut à droite (ton pseudo) permet de changer de profil.

**En groupe**, deux façons de faire :
- **Un profil commun** (ex. « Groupe ») choisi par tout le monde. Un « Fait » touché sur un téléphone arrive sur les autres en 2 minutes au plus, et tout le monde reçoit les notifications. C'est le plus simple si vous restez ensemble.
- **Un profil chacun.** Dans **Réglages → Profil**, « Copier le programme de… » reprend le programme d'un autre.

**Pour se retrouver** : dans **Réglages → Ma position**, coche « Partager ma position avec le groupe » et indique ton prénom. Sur la **Carte**, chaque membre apparaît en point plein avec son prénom et le temps de marche jusqu'à lui. Un losange marque le **point de rencontre** conseillé : l'attraction la plus proche du centre du groupe. Une position disparaît 20 min après le dernier point, ou dès qu'on décoche le partage.

## 3. Préparer la journée (la veille)

1. **Programme** : touche *Sensations fortes* ou *En famille*, puis ajuste dans **Attractions** avec les étoiles.
   - étoile pleine = **incontournable** ;
   - demi-étoile = **bonus** (fait seulement s'il reste du temps) ;
   - étoile vide = pas au programme.
2. **Spectacles** : filtre *Spectacles*, puis une étoile sur ceux que tu veux voir. L'appli choisit la meilleure représentation.
3. **Réglages** :
   - **Pause repas** : activée par défaut. Tu choisis la durée (30, 45 min ou 1 h) et la fenêtre (« pas avant », « fini avant »).
   - **Priorité de l'itinéraire** : *Moins de marche*, *Équilibré* ou *Moins d'attente*.
   - **Rythme de marche** : avec enfants, normal ou rapide.
   - **Taille du plus petit** : vide si tout le monde fait plus de 1,40 m.
   - **Hôtel du parc** : à cocher seulement si tu as l'entrée anticipée.
   - **Single rider accepté** : file séparée, souvent bien plus courte, sur certaines attractions (Blue Fire, Voltron, CanCan et Arthur d'après les sources consultées ; à vérifier sur place). L'appli compte la moitié de l'attente normale, ou la vraie attente si tu la notes dans la fiche (valable 45 min).
   - **Position** : « Utiliser ma position ».
   - **Notifications** : « Activer les notifications », puis « Tester ».

Le soir et la veille, l'onglet **Maintenant** affiche un **aperçu de la journée suivante** : itinéraire estimé depuis l'ouverture, météo, conseils, et **affluence prévue**. Celle-ci correspond à l'attente moyenne habituelle de ce jour de la semaine, comparée à la moyenne des derniers jours enregistrés par le serveur.

## 4. Dans le parc

L'onglet **Maintenant** montre en grand la **prochaine étape** : son nom, l'attente actuelle, le temps de marche et la raison du choix. Juste en dessous, trois autres bons choix et l'itinéraire du reste de la journée avec les heures d'arrivée.

| Bouton | Effet |
|---|---|
| **Dans la file** | tu entres dans la queue : un minuteur démarre et l'itinéraire part de la fin de cette attraction |
| **Fait** | à la sortie : l'itinéraire repart de cette attraction. Si tu étais « dans la file », le temps réellement attendu est mesuré |
| **Plus tard** | écarte l'attraction pendant 30 minutes |
| **Quitter la file** | tu abandonnes la queue |

Toucher le nom ouvre la **fiche** de l'attraction :
- l'attente, l'attente habituelle à cette heure et la courbe de la journée comparée à l'habituel ;
- la taille minimale et l'état du VirtualLine ;
- les choix « M'alerter sous… » et « À refaire si l'attente passe sous… ».

**Avec le GPS**, l'appli remarque toute seule où tu es :
- arrivé à une attraction du programme, elle demande « Tu fais la queue ? » ;
- en repartant, elle demande « Tu as fini ? » ;
- les temps de marche partent de ta position réelle (sans GPS : de la dernière attraction faite, ou de l'entrée).

**VirtualLine** (coupe-file gratuit) :
1. La carte VirtualLine indique quelle attraction réserver maintenant (celle où ça fait gagner le plus).
2. Réserve dans l'**appli officielle Europa-Park** (un seul créneau à la fois par billet).
3. Note ton créneau avec **J'ai un créneau** : l'itinéraire s'organise autour et te dit quand partir.
4. Après **Fait** sur le créneau, l'appli te dit quoi re-réserver tout de suite.

**Repas et spectacles** apparaissent dans l'itinéraire comme des étapes à heure fixe. Pour le repas, l'appli indique le resto ouvert le plus proche. *Plus tard* le décale d'au moins 30 min, *Fait* le retire.

## 5. Les notifications

Une fois activées (**Réglages → Notifications**), elles arrivent même appli fermée :

| Notification | Quand |
|---|---|
| **File courte** | une attraction passe sous le seuil choisi dans sa fiche (au plus une fois par 30 min) |
| **À refaire** | une attraction déjà faite, avec « À refaire si… », passe sous son seuil |
| **Réouverture** | une attraction de ton programme rouvre après une panne |
| **Pars maintenant** | c'est l'heure de partir pour ton créneau VirtualLine (temps de marche compris) |
| **Spectacle** | c'est l'heure de partir pour un spectacle choisi (5 min d'avance) |
| **Pause repas** | c'est le moment de manger prévu par l'itinéraire |
| **Pluie** | de la pluie est annoncée dans l'heure alors qu'il ne pleut pas : l'itinéraire passe aux attractions couvertes (aussi en bandeau dans l'appli) |

Les alertes de file courte, d'attraction à refaire et de réouverture sont mises en pause pendant que tu es « dans la file ». Appli ouverte, les mêmes alertes s'affichent aussi en bandeau, avec vibration.

## 6. Aide dans l'appli

Le bouton **?** en haut ouvre l'aide : démarrage, boutons, couleurs, calcul de l'itinéraire, VirtualLine, repas et spectacles, notifications, GPS, groupe, problèmes fréquents et **Nouveautés**. **Réglages → Aide et mises à jour** donne la version et un bouton **Mettre à jour**.

## 7. Le soir : récap de la journée

Chaque « Fait » est noté. Une fois le parc fermé, l'onglet **Maintenant** affiche **Ta journée** :
- le nombre de tours et le temps passé dans les files (mesuré si tu as utilisé « Dans la file », sinon le temps affiché) ;
- la distance à pied, estimée entre les attractions ;
- l'attente gagnée par rapport à l'attente moyenne relevée ce jour-là sur les mêmes attractions ;
- le meilleur coup et l'attraction préférée.

Le bouton **Partager** l'envoie à qui tu veux. Le récap est aussi disponible à tout moment dans **Réglages → Récap de ma journée**.

**Réglages → Nouvelle journée** remet à zéro les attractions faites, les créneaux, le repas et les alertes, en gardant le programme. Ça se fait aussi tout seul au changement de jour.

---

# Comment ça marche

## Les données

- **Temps d'attente, horaires, spectacles, VirtualLine** : themeparks.wiki (service communautaire, non officiel), qui relaie les temps annoncés par le parc. Le serveur les met en cache 1 min ; la page les rafraîchit toutes les 2 min.
- **Historique** : le cron enregistre l'attente de chaque attraction toutes les 4 min. Pour chaque attraction, le serveur en tire un **profil habituel** par tranche de 30 min, calculé sur les 21 derniers jours, en ne comparant que les jours du même type (semaine ou week-end). Sans historique, l'appli utilise une courbe générique de remplissage du parc.
- **Météo** : Open-Meteo, prévision heure par heure, mise à jour toutes les 30 min.
- **Coordonnées GPS des attractions** : themeparks.wiki. Les durées de marche sont calculées à vol d'oiseau × 1,35 (allées), selon le rythme choisi (55, 75 ou 90 m/min).

## La prévision d'attente

Pour estimer la file d'une attraction à l'heure où tu y arriveras, l'appli :
1. part de l'attente **affichée maintenant** ;
2. rejoint progressivement le **profil habituel** de l'attraction (après environ 1 h 30, c'est surtout l'habituel qui compte) ;
3. corrige ce profil de l'**affluence du jour** : rapport médian « attente actuelle / attente habituelle » sur tout le parc (affiché « Affluence : +20 % au-dessus d'un jour habituel ») ;
4. multiplie par ton **facteur temps réel** : avec « Dans la file » puis « Fait », elle compare le temps affiché à l'entrée au temps réellement attendu. Après deux mesures, l'itinéraire utilise la médiane de cet écart (souvent 70 à 90 % de l'affiché).

## Le choix de la prochaine étape

Toutes les 2 minutes et à chaque action, l'appli simule le reste de la journée étape par étape. À chaque étape, elle note chaque attraction du programme encore à faire :

```
score = gain − coût de marche − 0,15 × file prévue − 12 (si bonus) + météo
```

- **gain** : attente moyenne prévue plus tard dans la journée moins attente prévue maintenant. Une grosse attraction peu chargée maintenant a un gros gain.
- **coût de marche** : minutes de marche × 1 / 1,6 / 2,4 (*Moins d'attente* / *Équilibré* / *Moins de marche*). Chaque minute au-delà de 8 min de trajet compte double. L'appli ne fait traverser le parc que si ça vaut vraiment le coup.
- **coup d'avance** : pour les 6 meilleures, elle calcule aussi la meilleure attraction suivante depuis là-bas et garde le meilleur enchaînement. Résultat : on finit dans un coin où il reste de bonnes attractions, au lieu de faire des allers-retours.
- **single rider** (si accepté) : attente divisée par deux, ou remplacée par celle relevée dans la fiche ;
- **météo** : +8 pour une attraction couverte s'il pleut à ton arrivée, −15 pour une attraction extérieure par orage ou rafales de plus de 60 km/h. Pour une attraction mouillée : +5 au-dessus de 25 °C, −8 sous 17 °C ou sous la pluie.
- les **bonus** ne passent que s'il reste assez de temps pour tous les incontournables ;
- une attraction **en panne** est retentée 45 min plus tard ; une attraction **trop grande** pour le plus petit du groupe est écartée.

## Les étapes à heure fixe

- **Créneau VirtualLine** : l'itinéraire s'arrange pour que tu arrives à l'heure, et aucune attraction ne passe avant si elle risque de te le faire rater.
- **Spectacle choisi** : parmi les représentations du jour, l'appli prend celle où les files de tes incontournables sont au plus haut. Tu perds ainsi le moins de temps de file. Elle prévoit d'arriver 5 min avant et compte 30 min de spectacle.
- **Pause repas** : même principe dans ta fenêtre horaire, par pas de 15 min, au resto ouvert le plus proche (stands de boissons et glaciers exclus).

## Les profils et la synchronisation

Chaque profil est un fichier sur le serveur. L'appli y envoie son état 1 s après chaque changement, et récupère la version du serveur à chaque actualisation si elle est plus récente. En cas de conflit, la modification la plus récente gagne.

Les réglages d'affichage restent propres à chaque téléphone : onglet ouvert, filtre, GPS activé ou non.

## Les notifications push

Le cron appelle `api.php collect` chaque minute. Ce script :
1. relève les temps d'attente ;
2. pour chaque profil abonné qui a ouvert l'appli aujourd'hui, vérifie les conditions du tableau de la partie 5 (au plus 3 notifications par minute) ;
3. envoie les notifications au service de push du téléphone (Apple, Google ou Mozilla), qui les livre.

Pour savoir quand dire « pars maintenant », le serveur utilise ta dernière position GPS (moins de 10 min), sinon ta dernière attraction faite, sinon l'entrée.

## Les positions du groupe

Quand le partage est activé, le téléphone envoie sa position au serveur au plus une fois par minute, avec un identifiant d'appareil aléatoire et le prénom choisi. Les positions de moins de 20 min sont renvoyées avec les temps d'attente. Elles sont effacées au bout de 2 h, ou dès que le partage est décoché.

L'envoi suit le standard Web Push (VAPID + chiffrement `aes128gcm`), en PHP pur avec OpenSSL : ni Composer ni service tiers. Les clés VAPID sont générées automatiquement au premier appel dans `data/vapid.json`. Ne supprime pas ce fichier : tous les téléphones devraient se réabonner. Les services push demandent un contact. Par défaut, c'est l'adresse du site (`https://` + le nom d'hôte vu au dernier abonnement, retenu dans `data/site.txt`). La variable d'environnement `EP_VAPID_SUB` (`https://…` ou `mailto:…`) le remplace.

---

# Serveur

## Installation

Prérequis : nginx, PHP 8 avec PHP-FPM, et les extensions `openssl` et `curl` (recommandé ; sans elle, PHP utilise ses flux réseau). Il faut aussi un nom de domaine avec un certificat HTTPS, joignable depuis Internet : la page sert depuis le parc, en 4G.

```bash
# 1. Code
sudo git clone <url-du-dépôt> /var/www/europapark
sudo mkdir -p /var/www/europapark/www/data
sudo chown -R www-data:www-data /var/www/europapark/www/data

# 2. nginx : copie puis adapte server_name, certificats et socket PHP-FPM
sudo cp /var/www/europapark/deploy/nginx/europapark.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/europapark.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 3. Collecte de l'historique et notifications (chaque minute, 8 h – 21 h)
sudo cp /var/www/europapark/deploy/cron/europapark /etc/cron.d/europapark
sudo chmod 644 /etc/cron.d/europapark
```

Le cron tourne en `www-data`, le même utilisateur que PHP-FPM, pour que `data/` reste modifiable par la page. Lance-le **quelques jours avant ta visite** : chaque journée enregistrée améliore les prévisions.

### Vérification

```bash
curl -s https://europapark.example.com/api.php?r=health
# doit afficher "dataWritable": true (et "vapid": true après le premier abonnement push)

sudo -u www-data php /var/www/europapark/www/api.php collect
# {"ok":true,"snapshot":…,"pushed":0,…}

curl -s -o /dev/null -w "%{http_code}\n" https://europapark.example.com/data/cache/live.json
# doit afficher 403
```

### Mise à jour

```bash
cd /var/www/europapark && sudo git pull
```

`data/` est ignoré par git : l'historique et les profils sont conservés. La page et le service worker sont servis sans cache, donc les téléphones récupèrent la nouvelle version à la prochaine ouverture. Si le fichier `deploy/cron/europapark` a changé, recopie-le dans `/etc/cron.d/`.

Pour publier une nouvelle version, change `APP_VERSION` en haut du script de `index.html` et complète la rubrique « Nouveautés » de l'aide (`#help-news`). À la prochaine ouverture, chaque téléphone affiche « Nouvelle version de l'appli · Voir les nouveautés ».

### Protéger l'accès (optionnel)

Les profils n'ont pas de mot de passe et les positions partagées sont visibles par tous ceux qui ouvrent l'appli. Pour un usage privé, une adresse que tu ne diffuses pas suffit généralement. Pour réserver l'appli à ton groupe, tu peux aussi activer le mot de passe commun prévu (commenté) dans `deploy/nginx/europapark.conf` :

```bash
sudo apt install apache2-utils
sudo htpasswd -c /etc/nginx/europapark.htpasswd groupe
# puis décommente auth_basic / auth_basic_user_file et recharge nginx
```

Le manifeste est chargé avec les identifiants (`crossorigin="use-credentials"`), donc l'installation sur l'écran d'accueil fonctionne derrière cette protection. Un portail d'authentification (Authelia, Authentik…) fonctionne aussi. Si la session expire, `api.php` ne répond plus en JSON : la page bascule alors toute seule sur l'API publique, sans historique ni profils, jusqu'à la reconnexion.

## Historique

Le cron tourne chaque minute de 8 h à 21 h : il enregistre un point d'historique toutes les 4 min au plus et envoie les notifications. L'historique est conservé 45 jours ; plus il y a de jours enregistrés, meilleures sont les prévisions.

## API du relais

Toutes les réponses sont en JSON. Une erreur renvoie `{"error": "…"}` avec le code HTTP adapté (400, 404, 405, 409, 413), ou 502 si une API amont est injoignable sans cache.

| Route | Rôle |
|---|---|
| `GET ?r=bundle[&u=ID&since=ms]` | temps en direct + statistiques + `weather` (appelé par la page). Avec `u` : `user` = `null` si le profil n'existe pas, sinon `{id, name, updatedAt, push, state}` ; `push` = nombre de téléphones abonnés, `state` seulement s'il est plus récent que `since` |
| `GET ?r=live` · `children` · `schedule` | données brutes themeparks.wiki, avec cache |
| `GET ?r=weather` | prévisions Open-Meteo brutes (cache 30 min ; après un échec, pas de nouvel essai avant 5 min) |
| `GET ?r=calendar` | `{days: [{day, avg, peak}]}` : attente moyenne (11 h – 16 h) de chaque jour passé de l'historique |
| `GET ?r=users` | `[{id, name, updatedAt}]`, triés par nom |
| `POST ?r=user` `{name}` | crée un profil → 201 `{id, name}` ; 409 si le pseudo existe (avec son `id`) |
| `GET ?r=state&u=ID` | `{id, name, updatedAt, state}` |
| `POST ?r=state&u=ID` `{updatedAt, state}` | enregistre l'état (256 Ko max). Le plus récent gagne : 409 `{updatedAt, state}` si le serveur a une version plus récente |
| `GET ?r=push-key` | `{key}` : clé publique VAPID (`applicationServerKey`) |
| `POST ?r=push-sub&u=ID` | enregistre la `PushSubscription` du téléphone (retirée des autres profils) → `{ok, subs}` |
| `POST ?r=push-unsub&u=ID` `{endpoint}` | supprime un abonnement |
| `GET ?r=where` · `POST ?r=where` `{device, nick, lat, lon}` | positions partagées de moins de 20 min (`lat: null` arrête le partage) ; aussi renvoyées par `bundle` (`where`) |
| `POST ?r=push-test&u=ID` | notification de test vers tous les téléphones du profil → `{sent, codes}` |
| `?r=collect` | collecte + notifications (aussi `php api.php collect`, utilisé par le cron) |
| `GET ?r=health` | état du cache, de l'historique, nombre de profils, clés VAPID |

Un profil n'a pas de mot de passe : son identifiant est dérivé du pseudo (16 caractères hexadécimaux). Toute personne qui connaît l'adresse de la page peut voir la liste des pseudos et modifier un profil : voir « Protéger l'accès ».

## Données

`data/` (ou le dossier de la variable d'environnement `EP_DATA_DIR`) est créé par `api.php` :

```
data/
  cache/          réponses amont (live, children, schedule, weather), profils habituels et calendrier du jour
  hist/           un fichier par jour : un point toutes les 4 min (attente par attraction + statut des autres)
  users/<id>.json         profil : {id, name, created, updatedAt, state}
  users/<id>.push.json    abonnements push du profil + notifications déjà envoyées (dernières 24 h)
  vapid.json      clés VAPID du serveur (privée !), droits 600
  site.txt        nom d'hôte du site, pour le contact VAPID des envois faits par le cron
  where.json      positions partagées du groupe (effacées après 2 h)
```

L'historique est conservé 45 jours. Les fichiers sont écrits de façon atomique et verrouillés (`*.lock`).

## Test

- `https://europapark.example.com/?now=2026-10-06T10:30` simule une autre heure (badge « Heure simulée »). Les temps d'attente restent ceux du moment réel.
- Si `api.php` ne répond pas, la page interroge directement themeparks.wiki et Open-Meteo, sans historique, profils ni notifications, avec un profil local au téléphone.

## Limites

- Les temps sont ceux annoncés par le parc, relayés par themeparks.wiki (service communautaire, non officiel).
- Les durées de marche sont estimées à vol d'oiseau, avec une correction pour les allées.
- La réservation VirtualLine se fait uniquement dans l'appli officielle Europa-Park.
- Les tailles minimales sont indicatives : le panneau à l'entrée de l'attraction fait foi.
- Les files single rider ne sont pas fournies par l'API : la liste et l'estimation sont indicatives.
- Les profils n'ont pas de mot de passe : quiconque connaît l'adresse peut les voir et les modifier (voir « Protéger l'accès »).
- Projet non officiel, sans lien avec Europa-Park. « Europa-Park » et « VirtualLine » sont des marques de leurs propriétaires.
