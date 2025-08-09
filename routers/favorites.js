// backend/routers/favorites.js
const express = require('express');
const router = express.Router();

let favorites = [];

// Add to favorites
router.post('/', (req, res) => {
  const car = req.body;
  if (!favorites.find(f => f.title === car.title)) {
    favorites.push(car);
  }
  res.sendStatus(200);
});

// Remove from favorites
router.delete('/', (req, res) => {
  const { title } = req.body;
  favorites = favorites.filter(f => f.title !== title);
  res.sendStatus(200);
});

// Show favorites page
router.get('/', (req, res) => {
  res.render('favorites', { favorites });
});

module.exports = router;
