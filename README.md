# TP Vue.js — 11 novembre 2026

Trois projets basés sur les starters du professeur Ahmed Bentajer :

- [TP 7 — Explorateur d'API REST](TP7/) : liste de pays et page de détail.
- [TP 8 — Migration Composition API et Pinia](TP8/) : gestionnaire de tâches.
- [TP 9 — Météo en direct](TP9/) : recherche de ville, météo et prévisions.

Dans un terminal, pour lancer un des projets :

```bash
cd TP7
npm install
npm run dev
```

Pour un autre projet, remplacer `TP7` par `TP8` ou `TP9`. Ouvrir l'adresse affichée dans le terminal. Pour arrêter le serveur : Ctrl+C. Le TP 7 nécessite Internet pour contacter l'API ; le chargement initial du TP 8 est simulé et ne sauvegarde pas les tâches après actualisation.

Pour le TP 9, copier `TP9/.env.example` dans `TP9/.env`, puis renseigner sa clé OpenWeatherMap. Le fichier `.env` reste local. Les variables `VITE_` sont accessibles au navigateur : ne pas y placer de secret qui doit rester privé pour les utilisateurs de l'application. Le serveur doit être redémarré après modification du fichier `.env`.

**TP 7 :** l'ancienne API REST Countries indiquée dans l'énoncé a été remplacée par [countries.dev](https://countries.dev/docs), accessible sans clé. Les champs ont été adaptés : `name`, `alpha3Code` et `capital`. Cette API fournit le nom local plutôt que le nom officiel.
