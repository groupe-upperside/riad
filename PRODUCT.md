# Riad Nashira & SPA

Le site présente les hébergements, restaurants, spa, activités et événements du riad à Marrakech. Il est disponible en français, anglais, italien, espagnol, portugais et allemand. Le domaine de production est `www.riadnashira.com` ; Next.js fonctionne dans Docker derrière un reverse proxy local.

Les visiteurs découvrent le riad et peuvent effectuer une demande de réservation. Les textes, traductions, images et destinations du site public sont conservés pendant les évolutions techniques.

L’espace `/admin` est réservé à l’équipe. Il permet de renseigner un séjour, choisir un email français ou anglais à partir des modèles HTML fournis, prévisualiser le message puis confirmer son envoi. Les membres consultent un historique partagé afin d’éviter les doublons. Les confirmations acceptées par Mailjet restent consultables sans pouvoir être renvoyées ; un résultat incertain exige une vérification auprès du fournisseur.

Les données variables comprennent la référence, le client, les dates, les personnes, la chambre et les montants. Les coordonnées et conditions commerciales proviennent des modèles fournis. Les images de l’email sont celles de ces modèles. Les quatre documents PDF utilisent les URL CDN fournies par l’utilisateur, avec des remplacements facultatifs côté serveur.

Les comptes sont provisionnés par un administrateur, sans inscription publique. Le stockage persistant contient des données personnelles ; il n’est pas exposé sur le site public. Aucun email réel n’est envoyé par la suite de tests.

Les caractéristiques du site public sont documentées dans README.md ; le fonctionnement de l’espace équipe et sa configuration sont dans docs/staff-confirmations.md.
