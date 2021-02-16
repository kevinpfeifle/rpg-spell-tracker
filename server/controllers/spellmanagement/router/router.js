'use strict'

const router = require('express').Router();

// Routes calls to spellmanagement to their specified route based on the endpoint passed in the request.
router.use('/spell', require('../spell'))
router.use('/spellbook', require('../spellbook'))


module.exports = router;