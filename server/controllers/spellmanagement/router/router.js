'use strict'

const router = require('express').Router();

// Routes calls to spellmanagement to their specified route based on the endpoint passed in the request.
router.use('/spells', require('../spells'))
router.use('/allspells', require('../allSpells'))

module.exports = router;