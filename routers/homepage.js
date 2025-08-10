const express = require('express');
const router = express.Router();
const User = require('../models/User');

const ADMIN_EMAIL = 'admin@carluck.com'; // Change to your admin email

// Helper to check if logged-in user is admin
async function checkAdmin(req) {
  if (req.session && req.session.user) {
    const user = await User.findById(req.session.user._id).lean();
    if (user && user.email === ADMIN_EMAIL) {
      return true;
    }
  }
  return false;
}

// Homepage route with admin check
router.get('/', async (req, res) => {
  console.log('Homepage route hit');
  try {
    const isAdmin = await checkAdmin(req);
    res.render('homepage', {
      user: req.session.user || null,
      isAdmin
    });
  } catch (err) {
    console.error('Error loading homepage:', err);
    res.status(500).send('Server error');
  }
});

// Auth pages
router.get('/login', (req, res) => {
  res.render('login', { tab: 'login', isAdmin: false });
});

router.get('/signup', (req, res) => {
  res.render('login', { tab: 'signup', isAdmin: false });
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
    const isAdmin = await checkAdmin(req);
    res.render('profile', { user, isAdmin });
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

// Vehicles
router.get('/vehicles', async (req, res) => {
  console.log('vehicles route hit');
  const isAdmin = await checkAdmin(req);
  res.render('vehicles', { isAdmin });
});

// Parts
router.get('/Parts', async (req, res) => {
  console.log('Parts route hit');
  const isAdmin = await checkAdmin(req);
  res.render('Parts', { isAdmin });
});

// About
router.get('/about', async (req, res) => {
  console.log('about route hit');
  const isAdmin = await checkAdmin(req);
  res.render('about', { isAdmin });
});

// Contact
router.get('/contact', async (req, res) => {
  console.log('contact route hit');
  const isAdmin = await checkAdmin(req);
  res.render('contact', { isAdmin });
});

// Favorites
router.get('/favorites', async (req, res) => {
  const favorites = req.session.favorites || [];
  const isAdmin = await checkAdmin(req);
  res.render('favorites', { favorites, isAdmin });
});

// Admin page (protected)
router.get('/admin', async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(403).send('Access denied. Admins only.');
    }
    const user = await User.findById(req.session.user._id).lean();
    if (!user || user.email !== ADMIN_EMAIL) {
      return res.status(403).send('Access denied. Admins only.');
    }
    res.render('admin', { user, isAdmin: true });
  } catch (err) {
    console.error('Admin route error:', err);
    res.status(500).send('Server error');
  }
});

// Generic vehicle details route
router.get('/vehicle/:slug', async (req, res) => {
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

  const isAdmin = await checkAdmin(req);
  res.render(slug, { isAdmin });
});

// Backward-compatibility: redirect old .html links
router.get('/:slug.html', (req, res) => {
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
