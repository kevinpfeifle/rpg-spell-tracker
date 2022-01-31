import React from 'react'

import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

import { authorizeLogin } from '../../actions/userActions';

// React Icons imports
import { AiFillExclamationCircle } from "react-icons/ai";

// Asset imports.
import LoadingIcon from '../../vendor/d20.png';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: '',
            password: '',
            validationErrors: []
        }
    }

    async handleChange(event) {
        let name = event.target.name;
        this.setState({
            ...this.state, 
            [name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        let validationErrors = [];
        if (this.state.usernameOrEmail === '') {
            validationErrors.push("'Username or Email' is a required field.")
        }
        if (this.state.password === '') {
            validationErrors.push("'Password' is a required field.")
        }
        if (validationErrors.length === 0) {
            await this.props.dispatch(authorizeLogin(this.state.usernameOrEmail, this.state.password));
            // if (this.props.userAuthenticated) this.props.history.push('/');
            if (!this.props.userAuthenticated) {
                this.setState({
                    ...this.state,
                    validationErrors: ['Unable to login. The provided credentials are invalid.']
                });
            }
        } else {
            this.setState({
                ...this.state,
                validationErrors: validationErrors
            });
        }
    }

    render() {
        if (this.props.userAuthenticated == undefined) {
            return null;
        } else if (this.props.userAuthenticated) {
            return <Redirect to='/' />
        } else {
            return (
                <div className='authPage'>
                    <Link exact to='/'><img className='RPGToolIcon' src={LoadingIcon} alt='RPGToolICon' style={{width:'5em',height:'5em'}}/></Link>
                    <div className='authForm'>
                        <h2>Hail, Adventurer!</h2>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <span>Username or Email</span>
                            <input type='text' name='usernameOrEmail' value={this.state.usernameOrEmail} onChange={this.handleChange.bind(this)} />
                            <hr/>
                            <span>Password</span>
                            <input type='password' name='password' value={this.state.password} onChange={this.handleChange.bind(this)} />
                            <hr/>
                            {
                                this.state.validationErrors.map(message => (            
                                    <p key={message} className='registrationAlert'><AiFillExclamationCircle /> {message} </p>
                                ))
                            }
                            <button type='submit'>Login to Service</button>
                        </form>
                        <span>New around here? <Link to='/register' >Sign Up</Link></span>
                        <span>Having login issues? <Link to='/' >Forgot Password</Link></span>
                    </div>
                </div>
            )    
        }
    }
}


const mapStateToProps = (state) => ({
    userAuthenticated: state.user.auth.authenticated
});

export default connect(mapStateToProps)(Login);