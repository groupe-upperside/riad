# Confirmations de séjour — espace équipe

L’espace privé est accessible à `/admin`. Aucun lien n’est ajouté au site public. Les membres de l’équipe se connectent, renseignent le séjour, prévisualisent le modèle français ou anglais fourni, puis confirment explicitement l’envoi au client. L’historique est partagé et consultable par nom, email ou référence.

## Configuration

```dotenv
STAFF_BASE_URL=https://www.riadnashira.com
STAFF_AUTH_SECRET=<secret aléatoire d’au moins 32 caractères>
STAFF_BOOTSTRAP_PASSWORD=<mot de passe initial de booking@riadnashira.com>
STAFF_DATABASE_PATH=/app/data/staff.sqlite
# Les quatre PDF du CDN sont déjà définis par défaut.
# Remplacements facultatifs uniquement :
CONFIRMATION_NOUR_MENU_URL=
CONFIRMATION_RIVE_MENU_URL=
CONFIRMATION_SPA_MENU_FR_URL=
CONFIRMATION_SPA_MENU_EN_URL=
CONFIRMATION_EXPERIENCES_URL=
```

Pour générer le secret : `openssl rand -base64 48`. En développement, utiliser l’origine effective du serveur, par exemple `http://localhost:3001`. Ne pas utiliser de variable `NEXT_PUBLIC_` pour les secrets.

Les deux modèles sources fournis sont à la racine du dépôt. `email-templates/` contient leurs versions paramétrées. Les six images proviennent exclusivement de ces modèles et sont conservées sans modification visuelle ; elles sont dédupliquées par leur empreinte SHA-256. Les fichiers clients utilisent des pièces jointes intégrées avec `Content-ID`. La prévisualisation restitue ces mêmes images, sans script ni accès au document parent. Seules les valeurs des zones variables, les liens PDF à configurer et la note de préparation finale sont remplacés.

Les quatre PDF fournis sont utilisés par défaut depuis `https://1-files-biotech-dental-clt-cdn.secure4all.xyz/data/Riad/mail/` : `nour.pdf`, `rive.pdf`, `spa.pdf` et `activites.pdf`. Les variables d’environnement permettent de remplacer leurs URL si nécessaire. Le formulaire refuse de produire un message avec des liens « LIEN-A-REMPLACER ». Les coordonnées et conditions du modèle restent celles fournies.

## Compte initial à la release

Le compte initial est `booking@riadnashira.com`, au nom de « Réservations Riad Nashira ». L’entrypoint de l’image de production exécute `staff-seed.mjs` avant de démarrer Next.js. Le seed initialise les tables d’authentification puis crée ce compte uniquement s’il est absent. Le mot de passe est haché par Better Auth et aucune session n’est ouverte automatiquement.

Le mot de passe initial est injecté via `STAFF_BOOTSTRAP_PASSWORD`, dans le `.env` de l’hôte ou les secrets de la release. Il contient de 12 à 128 caractères. Il n’est jamais intégré aux sources, à l’image ni aux logs. La valeur générée pour l’installation locale est dans `.env`, ignoré par Git ; l’environnement de production doit recevoir cette même valeur pour initialiser le compte avec le mot de passe communiqué.

À chaque release ou redémarrage, un compte existant est conservé sans modification : ni changement de mot de passe, ni réactivation d’un compte désactivé, ni révocation des sessions. `STAFF_BOOTSTRAP_PASSWORD` peut donc être retiré après le premier provisionnement, tant que le volume de données est conservé. Une base neuve sans mot de passe initial valide fait échouer le démarrage avant l’ouverture du serveur.

Pour initialiser explicitement la base locale : `bun run staff:seed`. Les commandes de build ne créent pas de compte et n’utilisent pas le mot de passe initial.

## Créer un compte supplémentaire

Il n’y a pas d’inscription publique. Depuis un terminal Bash, lire le mot de passe sans l’afficher, puis le transmettre sur l’entrée standard :

```bash
read -rs -p 'Mot de passe (12 caractères minimum) : ' staff_password
printf '\n'
printf '%s' "$staff_password" | bun run staff:user create reception@example.com 'Équipe réception'
unset staff_password
```

Le mot de passe n’apparaît pas dans les arguments du processus. En production, exécuter le même script **dans le conteneur** pour utiliser son volume de données :

```bash
read -rs -p 'Mot de passe : ' staff_password
printf '\n'
printf '%s' "$staff_password" | docker compose -f docker-compose.production.yml exec -T next-front \
    node --experimental-strip-types --conditions=react-server scripts/staff-user.mjs create reception@example.com 'Équipe réception'
unset staff_password
```

Désactiver un compte révoque aussi toutes ses sessions :

```bash
bun run staff:user disable reception@example.com
# Dans Docker :
docker compose -f docker-compose.production.yml exec -T next-front \
    node --experimental-strip-types --conditions=react-server scripts/staff-user.mjs disable reception@example.com
```

Les comptes internes autorisés peuvent tous préparer des confirmations et consulter l’historique. Seul l’auteur peut modifier ou envoyer son brouillon. Les messages envoyés sont en lecture seule.

## Sessions et protections

Better Auth gère les mots de passe hachés, les sessions persistées et les cookies `HttpOnly`, `SameSite=Lax`, `Secure` sur HTTPS. Les sessions expirent après huit heures. Elles sont vérifiées dans les pages **et** chaque route privée ; la désactivation d’un compte est immédiatement prise en compte.

L’API d’authentification n’autorise pas l’inscription. Les connexions sont limitées à cinq tentatives par minute et par adresse IP, avec un compteur en base. Nginx doit écraser `X-Real-IP` et le port du conteneur doit rester publié uniquement sur `127.0.0.1`, comme dans la configuration fournie.

Chaque mutation métier exige une session et une origine identique à `STAFF_BASE_URL`. Les champs sont validés et bornés côté serveur ; l’API ne reçoit jamais de HTML à envoyer. Une prévisualisation génère un jeton aléatoire à usage unique, lié au brouillon, à son auteur et à sa version. Modifier le brouillon invalide le jeton précédent. L’email envoyé est celui archivé lors de la prévisualisation. Le transport Mailjet générique est un module serveur privé et n’est pas une Server Action publique.

## Historique et doublons

Les brouillons, envois en cours, succès, refus et résultats incertains sont stockés dans SQLite. La référence normalisée est unique parmi les confirmations actives. Un second contrôle porte sur l’email et les dates du séjour, indépendamment de la référence et de la langue.

Les contraintes uniques et la prise en charge atomique d’un brouillon empêchent les doubles clics, les requêtes concurrentes et les renvois par un autre membre de l’équipe. Mailjet reçoit également un `CustomID` et une campagne propre à l’envoi, avec déduplication activée.

Les brouillons inutilisés expirent après 24 heures. Un refus explicite de Mailjet autorise une nouvelle prévisualisation du même brouillon. Une coupure, une réponse ambiguë ou une interruption du serveur laisse un verrou persistant : **ne pas renvoyer automatiquement**. Après cinq minutes, un envoi interrompu est présenté comme « À vérifier » à la consultation de l’historique. Rechercher l’identifiant affiché dans Mailjet et faire traiter toute réconciliation par l’administrateur. Aucun bouton de contournement n’est exposé.

« Envoyé » signifie **accepté par Mailjet**, sans affirmer que la boîte du client l’a reçu. Le suivi de livraison et des rebonds par webhook n’est pas inclus.

## Stockage et déploiement

Le volume Docker `staff-data` conserve les comptes, sessions et confirmations malgré le remplacement du conteneur. Le répertoire appartient à l’utilisateur `node` et n’est pas accessible depuis les routes publiques. Ne pas exécuter `docker compose down -v` pour un déploiement ordinaire.

Cette configuration vise une instance du site, avec le volume SQLite local. Sauvegarder la base et ses pièces jointes de journalisation avec l’API de sauvegarde SQLite ou lors d’un arrêt du service. Une simple copie du fichier principal pendant une écriture peut être incomplète en mode WAL. Les sauvegardes contiennent des données personnelles et doivent être protégées et soumises à la politique de conservation du riad.

Les scénarios de validation utilisent une base isolée et interceptent les appels HTTP Mailjet ; ils n’envoient aucun email réel aux clients.
