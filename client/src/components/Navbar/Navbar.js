// React imports.
import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import { checkIfAuthorized, logoutUser } from '../../apis/authAPI';



// Asset imports.
import LoginIcon from '../../assets/userlogo.png';
import LoadingIcon from '../../vendor/d20.png';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userAuthenticated: undefined
        }
    }

    async componentDidMount() {
        await checkIfAuthorized().then((authorized) => {
            console.log(authorized)
            this.setState({
                ...this.state,
                userAuthenticated: authorized
            });
        });
    }

    render() {
        if (this.state.userAuthenticated == undefined) {
            return null;
        } else {
            return (
                <div className='navbar'>
                    <div className='navLeft'>
                        <NavLink exact to='/'><img className='RPGToolIcon' src={LoadingIcon} alt='RPGToolICon' style={{width:'50px',height:'50px'}}/></NavLink>
                        <NavLink exact to='/character'><h4>My Character</h4></NavLink>
                        <NavLink exact to='/sample-spellbook'><h4>Spellbook</h4></NavLink>
                        <NavLink exact to='/spell-compendium'><h4>Spell Compendium</h4></NavLink>
                        <NavLink exact to='/about'><h4>About</h4></NavLink>
                    </div>
                    <div className='navRight'>
                        {
                            (this.state.userAuthenticated) ? 
                            <NavLink exact to='/logout'><h4>Log Out</h4></NavLink> :
                                // <NavLink exact to='/login'><img className='LoginIcon' src={LoginIcon} alt='LoginIcon' style={{width:'50px',height:'50px'}}/></NavLink> :
                                <div>
                                    <NavLink exact to='/login' onClick={() => console.log('test')}><h4>Log In</h4></NavLink>
                                    <NavLink exact to='/register'><h4 className='navRegister'>Register</h4></NavLink>
                                </div>
                        }
                    </div>
                    {/* <div className='userTab'>
                        <div className='userLinks'>
                            <li><NavLink exact to='/UnderConstruction'>Profile</NavLink></li>
                            <li><NavLink exact to='/UnderConstruction'>Log Out</NavLink></li>
                        </div>
                    </div> */}
                </div>
            )
        }
    }
}

export default Navbar;