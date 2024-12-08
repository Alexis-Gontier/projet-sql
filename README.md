# Projet FullStack (Frontend, Backend, Nginx, MySQL)

Ce projet est une application fullstack qui utilise **React.js** pour le frontend, **Node.js avec Express.js** pour le backend, et **MySQL** comme base de données. L'ensemble de l'application est conteneurisé avec **Docker** pour faciliter la gestion des différents services.

### Architecture

1. **Frontend** : Utilise **React.js** pour l'interface utilisateur.
2. **Backend** : Utilise **Node.js** avec le framework **Express.js** pour gérer les appels API.
3. **Base de données** : **MySQL** pour stocker les données.
4. **Reverse Proxy** : **Nginx** est utilisé comme reverse proxy pour rediriger les requêtes vers le frontend et le backend.

### Prérequis

Avant de commencer, vous devez avoir installé **Docker** et **Docker Compose** sur votre machine.

- Docker: [https://www.docker.com/get-started](https://www.docker.com/get-started)
- Docker Compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

### Installation

1. Clonez le dépôt sur votre machine locale :

    ```bash
    git clone https://github.com/Alexis-Gontier/projet-sql.git
    ```

2. Assurez-vous que le fichier `.env` est configuré correctement avec vos variables d'environnement pour la base de données et le serveur.

3. Exécutez les commandes suivantes pour démarrer le projet avec Docker Compose :

    ```bash
    docker-compose up --build
    ```

Cela va télécharger toutes les images nécessaires, construire les conteneurs et démarrer les services (Frontend, Backend, MySQL, Nginx).

### Structure des dossiers

L'arborescence du projet est la suivante :

Voici un exemple de fichier README.md pour ton projet, qui couvre l'installation, l'utilisation, et les détails techniques de l'architecture.

markdown
Copier le code
# Projet FullStack (Frontend, Backend, Nginx, MySQL)

Ce projet est une application fullstack qui utilise **React.js** pour le frontend, **Node.js avec Express.js** pour le backend, et **MySQL** comme base de données. L'ensemble de l'application est conteneurisé avec **Docker** pour faciliter la gestion des différents services.

### Architecture

1. **Frontend** : Utilise **React.js** pour l'interface utilisateur.
2. **Backend** : Utilise **Node.js** avec le framework **Express.js** pour gérer les appels API.
3. **Base de données** : **MySQL** pour stocker les données.
4. **Reverse Proxy** : **Nginx** est utilisé comme reverse proxy pour rediriger les requêtes vers le frontend et le backend.

### Prérequis

Avant de commencer, vous devez avoir installé **Docker** et **Docker Compose** sur votre machine.

- Docker: [https://www.docker.com/get-started](https://www.docker.com/get-started)
- Docker Compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

### Installation

1. Clonez le dépôt sur votre machine locale :

    ```bash
    git clone https://github.com/votre-utilisateur/votre-repository.git
    cd votre-repository
    ```

2. Assurez-vous que le fichier `.env` est configuré correctement avec vos variables d'environnement pour la base de données et le serveur.

3. Exécutez les commandes suivantes pour démarrer le projet avec Docker Compose :

    ```bash
    docker-compose up --build
    ```

Cela va télécharger toutes les images nécessaires, construire les conteneurs et démarrer les services (Frontend, Backend, MySQL, Nginx).



