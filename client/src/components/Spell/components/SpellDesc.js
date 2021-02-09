import {mapSpellLevel} from '../../../utils/spellTransforms';

/**
 * Component to display the description of a given spell. The Spell and SpellRef components control the visibility of SpellDesc.
 * @param {Object} props.spell the spell object used to display the spell description 
 * @returns the created component.
 */
const SpellDesc = ({spell}) => {
    return (
        <div className='spellDesc'>
            <h2>{spell.spellName}</h2>
            <p><em>{mapSpellLevel(spell.spellLevel).toLowerCase()} {spell.spellSchool.toLowerCase()} {spell.ritual && '(ritual)'}</em></p>
            <p><strong>Casting Time:</strong> {spell.castingTime}</p>
            <p><strong>Range:</strong> {spell.range}</p>
            <p>
                <strong>Components: </strong> 
                {spell.components.toString()} { spell.hasOwnProperty('materialComponents') && '(' + spell.materialComponents + ')'}
            </p>
            <p><strong>Duration:</strong> {spell.duration}</p>
            <p><strong>Classes:</strong> {spell.classes}</p>
            <p>{spell.description}</p> {/* Description (This could be broken up into some simpler, like a quick reference of spell type and dice to roll?) */}
            {
                spell.hasOwnProperty('higherLevels') && (<p><strong>At Higher Levels:</strong> {spell.higherLevels}</p>)
            }
        </div>
    );
};

export default SpellDesc;