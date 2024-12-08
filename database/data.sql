-- Insertion des données dans la table Category
INSERT INTO Category (name, helpText) VALUES
('Comédie', 'Pièces humoristiques.'),
('Drame', 'Pièces sérieuses ou tragiques.'),
('Musical', 'Spectacles chantés.'),
('Stand-up', 'Humour direct.'),
('Enfants', 'Spectacles pour les plus jeunes.');

-- Insertion des données dans la table Theatre
INSERT INTO Theatre (name, presentation, address, borough, geolocation, phone, email) VALUES
('Théâtre Royal', 'Théâtre historique au centre-ville.', '123 Rue Principale', 'Centre', POINT(48.8566, 2.3522), '0123456789', 'contact@theatre-royal.com'),
('Opéra Lumière', 'Lieu prestigieux pour les spectacles lyriques.', '45 Avenue Lumière', 'Nord', POINT(48.8566, 2.3622), '0987654321', 'contact@opera-lumiere.com'),
('Studio Moderne', 'Scène contemporaine.', '12 Rue des Arts', 'Est', POINT(48.8570, 2.3430), '0567890123', 'contact@studio-moderne.com');

-- Insertion des données dans la table Room
INSERT INTO Room (name, gauge, theatre_id) VALUES
('Salle 1', 200, 1),
('Salle 2', 150, 1),
('Salle Opéra', 500, 2),
('Petit Studio', 100, 3),
('Grande Scène', 300, 3);

-- Insertion des données dans la table Spectacle
INSERT INTO Spectacle (title, synopsis, duration, price, language) VALUES
('Le Malade Imaginaire', 'Une comédie classique de Molière.', '02:30:00', 30.00, 'français'),
('Carmen', 'Un opéra tragique et passionné.', '03:00:00', 50.00, 'VO'),
('Stand-up Comedy Night', 'Un spectacle hilarant avec plusieurs humoristes.', '01:45:00', 20.00, 'français'),
('Le Petit Prince', 'Une pièce adaptée du livre célèbre.', '02:00:00', 25.00, 'audio'),
('Les Misérables', 'Un drame musical épique.', '03:15:00', 60.00, 'surtitré');

-- Insertion des données dans la table Representation
INSERT INTO Representation (first_date, last_date, spectacle_id, room_id) VALUES
('2024-12-10 20:00:00', '2024-12-10 22:30:00', 1, 1),
('2024-12-11 20:00:00', '2024-12-11 23:00:00', 2, 3),
('2024-12-12 19:00:00', '2024-12-12 20:45:00', 3, 4),
('2024-12-13 14:00:00', '2024-12-13 16:00:00', 4, 5),
('2024-12-14 18:30:00', '2024-12-14 21:45:00', 5, 2);

-- Insertion des données dans la table Artist
INSERT INTO Artist (firstName, lastName, biography) VALUES
('Jean', 'Dupont', 'Un acteur talentueux connu pour ses rôles dramatiques.'),
('Sophie', 'Martin', 'Une chanteuse d opéra de renommée mondiale.'),
('Luc', 'Bernard', 'Un humoriste reconnu pour son stand-up.'),
('Claire', 'Dubois', 'Une actrice polyvalente dans le théâtre classique.'),
('Julien', 'Petit', 'Un artiste émergent dans le théâtre pour enfants.');

-- Insertion des données dans la table Role
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
