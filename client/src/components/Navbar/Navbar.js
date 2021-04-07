// React imports.
import React from 'react'
import {NavLink} from 'react-router-dom'

// Asset imports.
import LoginIcon from '../../assets/userlogo.png';
import LoadingIcon from '../../vendor/d20.png';

class Navbar extends React.Component {
    render() {
        return (
            <div className='navbar'>
                <ul>
                    <div className='navbarLeft'>
                        <li><NavLink exact to='/'><img className='RPGToolIcon' src={LoadingIcon} alt='RPGToolICon' style={{width:'50px',height:'50px'}}/></NavLink></li>
                        <li><NavLink exact to='/sample-spellbook'>Spellbook</NavLink></li>
                        <li><NavLink exact to='/spell-compendium'>Spell Compendium</NavLink></li>
                        <li><NavLink exact to='/about'>About</NavLink></li>
                    </div>
                    <div className='navbarRight'>
                        <li id='loginIcon'><NavLink exact to='/login'><img className='LoginIcon' src={LoginIcon} alt='LoginIcon' style={{width:'40px',height:'40px'}}/></NavLink></li>
                    </div>
                </ul>
            </div>
        )
    }
}

export default Navbar;