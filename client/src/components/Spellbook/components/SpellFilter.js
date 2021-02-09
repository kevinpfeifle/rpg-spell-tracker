// React imports
import React from 'react'

// Internal Imports
import Filter from '../../Filter/Filter';
import {mapSpellLevel} from '../../../utils/spellTransforms';

class SpellFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            filters: this.generateSpellFilters(this.props.pureSpells)
        };
    }

    /**
     * Applies all of the filters to a copy of the original/pure spell list. Calls props.filterFunc to update the displayed spell list.
     * @param {Array} updatedFilters the updated array of filter objects to be used in filtering spells.
     */
    filter(updatedFilters) {
        /**
         * Sub-function to be called whenever a dropdown filter is being processed, as there will be many.
         * @param {Array} spells 
         * @param {Object} curFilter 
         * @param {String} filterType 
         * @returns {Array} the processed filtered spells after the dropdown filter is performed.
         */
        const checkSelectFilters = (spells, curFilter, filterType) => {
            return spells.filter((spell) => {
                let spellPassed = false;
                for (let item of curFilter.filter.selectItems) {
                    if (item.selected && (item.value === spell[filterType])) spellPassed = true;
                }
                return spellPassed;
            });
        };
        // Creates a clone of the original/pure spells array, to ensure we filter from our perfect copy instead of the current filtered list.
        let filteredSpells = this.props.pureSpells;
        for (let curFilter of updatedFilters) {
            if (curFilter.filterType === 'input') {
                // If it is a input field, check the text filter, which matches substrings provided in input textbox.
                if (curFilter.filter.textValue !== '') {
                    filteredSpells = filteredSpells.filter((spell) => spell.spellName.toLowerCase().includes(curFilter.filter.textValue.toLowerCase()));
                }
            } else if (curFilter.filterType === 'select') {
                // If it is a dropdown select, check the selected items from the dropdowns.
                if (curFilter.filter.selectCount === 0) continue;
                else {
                    if (curFilter.name === 'Spell Level') {
                        filteredSpells = checkSelectFilters(filteredSpells, curFilter, 'spellLevel');
                    } else if (curFilter.name === 'Spell School') {
                        filteredSpells = checkSelectFilters(filteredSpells, curFilter, 'spellSchool');
                    }
                }
            }
        }
        this.props.filterFunc(filteredSpells);
        this.setState({
            ...this.state,
            filters: updatedFilters
        });
    }

    /**
     * Generates an array of filter objects to be applied to state and passed as props to the <Filter> component.
     * @param {Array} spellList array of the original/pure spell objects to create the needed filters based on available spells. 
     * @returns {Array} the array of filter objects to be used by this component.
     */
    generateSpellFilters(spellList) {
        let spellFilters = [
            {
                name: 'Spell Name',
                filterType: 'input',
                filter: {
                    textValue: ''
                }
            },
            {
                name: 'Spell Level',
                filterType: 'select',
                filter: {
                    selectCount: 0,
                    selectItems: []
                }
            },
            {
                name: 'Spell School',
                filterType: 'select',
                filter: {
                    selectCount: 0,
                    selectItems: []
                }
            }
        ];
        let spellLevelFilters = [];
        let spellSchoolFilters = [];
        spellList.forEach((spell) => {
            if (!spellLevelFilters.includes(spell.spellLevel)) spellLevelFilters.push(spell.spellLevel);
            if (!spellSchoolFilters.includes(spell.spellSchool)) spellSchoolFilters.push(spell.spellSchool);
        });
        spellLevelFilters.forEach((levelFilter) => {
            spellFilters[1].filter.selectItems.push({
                selected: false, 
                text: mapSpellLevel(levelFilter), 
                value: levelFilter
            });
        });
        spellSchoolFilters.forEach((schoolFilter) => {
            spellFilters[2].filter.selectItems.push({
                selected: false, 
                text: schoolFilter, 
                value: schoolFilter
            });
        });
        return spellFilters;
    }

    render() {
        return (
            <div>
                <Filter filters={this.state.filters} filterFunc={this.filter.bind(this)} />
            </div>
        )
    }
}

export default SpellFilter;