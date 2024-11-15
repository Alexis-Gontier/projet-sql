-- Création de la db
CREATE DATABASE events;
USE events;

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

--table Category
INSERT INTO Category (name, helpText) 
VALUES 
('Théâtre', 'Catégorie des spectacles théâtraux.'),
('Concert', 'Catégorie des concerts musicaux.'),
('Danse', 'Catégorie des spectacles de danse.');

-- table Theatre
INSERT INTO Theatre (name, presentation, address, borough, geolocation, phone, email) 
VALUES 
('Théâtre des champs', 'Un grand théâtre parisien proposant diverses représentations artistiques.', '123 Rue de Paris, 75004 Paris', 4, POINT(2.3522, 48.8566), '01 23 45 67 89', 'contact@theatredelaville.com'),
('Opéra Garnier', 'Opéra historique avec une architecture emblématique.', '8 Rue Scribe, 75009 Paris', 9, POINT(2.3322, 48.8708), '01 44 71 15 15', 'info@operagarnier.com');

--table Room
INSERT INTO Room (name, gauge, theater_id) 
VALUES 
('Salle Principale', 500, 1),
('Salle Secondaire', 300, 1),
('Grande Salle', 1500, 2);

--table Spectacle
INSERT INTO Spectacle (title, synopsis, duration, price, language) 
VALUES 
('Le Petit Prince', 'Adaptation théâtrale du célèbre livre.', '02:30:00', 25.00, 'français'),
('Symphonie No.5', 'Concert de la Symphonie No.5 de Beethoven.', '01:45:00', 40.00, 'VO'),
('Bal', 'Spectacle de danse contemporaine.', '01:30:00', 30.00, 'surtitré');

--table Artist
INSERT INTO Artist (firstName, lastName, biography) 
VALUES 
('Vicent', 'Cassel', 'Acteur renommé avec une carrière de plus de 20 ans dans le théâtre.'),
('Inva', 'Mula', 'Chanteuse d opéra avec plusieurs récompenses internationales.');

--table Role
INSERT INTO Role (role, artist_id, spectacle_id) 
VALUES 
('Acteur', 1, 1),
('Chef d orchestre', 2, 2);

--table Representation
INSERT INTO Representation (first_date, last_date, spectacle_id, room_id) 
VALUES 
('2024-12-01 19:00:00', '2024-12-31 21:00:00', 1, 1),
('2024-11-15 20:00:00', '2024-11-20 20:00:00', 2, 3),
('2024-10-05 18:30:00', '2024-10-25 18:30:00', 3, 2);

--table Schedule
INSERT INTO Schedule (date, booked, paid, amount, comment, notation, reactions) 
VALUES 
('2024-12-01 19:00:00', 10, TRUE, 250.00, 'Première représentation de "Le Petit Prince".', 5, '{"likes": 100, "shares": 50}'),
('2024-11-15 20:00:00', 150, TRUE, 6000.00, 'Concert de la Symphonie No.5.', 4, '{"likes": 200, "shares": 80}'),
('2024-10-05 18:30:00', 50, FALSE, 1500.00, 'Bal inaugurale.', 5, '{"likes": 300, "shares": 150}');

-- table Subscriber
INSERT INTO Subscriber (username, password, email, birthdate, first_name, last_name) 
VALUES 
('jdupont', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36D4EJtq/4e0nVRFJQG8JkW', 'jdupont@example.com', '1990-05-15', 'Jean', 'Dupont'),
('mcurie', '$2y$10$KIXZaYVK1fsbw1ZfbX3OXePaWxn96p36D4EJtq/4e0nVRFJQG8JkX', 'mcurie@example.com', '1985-11-30', 'Marie', 'Curie');
