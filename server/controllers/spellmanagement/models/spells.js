'use strict'

const db = require('../../../database/db');
const queries = require('./queries');

/**
 * Queries the DB to fetch a spell by the provided spell id.
 * @param {Number} spellId 
 * @returns the requested spell.
 */
function fetchSpellById(spellId) {
    return new Promise((resolve, reject) => {
        let query = queries.fetchSpellById;
        db.executeQuery(query, [spellId]).then((results) => {
            resolve(results[0]);
        }).catch((err) => {
            reject(err);
        });
    });
}

/**
 * Queries the DB to fetch all spells under the "spell.spells" table.
 * @returns all fetched spells.
 */
function fetchAllSpells() {
    return new Promise((resolve, reject) => {
        let query = queries.fetchAllSpells;
        db.executeQuery(query).then((results) => {
            resolve(results);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    fetchSpellById: fetchSpellById, 
    fetchAllSpells: fetchAllSpells
};