import axios from 'axios';

function getUser() {
    return new Promise((resolve, reject) => {
        /**
         * @TODO Create configuration for this endpoint -- hardcoding it for now.
         */
        let config = {
            headers: {
                'sender': 'rpgtool',
                'content-type': 'application/json'
            },
            withCredentials: true
        };
        axios.get('http://localhost:4000/usermanagement/user', config).then((res) => {
            resolve(res.data.user);
        }).catch((err) => {
            reject(err);
        });
    });
}
export {
    getUser
};