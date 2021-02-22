// React imports.
import React from 'react'

// Internal component imports.
import Spell from '../../Spell/Spell';
import Header from './Header';
import SpellFilter from './SpellFilter';

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
            sortField: 'spellLevel',
            sortDirection: false
        }
    }

    filterSpells = (spells) => {
        this.props.filter(this.props.pageType, spells);
    };

    sortPageSpells(sortCol) {
        if (this.state.sortField === sortCol) {
            this.setState({ ...this.state, sortDirection: !this.state.sortDirection }, () => {
                this.props.sorting(this.props.pageType, this.state.sortField, this.state.sortDirection);
            });
        } else {
            this.setState({ sortField: sortCol, sortDirection: false }, () => {
                this.props.sorting(this.props.pageType, this.state.sortField, this.state.sortDirection);
            });
        }
    }

    spellButton(spell) {
        switch(this.props.buttonName) {
            case 'Prepare':
                this.props.buttonClick(spell, this.state.sortField, this.state.sortDirection);
                break;
            default:
                this.props.buttonClick(spell);
                break;
        }
    }

    render() {
        return (
            <div className='spellbookPage'>
                <SpellFilter spells={this.props.spells} pureSpells={this.props.pureSpells} filterFunc={this.filterSpells} />
                <Header sorting={this.sortPageSpells.bind(this)} sortField={this.state.sortField} reverse={this.state.sortDirection} />
                {
                    (this.props.spells.length > 0) ? 
                        this.props.spells.map((spell) => (
                            <Spell key={spell.spell_id} spell={spell} knownSpell={true} buttonName={this.props.buttonName} buttonClick={this.spellButton.bind(this)} />
                        )) 
                    : <h2 id='noSpells'>Arcana Check Failed, No Spells Found!</h2>
                }
            </div>
        );
    }
}

export default SpellbookPage;