const SpellDesc = ({spell}) => {
    return (
        <div className='spellDesc'>
            <h4>Casting Time: {spell.castingTime}</h4>
            <h4>Range: {(typeof spell.range === 'number') ? spell.range + ' feet' : spell.range}</h4>
            <h4>Components: {spell.components}</h4>
            <h4>Duration: {spell.duration}</h4>
            <h4>Classes: {spell.classes}</h4>
            <h4>Description: {spell.description}</h4>
            {
                spell.hasOwnProperty('higherLevels') && (<h4>At Higher Levels: {spell.higherLevels}</h4>)
            }
        </div>
    );
};

export default SpellDesc;