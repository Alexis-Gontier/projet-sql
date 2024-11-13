--Créer un utilisateur (s'inscrire)
INSERT INTO Subscriber (username, password, email, birthdate, first_name, last_name)
VALUES ('nouvel_utilisateur', 'mot_de_passe', 'email@example.com', 'YYYY-MM-DD', 'Prénom', 'Nom');

--Associer un artiste à un spectacle
INSERT INTO Role (role, artist_id, spectacle_id)
VALUES ('rôle_de_l_artiste', id_artiste, id_spectacle);

--Créer un spectacle
INSERT INTO Spectacle (title, synopsis, duration, price, language, category_id)
VALUES ('titre_du_spectacle', 'synopsis_du_spectacle', durée_du_spectacle, prix_du_spectacle, 'langue_du_spectacle', id_categorie);

-- Effectuer une réservation pour un spectacle donné
INSERT INTO Schedule (date, booked, paid, amount, comment, notation, reactions, subscriber_id, spectacle_id)
VALUES ('YYYY-MM-DD HH:MM:SS', nombre_de_places, FALSE, montant_total, 'commentaire', NULL, NULL, id_abonné, id_spectacle);

--Modifier le mot de passe d'un utilisateur

UPDATE Subscriber
SET password = 'nouveau_mot_de_passe'
WHERE username = 'nom_utilisateur';

--Ajouter une place à une réservation si le paiement n'a pas encore été effectué et modifier le montant à payer
UPDATE Schedule
SET booked = booked + 1,
    amount = amount + (amount / booked)
WHERE id = 'id_reservation'
  AND paid = FALSE;


--Pour tous les spectacles ayant lieu un jour donné, augmenter le prix de 10% (les réservations déjà payées ne sont pas concernées)
UPDATE Schedule
SET amount = amount * 1.10
WHERE DATE(date) = 'YYYY-MM-DD'
  AND paid = FALSE;


