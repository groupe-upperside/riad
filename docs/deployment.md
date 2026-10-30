# Déploiement en production

La cible est `https://www.riadnashira.com`. Le reverse proxy s'exécute sur l'hôte et transmet les requêtes vers `http://127.0.0.1:3001`. Docker publie ce port local vers le port 3000 du conteneur.

## Release GitHub, sans runner dédié

Le workflow [Release production](../.github/workflows/release.yml) utilise les runners GitHub `ubuntu-24.04`. Il n'y a qu'une cible, la production S4all `10.3.34.55`, et aucun déploiement de recette. Une release publiée et stable déclenche la livraison ; un push, un brouillon et une prérelease ne déploient rien.

```text
Release GitHub stable
  └─ runner GitHub : validation, E2E, régressions visuelles, image Docker et tests équipe
      └─ SSH ProxyJump : aurore.louche@212.106.125.38:3615
          └─ aurore.louche@10.3.34.55:22
              └─ /srv/docker-compose/riad-prod
                  └─ Docker → 127.0.0.1:3001
```

Le workflow réutilise [la CI](../.github/workflows/ci.yml), puis transfère exactement l'image testée, sans compilation sur le serveur. Le tag d'image associe le commit, l'exécution GitHub et sa tentative. L'archive et ses fichiers de déploiement sont contrôlés par SHA256 ; l'identifiant de l'image démarrée est également vérifié. Les artefacts GitHub expirent après un jour et ne contiennent aucun secret.

Le contrôle d'identité accepte le digest de configuration et le digest du manifeste OCI de la même image Linux amd64 : les moteurs Docker classiques et ceux utilisant containerd n'exposent pas le même identifiant. Les deux digests sont reliés et vérifiés dans l'archive avant sa livraison. Une image portant un autre identifiant bloque le démarrage.

**Actions → CI → Run workflow** permet de vérifier les tests, l'image Docker et la préparation de l'archive avant une release, sans déployer en production.

Les releases sont sérialisées. Aucun runner auto-hébergé, registre d'images ou accès direct du runner au réseau privé n'est nécessaire. Le bastion doit accepter la connexion SSH du runner GitHub et autoriser le transfert TCP vers la cible.

## Secrets et variables GitHub

Configurer les secrets individuels dans **Settings → Environments → Production → Environment secrets** :

| Secret                       | Contenu                                                                                                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `SECURE4ALL_SSH_PRIVATE_KEY` | Clé privée OpenSSH dédiée, sans passphrase, dont la clé publique est autorisée sur le bastion et la cible. |
| `SECURE4ALL_KNOWN_HOSTS`     | Lignes `known_hosts` vérifiées pour `[212.106.125.38]:3615` et `10.3.34.55`.                               |
| `APP_MAILJET_KEY`            | Clé API Mailjet.                                                                                           |
| `APP_MAILJET_SECRET`         | Secret API Mailjet.                                                                                        |
| `POEDITOR_SECRET`            | Secret de l'API POEditor, réservé à l'outillage de traduction.                                             |
| `STAFF_AUTH_SECRET`          | Secret de session propre à la production.                                                                  |
| `STAFF_BOOTSTRAP_PASSWORD`   | Mot de passe initial du compte booking.                                                                    |

Configurer également les **variables du dépôt**, dans **Settings → Secrets and variables → Actions → Variables** :

| Variable              | Contenu                                                         |
| --------------------- | --------------------------------------------------------------- |
| `POEDITOR_URL`        | URL HTTPS de l'API, issue de la configuration locale du projet. |
| `POEDITOR_APP_ID`     | Identifiant du projet de traduction Riad.                       |
| `NEXT_PUBLIC_CDN_URL` | URL HTTPS du CDN Riad, avec `/` final.                          |

Ces trois variables alimentent l'action [define_env](../.github/actions/define_env/action.yml) lors des validations et du build. L'action génère un `.env` privé pour l'outillage et exporte uniquement les trois variables non secrètes vers les étapes suivantes. Au déploiement, elle reçoit aussi les secrets de l'environnement **Production** et produit un fichier Compose privé. Le secret POEditor n'est pas transféré au serveur. Les traductions présentes dans le dépôt restent celles embarquées dans l'image ; aucune synchronisation POEditor n'est déclenchée automatiquement.

Générer `STAFF_AUTH_SECRET` pour la production avec `openssl rand -base64 48`. Le mot de passe initial est celui communiqué pour `booking@riadnashira.com` ; il est indispensable tant que ce compte n'existe pas dans le volume. Les variables `CONFIRMATION_*_URL` de [.env.example](../.env.example) peuvent être ajoutées aux variables du dépôt pour remplacer les PDF par défaut.

L'URL du CDN est intégrée à l'image au build. Les variables GitHub facultatives `SECURE4ALL_BASTION_IP`, `SECURE4ALL_BASTION_PORT`, `SECURE4ALL_BASTION_USER` et `RIAD_PRODUCTION_USER` permettent d'adapter l'accès SSH. La cible privée reste `10.3.34.55`.

Les secrets ne sont accessibles qu'au job de déploiement. Celui-ci crée des fichiers temporaires privés sur le runner, les supprime à sa sortie et transmet la configuration par SSH. Chaque release conserve son `runtime.env` sur le serveur, dans un répertoire privé, pour pouvoir revenir à la configuration précédente. Ne pas lancer `docker compose config` sans `--quiet` dans les logs de CI : sa sortie contient les secrets interpolés.

Pour ajouter les secrets depuis un terminal, fournir leur contenu par l'entrée standard :

```bash
gh secret set APP_MAILJET_KEY --env Production
gh secret set APP_MAILJET_SECRET --env Production
gh secret set POEDITOR_SECRET --env Production
gh secret set STAFF_AUTH_SECRET --env Production
gh secret set STAFF_BOOTSTRAP_PASSWORD --env Production
gh secret set SECURE4ALL_SSH_PRIVATE_KEY --env Production < /chemin/prive/cle-deploiement
gh secret set SECURE4ALL_KNOWN_HOSTS --env Production < /chemin/prive/known_hosts
gh variable set POEDITOR_URL
gh variable set POEDITOR_APP_ID
gh variable set NEXT_PUBLIC_CDN_URL
```

## Préparation du serveur

Le serveur doit fournir Docker Engine et Compose v2, Bash, OpenSSH/SFTP, `curl`, `flock` et `sha256sum`, sur une architecture x86_64. Le compte `aurore.louche` doit pouvoir utiliser Docker et écrire dans `/srv/docker-compose/riad-prod`. Un administrateur peut préparer ce répertoire une fois :

```bash
sudo install -d -m 700 -o aurore.louche -g "$(id -gn aurore.louche)" /srv/docker-compose/riad-prod
```

Si Docker refuse l'accès au socket, l'administrateur peut ajouter le compte au groupe `docker` avec `sudo usermod -aG docker aurore.louche`. Cet accès donne les privilèges d'administration Docker de l'hôte. Ouvrir une nouvelle connexion SSH après ce changement pour activer le groupe.

Autoriser la clé publique dédiée dans `~aurore.louche/.ssh/authorized_keys` sur les deux hôtes, puis enregistrer leurs clés d'hôte vérifiées dans GitHub. Le client utilise `StrictHostKeyChecking=yes`, `IdentitiesOnly=yes` et `ProxyJump`, sans transfert d'agent. Aucun `ssh-keyscan` non vérifié n'est exécuté pendant la release.

Le reverse proxy, le DNS et le certificat TLS doivent également être prêts. La livraison ne modifie pas nginx et n'ouvre pas le port 3001 sur le réseau.

## Déroulement et retour arrière

Les fichiers arrivent dans `releases/release-<commit>-<run>-<tentative>/`. Le projet Compose garde toujours le nom `riad-production`, donc le volume conserve le nom `riad-production_staff-data` entre releases. Le lien `current` désigne la dernière livraison ayant passé les contrôles.

Avant chaque mise à jour d'une installation existante, [le script de livraison](../.github/actions/deployment/release.sh) crée une sauvegarde SQLite cohérente, incluant le WAL, dans `/app/data/backups/pre-<release>.sqlite`. La copie s'effectue avec l'image précédente et sans accès réseau. L'échec d'une sauvegarde bloque la mise à jour avant de remplacer le service. Prévoir aussi une sauvegarde externe du volume : cette copie locale ne protège pas d'une perte du serveur.

Le conteneur exécute le seed avant Next.js. La livraison attend ensuite son état `healthy`, vérifie son image, `/api/health`, l'accueil français et le refus d'accès anonyme à l'API équipe. Aucun email n'est envoyé par ces contrôles.

Si ces vérifications échouent après le démarrage, le script tente de restaurer l'image et la configuration de la release précédente. Le volume reste intact : une restauration automatique de la base supprimerait potentiellement des emails envoyés et permettrait des doublons. Une migration incompatible avec l'ancienne image nécessite une intervention. Sur un premier déploiement en échec, le service est arrêté et les données conservées ; réconcilier cette installation avant de relancer.

Les images précédentes, répertoires de release et sauvegardes sont conservés. Prévoir leur rétention selon l'espace disque ; ne supprimer ni la release `current`, ni la dernière version de secours, ni le volume. Une installation existante sans lien `current` n'est pas adoptée automatiquement : vérifier son projet Compose et migrer ses données explicitement avant d'utiliser ce workflow.

Pour relancer une livraison échouée, réexécuter les jobs du workflow GitHub : le numéro de tentative produit un nouveau répertoire. Pour un retour manuel à une version antérieure, publier une nouvelle release stable sur son commit après avoir vérifié la compatibilité du schéma SQLite.

## Construction manuelle locale

Pour une vérification Docker locale, créer un `.env` contenant l'URL publique du CDN, les clés Mailjet et les secrets de l'espace équipe. Cette commande est indépendante de la livraison GitHub.

```dotenv
NEXT_PUBLIC_CDN_URL=https://1-files-biotech-dental-clt-cdn.secure4all.xyz/data/Riad/
APP_MAILJET_KEY=
APP_MAILJET_SECRET=
STAFF_AUTH_SECRET=
STAFF_BOOTSTRAP_PASSWORD=
IMAGE_TAG=local
```

Le CDN, les deux clés Mailjet et `STAFF_AUTH_SECRET` doivent être renseignés pour utiliser Compose. `NEXT_PUBLIC_CDN_URL` est un argument du build ; les clés Mailjet et le secret des sessions sont uniquement des variables du conteneur. Générer le secret avec `openssl rand -base64 48`. `STAFF_BOOTSTRAP_PASSWORD` contient le mot de passe initial communiqué pour `booking@riadnashira.com` ; il est nécessaire si le compte n’existe pas encore dans le volume. `.dockerignore` exclut les fichiers `.env`, les clés, le dépôt Git et les données de test du contexte Docker.

```bash
docker compose --project-name riad-production -f docker-compose.production.yml build
docker compose --project-name riad-production -f docker-compose.production.yml up -d
docker compose --project-name riad-production -f docker-compose.production.yml ps
curl -fsS http://127.0.0.1:3001/api/health
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3001/fr
```

Le service `next-front` utilise la cible `production` du Dockerfile. Node 22 exécute `server.js` en utilisateur `node`. Les ressources publiques et `.next/static` sont copiées dans l'image standalone. Docker vérifie la santé du serveur et redémarre le service selon `unless-stopped`. Les logs sont limités à trois fichiers de 10 Mo.

## Reverse proxy et TLS

`.github/actions/deployment/nginx.conf` fournit un exemple pour nginx installé sur l'hôte :

- domaine `www.riadnashira.com` ;
- redirection HTTP vers HTTPS ;
- TLS terminé sur nginx ;
- destination `127.0.0.1:3001` ;
- conservation de `Host`, `X-Forwarded-Host`, `X-Forwarded-Proto` et de l'adresse du client ;
- buffering désactivé pour les réponses Next.js en streaming.

L'exemple suppose des certificats Let's Encrypt dans `/etc/letsencrypt/live/www.riadnashira.com/`. Adapter ces chemins au certificat réellement installé. Tester la configuration avec `nginx -t` avant de recharger nginx.

Si le reverse proxy est lui-même conteneurisé, `127.0.0.1` désigne ce conteneur ; utiliser alors un réseau Docker partagé et le nom du service. Le fichier fourni correspond au proxy sur l'hôte décrit pour ce projet.

## Vérifier la publication

```bash
curl -fsS https://www.riadnashira.com/api/health
curl -s -o /dev/null -w '%{http_code}\n' https://www.riadnashira.com/fr
docker logs --tail 100 "$(docker ps -q --filter label=com.docker.compose.project=riad-production --filter label=com.docker.compose.service=next-front)"
```

La livraison ne synchronise pas les traductions depuis POEditor : elle embarque les dictionnaires présents dans le dépôt au moment du build.

## Vérification isolée de l'image

Pour tester une image sans occuper le port de production, utiliser des clés factices et un port local distinct :

```bash
docker build --target production --build-arg NEXT_PUBLIC_CDN_URL=https://1-files-biotech-dental-clt-cdn.secure4all.xyz/data/Riad/ -t riad-front:check .
docker run --rm --name riad-front-check -p 127.0.0.1:3102:3000 \
    -e APP_MAILJET_KEY=test -e APP_MAILJET_SECRET=test \
    -e STAFF_BASE_URL=http://localhost:3102 \
    -e STAFF_AUTH_SECRET="$(openssl rand -hex 32)" \
    -e STAFF_BOOTSTRAP_PASSWORD="$(openssl rand -hex 24)" riad-front:check
curl -fsS http://127.0.0.1:3102/api/health
```

Cette vérification ne doit pas soumettre de réservation. Les tests Playwright utilisent leur propre serveur et leur interception Mailjet ; ce mécanisme ne fait pas partie de l'image de production.

## Espace équipe et données persistantes

`/admin` donne accès aux confirmations de séjour. Compose fixe `STAFF_BASE_URL=https://www.riadnashira.com` et monte le volume `staff-data` sur `/app/data`. Ce volume contient les comptes, sessions et confirmations ; il doit être conservé entre déploiements. Ne pas utiliser `docker compose down -v` lors d’une mise à jour.

Le compte `booking@riadnashira.com` est initialisé au démarrage de la release avant Next.js. Les releases suivantes préservent son mot de passe et son état. Organiser les sauvegardes et créer les comptes supplémentaires en suivant [le guide des confirmations](./staff-confirmations.md). Le mot de passe initial doit être fourni par secret d’environnement ; aucun mot de passe n’est inclus dans l’image. Les quatre PDF sont déjà raccordés aux URL CDN communiquées ; leurs variables de remplacement sont facultatives.

Le contrôle Docker de la fonctionnalité a vérifié la création et la désactivation des comptes, les cookies sécurisés derrière le domaine public, la prévisualisation avec images et PDF, ainsi que la conservation de la session et de l’historique après redémarrage. Il utilise un volume isolé et ne déclenche aucun envoi réel.
