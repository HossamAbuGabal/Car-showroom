require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();
const uri = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Routes
app.get('/', (req, res) => {
    res.render('homepage');  // <-- homepage.ejs will render
});

// Example routes (you can add more)
app.get('/vehicles', (req, res) => {
    res.render('vehicles');
});

app.get('/parts', (req, res) => {
    res.render('Parts');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/login', (req, res) => {
    res.render('login');
});

mongoose.connect(uri) //this tries to connect to your database by linking it using the connection string
.then(() => { //this code only starts if the connection works, otherwise it's ignored
    console.log('MongoDB Connected') //if you see this message in the terminal when you run your app then connection was successful

    /*this starts your server and listens for incoming visitors on this port number
    the '0.0.0.0' is just to say that you can listen from anywhere*/
    app.listen(process.env.PORT, '0.0.0.0', () => {
        console.log(`Server is on http://localhost:${process.env.PORT}`)
    });
})
.catch((err) => console.error('MongoDB Connection Error: ', err)); //if something goes wrong this catches the error and prints it in the terminal
// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
// Export the app for testing or further configuration
module.exports = app;
