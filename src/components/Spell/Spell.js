import { useState, useEffect } from 'react'
import SpellRef from './components/SpellRef';
import SpellDesc from './components/SpellDesc';

/**
 * @todo: Create a context prop passed in by the creatign component.
 * Eventually will need to add a variable passed into this component -- context to determine if it is a spellbook spell, or a full spell list spell. 
 * This is determine if we render the classes which can access the spell in the quick reference.
 * */ 

/**
 * Component which displays an entire spell, clicking it will reveal an extended description of the spell.
 * @param {Object} props.spell the spell object used to display the contents of the spell.
 * @returns the created component.
 */
const Spell = ({spell}) => {
    // Component state to alter the visibility of the SpellDesc component.
    const [spellVis, setspellVis] = useState([]);
    const toggleVisibility = () => {
        setspellVis(!spellVis);
    };
    return (
        <div>
            <SpellRef spell={spell} toggleVisibility={toggleVisibility} />
            {!spellVis && <SpellDesc spell={spell}/>}
        </div>
    )
};

export default Spell;