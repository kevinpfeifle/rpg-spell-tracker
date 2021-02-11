'use strict'

const {Pool} = require('pg');

let pool; // Our connection pool to later be defined upon DB initialization.

/**
 * Initializes the DB Pool so connections can be made.
 * @param {Object} dbCredentials credentials for DB from the config.
 */
function init(dbCredentials) {
    pool = new Pool(dbCredentials);
}

/**
 * Aquires a connection from the pool, and makes a query to the PostgreSQL server to fetch data for the client.
 * @param {String} query the query to be executed
 * @param {Array} bindParams the params to be bound to the query fields
 * @returns the results of the query.
 */
function executeQuery(query, bindParams) {
    return new Promise((resolve, reject) => {
        pool.connect().then(client => {
            return client.query(query, bindParams).then(results => {
                client.release()
                resolve(results.rows);
            }).catch(err => {
                client.release()
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    init: init,
    executeQuery: executeQuery
}