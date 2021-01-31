import DropDown from '../../../DropDown/DropDown';

import {mapSpellLevel} from '../../../../utils/spellTransforms';

const Filter = ({pureSpells, filterFunc}) => {
    let spellDropDown = [];
    for (let i = 0; i < 10; i++) {
        spellDropDown.push({
            selected: false,
            text: mapSpellLevel(i),
            value: i
        });
    }
    // let schoolDropDown = [
    //     {
    //         selected: false,
    //         text: 'Evocation',
    //         value: 'Evocation'
    //     },
    //     {
    //         selected: false,
    //         text: 'Divination',
    //         value: 'Divination'
    //     },
    //     {
    //         selected: false,
    //         text: 'Conjuration',
    //         value: 'Conjuration'
    //     }
    // ];
    // for (let i = 0; i < pureSpells.length; i++) {
    //     if (!schoolDropDown.some((item) => item.value === pureSpells[i].spellSchool)) {
    //         schoolDropDown.push({
    //             selected: false,
    //             text: pureSpells[i].spellSchool,
    //             value: pureSpells[i].spellSchool
    //         })
    //     }
    // }
    
    const updateSelect = (selectedItems) => {
        let filterParams = [];
        selectedItems.forEach((item) => {
            if (item.selected) filterParams.push(item.value);
        });
        if (filterParams.length === 0) filterFunc(pureSpells);
        else {
            let filteredSpells = pureSpells;
            filterFunc(filteredSpells.filter((spell) => 
            filterParams.includes(spell.spellLevel)
            ));
        }
    }
    
    // const updateSelectSchool = (selectedItems) => {
    //     let filterParams = [];
    //     selectedItems.forEach((item) => {
    //         if (item.selected) filterParams.push(item.value);
    //     });
    //     if (filterParams.length === 0) filterFunc(pureSpells);
    //     else {
    //         let filteredSpells = pureSpells;
    //         filterFunc(filteredSpells.filter((spell) => 
    //         filterParams.includes(spell.spellSchool)
    //         ));
    //     }
    // }
    
    return (
        <div className = 'test'>
            <DropDown defaultText='Spell Level' updateSelect={updateSelect} selectItems={spellDropDown} />
            {/* <DropDown defaultText='School of Magic' updateSelect={updateSelectSchool} selectItems={schoolDropDown} /> */}
        </div>
    )
};

export default Filter;