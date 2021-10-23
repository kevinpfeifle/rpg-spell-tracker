import React from 'react'

import { Link } from 'react-router-dom'

// Asset imports.
import LoadingIcon from '../../../vendor/d20.png';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="authPage">
                <img className='RPGToolIcon' src={LoadingIcon} alt='RPGToolICon' style={{width:'5em',height:'5em'}}/>
                <div className="authForm">
                    <h2>Hail, Adventurer!</h2>
                    <form>
                        <span>Username or Email</span>
                        <input type="text" />
                        <hr/>
                        <span>Password</span>
                        <input type="password" />
                        <hr/>
                        <button type="submit">Login to Service</button>
                    </form>
                    <span>New around here? <Link to='/register' >Sign Up</Link></span>
                    <span>Having login issues? <Link to='/' >Forgot Password</Link></span>
                </div>
            </div>
        )    
    }
}

export default Login;