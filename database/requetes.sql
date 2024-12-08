-- 1. Afficher la liste des lieux de spectacle
-- Affiche les détails des théâtres
SELECT id, name, address, borough 
FROM Theatre;

-- 2. Afficher les spectacles par arrondissement
-- Affiche les spectacles avec leur quartier d'implantation
SELECT Spectacle.title, Theatre.borough 
FROM Spectacle
JOIN Representation ON Spectacle.id = Representation.spectacle_id
JOIN Room ON Representation.room_id = Room.id
JOIN Theatre ON Room.theatre_id = Theatre.id;

-- 3. Afficher les salles par arrondissement (borough)
-- Affiche les salles avec leur quartier d'implantation
SELECT Room.name AS room_name, Theatre.name AS theatre_name, Theatre.borough 
FROM Room
JOIN Theatre ON Room.theatre_id = Theatre.id;

-- 4. Afficher les spectacles en cours pour une catégorie donnée
-- Affiche les spectacles dont la date de représentation est en cours pour une catégorie donnée
SELECT Spectacle.title, Category.name AS category_name, Representation.first_date, Representation.last_date
FROM Spectacle
JOIN Representation ON Spectacle.id = Representation.spectacle_id
JOIN Category ON Spectacle.id = Category.id
WHERE NOW() BETWEEN Representation.first_date AND Representation.last_date
  AND Category.name = 'Comédie'; -- Remplacez 'Comédie' par la catégorie souhaitée

-- 5. Afficher le nombre de spectacles par catégorie
-- Compte le nombre de spectacles par catégorie
SELECT Category.name AS category_name, COUNT(Spectacle.id) AS spectacle_count
FROM Category
JOIN Spectacle ON Spectacle.id = Category.id
GROUP BY Category.name;

-- 6. Afficher le nombre moyen de places réservées (au total) par les personnes inscrites
-- Calcule le nombre moyen de places réservées
SELECT AVG(booked) AS avg_places_reserved
FROM Schedule;

-- 7. Afficher la distribution statistique des réservations de places
-- Affiche le nombre de personnes ayant réservé un certain nombre de places
SELECT booked, COUNT(*) AS total_people
FROM Schedule
GROUP BY booked
ORDER BY booked ASC;

-- 8. Afficher le taux de remplissage des salles par spectacle, trié par ordre décroissant
-- Calcul le taux de remplissage des salles par spectacle
SELECT Spectacle.title, Room.name AS room_name, 
       (SUM(Schedule.booked) / Room.gauge) * 100 AS fill_rate
FROM Schedule
JOIN Representation ON Schedule.date = Representation.first_date
JOIN Spectacle ON Representation.spectacle_id = Spectacle.id
JOIN Room ON Representation.room_id = Room.id
GROUP BY Spectacle.title, Room.name
ORDER BY fill_rate DESC;

-- 9. Liste des artistes ayant participé avec un artiste donné à au moins deux spectacles différents
-- Affiche les artistes ayant collaboré avec un artiste donné à au moins deux spectacles
SELECT DISTINCT a1.firstName AS artist_1, a2.firstName AS artist_2
FROM Role r1
JOIN Role r2 ON r1.spectacle_id = r2.spectacle_id AND r1.artist_id <> r2.artist_id
JOIN Artist a1 ON r1.artist_id = a1.id
JOIN Artist a2 ON r2.artist_id = a2.id
WHERE r1.artist_id = 1 -- Remplacez "1" par l'ID de l'artiste donné
GROUP BY a1.firstName, a2.firstName
HAVING COUNT(DISTINCT r1.spectacle_id) >= 2;

-- 10. Liste des metteurs en scène ayant travaillé dans un théâtre donné
-- Affiche les metteurs en scène travaillant dans un théâtre donné
SELECT DISTINCT Artist.firstName, Artist.lastName
FROM Role
JOIN Spectacle ON Role.spectacle_id = Spectacle.id
JOIN Representation ON Spectacle.id = Representation.spectacle_id
JOIN Room ON Representation.room_id = Room.id
JOIN Theatre ON Room.theatre_id = Theatre.id
JOIN Artist ON Role.artist_id = Artist.id
WHERE Theatre.id = 1; -- Remplacez "1" par l'ID du théâtre donné

-- 11. Les trois catégories de spectacles avec le plus de places réservées
-- Affiche les trois catégories de spectacles avec le plus de places réservées
SELECT Category.name AS category_name, SUM(Schedule.booked) AS total_reserved
FROM Schedule
JOIN Representation ON Schedule.date = Representation.first_date
JOIN Spectacle ON Representation.spectacle_id = Spectacle.id
JOIN Category ON Spectacle.id = Category.id
GROUP BY Category.name
ORDER BY total_reserved DESC
LIMIT 3;

-- 12. Recommandation : proposer à une personne X des spectacles qu'elle pourrait aimer
-- Propose des spectacles que la personne X pourrait aimer, en se basant sur des spectacles vus par les gens ayant vu des spectacles communs avec X
SELECT DISTINCT s2.title
FROM Schedule sch1
JOIN Schedule sch2 ON sch1.date = sch2.date AND sch1.id <> sch2.id
JOIN Representation r1 ON sch1.date = r1.first_date
JOIN Representation r2 ON sch2.date = r2.first_date
JOIN Spectacle s1 ON r1.spectacle_id = s1.id
JOIN Spectacle s2 ON r2.spectacle_id = s2.id
... (50lignes restantes)