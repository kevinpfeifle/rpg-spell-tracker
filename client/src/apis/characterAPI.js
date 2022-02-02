import axios from 'axios';

function getCharacterOverview(characterId) {
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
                'characterid': characterId
            },
            withCredentials: true
        };
        axios.get('http://localhost:4000/charactermanagement/characteroverview', config).then((res) => {
            if (res.data.status === 'success') {
                res.data.data.authorizedUser = true;
                res.data.data.characterExists = true;
                resolve(res.data.data);
            }
            else throw new Error(res);
        }).catch((err) => {
            if (err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
                    resolve({characterId: characterId, 'authorizedUser': false});
                } else if (err.response.status === 404) {
                    resolve({characterId: characterId, 'characterExists': false});
                } else reject(err); // All other codes are an error for this resource.
            } else {
                reject(err);
            }
        });
    });
}

export {
    getCharacterOverview
};