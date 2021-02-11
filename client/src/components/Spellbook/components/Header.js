// React imports
import React from 'react'

// React Icons imports
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

/**
 * Component which displays the header of a spellbook. 
 * @param {Function} props.sorting function to be called a new sort is selected.
 * @returns the created component.
 */
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortField: 'spellLevel', 
            reverse: false
        };
    }
    /**
     * Onclick function to sort the spells based on which header was clicked on.
     * @param sortCol the column we are sorting against
     * */
    sortSpells = (sortCol) => {
        if (this.state.sortField === sortCol) {
            this.setState({ ...this.state, reverse: !this.state.reverse }, () => {
                this.props.sorting(this.state.sortField, this.state.reverse);
            });
        } else {
            this.setState({ sortField: sortCol, reverse: false }, () => {
                this.props.sorting(this.state.sortField, this.state.reverse);
            });
        }
    }

    render() {
        return (
            <div className='spellbookHeader'>
                <div className='headerSpellName' onClick={() => this.sortSpells('spellName')}>
                    <h4>Spell Name</h4>
                    {(this.state.sortField === 'spellName' && !this.state.reverse) && <RiArrowDropDownLine className='sortArrow' />}
                    {(this.state.sortField === 'spellName' && this.state.reverse) && <RiArrowDropUpLine className='sortArrow' />}
                </div>
                <div className='headerSpellLevel' onClick={() => this.sortSpells('spellLevel')}>
                    <h4>Level</h4>
                    {(this.state.sortField === 'spellLevel' && !this.state.reverse) && <RiArrowDropDownLine className='sortArrow' />}
                    {(this.state.sortField === 'spellLevel' && this.state.reverse) && <RiArrowDropUpLine className='sortArrow' />}
                </div>
                <div className='headerSpellSchool' onClick={() => this.sortSpells('spellSchool')}>
                    <h4>School of Magic</h4>
                    {(this.state.sortField === 'spellSchool' && !this.state.reverse) && <RiArrowDropDownLine className='sortArrow' />}
                    {(this.state.sortField === 'spellSchool' && this.state.reverse) && <RiArrowDropUpLine className='sortArrow' />}
                </div>
                <div className='headerSpellAttack' onClick={() => this.sortSpells('spellAttack')}>
                    <h4>Attack/Saving Throw</h4>
                    {(this.state.sortField === 'spellAttack' && !this.state.reverse) && <RiArrowDropDownLine className='sortArrow' />}
                    {(this.state.sortField === 'spellAttack' && this.state.reverse) && <RiArrowDropUpLine className='sortArrow' />}
                </div>
                <div className='headerSpellEffect' onClick={() => this.sortSpells('spellEffect')}>
                    <h4>Damage/Effect</h4>
                    {(this.state.sortField === 'spellEffect' && !this.state.reverse) && <RiArrowDropDownLine className='sortArrow' />}
                    {(this.state.sortField === 'spellEffect' && this.state.reverse) && <RiArrowDropUpLine className='sortArrow' />}
                </div>
            </div>
        )
    }
};

export default Header;