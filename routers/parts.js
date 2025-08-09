const express = require('express');
const router = express.Router();

router.get('/engine', (req, res) => {
  res.render('Engine'); // Make sure Engine.ejs exists in your views folder
});

router.get('/electrical', (req, res) => {
  res.render('Electrical');
});

router.get('/service-parts', (req, res) => {
  res.render('Service-Parts');
});

router.get('/braking', (req, res) => {
  res.render('Braking');
});

router.get('/transmission', (req, res) => {
  res.render('Transmission');
});

router.get('/suspension', (req, res) => {
  res.render('Suspension');
});

module.exports = router;