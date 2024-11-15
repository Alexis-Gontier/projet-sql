import express from 'express'
import db from '../db/db.js';

const router = express.Router()

router.get('/', (req, res) => {
  res.send("Hello World")
})

router.get('/spectacles', (req, res) => {
  const sql = "SELECT * FROM Spectacle";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des spectacles :", err);
      return res.status(500).send("Erreur de base de données");
    }

    res.json(results);
  });
});

// app.get('/', (req, res) => {
//   const sql = "SELECT * FROM student"
//   db.query(sql, (err, result) => {
//       if (err) return res.json({Message: "Error inside server"})
//       return res.json(result)
//   })
// })

export default router