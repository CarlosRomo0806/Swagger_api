const { Db } = require('mongodb');
const Database = require('./../models/database');
const router = require('express').Router();
const path = require('path');
const UsersController = require('../controllers/users.controller');


/**
 * @swagger
 * 
 * /api/users:
 *   post:
 *     summary: Creates new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: Email and password
 *             type: object
 *           example: 
 *             name: "Carlos Romo"
 *             email: "Carlorp@test.com"
 *             password: "ContraseñaLOL"
 *             username: "Carlos"
 *     responses:
 *       201:
 *         description: User created correctly!
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: User does not exist!
 */
router.post('/',UsersController.sign);

/**
 * @swagger
 * 
 * /api/users/login:
 *   post:
 *     summary: user login 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: Email and password
 *             type: object
 *           example: 
 *             email: "Carlos@test.com"
 *             password: "Contra2LOL"
 *     responses:
 *       201:
 *         description: Login sucess
 *       403:
 *         description: Incorrect password! 
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: User does not exist!
 */
router.post('/login',UsersController.login);


module.exports = router;