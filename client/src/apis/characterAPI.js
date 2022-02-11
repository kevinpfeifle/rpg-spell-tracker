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
                'userid': userId
            },
            withCredentials: true
        };
        if (characterId != null) config.params.characterid = characterId; // Add the characterId if we are fetching a single character overview. 
        axios.get('http://localhost:4000/charactermanagement/characteroverview', config).then((res) => {
            if (res.data.status === 'success') {
                for (let character of res.data.data) {
                    character.authorizedUser = true;
                    character.characterExists = true;
                }
                resolve(res.data.data);
            }
            else throw new Error(res);
        }).catch((err) => {
            if (err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
                    if (characterId != null) resolve([{character_id: characterId, 'authorizedUser': false}]); 
                    else resolve([{}]);
                } else if (err.response.status === 404) {
                    if (characterId != null) resolve([{character_id: characterId, 'characterExists': false}]);
                    else resolve([{}]);
                } else reject(err); // All other codes are an error for this resource.
            } else {
                reject(err);
            }
        });
    });
}

function getCharacterPortrait(characterId, userId) {
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
                'characterid': characterId,
                'userid': userId
            },
            withCredentials: true
        };
        axios.get('http://localhost:4000/charactermanagement/characterportrait', config).then((res) => {
            if (res.data.status === 'success') {
                resolve(res.data.data);
            }
            else throw new Error(res);
        }).catch((err) => {
            // May need to update this later to catch certain codes, but I think 201 is the only real success.
            reject(err);
        });
    });
}

function setCharacterPortrait(portraitBase64, portraitEncodeTag, characterId, userId) {
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
        let body = {
            'portraitBase64': portraitBase64,
            'portraitEncodeTag': portraitEncodeTag,
            'characterId': characterId,
            'userId': userId
        };
        axios.put('http://localhost:4000/charactermanagement/characterportrait', body, config).then((res) => {
            if (res.data.status === 'success') {
                resolve(res.data);
            }
            else throw new Error(res);
        }).catch((err) => {
            // May need to update this later to catch certain codes, but I think 201 is the only real success.
            reject(err);
        });
    });
}

export {
    getCharacterOverview,
    getCharacterPortrait,
    setCharacterPortrait
};