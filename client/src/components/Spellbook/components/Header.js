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
    }

    sortSpells = (sortCol) => {
        this.props.sorting(sortCol);
    }

    render() {
        return (
            <div className='spellbookHeader'>
                <div className='headerSpellName' onClick={() => this.sortSpells('spellName')}>
                    <h4>Spell Name</h4>
                    {(this.props.sortField === 'spellName' && !this.props.reverse) && <RiArrowDropDownLine className='sortArrow' />}
                    {(this.props.sortField === 'spellName' && this.props.reverse) && <RiArrowDropUpLine className='sortArrow' />}
                </div>
                <div className='headerSpellLevel' onClick={() => this.sortSpells('spellLevel')}>
                    <h4>Level</h4>
                    {(this.props.sortField === 'spellLevel' && !this.props.reverse) && <RiArrowDropDownLine className='sortArrow' />}
                    {(this.props.sortField === 'spellLevel' && this.props.reverse) && <RiArrowDropUpLine className='sortArrow' />}
                </div>
                <div className='headerSpellSchool' onClick={() => this.sortSpells('spellSchool')}>
                    <h4>School of Magic</h4>
                    {(this.props.sortField === 'spellSchool' && !this.props.reverse) && <RiArrowDropDownLine className='sortArrow' />}
                    {(this.props.sortField === 'spellSchool' && this.props.reverse) && <RiArrowDropUpLine className='sortArrow' />}
                </div>
                <div className='headerSpellAttack' onClick={() => this.sortSpells('spellAttack')}>
                    <h4>Attack/Saving Throw</h4>
                    {(this.props.sortField === 'spellAttack' && !this.props.reverse) && <RiArrowDropDownLine className='sortArrow' />}
                    {(this.props.sortField === 'spellAttack' && this.props.reverse) && <RiArrowDropUpLine className='sortArrow' />}
                </div>
                <div className='headerSpellEffect' onClick={() => this.sortSpells('spellEffect')}>
                    <h4>Damage/Effect</h4>
                    {(this.props.sortField === 'spellEffect' && !this.props.reverse) && <RiArrowDropDownLine className='sortArrow' />}
                    {(this.props.sortField === 'spellEffect' && this.props.reverse) && <RiArrowDropUpLine className='sortArrow' />}
                </div>
            </div>
        )
    }
};

export default Header;