// React imports.
import React from 'react'

// Internal component imports.
import Spell from '../../Spell/Spell';
import Header from './Header';
import SpellFilter from './SpellFilter';

// Util imports
import {spellSorting} from '../../../utils/spellTransforms';

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
class SpellbookPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            spells: props.spells
        }
    }

    sortSpells = (sortField, sortDirection) => {
        this.setState({
            ...this.state,
            spells: spellSorting(this.state.spells, sortField, sortDirection)
        });
    };

    filterSpells = (spells) => {
        this.setState({
            ...this.state,
            spells: spells
        });
    };

    render() {
        return (
            <div className='spellbookPage'>
                <SpellFilter spells={this.state.spells} pureSpells={this.props.pureSpells} filterFunc={this.filterSpells} />
                <Header sorting={this.sortSpells} />
                {
                    (this.state.spells.length > 0) ? 
                        this.state.spells.map((spell) => (
                            <Spell key={spell.spell_id} spell={spell} />
                        )) 
                    : <h2 id='noSpells'>Arcana Check Failed, No Spells Found!</h2>
                }
            </div>
        );
    }
}

export default SpellbookPage;