'use strict'

const fetchUserById = `select username from "user".user where user_id = $1 and active_ind = true;`;

module.exports.fetchUserById = fetchUserById;