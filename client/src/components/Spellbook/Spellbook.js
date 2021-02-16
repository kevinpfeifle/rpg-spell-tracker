// React imports.
import React from 'react'
import { Link } from 'react-router-dom';

// Internal component imports.
import SpellbookPage from './components/SpellbookPage';
import SpellbookTab from './components/SpellbookTab';
import LoadingIcon from '../../vendor/d20.png';

// Util imports
import {spellSorting} from '../../utils/spellTransforms';

// API imports
import {getSpellbook} from '../../apis/spellAPI';

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
            preparedSpells: []
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
    
    componentDidMount() {
        this.loadSpellbook().then((foundBook) => {
            this.setState({
                ...this.state,
                loaded: true,
                knownSpells: foundBook,
                pureSpells: foundBook,
                preparedSpells: foundBook.filter((spell) => spell.spell_prepared)
            });
        });
    }

    render() {
        let spellBookContents = (this.state.loaded) ?
            (<div>
                {
                    (this.state.currentPage === 'preparedSpells') && <SpellbookPage id='preparedSpells' spells={this.state.preparedSpells} pureSpells={this.state.preparedSpells} sorting={this.sortSpells} filter={this.filterSpells} />
                }
                {
                    (this.state.currentPage === 'knownSpells') && <SpellbookPage id='knownSpells' spells={this.state.knownSpells} pureSpells={this.state.knownSpells} sorting={this.sortSpells} filter={this.filterSpells} />
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