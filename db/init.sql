-- Crée la base de données si elle n'existe pas déjà
CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};

-- Utilise la base de données
USE ${DATABASE_NAME};

-- Crée la table 'events' si elle n'existe pas
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    description TEXT,
    location VARCHAR(255)
);

-- Insère des données initiales dans la table 'events'
INSERT INTO events (name, date, description, location)
VALUES
    ('Concert de Rock', '2024-12-25 20:00:00', 'Un concert de rock incroyable avec de nombreux groupes.', 'Stade de Paris'),
    ('Conférence sur la technologie', '2024-12-30 09:00:00', 'Une conférence sur les dernières tendances technologiques.', 'Centre de conférence Lyon'),
    ('Exposition d art', '2024-12-15 18:00:00', 'Une exposition d art contemporain avec des artistes locaux.', 'Musée d art moderne Marseille');

-- -- Donne les permissions à l'utilisateur sur la base de données (facultatif si vous avez un utilisateur spécifique)
-- GRANT ALL PRIVILEGES ON ${DATABASE_NAME}.* TO '${DATABASE_USER}'@'%' IDENTIFIED BY '${DATABASE_PASSWORD}';

-- -- Rafraîchit les privilèges pour que les changements prennent effet immédiatement
-- FLUSH PRIVILEGES;
