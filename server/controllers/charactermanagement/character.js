'use strict'

// External import for express routing.
const router = require('express').Router();

// Internal imports for our models.
const character = require('./models/character');

/**
 * The router for the "characteroverview" path of charactermanagement. Queries the DB to fetch all character overviews owned by a user, unless they have filtered it down by characterid
 * Accepts a GET request with the query string parameter "characterid" and "userid"
 */
router.get('/', (req, res) => {
    let resJson = {
        'status': 'failure',
        'message': 'Access denied',
        'data': []
    };
    if (req.query != null && req.query.userid != null) {
        if (req.session && req.session.authenticated) {
            if (req.query.characterid == null) {
                // User is authenticated and is trying to access an owned resource. Return all character overview information since it was not filtered.
                // No need to ever call this for some other user, as no "allowed" user needs to see ALL of another user character's, at least not in scope for now.
                if (req.session.userId == req.query.userid) {
                    character.fetchAllCharacterOverviews(req.query.userid).then((results) => {
                        if (results && results.length > 0) {
                            resJson.status = 'success';
                            resJson.message = 'Data retrieved';
                            resJson.data = results;
                            res.status(200).json(resJson);
                        } else {
                            // No Data.
                            resJson.message = 'No Character resources exist, for userid ' + req.query.userid;
                            res.status(404).send(resJson);
                        }
                    }).catch((err) => {
                        resJson.message = 'Error encountered fetching character information';
                        resJson.error = err;
                        res.status(500).json(resJson);
                    });
                } else {
                    resJson.message = 'Access denied, user does not have permission to access this resource';
                    res.status(403).send(resJson);
                }
            } else {
                // User is authenticated and is trying to access an owned resource. Return character overview information.
                character.fetchCharacterOverview(req.query.characterid).then((results) => {
                    if (results) {
                        if (req.session.userId === results.user_id) {
                            resJson.status = 'success';
                            resJson.message = 'Data retrieved';
                            resJson.data = [results];
                            res.status(200).json(resJson);
                        } else {
                            // TODO: Eventually allow for checking if other users are allowed to access this resource, IE owner allows another user to see it.
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
            }
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