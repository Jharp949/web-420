/*
============================================
 Title:  harper-team.js
 Author: James Harper
 Date:   7 October 2023
 Description: Schema for creating a team
===========================================
*/

//Import mongoose module and create a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//New player schema
let playerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    salary: { type: Number}
});

//New team schema
let teamSchema = new Schema({
    name: { type: String },
    mascot: { type: String },
    players: [playerSchema]
});

//Export the team model
module.exports = mongoose.model('Team', teamSchema);