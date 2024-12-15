-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 15 déc. 2024 à 06:16
-- Version du serveur : 8.0.31
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `theatre_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `artist`
--

DROP TABLE IF EXISTS `artist`;
CREATE TABLE IF NOT EXISTS `artist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(191) NOT NULL,
  `lastName` varchar(191) NOT NULL,
  `biography` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `artist`
--

INSERT INTO `artist` (`id`, `firstName`, `lastName`, `biography`) VALUES
(1, 'Jean', 'Dupont', 'Un comédien reconnu pour ses performances comiques.'),
(2, 'Marie', 'Lemoine', 'Chanteuse et actrice de comédies musicales.'),
(3, 'Paul', 'Martin', 'Réalisateur de pièces à succès.');

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `helpText` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`, `helpText`) VALUES
(1, 'Comédie', 'Spectacles humoristiques et divertissants.'),
(2, 'Drame', 'Spectacles dramatiques et sérieux.'),
(3, 'Musical', 'Comédies musicales et spectacles musicaux.'),
(4, 'Jeune Public', 'Spectacles adaptés pour les enfants.');

-- --------------------------------------------------------

--
-- Structure de la table `representation`
--

DROP TABLE IF EXISTS `representation`;
CREATE TABLE IF NOT EXISTS `representation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_date` datetime DEFAULT NULL,
  `last_date` datetime DEFAULT NULL,
  `spectacle_id` int NOT NULL,
  `room_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `spectacle_id` (`spectacle_id`),
  KEY `room_id` (`room_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `representation`
--

INSERT INTO `representation` (`id`, `first_date`, `last_date`, `spectacle_id`, `room_id`) VALUES
(1, '2024-12-01 20:00:00', '2024-12-30 20:00:00', 1, 1),
(2, '2024-11-15 19:30:00', '2025-01-15 19:30:00', 2, 1),
(3, '2025-02-01 15:00:00', '2025-02-28 15:00:00', 3, 2);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` enum('acteur','réalisateur','producteur') NOT NULL,
  `artist_id` int NOT NULL,
  `spectacle_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role` (`role`,`artist_id`,`spectacle_id`),
  KEY `artist_id` (`artist_id`),
  KEY `spectacle_id` (`spectacle_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `role`, `artist_id`, `spectacle_id`) VALUES
(1, 'acteur', 1, 1),
(2, 'acteur', 2, 2),
(3, 'réalisateur', 3, 3);

-- --------------------------------------------------------

--
-- Structure de la table `room`
--

DROP TABLE IF EXISTS `room`;
CREATE TABLE IF NOT EXISTS `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `presentation` text,
  `gauge` int DEFAULT NULL,
  `theatre_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `theatre_id` (`theatre_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `room`
--

INSERT INTO `room` (`id`, `name`, `presentation`, `gauge`, `theatre_id`) VALUES
(1, 'Grande Salle', 'Salle principale avec une excellente acoustique.', 800, 1),
(2, 'Salle Intime', 'Petite salle pour des spectacles intimistes.', 150, 2);

-- --------------------------------------------------------

--
-- Structure de la table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `booked` int DEFAULT NULL,
  `paid` tinyint(1) DEFAULT '0',
  `amount` float DEFAULT NULL,
  `comment` text,
  `notation` int DEFAULT NULL,
  `reactions` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `schedule`
--

INSERT INTO `schedule` (`id`, `date`, `booked`, `paid`, `amount`, `comment`, `notation`, `reactions`) VALUES
(1, '2024-12-01 20:00:00', 120, 1, 35, 'Super spectacle, très drôle.', 5, '{\"likes\": 120, \"shares\": 20}'),
(2, '2024-11-15 19:30:00', 450, 1, 70, 'Émouvant et magnifiquement interprété.', 4, '{\"likes\": 300, \"shares\": 50}');

-- --------------------------------------------------------

--
-- Structure de la table `spectacle`
--

DROP TABLE IF EXISTS `spectacle`;
CREATE TABLE IF NOT EXISTS `spectacle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `synopsis` text,
  `duration` time DEFAULT NULL,
  `price` float DEFAULT NULL,
  `language` enum('français','VO','surtitré','audio') DEFAULT 'français',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `spectacle`
--

INSERT INTO `spectacle` (`id`, `title`, `synopsis`, `duration`, `price`, `language`) VALUES
(1, 'Rires à la carte', 'Un spectacle hilarant avec les meilleurs humoristes du moment.', '01:30:00', 35, 'français'),
(2, 'Les Misérables', 'Adaptation musicale du célèbre roman de Victor Hugo.', '02:45:00', 70, 'VO'),
(3, 'Le Roi des Enfants', 'Un conte enchanteur pour petits et grands.', '01:15:00', 25, 'français');

-- --------------------------------------------------------

--
-- Structure de la table `subscriber`
--

DROP TABLE IF EXISTS `subscriber`;
CREATE TABLE IF NOT EXISTS `subscriber` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(191) NOT NULL,
  `birthdate` datetime DEFAULT NULL,
  `first_name` varchar(191) DEFAULT NULL,
  `last_name` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `subscriber`
--

INSERT INTO `subscriber` (`id`, `username`, `password`, `email`, `birthdate`, `first_name`, `last_name`) VALUES
(1, 'johndoe', 'password123', 'john.doe@example.com', '1990-05-15 00:00:00', 'John', 'Doe'),
(2, 'janedoe', 'password456', 'jane.doe@example.com', '1985-08-20 00:00:00', 'Jane', 'Doe');

-- --------------------------------------------------------

--
-- Structure de la table `theatre`
--

DROP TABLE IF EXISTS `theatre`;
CREATE TABLE IF NOT EXISTS `theatre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `presentation` text,
  `address` text,
  `borough` int DEFAULT NULL,
  `geolocation` point DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `theatre`
--

INSERT INTO `theatre` (`id`, `name`, `presentation`, `address`, `borough`, `geolocation`, `phone`, `email`) VALUES
(1, 'Théâtre de Paris', 'Un lieu emblématique de la culture parisienne.', '15 Rue Blanche, 75009 Paris', 9, 0x000000000101000000d49ae61da7704840894160e5d0a20240, '0142326162', 'contact@theatredeparis.fr'),
(2, 'Comédie Bastille', 'Un théâtre convivial avec une programmation éclectique.', '5 Rue Nicolas Appert, 75011 Paris', 11, 0x0000000001010000002041f163cc6d4840492eff21fdf60240, '0172569393', 'info@comediebastille.fr');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
