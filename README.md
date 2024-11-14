# projet-sql

## Pour lancer le projet **front** et **back** en meme temps
```bash
cd projet-sql
npm run dev
```

### Pour lancer le projet **front**
```bash
cd frontend
npm run dev
```
`http://localhost:5173/`

### Pour lancer le projet **back**
```bash
cd backend
npm start
```
`http://localhost:3000/`

## Commande docker


À la racine du projet, pour démarrer les services avec Docker Compose, utilisez la commande suivante :
```bash
docker-compose up --build
```
Cela va :
- Construire les images pour le backend (avec Node.js 18) et le frontend.
- Démarrer le service MySQL avec l’initialisation de la base de données via le fichier init.sql.
- Démarrer le backend avec nodemon pour le mode développement.
- Démarrer le frontend avec Vite.

Une fois tous les services démarrés :
- Le frontend sera accessible sur http://localhost:3000.
- Le backend sera accessible sur http://localhost:5000.
- La base de données MySQL sera disponible sur le port 3306.

---

  ```sh
  docker compose up --build
  ```

  Démarre les conteneurs définis dans le fichier _docker-compose.yml_ et force la reconstruction des images Docker. Idéal pour actualiser les images après des modifications de code ou de configuration.

- **make start:**

  ```sh
  docker compose up -d
  ```

  Démarre les conteneurs en mode détaché (en arrière-plan). Cela permet de les exécuter sans bloquer le terminal.

- **make stop:**

  ```sh
  docker compose down
  ```

  Arrête et supprime les conteneurs créés avec _docker compose up_. Les volumes et réseaux persistent, sauf si explicitement supprimés.
