import axios from 'axios';

function getUser(userId) {
    return new Promise((resolve, reject) => {
        /**
         * @TODO Create configuration for this endpoint -- hardcoding it for now.
         */
        let config = {
            headers: {
                'sender': 'rpgtool',
                'content-type': 'application/json'
            },
            params: {
                userid: userId
            },
            withCredentials: true
        };
        axios.get('http://localhost:4000/usermanagement/user', config).then((res) => {
            if (res.data.status === 'success') resolve(res.data);
            else reject(res.data);
        }).catch((err) => {
            reject(err);
        });
    });
}
export {
    getUser
};