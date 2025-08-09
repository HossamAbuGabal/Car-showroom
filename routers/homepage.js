const express = require('express');
const router = express.Router()
const User = require('../models/User');

router.get('/', (req, res) => {
    console.log("Homepage route hit");
  res.render('homepage'); 
});

// Auth pages
router.get('/login', (req, res) => {
  res.render('login', { tab: 'login' });
});

router.get('/signup', (req, res) => {
  res.render('login', { tab: 'signup' });
});

// Protected profile page
router.get('/profile', async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.redirect('/login');
    }
    const user = await User.findById(req.session.user._id).lean();
    if (!user) {
      req.session.destroy(() => {});
      return res.redirect('/login');
    }
    res.render('profile', { user });
  } catch (err) {
    console.error('Profile route error:', err);
    res.status(500).send('Server error');
  }
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
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


