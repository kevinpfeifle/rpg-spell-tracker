// React imports
import { useState } from 'react'

// Util imports
import {mapSpellLevel} from '../../../utils/spellTransforms';

// React Icons imports
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

/**
 * Component to display the quick reference of a given spell. It has a prop function t control the visibility of SpellDesc.
 * @param {Object} props.spell the spell object used to display the spell quick reference
 * @param {Function} props.toggleVisibility onclick function to flip the state of the associated SpellDesc component
 * @returns the created component.
 */
const SpellRef = ({spell, toggleVisibility}) => {
    const [expandIcon, setExpandIcon] = useState(true);

    const onClick = () => {
        setExpandIcon(!expandIcon);
        toggleVisibility();
    };
    const setNameTips = () => {
        let nameTips = [];
        if (spell.concentration) nameTips.push('C');
        if (spell.ritual) nameTips.push('R');
        return nameTips;
    };
    return (
        <div className='spellRef' onClick={onClick}>
            <div className='spellName'>
                <h4>{spell.spell_name}</h4>
                {(setNameTips().length > 0) && <h5><em>{setNameTips().toString()}</em></h5>}
            </div>
            <div className='spellLevel'>
                <h4>{mapSpellLevel(spell.spell_level)}</h4>
            </div>
            <div className='spellSchool'>
                <h4>{spell.spell_school}</h4>
            </div>
            <div className='spellAttack'>
                {(spell.spell_attack != null) && <h4>{spell.spell_attack}</h4>}
                {(spell.spell_save != null) && <h4>{spell.spell_save}</h4>}
            </div>
            <div className='spellEffect'>
            {(spell.spell_effects != null && spell.spell_effects.length > 1) && <h4>{spell.spell_effects[0] + ' +'}</h4>}
            {(spell.spell_effects != null) && <h4>{spell.spell_effects[0]}</h4>}
            </div>
            {(expandIcon) && <RiAddLine className='expandSpell' />}
            {(!expandIcon) && <RiSubtractLine className='expandSpell' />}
        </div>
    );
};

export default SpellRef;