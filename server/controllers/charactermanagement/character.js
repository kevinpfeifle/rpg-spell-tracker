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
        'status': 'success',
        'message': 'Access denied',
        'data': []
    };
    if (req.query != null || req.query.userid != null || req.query.characterid != null) {
        if (req.session && req.session.authenticated) {
            if (req.session.userId === parseInt(req.query.userid)) {
                // User is authenticated and is trying to access an owned resource. Return character overview information.
                character.fetchCharacterOverview(req.query.userid, req.query.characterid).then((results) => {
                    if (results) {
                        resJson.message = 'Data retrieved';
                        resJson.data = results;
                        res.status(200).json(resJson);
                    } else {
                        // No Data.
                        resJson.message = 'User does not own this resource or it does not exist, for characterid ' + req.query.characterid;
                        res.status(200).send(resJson);
                    }
                }).catch((err) => {
                    resJson.status = 'failure';
                    resJson.message = 'Error encountered fetching character information';
                    resJson.error = err;
                    res.status(200).json(resJson);
                });
            } else {
                // Give no data back, user doesn't own this resource.
                resJson.message = 'Access denied, user does not own this resource';
                res.status(200).send(resJson);
            }
        } else {
            // Give no data back. Not authed.
            res.status(200).json(resJson);
        }
    } else {
        // Give no data back. Request malformed.
        resJson.status = 'failure';
        resJson.message = 'Required parameters are missing';
        res.status(200).json(resJson);
    }
});

module.exports = router;