-- Création de la base de données
CREATE DATABASE IF NOT EXISTS `theatre_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `theatre_db`;

-- Table `artist`
DROP TABLE IF EXISTS `artist`;
CREATE TABLE `artist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(191) NOT NULL,
  `lastName` varchar(191) NOT NULL,
  `biography` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `artist` (`id`, `firstName`, `lastName`, `biography`) VALUES
(1, 'Jean', 'Dupont', 'Un comédien reconnu pour ses performances comiques.'),
(2, 'Marie', 'Lemoine', 'Chanteuse et actrice de comédies musicales.'),
(3, 'Paul', 'Martin', 'Réalisateur de pièces à succès.'),
(4, 'Clara', 'Smith', 'Une actrice célèbre.'),
(5, 'Lucas', 'Johnson', 'Acteur de théâtre.');

-- Table `category`
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `helpText` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `category` (`id`, `name`, `helpText`) VALUES
(1, 'Comédie', 'Spectacles humoristiques et divertissants.'),
(2, 'Drame', 'Spectacles dramatiques et sérieux.'),
(3, 'Musical', 'Comédies musicales et spectacles musicaux.'),
(4, 'Enfant', 'Spectacles adaptés pour les enfants.');

-- Table `spectacle`
DROP TABLE IF EXISTS `spectacle`;
CREATE TABLE `spectacle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `synopsis` text,
  `duration` time DEFAULT NULL,
  `price` float DEFAULT NULL,
  `language` enum('français','VO','surtitré','audio') DEFAULT 'français',
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `spectacle` (`id`, `title`, `synopsis`, `duration`, `price`, `language`, `category_id`) VALUES
(1, 'Rires à la carte', 'Un spectacle hilarant avec les meilleurs humoristes du moment.', '01:30:00', 35, 'français', 1),
(2, 'Les Misérables', 'Adaptation musicale du célèbre roman de Victor Hugo.', '02:45:00', 70, 'VO', 2),
(3, 'Le Roi des Enfants', 'Un conte enchanteur pour petits et grands.', '01:15:00', 25, 'français', 4),
(4, 'La folie', 'C\'est l\'histoire d\'un développeur Cobol, d\'un développeur ReactJs et une équipe de développeur qui se battent pour finir un projet car ils pensaient que le projet était à rendre pour janvier (spoiler non)', '09:50:00', 20, 'français', 4),
(5, 'Les plus beau chants des armées Française', 'Un ensemble de chants patriote', '02:00:00', 10, 'français', 3);

-- Table `representation`
DROP TABLE IF EXISTS `representation`;
CREATE TABLE `representation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_date` datetime DEFAULT NULL,
  `last_date` datetime DEFAULT NULL,
  `spectacle_id` int NOT NULL,
  `room_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `spectacle_id` (`spectacle_id`),
  KEY `room_id` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `representation` (`id`, `first_date`, `last_date`, `spectacle_id`, `room_id`) VALUES
(1, '2024-12-01 20:00:00', '2024-12-30 20:00:00', 1, 1),
(2, '2024-11-15 19:30:00', '2025-01-15 19:30:00', 2, 1),
(3, '2025-02-01 15:00:00', '2025-02-28 15:00:00', 3, 2),
(4, '2024-12-01 20:10:00', '2025-02-01 20:10:00', 4, 2),
(5, '2024-12-01 20:10:00', '2025-02-20 20:10:00', 5, 2);

-- Table `room`
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `presentation` text,
  `gauge` int DEFAULT NULL,
  `theatre_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `theatre_id` (`theatre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `room` (`id`, `name`, `presentation`, `gauge`, `theatre_id`) VALUES
(1, 'Grande Salle', 'Salle principale avec une excellente acoustique.', 800, 1),
(2, 'Salle Intime', 'Petite salle pour des spectacles intimistes.', 150, 2);

-- Table `theatre`
DROP TABLE IF EXISTS `theatre`;
CREATE TABLE `theatre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `presentation` text,
  `address` text,
  `borough` int DEFAULT NULL,
  `geolocation` point DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `theatre` (`id`, `name`, `presentation`, `address`, `borough`, `geolocation`, `phone`, `email`) VALUES
(1, 'Théâtre de Paris', 'Un lieu emblématique de la culture parisienne.', '15 Rue Blanche, 75009 Paris', 9, NULL, '0142326162', 'contact@theatredeparis.fr'),
(2, 'Comédie Bastille', 'Un théâtre convivial avec une programmation éclectique.', '5 Rue Nicolas Appert, 75011 Paris', 11, NULL, '0172569393', 'info@comediebastille.fr');

DROP TABLE IF EXISTS `Role`;
CREATE TABLE IF NOT EXISTS Role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(50),
    artist_id INT,
    spectacle_id INT,
    FOREIGN KEY (artist_id) REFERENCES Artist(id),
    FOREIGN KEY (spectacle_id) REFERENCES Spectacle(id)
);

DROP TABLE IF EXISTS `Subscriber`;
-- Table Subscriber
CREATE TABLE IF NOT EXISTS Subscriber (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    birthdate DATE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS `Schedule`;
-- Table Schedule
CREATE TABLE IF NOT EXISTS Schedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME,
    booked INT,
    paid BOOLEAN,
    amount FLOAT,
    comment TEXT,
    notation INT,
    reactions JSON
);


INSERT INTO Role (role, artist_id, spectacle_id) VALUES
('Acteur principal', 1, 1),
('Chanteur principal', 2, 2),
('Humoriste', 3, 3),
('Actrice', 4, 4),
('Acteur secondaire', 5, 5);

-- Insertion des données dans la table Subscriber
INSERT INTO Subscriber (username, password, email, birthdate, first_name, last_name) VALUES
('user1', 'password1', 'user1@example.com', '1990-01-01', 'Alice', 'Smith'),
('user2', 'password2', 'user2@example.com', '1985-05-15', 'Bob', 'Johnson'),
('user3', 'password3', 'user3@example.com', '2000-12-20', 'Charlie', 'Brown'),
('user4', 'password4', 'user4@example.com', '1995-03-10', 'Diana', 'White'),
('user5', 'password5', 'user5@example.com', '1998-07-25', 'Edward', 'Black');

-- Insertion des données dans la table Schedule
INSERT INTO Schedule (date, booked, paid, amount, comment, notation, reactions) VALUES
('2024-12-10 19:00:00', 50, TRUE, 1500.00, 'Bonne ambiance.', 5, '{"likes": 10, "dislikes": 1, "surprised": 2, "hugs": 5}'),
('2024-12-11 19:30:00', 30, TRUE, 900.00, 'Spectacle incroyable.', 5, '{"likes": 20, "dislikes": 0, "surprised": 5, "hugs": 10}'),
('2024-12-12 18:00:00', 20, TRUE, 400.00, 'Un peu long.', 3, '{"likes": 5, "dislikes": 3, "surprised": 1, "hugs": 0}'),
('2024-12-13 16:30:00', 15, FALSE, 0.00, 'Annulé.', 0, '{"likes": 0, "dislikes": 5, "surprised": 0, "hugs": 0}'),
('2024-12-14 20:00:00', 45, TRUE, 1350.00, 'Une expérience unique.', 5, '{"likes": 15, "dislikes": 0, "surprised": 3, "hugs": 8}');

-- UPDATE pour teste la requete bonus "Trouver les trois théâtres les plus proches du point de géolocalisation"
UPDATE theatre
SET geolocation = POINT(2.3335, 48.8789) -- longitude, latitude
WHERE id = 1;

UPDATE theatre
SET geolocation = POINT(2.3709, 48.8575) -- longitude, latitude
WHERE id = 2;



-- UPDATE pour teste la requete bonus "Trouver les trois théâtres les plus proches du point de géolocalisation"
-- Trouver dans les synopsis des spectacles ceux qui correspondent le mieux à une sélection de mots.
-- Indice : Il faut d'abord créer un index FULLTEXT sur la colonne synopsis avant
-- d'utiliser la clause MATCH
ALTER TABLE spectacle ADD FULLTEXT(synopsis);

