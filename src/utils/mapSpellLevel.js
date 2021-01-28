/**
 * Simple function map a spell's numeric level to its string display value.
 * @param {number} spellLevel 
 * @returns {String} the mapped spell level
 */
function mapSpellLevel(spellLevel) {
    switch (spellLevel) {
        case 0: return 'Cantrip';
        case 1: return '1st level';
        case 2: return '2nd level';
        case 3: return '3rd level';
        default: return spellLevel + 'th level'; // 4-9 all end in 'th', so set that as default case.
    }
};

export default mapSpellLevel;