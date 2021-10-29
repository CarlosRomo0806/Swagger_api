const { Db } = require('mongodb');
const Database = require('./../models/database');
const path = require('path');
const router = require('express').Router();
const swaggerJsDoc= require('swagger-jsdoc');
const swaggerUI= require('swagger-ui-express');
const MessagesController = require('../controllers/messages.controller');

/**
 * @swagger
 * 
 * /api/messages:
 *   post:
 *     summary: Creates new message in chat
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: Chat´s name and the message to post
 *             type: object
 *           example: 
 *             room: "akj3ndj91"
 *             message: "Prueba"
 *     responses:
 *       201:
 *         description: Message post correctly!
 *       401:
 *         description: User does not register in the chat!
 *       400:
 *         description: Room does not exist!!  
 */

router.post('/',MessagesController.newMessage);

module.exports= router;