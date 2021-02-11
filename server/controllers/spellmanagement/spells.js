'use strict'

// External import for express routing.
const router = require('express').Router();

// Internal imports for our models.
const spells = require('./models/spells');

/**
 * The router for the "spells" path of spellmanagement. Queries the DB to fetch a single spell.
 * Accepts a GET request with the query string parameter "spellid"
 */
router.get('/', (req, res) => {
    if (req.query != null) {
        if (req.query.spellid != null) {
            spells.fetchSpellById(parseInt(req.query.spellid)).then((results) => {
                if (results) {
                    res.status(200).json({
                        'spell': results
                    });
                } else res.status(204).send();
            }).catch((err) => {
                res.status(200).json({
                    'error': err
                });
            });
        } else res.status(204).send();
    } else res.status(204).send();
});

module.exports = router;