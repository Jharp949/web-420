/*
 Title:  harper-composer.js
 Author: James Harper
 Date:   2 September 2023
 Description: Mongoose module for Composer Schema
*/

//Loads the mongoose framework
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creates a Schema which holds blueprint values
let composerSchema = new Schema({
  firstName: {type: String},
  lastName: {type: String}
});

//Exports the module
module.exports = mongoose.model('Composer', composerSchema);
