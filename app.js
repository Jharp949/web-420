//Highlights potential problems within the code
"use strict";

//Variables for express, mongoose, http, swagger-ui-express and swagger-jsdoc
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

//app variable set to express library
const app = express();

//Set the port to 3000
const PORT = process.env.PORT || 3000;
//Mounts specific middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//object literal displaying the options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WEB 420 RESTful APIs",
            version: "1.0.0",
        },
    },
    apis: ['./routes/*.js'],
};
//stores the function swaggerJsdoc with options as a parameter
const openapiSpecification = swaggerJsdoc(options);
//Mounts middleware for swaggerUi
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
//function that listens for a client at port 3000.
app.listen(PORT, () => {
    console.log('Application started and listening on PORT ' + PORT);
});
