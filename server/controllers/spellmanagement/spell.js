'use strict'

// External import for express routing.
const router = require('express').Router();

// Internal imports for our models.
const spell = require('./models/spell');

/**
 * The router for the "spells" path of spellmanagement. Queries the DB to fetch a single spell if spell id provided, otherwise sends ALL spells.
 * Accepts a GET request with the query string parameter "spellid"
 */
router.get('/', (req, res) => {
    if (req.query != null) {
        if (req.query.spellid != null) {
            spell.fetchSpellById(parseInt(req.query.spellid)).then((results) => {
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
        } else {
            spell.fetchAllSpells().then((results) => {
                res.status(200).json({
                    'spells': results
                });
            }).catch((err) => {
                res.status(200).json({
                    'error': err
                });
            });
        }
    } else {
        spell.fetchAllSpells().then((results) => {
            res.status(200).json({
                'spells': results
            });
        }).catch((err) => {
            res.status(200).json({
                'error': err
            });
        });
    }
});

// Route to create a new spell.
router.post('/', (req, res) => {
    if (req.body != null && req.body !== {}) {
        let input = {...req.body, ...req.headers};
        spell.insertSpell(input).then((results) => {
            res.status(200).json({
                'status': 'success'
            });
        }).catch((err) => {
            res.status(200).json({
                'error': err
            });
        });
    } else res.status(200).json({
        'error': 'missing required parameters'
    });
});

module.exports = router;