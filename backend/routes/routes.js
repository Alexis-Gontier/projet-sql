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
      return res.status(500).json({
        message: "Erreur de serveur lors de la récupération des spectacles",
        error: err.message,
        code: err.code
      });
    }
    res.json(results);
  });
});

export default router