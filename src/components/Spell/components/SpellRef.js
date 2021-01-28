import mapSpellLevel from '../../../utils/mapSpellLevel';

/**
 * Component to display the quick reference of a given spell. It has a prop function t control the visibility of SpellDesc.
 * @param {Object} props.spell the spell object used to display the spell quick reference
 * @param {Function} props.toggleVisibility onclick function to flip the state of the associated SpellDesc component
 * @returns the created component.
 */
const SpellRef = ({spell, toggleVisibility}) => {
    const onClick = () => {
        toggleVisibility();
    };
    return (
        <div className='spellRef' onClick={onClick}>
            <div className='spellName'>
                <h4>{spell.spellName}</h4>
                {spell.ritual && <h5><em>R</em></h5>}
            </div>
            <div className='spellLevel'>
                <h4>{mapSpellLevel(spell.spellLevel)}</h4>
            </div>
            <div className='spellSchool'>
                <h4>{spell.spellSchool}</h4>
            </div>
            <div className='spellAttack'>
                <h4>{spell.spellAttack}</h4>
            </div>
            <div className='spellEffect'>
                <h4>{spell.spellEffect}</h4>
            </div>
        </div>
    );
};

export default SpellRef;