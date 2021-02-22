// React imports.
import React from 'react'
import { Link } from 'react-router-dom';

// Internal component imports.
import SpellbookPage from './components/SpellbookPage';
import SpellbookTab from './components/SpellbookTab';
import LoadingIcon from '../../vendor/d20.png';

// Util imports
import { spellSorting } from '../../utils/spellTransforms';

// API imports
import { getSpellbook, updateSpellbookSpell } from '../../apis/spellAPI';


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
class Spellbook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'preparedSpells',
            loaded: false,
            knownSpells: [],
            pureKnownSpells: [],
            preparedSpells: [],
            purePreparedSpells: []
        }
    }

    loadSpellbook() {
        return new Promise(async (resolve, reject) => {
            /**
             * @TODO parameterize the spellbook id to come from the query string of the react route.
             * Temporarily pass id of 1 for testing purposes until we finish spellbook functionality.
             */
            await getSpellbook(1).then((foundBook) => {
                resolve(spellSorting(foundBook));
            });
        })
    }

    changePage(pageName) {
        this.setState({
            ...this.state,
            currentPage: pageName
        });
    }

    prepareSpell(spell, sortField, sortDirection) {
        let preparedSpells = this.state.preparedSpells;
        if (!preparedSpells.includes(spell)) {
            spell.spell_prepared = true;
            let knownSpells = this.state.knownSpells;
            knownSpells[knownSpells.findIndex((curSpell) => curSpell.spell_id === spell.spell_id)] = spell;
            preparedSpells.push(spell);
            this.setState({
                ...this.state,
                preparedSpells: spellSorting(preparedSpells, sortField, sortDirection)
            }, () => {
                updateSpellbookSpell(1, spell.spell_id, true);
            });
        }
    }

    unprepareSpell(spell) {
        let preparedSpells = this.state.preparedSpells;
        if (preparedSpells.includes(spell)) {
            spell.spell_prepared = false;
            let knownSpells = this.state.knownSpells;
            knownSpells[knownSpells.findIndex((curSpell) => curSpell.spell_id === spell.spell_id)] = spell;
            this.setState({
                ...this.state,
                preparedSpells: preparedSpells.filter((curSpell) => curSpell.spell_id !== spell.spell_id),
                knownSpells: knownSpells
            }, () => {
                updateSpellbookSpell(1, spell.spell_id, false);
            });
        }
    }

    sortSpells(pageType, sortField, sortDirection) {
        switch (pageType) {
            case 'preparedSpells':
                this.setState({
                    ...this.state,
                    preparedSpells: spellSorting(this.state.preparedSpells, sortField, sortDirection)
                });
                break;
            case 'knownSpells':
                this.setState({
                    ...this.state,
                    knownSpells: spellSorting(this.state.knownSpells, sortField, sortDirection)
                });
                break;
            default:
                console.log(pageType);
                break; // If there is an unknown case coming somehow, log what it is and do nothing else.
        }
    }

    filterSpells(pageType, spellList) {
        switch (pageType) {
            case 'preparedSpells':
                this.setState({
                    ...this.state,
                    preparedSpells: spellList
                });
                break;
            case 'knownSpells':
                this.setState({
                    ...this.state,
                    knownSpells: spellList
                });
                break;
            default:
                console.log(pageType);
                break; // If there is an unknown case coming somehow, log what it is and do nothing else.
        }
    }

    componentDidMount() {
        this.loadSpellbook().then((foundBook) => {
            let preparedSpells = foundBook.filter((spell) => spell.spell_prepared);
            this.setState({
                ...this.state,
                loaded: true,
                knownSpells: foundBook,
                pureKnownSpells: foundBook,
                preparedSpells: preparedSpells,
                purePreparedSpells: preparedSpells
            });
        });
    }

    render() {
        let spellBookContents = (this.state.loaded) ?
            (<div>
                {
                    (this.state.currentPage === 'preparedSpells') &&
                    <SpellbookPage
                        pageType='preparedSpells'
                        spells={this.state.preparedSpells}
                        pureSpells={this.state.purePreparedSpells}
                        sorting={this.sortSpells.bind(this)}
                        filter={this.filterSpells.bind(this)}
                        buttonName='Unprepare'
                        buttonClick={this.unprepareSpell.bind(this)}
                    />
                }
                {
                    (this.state.currentPage === 'knownSpells') &&
                    <SpellbookPage
                        pageType='knownSpells'
                        spells={this.state.knownSpells}
                        pureSpells={this.state.pureKnownSpells}
                        sorting={this.sortSpells.bind(this)}
                        filter={this.filterSpells.bind(this)}
                        buttonName='Prepare'
                        buttonClick={this.prepareSpell.bind(this)}
                    />
                }
            </div>)
            :
            (<img className='Loading' src={LoadingIcon} alt='Loading...' style={{ width: '250px', height: '250px' }} />);
        return (
            <div>
                <div className='spellbook'>
                    <SpellbookTab changeTab={this.changePage.bind(this)} />
                    {spellBookContents}
                </div>
                <Link to="/">Go back</Link>
            </div>
        )
    }
}

export default Spellbook;