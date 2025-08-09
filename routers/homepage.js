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

// Login page route
router.get('/login', (req, res) => {
    console.log("login route hit");
    res.render('login');
});

// Profile page route
router.get('/profile', (req, res) => {
    console.log("profile route hit");
    res.render('profile');
});

// Generic vehicle details route
router.get('/vehicle/:slug', (req, res) => {
  const { slug } = req.params;
  const allowedSlugs = [
    'BMWM4G82',
    'audi-rs5',
    'skoda-octavia',
    'dodge-ram',
    'mazda-miata',
    'ford-raptor',
    'nissan-patrol',
    'cadillac-escalade',
    'corvette',
    'porsche-gt3'
  ];

  if (!allowedSlugs.includes(slug)) {
    return res.status(404).send('Vehicle not found');
  }

  res.render(slug);
});

// Backward-compatibility: redirect old .html links to the new dynamic route
router.get('/:slug.html', (req, res, next) => {
  const { slug } = req.params;
  const allowedSlugs = [
    'BMWM4G82',
    'audi-rs5',
    'skoda-octavia',
    'dodge-ram',
    'mazda-miata',
    'ford-raptor',
    'nissan-patrol',
    'cadillac-escalade',
    'corvette',
    'porsche-gt3'
  ];

  if (allowedSlugs.includes(slug)) {
    return res.redirect(301, `/vehicle/${slug}`);
  }
  return res.status(404).send('Not found');
});

module.exports = router;


