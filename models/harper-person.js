/*
 Title:  harper-person.js
 Author: James Harper
 Date:   10 September 2023
 Description: 
*/

//Loads the mongoose framework
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creates a Schema for holding text key with string value.
let roleSchema = new Schema({
    text: {type: String}
});

//Creates a Schema for first and last names keys with string values.
let dependentSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String}
});

//New Schema with 3 key value pairs and 2 arrays based on the previous two schemas.
let personSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: {type: String}
});

//Exports the module
module.exports = mongoose.model('Person', personSchema);