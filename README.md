<div align="center">

# Riad Nashira Front

**Riad Nashira & SPA** — le site de présentation du riad à Marrakech : hébergements, restaurants, spa, événements, activités et demandes de réservation, en six langues.

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![next-intl](https://img.shields.io/badge/next--intl-6_langues-8B5CF6)
![Mailjet](https://img.shields.io/badge/Mailjet-réservations-orange)
![Bun](https://img.shields.io/badge/Bun-package--manager-FBF0DF?logo=bun&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-standalone-2496ED?logo=docker&logoColor=white)

</div>

---

## 🏨 Présentation

Le site permet de découvrir le Riad Nashira, ses chambres et suites, ses restaurants, son spa et ses services, puis de transmettre une demande de séjour. Les textes et les médias restent ceux du site d'origine.

Le socle technique suit les conventions de `bda-front` : Next.js App Router, composants métier par domaine, TypeScript strict, Tailwind CSS 4, next-intl, Bun et les mêmes outils de qualité.

### Les services derrière le site

| Service            | Rôle                                                       | Point d'entrée                            |
| ------------------ | ---------------------------------------------------------- | ----------------------------------------- |
| **Mailjet**        | Transmettre les demandes de réservation à l'équipe du riad | `lib/actions/send-email.ts`, côté serveur |
| **CDN Secure4All** | Servir les photographies, logos et PDF                     | `NEXT_PUBLIC_CDN_URL`                     |
| **POEditor**       | Synchroniser les dictionnaires sur commande                | `pull-trad.ts`, `push-trad.ts`            |

Le site fonctionne sans backend séparé. Le formulaire utilise une action serveur Next.js ; `/api/send-booking` expose également le contrat HTTP existant. Les informations de paiement ne sont pas traitées par ce dépôt.

---

## 📖 Sommaire

<table>
<tr><td>

- [Démarrage rapide](#-démarrage-rapide)
- [Prendre en main le projet](#-prendre-en-main-le-projet)
- [Architecture](#-architecture)
- [Structure du projet](#-structure-du-projet)

</td><td>

- [Conventions](#-conventions)
- [Parcours dans le code](#-parcours-dans-le-code)
- [Comment faire…](#-comment-faire)
- [Scripts](#-scripts)

</td><td>

- [Documentation](#-documentation)
- [Variables d'environnement](#-variables-denvironnement)
- [Tests](#-tests)
- [Build et déploiement](#-build-et-déploiement)
- [Dépannage](#-dépannage)

</td></tr>
</table>

---

## 🚀 Démarrage rapide

> **Prérequis** — Node.js ≥ 22.13.0 (`.nvmrc` : Node 22), Bun 1.x pour les dépendances. Docker Compose v2 est utilisé pour la production.

```bash
# 1. Installer les dépendances
bun install --frozen-lockfile

# 2. Préparer l'environnement, si aucun .env n'existe déjà
cp .env.example .env

# 3. Démarrer le site
bun run dev                  # http://localhost:3000/fr
```

### `.env` minimal pour afficher le site

```dotenv
NEXT_PUBLIC_CDN_URL=https://1-files-biotech-dental-clt-cdn.secure4all.xyz/data/Riad/
```

Conserver le `/` final. Les clés `APP_MAILJET_KEY` et `APP_MAILJET_SECRET` sont nécessaires pour envoyer les réservations, mais pas pour lire les pages ou construire le site. Les identifiants POEditor ne sont requis que pour la synchronisation des traductions.

### Vérifier le démarrage

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/fr     # 200
curl -fsS http://localhost:3000/api/health                          # {"status":"ok"}
```

---

## 👋 Prendre en main le projet

1. **Lire une page publique.** `app/[locale]/(site)/page.tsx` assemble l'accueil. Les pages d'hébergement montrent comment les traductions et les données alimentent les composants de présentation.
2. **Suivre une réservation.** `app/[locale]/(site)/booking/page.tsx` → `components/features/rooms/booking-form.tsx` → `lib/actions/send-email.ts` → Mailjet.
3. **Lire le routage.** `lib/i18n/routing.ts` contient les six langues et les chemins traduits. `/fr/hebergements/confort` et `/en/rooms/comfort` désignent la même page.
4. **Ouvrir les styles.** `styles/globals.css` contient le thème Tailwind et les styles du riad ; `lib/fonts.ts` configure Playfair Display et Poppins.
5. **Lancer les tests.** Les tests de réservation simulent Mailjet. Les tests de contenu comparent les pages à la référence enregistrée avant la migration.

---

## 🏗 Architecture

### Cycle d'une requête

```text
Navigateur
  └─ proxy.ts                            routage next-intl
      └─ app/[locale]/layout.tsx          langue, polices et traductions
          └─ (site)/layout.tsx            en-tête, contenu, pied de page
              └─ page.tsx                composition côté serveur
                  └─ components/features interactions côté client si nécessaires
```

### Présentation et interactions

| Couche                      | Responsabilité                                        | Emplacement                       |
| --------------------------- | ----------------------------------------------------- | --------------------------------- |
| **Pages serveur**           | Composer les sections et charger les traductions      | `app/[locale]/(site)/`            |
| **Composants métier**       | Hébergements, spa, restaurants, activités, événements | `components/features/`            |
| **Composants clients**      | Formulaire, navigation, carrousels et animations      | Composants portant `'use client'` |
| **Données de présentation** | Valeurs et références des médias par domaine          | `lib/constants/`                  |
| **Réservations**            | Préparer le message et appeler Mailjet                | `lib/actions/`                    |

### Internationalisation

Les langues `fr`, `en`, `it`, `es`, `pt`, `de` conservent leur préfixe dans toutes les URL. Les dictionnaires viennent de `translations/`, avec un repli anglais qui conserve le comportement du site d'origine. Le changement de langue traduit le chemin courant et conserve les paramètres de recherche et l'ancre.

---

## 📁 Structure du projet

```text
app/
├── [locale]/
│   ├── layout.tsx                 langue, polices et fournisseurs
│   └── (site)/                    pages publiques et shell du site
│       ├── rooms/                 hébergements et catégories
│       ├── booking/               demande de réservation
│       ├── spa/                   spa et bien-être
│       └── activities/ events/ bars-restaurants/ services/
├── (staff)/admin/                 espace équipe privé et connexion
└── api/
    ├── staff/                     authentification et confirmations privées
    ├── health/                    contrôle de santé Docker
    └── send-booking/              contrat HTTP de réservation

components/
├── features/                      composants regroupés par domaine
├── layout/                        en-tête, pied de page et menus
├── common/                        sections partagées et fournisseurs
└── ui/                            bouton, conteneur, titre de section

lib/
├── actions/                       demande publique de réservation
├── auth/                          sessions et comptes internes
├── confirmations/                 validation, modèles, historique et envoi
├── db/                            stockage SQLite persistant
├── email/                         transport Mailjet privé
├── constants/                     données de présentation par domaine
├── hooks/                         hooks clients
├── i18n/                          routage, chargement et repli des traductions
└── utils/                         utilitaires partagés

types/                             types métier
styles/                            thème et styles du riad
translations/                      six dictionnaires POEditor
public/                            ressources publiques locales
email-templates/                   modèles de confirmation et images intégrées
data/                              base privée locale, ignorée par Git
tests/                             tests unitaires, intégration, E2E, visuels et médias
deploy/                            exemple nginx pour www.riadnashira.com
```

---

## 🧭 Conventions

- **Composants serveur par défaut.** Utiliser `'use client'` pour les états, effets et événements du navigateur.
- **Imports par domaine.** Les données viennent directement de `lib/constants/<domaine>` ; les types partagés vivent dans `types/*.type.ts`.
- **Styles centralisés.** Préserver le thème et les classes existantes lors d'une refactorisation technique.
- **TypeScript strict.** Les erreurs de type bloquent le build.
- **Bun et `bun.lock`.** Utiliser Bun pour installer et mettre à jour les dépendances.
- **Formatage commun à `bda-front`.** Quatre espaces, apostrophes, points-virgules, virgules finales et largeur de 120 caractères.
- **Conventional Commits.** Husky, lint-staged et commitlint vérifient les commits locaux.

### Vérification avant contribution

```bash
bun run validate             # ESLint, TypeScript et Jest
bun run prettier:check       # formatage
bun run test:e2e             # build puis tests navigateur
```

---

## 🗺 Parcours dans le code

### Une page, de l'URL au contenu

```text
/fr/hebergements/confort
  └─ lib/i18n/routing.ts                 chemin interne /rooms/comfort
      └─ app/[locale]/(site)/rooms/comfort/page.tsx
          ├─ traductions de ComfortPage
          └─ components/features/rooms/*
```

### Une demande de réservation

```text
/fr/reservation?checkIn=…&checkOut=…
  └─ app/[locale]/(site)/booking/page.tsx
      └─ components/features/rooms/booking-form.tsx
          └─ lib/actions/send-email.ts   sendBookingEmail()
              └─ Mailjet v3.1            destinataire : info@riadnashira.com
```

Les clés Mailjet restent côté serveur. Le formulaire affiche un message de succès ou d'échec selon le résultat de l'action.

---

## 🛠 Comment faire…

| Je veux…                               | Où intervenir                                                                                             |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Ajouter une page publique**          | Déclarer les chemins des six langues dans `lib/i18n/routing.ts`, puis créer la page dans `(site)/`.       |
| **Modifier une section**               | Rechercher son composant dans `components/features/<domaine>/`.                                           |
| **Modifier les traductions**           | Mettre à jour les dictionnaires ou utiliser POEditor, puis vérifier les références de contenu.            |
| **Modifier le menu**                   | `lib/constants/navigation.ts` et `components/layout/`.                                                    |
| **Modifier un message de réservation** | `lib/actions/send-email.ts` et les tests Mailjet associés.                                                |
| **Modifier un style**                  | `styles/globals.css`, puis exécuter les tests visuels.                                                    |
| **Actualiser une référence de test**   | Examiner le diff, puis mettre à jour uniquement la référence concernée ; voir [Tests](./docs/testing.md). |
| **Déployer en production**             | Suivre [Déploiement Docker](./docs/deployment.md).                                                        |

---

## 📦 Scripts

```bash
# Développement / build
bun run dev                    # serveur local sur :3000
bun run build                  # build standalone
bun run start                  # serveur local après build

# Qualité
bun run lint
bun run check-types
bun run prettier:check
bun run validate

# Tests
bun run test                   # tests unitaires et d'intégration
bun run test:unit
bun run test:integration
bun run test:coverage
bun run test:e2e               # build et parcours navigateur, serveur isolé sur :3101
bun run test:e2e:visual        # comparaisons d'images, après le build
bun run test:e2e:media         # audit réseau réel des images, après le build

# Traductions et environnement
bun run trad                   # récupérer les traductions POEditor
bun run trad:push              # publier les traductions locales vers POEditor
bun run trad:missing           # contrôler les clés locales sans réseau
bun run env:example            # ajouter les clés manquantes à .env.example, sans recopier les secrets
```

`trad` réécrit les dictionnaires locaux et `trad:push` modifie POEditor. Ces commandes sont distinctes de l'installation, du build et des tests.

---

## 📚 Documentation

| Document                                                 | Contenu                                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [Confirmations de séjour](./docs/staff-confirmations.md) | Espace équipe, comptes, modèles FR/EN, historique et protection contre les doublons. |
| [Architecture](./docs/architecture.md)                   | Organisation et choix techniques de la migration.                                    |
| [Tests](./docs/testing.md)                               | Scénarios, références de contenu, images de référence et audit CDN.                  |
| [Déploiement Docker](./docs/deployment.md)               | Conteneur, variables, reverse proxy et vérifications de production.                  |

---

## 🔐 Variables d'environnement

### Affichage et réservations

| Variable                   | Utilisation                                                                                   | Moment                      |
| -------------------------- | --------------------------------------------------------------------------------------------- | --------------------------- |
| `NEXT_PUBLIC_CDN_URL`      | Base des photographies, logos et documents, avec `/` final.                                   | **Au build**                |
| `APP_MAILJET_KEY`          | Clé API Mailjet pour les réservations.                                                        | À l'exécution, côté serveur |
| `STAFF_BASE_URL`           | Origine de l’espace équipe ; fixée au domaine public dans Compose.                            | À l’exécution, côté serveur |
| `STAFF_AUTH_SECRET`        | Secret de sessions, aléatoire et d’au moins 32 caractères.                                    | À l’exécution, côté serveur |
| `STAFF_BOOTSTRAP_PASSWORD` | Mot de passe initial de `booking@riadnashira.com`, utilisé seulement si le compte est absent. | À l’exécution, côté serveur |
| `STAFF_DATABASE_PATH`      | Chemin de la base SQLite ; volume `/app/data` dans Docker.                                    | À l’exécution, côté serveur |
| `CONFIRMATION_*_URL`       | Remplacements facultatifs des quatre PDF déjà raccordés au CDN.                               | À l’exécution, côté serveur |
| `APP_MAILJET_SECRET`       | Secret Mailjet pour les réservations.                                                         | À l'exécution, côté serveur |

### Outils et tests

| Variable                             | Utilisation                                                                |
| ------------------------------------ | -------------------------------------------------------------------------- |
| `POEDITOR_SECRET`, `POEDITOR_APP_ID` | Synchronisation des traductions.                                           |
| `POEDITOR_URL`                       | URL de l'API POEditor ; valeur par défaut : `https://api.poeditor.com/v2`. |
| `E2E_PORT`                           | Port du serveur de test isolé ; valeur par défaut : `3101`.                |
| `IMAGE_TAG`                          | Étiquette de l'image Docker ; valeur par défaut : `local`.                 |

> **`NEXT_PUBLIC_CDN_URL` est incorporée au build.** Une modification du CDN nécessite de reconstruire l'image. Les clés Mailjet sont injectées à l'exécution ; elles ne sont pas des arguments de build.

---

## 🧪 Tests

```bash
bun run test
bun run test:e2e
bun run test:e2e:visual
bun run test:e2e:media
```

Les tests unitaires vérifient les traductions, le routage, les messages Mailjet, les modèles FR/EN et le stockage des confirmations. Les tests d'intégration montent le formulaire. Les parcours navigateur couvrent les 72 pages publiques, la réservation, la navigation multilingue et les carrousels, ainsi que la connexion de l’équipe, la prévisualisation, l’envoi simulé, l’historique, les doublons et les erreurs de sécurité.

Les comparaisons visuelles utilisent des images locales déterministes. L'audit de médias vérifie séparément les véritables ressources distantes. Le serveur E2E utilise de fausses clés Mailjet et intercepte ses requêtes HTTP ; aucun message réel n'est envoyé.

Voir [le guide des tests](./docs/testing.md) pour l'installation de Chromium et la mise à jour des références.

---

## 🚢 Build et déploiement

| Environnement  | URL                           | Serveur S4all | Entrée sur l'hôte | Dans le conteneur |
| -------------- | ----------------------------- | ------------- | ----------------- | ----------------- |
| **Production** | `https://www.riadnashira.com` | `10.3.34.55`  | `127.0.0.1:3001`  | `0.0.0.0:3000`    |

Une release GitHub stable publiée déclenche [Release production](./.github/workflows/release.yml). Les runners hébergés GitHub exécutent la CI et les tests Docker, puis livrent l'image testée via le bastion S4all (`212.106.125.38:3615`). Aucun runner dédié ni environnement de recette n'est requis.

Comme dans `bda-front`, l'action [define_env](./.github/actions/define_env/action.yml) génère les fichiers d'environnement à partir des paramètres GitHub :

| Emplacement GitHub                        | Noms à renseigner                                                                                                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Secrets de l'environnement Production** | `APP_MAILJET_KEY`, `APP_MAILJET_SECRET`, `POEDITOR_SECRET`, `STAFF_AUTH_SECRET`, `STAFF_BOOTSTRAP_PASSWORD`, `SECURE4ALL_SSH_PRIVATE_KEY`, `SECURE4ALL_KNOWN_HOSTS` |
| **Variables du dépôt**                    | `POEDITOR_URL`, `POEDITOR_APP_ID`, `NEXT_PUBLIC_CDN_URL`                                                                                                            |

Les trois variables sont renseignées pour les validations et le build. Les secrets individuels sont lus au déploiement ; aucun fichier `.env` privé n'est inclus dans les artefacts. Le fichier envoyé à la production contient les paramètres Mailjet, de l'espace équipe et du CDN. Le secret POEditor reste sur le runner, pour l'outillage de traduction.

La livraison sauvegarde SQLite avant la mise à jour et tente un retour à l'image précédente en cas d'échec, en conservant l'historique des emails. La préparation du serveur et la configuration des secrets sont détaillées dans [le guide de déploiement](./docs/deployment.md).

```text
https://www.riadnashira.com
  └─ reverse proxy de l'hôte, terminaison TLS
      └─ http://127.0.0.1:3001
          └─ conteneur next-front:3000
              └─ node server.js
```

Le Dockerfile reprend les étapes `base`, `development`, `builder` et `production` de `bda-front`. La cible de production utilise Node 22, le serveur standalone Next.js et un utilisateur non privilégié. Le contrôle de santé appelle `/api/health`.

```bash
# Vérification Docker manuelle, avec .env renseigné
docker compose --project-name riad-production -f docker-compose.production.yml build
docker compose --project-name riad-production -f docker-compose.production.yml up -d
curl -fsS http://127.0.0.1:3001/api/health
```

La configuration [nginx](./deploy/nginx.conf) transmet `Host` et les en-têtes `X-Forwarded-*`, nécessaires notamment aux actions serveur. Les certificats doivent être présents sur l'hôte. Le volume `staff-data` conserve les comptes et l’historique des confirmations. Voir [Déploiement Docker](./docs/deployment.md) et [Espace équipe](./docs/staff-confirmations.md) pour la procédure complète.

---

## 🧯 Dépannage

| Symptôme                                 | Vérification                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Images absentes après déploiement        | Vérifier `NEXT_PUBLIC_CDN_URL` au build et son `/` final ; relancer le build si elle a changé.                     |
| Réservation refusée                      | Vérifier les clés Mailjet injectées dans le conteneur, les droits d'envoi et les logs du service.                  |
| Action serveur refusée derrière le proxy | Conserver le domaine public dans `Host` et `X-Forwarded-Host`, et HTTPS dans `X-Forwarded-Proto`.                  |
| Port 3001 déjà utilisé                   | Il est réservé au conteneur de production ; les E2E utilisent le port 3101.                                        |
| Installation figée refusée               | Régénérer `bun.lock` avec `bun install`, puis vérifier le diff.                                                    |
| Diff visuel inattendu                    | Utiliser la version Chromium du lockfile et Linux ; vérifier les différences avant toute mise à jour de référence. |
| Audit des médias en échec                | Vérifier l'URL signalée, le CDN et l'accès réseau ; cet audit utilise les ressources réelles.                      |
| Références de traduction manquantes      | `trad:missing` documente 14 références déjà absentes du site d'origine ; voir [Tests](./docs/testing.md).          |

---

## 📄 Licence

Projet privé — `UNLICENSED` dans `package.json`.
