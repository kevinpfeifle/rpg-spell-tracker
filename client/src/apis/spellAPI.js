import axios from 'axios';

function getSpellbook(spellbookId) {
    return new Promise((resolve, reject) => {
        /**
         * @TODO Create configuration for this endpoint -- hardcoding it for now.
         */
        axios.get('http://localhost:4000/spellmanagement/spellbook?spellbookid=' + spellbookId).then((res) => {
            resolve(res.data.spellbook.spells);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

function updateSpellbookSpell(spellbookId, spellId, prepared) {
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
                'spellbookId': spellbookId,
                'spellId': spellId,
                'spellPrepared': prepared
        };
        axios.put('http://localhost:4000/spellmanagement/spellbook/updatespell', body, config).then((res) => {
            if (res.data.status === 'success') resolve(res);
            else {
                console.log(res);
                reject(res);
            }
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

export {
    getSpellbook,
    updateSpellbookSpell
};