'use strict'

const db = require('../../../database/db');
const queries = require('./queries');

/**
 * Queries the DB to fetch a spellbook by the provided spellbook id.
 * @param {Number} spellId 
 * @returns the requested spell.
 */
function fetchSpellbookById(spellId) {
    return new Promise((resolve, reject) => {
        let query = queries.fetchSpellbookById;
        db.executeQuery('tool', query, [spellId]).then((results) => {
            resolve(results);
        }).catch((err) => {
            reject(err);
        });
    });
}

function updateSpellbookSpell(input) {
    return new Promise((resolve, reject) => {
        let query = queries.updateSpellbookSpell;
        db.executeQuery('tool', query, [input.spellPrepared, input.sender, new Date(), input.spellbookId, input.spellId]).then((results) => {
            resolve(results);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    fetchSpellbookById: fetchSpellbookById,
    updateSpellbookSpell: updateSpellbookSpell
};