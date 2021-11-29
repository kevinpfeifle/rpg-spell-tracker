'use strict'

// External import for express routing.
const router = require('express').Router();

// Internal imports for our models.
const spellbook = require('./models/spellbook');

/**
 * @TODO update to have request format checking for each of the routes -- also need a way to secure the service.
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

router.put('/updatespell', (req, res) => {
    if (req.body != null && req.body !== {}) {
        let input = {...req.body, ...req.headers};
        spellbook.updateSpellbookSpell(input).then((results) => {
            res.status(200).json({
                'status': 'success'
            });
        }).catch((err) => {
            res.status(200).json({
                'error': err
            });
        });
    } else res.status(200).json({
        'error': 'missing required parameters spellbookId and spellId'
    });
});

module.exports = router;