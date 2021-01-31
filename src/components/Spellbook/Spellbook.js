import Spell from '../Spell/Spell';
import Header from './components/Header';
import Filter from './components/Filter/Filter';
import {Link} from 'react-router-dom';

/**
 * @todo
 * Need to show a sortable header icon, as well as each available spell in the spellbook.
 * Spell book will also need to track if the spell is prepared or not, and have a way to enable if it is prepared for each spell...
 */

/**
 * Component which displays an entire spellbook, comprised of Spell components for each spell passed in.
 * @param {Array} props.spells array of spells to be rendered by the spellbook
 * @returns the created component.
 */
const Spellbook = ({spells, sorting}) => {
    return (
        <div className='spellbook'>
            <Filter />
            <Header spells={spells} sorting={sorting} />
            {
                spells.map((spell) =>  (
                    <Spell key={spell.id} spell={spell} />
                ))
            }
            <Link to="/">Go back</Link>
        </div>
    );
}

export default Spellbook;