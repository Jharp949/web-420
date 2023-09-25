/*
 Title:  harper-node-shopper-routes.js
 Author: James Harper
 Date:   24 September 2023
 Description: Routes the session API
*/

//Create variables to require express, router, and the person model
const express = require('express');
const router = express.Router();
const Customer = require('../models/harper-customer');

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     description: API for adding a new customer document to MongoDB Atlas
 *     summary: Creates a new customer document
 *     requestBody:
 *       description: customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - price
 *               - quantity
 *             properties:
 *               name:
 *                 type: String
 *               price:
 *                 type: Number
 *               quantity:
 *                 type: Number
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/customers", async (req, res) => {
    try {
      const newCustomer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
      };

      await Customer.create(newCustomer, function (err, customer) {
        if (err) {
          res.status(501).send({
            message: `MongoDB Exception ${err}`
          });
        } else {
          res.json(customer);
        }
      });
    } catch (e) {
      res.status(500).send({
        message: `Server Exception ${e}`
      });
    }
  });

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     tags:
 *       - Invoice
 *     name: createInvoiceByUserName
 *     description: API for creating an invoice
 *     summary: Creates an invoice based on acquired data from the user
 *     requestBody:
 *       description: Invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - username
 *               - subtotal
 *               - tax
*                - dateCreated
 *               - DateShipped
 *               - lineItems
 *             properties:
 *               username:
 *                 type: String
 *               subtotal:
 *                 type: String
 *               tax:
 *                 type: String
 *               dateCreated:
 *                 type: String
 *               dateShipped:
 *                 type: String
 *               lineItems:
 *                 type: Array
 *                 items:
 *                   type: object
 *                   properties:
 *                       name:
 *                           type: String
 *                       price:
 *                           type: Number
 *                       quantity:
 *                           type: Number
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/customers/:userName/invoices', async (req, res) => {
    try {
      Customer.findOne({ userName: req.params.userName }, function (err, customer) {
        if (err) {
          res.status(501).send({
            message: `MongoDB Exception: ${err}`
          });
        } else {
          const newInvoice = {
            subtotal: req.body.subtotal,
            tax: req.body.tax,
            dateCreated: req.body.dateCreated,
            dateShipped: req.body.dateShipped,
            lineItems: req.body.lineItems
          };
          customer.invoices.push(newInvoice);
          customer.save(function (err, updatedCustomer) {
            if (err) {
              res.status(501).send({
                message: `MongoDB Exception: ${err}`,
              });
            } else {
              res.json(updatedCustomer);
            }
          });
        }
      });
    } catch (e) {
      res.status(500).send({
        message: `Server Exception: ${e}`,
      });
    }
  });

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   get:
 *     tags:
 *       - Customer
 *     description: API for returning all invoices based on username.
 *     summary: Display all invoices
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: Customer Username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get("/customers/:userName/invoices", async (req, res) => {
    try {
      Customer.findOne({ userName: req.params.userName }, function (err, customer) {
        if (err) {
          res.status(500).send({
            message: `Server Exception`
          });
        } else {
          res.status(200).send(customer.invoices);
        }
      });
    } catch (e) {
      res.status(501).send({
        message: `MongoDB Exception`
      });
    }
  });

  module.exports = router;
