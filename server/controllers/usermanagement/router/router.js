'use strict'

const router = require('express').Router();

// Routes calls to usermanagement to their specified route based on the endpoint passed in the request.
router.use('/user', require('../user'));

module.exports = router;