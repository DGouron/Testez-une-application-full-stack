# Yoga App - Frontend

Ce projet est le frontend d'une application de gestion de cours de yoga développée avec Angular 14.

## Prérequis

- Node.js (version 14+)
- npm
- Angular CLI 14.1.0

## Installation

1. Cloner le projet
```bash
git clone <url-du-projet>
```

2. Se placer dans le dossier du projet
```bash
cd yoga
```

3. Installer les dépendances
```bash
npm install
```

## Lancement de l'application

Pour démarrer l'application en mode développement :
```bash
npm run start
```

L'application sera accessible à l'adresse : `http://localhost:4200`

## Tests

### Tests Unitaires (Jest)

Pour lancer les tests unitaires :
```bash
npm run test
```

Pour lancer les tests en mode watch :
```bash
npm run test:watch
```

Le rapport de couverture sera généré dans le dossier `coverage/jest`.

### Tests End-to-End (Cypress)

Pour lancer les tests E2E :
```bash
npm run e2e
```

Pour générer le rapport de couverture E2E :
```bash
npm run e2e:coverage
```

Le rapport de couverture Jest sera disponible dans :
```
coverage/lcov-report/index.html
```

## Ressources

### Collection Postman

Pour importer la collection Postman :
1. Utiliser le fichier : `ressources/postman/yoga.postman_collection.json`
2. Suivre la documentation : [Importing data into Postman](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman)

### Base de données MySQL

Le script SQL pour créer le schéma est disponible dans : `ressources/sql/script.sql`

### Compte administrateur par défaut

- Login : yoga@studio.com
- Mot de passe : test!1234

## Structure du Projet

- `src/app/` : Code source principal
  - `components/` : Composants Angular
  - `services/` : Services
  - `models/` : Interfaces et modèles
  - `guards/` : Guards d'authentification

- `src/assets/` : Ressources statiques

- `cypress/` : Tests E2E
  - `e2e/` : Spécifications des tests
  - `fixtures/` : Données de test
  - `support/` : Commandes et configurations

- `src/test/` : Tests unitaires
