/*
 Title:  harper-customer.js
 Author: James Harper
 Date:   24 September 2023
 Description: 
*/

//Variables for importing mongoose and creating a Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Defines a new schema for items in the DB
let lineItemSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
});

//Defines a new schema for creating an invoice
let invoiceSchema = new Schema({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema]
});

//Defines a new schema for creating an invoice
let customerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema]
});

//Exports the module
module.exports = mongoose.model('Customer', customerSchema)