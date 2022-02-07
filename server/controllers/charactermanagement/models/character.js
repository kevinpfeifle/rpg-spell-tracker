'use strict'

const db = require('../../../database/db');
const queries = require('./queries');

function fetchCharacterOverview(characterId) {
    return new Promise((resolve, reject) => {
        let query = queries.fetchCharacterOverview;
        db.executeQuery('tool', query, [characterId]).then((results) => {
            resolve(results[0]);
        }).catch((err) => {
            reject(err);
        });
    });
}

function fetchAllCharacterOverviews(userId) {
    return new Promise((resolve, reject) => {
        let query = queries.fetchAllCharacterOverviews;
        db.executeQuery('tool', query, [userId]).then((results) => {
            resolve(results);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    fetchCharacterOverview: fetchCharacterOverview,
    fetchAllCharacterOverviews: fetchAllCharacterOverviews
};