'use strict'

const router = require('express').Router();

// Routes calls to spellmanagement to their specified route based on the endpoint passed in the request.
router.use('/login', require('../login'));
router.use('/register', require('../register'));

module.exports = router;