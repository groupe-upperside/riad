# Audit des médias

L'audit Playwright utilise les URL d'images de la référence de contenu, avec de véritables requêtes HTTP. Il vérifie le statut 200, le type MIME image et un corps non vide, puis le décodage de l'image principale par Chromium.

```bash
bun run build
bun run test:e2e:media
```

## Résultat du 29 octobre 2026

- 144 images distinctes inspectées.
- 143 URL accessibles et valides.
- L'image principale est décodée par Chromium.
- Une ressource renvoie une 404 : `https://1-files-biotech-dental-clt-cdn.secure4all.xyz/data/Riad/spa/spa_pools_3.jpg`.

Cette référence existait avant la migration et concerne le spa. L'audit conserve cet échec : il faut restaurer le fichier attendu sur le CDN ou confirmer l'URL du média voulu. Aucune autre photographie n'est substituée automatiquement.

Les tests visuels utilisent des images de remplacement locales pour comparer la mise en page de façon reproductible. Ils ne remplacent pas cet audit réseau. L'audit reste une commande distincte de la CI de contenu et de rendu : il dépend de la disponibilité des services distants.
