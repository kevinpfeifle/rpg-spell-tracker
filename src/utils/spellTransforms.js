/**
 * Sorts the given array of spells by the specified field, and returns the results in a new array.
 * Default sort is always spell level, and then spell name. All sorts, except name first, will fall back on this pattern.
 * @param {Array} spellList the list of spells to be sorted
 * @param {String} sortField the field to sort the spells by
 * @param {Boolean} reverse whether it sorts forwards or backwards, normal is default, -1 = reverse
 * @returns a new array sorted as requested.
 */
function spellSorting(spellList, sortField, reverse) {
    let sortDirection = (reverse) ? -1 : 1;
    // Default sort organizes first by spell level descending, then by spell name alphabetically.
    const defaultSort = (a, b, sortDir) => {
        sortDir = (sortDir == null) ? 1 : sortDir;
        if (a.spellLevel < b.spellLevel) return -sortDir;
        else if (a.spellLevel > b.spellLevel) return sortDir;
        else {
            if (a.spellName < b.spellName) return -1;
            else if (a.spellName > b.spellName) return 1;
            else return 0;
        }
    };
    let sortedSpells = [...spellList].slice();
    switch (sortField) {
        case 'spellName':
            // Sorts alphabetically by spell name.
            sortedSpells.sort((a, b) => {
                if (a.spellName < b.spellName) return -sortDirection;
                else if (a.spellName > b.spellName) return sortDirection;
                else return 0;
            });
            break;
        case 'spellSchool':
            // Sorts by spell school, and then by default sort.
            sortedSpells.sort((a, b) => {
                if (a.spellSchool < b.spellSchool) return -sortDirection;
                else if (a.spellSchool > b.spellSchool) return sortDirection;
                else return defaultSort(a, b);
            });
            break;
        case 'spellAttack':
            // Sorts by spell attack/save, and then by default sort.
            sortedSpells.sort((a, b) => {
                if (a.spellAttack < b.spellAttack) return -sortDirection;
                else if (a.spellAttack > b.spellAttack) return sortDirection;
                else return defaultSort(a, b);
            });
            break;
        case 'spellEffect':
            // Sorts by spell damage/effect, and then by default sort.
            sortedSpells.sort((a, b) => {
                if (a.spellEffect < b.spellEffect) return -sortDirection;
                else if (a.spellEffect > b.spellEffect) return sortDirection;
                else return defaultSort(a, b);
            });
            break;
        default:
            // Catch all default sort in case of sort type "spellLevel" or unxpected sort type.
            sortedSpells.sort((a,b) => {
                return defaultSort(a, b, sortDirection);
            });
            break;
    }
    return sortedSpells;
}

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

export {
    mapSpellLevel,
    spellSorting
}