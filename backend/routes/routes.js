import express from 'express'
import db from '../db/db.js';

const router = express.Router()

router.get('/', (req, res) => {
  res.send("Hello World")
})
// 1. Afficher la liste des théâtres
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

// 6 Récupérer les detail d'un spectacle
router.get('/spectacle/:id', (req, res) => {
  const spectacleId = req.params.id;
  const sql = `
    SELECT 
      Spectacle.title AS spectacle_title, 
      Spectacle.synopsis, 
      Spectacle.duration, 
      Spectacle.price, 
      Spectacle.language, 
      Category.name AS category_name,
      GROUP_CONCAT(DISTINCT CONCAT(Artist.firstName, ' ', Artist.lastName, ' (', Role.role, ')')) AS cast_details
    FROM 
      Spectacle
    LEFT JOIN 
      Category ON Spectacle.category_id = Category.id
    LEFT JOIN 
      Role ON Role.spectacle_id = Spectacle.id
    LEFT JOIN 
      Artist ON Role.artist_id = Artist.id
    WHERE 
      Spectacle.id = ?
    GROUP BY 
      Spectacle.id;
  `;

  db.query(sql, [spectacleId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des détails du spectacle :", err);
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
    SELECT theatre.id, Room.name AS room_name, Theatre.name AS theatre_name 
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

  // Requête SQL pour récupérer les spectacles en cours pour la catégorie spécifiée
  const sql = `
    SELECT Spectacle.title, Category.name AS category_name, Representation.first_date, Representation.last_date
    FROM Spectacle
    JOIN Representation ON Spectacle.id = Representation.spectacle_id
    JOIN Category ON Spectacle.category_id = Category.id
    WHERE NOW() BETWEEN Representation.first_date AND Representation.last_date
    AND Category.name = ?;
  `;

  // Exécution de la requête avec la catégorie donnée en paramètre
  db.query(sql, [category], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des spectacles:', err);
      return res.status(500).json({
        message: 'Erreur serveur lors de la récupération des spectacles',
        error: err.message,
      });
    }

    // Réponse avec les résultats sous forme de JSON
    res.json(results);
  });
});

// 5. Afficher le nombre de spectacles par catégorie
router.get('/nb-spectacles', (req, res) => {
  const sql = `
    SELECT Category.name AS category_name, COUNT(Spectacle.id) AS spectacle_count
    FROM Category
    LEFT JOIN Spectacle ON Spectacle.category_id = Category.id
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
router.get('/taux-remplissage/:spectacleId', (req, res) => {
  const spectacleId = req.params.spectacleId;

  const sql = `
    SELECT Spectacle.title, Room.name AS room_name, 
    (SUM(Schedule.booked) / Room.gauge) * 100 AS fill_rate
    FROM Schedule
    JOIN Representation ON Schedule.date = Representation.first_date
    JOIN Spectacle ON Representation.spectacle_id = Spectacle.id
    JOIN Room ON Representation.room_id = Room.id
    WHERE Spectacle.id = ?
    GROUP BY Spectacle.title, Room.name
    ORDER BY fill_rate DESC;
  `;

  db.query(sql, [spectacleId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération du taux de remplissage :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des données",
        error: err.message
      });
    }

    // Vérification 
    if (results.length === 0) {
      return res.status(404).json({
        message: "Aucune donnée trouvée pour ce spectacle."
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
  SELECT Category.name AS category_name, COALESCE(SUM(Schedule.booked), 0) AS total_reserved
  FROM Category
  LEFT JOIN Spectacle ON Category.id = Spectacle.category_id
  LEFT JOIN Representation ON Spectacle.id = Representation.spectacle_id
  LEFT JOIN Schedule ON Representation.first_date = Schedule.date
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
router.get('/spectacles-likes', (req, res) => {
  const sql = `
    SELECT 
        sp.title AS spectacle_title,
        AVG(CAST(JSON_EXTRACT(s.reactions, '$.likes') AS UNSIGNED)) AS avg_likes
    FROM 
        spectacle sp
    JOIN 
        representation rep ON sp.id = rep.spectacle_id
    JOIN 
        schedule s ON rep.id = s.id
    WHERE 
        JSON_EXTRACT(s.reactions, '$.likes') IS NOT NULL
    GROUP BY 
        sp.id, sp.title
    ORDER BY 
        avg_likes DESC;
  `;

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

// 13. Afficher la liste des théâtres, triée par la note moyenne obtenue par les spectacles qui s'y sont joués
router.get('/theatres-notes', (req, res) => {
  const sql = `
  SELECT 
      Theatre.name AS theatre_name, 
      SUM(spectacle_avg.avg_rating) AS total_avg_rating
  FROM Theatre
  JOIN Room ON Theatre.id = Room.theatre_id
  JOIN Representation ON Room.id = Representation.room_id
  JOIN (
      SELECT 
          Spectacle.id AS spectacle_id, 
          AVG(Schedule.notation) AS avg_rating
      FROM Spectacle
      JOIN Schedule ON Spectacle.id = Schedule.spectacle_id
      GROUP BY Spectacle.id
  ) AS spectacle_avg ON Representation.spectacle_id = spectacle_avg.spectacle_id
  GROUP BY Theatre.name
  ORDER BY total_avg_rating DESC;
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
    SELECT
      Spectacle.title,
      Theatre.name AS theatre_name
    FROM
      Schedule
    JOIN Representation
      ON Schedule.date BETWEEN Representation.first_date AND Representation.last_date
    JOIN Spectacle
      ON Representation.spectacle_id = Spectacle.id
    JOIN Room
      ON Representation.room_id = Room.id
    JOIN Theatre
      ON Room.theatre_id = Theatre.id
    WHERE
      Schedule.booked >= Room.gauge
      AND Representation.last_date < NOW();
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
    SELECT 
        Artist.firstName,
        Artist.lastName,
        AVG(JSON_EXTRACT(Schedule.reactions, '$.likes')) AS avg_likes
    FROM Role
    JOIN Spectacle ON Role.spectacle_id = Spectacle.id
    JOIN Schedule ON Spectacle.id = Schedule.id
    JOIN Artist ON Role.artist_id = Artist.id
    GROUP BY Artist.id
    ORDER BY avg_likes DESC;
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


// POST
// ========================================================================

// 1. Créer un utilisateur (s'inscrire)
router.post('/register', (req, res) => {
  const { username, password, email, birthdate, first_name, last_name } = req.body;
  const sql = `
    INSERT INTO subscriber (username, password, email, birthdate, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?);
  `;

  db.query(sql, [username, password, email, birthdate, first_name, last_name], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'inscription :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de l'inscription",
        error: err.message
      });
    }
    res.status(201).json({ message: "Utilisateur créé avec succès", userId: results.insertId });
  });
});

// 2. Associer un artiste à un spectacle
router.post('/associate-artist-spectacle', (req, res) => {
  const { artist_id, spectacle_id } = req.body;
  const sql = `
    INSERT INTO Role (artist_id, spectacle_id) VALUES (?, ?);
  `;

  db.query(sql, [artist_id, spectacle_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'association de l'artiste :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de l'association",
        error: err.message
      });
    }
    res.status(201).json({ message: "Artiste associé avec succès", roleId: results.insertId });
  });
});
// 3. Créer un spectacle
router.post('/create-spectacle', (req, res) => {
  const { title, synopsis, duration, price, language, category_id } = req.body;
  const sql = `
    INSERT INTO Spectacle (title, synopsis, duration, price, language, category_id) 
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  db.query(sql, [title, synopsis, duration, price, language, category_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la création du spectacle :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la création",
        error: err.message
      });
    }
    res.status(201).json({ message: "Spectacle créé avec succès", spectacleId: results.insertId });
  });
});


// 4. Effectuer une réservation pour un spectacle donné
router.post('/reserve-seat', (req, res) => {
  const { schedule_id, user_id, booked } = req.body;
  const sql = `
    INSERT INTO Schedule (schedule_id, user_id, booked) VALUES (?, ?, ?);
  `;

  db.query(sql, [schedule_id, user_id, booked], (err, results) => {
    if (err) {
      console.error("Erreur lors de la réservation :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la réservation",
        error: err.message
      });
    }
    res.status(201).json({ message: "Réservation effectuée avec succès", reservationId: results.insertId });
  });
});


// PUT
// ========================================================================

// 1. Modifier le mot de passe d'un utilisateur
router.put('/update-password/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const { new_password } = req.body;
  const sql = `
    UPDATE subscriber SET password = ? WHERE id = ?;
  `;

  db.query(sql, [new_password, userId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du mot de passe :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la mise à jour",
        error: err.message
      });
    }
    res.json({ message: "Mot de passe mis à jour avec succès" });
  });
});

// 2. Ajouter une place à une réservation si le paiement n'a pas encore été effectué et modifier le montant à payer
router.put('/add-reservation/:schedule_id', (req, res) => {
  const scheduleId = req.params.schedule_id;
  const { additional_booked, new_total_amount } = req.body;
  const sql = `
    UPDATE Schedule SET booked = booked + ?, amount = ? WHERE id = ? AND paid = 0;
  `;

  db.query(sql, [additional_booked, new_total_amount, scheduleId], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'ajout de la place à la réservation :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de l'ajout",
        error: err.message
      });
    }
    res.json({ message: "Réservation mise à jour avec succès" });
  });
});

// 3. Pour tous les spectacles ayant lieu un jour donné, augmenter le prix de 10% (les réservations déjà payées ne sont pas concernées)
router.put('/increase-spectacle-price/:date', (req, res) => {
  const date = req.params.date;
  const sql = `
    UPDATE Schedule
    SET amount = amount * 1.10
    WHERE date = ? AND paid = 0;
  `;

  db.query(sql, [date], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'augmentation du prix :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de l'augmentation",
        error: err.message
      });
    }
    res.json({ message: "Prix des spectacles mis à jour avec succès" });
  });
});

// DELETE
// ========================================================================

// 1. Supprimer une réservation connaissant le spectateur et le spectacle
router.delete('/delete-reservation', (req, res) => {
  const { user_id, spectacle_id } = req.body;
  const sql = `
    DELETE FROM Schedule
    WHERE user_id = ? AND id IN (
      SELECT id
      FROM Representation
      WHERE spectacle_id = ?
    );
  `;

  db.query(sql, [user_id, spectacle_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la suppression de la réservation :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de la suppression",
        error: err.message
      });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Aucune réservation trouvée pour ces critères" });
    }
    res.json({ message: "Réservation supprimée avec succès" });
  });
});

// 2. Annuler un spectacle
router.delete('/cancel-spectacle/:spectacle_id', (req, res) => {
  const spectacleId = req.params.spectacle_id;
  const sql = `
    DELETE FROM Spectacle WHERE id = ?;
  `;

  db.query(sql, [spectacleId], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'annulation du spectacle :", err);
      return res.status(500).json({
        message: "Erreur de serveur lors de l'annulation",
        error: err.message
      });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Spectacle non trouvé" });
    }
    res.json({ message: "Spectacle annulé avec succès" });
  });
});

//BONUS 
//INSERT

// 3. Créer un spectacle avec représentations associées
router.post('/create-spectacle-representations', (req, res) => {
  const { title, synopsis, duration, price, language, category_id, representations } = req.body;

  // Validation simple des données
  if (!title || !representations || !Array.isArray(representations)) {
    return res.status(400).json({ message: "Données invalides pour le spectacle et représentations" });
  }

  // Commencer la transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error("Erreur lors du début de la transaction :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    // Étape 1 : Insérer le spectacle
    const sqlSpectacle = `
      INSERT INTO Spectacle (title, synopsis, duration, price, language, category_id)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    db.query(sqlSpectacle, [title, synopsis, duration, price, language, category_id], (err, result) => {
      if (err) {
        console.error("Erreur lors de l'insertion du spectacle :", err);
        return db.rollback(() => res.status(500).json({ message: "Erreur lors de l'insertion du spectacle" }));
      }

      const spectacleId = result.insertId;

      // Étape 2 : Insérer les représentations associées
      const sqlRepresentation = `
        INSERT INTO Representation (first_date, last_date, spectacle_id, room_id)
        VALUES (?, ?, ?, ?);
      `;

      const representationPromises = representations.map((rep) => {
        return new Promise((resolve, reject) => {
          db.query(sqlRepresentation, [rep.first_date, rep.last_date, spectacleId, rep.room_id], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      });

      // Exécuter toutes les insertions de représentations
      Promise.all(representationPromises)
        .then(() => {
          db.commit((err) => {
            if (err) {
              console.error("Erreur lors du commit :", err);
              return db.rollback(() => res.status(500).json({ message: "Erreur lors de la validation de la transaction" }));
            }
            res.status(201).json({ message: "Spectacle et représentations créés avec succès", spectacleId });
          });
        })
        .catch((err) => {
          console.error("Erreur lors de l'insertion des représentations :", err);
          db.rollback(() => res.status(500).json({ message: "Erreur lors de l'insertion des représentations" }));
        });
    });
  });
});

//BONUS 
//DELETE
//Requete marche, la seul erreur c'est que il faut une clé etrangére 
//dans la table Shedule pour que la requete fonctionne.

router.put('/set-on-delete-cascade', (req, res) => {
  const sqlDropConstraint = `
    ALTER TABLE Schedule DROP FOREIGN KEY fk_subscriber;
  `;
  const sqlAddCascade = `
    ALTER TABLE Schedule
    ADD CONSTRAINT fk_subscriber
    FOREIGN KEY (subscriber_id) REFERENCES Subscriber(id)
    ON DELETE CASCADE;
  `;

  // Étape 1 : Supprimer l'ancienne contrainte
  db.query(sqlDropConstraint, (err) => {
    if (err) {
      console.error("Erreur lors de la suppression de la contrainte existante :", err);
      return res.status(500).json({ message: "Erreur lors de la suppression de la contrainte existante", error: err.message });
    }

    // Étape 2 : Ajouter la contrainte avec ON DELETE CASCADE
    db.query(sqlAddCascade, (err) => {
      if (err) {
        console.error("Erreur lors de l'ajout de ON DELETE CASCADE :", err);
        return res.status(500).json({ message: "Erreur lors de l'ajout de la contrainte", error: err.message });
      }

      res.status(200).json({ message: "ON DELETE CASCADE configuré avec succès" });
    });
  });
});


//BONUS 
//UPDATE
// elle marche 

//exemple pour la test sur potsman
// {
//   "reactionType": "likes",
//   "action": "remove"
// }

//tu choisis la reactions que tu veux incrémenter ou pas dans "reactionType"
//et avec action tu add = +1 , remove = -1



// Route pour ajouter ou retirer une réaction au commentaire d'un utilisateur
router.put('/add-reaction/:id', (req, res) => {
  const { id } = req.params; // ID de la ligne Schedule
  const { reactionType, action } = req.body; // Type de réaction et action (add/remove)

  // Détermine si on incrémente ou décrémente
  const incrementValue = action === 'remove' ? -1 : 1;

  // Requête SQL pour mettre à jour le JSON et convertir en entier
  const sql = `
    UPDATE Schedule
    SET reactions = JSON_SET(reactions, ?, 
      GREATEST(CAST(JSON_EXTRACT(reactions, ?) AS UNSIGNED) + ?, 0))
    WHERE id = ?;
  `;

  const jsonPath = `$.${reactionType}`; // Chemin JSON pour accéder à la clé

  // Exécution de la requête
  db.query(sql, [jsonPath, jsonPath, incrementValue, id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour des réactions :", err);
      return res.status(500).json({
        message: "Erreur lors de la mise à jour des réactions",
        error: err.message,
      });
    }

    res.status(200).json({ message: "Réaction mise à jour avec succès", affectedRows: result.affectedRows });
  });
});


//BONUS 
//SELECT
// elle marche 
// sur postman : http://localhost:3000/api/v1/theatres-proches?latitude=48.3&longitude=2.21

// Route pour récupérer les 3 théâtres les plus proches d'un point de géolocalisation
router.get('/theatres-proches', (req, res) => {
  const { latitude, longitude } = req.query;

  // Validation des paramètres
  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude et longitude sont requis." });
  }

  // Requête SQL pour trouver les théâtres les plus proches
  const sql = `
    SELECT 
        id, 
        name, 
        address,
        ST_Distance_Sphere(geolocation, POINT(?, ?)) AS distance
    FROM theatre
    WHERE geolocation IS NOT NULL
    ORDER BY distance ASC
    LIMIT 3;
  `;

  // Exécution de la requête avec les paramètres
  db.query(sql, [longitude, latitude], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des théâtres proches :", err);
      return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
    res.status(200).json(results);
  });
});


//BONUS 
//SELECT
// elle marche 

// Route pour récupérer les commentaires avec plus de 5 likes
router.get('/comments-with-likes', (req, res) => {
  const sql = `
    SELECT 
        id, 
        comment, 
        JSON_EXTRACT(reactions, '$.likes') AS likes
    FROM Schedule
    WHERE CAST(JSON_EXTRACT(reactions, '$.likes') AS UNSIGNED) > 5;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des commentaires :", err);
      return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
    res.status(200).json(results);
  });
});



// Route pour rechercher des mots-clés dans les synopsis des spectacles
router.get('/search-synopsis', (req, res) => {
  const { keywords } = req.query;

  if (!keywords) {
    return res.status(400).json({ message: "Veuillez fournir des mots-clés à rechercher." });
  }

  // Construire la clause LIKE pour chaque mot-clé
  const keywordArray = keywords.split(' ').map((keyword) => `%${keyword}%`);
  const likeClauses = keywordArray.map(() => `synopsis LIKE ?`).join(' AND ');

  const sql = `
    SELECT 
        id, 
        title, 
        synopsis
    FROM spectacle
    WHERE ${likeClauses};
  `;

  db.query(sql, keywordArray, (err, results) => {
    if (err) {
      console.error("Erreur lors de la recherche :", err);
      return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
    res.status(200).json(results);
  });
});


//resultat api postman
// [
//   {
//     "id": 1,
//     "title": "Rires à la carte",
//     "synopsis": "Un spectacle hilarant avec les meilleurs humoristes du moment.",
//     "score": 0.977118134498596
//   }
// ]

export default router