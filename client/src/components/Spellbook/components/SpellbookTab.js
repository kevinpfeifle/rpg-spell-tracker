// React imports
import { useState } from 'react'

/**
 * Component which displays the spellbook's tabs, in order to aid in swapping spellbook pages.
 * @param {Function} props.changeTab function to call with details on the tab selected.
 * @param {Array} props.extraSpellTabs array that denotes the extra spell tabs to render.
 * @returns the created component.
 */
const SpellbookTab = ({changeTab, extraSpellTabs}) => {
    const [selectedButton, setSelectedButton] = useState('preparedSpells');

    const selectTab = (clickedButton) => {
        setSelectedButton(clickedButton)
        changeTab(clickedButton);
    }
    return (
        <div className='spellbookTab'>
            <div className='mainSpellTabs'>
                <button className={selectedButton === 'preparedSpells' ? 'tabButtonSelected' : 'tabButton'} onClick={() => selectTab('preparedSpells')}>Prepared Spells</button>
                <button className={selectedButton === 'knownSpells' ? 'tabButtonSelected' : 'tabButton'} onClick={() => selectTab('knownSpells')}>Known Spells</button>
            </div>
            {/* <button className={selectedButton === 'all' ? 'tabButtonSelected' : 'tabButton'} onClick={() => selectTab('all')}>All Spells</button> */}
            {
                (Object.keys(extraSpellTabs).length > 0) && <div className='extraSpellTabs'>
                    {/* Small divider between the two sets of tab buttons */}
                    <span style={{borderLeft: "2px solid #87556f", marginLeft: "5px", marginRight: "5px"}}></span> 
                    {(extraSpellTabs.circleSpells) && <button className={selectedButton === 'circleSpells' ? 'tabButtonSelected' : 'tabButton'} onClick={() => selectTab('circleSpells')}>Circle Spells</button>}           
                    {(extraSpellTabs.domainSpells) && <button className={selectedButton === 'domainSpells' ? 'tabButtonSelected' : 'tabButton'} onClick={() => selectTab('domainSpells')}>Domain Spells</button>}
                    {(extraSpellTabs.oathSpells) && <button className={selectedButton === 'oathSpells' ? 'tabButtonSelected' : 'tabButton'} onClick={() => selectTab('oathSpells')}>Oath Spells</button>}
                    {(extraSpellTabs.racialSpells) && <button className={selectedButton === 'racialSpells' ? 'tabButtonSelected' : 'tabButton'} onClick={() => selectTab('racialSpells')}>Racial Spells</button>}
                    {(extraSpellTabs.specialistSpells) && <button className={selectedButton === 'specialistSpells' ? 'tabButtonSelected' : 'tabButton'} onClick={() => selectTab('specialistSpells')}>Specialist Spells</button>}
                </div>
            }
        </div>
    );
}

export default SpellbookTab;