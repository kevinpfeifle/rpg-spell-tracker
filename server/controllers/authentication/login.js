'use strict'

// External import for express routing.
const router = require('express').Router();
// External import for cryptograhpic functions.
// const bcrypt = require('bcrypt');
// Internal imports for our models.
// const user = require('./models/user');
// const { registerUser } = require('./models/queries');

// Route to check if a user's cookie is already authenticated with the server.
router.get('/checkAuth', (req, res) => {
    // console.log(req);
    if (req.session && req.session.authenticated) {
        res.status(200).json({
            'status': 'success',
            'authenticated': true,
            'message': 'Access allowed'
        });
    } else res.status(200).json({
        'status': 'success',
        'authenticated': false,
        'message': 'Access denied'
    });
});

module.exports = router;