const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const RoomsController = require('../controllers/rooms.controller');

/**
 * @swagger
 * 
 * /api/rooms:
 *   post:
 *     summary: Creates new chat
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: Email and password
 *             type: object
 *           example: 
 *             name: "Carlos Romo"
 *     responses:
 *       201:
 *         description: User created correctly!
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: User does not exist!!  
 */
router.post('/',RoomsController.create);
/**
 * @swagger
 * 
 * /api/rooms/link:
 *   post:
 *     summary: Creates link for registration
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: Your chat
 *             type: object
 *           example: 
 *             name: "Carlos Romo"
 *     responses:
 *       201:
 *         description: Link created correctly!
 *       401:
 *         description: Unauthorized!
 *       400:
 *         description: Room does not exist!  
 */
router.post('/link',RoomsController.createLink);
/**
 * @swagger
 * 
 * /api/rooms/link/{id}:
 *   post:
 *     summary: Link for registration
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example:
 *          dkal30aoe
 *     responses:
 *       201:
 *         description: User register correctly!
 *       400:
 *         description: User already register!
 *       404:
 *         description: Room does not exist!  
 */
router.post('/link/:id', RoomsController.signRoomLink);

module.exports = router;