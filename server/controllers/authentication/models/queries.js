'use strict'

const registerUser = `insert into "user".users (
                        username, email_address, password_hash, created_date, created_by, active_ind
                    ) values (
                        $1, $2, $3, $4, $5, true
                    );`;

const checkUsername = `select exists(select 1 from "user".users where username ilike $1);`;

const checkEmail = `select exists(select 1 from "user".users where email_address ilike $1);`;

module.exports = {
    registerUser: registerUser,
    checkUsername: checkUsername,
    checkEmail: checkEmail
}