'use strict'

const fetchUserById = `select user_id, username, active_character_id from "user".user where user_id = $1 and active_ind = true;`;

const updateUserPreferences = `update "user".user
    set 
        active_character_id = $2
    where
        user_id = $1;`;

module.exports= {
    fetchUserById: fetchUserById,
    updateUserPreferences: updateUserPreferences
};