import Spell from '../Spell/Spell';
import Header from './components/Header';
import {Link} from 'react-router-dom';

/**
 * Need to show a sortable header, as well as each available spell in the spellbook.
 * Spell quick reference to be displayed with: spell name, spell level, school of magic.
 * Spell book will also need to track if the spell is prepared or not, and have a way to enable if it is prepared for each spell...
 */

const Spellbook = ({spells}) => {
    console.log(spells);
    return (
        <div className='spellbook'>
            <Header />
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