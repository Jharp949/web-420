/*
============================================
 Title:  app.js
 Author: James Harper
 Date:   26 August 2023
 Description: Server configuration
===========================================
*/

//Enable strict mode
"use strict";

//Require express, mongoose, http, swagger-ui-express and swagger-jsdoc
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

//Require the composer and person API from the routes file
const composerAPI = require('./routes/harper-composer-routes');
const personAPI = require('./routes/harper-person-routes');
const userAPI = require('./routes/harper-session-routes');
const customerAPI = require('./routes/harper-node-shopper-routes');
const teamAPI = require('./routes/harper-team-routes');

//Create a variable for a MongoDB connection string
const CONN = 'mongodb+srv://web420_user:s3cret@cluster0.sxzp2tj.mongodb.net/web420';

//Connect to MongoDB and output a message stating success for failure to do so
mongoose.connect(CONN, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => {

    console.log('Connection to MongoDB database was successful');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
});

//Create an app variable set to the express library
const app = express();

//Set the port to process.env.PORT || 3000
const PORT = process.env.PORT || 3000;

//App configuration for JSON and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Create an options object containing a title and version number
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WEB 420 RESTful APIs",
            version: "1.0.0",
        },
    },
    //Set the object APIs to be in the routes folder
    apis: ['./routes/*.js']
};

//Declare an openapi specifications variable using the swaggerJsdoc library
const openapiSpecification = swaggerJsdoc(options);

//Wire the openapispecification variable to the app variable
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//Use the composer and person APIs
app.use('/api', composerAPI, personAPI, userAPI, customerAPI, teamAPI);

//Create a server using the PORT
app.listen(PORT, () => {
    console.log('Application started and listening on PORT ' + PORT);
});
