'use strict';
/* Traductions de l'interface : français (texte d'origine), anglais, allemand.
   t('clé', {nom: valeur}) remplace les {nom} du texte. Une valeur peut aussi être :
   - une fonction ({n}) => … pour les pluriels ;
   - un objet (libellés par état, ex. t('status').DOWN) ou un tableau.
   Clé absente dans une langue : texte français.
   Ajouter une langue : copier le bloc I18N.en, traduire chaque valeur, ajouter le bouton
   dans Réglages (#langSeg de index.html) et les textes de api.php (MSG). */
const I18N = {};

I18N.fr = {
  locale: 'fr-FR',
  // Ajouts : mode simple, flèche, démarrage en 3 questions
  'mode.title': 'Affichage',
  'mode.simple': '😊 Simple',
  'mode.expert': '🤓 Complet',
  'mode.hint': 'Simple : une seule chose à faire à la fois, en gros. Complet : itinéraire, détails et tous les réglages.',
  'adv.title': 'Réglages avancés',
  's.hello': 'Salut {name} !',
  's.start': 'Trois questions et c\'est parti.',
  's.go': 'C\'est parti',
  's.all': 'Voir toute la journée',
  's.less': 'Revenir à l\'essentiel',
  's.today': 'Aujourd\'hui',
  's.beAt': 'Rendez-vous à l\'entrée à {time}',
  's.startWith': 'On commence par : {list}',
  's.allDone': 'Tout est fait, bravo !',
  's.shortest': 'Les files les plus courtes maintenant :',
  's.inQueue': 'Tu fais la queue pour',
  's.left': 'encore ~{n} min',
  's.finished': '✅ Fini !',
  's.seen': '✅ Vu !',
  's.leaveQueue': '🚪 Je sors de la file',
  's.vl': 'Ton créneau {vl}',
  's.at': 'à {time}',
  's.leaveAt': 'pars à {time}',
  's.show': 'Spectacle',
  's.meal': 'On mange !',
  's.goTo': 'Va à',
  's.queue': '{n} min de file',
  's.imHere': '🙋 J\'y suis, je fais la queue',
  's.then': 'Ensuite : {list}',
  'c.enable': '📍 Active ta position pour voir la flèche',
  'c.here': '🎯 Tu y es !',
  'c.north': 'nord en haut',
  'c.turn': '🧭 Tourner la flèche avec le téléphone',
  'c.denied': 'Boussole refusée : la flèche reste orientée nord en haut.',
  'w.step': 'Étape {n} sur 3',
  'w.like': 'Tu préfères…',
  'w.thrills': 'Ça secoue !',
  'w.calm': 'Tranquille',
  'w.mix': 'Un peu de tout',
  'w.kids': 'Il y a des petits avec vous ?',
  'w.noKids': 'Non, que des grands',
  'w.kidCm': 'Oui, le plus petit fait {cm} cm',
  'w.howTitle': 'C\'est tout simple',
  'w.how1': '👉 Va où l\'appli te dit, suis la flèche',
  'w.how2': '🙋 Dans la file, appuie sur « J\'y suis »',
  'w.how3': '✅ À la sortie, appuie sur « Fini ! » : la suite arrive toute seule',
  'w.gps': '📍 Activer ma position',
  'w.notif': '🔔 Activer les notifications',
  'w.go': 'C\'est parti !',
  // Rejouer : colonne incontournables
  'replay.musts': 'Incontournables ({n})',
  // Ajouts : rendez-vous, programme commun, plein soleil, batterie, rejouer une journée
  'meet.title': 'Rendez-vous',
  'meet.board': 'Rendez-vous · {place}',
  'meet.at': 'rendez-vous',
  'meet.reason': 'Le groupe se retrouve ici : l\'itinéraire s\'arrange pour que tu sois à l\'heure.',
  'meet.here': 'On s\'est retrouvés',
  'meet.share': 'Partager',
  'meet.cancel': 'Annuler',
  'meet.hint': 'Pour vous séparer puis vous retrouver : chaque sous-groupe garde son profil, l\'itinéraire de chacun finit ici à l\'heure dite. Partage le rendez-vous aux autres.',
  'meet.time': 'Heure',
  'meet.set': 'Se retrouver ici',
  'meet.update': 'Changer l\'heure',
  'meet.saved': 'Rendez-vous : {place} à {time}',
  'meet.doneToast': 'Groupe réuni',
  'meet.cancelled': 'Rendez-vous annulé',
  'meet.shareText': 'Rendez-vous à {place} à {time} :',
  'meet.copied': 'Lien du rendez-vous copié',
  'vote.title': 'Programme commun',
  'vote.hint': 'Chacun met ses étoiles dans son profil, puis l\'appli fusionne : incontournable si la moitié du groupe le veut, bonus si au moins une personne le veut.',
  'vote.open': 'Fusionner des programmes',
  'vote.pick': 'Coche les profils à prendre en compte :',
  'vote.apply': 'Remplacer le programme de {name}',
  'vote.count': '{n} attractions',
  'vote.preview': 'Résultat avec {n} profils : {must} incontournables, {bonus} bonus, {shows} spectacles.',
  'vote.none': 'Coche au moins un profil.',
  'vote.done': 'Programme commun de {n} profils appliqué',
  'vote.fail': 'Profils indisponibles : serveur injoignable.',
  'sun.title': 'Mode plein soleil',
  'sun.hint': 'Contraste maximal et textes plus gros, pour lire l\'écran dehors',
  'eco.title': 'Économie de batterie',
  'eco.hint': 'GPS moins précis, actualisation toutes les 5 min au lieu de 2',
  'eco.suggest': '<b>Batterie faible</b> : passer en économie de batterie ?',
  'eco.on': 'Économie de batterie activée',
  'replay.title': 'Rejouer une journée',
  'replay.hint': 'Simule une journée enregistrée par le serveur avec ton programme : l\'itinéraire de l\'appli face à deux stratégies simples, avec les vraies files de ce jour-là.',
  'replay.day': 'Journée',
  'replay.run': 'Rejouer',
  'replay.noDays': 'Aucune journée enregistrée',
  'replay.running': 'Simulation en cours…',
  'replay.fail': 'Pas assez de relevés pour ce jour.',
  'replay.noPlan': 'Ton programme est vide : ajoute des attractions d\'abord.',
  'replay.app': 'Itinéraire de l\'appli',
  'replay.order': 'Ordre du programme',
  'replay.shortest': 'File la plus courte',
  'replay.rides': 'Tours',
  'replay.queue': 'Files',
  'replay.walk': 'Marche',
  'replay.summary': '{day}, avec les {n} attractions de ton programme et les files réelles de ce jour-là.',
  'replay.more': 'L\'appli fait {n} incontournable(s) de plus.',
  // Ajouts : VirtualLine, notes, carte, points pratiques, voiture, prévision
  'vl.quick': 'J\'ai réservé {time}',
  'vl.openApp': 'Ouvrir l\'appli',
  'rate.ask': 'Ta note pour <b>{name}</b> ?',
  'rate.saved': 'Note enregistrée : {n}/5',
  'rate.again': 'Note {n}/5 · ajoutée à « À refaire » sous {thr} min',
  'rate.mine': 'Ta note',
  'rate.group': 'Groupe : ★ {avg} ({n})',
  'recap.top': 'Vos préférées : {list}.',
  'map.full': 'Plein écran',
  'map.exit': 'Quitter le plein écran',
  'map.locate': 'Me recentrer et me suivre',
  'map.park': 'Tout le parc',
  'map.waitGps': 'Recherche de ta position…',
  'map.outPark': 'Tu n\'es pas dans le parc pour l\'instant.',
  'poi.nearestBtn': 'Toilettes les plus proches',
  'poi.toilets': 'Toilettes',
  'poi.water': 'Eau potable',
  'poi.lockers': 'Casiers',
  'poi.atm': 'Distributeurs',
  'poi.parking': 'Parkings',
  'poi.firstaid': 'Secours',
  'poi.none': 'Aucun point « {type} » connu dans ce parc.',
  'poi.nearest': '{type} : les plus proches à {min} min à pied',
  'car.title': 'Ma voiture',
  'car.myPos': 'place enregistrée',
  'car.walk': '{min} min à pied',
  'car.route': 'Itinéraire',
  'car.onMap': 'Sur la carte',
  'car.clear': 'Oublier la place',
  'car.cleared': 'Place de la voiture oubliée',
  'car.hint': 'Enregistre ta place en arrivant : le soir, l\'appli te ramène à la voiture. Elle est partagée avec ton profil.',
  'car.here': 'Ici (ma position actuelle)',
  'car.noGps': 'Active ta position pour enregistrer l\'endroit exact, ou choisis le parking ci-dessous.',
  'car.pick': 'Ou choisis le parking',
  'car.saved': 'Voiture : {name}',
  'car.none': 'Place de la voiture non enregistrée.',
  'car.save': 'Enregistrer',
  'car.back': 'Retour à la voiture',
  'map.dl': 'Télécharger la carte (≈ {mb} Mo)',
  'map.dlHint': 'À faire la veille en wifi : la carte du parc reste disponible quand la 4G sature.',
  'map.dlProgress': 'Téléchargement de la carte… {pct} %',
  'map.dlDone': 'Carte enregistrée sur ce téléphone ({n} tuiles)',
  'map.dlDoneAt': 'Carte téléchargée le {date} : elle marche sans réseau.',
  'map.dlFail': 'Téléchargement interrompu : réessaie en wifi.',
  'fc.title': 'Quel jour venir ?',
  'fc.school': 'vacances {list}',
  'fc.public': 'férié {list}',
  'fc.hint': 'Affluence prévue des prochains jours d\'ouverture, d\'après {src} et les vacances scolaires et jours fériés des régions d\'où viennent les visiteurs.',
  'fc.srcHistory': 'ton historique',
  'fc.srcGeneric': 'les jours de la semaine',
  'fc.none': 'Pas de prévision : horaires d\'ouverture inconnus.',
  'fc.tip': '<b>Affluence prévue</b> ce jour-là : {level}{why}.',
  'fc.levels': ['Calme', 'Moyen', 'Chargé', 'Très chargé'],
  // Page statique (data-i18n, data-i18n-attr)
  loading: 'Chargement…',
  help: 'Aide',
  profile: 'Profil',
  switchUser: 'Changer de profil',
  refresh: "Actualiser les temps d'attente",
  close: 'Fermer',
  'onb.title': 'Ton programme',
  'onb.text': "Choisis une base, tu pourras ensuite cocher ou retirer chaque attraction dans l'onglet Attractions.",
  'preset.thrills': 'Sensations fortes',
  'preset.family': 'En famille',
  'onb.self': 'Je choisis moi-même',
  'itin.title': 'Itinéraire conseillé',
  'shows.title': 'Spectacles à venir',
  'shows.next2h': '2 prochaines heures',
  'tips.title': 'Pour bien démarrer',
  filter: 'Filtrer',
  'filter.plan': 'Mon plan',
  'filter.rides': 'Attractions',
  'filter.shows': 'Spectacles',
  'filter.food': 'Restos',
  search: 'Rechercher',
  'search.ph': 'Rechercher (ex. Voltron)',
  sort: 'Trier',
  'sort.wait': 'Attente',
  'sort.walk': 'Distance',
  'legend.you': 'toi',
  'legend.group': 'groupe',
  'legend.closed': 'fermé',
  'set.copyFrom': 'Copier le programme de',
  'set.copy': 'Copier',
  'set.plan': 'Mon programme',
  'set.clear': 'Vider',
  meal: 'Pause repas',
  'set.mealHint': "Placée quand les files sont au plus haut, près d'un resto ouvert",
  'set.mealDur': 'Durée du repas',
  'set.mealFrom': 'Pas avant',
  'set.mealTo': 'Fini avant',
  'set.route': "Priorité de l'itinéraire",
  'route.walk': 'Moins de marche',
  'route.balanced': 'Équilibré',
  'route.wait': "Moins d'attente",
  'set.sr': '🙋 File solo accepté (single rider)',
  'set.srHint': 'File séparée sur Blue Fire, Voltron, CanCan, Arthur (à vérifier sur place) : souvent bien plus courte, mais vous êtes séparés dans le wagon',
  'set.pace': 'Rythme de marche',
  'pace.kids': 'Avec enfants',
  'pace.normal': 'Normal',
  'pace.fast': 'Rapide',
  'set.height': 'Taille du plus petit du groupe (cm)',
  'set.noLimit': 'Pas de limite',
  'set.heightHint': "Tailles minimales accompagné, indicatives : vérifie toujours le panneau à l'entrée.",
  'set.hotel': 'Je dors dans un hôtel du parc',
  'set.hotelHint': "Entrée anticipée dès l'horaire hôtel (souvent 8:30, certaines attractions seulement)",
  'set.position': 'Ma position',
  'set.share': 'Partager ma position avec le groupe',
  'set.shareHint': "Visible sur la carte de ceux qui utilisent l'appli, jusqu'à 20 min après ton dernier point",
  'set.nick': 'Mon prénom sur la carte',
  'set.notif': 'Notifications',
  'set.pushOn': 'Activer les notifications',
  'set.pushTest': 'Tester',
  'set.crowd': 'Affluence',
  'set.data': 'Données',
  'set.help': 'Aide et mises à jour',
  'set.update': 'Mettre à jour',
  'set.newDay': 'Nouvelle journée',
  'set.newDayHint': 'Remet à zéro les attractions faites, les créneaux VirtualLine, le repas et les alertes envoyées. Ton programme est conservé.',
  reset: 'Remettre à zéro',
  'set.credits': "Temps d'attente : ceux annoncés par le parc, relayés par themeparks.wiki. Météo : Open-Meteo. Page non officielle, sans lien avec Europa-Park.",
  'tab.now': 'Maintenant',
  'tab.list': 'Attractions',
  'tab.map': 'Carte',
  'tab.settings': 'Réglages',
  'help.title': 'Comment ça marche',
  'help.news': 'Nouveautés',
  'help.intro': 'EP Live te dit à chaque instant quelle attraction faire maintenant, et prévoit le reste de ta journée pour attendre et marcher le moins possible.',
  'help.version': 'Version {v}',
  // Aide (data-i18n-html : contenu de chaque <details>)
  'help.simple': `<summary>Le mode simple</summary>
    <p>Par défaut, l'écran Maintenant n'affiche qu'une chose : <b>où aller maintenant</b>, en gros, avec trois boutons :</p>
    <ul>
      <li><b>🙋 J'y suis</b> : tu fais la queue (un minuteur démarre) ;</li>
      <li><b>✅ Fini !</b> : à la sortie, l'étape suivante arrive toute seule ;</li>
      <li><b>⏭ Pas maintenant</b> : on y reviendra plus tard.</li>
    </ul>
    <p><b>La flèche</b> montre la direction de la prochaine étape (à vol d'oiseau) et la distance. Avec la position activée, elle tourne avec le téléphone ; sur iPhone, touche « Tourner la flèche » une fois pour l'autoriser. « 🎯 Tu y es ! » quand tu es arrivé.</p>
    <p><b>Voir toute la journée</b> déplie l'itinéraire complet. Réglages → <b>Affichage</b> : 😊 Simple ou 🤓 Complet (tous les détails, réglages avancés ouverts).</p>
  `,
  'help.start': `<summary>Démarrer en 4 étapes</summary>
    <ol>
      <li><b>Installe l'appli</b> sur l'écran d'accueil (voir « Installer l'appli »).</li>
      <li><b>Choisis ton profil</b> : ton pseudo, sans mot de passe. Tout est enregistré sur le serveur.</li>
      <li><b>Fais ton programme</b> : <i>Sensations fortes</i> ou <i>En famille</i>, puis ajuste avec les étoiles dans <b>Attractions</b>. Étoile pleine = incontournable, demi-étoile = bonus si on a le temps.</li>
      <li><b>Dans Réglages</b> : active la position et les notifications, règle la pause repas et la priorité de l'itinéraire.</li>
    </ol>
  `,
  'help.install': `<summary>Installer l'appli</summary>
    <ul>
      <li><b>Android</b> : bouton <b>Installer l'appli</b> dans l'onglet Maintenant ou dans Réglages, sinon menu ⋮ → <i>Installer l'application</i>.</li>
      <li><b>iPhone</b> : dans <b>Safari</b>, touche <b>Partager</b> (carré avec une flèche) → <b>Sur l'écran d'accueil</b>. Ouvre ensuite l'appli depuis l'icône : indispensable pour les notifications (iOS 16.4 ou plus).</li>
    </ul>
    <p>Installée, elle s'ouvre en plein écran et reste utilisable quand le réseau du parc sature.</p>
  `,
  'help.now': `<summary>L'écran Maintenant</summary>
    <p>Le grand panneau montre la <b>prochaine étape</b> : l'attente affichée, le temps de marche et pourquoi c'est le bon moment. En dessous : trois autres bons choix, puis l'itinéraire du reste de la journée avec les heures d'arrivée.</p>
    <table>
      <tr><td>Dans la file</td><td>Tu entres dans la queue : un minuteur démarre, l'itinéraire part de la fin de cette attraction.</td></tr>
      <tr><td>Fait</td><td>À la sortie : l'itinéraire repart d'ici. Si tu étais « dans la file », ton vrai temps d'attente est mesuré.</td></tr>
      <tr><td>Plus tard</td><td>Écarte l'attraction 30 minutes.</td></tr>
      <tr><td>Nom</td><td>Ouvre la fiche : courbe de la journée, attente habituelle, <b>heures creuses et de pointe</b>, alertes, file virtuelle.</td></tr>
    </table>
    <p>Une erreur ? Le toast en bas propose toujours <b>Annuler</b>.</p>
  `,
  'help.colors': `<summary>Les couleurs des temps</summary>
    <ul>
      <li><b style="color:var(--w-low)">Vert</b> : 10 min ou moins</li>
      <li><b style="color:var(--w-mid)">Jaune</b> : 15 à 25 min</li>
      <li><b style="color:var(--w-high)">Orange</b> : 30 à 45 min</li>
      <li><b style="color:var(--w-peak)">Rouge</b> : 50 min et plus</li>
      <li><b style="color:var(--w-off)">Gris</b> : fermée ou en panne</li>
    </ul>
    <p>Dans la liste, ↗ / ↘ indique que la file a monté ou baissé d'au moins 10 min ces 30 dernières minutes.</p>
  `,
  'help.route': `<summary>Comment l'itinéraire est choisi</summary>
    <ul>
      <li><b>Gain</b> : l'appli compare l'attente prévue à ton arrivée avec l'attente moyenne plus tard dans la journée. Une grosse attraction peu chargée maintenant passe devant.</li>
      <li><b>Prévisions</b> : elle part de l'attente actuelle et rejoint le profil habituel de l'attraction, tiré de l'historique du serveur et corrigé de l'affluence du jour.</li>
      <li><b>Marche</b> : chaque minute de marche coûte (plus encore au-delà de 8 min). Elle regarde aussi l'attraction suivante pour éviter les allers-retours d'un bout à l'autre du parc. <i>Réglages → Priorité</i> : moins de marche, équilibré ou moins d'attente.</li>
      <li><b>Météo</b> : sous la pluie, les attractions couvertes passent devant. Par orage ou vent fort, les extérieures reculent. Les attractions mouillées vont plutôt aux heures chaudes.</li>
      <li><b>Bonus</b> : seulement s'il reste assez de temps pour tous les incontournables.</li>
      <li><b>Temps réels</b> : chaque mesure « Dans la file » → « Fait » apprend l'écart entre l'affiché et l'attente vraie (souvent moins). Les mesures de tous les profils du serveur servent à tout le monde ; dès que tu en as deux, ce sont les tiennes qui comptent.</li>
      <li><b>Durée des attractions</b> : chaque attraction a sa durée (un grand huit ~4 min, un parcours scénique ~10 min), pour des heures d'arrivée justes.</li>
    </ul>
    <p>Le calcul est refait toutes les 2 minutes et à chaque bouton touché.</p>
  `,
  'help.vl': `<summary>VirtualLine (coupe-file gratuit)</summary>
    <ol>
      <li>La carte VirtualLine indique l'attraction où un créneau fait gagner le plus.</li>
      <li>Réserve dans l'<b>appli officielle Europa-Park</b> (billet lié, localisation activée, un seul créneau à la fois).</li>
      <li>Note-le avec <b>J'ai un créneau</b> : l'itinéraire s'organise autour et te dit quand partir.</li>
      <li>Après <b>Fait</b>, l'appli te dit quoi re-réserver tout de suite.</li>
    </ol>
    <p>Quand le créneau proposé est connu, un bouton <b>J'ai réservé 15:20</b> le note en un geste. <b>Ouvrir l'appli</b> lance l'appli officielle (sur iPhone : sa fiche App Store, avec « Ouvrir »). Avec les notifications, tu es prévenu quand une file virtuelle s'ouvre sur une attraction de ton programme, si tu n'as pas déjà un créneau. La réservation elle-même se fait toujours dans l'appli officielle : il n'existe pas d'accès public.</p>
  `,
  'help.fixed': `<summary>Repas et spectacles</summary>
    <p><b>Pause repas</b> (Réglages) : l'appli la place dans ta fenêtre horaire, au moment où les files sont au plus haut, et indique le resto ouvert le plus proche. <i>Plus tard</i> la décale de 30 min, <i>Fait</i> la retire.</p>
    <p><b>Spectacles</b> : mets une étoile sur un spectacle (Attractions → Spectacles). L'appli choisit la représentation qui fait perdre le moins de temps de file et te prévient quand partir (5 min d'avance).</p>
  `,
  'help.notif': `<summary>Notifications</summary>
    <p>Une fois activées dans Réglages, elles arrivent même appli fermée :</p>
    <ul>
      <li><b>File courte</b> : sous le seuil choisi dans la fiche (« M'alerter sous… »).</li>
      <li><b>À refaire</b> : une attraction déjà faite repasse sous son seuil (« À refaire si… »).</li>
      <li><b>Réouverture</b> : une attraction de ton programme rouvre après une panne.</li>
      <li><b>Pars maintenant</b> : pour un créneau VirtualLine ou un spectacle, marche comprise.</li>
      <li><b>Pause repas</b> : le bon moment pour manger.</li>
      <li><b>Pluie</b> : de la pluie annoncée dans l'heure, l'itinéraire passe aux attractions couvertes.</li>
      <li><b>Dernier appel</b> : 45 min avant la fermeture, les dernières attractions encore faisables près de toi.</li>
    </ul>
    <p>Pendant que tu es « dans la file », les alertes de file courte sont mises en pause.</p>
  `,
  'help.map': `<summary>La carte</summary>
    <p>Fond OpenStreetMap : allées, bâtiments et lacs du parc. Pince pour zoomer. Les grosses pastilles sont ton programme, avec l'attente en direct et sa couleur ; les petites, les autres attractions. Le pointillé violet mène à la prochaine étape. Toucher une pastille ouvre sa fiche.</p>
    <p>Les zones déjà affichées restent en mémoire : la carte s'ouvre même quand le réseau sature. Sans aucune donnée en mémoire, l'appli affiche un plan simplifié.</p>
    <p><b>Boutons de la carte</b> : ⤢ plein écran ; ◎ te recentre et te suit pendant que tu marches (déplacer la carte arrête le suivi) ; 🗺 revient à tout le parc ; 🚻 montre les toilettes les plus proches ; 🚗 ta voiture.</p>
    <p><b>Points pratiques</b> : au-dessus de la carte, affiche ou masque toilettes, eau potable, casiers, distributeurs et parkings (OpenStreetMap, parfois incomplet).</p>
    <p><b>Hors ligne</b> : sous la carte, « Télécharger la carte » enregistre tout le parc sur le téléphone. À faire la veille en wifi.</p>
    <p><b>Ta voiture</b> : enregistre ta place en arrivant (position GPS ou nom du parking). Le soir, l'appli affiche le temps de marche et l'itinéraire pour y retourner, et toute la famille la voit.</p>
  `,
  'help.gps': `<summary>Position GPS</summary>
    <p>Avec la position activée, les temps de marche partent de l'endroit où tu es. En arrivant à une attraction du programme, l'appli demande « Tu fais la queue ? », et « Tu as fini ? » quand tu t'éloignes. Sans GPS, les distances partent de la dernière attraction faite, ou de l'entrée.</p>
  `,
  'help.group': `<summary>En groupe</summary>
    <ul>
      <li><b>Un profil commun</b> (ex. « Groupe ») choisi par tout le monde : un « Fait » sur un téléphone arrive sur les autres en 2 minutes au plus, et tout le monde reçoit les notifications.</li>
      <li><b>Un profil chacun</b> : Réglages → « Copier le programme de… » reprend le programme d'un autre.</li>
      <li><b>Se retrouver</b> : Réglages → « Partager ma position avec le groupe », avec ton prénom. Sur la <b>Carte</b>, chacun apparaît en point plein avec son prénom et le temps de marche jusqu'à lui. Le losange marque le <b>point de rencontre</b> conseillé : l'attraction la plus proche du centre du groupe.</li>
    </ul>
    <p class="muted">Une position partagée est visible par tous ceux qui utilisent l'appli sur ce serveur, et disparaît 20 min après le dernier point. Décoche le partage pour l'effacer tout de suite.</p>
    <p><b>Programme commun</b> : chacun met ses étoiles dans son profil, puis Réglages → « Fusionner des programmes ». Incontournable si au moins la moitié du groupe le veut, bonus si quelqu'un le veut ; tous les spectacles choisis sont gardés.</p>
    <p><b>Se séparer puis se retrouver</b> : dans la fiche d'une attraction, « Se retrouver ici » à une heure donnée. L'itinéraire de chacun finit là à l'heure, avec une notification pour partir. Chaque sous-groupe utilise son propre profil ; « Partager » envoie le rendez-vous aux autres par lien.</p>
  `,
  'help.sr': `<summary>Single rider</summary>
    <p>Certaines attractions ont une file « single rider » pour compléter les places vides : beaucoup plus courte, mais le groupe est séparé dans le wagon. Signalée sur Blue Fire, Voltron, CanCan et Arthur, <b>à vérifier sur place</b> (elle peut être fermée certains jours).</p>
    <p>Active-la dans <b>Réglages → Single rider accepté</b>. L'appli compte alors la moitié de l'attente normale. Dès que tu vois la vraie attente single rider à l'entrée, note-la dans la fiche de l'attraction : elle est prise en compte pendant 45 min.</p>
  `,
  'help.recap': `<summary>Récap de la journée</summary>
    <p>Chaque « Fait » est noté. Le soir, l'onglet Maintenant affiche ta journée : nombre de tours, temps passé dans les files, distance à pied (estimée entre les attractions), attente gagnée par rapport à la moyenne de la journée, meilleur coup et attraction préférée. Bouton <b>Partager</b> pour l'envoyer au groupe. À tout moment : Réglages → <i>Récap de ma journée</i>.</p>
    <p><b>Notes</b> : après chaque « Fait », l'appli te demande une note de 1 à 5 étoiles (aussi dans la fiche). 4 ou 5 étoiles ajoutent l'attraction à « À refaire » si rien n'est réglé. Le récap affiche vos préférées, et la liste montre la note moyenne de tous les profils.</p>
  `,
  'help.crowd': `<summary>Affluence</summary>
    <p>Pendant la journée, l'appli compare les files actuelles aux files habituelles à la même heure et en tient compte (« Affluence : +20 % »). La veille, l'aperçu indique l'affluence habituelle de ce jour de la semaine, d'après les jours enregistrés par le serveur. Réglages → Affluence montre les derniers jours et les jours les plus calmes.</p>
    <p><b>Quel jour venir ?</b> (Réglages) : affluence prévue des prochains jours d'ouverture, de calme à très chargé, d'après ton historique (ou le jour de la semaine) et les vacances scolaires et jours fériés des régions d'où viennent les visiteurs (Bade-Wurtemberg, Alsace, Suisse… pour Europa-Park).</p>
    <p><b>Rejouer une journée</b> (Réglages) : l'appli rejoue un jour enregistré avec ton programme et les vraies files de ce jour-là, et compare son itinéraire à « l'ordre du programme » et à « la file la plus courte ».</p>
  `,
  'help.sync': `<summary>Profil, coupure, changement de téléphone</summary>
    <p>Chaque changement est envoyé au serveur une seconde plus tard. Si le téléphone s'éteint ou que tu en changes, ouvre l'appli et choisis ton pseudo : tu reprends exactement où tu en étais (programme, faits, créneaux, file en cours). Le bouton avec ton pseudo, en haut, permet de changer de profil.</p>
    <p>Sans réseau, l'appli affiche les dernières données reçues (bandeau orange) et envoie tes changements dès le retour du réseau.</p>
  `,
  'help.tips': `<summary>Bon à savoir</summary>
    <ul>
      <li><b>Batterie</b> : GPS et 4G toute la journée vident vite un téléphone. Prends une batterie externe. Sans GPS, l'appli marche très bien en touchant « Fait » à chaque sortie.</li>
      <li><b>Réseau</b> : la 4G sature parfois aux heures de pointe. L'appli garde les dernières données et se resynchronise toute seule.</li>
      <li><b>Arrive tôt</b> : être à l'entrée un peu avant l'ouverture, c'est les grosses attractions avec les files les plus courtes de la journée. L'aperçu de la veille commence par elles.</li>
      <li><b>Temps affichés</b> : ce sont ceux annoncés par le parc, souvent un peu surestimés. Mesure-les avec « Dans la file » : l'appli s'adapte.</li>
      <li><b>VirtualLine</b> : dans l'appli officielle Europa-Park, avec ton billet lié et la localisation activée, une fois dans le parc. Un seul créneau à la fois : re-réserve dès que tu l'as utilisé.</li>
      <li><b>Pannes</b> : fréquentes et souvent courtes. L'appli retente 45 min plus tard et te prévient de la réouverture.</li>
      <li><b>Grands huit</b> : rien dans les poches. Des casiers sont souvent prévus à l'entrée : compte quelques minutes en plus.</li>
      <li><b>Attractions aquatiques</b> : on peut en ressortir trempé. Par temps frais, l'appli les place plutôt aux heures chaudes.</li>
      <li><b>Fin de journée</b> : les files ferment à l'heure de fermeture du parc. L'itinéraire s'arrange pour que tu sois dans la dernière à temps.</li>
    </ul>
    <p><b>Mode plein soleil</b> (Réglages) : contraste maximal et textes plus gros. <b>Économie de batterie</b> : GPS moins précis et actualisation toutes les 5 min ; sur Android, l'appli la propose d'elle-même sous 20 % de batterie.</p>
    <p><b>Saison</b> : les spectacles de saison (Halloween, Noël…) sont marqués 🎃 et passent en tête de la liste des spectacles.</p>
  `,
  'help.faq': `<summary>Problèmes fréquents</summary>
    <table>
      <tr><td>Pas de notification</td><td>iPhone : l'appli doit être ouverte depuis l'icône de l'écran d'accueil. Vérifie Réglages → Notifications → <i>Tester</i>, et que le mode Concentration ne les bloque pas.</td></tr>
      <tr><td>Distances bizarres</td><td>Active la position, ou touche « Fait » après chaque attraction : sans ça, l'appli croit que tu es encore à l'entrée.</td></tr>
      <tr><td>Une attraction n'est jamais proposée</td><td>Elle est peut-être en panne, fermée, trop grande pour la taille réglée, ou en bonus sans assez de temps. Regarde la note sous l'itinéraire.</td></tr>
      <tr><td>« Données de 10:12 (il y a 8 min) »</td><td>Le réseau ou la source des temps ne répond pas. Touche ↻ en haut, ça reprend tout seul.</td></tr>
      <tr><td>Appli pas à jour</td><td>Réglages → <i>Mettre à jour</i>, ou ferme et rouvre l'appli.</td></tr>
    </table>
  `,
  'help.newsList': `<summary>Nouveautés</summary>
    <p class="muted" id="helpVersion"></p>
    <ul>
      <li><b>Profils</b> : un pseudo par personne, tout est enregistré sur le serveur et se retrouve après une coupure ou sur un autre téléphone.</li>
      <li><b>Notifications push</b>, même appli fermée : files courtes, attractions à refaire, réouvertures, départ pour un créneau, un spectacle ou le repas.</li>
      <li><b>Itinéraire plus malin</b> : beaucoup moins de traversées du parc, avec un coup d'avance, et un réglage « Moins de marche / Équilibré / Moins d'attente ».</li>
      <li><b>Pause repas et spectacles</b> placés quand les files sont au plus haut.</li>
      <li><b>Météo</b> intégrée à l'itinéraire.</li>
      <li><b>Dans la file</b> avec minuteur, et mesure de tes vrais temps d'attente.</li>
      <li><b>À refaire si…</b>, <b>taille minimale</b>, <b>affluence du jour</b> et calendrier des jours calmes.</li>
      <li><b>Installation</b> sur l'écran d'accueil proposée directement dans l'appli, et cette page d'aide.</li>
      <li><b>Récap de la journée</b> à partager le soir.</li>
      <li><b>Groupe sur la carte</b> : positions partagées et point de rencontre.</li>
      <li><b>Single rider</b> en option, <b>alerte pluie</b> et <b>affluence prévue</b> la veille.</li>
      <li><b>Vraie carte</b> du parc (OpenStreetMap), zoomable.</li>
      <li><b>Heures creuses et de pointe</b> de chaque attraction dans sa fiche.</li>
      <li><b>Durée réelle</b> de chaque attraction et <b>temps de file partagés</b> entre profils.</li>
      <li><b>Dernier appel</b> avant la fermeture.</li>
      <li><b>Langues</b> : français, anglais et allemand (Réglages).</li>
      <li><b>Carte</b> en plein écran, bouton pour te recentrer et te suivre, carte téléchargeable pour le hors-ligne.</li>
      <li><b>Toilettes, eau, casiers, distributeurs, parkings</b> sur la carte, et la place de ta <b>voiture</b>.</li>
      <li><b>VirtualLine</b> : créneau noté en un geste, bouton vers l'appli officielle, notification quand une file virtuelle s'ouvre.</li>
      <li><b>Notes</b> des attractions, écart affiché / réel <b>par attraction</b>, calendrier <b>« Quel jour venir ? »</b>.</li>
      <li><b>Programme commun</b> par vote, <b>rendez-vous</b> pour se séparer puis se retrouver.</li>
      <li><b>Mode plein soleil</b>, <b>économie de batterie</b>, spectacles de saison 🎃, <b>rejouer une journée</b>.</li>
      <li><b>Mode simple</b> par défaut, avec une <b>flèche</b> vers la prochaine étape, et démarrage en 3 questions.</li>
    </ul>
    <p>Les mises à jour arrivent toutes seules à la prochaine ouverture de l'appli.</p>
  `,

  // Libellés par état
  status: {OPERATING: 'Ouverte', DOWN: 'En panne', CLOSED: 'Fermée', REFURBISHMENT: 'En rénovation', UNKNOWN: 'Inconnu'},
  statusInline: {OPERATING: 'ouverte', DOWN: 'en panne', CLOSED: 'fermée', REFURBISHMENT: 'en rénovation', UNKNOWN: 'inconnu'},
  vl: {AVAILABLE: 'ouvert', TEMP_FULL: "complet pour l'instant", FINISHED: "terminé pour aujourd'hui"},
  vlUnknown: 'inconnu',
  vlStateUnknown: 'état inconnu',
  types: {ATTRACTION: 'Attraction', SHOW: 'Spectacle', RESTAURANT: 'Restauration'},
  basis: {'week-end': 'week-end', semaine: 'semaine', tous: 'tous'},
  weekdaysShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
  above: 'au-dessus',
  below: 'en dessous',
  me: 'Moi',
  yes: 'Oui',
  no: 'Non',
  undo: 'Annuler',
  walk: '{n} min à pied',

  // Profil
  'toast.localProfile': "Profil local : rien n'est enregistré sur le serveur",
  'toast.hello': 'Bonjour {name} !',
  'login.title': 'Qui es-tu ?',
  'login.intro': 'Ton programme et ta journée sont enregistrés sous ton pseudo. Sur un autre téléphone ou après une coupure, choisis-le simplement dans la liste.',
  'login.loading': 'Chargement des profils…',
  'login.newName': 'Nouveau pseudo',
  'login.create': 'Créer',
  'login.none': "Aucun profil pour l'instant : crée le tien.",
  'login.offline': 'Serveur injoignable : les profils ne sont pas disponibles.',
  'login.local': 'Continuer sur ce téléphone seulement',
  'login.invalid': 'De 2 à 24 caractères : lettres, chiffres, espace, point, tiret, apostrophe.',
  'login.exists': 'Ce pseudo existe déjà : choisis-le dans la liste.',
  'login.createFail': 'Impossible de créer le profil : {msg}',

  // Bandeau d'état
  'wx.now': 'maintenant',
  'wx.at': 'vers {time}',
  'wx.storm': 'orage {at}',
  'wx.rain': 'pluie {at}',
  'hdr.noHours': 'Horaires indisponibles',
  'hdr.open': "Ouvert jusqu'à {close} · encore {left}",
  'hdr.opens': 'Ouvre à {open}',
  'hdr.hotels': ' · hôtels {early}',
  'hdr.closed': 'Fermé · ouvre {day} à {open}',
  'hdr.offline': 'Hors ligne · ',
  'hdr.data': 'Données de {time}',
  'hdr.ago': ' (il y a {age} min)',
  'hdr.connecting': 'Connexion aux données…',
  'hdr.sim': 'Heure simulée {time}',
  'user.local': 'Local',

  // Pourquoi cette attraction maintenant
  'reason.again': 'À refaire : la file est sous ton seuil ({thr} min).',
  'reason.sr': "File single rider : vous serez séparés dans le wagon, mais l'attente tombe à ~{q} min{est}.",
  'reason.srEst': ' (estimation, relève la vraie dans la fiche)',
  'reason.rain': 'Pluie prévue vers {time} : attraction couverte, tu restes au sec.',
  'reason.wet': 'Il fait {t}° vers {time} : le bon moment pour se mouiller.',
  'reason.earlyShort': 'Vers {time} la file est en général courte (~{q} min) ; elle monte ensuite autour de {later} min en moyenne.',
  'reason.fromEntrance': "Bon enchaînement depuis l'entrée, attente estimée ~{q} min.",
  'reason.reopened': "Elle vient de rouvrir après un arrêt : la file se reforme, c'est le bon moment.",
  'reason.shorter': "File plus courte que d'habitude à cette heure ({typ} min en général).",
  'reason.later': 'Plus tard dans la journée, compte plutôt ~{later} min : autant y aller maintenant.',
  'reason.nearby': "Juste à côté : on l'enchaîne sans marcher, avant de changer de coin du parc.",
  'reason.shortOnWay': "File courte et sur ton chemin : on l'enchaîne pendant que les grosses attractions sont chargées.",
  'reason.best': 'Meilleur compromis entre attente et marche pour le moment.',

  // Panneau « prochaine étape »
  'board.inQueue': 'Dans la file · depuis {d}',
  'board.minLeft': 'min restantes',
  'board.posted': "Affiché à l'entrée : {w} min",
  'board.realEst': 'Réel estimé ~{w} min',
  'board.queueReason': "Touche « Fait » à la sortie : la page apprend l'écart entre les temps affichés et ceux que tu attends vraiment.",
  'board.vlSlot': 'Créneau {vl}',
  'board.booked': 'réservé',
  'board.slotAt': 'Créneau à <b class="num">{time}</b>',
  'board.vlGoNow': "Pars maintenant pour être à l'heure à l'entrée {vl}.",
  'board.vlLeaveAt': "Pars vers {time}. D'ici là, rien d'autre ne rentre sans risquer de rater le créneau.",
  'board.show': 'Spectacle · {n} min à pied',
  'board.start': 'début',
  'board.leaveAt': 'Départ vers {time}',
  'board.showReason': 'Représentation choisie au moment où les files de ton programme sont au plus haut. Arrive 5 min avant pour être bien placé.',
  'board.meal': 'Pause repas · {time}',
  'board.mealReason': "Vers {time}, les files de ton programme sont au plus haut : c'est là que manger fait perdre le moins de temps.",
  'board.next': "Prochaine étape · temps d'attente",
  'board.atOpening': "À l'ouverture ({time}) · estimation",
  'board.preview': 'Aperçu {day} · estimation',
  'board.from': ' depuis {place}',
  'board.entrance': "l'entrée",
  'board.arrive': 'Arrivée {time}',
  'board.sr': '🙋 File solo ~{w} min',
  'board.vlOpen': '{vl} ouvert',
  'board.alts': 'Autres bons choix',
  goNow: 'Pars maintenant',
  'act.done': 'Fait',
  'act.leaveQueue': 'Quitter la file',
  'act.details': 'Fiche',
  'act.seen': 'Vu',
  'act.notToday': "Pas aujourd'hui",
  'act.later': '⏭ Pas maintenant',
  'act.restaurant': 'Le resto',
  'act.inQueue': 'Dans la file',

  // Onglet Maintenant
  'now.loading': "Chargement des attractions et des temps d'attente…",
  'now.noHours': "Pas d'horaires d'ouverture disponibles pour les prochains jours.",
  'now.allDoneEyebrow': 'Programme bouclé',
  'now.allDone': 'Bravo, tout est fait',
  'now.allDoneText': ({n}) => `${n} tour${n > 1 ? 's' : ''} au compteur. Les files les plus courtes autour de toi sont dans l'onglet Attractions (tri par attente). Pour refaire tes préférées, choisis « À refaire si… » dans leur fiche.`,
  'now.noneFeasible': "Aucune attraction de ton programme n'est faisable pour l'instant{extra}. Ajoute des bonus dans l'onglet Attractions.",
  'now.closedOrDown': ' (fermées ou en panne)',
  'note.missing': ({n, list}) => `Ne rentre${n > 1 ? 'nt' : ''} pas d'ici la fermeture : ${list}. Une réservation VirtualLine peut aider.`,
  'note.unavailable': ({n, list}) => `Indisponible${n > 1 ? 's' : ''} : ${list}.`,
  'note.notOpenLately': 'pas ouverte ces derniers jours',
  'note.small': ({n, h, list}) => `Trop grand${n > 1 ? 'es' : 'e'} pour ${h} cm : ${list}.`,
  'note.fromCm': 'dès {cm} cm',
  'note.parade': "{name} à {time} : beaucoup de visiteurs s'arrêtent pour la regarder, souvent un bon moment pour une grosse file.",
  'note.crowd': "Affluence : {pct} % {dir} d'un jour habituel, les prévisions en tiennent compte.",
  'note.real': 'On attend en vrai ~{pct} % des temps affichés : les horaires en tiennent compte.',
  'note.history': ({n, basis}) => `Prévisions basées sur ${n} jour${n > 1 ? 's' : ''} d'historique (${basis}).`,
  'note.generic': "Prévisions génériques : pas encore d'historique enregistré sur ton serveur.",
  'itin.preview': 'Aperçu · {day}',
  'itin.end': 'fin ~{time}',
  'itin.less': 'Réduire',
  'itin.more': 'Voir les {n} étapes suivantes',
  'tag.show': 'spectacle',
  'tag.meal': 'repas',
  'tag.sr': 'single rider',
  'tag.again': 'à refaire',
  'tag.bonus': 'bonus',
  'tag.slot': 'créneau',
  'tag.chosen': 'choisi',
  'tips.forecast': "<b>Affluence prévue :</b> les {name}s relevés ({n}), l'attente moyenne est de ~{avg} min, {pct} % {dir} de la moyenne des derniers jours. {verdict}",
  'tips.calm': 'Plutôt calme : profites-en.',
  'tips.busy': "Plutôt chargé : VirtualLine dès l'entrée et pause repas au pic.",
  'tips.average': 'Journée dans la moyenne.',
  'tips.early': "<b>Sois devant l'entrée avant {time}.</b> En début de journée, les grosses attractions ont les files les plus courtes : l'itinéraire commence par elles.",
  'tips.vl': "<b>VirtualLine dès que tu es dans le parc.</b> Gratuit, dans l'appli Europa-Park avec ton billet lié et la localisation activée. Un seul créneau à la fois par billet : re-réserve juste après l'avoir utilisé.",
  'tips.notif': '<b>Active les notifications</b> (Réglages) : alertes de file courte, départ pour un créneau ou un spectacle, même téléphone en poche.',

  // Carte VirtualLine
  'vl.slotAt': 'créneau à <b class="num">{time}</b>',
  'vl.goNow': 'Pars maintenant.',
  'vl.leaveAt': 'Départ conseillé {time} (dans {in}).',
  'vl.delete': 'Supprimer le créneau',
  'vl.before': "Dès ton entrée, réserve un créneau pour une attraction à grosse file{list}. Ensuite, note-le ici : l'itinéraire s'organise autour.",
  'vl.bookNow': 'Réserve maintenant : <b>{name}</b>',
  'vl.currentQueue': ' · file actuelle {w} min',
  'vl.nextSlot': ' · prochain créneau ~{time}',
  'vl.none': "Aucune attraction de ton programme n'a de {vl} ouvert pour l'instant.",
  'vl.haveSlot': "J'ai un créneau",
  'vl.howTo': 'Comment réserver',
  'vl.free': 'coupe-file gratuit',

  // Bannière
  'banner.goNow': '<b>Pars maintenant</b> vers {name} : {what} à {time}.',
  'banner.vlSlot': 'créneau {vl}',
  'banner.atRide': 'Tu es à <b>{name}</b>. Tu fais la queue ?',
  'banner.finished': 'Tu as fini <b>{name}</b> ?',
  'banner.lastCall': '<b>Dernier appel</b> : fermeture à {time}, les files ferment à cette heure-là.',
  'banner.stillPossible': ' Encore possible : {list}.',
  'banner.rain': "<b>Pluie annoncée vers {h} h</b> : l'itinéraire passe aux attractions couvertes.",
  'banner.offline': "Pas de réseau : affichage des dernières données reçues. L'actualisation reprend automatiquement.",
  'banner.stale': "La source des temps d'attente ne répond pas : données du dernier relevé.",

  // Liste
  'list.hint.plan': 'Étoile pleine : ⭐ j\'adore · demi-étoile : 👍 si on a le temps. Touche l\'étoile pour changer.',
  'list.hint.rides': "Ajoute des attractions à ton programme avec l'étoile.",
  'list.hint.shows': "Étoile : le spectacle entre dans ton itinéraire, à la meilleure représentation.",
  'list.hint.food': 'Restaurants et stands du parc.',
  'list.emptyPlan': 'Ton programme est vide : passe sur « Attractions » et touche les étoiles.',
  'list.empty': 'Rien à afficher.',
  'list.reopened': 'vient de rouvrir',
  'list.alert': 'alerte ≤ {w} min',
  'list.again': 'à refaire ≤ {w} min',
  'list.done': 'fait',
  'list.seen': 'vu',
  'list.over': 'terminé',
  'star.must': '⭐ J\'adore — passer à « si on a le temps »',
  'star.bonus': '👍 Si on a le temps — retirer du programme',
  'star.add': 'Ajouter au programme',
  'show.remove': "Retirer de l'itinéraire",
  'show.add': "Ajouter à l'itinéraire",
  'food.open': 'Ouvert',
  'food.closed': 'Fermé',
  'food.closedNow': "Fermé pour l'instant",

  // Carte
  'map.group': ' Groupe : {list}.',
  'map.member': '{nick} ({walk} min, il y a {age} min)',
  'map.meet': ' Point de rencontre conseillé (losange) : {name}.',
  'map.alone': " Personne d'autre ne partage sa position pour l'instant.",
  'map.note': "Point violet : {where}. Grosses pastilles : ton programme, avec l'attente.{group}",
  'map.noteSvg': 'Point violet : {where}. Gros points : ton programme.{group} Plan schématique, nord en haut.',
  'map.gps': 'ta position GPS',
  'map.last': 'dernière attraction faite ({name})',
  'map.entrance': 'entrée principale (active la position dans Réglages)',
  'map.wait': 'Carte disponible dès le chargement des attractions.',
  'map.aria': "Plan schématique des attractions avec leur temps d'attente",

  // Réglages
  'set.noUser': 'Aucun profil choisi.',
  'set.localUser': 'Profil local : ton programme reste sur ce téléphone (serveur injoignable au moment du choix).',
  'set.user': 'Connecté en tant que {name}. Tout est enregistré sur le serveur à chaque changement.',
  'set.noOther': 'Aucun autre profil',
  'set.planSummary': ({must, bonus, shows, done}) => `${must} incontournables · ${bonus} bonus${shows ? ` · ${shows} spectacle${shows > 1 ? 's' : ''}` : ''} · ${done} fait${done > 1 ? 's' : ''} aujourd'hui`,
  'gps.off': "Désactivée : les distances partent de la dernière attraction marquée « faite », ou de l'entrée.",
  'gps.wait': 'Recherche de ta position…',
  'gps.on': "Active : les distances partent de l'endroit où tu es. La page te demande aussi si tu fais la queue en arrivant à une attraction.",
  'gps.out': "Active, mais tu n'es pas dans le parc : les distances partent de l'entrée.",
  'gps.denied': 'Refusée par le navigateur. Autorise la localisation pour ce site dans les réglages du téléphone.',
  'gps.unavailable': 'Indisponible (la page doit être servie en HTTPS).',
  'gps.enable': 'Utiliser ma position',
  'gps.disable': 'Désactiver la position',
  'set.version': "Version {v} · les mises à jour arrivent toutes seules à l'ouverture de l'appli.",
  'data.server': 'via ton serveur (cache + historique)',
  'data.direct': "en direct depuis themeparks.wiki (api.php injoignable, pas d'historique)",
  'data.none': "aucune pour l'instant",
  'data.source': 'Source : {src}.',
  'data.history': 'Historique : {h}',
  'data.days': ({n, basis}) => `${n} jour${n > 1 ? 's' : ''} (base ${basis})`,
  'data.noHistory': "aucun pour l'instant. Lance le cron de collecte (voir README) : dès la veille, les prévisions se basent sur les vraies files.",
  'data.real': 'Temps réels : {r}',
  'data.realMine': 'tu attends ~{pct} % des temps affichés ({n} mesures).',
  'data.realPooled': "~{pct} % des temps affichés, d'après {n} mesures de tous les profils. Après deux mesures à toi, ce sont les tiennes qui comptent.",
  'data.realHow': "touche « Dans la file » en entrant dans une file, puis « Fait » à la sortie : après deux mesures, l'itinéraire utilise les vrais temps.",
  'crowd.today': "Aujourd'hui : {pct} % {dir} d'un jour habituel.",
  'crowd.about': 'Attente moyenne des attractions entre 11 h et 16 h, jour par jour (historique de ton serveur).',
  'crowd.notEnough': "Pas encore assez d'historique.",
  'crowd.calmest': 'Jours les plus calmes : {list}.',

  // Fiche
  'chart.empty': "Pas encore de relevé pour cette attraction aujourd'hui. La courbe se remplit au fil des actualisations.",
  'chart.aria': 'Attente au fil de la journée',
  'chart.today': "aujourd'hui",
  'chart.usual': 'habituel (pointillés)',
  'best.low': '<b>Au plus bas vers {time}</b> (~{w} min{also})',
  'best.also': ', aussi {list}',
  'best.peak': ' · pic vers {time} (~{w} min).',
  'best.basis': ({n, basis}) => `D'après ${n} jour${n > 1 ? 's' : ''} (${basis}).`,
  'sheet.wait': 'Attente',
  'sheet.usual': "D'habitude",
  'sheet.walk': 'À pied',
  'sheet.minCm': 'Taille mini accompagné : {cm} cm (indicatif)',
  'sheet.tooSmall': ' · <b>trop petit pour ton groupe</b>',
  'sheet.indoor': 'Couverte',
  'sheet.wet': 'On en ressort mouillé',
  'sheet.vl': '{vl} : <b>{state}</b>',
  'sheet.vlOffer': ' · créneau proposé vers {time}',
  'sheet.inPlan': 'Dans mon programme',
  'sheet.plan': 'Programme',
  'plan.must': '⭐ J\'adore',
  'plan.bonus': '👍 Si on a le temps',
  'sheet.redone': 'Refait ({n}×)',
  'sheet.markDone': 'Marquer fait',
  'sheet.inQueue': 'Je suis dans la file',
  'sheet.undone': 'Annuler « fait »',
  'sheet.alert': "M'alerter quand l'attente passe sous…",
  'sheet.noAlert': "Pas d'alerte",
  'sheet.srIn': "File single rider relevée à l'entrée (min)",
  'sheet.srPh': 'Estimation : ~{w} min',
  'sheet.again': "À refaire si l'attente passe sous…",
  'sheet.once': 'Une fois suffit',
  'sheet.showPlanned': ' · prévu dans ton itinéraire à <b>{time}</b>',
  'sheet.noShow': "Pas de représentation annoncée aujourd'hui.",
  'sheet.showRemove': 'Retirer de mon itinéraire',
  'sheet.showAdd': 'Ajouter à mon itinéraire',
  'slot.title': "J'ai réservé un créneau {vl}",
  'slot.ride': 'Attraction',
  'slot.start': 'Début du créneau',
  'slot.save': 'Enregistrer le créneau',

  // Actions et toasts
  'toast.preset': '{n} attractions ajoutées au programme',
  'toast.done': '{name} : {what}',
  'rebook': "<b>Re-réserve un créneau {vl}</b> dans {app}{pick}. Puis note-le avec « J'ai un créneau ».",
  'rebook.app': "l'appli officielle du parc",
  'rebook.pick': ' : <b>{name}</b> est le plus intéressant{w}',
  'rebook.queue': ' (file {w} min)',
  'toast.inQueue': 'Dans la file : {name}',
  'toast.cleared': 'Programme vidé',
  'toast.showAdded': "Spectacle ajouté : l'itinéraire choisit la meilleure représentation",
  'toast.showRemoved': "Spectacle retiré de l'itinéraire",
  'toast.notToday': "{name} : pas aujourd'hui",
  'toast.skip': '{name} : on y revient dans 30 min minimum',
  'toast.leftQueue': 'Sorti de la file',
  'toast.mealDone': 'Pause repas : faite',
  'toast.mealLater': "Repas décalé d'au moins 30 min",
  'toast.slotTime': "Indique l'heure de début du créneau",
  'toast.slotSaved': 'Créneau {vl} enregistré : {name} à {time}',
  'toast.slotDeleted': 'Créneau supprimé',
  'toast.checking': "Recherche d'une mise à jour…",
  'toast.pushSent': 'Notification envoyée',
  'toast.pushNone': 'Aucun téléphone abonné pour ce profil',
  'toast.offline': 'Serveur injoignable',
  'toast.copied': 'Programme de {name} copié',
  'toast.copyFail': 'Impossible de lire ce profil',
  'reset.confirm': 'Confirmer la remise à zéro',
  'toast.reset': 'Journée remise à zéro',
  'toast.alert': 'Alerte : {name} sous {w} min',
  'toast.alertOff': 'Alerte supprimée',
  'toast.again': 'À refaire dès que la file passe sous {w} min',
  'toast.mealWindow': 'Fenêtre plus courte que le repas : il sera placé au plus tôt',
  'toast.srReset': 'Estimation single rider rétablie',
  'toast.sr': 'Single rider : {w} min, pris en compte 45 min',
  'alert.againPrefix': 'À refaire · ',
  'alert.short': 'File courte',

  // Notifications
  'push.needProfile': 'Choisis un profil enregistré sur le serveur pour recevoir les notifications',
  'push.ios': "Sur iPhone : ajoute d'abord la page à l'écran d'accueil, puis ouvre-la depuis l'icône",
  'push.unsupported': 'Notifications push non prises en charge par ce navigateur',
  'push.refused': 'Notifications refusées : autorise-les dans les réglages du téléphone',
  'push.enabled': 'Notifications activées sur ce téléphone',
  'push.fail': 'Activation impossible : {msg}',
  'push.on': 'Actives sur ce téléphone, même page fermée : files sous tes seuils, attractions à refaire, réouvertures, départ pour un créneau VirtualLine, un spectacle ou le repas.',
  'push.blocked': 'Bloquées dans le navigateur : autorise-les dans les réglages du téléphone.',
  'push.iosHint': "Sur iPhone (iOS 16.4 ou plus), ajoute la page à l'écran d'accueil puis ouvre-la depuis l'icône pour les activer.",
  'push.noPush': 'Push non pris en charge ici : alertes par vibration, page ouverte seulement.',
  'push.pitch': 'Reçois les alertes téléphone en poche : files courtes, réouvertures, départ pour un créneau ou un spectacle.',
  'push.subs': ' {n} téléphones abonnés pour ce profil.',

  // Récap
  'recap.gained': "Tu as attendu environ <b>{d} de moins</b> que l'attente moyenne de la journée sur ces attractions.",
  'recap.best': 'Meilleur coup : <b>{name}</b> à {w} min ({avg} en moyenne).',
  'recap.fav': 'Préférée : <b>{name}</b> ×{n}.',
  'recap.shows': ({n}) => `${n} spectacle${n > 1 ? 's' : ''} vu${n > 1 ? 's' : ''}.`,
  'recap.eyebrow': 'Ta journée · {from} – {to}',
  'recap.rides': 'Tours',
  'recap.queues': 'Dans les files',
  'recap.share': 'Partager',
  'recap.title': 'Récap de ma journée',
  'recap.empty': "Rien d'enregistré aujourd'hui : touche « Fait » à la sortie de chaque attraction, le récap se remplit tout seul.",
  'share.text': '{park}, {day} : {rides} tours ({distinct} attractions), {queue} dans les files, ≈ {km} km à pied',
  'share.gained': ", {d} d'attente gagnée",
  'share.fav': '. Préférée : {name} ×{n}',
  'share.title': 'Ma journée à {park}',
  'toast.recapCopied': 'Récap copié',

  // Installation et démarrage
  'install.done': "EP Live est installée : ouvre-la depuis ton écran d'accueil",
  'install.prompt': "Ajoute EP Live à ton écran d'accueil : elle s'ouvre en plein écran, reste utilisable quand le réseau du parc sature, et peut t'envoyer des notifications.",
  'install.btn': "Installer l'appli",
  'install.ios': "Dans Safari, touche <b>Partager</b> (le carré avec une flèche vers le haut), puis <b>Sur l'écran d'accueil</b>. Ouvre ensuite EP Live depuis l'icône : c'est indispensable pour recevoir les notifications (iOS 16.4 ou plus).",
  'install.menu': "Dans le menu du navigateur (⋮), choisis <b>Installer l'application</b> ou <b>Ajouter à l'écran d'accueil</b>.",
  'install.h': 'Application',
  'install.installed': 'Installée sur ce téléphone.',
  'boot.fail': 'Impossible de charger la configuration du parc (parks.json). Vérifie la connexion puis recharge la page.',
  'boot.newVersion': "Nouvelle version de l'appli.",
  'boot.seeNews': 'Voir les nouveautés',
};

I18N.en = {
  locale: 'en-GB',
  // Ajouts : mode simple, flèche, démarrage en 3 questions
  'mode.title': 'Display',
  'mode.simple': '😊 Simple',
  'mode.expert': '🤓 Full',
  'mode.hint': 'Simple: one thing to do at a time, in big. Full: route, details and all settings.',
  'adv.title': 'Advanced settings',
  's.hello': 'Hi {name}!',
  's.start': 'Three questions and off you go.',
  's.go': 'Let\'s go',
  's.all': 'See the whole day',
  's.less': 'Back to the essentials',
  's.today': 'Today',
  's.beAt': 'Be at the entrance at {time}',
  's.startWith': 'We start with: {list}',
  's.allDone': 'All done, well done!',
  's.shortest': 'Shortest queues right now:',
  's.inQueue': 'You\'re queuing for',
  's.left': 'about {n} min left',
  's.finished': '✅ Done!',
  's.seen': '✅ Seen!',
  's.leaveQueue': '🚪 I\'m leaving the queue',
  's.vl': 'Your {vl} slot',
  's.at': 'at {time}',
  's.leaveAt': 'leave at {time}',
  's.show': 'Show',
  's.meal': 'Time to eat!',
  's.goTo': 'Go to',
  's.queue': '{n} min queue',
  's.imHere': '🙋 I\'m here, queuing',
  's.then': 'Then: {list}',
  'c.enable': '📍 Turn on your location to see the arrow',
  'c.here': '🎯 You\'re there!',
  'c.north': 'north up',
  'c.turn': '🧭 Turn the arrow with the phone',
  'c.denied': 'Compass denied: the arrow stays north-up.',
  'w.step': 'Step {n} of 3',
  'w.like': 'You prefer…',
  'w.thrills': 'Big thrills!',
  'w.calm': 'Easy-going',
  'w.mix': 'A bit of everything',
  'w.kids': 'Any little ones with you?',
  'w.noKids': 'No, only grown-ups',
  'w.kidCm': 'Yes, the smallest is {cm} cm',
  'w.howTitle': 'It\'s really simple',
  'w.how1': '👉 Go where the app says, follow the arrow',
  'w.how2': '🙋 In the queue, tap “I\'m here”',
  'w.how3': '✅ When you\'re out, tap “Done!”: the next one shows up by itself',
  'w.gps': '📍 Turn on my location',
  'w.notif': '🔔 Turn on notifications',
  'w.go': 'Let\'s go!',
  // Rejouer : colonne incontournables
  'replay.musts': 'Must-dos ({n})',
  // Ajouts : rendez-vous, programme commun, plein soleil, batterie, rejouer une journée
  'meet.title': 'Meeting point',
  'meet.board': 'Meeting point · {place}',
  'meet.at': 'meet',
  'meet.reason': 'The group meets here: the route makes sure you\'re on time.',
  'meet.here': 'We\'ve met up',
  'meet.share': 'Share',
  'meet.cancel': 'Cancel',
  'meet.hint': 'To split up and meet again: each subgroup keeps its own profile, and each route ends here on time. Share the meeting point with the others.',
  'meet.time': 'Time',
  'meet.set': 'Meet here',
  'meet.update': 'Change the time',
  'meet.saved': 'Meeting point: {place} at {time}',
  'meet.doneToast': 'Group back together',
  'meet.cancelled': 'Meeting point cancelled',
  'meet.shareText': 'Meet at {place} at {time}:',
  'meet.copied': 'Meeting point link copied',
  'vote.title': 'Shared plan',
  'vote.hint': 'Everyone stars rides in their own profile, then the app merges them: must-do if half the group wants it, bonus if at least one person does.',
  'vote.open': 'Merge plans',
  'vote.pick': 'Tick the profiles to include:',
  'vote.apply': 'Replace {name}\'s plan',
  'vote.count': '{n} rides',
  'vote.preview': 'Result with {n} profiles: {must} must-dos, {bonus} bonus, {shows} shows.',
  'vote.none': 'Tick at least one profile.',
  'vote.done': 'Shared plan from {n} profiles applied',
  'vote.fail': 'Profiles unavailable: server unreachable.',
  'sun.title': 'Bright sunlight mode',
  'sun.hint': 'Maximum contrast and bigger text, to read the screen outdoors',
  'eco.title': 'Battery saver',
  'eco.hint': 'Less precise GPS, refresh every 5 min instead of 2',
  'eco.suggest': '<b>Low battery</b>: switch to battery saver?',
  'eco.on': 'Battery saver on',
  'replay.title': 'Replay a day',
  'replay.hint': 'Simulates a day recorded by the server with your plan: the app\'s route against two simple strategies, with that day\'s real queues.',
  'replay.day': 'Day',
  'replay.run': 'Replay',
  'replay.noDays': 'No recorded day',
  'replay.running': 'Simulating…',
  'replay.fail': 'Not enough data for that day.',
  'replay.noPlan': 'Your plan is empty: add rides first.',
  'replay.app': 'App\'s route',
  'replay.order': 'Plan order',
  'replay.shortest': 'Shortest queue',
  'replay.rides': 'Rides',
  'replay.queue': 'Queuing',
  'replay.walk': 'Walking',
  'replay.summary': '{day}, with the {n} rides in your plan and that day\'s real queues.',
  'replay.more': 'The app fits in {n} more must-do(s).',
  // Ajouts : VirtualLine, notes, carte, points pratiques, voiture, prévision
  'vl.quick': 'I booked {time}',
  'vl.openApp': 'Open the app',
  'rate.ask': 'Your rating for <b>{name}</b>?',
  'rate.saved': 'Rating saved: {n}/5',
  'rate.again': 'Rated {n}/5 · added to “ride again” under {thr} min',
  'rate.mine': 'Your rating',
  'rate.group': 'Group: ★ {avg} ({n})',
  'recap.top': 'Your favourites: {list}.',
  'map.full': 'Full screen',
  'map.exit': 'Exit full screen',
  'map.locate': 'Centre on me and follow',
  'map.park': 'Whole park',
  'map.waitGps': 'Finding your location…',
  'map.outPark': 'You\'re not in the park right now.',
  'poi.nearestBtn': 'Nearest toilets',
  'poi.toilets': 'Toilets',
  'poi.water': 'Drinking water',
  'poi.lockers': 'Lockers',
  'poi.atm': 'Cash machines',
  'poi.parking': 'Car parks',
  'poi.firstaid': 'First aid',
  'poi.none': 'No “{type}” known in this park.',
  'poi.nearest': '{type}: nearest is {min} min away',
  'car.title': 'My car',
  'car.myPos': 'saved spot',
  'car.walk': '{min} min walk',
  'car.route': 'Directions',
  'car.onMap': 'On the map',
  'car.clear': 'Forget the spot',
  'car.cleared': 'Car spot forgotten',
  'car.hint': 'Save your spot when you arrive: in the evening the app guides you back. It\'s shared with your profile.',
  'car.here': 'Here (my current location)',
  'car.noGps': 'Turn on your location to save the exact spot, or pick the car park below.',
  'car.pick': 'Or pick the car park',
  'car.saved': 'Car: {name}',
  'car.none': 'Car spot not saved.',
  'car.save': 'Save',
  'car.back': 'Back to the car',
  'map.dl': 'Download the map (≈ {mb} MB)',
  'map.dlHint': 'Do it the day before on wifi: the park map stays available when mobile data is saturated.',
  'map.dlProgress': 'Downloading the map… {pct}%',
  'map.dlDone': 'Map saved on this phone ({n} tiles)',
  'map.dlDoneAt': 'Map downloaded on {date}: it works offline.',
  'map.dlFail': 'Download interrupted: try again on wifi.',
  'fc.title': 'Which day to come?',
  'fc.school': 'school holidays {list}',
  'fc.public': 'public holiday {list}',
  'fc.hint': 'Expected crowds on the next opening days, based on {src} and school and public holidays in the visitors\' home regions.',
  'fc.srcHistory': 'your history',
  'fc.srcGeneric': 'the day of the week',
  'fc.none': 'No forecast: opening hours unknown.',
  'fc.tip': '<b>Expected crowds</b> that day: {level}{why}.',
  'fc.levels': ['Quiet', 'Average', 'Busy', 'Very busy'],
  loading: 'Loading…',
  help: 'Help',
  profile: 'Profile',
  switchUser: 'Switch profile',
  refresh: 'Refresh wait times',
  close: 'Close',
  'onb.title': 'Your plan',
  'onb.text': 'Pick a starting point, then add or remove each ride in the Rides tab.',
  'preset.thrills': 'Thrill rides',
  'preset.family': 'Family',
  'onb.self': "I'll choose myself",
  'itin.title': 'Suggested route',
  'shows.title': 'Upcoming shows',
  'shows.next2h': 'Next 2 hours',
  'tips.title': 'Getting started',
  filter: 'Filter',
  'filter.plan': 'My plan',
  'filter.rides': 'Rides',
  'filter.shows': 'Shows',
  'filter.food': 'Food',
  search: 'Search',
  'search.ph': 'Search (e.g. Voltron)',
  sort: 'Sort',
  'sort.wait': 'Wait',
  'sort.walk': 'Distance',
  'legend.you': 'you',
  'legend.group': 'group',
  'legend.closed': 'closed',
  'set.copyFrom': 'Copy the plan from',
  'set.copy': 'Copy',
  'set.plan': 'My plan',
  'set.clear': 'Clear',
  meal: 'Meal break',
  'set.mealHint': 'Placed when queues are longest, near an open restaurant',
  'set.mealDur': 'Meal length',
  'set.mealFrom': 'Not before',
  'set.mealTo': 'Done by',
  'set.route': 'Route priority',
  'route.walk': 'Less walking',
  'route.balanced': 'Balanced',
  'route.wait': 'Less waiting',
  'set.sr': '🙋 Solo line OK (single rider)',
  'set.srHint': "Separate queue on Blue Fire, Voltron, CanCan, Arthur (check on site): often much shorter, but you're split up on the ride",
  'set.pace': 'Walking pace',
  'pace.kids': 'With kids',
  'pace.normal': 'Normal',
  'pace.fast': 'Fast',
  'set.height': 'Height of the smallest in the group (cm)',
  'set.noLimit': 'No limit',
  'set.heightHint': 'Minimum heights with an adult, for guidance only: always check the sign at the entrance.',
  'set.hotel': "I'm staying at a park hotel",
  'set.hotelHint': 'Early entry from hotel opening time (often 8:30, some rides only)',
  'set.position': 'My location',
  'set.share': 'Share my location with the group',
  'set.shareHint': 'Visible on the map for everyone using the app, up to 20 min after your last update',
  'set.nick': 'My first name on the map',
  'set.notif': 'Notifications',
  'set.pushOn': 'Turn on notifications',
  'set.pushTest': 'Test',
  'set.crowd': 'Crowds',
  'set.data': 'Data',
  'set.help': 'Help and updates',
  'set.update': 'Update',
  'set.newDay': 'New day',
  'set.newDayHint': 'Resets rides done, VirtualLine slots, the meal and alerts sent. Your plan is kept.',
  reset: 'Reset',
  'set.credits': 'Wait times: as announced by the park, relayed by themeparks.wiki. Weather: Open-Meteo. Unofficial page, not affiliated with Europa-Park.',
  'tab.now': 'Now',
  'tab.list': 'Rides',
  'tab.map': 'Map',
  'tab.settings': 'Settings',
  'help.title': 'How it works',
  'help.news': "What's new",
  'help.intro': 'EP Live tells you at every moment which ride to do now, and plans the rest of your day so you wait and walk as little as possible.',
  'help.version': 'Version {v}',
  'help.simple': `<summary>Simple mode</summary>
    <p>By default the Now screen shows just one thing: <b>where to go now</b>, in big, with three buttons:</p>
    <ul>
      <li><b>🙋 I'm here</b>: you're queuing (a timer starts);</li>
      <li><b>✅ Done!</b>: when you're out, the next step shows up by itself;</li>
      <li><b>⏭ Not now</b>: we'll come back to it later.</li>
    </ul>
    <p><b>The arrow</b> points to the next step (as the crow flies) with the distance. With location on, it turns with the phone; on iPhone, tap “Turn the arrow” once to allow it. “🎯 You're there!” when you've arrived.</p>
    <p><b>See the whole day</b> unfolds the full route. Settings → <b>Display</b>: 😊 Simple or 🤓 Full (all the details, advanced settings open).</p>
  `,
  'help.start': `<summary>Get started in 4 steps</summary>
    <ol>
      <li><b>Install the app</b> on your Home Screen (see “Install the app”).</li>
      <li><b>Choose your profile</b>: your nickname, no password. Everything is saved on the server.</li>
      <li><b>Make your plan</b>: <i>Thrill rides</i> or <i>Family</i>, then fine-tune with the stars in <b>Rides</b>. Full star = must-do, half star = bonus if there's time.</li>
      <li><b>In Settings</b>: turn on location and notifications, set the meal break and the route priority.</li>
    </ol>
  `,
  'help.install': `<summary>Install the app</summary>
    <ul>
      <li><b>Android</b>: <b>Install the app</b> button in the Now tab or in Settings, otherwise menu ⋮ → <i>Install app</i>.</li>
      <li><b>iPhone</b>: in <b>Safari</b>, tap <b>Share</b> (square with an arrow) → <b>Add to Home Screen</b>. Then open the app from the icon: required for notifications (iOS 16.4 or later).</li>
    </ul>
    <p>Once installed, it opens full screen and keeps working when the park's network is overloaded.</p>
  `,
  'help.now': `<summary>The Now screen</summary>
    <p>The big board shows the <b>next stop</b>: the posted wait, the walking time and why now is the right moment. Below: three other good picks, then the route for the rest of the day with arrival times.</p>
    <table>
      <tr><td>In queue</td><td>You join the queue: a timer starts and the route continues from the end of this ride.</td></tr>
      <tr><td>Done</td><td>At the exit: the route restarts from here. If you were “in queue”, your real wait time is measured.</td></tr>
      <tr><td>Later</td><td>Puts the ride aside for 30 minutes.</td></tr>
      <tr><td>Name</td><td>Opens the details: today's chart, usual wait, <b>quiet and peak times</b>, alerts, virtual queue.</td></tr>
    </table>
    <p>Made a mistake? The toast at the bottom always offers <b>Undo</b>.</p>
  `,
  'help.colors': `<summary>Wait time colours</summary>
    <ul>
      <li><b style="color:var(--w-low)">Green</b>: 10 min or less</li>
      <li><b style="color:var(--w-mid)">Yellow</b>: 15 to 25 min</li>
      <li><b style="color:var(--w-high)">Orange</b>: 30 to 45 min</li>
      <li><b style="color:var(--w-peak)">Red</b>: 50 min and more</li>
      <li><b style="color:var(--w-off)">Grey</b>: closed or down</li>
    </ul>
    <p>In the list, ↗ / ↘ means the queue has gone up or down by at least 10 min over the last 30 minutes.</p>
  `,
  'help.route': `<summary>How the route is chosen</summary>
    <ul>
      <li><b>Gain</b>: the app compares the expected wait when you arrive with the average wait later in the day. A big ride that's quiet right now moves up.</li>
      <li><b>Forecasts</b>: it starts from the current wait and blends into the ride's usual profile, taken from the server's history and adjusted for today's crowds.</li>
      <li><b>Walking</b>: every minute of walking counts against a ride (even more beyond 8 min). It also looks at the following ride to avoid going back and forth across the park. <i>Settings → Priority</i>: less walking, balanced or less waiting.</li>
      <li><b>Weather</b>: in the rain, indoor rides move up. In storms or strong wind, outdoor ones move down. Water rides go preferably at the warmest times.</li>
      <li><b>Bonus</b>: only if there's enough time left for all the must-dos.</li>
      <li><b>Real times</b>: each “In queue” → “Done” measurement learns the gap between the posted and the actual wait (often less). Measurements from every profile on the server help everyone; once you have two of your own, yours count.</li>
      <li><b>Ride length</b>: each ride has its own duration (a coaster ~4 min, a dark ride ~10 min), for accurate arrival times.</li>
    </ul>
    <p>The route is recalculated every 2 minutes and whenever you tap a button.</p>
  `,
  'help.vl': `<summary>VirtualLine (free virtual queue)</summary>
    <ol>
      <li>The VirtualLine card shows the ride where a slot saves you the most.</li>
      <li>Book in the <b>official Europa-Park app</b> (ticket linked, location on, one slot at a time).</li>
      <li>Note it with <b>I have a slot</b>: the route is planned around it and tells you when to leave.</li>
      <li>After <b>Done</b>, the app tells you what to book next right away.</li>
    </ol>
    <p>When the offered slot is known, an <b>I booked 15:20</b> button saves it in one tap. <b>Open the app</b> launches the official app (on iPhone: its App Store page, with “Open”). With notifications on, you're told when a virtual queue opens on a ride in your plan, if you don't already have a slot. Booking itself always happens in the official app: there's no public access.</p>
  `,
  'help.fixed': `<summary>Meals and shows</summary>
    <p><b>Meal break</b> (Settings): the app places it within your time window, when queues are longest, and shows the nearest open restaurant. <i>Later</i> pushes it back 30 min, <i>Done</i> removes it.</p>
    <p><b>Shows</b>: star a show (Rides → Shows). The app picks the showtime that costs you the least queue time and tells you when to leave (5 min early).</p>
  `,
  'help.notif': `<summary>Notifications</summary>
    <p>Once turned on in Settings, they arrive even with the app closed:</p>
    <ul>
      <li><b>Short queue</b>: below the threshold set in the details (“Alert me when…”).</li>
      <li><b>Ride again</b>: a ride you've done drops below its threshold again (“Ride again if…”).</li>
      <li><b>Reopened</b>: a ride on your plan reopens after a breakdown.</li>
      <li><b>Leave now</b>: for a VirtualLine slot or a show, walking time included.</li>
      <li><b>Meal break</b>: the right time to eat.</li>
      <li><b>Rain</b>: rain expected within the hour, the route switches to indoor rides.</li>
      <li><b>Last call</b>: 45 min before closing, the last rides you can still make near you.</li>
    </ul>
    <p>While you're “in queue”, short-queue alerts are paused.</p>
  `,
  'help.map': `<summary>The map</summary>
    <p>OpenStreetMap background: paths, buildings and lakes in the park. Pinch to zoom. Big dots are your plan, with the live wait and its colour; small dots are the other rides. The dotted purple line leads to the next stop. Tap a dot to open its details.</p>
    <p>Areas you've already viewed stay in memory: the map opens even when the network is overloaded. With no data in memory at all, the app shows a simplified plan.</p>
    <p><b>Map buttons</b>: ⤢ full screen; ◎ centres on you and follows you as you walk (moving the map stops following); 🗺 back to the whole park; 🚻 shows the nearest toilets; 🚗 your car.</p>
    <p><b>Practical points</b>: above the map, show or hide toilets, drinking water, lockers, cash machines and car parks (OpenStreetMap, sometimes incomplete).</p>
    <p><b>Offline</b>: below the map, “Download the map” saves the whole park on your phone. Do it the day before on wifi.</p>
    <p><b>Your car</b>: save your spot when you arrive (GPS position or car park name). In the evening the app shows the walking time and directions back, and everyone on the profile sees it.</p>
  `,
  'help.gps': `<summary>GPS location</summary>
    <p>With location on, walking times start from where you are. When you reach a ride on your plan, the app asks “Are you queuing?”, and “Finished?” when you walk away. Without GPS, distances start from the last ride done, or from the entrance.</p>
  `,
  'help.group': `<summary>As a group</summary>
    <ul>
      <li><b>One shared profile</b> (e.g. “Group”) chosen by everyone: a “Done” on one phone reaches the others within 2 minutes, and everyone gets the notifications.</li>
      <li><b>One profile each</b>: Settings → “Copy the plan from…” takes over someone else's plan.</li>
      <li><b>Meeting up</b>: Settings → “Share my location with the group”, with your first name. On the <b>Map</b>, everyone shows up as a solid dot with their first name and the walking time to them. The diamond marks the suggested <b>meeting point</b>: the ride closest to the centre of the group.</li>
    </ul>
    <p class="muted">A shared location is visible to everyone using the app on this server, and disappears 20 min after the last update. Untick sharing to remove it straight away.</p>
    <p><b>Shared plan</b>: everyone stars rides in their own profile, then Settings → “Merge plans”. Must-do if at least half the group wants it, bonus if anyone does; all chosen shows are kept.</p>
    <p><b>Split up and meet again</b>: in a ride's details, “Meet here” at a given time. Each route ends there on time, with a notification to leave. Each subgroup uses its own profile; “Share” sends the meeting point to the others as a link.</p>
  `,
  'help.sr': `<summary>Single rider</summary>
    <p>Some rides have a “single rider” queue to fill empty seats: much shorter, but the group is split up on the ride. Reported on Blue Fire, Voltron, CanCan and Arthur, <b>check on site</b> (it may be closed on some days).</p>
    <p>Turn it on in <b>Settings → Single rider OK</b>. The app then counts half the normal wait. As soon as you see the real single rider wait at the entrance, note it in the ride's details: it's used for 45 min.</p>
  `,
  'help.recap': `<summary>Day recap</summary>
    <p>Every “Done” is recorded. In the evening, the Now tab shows your day: number of rides, time spent in queues, distance walked (estimated between rides), wait saved compared with the day's average, best move and favourite ride. <b>Share</b> button to send it to the group. Any time: Settings → <i>My day recap</i>.</p>
    <p><b>Ratings</b>: after each “Done”, the app asks for 1 to 5 stars (also in the details). 4 or 5 stars add the ride to “ride again” if nothing is set. The recap shows your favourites, and the list shows the average rating across all profiles.</p>
  `,
  'help.crowd': `<summary>Crowds</summary>
    <p>During the day, the app compares current queues with the usual queues at the same time and takes it into account (“Crowds: 20% above”). The day before, the preview shows the usual crowds for that day of the week, based on the days recorded by the server. Settings → Crowds shows the last few days and the quietest days.</p>
    <p><b>Which day to come?</b> (Settings): expected crowds on the next opening days, from quiet to very busy, based on your history (or the day of the week) and school and public holidays in the visitors' home regions (Baden-Württemberg, Alsace, Switzerland… for Europa-Park).</p>
    <p><b>Replay a day</b> (Settings): the app replays a recorded day with your plan and that day's real queues, and compares its route with “plan order” and “shortest queue”.</p>
  `,
  'help.sync': `<summary>Profile, lost connection, new phone</summary>
    <p>Every change is sent to the server a second later. If your phone dies or you switch phones, open the app and choose your nickname: you pick up exactly where you left off (plan, rides done, slots, current queue). The button with your nickname at the top lets you switch profiles.</p>
    <p>Without a network, the app shows the last data received (orange banner) and sends your changes as soon as the network is back.</p>
  `,
  'help.tips': `<summary>Good to know</summary>
    <ul>
      <li><b>Battery</b>: GPS and mobile data all day drain a phone fast. Bring a power bank. Without GPS, the app works just fine if you tap “Done” at each exit.</li>
      <li><b>Network</b>: mobile data sometimes gets overloaded at peak times. The app keeps the last data and resyncs on its own.</li>
      <li><b>Arrive early</b>: being at the entrance a little before opening means the big rides with the shortest queues of the day. The preview the day before starts with them.</li>
      <li><b>Posted times</b>: these are the ones announced by the park, often slightly overestimated. Measure them with “In queue”: the app adapts.</li>
      <li><b>VirtualLine</b>: in the official Europa-Park app, with your ticket linked and location on, once you're in the park. One slot at a time: book again as soon as you've used it.</li>
      <li><b>Breakdowns</b>: frequent and often short. The app tries again 45 min later and tells you when it reopens.</li>
      <li><b>Roller coasters</b>: nothing in your pockets. Lockers are often provided at the entrance: allow a few extra minutes.</li>
      <li><b>Water rides</b>: you can come out soaked. In cool weather, the app tends to place them at the warmest times.</li>
      <li><b>End of the day</b>: queues close at park closing time. The route makes sure you're in the last one in time.</li>
    </ul>
    <p><b>Bright sunlight mode</b> (Settings): maximum contrast and bigger text. <b>Battery saver</b>: less precise GPS and a refresh every 5 min; on Android the app offers it by itself below 20% battery.</p>
    <p><b>Seasonal</b>: seasonal shows (Halloween, Christmas…) are marked 🎃 and listed first among shows.</p>
  `,
  'help.faq': `<summary>Common problems</summary>
    <table>
      <tr><td>No notifications</td><td>iPhone: the app must be opened from the Home Screen icon. Check Settings → Notifications → <i>Test</i>, and that Focus mode isn't blocking them.</td></tr>
      <tr><td>Odd distances</td><td>Turn on location, or tap “Done” after each ride: otherwise the app thinks you're still at the entrance.</td></tr>
      <tr><td>A ride is never suggested</td><td>It may be down, closed, too big for the height you set, or a bonus without enough time. Check the note under the route.</td></tr>
      <tr><td>“Data from 10:12 (8 min ago)”</td><td>The network or the wait-time source isn't responding. Tap ↻ at the top, it resumes on its own.</td></tr>
      <tr><td>App out of date</td><td>Settings → <i>Update</i>, or close and reopen the app.</td></tr>
    </table>
  `,
  'help.newsList': `<summary>What's new</summary>
    <p class="muted" id="helpVersion"></p>
    <ul>
      <li><b>Profiles</b>: one nickname per person, everything is saved on the server and comes back after a lost connection or on another phone.</li>
      <li><b>Push notifications</b>, even with the app closed: short queues, rides to do again, reopenings, when to leave for a slot, a show or a meal.</li>
      <li><b>Smarter route</b>: far fewer trips across the park, one step ahead, and a “Less walking / Balanced / Less waiting” setting.</li>
      <li><b>Meal break and shows</b> placed when queues are longest.</li>
      <li><b>Weather</b> built into the route.</li>
      <li><b>In queue</b> with a timer, and measurement of your real wait times.</li>
      <li><b>Ride again if…</b>, <b>minimum height</b>, <b>today's crowds</b> and a calendar of quiet days.</li>
      <li><b>Install</b> to the Home Screen offered right in the app, and this help page.</li>
      <li><b>Day recap</b> to share in the evening.</li>
      <li><b>Group on the map</b>: shared locations and meeting point.</li>
      <li><b>Single rider</b> option, <b>rain alert</b> and <b>expected crowds</b> the day before.</li>
      <li><b>Real map</b> of the park (OpenStreetMap), zoomable.</li>
      <li><b>Quiet and peak times</b> for each ride in its details.</li>
      <li><b>Actual length</b> of each ride and <b>queue times shared</b> between profiles.</li>
      <li><b>Last call</b> before closing.</li>
      <li><b>Languages</b>: French, English and German (Settings).</li>
      <li><b>Map</b> in full screen, button to centre on you and follow, downloadable map for offline use.</li>
      <li><b>Toilets, water, lockers, cash machines, car parks</b> on the map, and where your <b>car</b> is parked.</li>
      <li><b>VirtualLine</b>: one-tap slot saving, button to the official app, notification when a virtual queue opens.</li>
      <li>Ride <b>ratings</b>, posted / real wait gap <b>per ride</b>, <b>“Which day to come?”</b> calendar.</li>
      <li><b>Shared plan</b> by vote, <b>meeting point</b> to split up and meet again.</li>
      <li><b>Bright sunlight mode</b>, <b>battery saver</b>, seasonal shows 🎃, <b>replay a day</b>.</li>
      <li><b>Simple mode</b> by default, with an <b>arrow</b> to the next step, and a 3-question start.</li>
    </ul>
    <p>Updates arrive on their own the next time you open the app.</p>
  `,

  status: {OPERATING: 'Open', DOWN: 'Down', CLOSED: 'Closed', REFURBISHMENT: 'Under refurbishment', UNKNOWN: 'Unknown'},
  statusInline: {OPERATING: 'open', DOWN: 'down', CLOSED: 'closed', REFURBISHMENT: 'under refurbishment', UNKNOWN: 'unknown'},
  vl: {AVAILABLE: 'open', TEMP_FULL: 'full for now', FINISHED: 'finished for today'},
  vlUnknown: 'unknown',
  vlStateUnknown: 'state unknown',
  types: {ATTRACTION: 'Ride', SHOW: 'Show', RESTAURANT: 'Food'},
  basis: {'week-end': 'weekends', semaine: 'weekdays', tous: 'all days'},
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  above: 'above',
  below: 'below',
  me: 'Me',
  yes: 'Yes',
  no: 'No',
  undo: 'Undo',
  walk: '{n} min walk',

  'toast.localProfile': 'Local profile: nothing is saved on the server',
  'toast.hello': 'Hi {name}!',
  'login.title': 'Who are you?',
  'login.intro': 'Your plan and your day are saved under your nickname. On another phone or after losing connection, just pick it from the list.',
  'login.loading': 'Loading profiles…',
  'login.newName': 'New nickname',
  'login.create': 'Create',
  'login.none': 'No profiles yet: create yours.',
  'login.offline': "Server unreachable: profiles aren't available.",
  'login.local': 'Continue on this phone only',
  'login.invalid': '2 to 24 characters: letters, digits, space, dot, hyphen, apostrophe.',
  'login.exists': 'This nickname already exists: pick it from the list.',
  'login.createFail': "Couldn't create the profile: {msg}",

  'wx.now': 'now',
  'wx.at': 'around {time}',
  'wx.storm': 'storm {at}',
  'wx.rain': 'rain {at}',
  'hdr.noHours': 'Opening hours unavailable',
  'hdr.open': 'Open until {close} · {left} left',
  'hdr.opens': 'Opens at {open}',
  'hdr.hotels': ' · hotels {early}',
  'hdr.closed': 'Closed · opens {day} at {open}',
  'hdr.offline': 'Offline · ',
  'hdr.data': 'Data from {time}',
  'hdr.ago': ' ({age} min ago)',
  'hdr.connecting': 'Connecting to data…',
  'hdr.sim': 'Simulated time {time}',
  'user.local': 'Local',

  'reason.again': 'Ride again: the queue is below your threshold ({thr} min).',
  'reason.sr': "Single rider queue: you'll be split up on the ride, but the wait drops to ~{q} min{est}.",
  'reason.srEst': ' (estimate, note the real one in the details)',
  'reason.rain': "Rain expected around {time}: indoor ride, you'll stay dry.",
  'reason.wet': '{t}° around {time}: a good time to get wet.',
  'reason.earlyShort': 'Around {time} the queue is usually short (~{q} min); it then rises to about {later} min on average.',
  'reason.fromEntrance': 'Good first stop from the entrance, estimated wait ~{q} min.',
  'reason.reopened': "It just reopened after a stop: the queue is building up again, now's the time.",
  'reason.shorter': 'Shorter queue than usual at this time ({typ} min normally).',
  'reason.later': 'Later in the day, expect more like ~{later} min: might as well go now.',
  'reason.nearby': 'Right next door: do it now without walking, before moving to another part of the park.',
  'reason.shortOnWay': 'Short queue and on your way: do it while the big rides are busy.',
  'reason.best': 'Best balance of waiting and walking right now.',

  'board.inQueue': 'In the queue · for {d}',
  'board.minLeft': 'min left',
  'board.posted': 'Posted at the entrance: {w} min',
  'board.realEst': 'Real wait est. ~{w} min',
  'board.queueReason': 'Tap “Done” at the exit: the app learns the gap between posted times and how long you really wait.',
  'board.vlSlot': '{vl} slot',
  'board.booked': 'booked',
  'board.slotAt': 'Slot at <b class="num">{time}</b>',
  'board.vlGoNow': 'Leave now to be on time at the {vl} entrance.',
  'board.vlLeaveAt': 'Leave around {time}. Until then, nothing else fits without risking missing the slot.',
  'board.show': 'Show · {n} min walk',
  'board.start': 'start',
  'board.leaveAt': 'Leave around {time}',
  'board.showReason': 'Showtime picked for when the queues on your plan are longest. Arrive 5 min early for a good spot.',
  'board.meal': 'Meal break · {time}',
  'board.mealReason': 'Around {time}, the queues on your plan are at their longest: eating then costs you the least time.',
  'board.next': 'Next stop · wait time',
  'board.atOpening': 'At opening ({time}) · estimate',
  'board.preview': 'Preview {day} · estimate',
  'board.from': ' from {place}',
  'board.entrance': 'the entrance',
  'board.arrive': 'Arrive {time}',
  'board.sr': '🙋 Solo line ~{w} min',
  'board.vlOpen': '{vl} open',
  'board.alts': 'Other good picks',
  goNow: 'Leave now',
  'act.done': 'Done',
  'act.leaveQueue': 'Leave queue',
  'act.details': 'Details',
  'act.seen': 'Seen',
  'act.notToday': 'Not today',
  'act.later': '⏭ Not now',
  'act.restaurant': 'Restaurant',
  'act.inQueue': 'In queue',

  'now.loading': 'Loading rides and wait times…',
  'now.noHours': 'No opening hours available for the coming days.',
  'now.allDoneEyebrow': 'Plan complete',
  'now.allDone': 'Well done, all done',
  'now.allDoneText': ({n}) => `${n} ride${n === 1 ? '' : 's'} so far. The shortest queues around you are in the Rides tab (sort by wait). To ride your favourites again, choose “Ride again if…” in their details.`,
  'now.noneFeasible': 'None of the rides on your plan can be done right now{extra}. Add some bonus rides in the Rides tab.',
  'now.closedOrDown': ' (closed or down)',
  'note.missing': ({list}) => `Won't fit before closing: ${list}. A VirtualLine booking may help.`,
  'note.unavailable': ({list}) => `Unavailable: ${list}.`,
  'note.notOpenLately': 'not open in recent days',
  'note.small': ({h, list}) => `Height limit above ${h} cm: ${list}.`,
  'note.fromCm': 'from {cm} cm',
  'note.parade': '{name} at {time}: many visitors stop to watch it, often a good moment for a long queue.',
  'note.crowd': 'Crowds: {pct}% {dir} a typical day, forecasts take this into account.',
  'note.real': 'Real waits are ~{pct}% of posted times: the schedule takes this into account.',
  'note.history': ({n, basis}) => `Forecasts based on ${n} day${n === 1 ? '' : 's'} of history (${basis}).`,
  'note.generic': 'Generic forecasts: no history recorded on your server yet.',
  'itin.preview': 'Preview · {day}',
  'itin.end': 'ends ~{time}',
  'itin.less': 'Show less',
  'itin.more': 'Show the next {n} stops',
  'tag.show': 'show',
  'tag.meal': 'meal',
  'tag.sr': 'single rider',
  'tag.again': 'ride again',
  'tag.bonus': 'bonus',
  'tag.slot': 'slot',
  'tag.chosen': 'picked',
  'tips.forecast': '<b>Expected crowds:</b> on the {name}s recorded ({n}), the average wait is ~{avg} min, {pct}% {dir} the average of recent days. {verdict}',
  'tips.calm': 'Fairly quiet: make the most of it.',
  'tips.busy': "Fairly busy: VirtualLine as soon as you're in, and eat at the peak.",
  'tips.average': 'An average day.',
  'tips.early': '<b>Be at the entrance before {time}.</b> Early in the day, the big rides have the shortest queues: the route starts with them.',
  'tips.vl': "<b>VirtualLine as soon as you're in the park.</b> Free, in the Europa-Park app with your ticket linked and location on. One slot at a time per ticket: book again right after using it.",
  'tips.notif': '<b>Turn on notifications</b> (Settings): short-queue alerts, when to leave for a slot or a show, even with your phone in your pocket.',

  'vl.slotAt': 'slot at <b class="num">{time}</b>',
  'vl.goNow': 'Leave now.',
  'vl.leaveAt': 'Suggested departure {time} (in {in}).',
  'vl.delete': 'Delete slot',
  'vl.before': "As soon as you're in, book a slot for a ride with a long queue{list}. Then note it here: the route is planned around it.",
  'vl.bookNow': 'Book now: <b>{name}</b>',
  'vl.currentQueue': ' · current queue {w} min',
  'vl.nextSlot': ' · next slot ~{time}',
  'vl.none': 'No ride on your plan has {vl} open right now.',
  'vl.haveSlot': 'I have a slot',
  'vl.howTo': 'How to book',
  'vl.free': 'free virtual queue',

  'banner.goNow': '<b>Leave now</b> for {name}: {what} at {time}.',
  'banner.vlSlot': '{vl} slot',
  'banner.atRide': "You're at <b>{name}</b>. Are you queuing?",
  'banner.finished': 'Finished <b>{name}</b>?',
  'banner.lastCall': '<b>Last call</b>: closing at {time}, queues close at that time.',
  'banner.stillPossible': ' Still possible: {list}.',
  'banner.rain': '<b>Rain expected around {h}:00</b>: the route switches to indoor rides.',
  'banner.offline': 'No network: showing the last data received. Updates resume automatically.',
  'banner.stale': "The wait-time source isn't responding: showing the last reading.",

  'list.hint.plan': 'Full star: ⭐ love it · half star: 👍 if there\'s time. Tap the star to change.',
  'list.hint.rides': 'Add rides to your plan with the star.',
  'list.hint.shows': 'Star: the show goes into your route, at the best showtime.',
  'list.hint.food': 'Restaurants and stands in the park.',
  'list.emptyPlan': 'Your plan is empty: go to “Rides” and tap the stars.',
  'list.empty': 'Nothing to show.',
  'list.reopened': 'just reopened',
  'list.alert': 'alert ≤ {w} min',
  'list.again': 'ride again ≤ {w} min',
  'list.done': 'done',
  'list.seen': 'seen',
  'list.over': 'over',
  'star.must': '⭐ Love it — switch to “if there\'s time”',
  'star.bonus': '👍 If there\'s time — remove from the plan',
  'star.add': 'Add to plan',
  'show.remove': 'Remove from route',
  'show.add': 'Add to route',
  'food.open': 'Open',
  'food.closed': 'Closed',
  'food.closedNow': 'Closed for now',

  'map.group': ' Group: {list}.',
  'map.member': '{nick} ({walk} min, {age} min ago)',
  'map.meet': ' Suggested meeting point (diamond): {name}.',
  'map.alone': ' Nobody else is sharing their location right now.',
  'map.note': 'Purple dot: {where}. Big dots: your plan, with the wait.{group}',
  'map.noteSvg': 'Purple dot: {where}. Big dots: your plan.{group} Schematic map, north at the top.',
  'map.gps': 'your GPS location',
  'map.last': 'last ride done ({name})',
  'map.entrance': 'main entrance (turn on location in Settings)',
  'map.wait': 'Map available once the rides have loaded.',
  'map.aria': 'Schematic map of the rides with their wait times',

  'set.noUser': 'No profile chosen.',
  'set.localUser': 'Local profile: your plan stays on this phone (server unreachable when you chose it).',
  'set.user': 'Signed in as {name}. Every change is saved on the server.',
  'set.noOther': 'No other profile',
  'set.planSummary': ({must, bonus, shows, done}) => `${must} must-do · ${bonus} bonus${shows ? ` · ${shows} show${shows === 1 ? '' : 's'}` : ''} · ${done} done today`,
  'gps.off': 'Off: distances start from the last ride marked “done”, or from the entrance.',
  'gps.wait': 'Finding your location…',
  'gps.on': "On: distances start from where you are. The app also asks if you're queuing when you reach a ride.",
  'gps.out': "On, but you're not in the park: distances start from the entrance.",
  'gps.denied': "Blocked by the browser. Allow location for this site in your phone's settings.",
  'gps.unavailable': 'Unavailable (the page must be served over HTTPS).',
  'gps.enable': 'Use my location',
  'gps.disable': 'Turn off location',
  'set.version': 'Version {v} · updates arrive on their own when you open the app.',
  'data.server': 'via your server (cache + history)',
  'data.direct': 'live from themeparks.wiki (api.php unreachable, no history)',
  'data.none': 'none yet',
  'data.source': 'Source: {src}.',
  'data.history': 'History: {h}',
  'data.days': ({n, basis}) => `${n} day${n === 1 ? '' : 's'} (basis: ${basis})`,
  'data.noHistory': 'none yet. Start the collection cron job (see README): from the day before, forecasts are based on real queues.',
  'data.real': 'Real wait times: {r}',
  'data.realMine': 'you wait ~{pct}% of posted times ({n} measurements).',
  'data.realPooled': '~{pct}% of posted times, from {n} measurements across all profiles. After two measurements of your own, yours count.',
  'data.realHow': 'tap “In queue” when you join a queue, then “Done” at the exit: after two measurements, the route uses real times.',
  'crowd.today': 'Today: {pct}% {dir} a typical day.',
  'crowd.about': "Average ride wait between 11:00 and 16:00, day by day (your server's history).",
  'crowd.notEnough': 'Not enough history yet.',
  'crowd.calmest': 'Quietest days: {list}.',

  'chart.empty': 'No readings for this ride today yet. The chart fills in with each refresh.',
  'chart.aria': 'Wait throughout the day',
  'chart.today': 'today',
  'chart.usual': 'usual (dotted)',
  'best.low': '<b>Lowest around {time}</b> (~{w} min{also})',
  'best.also': ', also {list}',
  'best.peak': ' · peak around {time} (~{w} min).',
  'best.basis': ({n, basis}) => `Based on ${n} day${n === 1 ? '' : 's'} (${basis}).`,
  'sheet.wait': 'Wait',
  'sheet.usual': 'Usually',
  'sheet.walk': 'Walk',
  'sheet.minCm': 'Min. height with an adult: {cm} cm (guide only)',
  'sheet.tooSmall': ' · <b>too small for your group</b>',
  'sheet.indoor': 'Indoor',
  'sheet.wet': "You'll get wet",
  'sheet.vl': '{vl}: <b>{state}</b>',
  'sheet.vlOffer': ' · slot offered around {time}',
  'sheet.inPlan': 'In my plan',
  'sheet.plan': 'Plan',
  'plan.must': '⭐ Love it',
  'plan.bonus': '👍 If there\'s time',
  'sheet.redone': 'Done again ({n}×)',
  'sheet.markDone': 'Mark as done',
  'sheet.inQueue': "I'm in the queue",
  'sheet.undone': 'Undo “done”',
  'sheet.alert': 'Alert me when the wait drops below…',
  'sheet.noAlert': 'No alert',
  'sheet.srIn': 'Single rider wait at the entrance (min)',
  'sheet.srPh': 'Estimate: ~{w} min',
  'sheet.again': 'Ride again if the wait drops below…',
  'sheet.once': 'Once is enough',
  'sheet.showPlanned': ' · planned in your route at <b>{time}</b>',
  'sheet.noShow': 'No showtimes announced today.',
  'sheet.showRemove': 'Remove from my route',
  'sheet.showAdd': 'Add to my route',
  'slot.title': 'I booked a {vl} slot',
  'slot.ride': 'Ride',
  'slot.start': 'Slot start',
  'slot.save': 'Save slot',

  'toast.preset': '{n} rides added to your plan',
  'toast.done': '{name}: {what}',
  'rebook': '<b>Book another {vl} slot</b> in {app}{pick}. Then note it with “I have a slot”.',
  'rebook.app': "the park's official app",
  'rebook.pick': ': <b>{name}</b> is the best bet{w}',
  'rebook.queue': ' (queue {w} min)',
  'toast.inQueue': 'In the queue: {name}',
  'toast.cleared': 'Plan cleared',
  'toast.showAdded': 'Show added: the route picks the best showtime',
  'toast.showRemoved': 'Show removed from the route',
  'toast.notToday': '{name}: not today',
  'toast.skip': '{name}: back to it in 30 min at the earliest',
  'toast.leftQueue': 'Left the queue',
  'toast.mealDone': 'Meal break: done',
  'toast.mealLater': 'Meal pushed back by at least 30 min',
  'toast.slotTime': 'Enter the slot start time',
  'toast.slotSaved': '{vl} slot saved: {name} at {time}',
  'toast.slotDeleted': 'Slot deleted',
  'toast.checking': 'Checking for updates…',
  'toast.pushSent': 'Notification sent',
  'toast.pushNone': 'No phone subscribed for this profile',
  'toast.offline': 'Server unreachable',
  'toast.copied': "Copied {name}'s plan",
  'toast.copyFail': "Couldn't read this profile",
  'reset.confirm': 'Confirm reset',
  'toast.reset': 'Day reset',
  'toast.alert': 'Alert: {name} below {w} min',
  'toast.alertOff': 'Alert removed',
  'toast.again': 'Ride again as soon as the queue drops below {w} min',
  'toast.mealWindow': "Window shorter than the meal: it'll be placed as early as possible",
  'toast.srReset': 'Single rider estimate restored',
  'toast.sr': 'Single rider: {w} min, used for 45 min',
  'alert.againPrefix': 'Ride again · ',
  'alert.short': 'Short queue',

  'push.needProfile': 'Choose a profile saved on the server to get notifications',
  'push.ios': 'On iPhone: first add the page to your Home Screen, then open it from the icon',
  'push.unsupported': "Push notifications aren't supported by this browser",
  'push.refused': "Notifications denied: allow them in your phone's settings",
  'push.enabled': 'Notifications turned on for this phone',
  'push.fail': "Couldn't turn them on: {msg}",
  'push.on': 'On for this phone, even with the page closed: queues below your thresholds, rides to do again, reopenings, when to leave for a VirtualLine slot, a show or a meal.',
  'push.blocked': "Blocked in the browser: allow them in your phone's settings.",
  'push.iosHint': 'On iPhone (iOS 16.4 or later), add the page to your Home Screen, then open it from the icon to turn them on.',
  'push.noPush': 'Push not supported here: vibration alerts only, while the page is open.',
  'push.pitch': 'Get alerts with your phone in your pocket: short queues, reopenings, when to leave for a slot or a show.',
  'push.subs': ' {n} phones subscribed for this profile.',

  'recap.gained': "You waited about <b>{d} less</b> than the day's average wait on these rides.",
  'recap.best': 'Best move: <b>{name}</b> at {w} min ({avg} on average).',
  'recap.fav': 'Favourite: <b>{name}</b> ×{n}.',
  'recap.shows': ({n}) => `${n} show${n === 1 ? '' : 's'} seen.`,
  'recap.eyebrow': 'Your day · {from} – {to}',
  'recap.rides': 'Rides',
  'recap.queues': 'In queues',
  'recap.share': 'Share',
  'recap.title': 'My day recap',
  'recap.empty': 'Nothing recorded today: tap “Done” at the exit of each ride and the recap fills itself in.',
  'share.text': '{park}, {day}: {rides} rides ({distinct} different), {queue} in queues, ≈ {km} km on foot',
  'share.gained': ', {d} of waiting saved',
  'share.fav': '. Favourite: {name} ×{n}',
  'share.title': 'My day at {park}',
  'toast.recapCopied': 'Recap copied',

  'install.done': 'EP Live is installed: open it from your Home Screen',
  'install.prompt': "Add EP Live to your Home Screen: it opens full screen, keeps working when the park's network is overloaded, and can send you notifications.",
  'install.btn': 'Install the app',
  'install.ios': 'In Safari, tap <b>Share</b> (the square with an up arrow), then <b>Add to Home Screen</b>. Then open EP Live from the icon: you need to for notifications (iOS 16.4 or later).',
  'install.menu': 'In the browser menu (⋮), choose <b>Install app</b> or <b>Add to Home screen</b>.',
  'install.h': 'App',
  'install.installed': 'Installed on this phone.',
  'boot.fail': "Couldn't load the park configuration (parks.json). Check your connection, then reload the page.",
  'boot.newVersion': 'New version of the app.',
  'boot.seeNews': "See what's new",
};

I18N.de = {
  locale: 'de-DE',
  // Ajouts : mode simple, flèche, démarrage en 3 questions
  'mode.title': 'Ansicht',
  'mode.simple': '😊 Einfach',
  'mode.expert': '🤓 Ausführlich',
  'mode.hint': 'Einfach: immer nur eine Sache, groß angezeigt. Ausführlich: Route, Details und alle Einstellungen.',
  'adv.title': 'Weitere Einstellungen',
  's.hello': 'Hallo {name}!',
  's.start': 'Drei Fragen und los geht\'s.',
  's.go': 'Los geht\'s',
  's.all': 'Ganzen Tag anzeigen',
  's.less': 'Zurück zum Wesentlichen',
  's.today': 'Heute',
  's.beAt': 'Um {time} am Eingang sein',
  's.startWith': 'Wir beginnen mit: {list}',
  's.allDone': 'Alles geschafft, super!',
  's.shortest': 'Gerade die kürzesten Schlangen:',
  's.inQueue': 'Du stehst an bei',
  's.left': 'noch ~{n} min',
  's.finished': '✅ Fertig!',
  's.seen': '✅ Gesehen!',
  's.leaveQueue': '🚪 Ich verlasse die Schlange',
  's.vl': 'Dein {vl}-Zeitfenster',
  's.at': 'um {time}',
  's.leaveAt': 'losgehen um {time}',
  's.show': 'Show',
  's.meal': 'Essenszeit!',
  's.goTo': 'Geh zu',
  's.queue': '{n} min Wartezeit',
  's.imHere': '🙋 Bin da, stehe an',
  's.then': 'Danach: {list}',
  'c.enable': '📍 Standort einschalten, um den Pfeil zu sehen',
  'c.here': '🎯 Du bist da!',
  'c.north': 'Norden oben',
  'c.turn': '🧭 Pfeil mit dem Handy drehen',
  'c.denied': 'Kompass abgelehnt: Der Pfeil bleibt nach Norden ausgerichtet.',
  'w.step': 'Schritt {n} von 3',
  'w.like': 'Du magst lieber…',
  'w.thrills': 'Action!',
  'w.calm': 'Gemütlich',
  'w.mix': 'Von allem etwas',
  'w.kids': 'Sind Kinder dabei?',
  'w.noKids': 'Nein, nur Große',
  'w.kidCm': 'Ja, das kleinste ist {cm} cm',
  'w.howTitle': 'Ganz einfach',
  'w.how1': '👉 Geh dahin, wo die App sagt, folge dem Pfeil',
  'w.how2': '🙋 In der Schlange auf „Bin da“ tippen',
  'w.how3': '✅ Danach auf „Fertig!“ tippen: Das Nächste kommt von selbst',
  'w.gps': '📍 Standort einschalten',
  'w.notif': '🔔 Benachrichtigungen einschalten',
  'w.go': 'Los geht\'s!',
  // Rejouer : colonne incontournables
  'replay.musts': 'Muss ({n})',
  // Ajouts : rendez-vous, programme commun, plein soleil, batterie, rejouer une journée
  'meet.title': 'Treffpunkt',
  'meet.board': 'Treffpunkt · {place}',
  'meet.at': 'Treffen',
  'meet.reason': 'Die Gruppe trifft sich hier: Die Route sorgt dafür, dass du pünktlich bist.',
  'meet.here': 'Wir haben uns getroffen',
  'meet.share': 'Teilen',
  'meet.cancel': 'Absagen',
  'meet.hint': 'Zum Aufteilen und Wiedertreffen: Jede Teilgruppe behält ihr Profil, jede Route endet pünktlich hier. Teile den Treffpunkt mit den anderen.',
  'meet.time': 'Uhrzeit',
  'meet.set': 'Hier treffen',
  'meet.update': 'Uhrzeit ändern',
  'meet.saved': 'Treffpunkt: {place} um {time}',
  'meet.doneToast': 'Gruppe wieder vereint',
  'meet.cancelled': 'Treffpunkt abgesagt',
  'meet.shareText': 'Treffpunkt {place} um {time}:',
  'meet.copied': 'Link zum Treffpunkt kopiert',
  'vote.title': 'Gemeinsamer Plan',
  'vote.hint': 'Jeder markiert Attraktionen in seinem Profil, dann führt die App zusammen: Muss, wenn die Hälfte der Gruppe es will, Bonus, wenn mindestens eine Person es will.',
  'vote.open': 'Pläne zusammenführen',
  'vote.pick': 'Wähle die Profile aus:',
  'vote.apply': 'Plan von {name} ersetzen',
  'vote.count': '{n} Attraktionen',
  'vote.preview': 'Ergebnis mit {n} Profilen: {must} Muss, {bonus} Bonus, {shows} Shows.',
  'vote.none': 'Wähle mindestens ein Profil.',
  'vote.done': 'Gemeinsamer Plan aus {n} Profilen übernommen',
  'vote.fail': 'Profile nicht verfügbar: Server nicht erreichbar.',
  'sun.title': 'Sonnenmodus',
  'sun.hint': 'Maximaler Kontrast und größere Schrift, um den Bildschirm draußen zu lesen',
  'eco.title': 'Akku sparen',
  'eco.hint': 'Ungenaueres GPS, Aktualisierung alle 5 statt 2 Minuten',
  'eco.suggest': '<b>Akku schwach</b>: Akku-Sparmodus einschalten?',
  'eco.on': 'Akku-Sparmodus an',
  'replay.title': 'Einen Tag nachspielen',
  'replay.hint': 'Simuliert einen vom Server aufgezeichneten Tag mit deinem Plan: die Route der App gegen zwei einfache Strategien, mit den echten Schlangen dieses Tages.',
  'replay.day': 'Tag',
  'replay.run': 'Nachspielen',
  'replay.noDays': 'Kein aufgezeichneter Tag',
  'replay.running': 'Simulation läuft…',
  'replay.fail': 'Nicht genug Daten für diesen Tag.',
  'replay.noPlan': 'Dein Plan ist leer: Füge zuerst Attraktionen hinzu.',
  'replay.app': 'Route der App',
  'replay.order': 'Reihenfolge des Plans',
  'replay.shortest': 'Kürzeste Schlange',
  'replay.rides': 'Fahrten',
  'replay.queue': 'Anstehen',
  'replay.walk': 'Gehen',
  'replay.summary': '{day}, mit den {n} Attraktionen deines Plans und den echten Schlangen dieses Tages.',
  'replay.more': 'Die App schafft {n} Muss-Attraktion(en) mehr.',
  // Ajouts : VirtualLine, notes, carte, points pratiques, voiture, prévision
  'vl.quick': '{time} gebucht',
  'vl.openApp': 'App öffnen',
  'rate.ask': 'Deine Bewertung für <b>{name}</b>?',
  'rate.saved': 'Bewertung gespeichert: {n}/5',
  'rate.again': 'Bewertet mit {n}/5 · zu „Nochmal fahren“ unter {thr} min hinzugefügt',
  'rate.mine': 'Deine Bewertung',
  'rate.group': 'Gruppe: ★ {avg} ({n})',
  'recap.top': 'Eure Favoriten: {list}.',
  'map.full': 'Vollbild',
  'map.exit': 'Vollbild beenden',
  'map.locate': 'Auf mich zentrieren und folgen',
  'map.park': 'Ganzer Park',
  'map.waitGps': 'Standort wird gesucht…',
  'map.outPark': 'Du bist gerade nicht im Park.',
  'poi.nearestBtn': 'Nächste Toiletten',
  'poi.toilets': 'Toiletten',
  'poi.water': 'Trinkwasser',
  'poi.lockers': 'Schließfächer',
  'poi.atm': 'Geldautomaten',
  'poi.parking': 'Parkplätze',
  'poi.firstaid': 'Erste Hilfe',
  'poi.none': 'Keine „{type}“ in diesem Park bekannt.',
  'poi.nearest': '{type}: am nächsten in {min} min zu Fuß',
  'car.title': 'Mein Auto',
  'car.myPos': 'gespeicherter Platz',
  'car.walk': '{min} min zu Fuß',
  'car.route': 'Route',
  'car.onMap': 'Auf der Karte',
  'car.clear': 'Platz vergessen',
  'car.cleared': 'Parkplatz vergessen',
  'car.hint': 'Speichere deinen Platz bei der Ankunft: Abends führt dich die App zurück. Er wird mit deinem Profil geteilt.',
  'car.here': 'Hier (mein aktueller Standort)',
  'car.noGps': 'Aktiviere deinen Standort für die genaue Stelle oder wähle unten den Parkplatz.',
  'car.pick': 'Oder wähle den Parkplatz',
  'car.saved': 'Auto: {name}',
  'car.none': 'Parkplatz nicht gespeichert.',
  'car.save': 'Speichern',
  'car.back': 'Zurück zum Auto',
  'map.dl': 'Karte herunterladen (≈ {mb} MB)',
  'map.dlHint': 'Am Vortag im WLAN erledigen: Die Parkkarte bleibt verfügbar, wenn das Mobilnetz überlastet ist.',
  'map.dlProgress': 'Karte wird heruntergeladen… {pct} %',
  'map.dlDone': 'Karte auf diesem Handy gespeichert ({n} Kacheln)',
  'map.dlDoneAt': 'Karte am {date} heruntergeladen: Sie funktioniert offline.',
  'map.dlFail': 'Download unterbrochen: Versuche es im WLAN erneut.',
  'fc.title': 'Welcher Tag ist am besten?',
  'fc.school': 'Ferien {list}',
  'fc.public': 'Feiertag {list}',
  'fc.hint': 'Erwarteter Andrang an den nächsten Öffnungstagen, nach {src} und den Schulferien und Feiertagen der Herkunftsregionen der Besucher.',
  'fc.srcHistory': 'deinem Verlauf',
  'fc.srcGeneric': 'dem Wochentag',
  'fc.none': 'Keine Prognose: Öffnungszeiten unbekannt.',
  'fc.tip': '<b>Erwarteter Andrang</b> an diesem Tag: {level}{why}.',
  'fc.levels': ['Ruhig', 'Mittel', 'Voll', 'Sehr voll'],
  loading: 'Wird geladen…',
  help: 'Hilfe',
  profile: 'Profil',
  switchUser: 'Profil wechseln',
  refresh: 'Wartezeiten aktualisieren',
  close: 'Schließen',
  'onb.title': 'Dein Programm',
  'onb.text': 'Wähl eine Vorlage, danach kannst du im Tab Attraktionen jede Attraktion hinzufügen oder entfernen.',
  'preset.thrills': 'Nervenkitzel',
  'preset.family': 'Mit Familie',
  'onb.self': 'Ich wähle selbst',
  'itin.title': 'Empfohlene Route',
  'shows.title': 'Nächste Shows',
  'shows.next2h': 'Nächste 2 Stunden',
  'tips.title': 'Gut starten',
  filter: 'Filtern',
  'filter.plan': 'Mein Plan',
  'filter.rides': 'Attraktionen',
  'filter.shows': 'Shows',
  'filter.food': 'Essen',
  search: 'Suchen',
  'search.ph': 'Suchen (z. B. Voltron)',
  sort: 'Sortieren',
  'sort.wait': 'Wartezeit',
  'sort.walk': 'Entfernung',
  'legend.you': 'du',
  'legend.group': 'Gruppe',
  'legend.closed': 'geschlossen',
  'set.copyFrom': 'Programm kopieren von',
  'set.copy': 'Kopieren',
  'set.plan': 'Mein Programm',
  'set.clear': 'Leeren',
  meal: 'Essenspause',
  'set.mealHint': 'Eingeplant, wenn die Schlangen am längsten sind, nahe einem geöffneten Restaurant',
  'set.mealDur': 'Dauer des Essens',
  'set.mealFrom': 'Nicht vor',
  'set.mealTo': 'Fertig bis',
  'set.route': 'Priorität der Route',
  'route.walk': 'Weniger laufen',
  'route.balanced': 'Ausgewogen',
  'route.wait': 'Weniger warten',
  'set.sr': '🙋 Single-Rider-Schlange OK',
  'set.srHint': 'Eigene Schlange bei Blue Fire, Voltron, CanCan, Arthur (vor Ort prüfen): oft viel kürzer, aber ihr sitzt getrennt',
  'set.pace': 'Lauftempo',
  'pace.kids': 'Mit Kindern',
  'pace.normal': 'Normal',
  'pace.fast': 'Schnell',
  'set.height': 'Größe des Kleinsten in der Gruppe (cm)',
  'set.noLimit': 'Keine Grenze',
  'set.heightHint': 'Mindestgrößen in Begleitung, nur Richtwerte: Prüf immer das Schild am Eingang.',
  'set.hotel': 'Ich übernachte in einem Parkhotel',
  'set.hotelHint': 'Früherer Einlass ab Hotelöffnung (oft 8:30, nur einige Attraktionen)',
  'set.position': 'Mein Standort',
  'set.share': 'Standort mit der Gruppe teilen',
  'set.shareHint': 'Sichtbar auf der Karte aller, die die App nutzen, bis 20 min nach deinem letzten Standort',
  'set.nick': 'Mein Vorname auf der Karte',
  'set.notif': 'Benachrichtigungen',
  'set.pushOn': 'Benachrichtigungen aktivieren',
  'set.pushTest': 'Testen',
  'set.crowd': 'Andrang',
  'set.data': 'Daten',
  'set.help': 'Hilfe und Updates',
  'set.update': 'Aktualisieren',
  'set.newDay': 'Neuer Tag',
  'set.newDayHint': 'Setzt erledigte Attraktionen, VirtualLine-Zeitfenster, das Essen und gesendete Hinweise zurück. Dein Programm bleibt erhalten.',
  reset: 'Zurücksetzen',
  'set.credits': 'Wartezeiten: wie vom Park angegeben, über themeparks.wiki. Wetter: Open-Meteo. Inoffizielle Seite, keine Verbindung zum Europa-Park.',
  'tab.now': 'Jetzt',
  'tab.list': 'Attraktionen',
  'tab.map': 'Karte',
  'tab.settings': 'Einstellungen',
  'help.title': 'So funktioniert’s',
  'help.news': 'Neuigkeiten',
  'help.intro': 'EP Live sagt dir jederzeit, welche Attraktion du jetzt machen solltest, und plant den Rest deines Tages so, dass du möglichst wenig wartest und läufst.',
  'help.version': 'Version {v}',
  'help.simple': `<summary>Einfacher Modus</summary>
    <p>Standardmäßig zeigt der Jetzt-Bildschirm nur eines: <b>wohin du jetzt gehst</b>, groß, mit drei Knöpfen:</p>
    <ul>
      <li><b>🙋 Bin da</b>: Du stehst an (ein Timer startet);</li>
      <li><b>✅ Fertig!</b>: Danach kommt der nächste Schritt von selbst;</li>
      <li><b>⏭ Nicht jetzt</b>: Später kommen wir darauf zurück.</li>
    </ul>
    <p><b>Der Pfeil</b> zeigt Richtung (Luftlinie) und Entfernung zum nächsten Schritt. Mit eingeschaltetem Standort dreht er sich mit dem Handy; auf dem iPhone einmal „Pfeil mit dem Handy drehen“ antippen, um es zu erlauben. „🎯 Du bist da!“, wenn du angekommen bist.</p>
    <p><b>Ganzen Tag anzeigen</b> klappt die ganze Route auf. Einstellungen → <b>Ansicht</b>: 😊 Einfach oder 🤓 Ausführlich (alle Details, weitere Einstellungen offen).</p>
  `,
  'help.start': `<summary>In 4 Schritten loslegen</summary>
    <ol>
      <li><b>Installier die App</b> auf dem Home-Bildschirm (siehe „App installieren“).</li>
      <li><b>Wähl dein Profil</b>: dein Nickname, ohne Passwort. Alles wird auf dem Server gespeichert.</li>
      <li><b>Stell dein Programm zusammen</b>: <i>Nervenkitzel</i> oder <i>Mit Familie</i>, dann mit den Sternen unter <b>Attraktionen</b> anpassen. Voller Stern = Pflicht, halber Stern = Bonus, wenn Zeit bleibt.</li>
      <li><b>In den Einstellungen</b>: Standort und Benachrichtigungen aktivieren, Essenspause und Priorität der Route einstellen.</li>
    </ol>
  `,
  'help.install': `<summary>App installieren</summary>
    <ul>
      <li><b>Android</b>: Button <b>App installieren</b> im Tab Jetzt oder in den Einstellungen, sonst Menü ⋮ → <i>App installieren</i>.</li>
      <li><b>iPhone</b>: In <b>Safari</b> auf <b>Teilen</b> tippen (Quadrat mit Pfeil) → <b>Zum Home-Bildschirm</b>. Öffne die App danach über das Symbol: nötig für Benachrichtigungen (ab iOS 16.4).</li>
    </ul>
    <p>Installiert öffnet sie sich im Vollbild und funktioniert auch, wenn das Netz im Park überlastet ist.</p>
  `,
  'help.now': `<summary>Der Bildschirm Jetzt</summary>
    <p>Die große Tafel zeigt den <b>nächsten Halt</b>: die angezeigte Wartezeit, die Laufzeit und warum jetzt der richtige Moment ist. Darunter: drei weitere gute Optionen, dann die Route für den Rest des Tages mit Ankunftszeiten.</p>
    <table>
      <tr><td>In der Schlange</td><td>Du stellst dich an: Ein Timer startet, die Route geht ab dem Ende dieser Attraktion weiter.</td></tr>
      <tr><td>Fertig</td><td>Am Ausgang: Die Route startet von hier neu. Warst du „in der Schlange“, wird deine echte Wartezeit gemessen.</td></tr>
      <tr><td>Später</td><td>Stellt die Attraktion 30 Minuten zurück.</td></tr>
      <tr><td>Name</td><td>Öffnet die Details: Tageskurve, übliche Wartezeit, <b>ruhige Zeiten und Spitzenzeiten</b>, Hinweise, virtuelle Warteschlange.</td></tr>
    </table>
    <p>Vertippt? Die Meldung unten bietet immer <b>Rückgängig</b> an.</p>
  `,
  'help.colors': `<summary>Die Farben der Wartezeiten</summary>
    <ul>
      <li><b style="color:var(--w-low)">Grün</b>: 10 min oder weniger</li>
      <li><b style="color:var(--w-mid)">Gelb</b>: 15 bis 25 min</li>
      <li><b style="color:var(--w-high)">Orange</b>: 30 bis 45 min</li>
      <li><b style="color:var(--w-peak)">Rot</b>: 50 min und mehr</li>
      <li><b style="color:var(--w-off)">Grau</b>: geschlossen oder Störung</li>
    </ul>
    <p>In der Liste zeigt ↗ / ↘, dass die Schlange in den letzten 30 Minuten um mindestens 10 min gestiegen oder gesunken ist.</p>
  `,
  'help.route': `<summary>Wie die Route gewählt wird</summary>
    <ul>
      <li><b>Gewinn</b>: Die App vergleicht die erwartete Wartezeit bei deiner Ankunft mit der durchschnittlichen Wartezeit später am Tag. Eine große Attraktion, die gerade leer ist, rückt nach vorne.</li>
      <li><b>Prognosen</b>: Sie startet bei der aktuellen Wartezeit und geht in das übliche Profil der Attraktion über, berechnet aus dem Verlauf des Servers und angepasst an den heutigen Andrang.</li>
      <li><b>Laufen</b>: Jede Minute Fußweg kostet (über 8 min noch mehr). Sie schaut auch auf die nächste Attraktion, um Hin und Her quer durch den Park zu vermeiden. <i>Einstellungen → Priorität</i>: weniger laufen, ausgewogen oder weniger warten.</li>
      <li><b>Wetter</b>: Bei Regen rücken überdachte Attraktionen nach vorne. Bei Gewitter oder starkem Wind rücken die im Freien nach hinten. Wasserbahnen kommen eher zu den wärmsten Stunden.</li>
      <li><b>Bonus</b>: nur, wenn genug Zeit für alle Pflicht-Attraktionen bleibt.</li>
      <li><b>Echte Zeiten</b>: Jede Messung „In der Schlange“ → „Fertig“ lernt den Unterschied zwischen angezeigter und echter Wartezeit (oft weniger). Die Messungen aller Profile auf dem Server helfen allen; sobald du zwei eigene hast, zählen deine.</li>
      <li><b>Dauer der Attraktionen</b>: Jede Attraktion hat ihre eigene Dauer (Achterbahn ~4 min, Dark Ride ~10 min), für genaue Ankunftszeiten.</li>
    </ul>
    <p>Die Berechnung läuft alle 2 Minuten und bei jedem Tippen auf einen Button neu.</p>
  `,
  'help.vl': `<summary>VirtualLine (kostenlose virtuelle Warteschlange)</summary>
    <ol>
      <li>Die VirtualLine-Karte zeigt die Attraktion, bei der ein Zeitfenster am meisten bringt.</li>
      <li>Buch in der <b>offiziellen Europa-Park-App</b> (Ticket verknüpft, Standort an, nur ein Zeitfenster gleichzeitig).</li>
      <li>Trag es mit <b>Ich habe ein Zeitfenster</b> ein: Die Route plant drumherum und sagt dir, wann du losmusst.</li>
      <li>Nach <b>Fertig</b> sagt dir die App, was du gleich als Nächstes buchen solltest.</li>
    </ol>
    <p>Ist das angebotene Zeitfenster bekannt, speichert ein Knopf <b>15:20 gebucht</b> es mit einem Tipp. <b>App öffnen</b> startet die offizielle App (auf dem iPhone: ihre App-Store-Seite mit „Öffnen“). Mit Benachrichtigungen erfährst du, wenn sich eine virtuelle Schlange für eine Attraktion deines Plans öffnet, falls du noch kein Zeitfenster hast. Gebucht wird immer in der offiziellen App: Einen öffentlichen Zugang gibt es nicht.</p>
  `,
  'help.fixed': `<summary>Essen und Shows</summary>
    <p><b>Essenspause</b> (Einstellungen): Die App legt sie in dein Zeitfenster, wenn die Schlangen am längsten sind, und zeigt das nächste geöffnete Restaurant. <i>Später</i> verschiebt sie um 30 min, <i>Fertig</i> entfernt sie.</p>
    <p><b>Shows</b>: Gib einer Show einen Stern (Attraktionen → Shows). Die App wählt die Vorstellung, die dich am wenigsten Wartezeit kostet, und sagt dir, wann du losmusst (5 min vorher).</p>
  `,
  'help.notif': `<summary>Benachrichtigungen</summary>
    <p>Einmal in den Einstellungen aktiviert, kommen sie auch bei geschlossener App:</p>
    <ul>
      <li><b>Kurze Schlange</b>: unter der Schwelle aus den Details („Benachrichtigen bei…“).</li>
      <li><b>Nochmal</b>: Eine erledigte Attraktion fällt wieder unter ihre Schwelle („Nochmal bei…“).</li>
      <li><b>Wieder offen</b>: Eine Attraktion deines Programms öffnet nach einer Störung wieder.</li>
      <li><b>Jetzt losgehen</b>: zu einem VirtualLine-Zeitfenster oder einer Show, Fußweg eingerechnet.</li>
      <li><b>Essenspause</b>: der richtige Moment zum Essen.</li>
      <li><b>Regen</b>: Regen in der nächsten Stunde erwartet, die Route wechselt zu überdachten Attraktionen.</li>
      <li><b>Letzter Aufruf</b>: 45 min vor Parkschluss die letzten Attraktionen in deiner Nähe, die noch machbar sind.</li>
    </ul>
    <p>Solange du „in der Schlange“ stehst, sind die Hinweise zu kurzen Schlangen pausiert.</p>
  `,
  'help.map': `<summary>Die Karte</summary>
    <p>OpenStreetMap-Hintergrund: Wege, Gebäude und Seen im Park. Zum Zoomen mit zwei Fingern ziehen. Große Punkte sind dein Programm, mit Live-Wartezeit und Farbe; kleine Punkte die anderen Attraktionen. Die gestrichelte lila Linie führt zum nächsten Halt. Tipp auf einen Punkt, um die Details zu öffnen.</p>
    <p>Bereits angezeigte Bereiche bleiben gespeichert: Die Karte öffnet sich auch bei überlastetem Netz. Ganz ohne gespeicherte Daten zeigt die App einen vereinfachten Plan.</p>
    <p><b>Kartentasten</b>: ⤢ Vollbild; ◎ zentriert auf dich und folgt dir beim Gehen (Verschieben der Karte beendet das Folgen); 🗺 zurück zum ganzen Park; 🚻 zeigt die nächsten Toiletten; 🚗 dein Auto.</p>
    <p><b>Praktische Punkte</b>: Über der Karte Toiletten, Trinkwasser, Schließfächer, Geldautomaten und Parkplätze ein- oder ausblenden (OpenStreetMap, manchmal unvollständig).</p>
    <p><b>Offline</b>: Unter der Karte speichert „Karte herunterladen“ den ganzen Park auf dem Handy. Am Vortag im WLAN erledigen.</p>
    <p><b>Dein Auto</b>: Speichere bei der Ankunft deinen Platz (GPS-Position oder Parkplatzname). Abends zeigt die App Gehzeit und Route zurück, und alle im Profil sehen ihn.</p>
  `,
  'help.gps': `<summary>GPS-Standort</summary>
    <p>Mit aktiviertem Standort zählen die Laufzeiten ab deinem Standort. Kommst du bei einer Attraktion deines Programms an, fragt die App „Stehst du an?“, und „Fertig?“, wenn du dich entfernst. Ohne GPS zählen die Entfernungen ab der zuletzt erledigten Attraktion oder ab dem Eingang.</p>
  `,
  'help.group': `<summary>In der Gruppe</summary>
    <ul>
      <li><b>Ein gemeinsames Profil</b> (z. B. „Gruppe“), das alle wählen: Ein „Fertig“ auf einem Handy kommt spätestens nach 2 Minuten auf den anderen an, und alle bekommen die Benachrichtigungen.</li>
      <li><b>Ein Profil pro Person</b>: Einstellungen → „Programm kopieren von…“ übernimmt das Programm von jemand anderem.</li>
      <li><b>Sich wiederfinden</b>: Einstellungen → „Standort mit der Gruppe teilen“, mit deinem Vornamen. Auf der <b>Karte</b> erscheinen alle als voller Punkt mit Vornamen und Laufzeit bis zu ihnen. Die Raute markiert den empfohlenen <b>Treffpunkt</b>: die Attraktion, die der Mitte der Gruppe am nächsten ist.</li>
    </ul>
    <p class="muted">Ein geteilter Standort ist für alle sichtbar, die die App auf diesem Server nutzen, und verschwindet 20 min nach dem letzten Standort. Deaktiviere das Teilen, um ihn sofort zu löschen.</p>
    <p><b>Gemeinsamer Plan</b>: Jeder markiert Attraktionen in seinem Profil, dann Einstellungen → „Pläne zusammenführen“. Muss, wenn mindestens die Hälfte der Gruppe es will, Bonus, wenn jemand es will; alle gewählten Shows bleiben.</p>
    <p><b>Aufteilen und wiedertreffen</b>: Im Steckbrief einer Attraktion „Hier treffen“ zu einer Uhrzeit. Jede Route endet pünktlich dort, mit einer Benachrichtigung zum Losgehen. Jede Teilgruppe nutzt ihr eigenes Profil; „Teilen“ schickt den Treffpunkt per Link an die anderen.</p>
  `,
  'help.sr': `<summary>Single Rider</summary>
    <p>Manche Attraktionen haben eine „Single Rider“-Schlange, um leere Plätze zu füllen: viel kürzer, aber die Gruppe sitzt getrennt. Gemeldet bei Blue Fire, Voltron, CanCan und Arthur, <b>vor Ort prüfen</b> (sie kann an manchen Tagen geschlossen sein).</p>
    <p>Aktivier sie unter <b>Einstellungen → Single Rider ist okay</b>. Die App rechnet dann mit der Hälfte der normalen Wartezeit. Sobald du am Eingang die echte Single-Rider-Wartezeit siehst, trag sie in den Details der Attraktion ein: Sie gilt dann 45 min.</p>
  `,
  'help.recap': `<summary>Tagesrückblick</summary>
    <p>Jedes „Fertig“ wird notiert. Am Abend zeigt der Tab Jetzt deinen Tag: Anzahl der Fahrten, Zeit in Schlangen, Fußweg (zwischen den Attraktionen geschätzt), gesparte Wartezeit gegenüber dem Tagesschnitt, bester Treffer und Lieblingsattraktion. Button <b>Teilen</b>, um ihn an die Gruppe zu schicken. Jederzeit: Einstellungen → <i>Mein Tagesrückblick</i>.</p>
    <p><b>Bewertungen</b>: Nach jedem „Erledigt“ fragt die App nach 1 bis 5 Sternen (auch im Steckbrief). 4 oder 5 Sterne setzen die Attraktion auf „Nochmal fahren“, falls nichts eingestellt ist. Die Bilanz zeigt eure Favoriten, die Liste die Durchschnittsbewertung aller Profile.</p>
  `,
  'help.crowd': `<summary>Andrang</summary>
    <p>Tagsüber vergleicht die App die aktuellen Schlangen mit den üblichen zur gleichen Uhrzeit und berücksichtigt das („Andrang: 20 % über“). Am Vortag zeigt die Vorschau den üblichen Andrang an diesem Wochentag, nach den vom Server erfassten Tagen. Einstellungen → Andrang zeigt die letzten Tage und die ruhigsten Tage.</p>
    <p><b>Welcher Tag ist am besten?</b> (Einstellungen): erwarteter Andrang an den nächsten Öffnungstagen, von ruhig bis sehr voll, nach deinem Verlauf (oder dem Wochentag) und den Schulferien und Feiertagen der Herkunftsregionen (Baden-Württemberg, Elsass, Schweiz… für den Europa-Park).</p>
    <p><b>Einen Tag nachspielen</b> (Einstellungen): Die App spielt einen aufgezeichneten Tag mit deinem Plan und den echten Schlangen nach und vergleicht ihre Route mit „Reihenfolge des Plans“ und „Kürzeste Schlange“.</p>
  `,
  'help.sync': `<summary>Profil, Abbruch, Handywechsel</summary>
    <p>Jede Änderung geht eine Sekunde später an den Server. Geht dein Handy aus oder wechselst du es, öffne die App und wähl deinen Nickname: Du machst genau da weiter, wo du warst (Programm, Erledigtes, Zeitfenster, aktuelle Schlange). Mit dem Button mit deinem Nickname oben wechselst du das Profil.</p>
    <p>Ohne Netz zeigt die App die zuletzt empfangenen Daten (orangefarbenes Banner) und schickt deine Änderungen, sobald das Netz zurück ist.</p>
  `,
  'help.tips': `<summary>Gut zu wissen</summary>
    <ul>
      <li><b>Akku</b>: GPS und mobile Daten den ganzen Tag leeren ein Handy schnell. Nimm eine Powerbank mit. Ohne GPS funktioniert die App sehr gut, wenn du an jedem Ausgang auf „Fertig“ tippst.</li>
      <li><b>Netz</b>: Das mobile Netz ist zu Spitzenzeiten manchmal überlastet. Die App behält die letzten Daten und synchronisiert sich von selbst.</li>
      <li><b>Früh kommen</b>: Wer kurz vor der Öffnung am Eingang ist, bekommt die großen Attraktionen mit den kürzesten Schlangen des Tages. Die Vorschau am Vortag beginnt mit ihnen.</li>
      <li><b>Angezeigte Zeiten</b>: Das sind die Angaben des Parks, oft etwas zu hoch. Miss sie mit „In der Schlange“: Die App passt sich an.</li>
      <li><b>VirtualLine</b>: in der offiziellen Europa-Park-App, mit verknüpftem Ticket und aktiviertem Standort, sobald du im Park bist. Nur ein Zeitfenster gleichzeitig: Buch neu, sobald du es genutzt hast.</li>
      <li><b>Störungen</b>: häufig und oft kurz. Die App versucht es 45 min später erneut und sagt dir, wenn wieder geöffnet ist.</li>
      <li><b>Achterbahnen</b>: nichts in den Taschen. Am Eingang gibt es oft Schließfächer: Plane ein paar Minuten mehr ein.</li>
      <li><b>Wasserbahnen</b>: Man kann klatschnass rauskommen. Bei kühlem Wetter legt die App sie eher in die wärmsten Stunden.</li>
      <li><b>Tagesende</b>: Die Schlangen schließen zur Parkschließung. Die Route sorgt dafür, dass du rechtzeitig in der letzten stehst.</li>
    </ul>
    <p><b>Sonnenmodus</b> (Einstellungen): maximaler Kontrast und größere Schrift. <b>Akku sparen</b>: ungenaueres GPS und Aktualisierung alle 5 Minuten; auf Android schlägt die App es unter 20 % Akku selbst vor.</p>
    <p><b>Saison</b>: Saison-Shows (Halloween, Weihnachten…) sind mit 🎃 markiert und stehen in der Showliste oben.</p>
  `,
  'help.faq': `<summary>Häufige Probleme</summary>
    <table>
      <tr><td>Keine Benachrichtigung</td><td>iPhone: Die App muss über das Symbol auf dem Home-Bildschirm geöffnet werden. Prüf Einstellungen → Benachrichtigungen → <i>Testen</i>, und dass der Fokus-Modus sie nicht blockiert.</td></tr>
      <tr><td>Seltsame Entfernungen</td><td>Aktivier den Standort oder tippe nach jeder Attraktion auf „Fertig“: Sonst denkt die App, du bist noch am Eingang.</td></tr>
      <tr><td>Eine Attraktion wird nie vorgeschlagen</td><td>Sie hat vielleicht eine Störung, ist geschlossen, zu groß für die eingestellte Körpergröße oder ein Bonus ohne genug Zeit. Schau in den Hinweis unter der Route.</td></tr>
      <tr><td>„Daten von 10:12 (vor 8 min)“</td><td>Das Netz oder die Quelle der Wartezeiten antwortet nicht. Tippe oben auf ↻, es geht von selbst weiter.</td></tr>
      <tr><td>App nicht aktuell</td><td>Einstellungen → <i>Aktualisieren</i>, oder schließ die App und öffne sie neu.</td></tr>
    </table>
  `,
  'help.newsList': `<summary>Neuigkeiten</summary>
    <p class="muted" id="helpVersion"></p>
    <ul>
      <li><b>Profile</b>: ein Nickname pro Person, alles wird auf dem Server gespeichert und ist nach einem Abbruch oder auf einem anderen Handy wieder da.</li>
      <li><b>Push-Benachrichtigungen</b>, auch bei geschlossener App: kurze Schlangen, Attraktionen zum Wiederholen, Wiedereröffnungen, Aufbruch zu einem Zeitfenster, einer Show oder zum Essen.</li>
      <li><b>Schlauere Route</b>: viel weniger Wege quer durch den Park, einen Schritt vorausgedacht, und eine Einstellung „Weniger laufen / Ausgewogen / Weniger warten“.</li>
      <li><b>Essenspause und Shows</b> dann, wenn die Schlangen am längsten sind.</li>
      <li><b>Wetter</b> in der Route berücksichtigt.</li>
      <li><b>In der Schlange</b> mit Timer und Messung deiner echten Wartezeiten.</li>
      <li><b>Nochmal bei…</b>, <b>Mindestgröße</b>, <b>Andrang des Tages</b> und Kalender der ruhigen Tage.</li>
      <li><b>Installation</b> auf dem Home-Bildschirm direkt in der App, und diese Hilfeseite.</li>
      <li><b>Tagesrückblick</b> zum Teilen am Abend.</li>
      <li><b>Gruppe auf der Karte</b>: geteilte Standorte und Treffpunkt.</li>
      <li><b>Single Rider</b> als Option, <b>Regenhinweis</b> und <b>erwarteter Andrang</b> am Vortag.</li>
      <li><b>Echte Karte</b> des Parks (OpenStreetMap), zoombar.</li>
      <li><b>Ruhige Zeiten und Spitzenzeiten</b> jeder Attraktion in ihren Details.</li>
      <li><b>Echte Dauer</b> jeder Attraktion und <b>geteilte Wartezeiten</b> zwischen Profilen.</li>
      <li><b>Letzter Aufruf</b> vor Parkschluss.</li>
      <li><b>Sprachen</b>: Französisch, Englisch und Deutsch (Einstellungen).</li>
      <li><b>Karte</b> im Vollbild, Knopf zum Zentrieren und Folgen, Karte zum Herunterladen für offline.</li>
      <li><b>Toiletten, Wasser, Schließfächer, Geldautomaten, Parkplätze</b> auf der Karte und der Platz deines <b>Autos</b>.</li>
      <li><b>VirtualLine</b>: Zeitfenster mit einem Tipp speichern, Knopf zur offiziellen App, Benachrichtigung, wenn sich eine virtuelle Schlange öffnet.</li>
      <li><b>Bewertungen</b> der Attraktionen, Abweichung angezeigt / echt <b>pro Attraktion</b>, Kalender <b>„Welcher Tag ist am besten?“</b>.</li>
      <li><b>Gemeinsamer Plan</b> per Abstimmung, <b>Treffpunkt</b> zum Aufteilen und Wiedertreffen.</li>
      <li><b>Sonnenmodus</b>, <b>Akku sparen</b>, Saison-Shows 🎃, <b>einen Tag nachspielen</b>.</li>
      <li><b>Einfacher Modus</b> als Standard, mit einem <b>Pfeil</b> zum nächsten Schritt, und Start in 3 Fragen.</li>
    </ul>
    <p>Updates kommen beim nächsten Öffnen der App von selbst.</p>
  `,

  status: {OPERATING: 'Geöffnet', DOWN: 'Störung', CLOSED: 'Geschlossen', REFURBISHMENT: 'In Renovierung', UNKNOWN: 'Unbekannt'},
  statusInline: {OPERATING: 'geöffnet', DOWN: 'Störung', CLOSED: 'geschlossen', REFURBISHMENT: 'in Renovierung', UNKNOWN: 'unbekannt'},
  vl: {AVAILABLE: 'offen', TEMP_FULL: 'gerade voll', FINISHED: 'für heute beendet'},
  vlUnknown: 'unbekannt',
  vlStateUnknown: 'Status unbekannt',
  types: {ATTRACTION: 'Attraktion', SHOW: 'Show', RESTAURANT: 'Gastronomie'},
  basis: {'week-end': 'Wochenende', semaine: 'Wochentage', tous: 'alle Tage'},
  weekdaysShort: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
  above: 'über',
  below: 'unter',
  me: 'Ich',
  yes: 'Ja',
  no: 'Nein',
  undo: 'Rückgängig',
  walk: '{n} min zu Fuß',

  'toast.localProfile': 'Lokales Profil: Nichts wird auf dem Server gespeichert',
  'toast.hello': 'Hallo {name}!',
  'login.title': 'Wer bist du?',
  'login.intro': 'Dein Programm und dein Tag werden unter deinem Nickname gespeichert. Auf einem anderen Handy oder nach einem Abbruch wählst du ihn einfach in der Liste aus.',
  'login.loading': 'Profile werden geladen…',
  'login.newName': 'Neuer Nickname',
  'login.create': 'Anlegen',
  'login.none': 'Noch keine Profile: Leg deins an.',
  'login.offline': 'Server nicht erreichbar: Profile sind nicht verfügbar.',
  'login.local': 'Nur auf diesem Handy weitermachen',
  'login.invalid': '2 bis 24 Zeichen: Buchstaben, Ziffern, Leerzeichen, Punkt, Bindestrich, Apostroph.',
  'login.exists': 'Diesen Nickname gibt es schon: Wähl ihn in der Liste aus.',
  'login.createFail': 'Profil konnte nicht angelegt werden: {msg}',

  'wx.now': 'jetzt',
  'wx.at': 'gegen {time}',
  'wx.storm': 'Gewitter {at}',
  'wx.rain': 'Regen {at}',
  'hdr.noHours': 'Öffnungszeiten nicht verfügbar',
  'hdr.open': 'Geöffnet bis {close} · noch {left}',
  'hdr.opens': 'Öffnet um {open}',
  'hdr.hotels': ' · Hotels {early}',
  'hdr.closed': 'Geschlossen · öffnet am {day} um {open}',
  'hdr.offline': 'Offline · ',
  'hdr.data': 'Daten von {time}',
  'hdr.ago': ' (vor {age} min)',
  'hdr.connecting': 'Verbinde mit den Daten…',
  'hdr.sim': 'Simulierte Uhrzeit {time}',
  'user.local': 'Lokal',

  'reason.again': 'Nochmal: Die Schlange ist unter deiner Schwelle ({thr} min).',
  'reason.sr': 'Single-Rider-Schlange: Ihr sitzt getrennt, aber die Wartezeit sinkt auf ~{q} min{est}.',
  'reason.srEst': ' (Schätzung, trag die echte in den Details ein)',
  'reason.rain': 'Regen gegen {time} erwartet: überdachte Attraktion, du bleibst trocken.',
  'reason.wet': 'Gegen {time} sind es {t}°: der richtige Moment, um nass zu werden.',
  'reason.earlyShort': 'Gegen {time} ist die Schlange meist kurz (~{q} min); danach steigt sie im Schnitt auf etwa {later} min.',
  'reason.fromEntrance': 'Passt gut ab dem Eingang, geschätzte Wartezeit ~{q} min.',
  'reason.reopened': 'Sie hat gerade nach einer Pause wieder geöffnet: Die Schlange baut sich erst auf, jetzt ist der richtige Moment.',
  'reason.shorter': 'Kürzere Schlange als sonst um diese Zeit (normalerweise {typ} min).',
  'reason.later': 'Später am Tag eher ~{later} min: also lieber jetzt.',
  'reason.nearby': 'Direkt nebenan: ohne Laufen mitnehmen, bevor es in eine andere Ecke des Parks geht.',
  'reason.shortOnWay': 'Kurze Schlange und auf deinem Weg: mitnehmen, solange die großen Attraktionen voll sind.',
  'reason.best': 'Gerade der beste Kompromiss aus Warten und Laufen.',

  'board.inQueue': 'In der Schlange · seit {d}',
  'board.minLeft': 'min übrig',
  'board.posted': 'Am Eingang angezeigt: {w} min',
  'board.realEst': 'Echt geschätzt ~{w} min',
  'board.queueReason': 'Tippe am Ausgang auf „Fertig“: Die App lernt den Unterschied zwischen angezeigten und echten Wartezeiten.',
  'board.vlSlot': '{vl}-Zeitfenster',
  'board.booked': 'gebucht',
  'board.slotAt': 'Zeitfenster um <b class="num">{time}</b>',
  'board.vlGoNow': 'Geh jetzt los, um pünktlich am {vl}-Eingang zu sein.',
  'board.vlLeaveAt': 'Geh gegen {time} los. Bis dahin passt nichts anderes rein, ohne das Zeitfenster zu riskieren.',
  'board.show': 'Show · {n} min zu Fuß',
  'board.start': 'Beginn',
  'board.leaveAt': 'Aufbruch gegen {time}',
  'board.showReason': 'Vorstellung so gewählt, dass die Schlangen deines Programms gerade am längsten sind. Sei 5 min vorher da für einen guten Platz.',
  'board.meal': 'Essenspause · {time}',
  'board.mealReason': 'Gegen {time} sind die Schlangen deines Programms am längsten: Jetzt zu essen kostet am wenigsten Zeit.',
  'board.next': 'Nächster Halt · Wartezeit',
  'board.atOpening': 'Zur Öffnung ({time}) · Schätzung',
  'board.preview': 'Vorschau {day} · Schätzung',
  'board.from': ' ab {place}',
  'board.entrance': 'dem Eingang',
  'board.arrive': 'Ankunft {time}',
  'board.sr': '🙋 Single Rider ~{w} min',
  'board.vlOpen': '{vl} offen',
  'board.alts': 'Weitere gute Optionen',
  goNow: 'Jetzt losgehen',
  'act.done': 'Fertig',
  'act.leaveQueue': 'Schlange verlassen',
  'act.details': 'Details',
  'act.seen': 'Gesehen',
  'act.notToday': 'Heute nicht',
  'act.later': '⏭ Nicht jetzt',
  'act.restaurant': 'Restaurant',
  'act.inQueue': 'In der Schlange',

  'now.loading': 'Attraktionen und Wartezeiten werden geladen…',
  'now.noHours': 'Keine Öffnungszeiten für die nächsten Tage verfügbar.',
  'now.allDoneEyebrow': 'Programm geschafft',
  'now.allDone': 'Super, alles erledigt',
  'now.allDoneText': ({n}) => `${n} ${n === 1 ? 'Fahrt' : 'Fahrten'} geschafft. Die kürzesten Schlangen in deiner Nähe findest du im Tab Attraktionen (nach Wartezeit sortiert). Um deine Lieblinge nochmal zu fahren, wähl „Nochmal bei…“ in ihren Details.`,
  'now.noneFeasible': 'Gerade ist keine Attraktion deines Programms machbar{extra}. Füg im Tab Attraktionen Bonus-Attraktionen hinzu.',
  'now.closedOrDown': ' (geschlossen oder Störung)',
  'note.missing': ({n, list}) => `Pass${n > 1 ? 'en' : 't'} nicht mehr bis Parkschluss: ${list}. Eine VirtualLine-Buchung kann helfen.`,
  'note.unavailable': ({list}) => `Nicht verfügbar: ${list}.`,
  'note.notOpenLately': 'in letzter Zeit nicht geöffnet',
  'note.small': ({h, list}) => `Mindestgröße über ${h} cm: ${list}.`,
  'note.fromCm': 'ab {cm} cm',
  'note.parade': '{name} um {time}: Viele Besucher bleiben stehen und schauen zu, oft ein guter Moment für eine lange Schlange.',
  'note.crowd': 'Andrang: {pct} % {dir} einem normalen Tag, die Prognosen berücksichtigen das.',
  'note.real': 'Tatsächlich wartet man ~{pct} % der angezeigten Zeiten: Die Uhrzeiten berücksichtigen das.',
  'note.history': ({n, basis}) => `Prognosen auf Basis von ${n} Tag${n === 1 ? '' : 'en'} Verlauf (${basis}).`,
  'note.generic': 'Allgemeine Prognosen: Auf deinem Server ist noch kein Verlauf gespeichert.',
  'itin.preview': 'Vorschau · {day}',
  'itin.end': 'Ende ~{time}',
  'itin.less': 'Weniger zeigen',
  'itin.more': 'Die nächsten {n} Stationen zeigen',
  'tag.show': 'Show',
  'tag.meal': 'Essen',
  'tag.sr': 'Single Rider',
  'tag.again': 'nochmal',
  'tag.bonus': 'Bonus',
  'tag.slot': 'Zeitfenster',
  'tag.chosen': 'gewählt',
  'tips.forecast': '<b>Erwarteter Andrang:</b> An den bisher erfassten {name}en ({n}) liegt die mittlere Wartezeit bei ~{avg} min, {pct} % {dir} dem Schnitt der letzten Tage. {verdict}',
  'tips.calm': 'Eher ruhig: Nutz das aus.',
  'tips.busy': 'Eher voll: VirtualLine gleich nach dem Einlass und Essenspause zur Spitzenzeit.',
  'tips.average': 'Ein durchschnittlicher Tag.',
  'tips.early': '<b>Sei vor {time} am Eingang.</b> Früh am Tag haben die großen Attraktionen die kürzesten Schlangen: Die Route beginnt mit ihnen.',
  'tips.vl': '<b>VirtualLine, sobald du im Park bist.</b> Kostenlos in der Europa-Park-App, mit verknüpftem Ticket und aktiviertem Standort. Nur ein Zeitfenster pro Ticket gleichzeitig: Buch gleich nach der Nutzung das nächste.',
  'tips.notif': '<b>Aktivier die Benachrichtigungen</b> (Einstellungen): Hinweise bei kurzen Schlangen, wann du zu einem Zeitfenster oder einer Show losmusst, auch mit dem Handy in der Tasche.',

  'vl.slotAt': 'Zeitfenster um <b class="num">{time}</b>',
  'vl.goNow': 'Jetzt losgehen.',
  'vl.leaveAt': 'Empfohlener Aufbruch {time} (in {in}).',
  'vl.delete': 'Zeitfenster löschen',
  'vl.before': 'Sobald du drin bist, buch ein Zeitfenster für eine Attraktion mit langer Schlange{list}. Trag es dann hier ein: Die Route plant drumherum.',
  'vl.bookNow': 'Jetzt buchen: <b>{name}</b>',
  'vl.currentQueue': ' · aktuelle Schlange {w} min',
  'vl.nextSlot': ' · nächstes Zeitfenster ~{time}',
  'vl.none': 'Gerade hat keine Attraktion deines Programms {vl} offen.',
  'vl.haveSlot': 'Ich habe ein Zeitfenster',
  'vl.howTo': 'So buchst du',
  'vl.free': 'kostenlose virtuelle Warteschlange',

  'banner.goNow': '<b>Jetzt losgehen</b> zu {name}: {what} um {time}.',
  'banner.vlSlot': '{vl}-Zeitfenster',
  'banner.atRide': 'Du bist bei <b>{name}</b>. Stehst du an?',
  'banner.finished': 'Mit <b>{name}</b> fertig?',
  'banner.lastCall': '<b>Letzter Aufruf</b>: Parkschluss um {time}, dann schließen auch die Schlangen.',
  'banner.stillPossible': ' Noch möglich: {list}.',
  'banner.rain': '<b>Regen gegen {h} Uhr erwartet</b>: Die Route wechselt zu überdachten Attraktionen.',
  'banner.offline': 'Kein Netz: Es werden die zuletzt empfangenen Daten angezeigt. Die Aktualisierung läuft automatisch weiter.',
  'banner.stale': 'Die Quelle der Wartezeiten antwortet nicht: Daten der letzten Abfrage.',

  'list.hint.plan': 'Voller Stern: ⭐ Lieblings · halber Stern: 👍 wenn Zeit bleibt. Tippe auf den Stern zum Ändern.',
  'list.hint.rides': 'Füg Attraktionen mit dem Stern zu deinem Programm hinzu.',
  'list.hint.shows': 'Stern: Die Show kommt in deine Route, zur besten Vorstellung.',
  'list.hint.food': 'Restaurants und Stände im Park.',
  'list.emptyPlan': 'Dein Programm ist leer: Geh zu „Attraktionen“ und tippe auf die Sterne.',
  'list.empty': 'Nichts anzuzeigen.',
  'list.reopened': 'gerade wieder offen',
  'list.alert': 'Hinweis ≤ {w} min',
  'list.again': 'nochmal ≤ {w} min',
  'list.done': 'erledigt',
  'list.seen': 'gesehen',
  'list.over': 'vorbei',
  'star.must': '⭐ Lieblings — auf „wenn Zeit bleibt“ setzen',
  'star.bonus': '👍 Wenn Zeit bleibt — aus dem Plan nehmen',
  'star.add': 'Zum Programm hinzufügen',
  'show.remove': 'Aus der Route entfernen',
  'show.add': 'Zur Route hinzufügen',
  'food.open': 'Geöffnet',
  'food.closed': 'Geschlossen',
  'food.closedNow': 'Gerade geschlossen',

  'map.group': ' Gruppe: {list}.',
  'map.member': '{nick} ({walk} min, vor {age} min)',
  'map.meet': ' Empfohlener Treffpunkt (Raute): {name}.',
  'map.alone': ' Gerade teilt niemand sonst seinen Standort.',
  'map.note': 'Lila Punkt: {where}. Große Punkte: dein Programm, mit Wartezeit.{group}',
  'map.noteSvg': 'Lila Punkt: {where}. Große Punkte: dein Programm.{group} Schematischer Plan, Norden oben.',
  'map.gps': 'dein GPS-Standort',
  'map.last': 'zuletzt erledigte Attraktion ({name})',
  'map.entrance': 'Haupteingang (aktivier den Standort in den Einstellungen)',
  'map.wait': 'Karte verfügbar, sobald die Attraktionen geladen sind.',
  'map.aria': 'Schematischer Plan der Attraktionen mit ihren Wartezeiten',

  'set.noUser': 'Kein Profil gewählt.',
  'set.localUser': 'Lokales Profil: Dein Programm bleibt auf diesem Handy (Server beim Auswählen nicht erreichbar).',
  'set.user': 'Angemeldet als {name}. Jede Änderung wird auf dem Server gespeichert.',
  'set.noOther': 'Kein anderes Profil',
  'set.planSummary': ({must, bonus, shows, done}) => `${must} Pflicht · ${bonus} Bonus${shows ? ` · ${shows} ${shows === 1 ? 'Show' : 'Shows'}` : ''} · ${done} heute erledigt`,
  'gps.off': 'Aus: Entfernungen zählen ab der zuletzt als „erledigt“ markierten Attraktion oder ab dem Eingang.',
  'gps.wait': 'Standort wird gesucht…',
  'gps.on': 'An: Entfernungen zählen ab deinem Standort. Die App fragt dich auch, ob du anstehst, wenn du bei einer Attraktion ankommst.',
  'gps.out': 'An, aber du bist nicht im Park: Entfernungen zählen ab dem Eingang.',
  'gps.denied': 'Vom Browser blockiert. Erlaube den Standort für diese Seite in den Handy-Einstellungen.',
  'gps.unavailable': 'Nicht verfügbar (die Seite muss über HTTPS laufen).',
  'gps.enable': 'Meinen Standort verwenden',
  'gps.disable': 'Standort deaktivieren',
  'set.version': 'Version {v} · Updates kommen beim Öffnen der App von selbst.',
  'data.server': 'über deinen Server (Cache + Verlauf)',
  'data.direct': 'direkt von themeparks.wiki (api.php nicht erreichbar, kein Verlauf)',
  'data.none': 'noch keine',
  'data.source': 'Quelle: {src}.',
  'data.history': 'Verlauf: {h}',
  'data.days': ({n, basis}) => `${n} Tag${n === 1 ? '' : 'e'} (Basis: ${basis})`,
  'data.noHistory': 'noch keiner. Starte den Sammel-Cronjob (siehe README): Ab dem Vortag beruhen die Prognosen auf echten Schlangen.',
  'data.real': 'Echte Wartezeiten: {r}',
  'data.realMine': 'Du wartest ~{pct} % der angezeigten Zeiten ({n} Messungen).',
  'data.realPooled': '~{pct} % der angezeigten Zeiten, laut {n} Messungen aller Profile. Nach zwei eigenen Messungen zählen deine.',
  'data.realHow': 'Tippe beim Anstellen auf „In der Schlange“ und am Ausgang auf „Fertig“: Nach zwei Messungen nutzt die Route echte Zeiten.',
  'crowd.today': 'Heute: {pct} % {dir} einem normalen Tag.',
  'crowd.about': 'Mittlere Wartezeit der Attraktionen zwischen 11 und 16 Uhr, Tag für Tag (Verlauf deines Servers).',
  'crowd.notEnough': 'Noch nicht genug Verlauf.',
  'crowd.calmest': 'Ruhigste Tage: {list}.',

  'chart.empty': 'Heute noch keine Messwerte für diese Attraktion. Die Kurve füllt sich mit jeder Aktualisierung.',
  'chart.aria': 'Wartezeit im Tagesverlauf',
  'chart.today': 'heute',
  'chart.usual': 'üblich (gestrichelt)',
  'best.low': '<b>Am niedrigsten gegen {time}</b> (~{w} min{also})',
  'best.also': ', auch {list}',
  'best.peak': ' · Spitze gegen {time} (~{w} min).',
  'best.basis': ({n, basis}) => `Basierend auf ${n} Tag${n === 1 ? '' : 'en'} (${basis}).`,
  'sheet.wait': 'Wartezeit',
  'sheet.usual': 'Normalerweise',
  'sheet.walk': 'Zu Fuß',
  'sheet.minCm': 'Mindestgröße in Begleitung: {cm} cm (Richtwert)',
  'sheet.tooSmall': ' · <b>zu klein für deine Gruppe</b>',
  'sheet.indoor': 'Überdacht',
  'sheet.wet': 'Hier wird man nass',
  'sheet.vl': '{vl}: <b>{state}</b>',
  'sheet.vlOffer': ' · angebotenes Zeitfenster gegen {time}',
  'sheet.inPlan': 'In meinem Programm',
  'sheet.plan': 'Programm',
  'plan.must': '⭐ Lieblings',
  'plan.bonus': '👍 Wenn Zeit bleibt',
  'sheet.redone': 'Nochmal erledigt ({n}×)',
  'sheet.markDone': 'Als erledigt markieren',
  'sheet.inQueue': 'Ich stehe an',
  'sheet.undone': '„Erledigt“ zurücknehmen',
  'sheet.alert': 'Benachrichtigen bei Wartezeit unter…',
  'sheet.noAlert': 'Kein Hinweis',
  'sheet.srIn': 'Single-Rider-Wartezeit am Eingang (min)',
  'sheet.srPh': 'Schätzung: ~{w} min',
  'sheet.again': 'Nochmal bei Wartezeit unter…',
  'sheet.once': 'Einmal reicht',
  'sheet.showPlanned': ' · in deiner Route um <b>{time}</b> eingeplant',
  'sheet.noShow': 'Heute keine Vorstellungen angekündigt.',
  'sheet.showRemove': 'Aus meiner Route entfernen',
  'sheet.showAdd': 'Zu meiner Route hinzufügen',
  'slot.title': 'Ich habe ein {vl}-Zeitfenster gebucht',
  'slot.ride': 'Attraktion',
  'slot.start': 'Beginn des Zeitfensters',
  'slot.save': 'Zeitfenster speichern',

  'toast.preset': '{n} Attraktionen zum Programm hinzugefügt',
  'toast.done': '{name}: {what}',
  'rebook': '<b>Buch ein neues {vl}-Zeitfenster</b> in {app}{pick}. Trag es dann mit „Ich habe ein Zeitfenster“ ein.',
  'rebook.app': 'der offiziellen App des Parks',
  'rebook.pick': ': <b>{name}</b> lohnt sich am meisten{w}',
  'rebook.queue': ' (Schlange {w} min)',
  'toast.inQueue': 'In der Schlange: {name}',
  'toast.cleared': 'Programm geleert',
  'toast.showAdded': 'Show hinzugefügt: Die Route wählt die beste Vorstellung',
  'toast.showRemoved': 'Show aus der Route entfernt',
  'toast.notToday': '{name}: heute nicht',
  'toast.skip': '{name}: frühestens in 30 min wieder',
  'toast.leftQueue': 'Schlange verlassen',
  'toast.mealDone': 'Essenspause: erledigt',
  'toast.mealLater': 'Essen um mindestens 30 min verschoben',
  'toast.slotTime': 'Gib die Startzeit des Zeitfensters an',
  'toast.slotSaved': '{vl}-Zeitfenster gespeichert: {name} um {time}',
  'toast.slotDeleted': 'Zeitfenster gelöscht',
  'toast.checking': 'Suche nach Updates…',
  'toast.pushSent': 'Benachrichtigung gesendet',
  'toast.pushNone': 'Kein Handy für dieses Profil angemeldet',
  'toast.offline': 'Server nicht erreichbar',
  'toast.copied': 'Programm von {name} kopiert',
  'toast.copyFail': 'Profil konnte nicht gelesen werden',
  'reset.confirm': 'Zurücksetzen bestätigen',
  'toast.reset': 'Tag zurückgesetzt',
  'toast.alert': 'Hinweis: {name} unter {w} min',
  'toast.alertOff': 'Hinweis entfernt',
  'toast.again': 'Nochmal, sobald die Schlange unter {w} min fällt',
  'toast.mealWindow': 'Zeitfenster kürzer als das Essen: Es wird so früh wie möglich eingeplant',
  'toast.srReset': 'Single-Rider-Schätzung wiederhergestellt',
  'toast.sr': 'Single Rider: {w} min, gilt 45 min',
  'alert.againPrefix': 'Nochmal · ',
  'alert.short': 'Kurze Schlange',

  'push.needProfile': 'Wähl ein auf dem Server gespeichertes Profil, um Benachrichtigungen zu bekommen',
  'push.ios': 'Auf dem iPhone: Füg die Seite zuerst zum Home-Bildschirm hinzu und öffne sie dann über das Symbol',
  'push.unsupported': 'Push-Benachrichtigungen werden von diesem Browser nicht unterstützt',
  'push.refused': 'Benachrichtigungen abgelehnt: Erlaube sie in den Handy-Einstellungen',
  'push.enabled': 'Benachrichtigungen auf diesem Handy aktiviert',
  'push.fail': 'Aktivierung fehlgeschlagen: {msg}',
  'push.on': 'Auf diesem Handy aktiv, auch bei geschlossener Seite: Schlangen unter deinen Schwellen, Attraktionen zum Wiederholen, Wiedereröffnungen, Aufbruch zu einem VirtualLine-Zeitfenster, einer Show oder zum Essen.',
  'push.blocked': 'Im Browser blockiert: Erlaube sie in den Handy-Einstellungen.',
  'push.iosHint': 'Auf dem iPhone (ab iOS 16.4) füg die Seite zum Home-Bildschirm hinzu und öffne sie über das Symbol, um sie zu aktivieren.',
  'push.noPush': 'Push wird hier nicht unterstützt: nur Vibration, solange die Seite offen ist.',
  'push.pitch': 'Hol dir Hinweise, auch mit dem Handy in der Tasche: kurze Schlangen, Wiedereröffnungen, Aufbruch zu einem Zeitfenster oder einer Show.',
  'push.subs': ' {n} Handys für dieses Profil angemeldet.',

  'recap.gained': 'Du hast etwa <b>{d} weniger</b> gewartet als im Tagesschnitt dieser Attraktionen.',
  'recap.best': 'Bester Treffer: <b>{name}</b> mit {w} min (im Schnitt {avg}).',
  'recap.fav': 'Liebling: <b>{name}</b> ×{n}.',
  'recap.shows': ({n}) => `${n} ${n === 1 ? 'Show' : 'Shows'} gesehen.`,
  'recap.eyebrow': 'Dein Tag · {from} – {to}',
  'recap.rides': 'Fahrten',
  'recap.queues': 'In Schlangen',
  'recap.share': 'Teilen',
  'recap.title': 'Mein Tagesrückblick',
  'recap.empty': 'Heute noch nichts erfasst: Tippe am Ausgang jeder Attraktion auf „Fertig“, der Rückblick füllt sich von selbst.',
  'share.text': '{park}, {day}: {rides} Fahrten ({distinct} Attraktionen), {queue} in Schlangen, ≈ {km} km zu Fuß',
  'share.gained': ', {d} Wartezeit gespart',
  'share.fav': '. Liebling: {name} ×{n}',
  'share.title': 'Mein Tag im {park}',
  'toast.recapCopied': 'Rückblick kopiert',

  'install.done': 'EP Live ist installiert: Öffne sie über deinen Home-Bildschirm',
  'install.prompt': 'Füg EP Live zu deinem Home-Bildschirm hinzu: Sie öffnet sich im Vollbild, funktioniert auch bei überlastetem Netz im Park und kann dir Benachrichtigungen schicken.',
  'install.btn': 'App installieren',
  'install.ios': 'Tippe in Safari auf <b>Teilen</b> (das Quadrat mit dem Pfeil nach oben) und dann auf <b>Zum Home-Bildschirm</b>. Öffne EP Live danach über das Symbol: Nur so bekommst du Benachrichtigungen (ab iOS 16.4).',
  'install.menu': 'Wähl im Browsermenü (⋮) <b>App installieren</b> oder <b>Zum Startbildschirm hinzufügen</b>.',
  'install.h': 'App',
  'install.installed': 'Auf diesem Handy installiert.',
  'boot.fail': 'Parkkonfiguration (parks.json) konnte nicht geladen werden. Prüf die Verbindung und lade die Seite neu.',
  'boot.newVersion': 'Neue Version der App.',
  'boot.seeNews': 'Neuigkeiten ansehen',
};

let LANG = 'fr';
/* Langue prise en charge la plus proche : 'de-AT' → 'de', inconnue → 'en' */
const pickLang = l => { l = String(l || '').slice(0, 2).toLowerCase(); return I18N[l] ? l : 'en'; };
function t(key, vars) {
  const v = I18N[LANG][key] ?? I18N.fr[key] ?? key;
  if (typeof v === 'function') return v(vars || {});
  return typeof v === 'string' && vars ? v.replace(/\{(\w+)\}/g, (m, k) => k in vars ? vars[k] : m) : v;
}
/* Textes de la page : data-i18n (texte), data-i18n-html (avec balises), data-i18n-attr="attribut:clé;…" */
function applyI18n() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => el.dataset.i18nAttr.split(';').forEach(p => {
    const [attr, key] = p.split(':');
    el.setAttribute(attr, t(key));
  }));
}
