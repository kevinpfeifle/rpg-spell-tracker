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
        db.executeQuery('tool', query, [spellId]).then((results) => {
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
        db.executeQuery('tool', query).then((results) => {
            resolve(results);
        }).catch((err) => {
            reject(err);
        });
    });
}

function insertSpell(input) {
    return new Promise((resolve, reject) => { 
        let query = queries.insertSpell;
        let spellEffects = (input.spellEffects != null) ? input.spellEffects.toString() : input.spellEffects
        let conditions = (input.conditions != null) ? input.conditions.toString() : input.conditions
        let sourceBook = (input.sourceBook != null) ? input.sourceBook.toString() : input.sourceBook
        let sourcePage = (input.sourcePage != null) ? input.sourcePage.toString() : input.sourcePage
        db.executeQuery('tool', query, [
            input.spellName, input.spellLevel, input.spellSchool, input.castingTime, input.concentration, input.spellRange,
            input.spellComponents.toString(), input.materialComponents, input.duration, input.classes.toString(), input.ritual, input.spellAttack,
            input.spellSave, input.damageType, spellEffects, conditions, input.description, input.descriptionHigherLevels,
            input.sourceCategory.toString(), sourceBook, sourcePage, input.spellTags.toString(), new Date(), input.sender
        ]).then((results) => {
            resolve(results);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    fetchSpellById: fetchSpellById, 
    fetchAllSpells: fetchAllSpells,
    insertSpell: insertSpell
};