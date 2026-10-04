# Europa-Park Live

Appli web pour téléphone, à installer sur l'écran d'accueil, qui t'accompagne pendant une journée à Europa-Park (ou dans un autre parc, voir « Autres parcs ») :

- elle affiche les temps d'attente en direct ;
- elle te dit à chaque instant **quelle attraction faire maintenant** et propose **l'itinéraire du reste de la journée** ;
- elle t'envoie des **notifications**, même téléphone en poche.

Elle s'auto-héberge sur n'importe quel petit serveur avec nginx et PHP 8 (un Raspberry Pi suffit), ou avec Docker. Il n'y a ni base de données, ni Composer, ni service payant. Projet non officiel, sans lien avec Europa-Park.

Dans ce document, `europapark.example.com` désigne l'adresse de ton installation.

```
www/                              ← racine web (/var/www/europapark/www)
  index.html                      l'appli complète (style + logique)
  i18n.js                         textes de l'interface en français, anglais et allemand
  api.php                         relais du serveur : temps d'attente, historique, météo, profils, notifications push
  sw.js, manifest.webmanifest     installation sur l'écran d'accueil, ouverture hors réseau, réception des notifications
  parks.json                      description des parcs (identifiant, entrée, listes d'attractions…)
  parks/<parc>.walk.json          distances à pied par les allées (OpenStreetMap), générées par tools/walk-matrix.php
  parks/<parc>.poi.json           toilettes, eau, casiers, distributeurs, parkings (OpenStreetMap), générés par tools/park-poi.php
  data/                           créé par api.php, jamais servi, ignoré par git (voir « Données »)
deploy/
  nginx/europapark.conf           vhost nginx (à adapter)
  cron/europapark                 collecte + notifications, chaque minute de 8 h à 21 h
tools/walk-matrix.php             génère les distances à pied d'un parc
tools/park-poi.php                génère les points pratiques d'un parc
Dockerfile, docker-compose.yml, docker/   installation avec Docker
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

**Programme commun** : chacun met ses étoiles dans son propre profil, puis **Réglages → Fusionner des programmes** (en étant connecté au profil qui recevra le résultat, par exemple « Groupe »). Tu coches les profils à prendre en compte. Une attraction devient incontournable si au moins la moitié des profils la mettent en incontournable, bonus si au moins un profil la veut ; tous les spectacles choisis sont gardés. « Annuler » rétablit l'ancien programme.

**Se séparer puis se retrouver** : chaque sous-groupe utilise son propre profil. Dans la fiche d'une attraction, « Se retrouver ici » fixe l'heure du rendez-vous. L'itinéraire de chacun s'arrange pour y être à l'heure, avec le bandeau et la notification « Pars maintenant ». **Partager** envoie le rendez-vous aux autres par un lien (`?meet=AAAA-MM-JJTHH:MM&at=<attraction>`), qui l'ajoute à leur profil dès l'ouverture.

**Pour se retrouver** : dans **Réglages → Ma position**, coche « Partager ma position avec le groupe » et indique ton prénom. Sur la **Carte**, chaque membre apparaît en point plein avec son prénom et le temps de marche jusqu'à lui. Un losange marque le **point de rencontre** conseillé : l'attraction la plus proche du centre du groupe. Une position disparaît 20 min après le dernier point, ou dès qu'on décoche le partage.

## 3. Démarrer en 3 questions

Avec un profil neuf, l'appli pose trois questions, une par écran :
1. « Tu préfères… » 🎢 *Ça secoue !*, 🎠 *Tranquille* ou 😄 *Un peu de tout* : le programme se remplit tout seul.
2. « Il y a des petits avec vous ? » : non, ou la taille du plus petit (90 à 130 cm).
3. « C'est tout simple » : comment se servir de l'appli, avec deux boutons pour activer la position et les notifications.

Tout se modifie ensuite dans **Attractions** (les étoiles) et dans **Réglages**.

## 4. Mode simple ou complet

**Réglages → Affichage** propose deux modes, au choix sur chaque téléphone :

- **😊 Simple** (par défaut) : l'écran Maintenant n'affiche qu'une chose, en gros. Par exemple « 👉 Va à Silver Star · 🚶 1 min · ⏱ 20 min de file », avec trois boutons :
  - **🙋 J'y suis** (tu fais la queue) ;
  - **✅ Fini !** (l'étape suivante arrive toute seule) ;
  - **⏭ Pas maintenant**.

  Une **flèche** montre la direction et la distance de la prochaine étape, à vol d'oiseau. Avec la position activée, elle tourne avec le téléphone grâce à la boussole ; sur iPhone, il faut l'autoriser une fois. Sans boussole, le nord est en haut. Elle affiche « 🎯 Tu y es ! » à l'arrivée. **Voir toute la journée** déplie l'affichage complet sans changer de mode.
- **🤓 Complet** : tout l'affichage détaillé (panneau, autres bons choix, itinéraire, VirtualLine, spectacles), avec les réglages avancés ouverts.

Dans les deux modes, les Réglages commencent par l'essentiel : langue, affichage, profil, programme, taille, position, installation, notifications, aide. Le reste est rangé dans **Réglages avancés**.

Les libellés sont simples : ⭐ *J'adore* (incontournable), 👍 *Si on a le temps* (bonus), ⏭ *Pas maintenant*, 🙋 *File solo* (single rider).

## 5. Préparer la journée (la veille)

**🧳 Prêt pour demain ?** (Réglages, ou bouton dans l'aperçu de la veille) teste le téléphone en un bouton et affiche ✅ ou ❌ pour chaque point :
- serveur joignable, profil enregistré ;
- position GPS (avec sa précision) et boussole ;
- notifications, avec un bouton pour envoyer un test ;
- carte téléchargée, appli installée sur l'écran d'accueil.

Il reste ensuite à cocher soi-même les billets liés dans l'appli officielle (pour VirtualLine), la batterie externe et le rappel d'enregistrer la place de la voiture. Lance-le sur chaque téléphone du groupe.

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
4. **Affichage** : **mode plein soleil** (contraste maximal, textes plus gros, pour lire l'écran dehors) et **économie de batterie** (GPS moins précis, actualisation toutes les 5 min au lieu de 2). Sur Android, l'appli propose l'économie d'elle-même sous 20 % de batterie.
5. **Carte hors ligne** : dans l'onglet **Carte**, « Télécharger la carte » enregistre tout le parc sur le téléphone (environ 300 tuiles, quelques Mo). À faire en wifi : la carte reste utilisable quand la 4G sature.
6. **Quel jour venir ?** (Réglages) : affluence prévue des prochains jours d'ouverture, de *calme* à *très chargé*. Elle combine ton historique (ou, à défaut, le jour de la semaine) avec les vacances scolaires et jours fériés des régions d'où viennent les visiteurs : pour Europa-Park, Bade-Wurtemberg, Rhénanie-Palatinat, Hesse, Sarre, Grand Est et le reste de la France, et les cantons suisses voisins.

Le soir et la veille, l'onglet **Maintenant** affiche un **aperçu de la journée suivante** : itinéraire estimé depuis l'ouverture, météo, conseils, et **affluence prévue**. Celle-ci correspond à l'attente moyenne habituelle de ce jour de la semaine, comparée à la moyenne des derniers jours enregistrés par le serveur.

## 6. Dans le parc

En mode complet, l'onglet **Maintenant** montre en grand la **prochaine étape** : son nom, l'attente actuelle, le temps de marche et la raison du choix. Juste en dessous, trois autres bons choix et l'itinéraire du reste de la journée avec les heures d'arrivée.

| Bouton | Effet |
|---|---|
| **Dans la file** | tu entres dans la queue : un minuteur démarre et l'itinéraire part de la fin de cette attraction |
| **Fait** | à la sortie : l'itinéraire repart de cette attraction. Si tu étais « dans la file », le temps réellement attendu est mesuré |
| **Plus tard** | écarte l'attraction pendant 30 minutes |
| **Quitter la file** | tu abandonnes la queue |

Toucher le nom ouvre la **fiche** de l'attraction :
- l'attente, l'attente habituelle à cette heure et la courbe de la journée comparée à l'habituel ;
- les **heures creuses et de pointe** habituelles (« Au plus bas vers 17:30, ~15 min · pic vers 12:15, ~55 min ») ;
- la taille minimale et l'état du VirtualLine ;
- **ta note** (1 à 5 étoiles) et celle du groupe ;
- les choix « M'alerter sous… » et « À refaire si l'attente passe sous… ».

**Avec le GPS**, l'appli remarque toute seule où tu es :
- arrivé à une attraction du programme, elle demande « Tu fais la queue ? » ;
- en repartant, elle demande « Tu as fini ? » ;
- les temps de marche partent de ta position réelle (sans GPS : de la dernière attraction faite, ou de l'entrée).

**VirtualLine** (coupe-file gratuit) :
1. La carte VirtualLine indique quelle attraction réserver maintenant (celle où ça fait gagner le plus).
2. Réserve dans l'**appli officielle Europa-Park** (un seul créneau à la fois par billet).
3. Note ton créneau avec **J'ai un créneau**, ou en un geste avec **J'ai réservé 15:20** quand l'heure proposée est connue. L'itinéraire s'organise autour et te dit quand partir.
4. Après **Fait** sur le créneau, l'appli te dit quoi re-réserver tout de suite.

Le bouton **Ouvrir l'appli** lance l'appli officielle : directement sur Android, et par sa fiche App Store sur iPhone. Avec les notifications, tu es prévenu quand une file virtuelle s'ouvre sur une attraction de ton programme, si tu n'as pas déjà un créneau. La réservation elle-même se fait toujours dans l'appli officielle : il n'en existe pas d'accès public, et imiter l'appli avec tes identifiants serait contraire aux conditions du parc.

**La carte** affiche le parc sur un fond OpenStreetMap (allées, bâtiments, lacs), zoomable. Elle prend toute la hauteur de l'écran. Les grosses pastilles correspondent à ton programme et indiquent l'attente en direct ; un pointillé mène à la prochaine étape, et le groupe apparaît s'il partage sa position. Les zones déjà vues restent en mémoire pour les moments où le réseau sature.

| Bouton de la carte | Effet |
|---|---|
| ⤢ | plein écran (✕ ou Échap pour sortir) |
| ◎ | te recentre et te suit pendant que tu marches ; déplacer la carte arrête le suivi |
| 🗺 | revient à la vue de tout le parc |
| 🚻 | montre les toilettes les plus proches |
| 🚗 | ta voiture |

Au-dessus de la carte, des boutons affichent ou masquent les **toilettes, l'eau potable, les casiers, les distributeurs et les parkings** issus d'OpenStreetMap. À Europa-Park, la carte compte 28 toilettes ; seuls 3 robinets d'eau potable sont signalés, et seuls les casiers de l'entrée sont cartographiés.

**Ta voiture** : en arrivant, enregistre ta place, soit avec ta position GPS, soit en choisissant le parking dans la liste. Elle est enregistrée dans le profil, donc tout le groupe la voit. Le soir, l'onglet Maintenant affiche « Retour à la voiture » avec le temps de marche et un lien d'itinéraire (Google Maps, à pied).

**Spectacles de saison** : en période d'Halloween ou de Noël, les spectacles correspondants sont marqués 🎃 et passent en tête de la liste (regex `seasonal` dans `parks.json`). Les attractions payantes en supplément, comme les maisons hantées, ne sont pas dans les données.

**Repas et spectacles** apparaissent dans l'itinéraire comme des étapes à heure fixe. Pour le repas, l'appli indique le resto ouvert le plus proche. *Plus tard* le décale d'au moins 30 min, *Fait* le retire.

## 7. Les notifications

Une fois activées (**Réglages → Notifications**), elles arrivent même appli fermée :

| Notification | Quand |
|---|---|
| **File courte** | une attraction passe sous le seuil choisi dans sa fiche (au plus une fois par 30 min) |
| **À refaire** | une attraction déjà faite, avec « À refaire si… », passe sous son seuil |
| **Réouverture** | une attraction de ton programme rouvre après une panne |
| **Pars maintenant** | c'est l'heure de partir pour ton créneau VirtualLine (temps de marche compris) |
| **Spectacle** | c'est l'heure de partir pour un spectacle choisi (5 min d'avance) |
| **Pause repas** | c'est le moment de manger prévu par l'itinéraire |
| **Dernier appel** | 45 min avant la fermeture : les dernières attractions encore faisables, ton programme d'abord |
| **Rendez-vous** | c'est l'heure de partir pour le rendez-vous du groupe |
| **Pluie** | de la pluie est annoncée dans l'heure alors qu'il ne pleut pas : l'itinéraire passe aux attractions couvertes (aussi en bandeau dans l'appli) |

Les alertes de file courte, d'attraction à refaire et de réouverture sont mises en pause pendant que tu es « dans la file ». Appli ouverte, les mêmes alertes s'affichent aussi en bandeau, avec vibration.

## 8. Aide dans l'appli

Le bouton **?** en haut ouvre l'aide : démarrage, boutons, couleurs, calcul de l'itinéraire, VirtualLine, repas et spectacles, notifications, GPS, groupe, problèmes fréquents et **Nouveautés**. **Réglages → Aide et mises à jour** donne la version et un bouton **Mettre à jour**.

## 9. Le soir : récap de la journée

Chaque « Fait » est noté. Une fois le parc fermé, l'onglet **Maintenant** affiche **Ta journée** :
- le nombre de tours et le temps passé dans les files (mesuré si tu as utilisé « Dans la file », sinon le temps affiché) ;
- la distance à pied, estimée entre les attractions ;
- l'attente gagnée par rapport à l'attente moyenne relevée ce jour-là sur les mêmes attractions ;
- le meilleur coup, l'attraction préférée et **vos mieux notées**.

**Badges** : 🎢 5 gros frissons, 💦 Trempé (3 attractions mouillées), 🔁 Encore ! (même attraction ×3), ⚡ Éclair (grosse attraction à 10 min ou moins), 🌅 Lève-tôt, 🦉 Dernier tour, 🏅 15 tours, 🏆 Toutes les préférées, 🚶 Marathonien (8 km), 🎭 Spectateur, 🎟 Pro du coupe-file, 🧠 Malin (1 h de file gagnée). Ils s'annoncent dans la journée, s'affichent dans le récap et partent avec le texte partagé.

**Notes** : après chaque « Fait », un bandeau te demande une note de 1 à 5 étoiles ; tu peux aussi noter depuis la fiche. 4 étoiles ajoutent l'attraction à « À refaire » sous 15 min, 5 étoiles sous 20 min, si rien n'est déjà réglé. La liste des attractions affiche la note moyenne de tous les profils du serveur.

Le bouton **Partager** l'envoie à qui tu veux. Le récap est aussi disponible à tout moment dans **Réglages → Récap de ma journée**.

**Réglages → Nouvelle journée** remet à zéro les attractions faites, les créneaux, le repas et les alertes, en gardant le programme. Ça se fait aussi tout seul au changement de jour.

## 10. Langues

L'appli existe en **français**, **anglais** et **allemand**. Par défaut, elle prend la langue du téléphone (une autre langue que ces trois-là donne l'anglais). **Réglages → Langue / Language / Sprache** la change pour ce téléphone, sans recharger la page ; les dates, les nombres et l'aide suivent.

La langue choisie est aussi enregistrée avec le profil : les notifications push arrivent dans la langue du dernier téléphone qui l'a réglée (avec un profil commun à plusieurs téléphones, c'est donc une seule langue pour tous).

Pour ajouter une langue : dans `www/i18n.js`, copier le bloc `I18N.en` sous un nouveau code (`I18N.nl = {…}`), traduire chaque valeur (les `{nom}` sont remplacés par l'appli, les fonctions gèrent les pluriels), ajouter un bouton `data-lang="nl"` dans `#langSeg` de `index.html`, puis les textes des notifications dans `MSG` en haut de `api.php`. Une clé absente d'une langue s'affiche en français.

---

# Comment ça marche

## Les données

- **Temps d'attente, horaires, spectacles, VirtualLine** : themeparks.wiki (service communautaire, non officiel), qui relaie les temps annoncés par le parc. Le serveur les met en cache 1 min ; la page les rafraîchit toutes les 2 min.
- **Historique** : le cron enregistre l'attente de chaque attraction toutes les 4 min. Pour chaque attraction, le serveur en tire un **profil habituel** par tranche de 30 min, calculé sur les 21 derniers jours, en ne comparant que les jours du même type (semaine ou week-end). Sans historique, l'appli utilise une courbe générique de remplissage du parc.
- **Météo** : Open-Meteo, prévision heure par heure, mise à jour toutes les 30 min.
- **Coordonnées GPS des attractions** : themeparks.wiki.
- **Distances à pied** : par les vraies allées du parc, grâce à une matrice précalculée depuis OpenStreetMap (`parks/<parc>.walk.json`). Les files d'attente et les zones réservées au personnel en sont exclues. À Europa-Park, le trajet réel fait en médiane 1,16 fois la ligne droite, et jusqu'à 2,6 fois autour des plans d'eau. Depuis une position GPS, l'appli rejoint le point connu le plus proche, puis suit les allées. Sans matrice, elle compte la ligne droite × 1,35. Le temps dépend du rythme choisi : 55, 75 ou 90 m/min.
- **Durée des attractions** : `rideMin` dans `parks.json` (par exemple 4 min pour un grand huit, 10 à 12 pour un parcours scénique), 5 min par défaut.
- **Carte** : tuiles OpenStreetMap affichées avec Leaflet.

## La prévision d'attente

Pour estimer la file d'une attraction à l'heure où tu y arriveras, l'appli :
1. part de l'attente **affichée maintenant** ;
2. rejoint progressivement le **profil habituel** de l'attraction (après environ 1 h 30, c'est surtout l'habituel qui compte) ;
3. corrige ce profil de l'**affluence du jour** : rapport médian « attente actuelle / attente habituelle » sur tout le parc (affiché « Affluence : +20 % au-dessus d'un jour habituel ») ;
4. multiplie par le **facteur temps réel** : avec « Dans la file » puis « Fait », elle compare le temps affiché à l'entrée au temps réellement attendu. Elle utilise la médiane de cet écart (souvent 70 à 90 % de l'affiché). Les mesures de tous les profils du serveur (30 derniers jours) servent à tout le monde ; dès que tu as deux mesures à toi, ce sont les tiennes qui comptent. L'écart est calculé **par attraction** dès qu'il y a assez de mesures (2 à toi, ou 3 de tous les profils), car certaines attractions gonflent davantage leur affichage que d'autres ; sinon, c'est l'écart moyen qui s'applique.

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

## Rejouer une journée

**Réglages → Rejouer une journée** rejoue un jour enregistré par le cron avec ton programme et les files réellement relevées ce jour-là, minute par minute : marche, attente réelle à l'arrivée, durée du tour, attraction fermée à l'arrivée retentée plus tard. Trois stratégies sont comparées :
- l'**itinéraire de l'appli** ;
- l'**ordre du programme** ;
- la **file la plus courte** à chaque étape.

Le tableau donne les incontournables faits, le nombre de tours, le temps de file et le temps de marche. Sur une journée de test, l'appli faisait les 13 incontournables, contre 10 et 9 pour les deux autres stratégies ; celles-ci faisaient plus de tours au total, en enchaînant des petites attractions bonus. Limite : le profil habituel peut inclure le jour rejoué, ce qui avantage un peu l'appli.

## Les étapes à heure fixe

- **Créneau VirtualLine** : l'itinéraire s'arrange pour que tu arrives à l'heure, et aucune attraction ne passe avant si elle risque de te le faire rater.
- **Spectacle choisi** : parmi les représentations du jour, l'appli prend celle où les files de tes incontournables sont au plus haut. Tu perds ainsi le moins de temps de file. Elle prévoit d'arriver 5 min avant et compte 30 min de spectacle.
- **Rendez-vous du groupe** : heure et lieu fixes, l'itinéraire s'arrange pour que tu y sois à l'heure.
- **Pause repas** : même principe dans ta fenêtre horaire, par pas de 15 min, au resto ouvert le plus proche (stands de boissons et glaciers exclus).

## Les profils et la synchronisation

Chaque profil est un fichier sur le serveur. L'appli y envoie son état 1 s après chaque changement, et récupère la version du serveur à chaque actualisation si elle est plus récente. En cas de conflit, la modification la plus récente gagne.

Les réglages d'affichage restent propres à chaque téléphone : onglet ouvert, filtre, GPS activé ou non, langue.

## Les notifications push

Le cron appelle `api.php collect` chaque minute. Ce script :
1. relève les temps d'attente ;
2. pour chaque profil abonné qui a ouvert l'appli aujourd'hui, vérifie les conditions du tableau de la partie 5 (au plus 3 notifications par minute) ;
3. envoie les notifications au service de push du téléphone (Apple, Google ou Mozilla), qui les livre.

Le texte des notifications est dans la langue du profil (`state.lang`, voir « Langues »). Pour savoir quand dire « pars maintenant », le serveur utilise ta dernière position GPS (moins de 10 min), sinon ta dernière attraction faite, sinon l'entrée.

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

## Installation avec Docker

Une seule image contient la page, le relais PHP (nginx + PHP-FPM) et la collecte (cron). Elle écoute en **HTTP sur le port 8080**, sans certificat : place-la derrière ton propre reverse proxy (Caddy, Traefik, nginx…), qui fournit le HTTPS. Le HTTPS est obligatoire pour le GPS, les notifications et l'installation sur l'écran d'accueil, et l'adresse doit être joignable depuis Internet (la page sert depuis le parc, en 4G).

```bash
git clone <url-du-dépôt> europapark && cd europapark
docker compose up -d --build
curl -s http://localhost:8080/api.php?r=health
# doit afficher "dataWritable": true
```

La collecte tourne dans le conteneur, chaque minute de 8 h à 20 h 59 (fuseau `TZ`), avec le même utilisateur que PHP-FPM (`www-data`). Démarre le conteneur **quelques jours avant ta visite**. Pour lancer une collecte à la main :

```bash
docker compose exec -u www-data europapark php /var/www/europapark/www/api.php collect
```

**Reverse proxy et HTTPS.** Le reverse proxy doit transmettre l'en-tête `Host` d'origine et `X-Forwarded-Proto: https` (c'est le cas par défaut avec Caddy et Traefik). Le plus simple est Caddy, qui obtient et renouvelle tout seul le certificat : décommente le service `caddy` dans `docker-compose.yml`, remplace `europapark.example.com` par ton nom de domaine (il doit pointer vers le serveur, ports 80 et 443 ouverts) et retire `ports` du service `europapark`. Avec un reverse proxy déjà en place, fais-le pointer vers `http://<serveur>:8080`.

Pour le mot de passe commun optionnel, crée le fichier avec `htpasswd -c ./europapark.htpasswd groupe`, décommente le montage correspondant dans `docker-compose.yml` et les lignes `auth_basic` dans `docker/nginx.conf`, puis reconstruis l'image.

| Variable | Par défaut | Rôle |
|---|---|---|
| `TZ` | `Europe/Berlin` | fuseau horaire des heures de collecte (mets celui du parc) |
| `EP_PARK` | premier parc de `parks.json` | parc suivi par l'instance |
| `EP_VAPID_SUB` | adresse du site | contact transmis aux services push (ex. `mailto:moi@example.com`) |
| `EP_UPSTREAM` | `https://api.themeparks.wiki/v1/entity` | API des temps d'attente |
| `EP_DATA_DIR` | `/var/www/europapark/www/data` | dossier des données dans le conteneur |

**Mise à jour** : `git pull && docker compose up -d --build`. Les données sont dans le volume `europapark-data` (historique, profils, clés de notification) et sont conservées.

**Sauvegarde** (la clé VAPID est dedans : sans elle, les abonnements push existants ne fonctionnent plus) :

```bash
docker compose exec europapark tar czf - -C /var/www/europapark/www data > europapark-data-$(date +%F).tar.gz
docker compose exec -T europapark tar xzf - -C /var/www/europapark/www < europapark-data-AAAA-MM-JJ.tar.gz   # restauration
docker compose restart europapark
```

## Autres parcs

Le parc d'une instance est choisi par la variable d'environnement `EP_PARK` : nginx (`fastcgi_param EP_PARK …;`), PHP-FPM (`env[EP_PARK] = …`) et le cron, ou simplement `environment` avec Docker. Par défaut, c'est le premier parc de `www/parks.json`.

Parcs fournis (`EP_PARK`) :

| `EP_PARK` | Parc | Fuseau | Distances à pied | File virtuelle gratuite |
|---|---|---|---|---|
| `europapark` | Europa-Park (Rust) | Europe/Berlin | oui | VirtualLine |
| `phantasialand` | Phantasialand (Brühl) | Europe/Berlin | à générer | — |
| `efteling` | Efteling (Kaatsheuvel) | Europe/Amsterdam | à générer | Virtual Queue |
| `disneylandpark` | Disneyland Park (Paris) | Europe/Paris | à générer | — (Premier Access est payant) |
| `waltdisneystudios` | Disney Adventure World (Paris) | Europe/Paris | à générer | — |
| `parcasterix` | Parc Astérix (Plailly) | Europe/Paris | à générer | — |

Pour les parcs autres qu'Europa-Park, les listes (tailles, couvert, mouillé, single rider, durées, programmes types) ont été établies à partir des pages officielles et de sources de fans (voir `sources` dans `parks.json`). Elles sont plus sommaires : corrections bienvenues. Sans fichier de distances, l'appli compte la ligne droite × 1,35.

Utilise un `EP_DATA_DIR` différent par parc : l'historique et les profils d'un parc n'ont pas de sens pour un autre. Les données propres à Europa-Park (VirtualLine, tailles minimales, single rider…) sont sans effet ailleurs quand le parc n'en a pas.

**Ajouter un parc** : dans `www/parks.json`, une entrée par parc avec :
- l'identifiant themeparks.wiki (`https://api.themeparks.wiki/v1/destinations`) ;
- le fuseau horaire, les coordonnées de l'entrée et `bounds` : le rectangle du parc, qui exclut les parcs voisins de la même destination ;
- les listes d'attractions : `tiers`, `presets`, `indoor`, `wet`, `minCm`, `singleRider`, `rideMin`, `transport`, `virtualQueue`.

Les listes contiennent des morceaux de nom normalisé (minuscules, sans accents ni espaces : « blue fire Megacoaster » → `bluefiremegacoaster`, donc `bluefire`). Génère ensuite les distances à pied :

```bash
php tools/walk-matrix.php --park-id=<id> --bbox=sud,ouest,nord,est --entrance=lat,lon \
    --out=www/parks/<parc>.walk.json [--osm-cache=osm.json]
```

Le script récupère les allées du parc sur OpenStreetMap (Overpass) et en garde le plus grand réseau connecté, en ignorant les files d'attente et les accès privés. Il raccroche chaque attraction, spectacle et restaurant à l'allée la plus proche, puis calcule tous les plus courts chemins. Il affiche un résumé : points raccrochés, distance de raccrochement maximale, rapport chemin / ligne droite. Overpass limite les requêtes : `--osm-cache` permet de relancer le calcul sans tout retélécharger.

Les points pratiques (toilettes, eau, casiers, distributeurs, parkings) se génèrent de la même façon :

```bash
php tools/park-poi.php --bbox=sud,ouest,nord,est --out=www/parks/<parc>.poi.json [--osm-cache=osm.json]
```

Seuls les points situés dans le contour du parc sur OpenStreetMap sont gardés ; pour les parkings, la zone est élargie d'environ 1,2 km. Pour la prévision d'affluence, ajoute dans `parks.json` la liste `holidays` des régions d'où viennent les visiteurs, avec leur poids : `{"c": "DE", "s": "DE-BW", "w": 4}`, ou `"s": null` pour tout le pays. Les codes sont ceux d'[OpenHolidays](https://openholidaysapi.org).

## Historique

Le cron tourne chaque minute de 8 h à 21 h : il enregistre un point d'historique toutes les 4 min au plus et envoie les notifications. L'historique est conservé 45 jours ; plus il y a de jours enregistrés, meilleures sont les prévisions.

## API du relais

Toutes les réponses sont en JSON. Une erreur renvoie `{"error": "…"}` avec le code HTTP adapté (400, 404, 405, 409, 413), ou 502 si une API amont est injoignable sans cache.

| Route | Rôle |
|---|---|
| `GET ?r=bundle[&u=ID&since=ms]` | temps en direct + statistiques + `weather` + `where` (positions du groupe) + `real` (mesures partagées entre profils : écart temps réel/affiché global et par attraction, notes moyennes) (appelé par la page). Avec `u` : `user` = `null` si le profil n'existe pas, sinon `{id, name, updatedAt, push, state}` ; `push` = nombre de téléphones abonnés, `state` seulement s'il est plus récent que `since` |
| `GET ?r=live` · `children` · `schedule` | données brutes themeparks.wiki, avec cache |
| `GET ?r=weather` | prévisions Open-Meteo brutes (cache 30 min ; après un échec, pas de nouvel essai avant 5 min) |
| `GET ?r=calendar` | `{days: [{day, avg, peak}]}` : attente moyenne (11 h – 16 h) de chaque jour passé de l'historique |
| `GET ?r=users` | `[{id, name, updatedAt}]`, triés par nom |
| `POST ?r=user` `{name}` | crée un profil → 201 `{id, name}` ; 409 si le pseudo existe (avec son `id`). `&lang=fr\|en\|de` : langue du message d'erreur |
| `GET ?r=state&u=ID` | `{id, name, updatedAt, state}` |
| `POST ?r=state&u=ID` `{updatedAt, state}` | enregistre l'état (256 Ko max). Le plus récent gagne : 409 `{updatedAt, state}` si le serveur a une version plus récente |
| `GET ?r=push-key` | `{key}` : clé publique VAPID (`applicationServerKey`) |
| `POST ?r=push-sub&u=ID` | enregistre la `PushSubscription` du téléphone (retirée des autres profils) → `{ok, subs}` |
| `POST ?r=push-unsub&u=ID` `{endpoint}` | supprime un abonnement |
| `GET ?r=where` · `POST ?r=where` `{device, nick, lat, lon}` | positions partagées de moins de 20 min (`lat: null` arrête le partage) ; aussi renvoyées par `bundle` (`where`) |
| `POST ?r=push-test&u=ID[&lang=fr\|en\|de]` | notification de test vers tous les téléphones du profil → `{sent, codes}` |
| `?r=collect` | collecte + notifications (aussi `php api.php collect`, utilisé par le cron) |
| `GET ?r=history&d=AAAA-MM-JJ` | relevés d'une journée passée (`data/hist`), pour « Rejouer une journée » |
| `GET ?r=forecast` | affluence prévue des prochains jours d'ouverture : `{days: [{day, open, close, idx, level 1–4, why}], history}` (cache d'un jour) |
| `GET ?r=config` | description du parc de l'instance (`parks.json[EP_PARK]` + `slug`) |
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
- Les distances à pied suivent les allées d'OpenStreetMap, entre les coordonnées des attractions (souvent leur centre, pas leur entrée) : ±50 m possibles.
- La réservation VirtualLine se fait uniquement dans l'appli officielle Europa-Park.
- Les tailles minimales sont indicatives : le panneau à l'entrée de l'attraction fait foi.
- Les files single rider ne sont pas fournies par l'API : la liste et l'estimation sont indicatives.
- Les profils n'ont pas de mot de passe : quiconque connaît l'adresse peut les voir et les modifier (voir « Protéger l'accès »).
- Projet non officiel, sans lien avec Europa-Park. « Europa-Park » et « VirtualLine » sont des marques de leurs propriétaires.
