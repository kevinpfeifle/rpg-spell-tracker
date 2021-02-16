'use strict'

// External import for express routing.
const router = require('express').Router();

// Internal imports for our models.
const spellbook = require('./models/spellbook');

/**
 * The router for the "spells" path of spellmanagement. Queries the DB to fetch a single spell if spell id provided, otherwise sends ALL spells.
 * Accepts a GET request with the query string parameter "spellid"
 */
router.get('/', (req, res) => {
    if (req.query != null) {
        if (req.query.spellbookid != null) {
            spellbook.fetchSpellbookById(parseInt(req.query.spellbookid)).then((results) => {
                if (results) {
                    res.status(200).json({
                        'spellbook': {
                            'spells': results
                        }
                    });
                } else res.status(204).send();
            }).catch((err) => {
                res.status(200).json({
                    'error': err
                });
            });
        } else res.status(200).json({
            'error': 'spellbookid is a required parameter'
        });
    } else res.status(200).json({
        'error': 'spellbookid is a required parameter'
    });
});

module.exports = router;