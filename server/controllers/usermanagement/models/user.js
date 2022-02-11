'use strict'

const db = require('../../../database/db');
const queries = require('./queries');

/**
 * Queries the DB to fetch a user by the provided user id.
 * @param {Number} userId 
 * @returns the requested user.
 */
function fetchUserById(userId) {
    return new Promise((resolve, reject) => {
        let query = queries.fetchUserById;
        db.executeQuery('users', query, [userId]).then((results) => {
            resolve(results[0]);
        }).catch((err) => {
            reject(err);
        });
    });
}

/**
 * Updates the DB to set the user's favorite character. NOTE: Eventually this may expand to other items.
 * @param {Number} userId 
 * @param {Number} characterId 
 * @returns the query result.
 */
function updateUserPreferences(userId, characterId) {
    return new Promise((resolve, reject) => {
        let query = queries.updateUserPreferences;
        db.executeQuery('users', query, [userId, characterId]).then((results) => {
            resolve(results);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    fetchUserById: fetchUserById,
    updateUserPreferences: updateUserPreferences
};