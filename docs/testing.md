# Tests

## Préparer l'environnement

```bash
bun install --frozen-lockfile
bunx playwright install chromium
```

Node 22 et Bun sont utilisés comme dans `bda-front`. Playwright démarre un serveur de production isolé sur `localhost:3101`, sans réutiliser un serveur déjà lancé. `E2E_PORT` permet d'employer un autre port. Le port de production Docker reste `127.0.0.1:3001`.

## Commandes

```bash
bun run validate                # ESLint, TypeScript et Jest
bun run prettier:check
bun run test:unit
bun run test:integration
bun run test:coverage
bun run test:e2e                 # build et parcours fonctionnels
bun run test:e2e:visual          # après le build
bun run test:e2e:media           # après le build, accès réseau réel
```

Les rapports de tests, captures d'échec et traces vont dans `test-results/`. Les sorties fonctionnelles, visuelles et médias utilisent des répertoires séparés.

## Tests unitaires et d'intégration

- Chargement des six dictionnaires et conservation de toutes les valeurs de traduction.
- Mise à jour des seuils d’écran et nettoyage des abonnements de `useMediaQuery`.
- Repli anglais, namespace absent, clé terminale absente et erreur de formatage.
- Langues, préfixes et génération des URL localisées.
- API de réservation : transmission du corps et réponses de succès ou d'erreur.
- Formulaire : préremplissage, soumission, confirmation et échec.
- Mailjet : expéditeur, destinataire, sujet, libellés français, valeurs, échappement HTML, champs facultatifs, templates, pièces jointes et erreurs du transport.
- Santé : réponse du endpoint utilisé par Docker, sans dépendance aux clés Mailjet.
- Confirmations : validation des dates et montants, modèles FR/EN, images intégrées, échappement et liens PDF.
- Stockage : unicité des réservations, prévisualisation liée à son auteur et à sa version, verrou d’envoi et statuts persistants.
- Transport privé : reçu du bon destinataire, refus explicite, réponse ambiguë et absence de répétition automatique.

Le test Mailjet importe la véritable action et simule uniquement le SDK. Il vérifie ainsi le message effectivement construit par le code métier.

## Parcours navigateur

Les 72 URL publiques (12 pages × 6 langues) sont vérifiées par rapport à `tests/fixtures/public-content.json`, enregistré avant la migration : statut, langue, texte, liens, références d'images et textes alternatifs.

Les parcours interactifs couvrent également :

- changement de langue sur l'accueil, une chambre et la réservation, dans les six langues ;
- conservation des paramètres simples, des paramètres répétés et de l'ancre ;
- ouverture et fermeture du menu mobile ;
- pagination, clavier, bouclage, lecture automatique et glissement du carrousel des expériences ;
- limites du carrousel d'activités, rotation du héros et défilement des autres chambres ;
- réservation complète réussie et indisponibilité de Mailjet ;
- blocage d'un formulaire incomplet par la validation native ;
- redirection existante vers l'accueil français pour les URL de pages inconnues ;
- 404 des endpoints API et fichiers inexistants, et accès aux ressources publiques sans préfixe de langue.

### Espace équipe

Les scénarios de `staff-confirmations.spec.ts` utilisent la véritable authentification avec une base SQLite isolée et des comptes factices provisionnés par la même commande que la production. Ils vérifient les refus anonymes, les sessions falsifiées, l’inscription désactivée, la limite de connexion, l’origine des mutations et les tailles de requêtes.

Les deux modèles sont préparés, prévisualisés et envoyés au fournisseur intercepté, puis retrouvés dans l’historique. Les scénarios couvrent les doubles clics concurrents, les références et séjours déjà traités, les jetons périmés, les auteurs différents, les refus et réponses incertaines, la déconnexion et les comptes désactivés. Un scénario utilise les valeurs maximales autorisées sans espaces pour vérifier l’absence de débordement sur mobile.

`tests/visual/staff.spec.ts` vérifie les états connexion, formulaire, historique, prévisualisation et confirmation à 1440 px et 390 px. Les captures de revue restent locales dans `.impeccable/review/`, ignoré par Git ; les six références publiques restent inchangées.

### Isolation de Mailjet

`tests/e2e/server/start.cjs` lance Next.js avec `NODE_ENV=production`, des identifiants factices et Nock. Les requêtes sortantes sont interdites sauf vers la boucle locale ; les appels à Mailjet sont interceptés côté serveur. La réservation réussie traverse donc le formulaire, l'action serveur et le SDK jusqu'à la frontière HTTP simulée. Les messages capturés sont inspectés par le test.

Les messages capturés sont écrits uniquement dans `test-results/mailjet-<port>.json`. Le serveur est lancé par la même entrée Next.js que `next start` ; l'interception appartient aux tests et n'est pas incluse dans l'image Docker.

Les comparaisons de contenu arrêtent les seuls intervalles des carrousels dans le navigateur de test, pour maintenir la première diapositive. Les tests de lecture automatique exercent séparément les vrais minuteurs avec l'horloge Playwright.

### Référence de contenu

`tests/fixtures/public-content.json` contient les valeurs de référence des 72 pages. Les espaces sont normalisés et la base du CDN est remplacée par `<CDN>/` ; le reste du contenu est comparé strictement.

Ne pas régénérer cette référence pour faire disparaître un échec. Lors d'une modification éditoriale autorisée, examiner et mettre à jour uniquement les entrées concernées. Une erreur de texte, de lien ou de média doit rester visible dans le diff.

## Régressions visuelles

Six captures de référence couvrent l'accueil, les hébergements et la réservation sur ordinateur (1440 × 1000) et mobile (390 × 844). Elles sont versionnées dans `tests/visual/snapshots/` et contrôlées en CI.

Le navigateur utilise les polices du build, une date fixe, des réponses d'images locales déterministes et des animations neutralisées uniquement pour la capture. Le CDN est vérifié séparément par l'audit réel.

```bash
bun run build
bun run test:e2e:visual

# Uniquement pour une modification visuelle souhaitée et examinée
bun run test:e2e:visual --update-snapshots
```

Pour comparer les captures, utiliser Linux et la version Chromium correspondant à `bun.lock`. Le premier enregistrement d'une référence n'est pas une preuve de conformité au site d'origine ; la référence de contenu provient, elle, de l'état avant migration.

## Médias réels

```bash
bun run test:e2e:media
```

Ce contrôle utilise les vraies ressources distantes, sans remplacement des images. Une panne réseau ou un média manquant fait échouer le test. Voir [le rapport des médias](./media-audit.md) pour la 404 préexistante détectée sur le spa.

## CI

`.github/workflows/ci.yml` exécute l'installation figée, ESLint, TypeScript, Jest, Prettier, les tests E2E et les régressions visuelles. Un second job construit l'image de production et vérifie le contrôle de santé et l'accueil du conteneur. Les références ne sont jamais mises à jour automatiquement en CI. L'audit réseau est une commande séparée afin de distinguer les erreurs du dépôt des incidents du CDN.

La CI utilise les runners GitHub `ubuntu-24.04` et s'exécute aussi comme workflow réutilisable avant une release stable. `bun run test:deploy` couvre le transfert SSH via bastion et les scénarios de mise à jour : sauvegarde avant remplacement, échec de sauvegarde, artefact corrompu, contrôle de santé en échec et retour arrière avec conservation des données. SSH et Docker sont simulés ; un test SQLite réel vérifie la copie cohérente du WAL. Ces tests ne contactent aucun serveur et n'envoient aucun email.

Les contrôles de `define_env` vérifient aussi les secrets obligatoires, les permissions des fichiers, l'export limité aux variables publiques et le rejet des valeurs multilignes. La configuration POEditor est exclue du fichier transmis à la production.

## Clés de traduction préexistantes

`trad:missing` signale 14 références déjà absentes des dictionnaires d'origine. Elles restent inchangées pour préserver le contenu et le repli existants. Les tests ne synchronisent jamais les traductions depuis POEditor.

## Résultats de validation

La fonctionnalité de confirmation a été vérifiée avec 79 tests Jest, les 106 scénarios E2E, les six comparaisons visuelles publiques et deux parcours visuels de l’espace équipe (bureau et mobile). Les références publiques restent inchangées. Trois attentes de navigation ont échoué pendant une exécution en parallèle du build Docker ; leur rejeu isolé a réussi sur les dix scénarios de navigation. Le build Next.js, TypeScript, Prettier et l’image Docker passent.

Le contrôle du conteneur a confirmé sa réponse au contrôle de santé et à une page interne avec les en-têtes du reverse proxy `www.riadnashira.com`. Il tourne en utilisateur `node`, sans fichier `.env` ni répertoire de tests dans l'image de production. Les dictionnaires, les fichiers publics et la feuille de styles d'origine restent inchangés.

L'audit réseau a réussi 144 contrôles sur 145 : 143 images sur 144 sont disponibles et l'image principale est décodée par le navigateur. La 404 restante est détaillée dans [le rapport des médias](./media-audit.md).

### Vérification Docker de l’espace équipe

Après construction de l’image, `bun run test:docker:staff riad-front:check` exécute `tests/docker/staff-smoke.cjs`. Le script utilise un compte, un secret, un volume et un conteneur jetables. Il vérifie l’utilisateur système `node`, la création et désactivation d’un compte, un cookie sécurisé derrière les en-têtes du domaine public, le rejet anonyme et la prévisualisation avec les quatre liens PDF. Un redémarrage confirme la persistance de la session et de l’historique. Aucun appel d’envoi Mailjet n’est effectué. Le job Docker de CI exécute également ce contrôle.

### Seed de release

`tests/integration/staff-seed.test.ts` exécute le véritable script avec une base temporaire. Il vérifie le compte `booking@riadnashira.com`, le stockage d’un mot de passe haché sans session automatique, l’absence de doublon et la conservation des identifiants, sessions et état désactivé lorsque le seed est rejoué avec un autre secret ou sans secret. Une base neuve sans mot de passe initial valide fait échouer le script.

Le scénario Docker vérifie également la connexion avec le compte créé automatiquement par l’entrypoint, l’empreinte du mot de passe inchangée après redémarrage et la conservation de sa désactivation lors d’une nouvelle exécution du seed.
