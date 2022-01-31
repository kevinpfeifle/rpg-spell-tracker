'use strict'

const fetchUserById = `select user_id, username, active_character_id from "user".user where user_id = $1 and active_ind = true;`;

module.exports.fetchUserById = fetchUserById;