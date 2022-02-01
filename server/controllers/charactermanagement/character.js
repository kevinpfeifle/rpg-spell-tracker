'use strict'

// External import for express routing.
const router = require('express').Router();

// Internal imports for our models.
const character = require('./models/character');

/**
 * The router for the "character" path of charactermanagement. Queries the DB to fetch a single spell if spell id provided, otherwise sends ALL spells.
 * Accepts a GET request with the query string parameter "spellid"
 */
router.get('/', (req, res) => {
    let resJson = {
        'status': 'failure',
        'message': 'Access denied',
        'data': []
    };
    if (req.query != null || req.query.userid != null || req.query.characterid != null) {
        if (req.session && req.session.authenticated) {
            // User is authenticated and is trying to access an owned resource. Return character overview information.
            character.fetchCharacterOverview(req.query.characterid).then((results) => {
                if (results) {
                    if (req.session.userId === results.user_id) {
                        resJson.status = 'success';
                        resJson.message = 'Data retrieved';
                        resJson.data = results;
                        res.status(200).json(resJson);
                    } else {
                        // Give no data back, user doesn't own this resource.
                        resJson.message = 'Access denied, user does not have permission to access this resource';
                        res.status(403).send(resJson);
                    }
                } else {
                    // No Data.
                    resJson.message = 'Resource does not exist, for characterid ' + req.query.characterid;
                    res.status(404).send(resJson);
                }
            }).catch((err) => {
                resJson.message = 'Error encountered fetching character information';
                resJson.error = err;
                res.status(500).json(resJson);
            });
        } else {
            // Give no data back. Not authed.
            res.status(401).json(resJson);
        }
    } else {
        // Give no data back. Request malformed.
        resJson.message = 'Required parameters are missing';
        res.status(400).json(resJson);
    }
});

module.exports = router;