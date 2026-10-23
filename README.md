# Traffic

Réécriture React + TypeScript de l’applet Traffic.java de Manuel Sajus.
30 grilles originales, 3 difficultés, jeu tactile et clavier, historique avec annulation et relecture, solveur BFS dans un Web Worker, records locaux, PWA.

## Développement

```sh
npm install
npm run dev
npm test
npm run build
```

## Vercel

Importer ce dépôt Git dans Vercel, preset Vite, commande `npm run build`, répertoire `dist`. Aucune variable d’environnement, aucun serveur ni compte utilisateur nécessaire. Le fichier `vercel.json` contient cette configuration.
Sur iPhone : ouvrir dans Safari → Partager → Sur l’écran d’accueil.

## Règles

Un glissement de plusieurs cases compte pour un seul coup, comme dans le Java. La grille est gagnée lorsque la voiture rouge atteint le bord droit. Les 30 tableaux `set10` à `set39` sont repris dans `src/levels.ts`. Seule correction : `set16` (Découverte 7) superposait jaune et brun en (4,3) ; la voiture brune est décalée à la colonne 2 (index zéro), pour rendre la grille valide et résoluble. Le solveur calcule le plus petit nombre de glissements jusqu’au bord (limite de 350 000 états explorés). Le jeu continue à fonctionner si aucun indice n’est trouvé.

La progression est stockée dans le navigateur (`traffic-v1`). Aucun envoi de données du jeu. La police utilise Google Fonts avec repli système. Le service worker met en cache les ressources visitées pour une utilisation ultérieure hors ligne ; ouvrir au moins une fois en ligne avant de jouer hors connexion.
