'use strict'

const db = require('../../../database/db');
const queries = require('./queries');

function fetchCharacterOverview(userId, characterId) {
    return new Promise((resolve, reject) => {
        let query = queries.fetchCharacterOverview;
        db.executeQuery('tool', query, [userId, characterId]).then((results) => {
            resolve(results[0]);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    fetchCharacterOverview: fetchCharacterOverview
};