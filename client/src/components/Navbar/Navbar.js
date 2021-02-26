// React imports.
import React from 'react'
import {NavLink} from 'react-router-dom'

// Vendor imports.
import LoadingIcon from '../../vendor/d20.png';

class Navbar extends React.Component {
    render() {
        return (
            <div className='navbar'>
                <ul>
                    <li><NavLink exact to='/'><img className='RPGToolIcon' src={LoadingIcon} alt='RPGToolICon' style={{width:'50px',height:'50px'}}/></NavLink></li>
                    <li><NavLink exact to='/sample-spellbook'>Spellbook</NavLink></li>
                    <li><NavLink exact to='/spell-compendium'>Spell Compendium</NavLink></li>
                    <li><NavLink exact to='/about'>About</NavLink></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;