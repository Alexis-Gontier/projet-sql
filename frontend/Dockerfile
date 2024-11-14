# Étape de build avec Node.js version 20 pour construire le frontend
FROM node:20 AS build

# Crée un répertoire de travail
WORKDIR /app

# Copie package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers dans le conteneur
COPY . .

# Exécute la commande de build pour Vite
RUN npm run build

# Utilisation de Nginx pour servir les fichiers statiques en production
FROM nginx:alpine

# Copie les fichiers de construction dans le dossier de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose le port 80 pour servir l'application
EXPOSE 80

# Démarre Nginx
CMD ["nginx", "-g", "daemon off;"]
