'use strict'

const router = require('express').Router();

// Routes calls to charactermanagement to their specified route based on the endpoint passed in the request.
router.use('/characteroverview', require('../character'));

module.exports = router;