// React imports
import { useState } from 'react'

/**
 * Component which displays the spellbook's tabs, in order to aid in swapping spellbook pages.
 * @param {Function} props.changeTab function to call with details on the tab selected.
 * @returns the created component.
 */
const SpellbookTab = ({changeTab}) => {
    const [selectedButton, setSelectedButton] = useState('preparedSpells');

    const selectTab = (clickedButton) => {
        setSelectedButton(clickedButton)
        changeTab(clickedButton);
    }
    return (
        <div className='spellbookTab'>
            <button className={selectedButton === 'preparedSpells' ? 'tabButtonSelected' : 'tabButton'} onClick={() => selectTab('preparedSpells')}>Prepared Spells</button>
            <button className={selectedButton === 'knownSpells' ? 'tabButtonSelected' : 'tabButton'} onClick={() => selectTab('knownSpells')}>Known Spells</button>
            {/* <button className={selectedButton === 'all' ? 'tabButtonSelected' : 'tabButton'} onClick={() => selectTab('all')}>All Spells</button> */}
        </div>
    );
}

export default SpellbookTab;