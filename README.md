# Things to do:

- [x] MatchSession -> real implementation
- [x] Module database Knex
- [ ] CQRS
- [ ] Initier le projet frontend
- [x] Revoir l'architecture
  - [x] Bouger primary-adapters dans Presentation layer
  - [x] Lib par bounded context plutôt que par layer
  - [x] S'assurer de pouvoir retirer le TODO apps/lets-play-now/src/app/app.module.ts
- [ ] Ajouter des tests d'architecture (ex: dependency cruiser, tsarch)
- [ ] Gestion d'erreur (ex: err db)
- [ ] Ajouter des e2e (+ definir si ca part du front ou du back aussi)
- [ ] Ajouter de la validation sur les dto de controller
- [x] Automatiser les migration au lancement du serveur

# Lunch Projet

- git pull && npm i
- docker-compose up
- npx nx run lets-play-now:serve

# Exigences métier:

Permettre à des joueurs de jeu de société de trouver des joueurs autour de chez eux a des horaires données

Scope du MVP :

Permettre des players créer une "Session" sur des horaires et lieu données
Permettre à des players de trouver des "Sessions" autour de chez eux à un moment données

Exemple de "Session" :
// - Jeu/type/categorie : Ark nova/Jeu expert/Deck building/Libre // sur l'evenement

Lieu : 12 rue de la rue // sur l'evenement
disponibilité : soir, // sur l'evenement
// - Nb de players max : 4 // sur une session

Exemple de Player :

username
lieu
disponibilités
