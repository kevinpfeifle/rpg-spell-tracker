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

export {
    getSpellbook
};