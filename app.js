/*
============================================
 Title:  app.js
 Author: James Harper
 Date:   26 August 2023
 Description: Server configuration
===========================================
*/

//Highlights potential problems within the code
"use strict";

//Variables for express, mongoose, http, swagger-ui-express and swagger-jsdoc
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
//Runs routes and composer apps
const composerAPI = require('./routes/harper-composer-routes');
const Composer = require('./models/harper-composer');

//app variable set to express library
const app = express();

//Set the port to 3000
const PORT = process.env.PORT || 3000;
//Mounts specific middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection string
const conn = 'mongodb+srv://web420_user:waduhek@bellevueuniversity.w2mknhu.mongodb.net/web420DB';

// Connect to MongoDB
mongoose
  .connect(conn)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not Connected to MongoDB ERROR! ", err);
  });

//object literal displaying the options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WEB 420 RESTful APIs",
            version: "1.0.0",
        },
    },
    apis: ['./routes/harper-composer-routes.js'],
};
//stores the function swaggerJsdoc with options as a parameter
const openapiSpecification = swaggerJsdoc(options);
//Mounts middleware for swaggerUi
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
//Use the composer API
app.use('/api', composerAPI)
//function that listens for a client at port 3000.
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`);
});
