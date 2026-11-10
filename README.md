# TP Vue.js — 11 novembre 2026

Deux projets basés sur les starters du professeur Ahmed Bentajer :

- [TP 7 — Explorateur d'API REST](TP7/) : liste de pays et page de détail.
- [TP 8 — Migration Composition API et Pinia](TP8/) : gestionnaire de tâches.

Dans un terminal, pour lancer un des projets :

```bash
cd TP7
npm install
npm run dev
```

Pour l'autre projet, remplacer `TP7` par `TP8`. Ouvrir l'adresse affichée dans le terminal. Pour arrêter le serveur : Ctrl+C. Le TP 7 nécessite Internet pour contacter l'API ; le chargement initial du TP 8 est simulé et ne sauvegarde pas les tâches après actualisation.

**Limite du TP 7 :** l'adresse REST Countries v3.1 prescrite dans l'énoncé répond désormais qu'elle est abandonnée. La version actuelle nécessite une clé API. Le programme signale l'erreur ; la liste et les détails ne peuvent pas être testés en direct avec cette ancienne adresse. Voir la [documentation de migration de REST Countries](https://restcountries.com/docs/countries/legacy-api-deprecation).
