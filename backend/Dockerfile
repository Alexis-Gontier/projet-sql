# Utilise l'image officielle Node.js version 20
FROM node:20

# Crée un répertoire de travail pour l'application
WORKDIR /app

# Copie les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Installe nodemon globalement pour le développement
RUN npm install -g nodemon

# Copie le reste des fichiers de l'application dans le conteneur
COPY . .

# Expose le port utilisé par le backend
EXPOSE 5000

# Utilise nodemon pour surveiller les modifications du code et redémarrer le serveur
CMD ["nodemon", "server.js"]
