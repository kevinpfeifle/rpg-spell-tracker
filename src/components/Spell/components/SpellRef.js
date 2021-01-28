const SpellRef = ({spell, toggleVisibility}) => {
    const onClick = () => {
        toggleVisibility();
    };
    return (
        <div className='spellRef' onClick={onClick}>
            <h3>Spell Name: {spell.spellName}</h3>
            <h4>Spell Level: {(spell.spellLevel > 0) ? spell.spellLevel : 'Cantrip'}</h4>
            <h4>School of Magic: {spell.spellSchool}</h4>
        </div>
    );
};

export default SpellRef;