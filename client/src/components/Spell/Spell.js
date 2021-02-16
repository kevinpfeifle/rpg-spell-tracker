// External imports.
import React from 'react'

// Internal imports.
import SpellRef from './components/SpellRef';
import SpellDesc from './components/SpellDesc';

/**
 * Component which displays an entire spell, clicking it will reveal an extended description of the spell.
 * @param {Object} props.spell the spell object used to display the contents of the spell.
 * @param {Boolean} props.knownSpell boolean to determine the context if this is a spellbook spell or spelllist spell.
 * @returns the created component.
 */
class Spell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {spellVis: false}; // State to determine if we display the full spell or not
    }
    
    toggleVisibility = () => {
        this.setState({spellVis: !this.state.spellVis});
    };

    // Function to render the spell specifically for a spellbook which contains this spell.
    renderKnownSpell() {
        return (
            <div>
                <SpellRef spell={this.props.spell} toggleVisibility={this.toggleVisibility} />
                {this.state.spellVis && <SpellDesc spell={this.props.spell}/>}
            </div>
        )
    }
    // Function to render the spell for the entire available spell list.
    renderListSpell() {
        return (
            <div>
                <SpellRef spell={this.props.spell} toggleVisibility={this.toggleVisibility} />
                {this.state.spellVis && <SpellDesc spell={this.props.spell}/>}
            </div>
        )
    }

    render() {
        return (this.props.knownSpell) ? this.renderKnownSpell() : this.renderListSpell()
    }
}

export default Spell;