const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

// Router imports
const homeRoutes = require("./routers/homepage");
const favoritesRouter = require('./routers/favorites');
const partsRouter = require('./routers/parts');

const app = express();
const uri = 'mongodb+srv://hossam2303403:<db_password>@car-showroom.x3nzauz.mongodb.net/';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Mount routers in correct order
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