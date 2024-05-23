# Things to do:

- [x] MatchSession -> real implementation
- [x] Module database Knex
- [x] Standard CQRS
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
- [ ] CI
- [ ] CD

# Lunch Projet

- git pull && npm i
- docker-compose up
- npx nx run lets-play-now:serve

# Exigences métier:

Permettre à des joueurs de jeu de société de trouver des joueurs autour de chez eux a des horaires données

Scope du MVP :

Permettre des players créer une "Session" sur des horaires et lieu données
Permettre à des players de trouver des "Sessions" autour de chez eux à un moment données

----- Aider un joueur à choisir une session

- lier une session à un ou plusieur jeux
  - limites du nombre de jeux ?
  - pas de doublons dans la liste ?
  - limite de caractères pour le nom du jeux ?

----- Inscription à une session

- limiter le nombre de joueur
- joueur: adresse mail

---- Inviter d'autre joueur à ta session

- générer un lien pour prendre une place (affichage stylé)

---- Chat de Session

--- Profil de joueur

- bibliothèque de jeux

--- Permettre à l'organisateur de mettre à disposition sa bibliothèque pour la session

# Notes pour la prochaine fois:

- implem la partie infra de create-session (ajout des games)
