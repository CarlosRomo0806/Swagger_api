const router = require('express').Router();
const usersRoutes = require('./users');
const roomsRoutes = require('./rooms');
const messagesRoutes= require('./messages')

router.use('/users', usersRoutes);
router.use('/rooms', roomsRoutes);
router.use('/messages',messagesRoutes);

module.exports = router;
