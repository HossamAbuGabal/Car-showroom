const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, 'env.local') });

// Router imports
const homeRoutes = require("./routers/homepage");
const favoritesRouter = require('./routers/favorites');
const partsRouter = require('./routers/parts');
const authRouter = require('./routers/auth');

const app = express();
const uri = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'images'));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers in correct order
app.use('/api/auth', authRouter);
app.use('/parts', partsRouter);
app.use('/favorites', favoritesRouter);
app.use('/', homeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});

// Try to connect to MongoDB (optional)
mongoose.connect(uri)
.then(() => {
    console.log('MongoDB Connected')
})
.catch((err) => {
    console.log('MongoDB Connection Error: ', err.message);
    console.log('Server is running without database connection');
});

// Export the app for testing or further configuration
module.exports = app;