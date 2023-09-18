/*
 Title:  harper-user.js
 Author: James Harper
 Date:   17 September 2023
 Description: Schema to store user information
*/

//Variables for importing mongoose and creating a Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Defines a new schema
let userSchema = new Schema({
    "userName": { type: String },
    "password": { type: String },
    "emailAddress": { type: Array },
});

//Exports the module
module.exports = mongoose.model('User', userSchema)