'use strict'

const db = require('../../../database/db');
const queries = require('./queries');

function fetchCharacterOwnership(characterId) {
    return new Promise((resolve, reject) => {
        let query = queries.fetchCharacterOwnership;
        db.executeQuery('tool', query, [characterId]).then((results) => {
            resolve(results[0]);
        }).catch((err) => {
            reject(err);
        });
    });
}

function fetchCharacterPortrait(characterId) {
    return new Promise((resolve, reject) => {
        let query = queries.fetchCharacterPortrait;
        db.executeQuery('tool', query, [characterId]).then((results) => {
            resolve(results[0]);
        }).catch((err) => {
            reject(err);
        });
    });
}

function upsertCharacterPortrait(portraitBase64, portraitEncodeTag, characterId, userId) {
    return new Promise((resolve, reject) => {
        let query = queries.upsertCharacterPortrait;
        db.executeQuery('tool', query, [characterId, portraitBase64, portraitEncodeTag, userId, userId, new Date()]).then((results) => {
            resolve(results);
        }).catch((err) => {
            reject(err);
        });
    });
}


module.exports = {
    fetchCharacterOwnership: fetchCharacterOwnership,
    fetchCharacterPortrait: fetchCharacterPortrait,
    upsertCharacterPortrait: upsertCharacterPortrait
};