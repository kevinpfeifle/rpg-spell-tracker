'use strict'

const {Pool} = require('pg');

let poolTool; // Our connection pool to later be defined upon DB initialization.
let poolUsers; // Our connection pool to later be defined upon DB initialization.

/**
 * Initializes the DB Pool so connections can be made.
 * @param {Object} dbCredentialsTool credentials for Tool DB from the config.
 * @param {Object} dbCredentialsUsers credentials for Users DB from the config.
 */
function init(dbCredentialsTool, dbCredentialsUsers) {
    poolTool = new Pool(dbCredentialsTool);
    poolUsers = new Pool(dbCredentialsUsers);
}

/**
 * Returns the specified pool type.
 * @param {String} poolType
 * @returns desired pg coonection pool. 
 */
function getPool(poolType) {
    if (poolType === 'users') return poolUsers;
    else if (poolType === 'tool') return poolTool;
}

/**
 * Aquires a connection from the pool, and makes a query to the PostgreSQL server to fetch data for the client.
 * @param {String} dbType the type of DB we are connecting to
 * @param {String} query the query to be executed
 * @param {Array} bindParams the params to be bound to the query fields
 * @returns the results of the query.
 */
function executeQuery(dbType, query, bindParams) {
    return new Promise((resolve, reject) => {
        // Determine which DB pool to use, defaulting to the Tool DB.
        let pool;
        if (dbType === 'users') pool = poolUsers;
        else pool = poolTool;
        // Use the correct DB pool to query the DB.
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
    getPool: getPool,
    executeQuery: executeQuery
}