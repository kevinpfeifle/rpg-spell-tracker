import axios from 'axios';

function registerUser(username, email, password) {
    return new Promise((resolve, reject) => {
        /**
         * @TODO Create configuration for this endpoint -- hardcoding it for now.
         */
        let config = {
            headers: {
                'sender': 'rpgtool',
                'content-type': 'application/json'
            }
        };
        let body = {
                'username': username,
                'email': email,
                'password': password
        };
        axios.put('http://localhost:4000/authentication/register', body, config).then((res) => {
            if (res.data.status === 'success') resolve(res);
            else reject(res);
        }).catch((err) => {
            reject(err);
        });
    });
}

/**
 * Makes a call to the backend to check the given username against taken usernames in the DB.
 * @param {String} username 
 * @returns boolean determining if the name is taken.
 */
function checkUsername(username) {
    return new Promise((resolve, reject) => {
        /**
         * @TODO Create configuration for this endpoint -- hardcoding it for now.
         */
        axios.get('http://localhost:4000/authentication/register/checkUsername?username=' + username).then((res) => {
            if (res.data.status === 'success') resolve(res.data.exists);
            else reject(res);
        }).catch((err) => {
            reject(err);
        });
    });
}

/**
 * Makes a call to the backend to check the given email against taken emails in the DB.
 * @param {String} email 
 * @returns boolean determining if the email is taken.
 */
function checkEmail(email) {
    return new Promise((resolve, reject) => {
        /**
         * @TODO Create configuration for this endpoint -- hardcoding it for now.
         */
        axios.get('http://localhost:4000/authentication/register/checkEmail?email=' + email).then((res) => {
            if (res.data.status === 'success') resolve(res.data.exists);
            else reject(res);
        }).catch((err) => {
            reject(err);
        });
    });
}

export {
    registerUser,
    checkUsername,
    checkEmail
};