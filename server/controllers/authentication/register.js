'use strict'

// External import for express routing.
const router = require('express').Router();
// External import for cryptograhpic functions.
const bcrypt = require('bcrypt');
// Internal imports for our models.
const user = require('./models/user');
const { registerUser } = require('./models/queries');

// Route to register a new user.
router.put('/', (req, res) => {
    if (req.body != null && req.body !== {}) {
        let input = {...req.body, ...req.headers};
        if (input.password === '' || input.password.length <= 6) {
            // Respond with an error for the password being short.
            res.status(200).json({
                'error': 'password too short'
            });
        } else {
            // Hash and salt the password with a 10 round salt for added security.
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(input.password, salt, (err, hash) => {
                    input.password = hash; // Overwrite the given password with the hashed one before storing in DB.
                    user.registerUser(input).then((results) => {
                        console.log('Successfully registered user');
                        if (!req.session.authenticated) req.session.authenticated = true;
                        res.status(200).json({
                            'status': 'success'
                        });
                    }).catch((err) => {
                        res.status(200).json({
                            'error': err
                        });
                    });
                });
            });
        }
    } else res.status(200).json({
        'error': 'missing required parameters'
    });
});

// Route to check a new user's desired username without needing to submit the form.
router.get('/checkUsername', (req, res) => {
    if (req.query.username != null && req.query.username !== '') {
        let username = req.query.username;
        user.checkUsername(username).then((results) => {
            res.status(200).json({
                'status': 'success',
                'exists': results.exists
            });
        }).catch((err) => {
            console.log(err);
            res.status(200).json({
                'error': err
            });
        });
    } else res.status(200).json({
        'error': 'missing required parameters'
    });
});

// Route to check a new user's desired email without needing to submit the form.
router.get('/checkEmail', (req, res) => {
    if (req.query.email != null && req.query.email !== '') {
        let email = req.query.email;
        user.checkEmail(email).then((results) => {
            res.status(200).json({
                'status': 'success',
                'exists': results.exists
            });
        }).catch((err) => {
            console.log(err);
            res.status(200).json({
                'error': err
            }); 
        });
    } else res.status(200).json({
        'error': 'missing required parameters'
    });
});

module.exports = router;