import express from 'express'
import db from '../db/db.js';

const router = express.Router()

router.get('/', (req, res) => {
  res.send("Hello World")
})

// 1. Afficher la liste des lieux de spectacle
router.get('/theatres', (req, res) => {
  const sql = `
  SELECT DISTINCT Theatre.name AS Theatre_Name, Theatre.address, Theatre.borough
  FROM Theatre
   `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des théâtres :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des théâtres",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 2. Afficher les spectacles par arrondissement (marche pas)
router.get('/spectacles-by-borough', (req, res) => {
  const sql = `
    SELECT Spectacle.title AS Spectacle_Title, Theatre.borough
    FROM Spectacle
    JOIN Representation ON Spectacle.id = Representation.spectacle_id
    JOIN Room ON Representation.room_id = Room.id
    JOIN Theatre ON Room.theatre_id = Theatre.id
    ORDER BY Theatre.borough
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des spectacles par arrondissement :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des spectacles",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 3. Afficher les salles par arrondissement (marche pas)
router.get('/rooms-by-borough', (req, res) => {
  const sql = `
    SELECT Room.name AS Room_Name, Theatre.borough
    FROM Room
    JOIN Theatre ON Room.theatre_id = Theatre.id
    ORDER BY Theatre.borough
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des salles par arrondissement :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des salles",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 4. Afficher les spectacles en cours pour une catégorie donnée (marche pas)
router.get('/current-spectacles/:category', (req, res) => {
  const { category } = req.params;
  const sql = `
    SELECT Spectacle.title AS Spectacle_Title
    FROM Spectacle
    JOIN Category ON Spectacle.category_id = Category.id
    WHERE Category.name = ?
  `;

  db.query(sql, [category], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des spectacles en cours :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des spectacles",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 5. Afficher le nombre de spectacles par catégorie
router.get('/spectacle-count-by-category', (req, res) => {
  const sql = `
    SELECT Category.name AS Category_Name, COUNT(Spectacle.id) AS Spectacle_Count
    FROM Category
    LEFT JOIN Spectacle ON Spectacle.language = Category.name
    GROUP BY Category.name
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des spectacles par catégorie :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des spectacles",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 6. Afficher le nombre moyen de places réservées par les personnes inscrites
router.get('/average-seats-booked', (req, res) => {
  const sql = `SELECT AVG(Schedule.booked) AS Average_Seats_Booked FROM Schedule`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération de la moyenne des places réservées :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 7. Afficher la distribution statistique des réservations
router.get('/seats-distribution', (req, res) => {
  const sql = `
    SELECT Schedule.booked AS Seats_Booked, COUNT(*) AS People_Count
    FROM Schedule
    GROUP BY Schedule.booked
    ORDER BY Schedule.booked
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des statistiques de réservation :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des statistiques",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 8. Afficher le taux de remplissage des salles par spectacle (marche pas)
router.get('/fill-rate', (req, res) => {
  const sql = `
    SELECT Spectacle.title AS Spectacle_Title,
           Room.name AS Room_Name,
           (SUM(Schedule.booked) / Room.gauge) * 100 AS Fill_Rate
    FROM Schedule
    JOIN Representation ON Schedule.id = Representation.id
    JOIN Spectacle ON Representation.spectacle_id = Spectacle.id
    JOIN Room ON Representation.room_id = Room.id
    GROUP BY Spectacle.id, Room.id
    ORDER BY Fill_Rate DESC
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

// 9. Artistes ayant participé avec un autre artiste à au moins deux spectacles (? pas test)
router.get('/co-artists/:firstName/:lastName', (req, res) => {
  const { firstName, lastName } = req.params;
  const sql = `
    SELECT DISTINCT a1.firstName, a1.lastName
    FROM Artist a1
    JOIN Role r1 ON a1.id = r1.artist_id
    JOIN Spectacle s1 ON r1.spectacle_id = s1.id
    JOIN Role r2 ON s1.id = r2.spectacle_id AND r1.artist_id != r2.artist_id
    JOIN Artist a2 ON r2.artist_id = a2.id
    WHERE a2.firstName = ? AND a2.lastName = ?
    GROUP BY a1.id
    HAVING COUNT(DISTINCT s1.id) >= 2
  `;

  db.query(sql, [firstName, lastName], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des co-artistes :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 10. Liste des metteurs en scène dans un théâtre donné (? pas test)
router.get('/directors/:theatreName', (req, res) => {
  const { theatreName } = req.params;
  const sql = `
    SELECT DISTINCT Artist.firstName, Artist.lastName
    FROM Artist
    JOIN Role ON Artist.id = Role.artist_id
    JOIN Spectacle ON Role.spectacle_id = Spectacle.id
    JOIN Representation ON Spectacle.id = Representation.spectacle_id
    JOIN Room ON Representation.room_id = Room.id
    JOIN Theatre ON Room.theatre_id = Theatre.id
    WHERE Theatre.name = ? AND Role.role_name = 'Metteur en scène'
  `;

  db.query(sql, [theatreName], (err, results) => {
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

// 11. Trois catégories de spectacles avec le plus de places réservées (marche pas)
router.get('/top-categories', (req, res) => {
  const sql = `
    SELECT Category.name AS Category_Name, SUM(Schedule.booked) AS Total_Booked
    FROM Category
    JOIN Spectacle ON Spectacle.category_id = Category.id
    JOIN Representation ON Spectacle.id = Representation.spectacle_id
    JOIN Schedule ON Representation.id = Schedule.id
    GROUP BY Category.name
    ORDER BY Total_Booked DESC
    LIMIT 3
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des catégories les plus réservées :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 12. Recommander des spectacles à un utilisateur basé sur des goûts similaires (pas test)
router.get('/recommendations/:username', (req, res) => {
  const { username } = req.params;
  const sql = `
    WITH Spectacles_Vus AS (
        SELECT DISTINCT Schedule.id
        FROM Schedule
        JOIN Subscriber ON Schedule.id = Subscriber.id
        WHERE Subscriber.username = ?
    ),
    Recommendations AS (
        SELECT DISTINCT s2.id AS Recommended_Spectacle
        FROM Schedule s1
        JOIN Schedule s2 ON s1.id != s2.id
        WHERE s1.id IN (SELECT id FROM Spectacles_Vus)
    )
    SELECT DISTINCT Spectacle.title
    FROM Spectacle
    WHERE Spectacle.id IN (SELECT Recommended_Spectacle FROM Recommendations)
  `;

  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Erreur lors de la génération des recommandations :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la génération des recommandations",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 13. Afficher la liste des théâtres triée par la note moyenne obtenue (marche pas)
router.get('/theatres-by-rating', (req, res) => {
  const sql = `
    SELECT Theatre.name AS Theatre_Name, AVG(Schedule.notation) AS Average_Rating
    FROM Theatre
    JOIN Room ON Theatre.id = Room.theatre_id
    JOIN Representation ON Room.id = Representation.room_id
    JOIN Schedule ON Representation.id = Schedule.id
    GROUP BY Theatre.name
    ORDER BY Average_Rating DESC
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

// 14. Existe-t-il des artistes ayant tenu au moins trois fonctions différentes ? (marche pas)
router.get('/multi-role-artists', (req, res) => {
  const sql = `
    SELECT Artist.firstName, Artist.lastName
    FROM Artist
    JOIN Role ON Artist.id = Role.artist_id
    GROUP BY Artist.id
    HAVING COUNT(DISTINCT Role.role_name) >= 3
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des artistes multi-fonctions :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }
    res.json(results);
  });
});

// 15. Afficher les recettes par spectacle, triées par ordre décroissant (marche pas)
router.get('/revenues-by-spectacle', (req, res) => {
  const sql = `
    SELECT Spectacle.title AS Spectacle_Title, SUM(Schedule.amount) AS Total_Revenue
    FROM Spectacle
    JOIN Representation ON Spectacle.id = Representation.spectacle_id
    JOIN Schedule ON Representation.id = Schedule.id
    GROUP BY Spectacle.title
    ORDER BY Total_Revenue DESC
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

// 16. Y a-t-il des spectacles complets parmi ceux qui ne se jouent plus ? (marche pas)
router.get('/sold-out-ended-spectacles', (req, res) => {
  const sql = `
    SELECT Spectacle.title AS Spectacle_Title
    FROM Spectacle
    JOIN Representation ON Spectacle.id = Representation.spectacle_id
    JOIN Schedule ON Representation.id = Schedule.id
    JOIN Room ON Representation.room_id = Room.id
    WHERE Representation.end_date < CURRENT_DATE
    GROUP BY Spectacle.id, Room.id
    HAVING SUM(Schedule.booked) >= Room.gauge
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

// 17. Artistes préférés des spectateurs (spectacles les mieux notés) (marche pas)
router.get('/favorite-artists', (req, res) => {
  const sql = `
    SELECT Artist.firstName, Artist.lastName, AVG(Schedule.notation) AS Average_Rating
    FROM Artist
    JOIN Role ON Artist.id = Role.artist_id
    JOIN Spectacle ON Role.spectacle_id = Spectacle.id
    JOIN Representation ON Spectacle.id = Representation.spectacle_id
    JOIN Schedule ON Representation.id = Schedule.id
    GROUP BY Artist.id
    ORDER BY Average_Rating DESC
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