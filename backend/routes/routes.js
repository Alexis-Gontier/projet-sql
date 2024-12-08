import express from 'express'
import db from '../db/db.js';

const router = express.Router()

router.get('/', (req, res) => {
  res.send("Hello World")
})

// 1. Afficher la liste des lieux de spectacle
router.get('/theatres', (req, res) => {
  const sql = `SELECT id, name, address, borough FROM Theatre;`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des lieux :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 2. Afficher les spectacles par arrondissement
router.get('/spectacles/:borough', (req, res) => {
  const borough = req.params.borough;
  const sql = `
    SELECT Spectacle.title, Theatre.borough 
    FROM Spectacle
    JOIN Representation ON Spectacle.id = Representation.spectacle_id
    JOIN Room ON Representation.room_id = Room.id
    JOIN Theatre ON Room.theatre_id = Theatre.id
    WHERE Theatre.borough = ?;
  `;

  db.query(sql, [borough], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des spectacles :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 3. Afficher les salles par arrondissement (borough)
router.get('/salles/:borough', (req, res) => {
  const borough = req.params.borough;
  const sql = `
    SELECT Room.name AS room_name, Theatre.name AS theatre_name 
    FROM Room
    JOIN Theatre ON Room.theatre_id = Theatre.id
    WHERE Theatre.borough = ?;
  `;

  db.query(sql, [borough], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des salles :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 4. Afficher les spectacles en cours pour une catégorie donnée
router.get('/spectacles-en-cours/:category', (req, res) => {
  const category = req.params.category;
  const sql = `
    SELECT Spectacle.title, Category.name AS category_name, Representation.first_date, Representation.last_date
    FROM Spectacle
    JOIN Representation ON Spectacle.id = Representation.spectacle_id
    JOIN Category ON Spectacle.id = Category.id
    WHERE NOW() BETWEEN Representation.first_date AND Representation.last_date
    AND Category.name = ?;
  `;

  db.query(sql, [category], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des spectacles :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 5. Afficher le nombre de spectacles par catégorie
router.get('/nombre-spectacles', (req, res) => {
  const sql = `
    SELECT Category.name AS category_name, COUNT(Spectacle.id) AS spectacle_count
    FROM Category
    JOIN Spectacle ON Spectacle.id = Category.id
    GROUP BY Category.name;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des spectacles par catégorie :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 6. Afficher le nombre moyen de places réservées
router.get('/moyenne-places-reservees', (req, res) => {
  const sql = `SELECT AVG(booked) AS avg_places_reserved FROM Schedule;`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des données :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 7. Afficher la distribution statistique des réservations de places
router.get('/distribution-reservations', (req, res) => {
  const sql = `
    SELECT booked, COUNT(*) AS total_people
    FROM Schedule
    GROUP BY booked
    ORDER BY booked ASC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des réservations :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 8. Afficher le taux de remplissage des salles par spectacle
router.get('/taux-remplissage', (req, res) => {
  const sql = `
    SELECT Spectacle.title, Room.name AS room_name, 
    (SUM(Schedule.booked) / Room.gauge) * 100 AS fill_rate
    FROM Schedule
    JOIN Representation ON Schedule.date = Representation.first_date
    JOIN Spectacle ON Representation.spectacle_id = Spectacle.id
    JOIN Room ON Representation.room_id = Room.id
    GROUP BY Spectacle.title, Room.name
    ORDER BY fill_rate DESC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération du taux de remplissage :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 9. Faire la liste des artistes qui ont participé avec un artiste donné à au moins deux spectacles différents
router.get('/artistes-communs/:artist_id', (req, res) => {
  const artistId = req.params.artist_id;
  const sql = `
    SELECT DISTINCT a1.firstName AS artist_1, a2.firstName AS artist_2
    FROM Role r1
    JOIN Role r2 ON r1.spectacle_id = r2.spectacle_id AND r1.artist_id <> r2.artist_id
    JOIN Artist a1 ON r1.artist_id = a1.id
    JOIN Artist a2 ON r2.artist_id = a2.id
    WHERE r1.artist_id = ?
    GROUP BY a1.firstName, a2.firstName
    HAVING COUNT(DISTINCT r1.spectacle_id) >= 2;
  `;

  db.query(sql, [artistId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des artistes :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 10. Afficher les liste de tous les metteurs en scène qui sont travaillé dans un théâtre donné
router.get('/metteurs-en-scene/:theatre_id', (req, res) => {
  const theatreId = req.params.theatre_id;
  const sql = `
    SELECT DISTINCT Artist.firstName, Artist.lastName
    FROM Role
    JOIN Spectacle ON Role.spectacle_id = Spectacle.id
    JOIN Representation ON Spectacle.id = Representation.spectacle_id
    JOIN Room ON Representation.room_id = Room.id
    JOIN Theatre ON Room.theatre_id = Theatre.id
    JOIN Artist ON Role.artist_id = Artist.id
    WHERE Theatre.id = ?;
  `;

  db.query(sql, [theatreId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des metteurs en scène :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 11. Afficher les trois catégories de spectacles pour lesquelles le plus de places ont été réservées
router.get('/categories-places-reservees', (req, res) => {
  const sql = `
    SELECT Category.name AS category_name, SUM(Schedule.booked) AS total_reserved
    FROM Schedule
    JOIN Representation ON Schedule.date = Representation.first_date
    JOIN Spectacle ON Representation.spectacle_id = Spectacle.id
    JOIN Category ON Spectacle.id = Category.id
    GROUP BY Category.name
    ORDER BY total_reserved DESC
    LIMIT 3;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des catégories :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 12. Recommandation : proposer à un personne X des spectacles qu'elle pourrait aimer
router.get('/recommandation/:schedule_id', (req, res) => {
  const scheduleId = req.params.schedule_id;
  const sql = `
    SELECT DISTINCT s2.title
    FROM Schedule sch1
    JOIN Schedule sch2 ON sch1.date = sch2.date AND sch1.id <> sch2.id
    JOIN Representation r1 ON sch1.date = r1.first_date
    JOIN Representation r2 ON sch2.date = r2.first_date
    JOIN Spectacle s1 ON r1.spectacle_id = s1.id
    JOIN Spectacle s2 ON r2.spectacle_id = s2.id
    WHERE sch1.id = ?;
  `;

  db.query(sql, [scheduleId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des recommandations :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 13. Afficher la liste des théâtres, triée par la note moyenne obtenue par les spectacles qui s'y sont joués
router.get('/theatres-notes', (req, res) => {
  const sql = `
    SELECT Theatre.name, AVG(Spectacle.rating) AS avg_rating
    FROM Theatre
    JOIN Room ON Theatre.id = Room.theatre_id
    JOIN Representation ON Room.id = Representation.room_id
    JOIN Spectacle ON Representation.spectacle_id = Spectacle.id
    GROUP BY Theatre.name
    ORDER BY avg_rating DESC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des notes des théâtres :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 14. Existe-t-il des artistes ayant tenu au moins trois fonctions différentes ?
router.get('/artistes-fonctions', (req, res) => {
  const sql = `
    SELECT Artist.firstName, Artist.lastName
    FROM Role
    JOIN Artist ON Role.artist_id = Artist.id
    GROUP BY Artist.id
    HAVING COUNT(DISTINCT Role.type) >= 3;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des artistes :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 15. Afficher la liste des recettes par spectacle et par ordre décroissant
router.get('/revenues-by-spectacle', (req, res) => {
  const sql = `
    SELECT Spectacle.title AS Spectacle_Title, SUM(Schedule.amount) AS Total_Revenue
    FROM Spectacle
    JOIN Representation ON Spectacle.id = Representation.spectacle_id
    JOIN Schedule ON Representation.id = Schedule.id
    GROUP BY Spectacle.title
    ORDER BY Total_Revenue DESC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des recettes :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 16. Y a-t-il des spectacles qui ont affiché complet parmi ceux qui ne se jouent plus ?
router.get('/spectacles-complet', (req, res) => {
  const sql = `
    SELECT Spectacle.title, Theatre.name AS theatre_name
    FROM Schedule
    JOIN Representation ON Schedule.date = Representation.first_date
    JOIN Spectacle ON Representation.spectacle_id = Spectacle.id
    JOIN Room ON Representation.room_id = Room.id
    JOIN Theatre ON Room.theatre_id = Theatre.id
    WHERE Schedule.booked >= Room.gauge AND Schedule.end_date < NOW();
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des spectacles complets :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 17. Quels sont les artistes préférés des spectateurs ?
router.get('/artistes-preferes', (req, res) => {
  const sql = `
    SELECT Artist.firstName, Artist.lastName, AVG(Spectacle.rating) AS avg_rating
    FROM Role
    JOIN Spectacle ON Role.spectacle_id = Spectacle.id
    JOIN Rating ON Spectacle.id = Rating.spectacle_id
    JOIN Artist ON Role.artist_id = Artist.id
    GROUP BY Artist.id
    ORDER BY avg_rating DESC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des artistes préférés :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});


export default router