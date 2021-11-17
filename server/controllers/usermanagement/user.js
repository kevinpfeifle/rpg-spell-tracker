'use strict'

// External import for express routing.
const router = require('express').Router();

// Internal imports for our models.
const user = require('./models/user');

/**
 * The router for the "spells" path of spellmanagement. Queries the DB to fetch a single spell if spell id provided, otherwise sends ALL spells.
 * Accepts a GET request with the query string parameter "spellid"
 */
router.get('/', (req, res) => {
    let resJson = {
        'status': 'success',
        'authenticated': false,
        'message': 'Access denied'
    };
    if (req.session && req.session.authenticated) {
        if (req.session.userId) {
            user.fetchUserById(req.session.userId).then((results) => {
                if (results) {
                    resJson = {
                        'status': 'success',
                        'authenticated': true,
                        'user': results
                    }
                    res.status(200).json(resJson);
                } else res.status(204).send();
            }).catch((err) => {
                resJson = {
                    'status': 'success',
                    'authenticated': false,
                    'error': err
                }
                res.status(200).json(resJson);
            });
        } else res.status(200).json(resJson);
    } else res.status(200).json(resJson);
});

module.exports = router;