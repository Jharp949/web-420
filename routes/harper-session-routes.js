/*
 Title:  harper-session-routes.js
 Author: James Harper
 Date:   17 September 2023
 Description: Routes the session API
*/

//Create variables to require express, router, user model, and bcrypt.
const express = require('express');
const router = express.Router();
const User = require('../models/harper-user');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *      - Users
 *     name: Signup
 *     summary: Username, Password and Email
 *     requestBody:
 *       description: Register a new user with password and e-mail address
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *              - userName
 *              - password
 *              - emailAddress
 *             properties:
 *              userName:
 *                 type: string
 *              password:
 *                 type: string
 *              emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/signup", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        res.status(501).send({
          message: "MongoDB Exception",
        });
      } else {
        //Create User if is does not already exist in the database. If is does exist, send 401 error
        if (!user) {
          //Hash encrypted password for bcrypt
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

          const newRegisteredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            emailAddress: req.body.emailAddress
          };
          //Creates a new user with username, hashed password, and email
          User.create(newRegisteredUser, function (err, registeredUser) {
            if (err) {
              res.status(501).send({
                message: "MongoDB Exception",
              });
            } else {
              res.json(registeredUser);
            }
          });
        } else {
          res.status(401).send({
            message: "Username is already in use.",
          });
        }
      }
    });
  } catch (e) {
    res.status(500).send({
      message: "Server Exception",
    });
  }
});

  /**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     name: login
 *     summary: User login
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
  router.post("/login", async (req, res) => {
    try {
      User.findOne({ userName: req.body.userName }, function (err, user) {
        if (err) {
          res.status(501).send({
            message: "MongoDB Exception",
          });
        } else {
          if (user) {

            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  
            //Allows login if user password matches the database stored password
            if (passwordIsValid) {
              res.status(200).send({
                message: "User logged in",
              });
              //If user password and database password do not match, send error code 401
            } else {
              res.status(401).send({
                message: "Invalid username and/or password",
              });
            }
          } else {
            res.status(401).send({
              message: `Invalid username and/or password`,
            });
          }
        }
      });
    } catch (e) {
      res.status(500).send({
        message: "Server Exception",
      });
    }
  });
  
  module.exports = router;