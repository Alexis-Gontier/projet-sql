-- Créer la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS TheatreDB;

-- Utiliser la base de données
USE TheatreDB;

-- Créer les tables si elles n'existent pas

-- Table Category
CREATE TABLE IF NOT EXISTS Category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    helpText TEXT
);

-- Table Theatre
CREATE TABLE IF NOT EXISTS Theatre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    presentation TEXT,
    address VARCHAR(255) NOT NULL,
    borough VARCHAR(50),
    geolocation POINT,
    phone VARCHAR(20),
    email VARCHAR(255) NOT NULL
);

-- Table Room
CREATE TABLE IF NOT EXISTS Room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gauge INT,
    theatre_id INT,
    FOREIGN KEY (theatre_id) REFERENCES Theatre(id)
);

-- Table Spectacle
CREATE TABLE IF NOT EXISTS Spectacle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    synopsis TEXT,
    duration TIME,
    price FLOAT,
    language ENUM('français', 'VO', 'surtitré', 'audio')
);

-- Table Representation
CREATE TABLE IF NOT EXISTS Representation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_date DATETIME,
    last_date DATETIME,
    spectacle_id INT,
    room_id INT,
    FOREIGN KEY (spectacle_id) REFERENCES Spectacle(id),
    FOREIGN KEY (room_id) REFERENCES Room(id)
);

-- Table Artist
CREATE TABLE IF NOT EXISTS Artist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    biography TEXT
);

-- Table Role
CREATE TABLE IF NOT EXISTS Role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(50),
    artist_id INT,
    spectacle_id INT,
    FOREIGN KEY (artist_id) REFERENCES Artist(id),
    FOREIGN KEY (spectacle_id) REFERENCES Spectacle(id)
);

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