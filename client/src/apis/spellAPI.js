import axios from 'axios';

function getPureSpells() {
    return new Promise((resolve, reject) => {
        /**
         * @TODO Create configuration for this endpoint -- hardcoding it for now.
         */
        axios.get('http://localhost:4000/spellmanagement/spells').then((res) => {
            resolve(res.data.spells);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

export {
    getPureSpells
};