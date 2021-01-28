import { useState, useEffect } from 'react'
import SpellRef from './components/SpellRef';
import SpellDesc from './components/SpellDesc';
/**
 * Info needed in a spell block:
 * 1. Spell Name
 * 2. Spell Level
 * 3. Spell School
 * 4. Casting Time
 * 5. Range
 * 6. Components
 * 7. Duration
 * 8. Classes
 * 9. Description (This could be broken up into some simpler, like a quick reference of spell type and dice to roll?)
 * 
 * 
 * Best way to do it I think, spell quick reference, click on it to expand and show the whole spell...?
 * Break up into multiple components.
 */

const Spell = ({spell}) => {
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