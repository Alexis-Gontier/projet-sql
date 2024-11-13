-- Création de la db
CREATE DATABASE annuaire;
USE annuaire;

-- Table Category
CREATE TABLE Category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    helpText TEXT
);

-- Table Theatre
CREATE TABLE Theatre (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    presentation TEXT,
    address VARCHAR(255),
    borough INT,
    geolocation POINT,
    phone VARCHAR(20),
    email VARCHAR(255)
);
-- Table Room
CREATE TABLE Room (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    gauge INT,
    theater_id INT,
    FOREIGN KEY (theater_id) REFERENCES Theatre(id)
);

-- Table Spectacle
CREATE TABLE Spectacle (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    synopsis TEXT,
    duration TIME,
    price FLOAT,
    language ENUM('français', 'VO', 'surtitré', 'audio') DEFAULT 'français'
);
-- Table Artist
CREATE TABLE Artist (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    biography TEXT
);

-- Table Role
CREATE TABLE Role (
    role VARCHAR(255) NOT NULL = acteur,
    artist_id INT,
    spectacle_id INT,
    PRIMARY KEY (role, artist_id, spectacle_id),
    FOREIGN KEY (artist_id) REFERENCES Artist(id),
    FOREIGN KEY (spectacle_id) REFERENCES Spectacle(id)
);

-- Table Representation
CREATE TABLE Representation (
    first_date DATETIME,
    last_date DATETIME,
    spectacle_id INT,
    room_id INT,
    PRIMARY KEY (first_date, spectacle_id, room_id),
    FOREIGN KEY (spectacle_id) REFERENCES Spectacle(id),
    FOREIGN KEY (room_id) REFERENCES Room(id)
);

-- Table Schedule
CREATE TABLE Schedule (
    date DATETIME,
    booked INT DEFAULT 0,
    paid BOOLEAN DEFAULT FALSE,
    amount FLOAT,
    comment TEXT,
    notation INT,
    reactions JSON,
    PRIMARY KEY (date)
);
-- Table Subscriber
CREATE TABLE Subscriber (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    birthdate DATETIME,
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

--INsert