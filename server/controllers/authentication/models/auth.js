'use strict'

const db = require('../../../database/db');
const queries = require('./queries');

/**
 * Queries the DB to fetch the password hash to compare for logins.
 * @param {Object} input the username and password for the user. 
 */
function fetchUserLoginDetails(input) {
    return new Promise((resolve, reject) => {
        let query = input.usernameOrEmail.includes('@') ?
            queries.fetchEmailLoginDetail :
            queries.fetchUserLoginDetails;
        db.executeQuery('users', query, [input.usernameOrEmail]).then((results) => {
            resolve(results[0]);
        }).catch((err) => {
            reject(err);
        });
    });
}

/**
 * 
 * @param {Object} input the username, email, and password for the user. 
 */
function registerUser(input) {
    return new Promise((resolve, reject) => {
        let query = queries.registerUser;
        db.executeQuery('users', query, [input.username, input.email, input.password, new Date(), input.sender]).then((results) => {
            resolve(results[0]);
        }).catch((err) => {
            reject(err);
        });
    });
}

/**
 * Queries the DB to check if the given username already exists.
 * @param {String} username 
 * @returns bool representing the state of the username.
 */
function checkUsername(username) {
    return new Promise((resolve, reject) => {
        let query = queries.checkUsername;
        db.executeQuery('users', query, [username]).then((results) => {
            resolve(results[0]);
        }).catch((err) => {
            reject(err);
        });
    });
}

/**
 * Queries the DB to check if the given email already exists.
 * @param {String} email 
 * @returns bool representing the state of the email.
 */
function checkEmail(email) {
    return new Promise((resolve, reject) => {
        let query = queries.checkEmail;
        db.executeQuery('users', query, [email]).then((results) => {
            resolve(results[0]);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    fetchUserLoginDetails: fetchUserLoginDetails,
    registerUser: registerUser,
    checkUsername: checkUsername,
    checkEmail: checkEmail
}