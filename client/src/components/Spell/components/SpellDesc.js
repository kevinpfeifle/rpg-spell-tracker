import {mapSpellLevel} from '../../../utils/spellTransforms';

/**
 * Component to display the description of a given spell. The Spell and SpellRef components control the visibility of SpellDesc.
 * @param {Object} props.spell the spell object used to display the spell description 
 * @returns the created component.
 */
const SpellDesc = ({spell}) => {
    return (
        <div className='spellDesc'>
            <h2>{spell.spell_name}</h2>
            <p><em>{mapSpellLevel(spell.spell_level).toLowerCase()} {spell.spell_school.toLowerCase()} {spell.ritual && '(ritual)'}</em></p>
            <p><strong>Casting Time:</strong> {spell.casting_time}</p>
            <p><strong>Range:</strong> {spell.spell_range}</p>
            <p>
                <strong>Components: </strong> 
                {spell.spell_components.toString()} {(spell.material_components != null) && '(' + spell.material_components + ')'}
            </p>
            <p><strong>Duration:</strong> {spell.duration}</p>
            <p><strong>Classes:</strong> {spell.classes.toString()}</p>
            <p>{spell.description}</p> {/* Description (This could be broken up into some simpler, like a quick reference of spell type and dice to roll?) */}
            {
                spell.hasOwnProperty('description_higher_levels') && (<p><strong>At Higher Levels:</strong> {spell.description_higher_levels}</p>)
            }
        </div>
    );
};

export default SpellDesc;