'use strict'

// External import for express routing.
const router = require('express').Router();

// Internal imports for our models.
const characterPortrait = require('./models/characterPortrait');

/**
 * The router for the "characterportrait" path of charactermanagement. Takes character id and user id as input.
 * Accepts a GET request to get the base64 string and encoding tags for a character portrait.
 */
router.get('/', (req, res) => {
    let resJson = {
        'status': 'failure',
        'message': 'Access denied',
        'data': []
    };
    if (req.query != null && req.query.userid != null && req.query.characterid != null) {
        if (req.session && req.session.authenticated) {
            characterPortrait.fetchCharacterOwnership(req.query.characterid).then((results) => {
                if (results) {
                    // Checking this for now -- later once there are permissions for other users it will have to change.
                    if (req.query.userid == results.user_id) {
                        // The user does own this resource and can update the portrait image on the character.
                        characterPortrait.fetchCharacterPortrait(req.query.characterid).then((portraitResults) => {
                            if (portraitResults) {
                                resJson.status = 'success';
                                resJson.message = 'Character portrait retrieved';
                                resJson.data = portraitResults;
                                res.status(200).json(resJson);
                            } else throw new Error();
                        }).catch((err) => {
                            resJson.message = 'Error encountered fetching character portrait';
                            resJson.error = err;
                            res.status(500).json(resJson);
                        });
                    } else {
                        // Give no data back, user doesn't own this resource.
                        resJson.message = 'Access denied, user does not have permission to access this resource';
                        res.status(403).send(resJson);
                    }
                } else {
                    // No Data.
                    resJson.message = 'Resource does not exist, for characterId ' + req.query.characterid;
                    res.status(404).send(resJson);
                }
            }).catch((err) => {
                resJson.message = 'Error encountered fetching character ownership';
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

/**
 * The router for the "characterportrait" path of charactermanagement. Puts the character portrait image into the DB character portrait table.
 * Accepts a PUT request with the a body containing the base64 encoded image string, the characterid, and the userid.
 */
router.put('/', (req, res) => {
    let resJson = {
        'status': 'failure',
        'message': 'Access denied',
        'data': []
    };
    if (req.body != null && req.body.userId != null && req.body.characterId != null && req.body.portraitBase64 != null && req.body.portraitEncodeTag != null) {
        if (req.session && req.session.authenticated) {
            // Ensure the user has the rights to create a portrait for this character.
            if (req.session.userId === req.body.userId) {
                characterPortrait.fetchCharacterOwnership(req.body.characterId).then((results) => {
                    if (results) {
                        if (req.session.userId === results.user_id) {
                            // The user does own this resource and can update the portrait image on the character.
                            characterPortrait.upsertCharacterPortrait(req.body.portraitBase64, req.body.portraitEncodeTag, req.body.characterId, req.body.userId).then((upsertResults) => {
                                if (upsertResults) {
                                    resJson.status = 'success';
                                    resJson.message = 'Character portrait updated';
                                    resJson.data = upsertResults;
                                    res.status(201).json(resJson);
                                } else throw new Error();
                            }).catch((err) => {
                                resJson.message = 'Error encountered updating character portrait';
                                resJson.error = err;
                                res.status(500).json(resJson);
                            });
                        } else {
                            // Give no data back, user doesn't own this resource.
                            resJson.message = 'Access denied, user does not have permission to access this resource';
                            res.status(403).send(resJson);
                        }
                    } else {
                        // No Data.
                        resJson.message = 'Resource does not exist, for characterId ' + req.body.characterId;
                        res.status(404).send(resJson);
                    }
                }).catch((err) => {
                    resJson.message = 'Error encountered fetching character ownership';
                    resJson.error = err;
                    res.status(500).json(resJson);
                });
            } else {
                // Give no data back, user doesn't own this resource.
                resJson.message = 'Access denied, user does not have permission to access this resource';
                res.status(403).send(resJson);
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