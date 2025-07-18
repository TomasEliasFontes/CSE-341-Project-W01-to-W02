// server.js
const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

// Middleware: parse JSON bodies
app.use(express.json());

//Swagger routes
app.use('/', require('./routes/swagger'));

// Routes to POST, GET, PUT and DELETE.
app.use('/', require('./routes'));


mongodb.intDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
     app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});     
    }
});


