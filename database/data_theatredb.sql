-- Insertion des données fictives pour les tables

-- Table Category
INSERT INTO Category (name, helpText) VALUES
    ('Drame', 'Spectacles dramatiques pour un public averti.'),
    ('Musical', 'Spectacles de comédie musicale.'),
    ('Enfant', 'Spectacles adaptés pour les enfants.'),
    ('Comédie', 'Spectacles humoristiques et légers.');

-- Table Theatre
INSERT INTO Theatre (name, presentation, address, borough, geolocation, phone, email) VALUES
    ('Théâtre Lumière', 'Un lieu magique dédié au spectacle vivant.', '12 rue des Arts, Paris', 1, POINT(48.8566, 2.3522), '0140234567', 'contact@lumieretheatre.fr'),
    ('Théâtre Étoile', 'Un théâtre moderne et confortable.', '45 avenue des Champs, Lyon', 2, POINT(45.7640, 4.8357), '0488921234', 'info@etoile.fr'),
    ('Théâtre Soleil', 'Un espace chaleureux pour tous les publics.', '78 place du Soleil, Marseille', 3, POINT(43.2965, 5.3698), '0491765432', 'accueil@soleil.fr');

-- Table Room
INSERT INTO Room (name, gauge, theatre_id) VALUES
    ('Salle A', 150, 1),
    ('Salle B', 200, 2),
    ('Salle C', 300, 3);

-- Table Spectacle
INSERT INTO Spectacle (title, synopsis, duration, price, language, category_id) VALUES
    ('La Tragédie d\'Hiver', 'Une pièce poignante sur le destin et l\'amour.', '02:30:00', 25.50, 'français', 1), -- Drame
    ('Chantons Ensemble', 'Une comédie musicale pleine de joie.', '01:45:00', 30.00, 'français', 2), -- Musical
    ('Les Aventures de Léo', 'Un spectacle interactif pour les enfants.', '01:30:00', 15.00, 'français', 3), -- Enfant
    ('Rire et Détente', 'Un one-man-show hilarant.', '02:00:00', 20.00, 'français', 4); -- Comédie

-- Table Representation
INSERT INTO Representation (first_date, last_date, spectacle_id, room_id) VALUES
    ('2024-12-20 20:00:00', '2024-12-20 22:30:00', 1, 1), -- Spectacle Drame
    ('2024-12-22 18:00:00', '2024-12-22 19:45:00', 2, 2), -- Spectacle Musical
    ('2024-12-23 14:00:00', '2024-12-23 15:30:00', 3, 3), -- Spectacle Enfant
    ('2024-12-25 21:00:00', '2024-12-25 23:00:00', 4, 1); -- Spectacle Comédie

-- Table Artist
INSERT INTO Artist (firstName, lastName, biography) VALUES
    ('Jean', 'Dupont', 'Acteur principal spécialisé dans le drame.'),
    ('Marie', 'Legrand', 'Chanteuse talentueuse et actrice de comédies musicales.'),
    ('Pierre', 'Martin', 'Clown et acteur comique.');

-- Table Role
INSERT INTO Role (role, artist_id, spectacle_id) VALUES
    ('Protagoniste', 1, 1), -- Jean Dupont pour La Tragédie d'Hiver
    ('Chanteuse principale', 2, 2), -- Marie Legrand pour Chantons Ensemble
    ('Clown', 3, 3); -- Pierre Martin pour Les Aventures de Léo

-- Table Subscriber
INSERT INTO Subscriber (username, password, email, birthdate, first_name, last_name) VALUES
    ('john_doe', 'hashedpassword1', 'john.doe@example.com', '1990-05-15', 'John', 'Doe'),
    ('jane_smith', 'hashedpassword2', 'jane.smith@example.com', '1985-10-25', 'Jane', 'Smith'),
    ('alice_miller', 'hashedpassword3', 'alice.miller@example.com', '1995-07-12', 'Alice', 'Miller');

-- Table Schedule
INSERT INTO Schedule (representation_id, subscriber_id, date, booked, paid, amount, comment, notation, reactions) VALUES
    (1, 1, '2024-12-20 20:00:00', 1, TRUE, 25.50, 'Superbe représentation, très émouvant.', 5, JSON_OBJECT('like', 10, 'love', 5)),
    (2, 2, '2024-12-22 18:00:00', 2, TRUE, 60.00, 'Spectacle très agréable.', 4, JSON_OBJECT('like', 8, 'wow', 2)),
    (3, 3, '2024-12-23 14:00:00', 1, FALSE, 0.00, 'Réservation effectuée mais non payée.', NULL, NULL);
