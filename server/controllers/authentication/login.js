'use strict'

// External import for express routing.
const router = require('express').Router();
// External import for cryptograhpic functions.
const bcrypt = require('bcrypt');
// Internal imports for our models.
const auth = require('./models/auth');

router.post('/', (req, res) => {
    let resJson = {
        'status': 'success',
        'authenticated': false,
        'message': 'Access denied'
    };
    if (req.session && req.session.authenticated) {
        resJson = {
            'status': 'success',
            'authenticated': true,
            'message': 'User already authenticated',
            'payload': {
                'userId': req.session.userId
            }
        };
        res.status(200).json(resJson);
    } else {
        if (req.body != null && req.body !== {}) {
            let input = {...req.body, ...req.headers};
            auth.fetchUserLoginDetails(input).then((user) => {
                if (user) {
                    bcrypt.compare(input.password, user.password_hash, (err, isMatch) => {
                        if (err) {
                            throw new Error(err);
                        }
                        if (isMatch) {
                            req.session.authenticated = true;
                            req.session.userId = user.user_id;
                            resJson = {
                                'status': 'success',
                                'authenticated': true,
                                'message': 'Access granted',
                                'payload': {
                                    'userId': req.session.userId
                                }
                            };
                        }
                        res.status(200).json(resJson);
                    });
                } else {
                    res.status(200).json(resJson);
                }
            }).catch((err) => {
                resJson = {
                    'status': 'success',
                    'authenticated': false,
                    'error': err
                };
                res.status(200).json(resJson);
            });
        } else {
            resJson = {
                'status': 'success',
                'authenticated': false,
                'error': 'missing required parameters'
            };
            res.status(200).json(resJson);
        }
    }
});

// Route to check if a user's cookie is already authenticated with the server.
router.get('/checkIfAuthorized', (req, res) => {
    if (req.session && req.session.authenticated) {
        res.status(200).json({
            'status': 'success',
            'authenticated': true,
            'message': 'Access granted',
            'payload': {
                'userId': req.session.userId
            }
        });
    } else res.status(200).json({
        'status': 'success',
        'authenticated': false,
        'message': 'Access denied'
    });
});

// Route to destroy the user's session with the server whenever the user logs out of the client.
router.post('/logout', (req, res) => {
    if (req.session && req.session.authenticated) {
        req.session.destroy(function(err) {
            res.status(200).json({
                'status': 'success',
                'authenticated': false,
                'message': 'Logged Out'
            });
        });
    } else res.status(200).json({
        'status': 'failure',
        'authenticated': false,
        'message': 'User not authenticated with server'
    });
});

module.exports = router;