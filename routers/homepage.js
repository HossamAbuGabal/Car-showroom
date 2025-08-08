const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    console.log("Homepage route hit");
  res.render('homepage'); 
});

//link number 1 for vehicles
router.get('/vehicles', (req, res) => {
    console.log("vehicles route hit");
    res.render('vehicles');
});

//link number 2 for parts
router.get('/Parts', (req, res) => {
    console.log("Parts route hit");
    res.render('Parts');
});

//link number 3 for about
router.get('/about', (req, res) => {
    console.log("about route hit");
    res.render('about');
});

//link number 4 for contact
router.get('/contact', (req, res) => {
    console.log("contact route hit");
    res.render('contact');
});

//link number 5 for favorites

router.get('/favorites', (req, res) => {
  const favorites = req.session.favorites || []; 
  res.render('favorites', { favorites });
});

module.exports = router;


