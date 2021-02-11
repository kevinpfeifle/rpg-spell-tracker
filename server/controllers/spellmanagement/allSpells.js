'use strict'

// External import for express routing.
const router = require('express').Router();

// Internal imports for our models.
const spells = require('./models/spells');

/**
 * The router for the "allspells" path of spellmanagement. Queries the DB to fetch all spells.
 * Accepts a GET request.
 */
router.get('/', (req, res) => {
    spells.fetchAllSpells().then((results) => {
        res.status(200).json({
            'spells': results
        });
    }).catch((err) => {
        res.status(200).json({
            'error': err
        });
    });
});

module.exports = router;