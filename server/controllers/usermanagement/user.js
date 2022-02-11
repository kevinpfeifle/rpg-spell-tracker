'use strict'

// External import for express routing.
const router = require('express').Router();

// Internal imports for our models.
const user = require('./models/user');

/**
 * The router for the "user" path of usermanagement. Queries the DB to fetch a single user that matches the same user in the current session.
 * Accepts a GET request with the query string parameter "userid"
 */
router.get('/', (req, res) => {
    let resJson = {
        'status': 'success',
        'message': 'Access denied',
        'data': []
    };
    if (req.query != null || req.query.userid != null) {
        if (req.session && req.session.authenticated) {
            if (req.session.userId === parseInt(req.query.userid)) {
                user.fetchUserById(req.query.userid).then((results) => {
                    if (results) {
                        resJson.message = 'Data retrieved';
                        resJson.data = results;
                        res.status(200).json(resJson);
                    } else {
                        // No Data.
                        resJson.message = 'User does not own this resource or it does not exist, for userid ' + req.query.userid;
                        res.status(200).send(resJson);
                    }
                }).catch((err) => {
                    resJson.status = 'failure';
                    resJson.message = 'Error encountered fetching user information';
                    resJson.error = err;
                    res.status(200).json(resJson);
                });
            } else {
                // Give no data back, user doesn't own this resource.
                resJson.message = 'User does not own this resource or it does not exist, for userid ' + req.query.userid;
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


router.put('/userPreferences', (req, res) => {
    let resJson = {
        'status': 'failure',
        'message': 'Access denied',
        'data': []
    };
    if (req.body != null && req.body.userId != null && req.body.characterId !== undefined) {
        if (req.session && req.session.authenticated) {
            if (req.session.userId === parseInt(req.body.userId)) {
                user.updateUserPreferences(req.body.userId, req.body.characterId).then((results) => {
                    if (results) {
                        resJson.status = 'success';
                        resJson.message = 'User preferences updated';
                        resJson.data = results;
                        res.status(201).json(resJson);
                    } else throw new Error();
                }).catch((err) => {
                    resJson.message = 'Error encountered setting user preferences';
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