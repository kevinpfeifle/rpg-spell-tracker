// React imports
import { useState, useEffect } from 'react'

/**
 * Component which displays the header of a spellbook. 
 * @todo Implement onlick functions to enable sorting of spells by the header columns.
 * @returns the created component.
 */
const Header = ({spells, sorting}) => {
    const [sortType, setSortType] = useState({sortField: 'spellLevel', reverse: false});
    /**
     * Onclick function to sort the spells based on which header was clicked on.
     * @param sortCol the column we are sorting against
     * */
    const sortSpells = (sortCol) => {
        if (sortType.sortField === sortCol) {
            setSortType(
                {sortField: sortCol, reverse: !sortType.reverse}
            );
        } else {
            setSortType(
                {sortField: sortCol, reverse: false}
            );
        }
    }
    // useEffect hook calls our passed in sort function automatically after the sortType state changes.
    useEffect(() => {
        sorting(spells, sortType.sortField, sortType.reverse);
    }, [sorting, sortType]);

    return (
        <div className='spellbookHeader'>
            <div className='headerSpellName' onClick={()=>sortSpells('spellName')}>
                <h4>Spell Name</h4>
            </div>
            <div className='headerSpellLevel' onClick={()=>sortSpells('spellLevel')}>
                <h4>Level</h4>
            </div>
            <div className='headerSpellSchool' onClick={()=>sortSpells('spellSchool')}>
                <h4>School of Magic</h4>
            </div>
            <div className='headerSpellAttack' onClick={()=>sortSpells('spellAttack')}>
                <h4>Attack/Saving Throw</h4>
            </div>
            <div className='headerSpellEffect' onClick={()=>sortSpells('spellEffect')}>
                <h4>Damage/Effect</h4>
            </div>
        </div>
    )
};

export default Header;