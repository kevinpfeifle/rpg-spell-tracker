/**
 * Component which displays the header of a spellbook. 
 * @todo Implement onlick functions to enable sorting of spells by the header columns.
 * @returns the created component.
 */
const Header = () => {
    return (
        <div className='spellbookHeader'>
            <div className='headerSpellName'>
                <h4>Spell Name</h4>
            </div>
            <div className='headerSpellLevel'>
                <h4>Level</h4>
            </div>
            <div className='headerSpellSchool'>
                <h4>School of Magic</h4>
            </div>
            <div className='headerSpellAttack'>
                <h4>Attack/Saving Throw</h4>
            </div>
            <div className='headerSpellEffect'>
                <h4>Damage/Effect</h4>
            </div>
        </div>
    )
};

export default Header;