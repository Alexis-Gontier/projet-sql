const express = require('express');
const router = express.Router();

// Exemple de route simple
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Express.js!' });
});

// TODO: Ajouter d'autres routes ici

module.exports = router;
