CREATE DATABASE IF NOT EXISTS events;
USE events;

-- Table Category
CREATE TABLE IF NOT EXISTS Category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    helpText TEXT
);

-- Table Theatre
CREATE TABLE IF NOT EXISTS Theatre (
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
CREATE TABLE IF NOT EXISTS Room (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    gauge INT,
    theater_id INT,
    FOREIGN KEY (theater_id) REFERENCES Theatre(id)
);

-- Other tables (Spectacle, Artist, Role, etc.) would follow the same pattern.
