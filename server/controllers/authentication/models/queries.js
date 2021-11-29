'use strict'

const fetchUserLoginDetails = `select user_id, password_hash from "user".user where username ilike $1;`;

const fetchEmailLoginDetail = `select user_id, password_hash from "user".user where email_address ilike $1;`;

const registerUser = `insert into "user".user (
                        username, email_address, password_hash, created_date, created_by, active_ind
                    ) values (
                        $1, $2, $3, $4, $5, true
                    ) returning user_id;`;

const checkUsername = `select exists(select 1 from "user".user where username ilike $1);`;

const checkEmail = `select exists(select 1 from "user".user where email_address ilike $1);`;

module.exports = {
    fetchUserLoginDetails: fetchUserLoginDetails,
    fetchEmailLoginDetail: fetchEmailLoginDetail,
    registerUser: registerUser,
    checkUsername: checkUsername,
    checkEmail: checkEmail
}