# Yoga App - Backend

Ce projet est le backend d'une application de gestion de cours de yoga développée avec Spring Boot.

## Prérequis

- Java 17
- Maven
- MySQL

## Installation

1. Cloner le projet
```bash
git clone <url-du-projet>
```

2. Configurer la base de données MySQL dans `src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/yoga
spring.datasource.username=votre_username
spring.datasource.password=votre_password
```

3. Installer les dépendances
```bash
mvn clean install
```

## Lancement de l'application

Pour démarrer l'application :
```bash
mvn spring-boot:run
```

L'application sera accessible à l'adresse : `http://localhost:8080`

## Tests et Couverture de Code

### Lancer les tests
Pour exécuter les tests et générer le rapport de couverture :
```bash
mvn clean test
```

### Consulter le rapport de couverture
Après l'exécution des tests, le rapport de couverture JaCoCo sera généré dans :
- Format HTML : `target/site/jacoco/index.html`
- Format XML : `target/site/jacoco/jacoco.xml`

Pour ouvrir le rapport HTML dans votre navigateur :

```bash
open target/site/jacoco/index.html  # Sur MacOS
xdg-open target/site/jacoco/index.html  # Sur Linux
start target/site/jacoco/index.html  # Sur Windows
```

## Structure du Projet

- `src/main/java/com/openclassrooms/starterjwt/` : Code source principal
  - `controllers/` : Contrôleurs REST
  - `models/` : Entités JPA
  - `services/` : Logique métier
  - `repositories/` : Accès aux données
  - `security/` : Configuration de sécurité

- `src/test/java/com/openclassrooms/starterjwt/` : Tests
  - `integration/` : Tests d'intégration
  - `unit/` : Tests unitaires

## API Endpoints

- Auth
  - POST `/api/auth/login` : Connexion
  - POST `/api/auth/register` : Inscription

- Sessions
  - GET `/api/session` : Liste des sessions
  - GET `/api/session/{id}` : Détails d'une session
  - POST `/api/session` : Créer une session
  - PUT `/api/session/{id}` : Modifier une session
  - DELETE `/api/session/{id}` : Supprimer une session

- Users
  - GET `/api/user/{id}` : Détails d'un utilisateur
  - DELETE `/api/user/{id}` : Supprimer un utilisateur

- Teachers
  - GET `/api/teacher` : Liste des professeurs
  - GET `/api/teacher/{id}` : Détails d'un professeur