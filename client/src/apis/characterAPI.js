import axios from 'axios';

function getCharacterOverview(userId, characterId) {
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
                'userId': userId,
                'characterId': characterId
            },
            withCredentials: true
        };
        axios.get('http://localhost:4000/charactermanagement/characteroverview', config).then((res) => {
            if (res.data.status === 'success') resolve(res.data.data);
            else reject(res);
        }).catch((err) => {
            console.log(err);
            resolve(err);
        });
    });
}

export {
    getCharacterOverview
};