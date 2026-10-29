# Architecture

La structure reprend `bda-front`, avec les adaptations nécessaires au site du riad.

## Socle commun

Next.js 16 App Router et React, TypeScript strict, Tailwind CSS 4 sans fichier de configuration JavaScript, next-intl, Bun pour les dépendances et Node.js comme runtime. Le compilateur React est activé. `proxy.ts` assure le routage internationalisé ; `next.config.ts` branche la configuration next-intl et produit une sortie standalone.

Les pages publiques sont des composants serveur. Les interactions restent dans les composants clients : menus, formulaires, carrousels et animations. Le layout de langue fournit les polices et les traductions ; `(site)/layout.tsx` assemble l'en-tête, le contenu et le pied de page. `components/common/providers.tsx` rassemble les fournisseurs clients.

Les composants métier sont rangés dans `components/features/<domaine>`. Les types partagés sont dans `types/*.type.ts`. Les données de présentation sont réparties dans `lib/constants/` avec des imports directs. `cn()` réside dans `lib/utils/cn.ts`.

## Compatibilité du riad

Les dictionnaires JSON, textes, médias, routes, classes CSS, couleurs, polices et animations du riad sont conservés. Le thème reste celui du riad : l'alignement concerne les conventions techniques, sans appliquer la charte graphique de BDA.

Les six langues et `localePrefix: 'always'` sont conservés. Le chargement des dictionnaires utilise des imports statiquement analysables comme `bda-front`. Le repli sur les messages anglais reste disponible côté serveur et client.

Le riad ne dispose pas d'un `bda-api` : ses réservations continuent à utiliser son action serveur Mailjet et son endpoint `/api/send-booking`. Le contrat et les messages existants sont conservés. Aucun panier, paiement Stripe, authentification ou back-office BDA n'est ajouté.

Les erreurs TypeScript restent bloquantes pendant le build, en complément de `check-types`. Les redirections historiques, domaines, politiques de sécurité et services externes propres à BDA ne sont pas repris, car ils ne décrivent pas ce site.

## Outillage

Bun et `bun.lock`, configurations ESLint/Prettier/EditorConfig, Husky, lint-staged, Conventional Commits, Jest/Testing Library et Playwright suivent la structure de référence. Les scripts POEditor conservent leur format de données et utilisent `tsconfig.scripts.json`.

## Composition et mutualisation

Les pages Confort, Deluxe et Suites délèguent à `RoomDetailPage`, alimenté par `ROOM_DETAILS`. Les suites spéciales gardent leur composition propre et réutilisent les mêmes sections. `RoomsShowcase` porte la grille et le parallaxe communs à l'accueil et aux hébergements.

`BookingBanner`, `RoomBookingCta`, `ShowcaseHeader`, `ButtonLink`, `ContactItem` et `SocialLinks` couvrent leurs usages répétés. Les champs de réservation partagent leur présentation sans construire de moteur de formulaire générique. `useMediaQuery` partage les abonnements aux seuils d'écran. Les modèles utilisés par les données et les composants résident dans `types/`.

## Espace équipe

Le groupe `(staff)` fournit un layout indépendant pour `/admin`, sans modifier le shell public ni ses traductions. Les pages privées et toutes les routes `/api/staff/` vérifient la session côté serveur. Better Auth utilise SQLite via `node:sqlite`, avec inscription publique désactivée et comptes provisionnés par la commande `staff:user`.

`lib/confirmations/` sépare validation, rendu des modèles, stockage et orchestration des envois. `lib/email/mailjet.ts` est un transport serveur privé ; seule la demande publique vers le riad reste une Server Action. Le navigateur confirme un identifiant et un jeton de prévisualisation, jamais du HTML libre. Les contraintes SQL et la transition atomique du brouillon empêchent les doubles envois.

Le volume Docker conserve la base de comptes, sessions et historique. Les templates paramétrés et leurs images issues des HTML fournis sont dans `email-templates/`. La configuration, les statuts et les limites sont détaillés dans [le guide de l’espace équipe](./staff-confirmations.md).
