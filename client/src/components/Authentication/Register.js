import React from 'react'

import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

import { checkEmail, checkUsername } from '../../apis/authAPI';

import { authorizeRegister } from '../../actions/authActions';

// React Icons imports
import { AiFillExclamationCircle, AiFillCheckCircle } from "react-icons/ai";

// Asset imports.
import LoadingIcon from '../../vendor/d20.png';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: '',
                valid: false,
                messages: [],
                messageVisible: false
            },
            email: {
                value: '',
                valid: false,
                messages: [],
                messageVisible: false
            },
            confirmEmail: {
                value: '',
                valid: false,
                messages: [],
                messageVisible: false
            },
            password: {
                value: '',
                valid: false,
                messages: [],
                messageVisible: false
            },
            confirmPassword: {
                value: '',
                valid: false,
                messages: [],
                messageVisible: false
            }
        }
    }

    async handleChange(event) {
        let name = event.target.name;
        this.setState({
            ...this.state, 
            [name]: {
                ...this.state[name],
                value: event.target.value
            }
        });
    }

    /**
     * Event Handler which is triggered when a form component loses focus in the DOM. Does form validations for the calling form item.
     * @param {Object} event 
     * @returns {Void} updates the state and returns nothing.
     */
    async handleBlur(event) {
        let blurEvent = {
            name: event.target.name,
            value: event.target.value,
            valid: true,
            messages: []
        };
        if (blurEvent.name === 'username') {
            if (blurEvent.value.length < 3) {
                blurEvent.valid = false;
                blurEvent.messages.push('Usernames must be at least 3 characters long');
            }
            let userRegex = /^[a-z0-9]+$/i;
            if (!userRegex.test(blurEvent.value)) {
                blurEvent.valid = false;
                blurEvent.messages.push('Usernames must only contain alphanumeric values (A-z, 0-9)');
            }
            // If it passes validations, check if it is available.
            if (blurEvent.valid) {
                await checkUsername(event.target.value).then((isTaken) => {
                    if (isTaken) {
                        blurEvent.valid = false;
                        blurEvent.messages.push('This username is already taken');
                    } else {
                        blurEvent.valid = true;
                        blurEvent.messages.push('This username is available!');
                    }
                });
            }
        } else if (blurEvent.name === 'email') {
            let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!emailRegex.test(blurEvent.value)) {
                blurEvent.valid = false;
                blurEvent.messages.push('This email address is invalid or improperly formatted');
            }
            // In the event email is changed after confirmEmail is set, call this function again with mock event to trigger the confirm email message.
            if (this.state.confirmEmail.value !== '') {
                await this.handleBlur({
                    target: {
                        name: 'confirmEmail',
                        value: this.state.confirmEmail.value
                    }
                })
            }
            // If it passes validations, check if it is available.
            if (blurEvent.valid) {
                await checkEmail(event.target.value).then((isTaken) => {
                    if (isTaken) {
                        blurEvent.valid = false;
                        blurEvent.messages.push('This email address is already registered with an account');
                    } else {
                        blurEvent.valid = true;
                        blurEvent.messages.push('This email address is available!');
                    }
                });
            }
        } else if (blurEvent.name === 'confirmEmail') {
            if (this.state.email.value === '' || (blurEvent.value.toLowerCase() !== this.state.email.value.toLowerCase())) {
                blurEvent.valid = false;
                blurEvent.messages.push('The entered email addresses do not match');
            }
        } else if (blurEvent.name === 'password') {
            if (blurEvent.value.length < 8) {
                blurEvent.valid = false;
                blurEvent.messages.push('The password must be a minimum of 8 characters');
            }
            let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!?]).{8,255}$/;
            if (!passwordRegex.test(blurEvent.value)) {
                blurEvent.valid = false;
                blurEvent.messages.push('The password must at least one uppercase letter, one lowercase letter, one number, and one special character (!,@,#,$,%,^,&,*,,-,+,=,?)');
            }
            // In the event password is changed after confirmPassword is set, call this function again with mock event to trigger the confirm password message.
            if (this.state.confirmPassword.value !== '') {
                await this.handleBlur({
                    target: {
                        name: 'confirmPassword',
                        value: this.state.confirmPassword.value
                    }
                })
            }
        } else if (blurEvent.name === 'confirmPassword') {
            if (this.state.password.value === '' || (blurEvent.value !== this.state.password.value)) {
                blurEvent.valid = false;
                blurEvent.messages.push('The entered passwords do not match');
            }
        }
        this.setState({
            ...this.state, 
            [blurEvent.name]: {
                ...this.state[blurEvent.name],
                valid: blurEvent.valid,
                messages: blurEvent.messages
            }
        });
    }

    async handleHoverOver(event) {
        this.setState({
            ...this.state, 
            [event.target.id]: {
                ...this.state[event.target.id],
                messageVisible: true
            }
        });
    }

    async handleHoverOut(event) {
        this.setState({
            ...this.state, 
            [event.target.id]: {
                ...this.state[event.target.id],
                messageVisible: false
            }
        });
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        let validRegistration = true;
        for (let field in this.state) {
            if (typeof this.state[field] == 'object' && this.state[field].hasOwnProperty('valid')  && !this.state[field].valid) {
                validRegistration = false;
                // For every bad field, call handler with with mock event to check the validations and set missing warnings, ie if the user immediately pressed register after opening the page.
                await this.handleBlur({
                    target: {
                        name: field,
                        value: this.state[field].value
                    }
                })
            } 
        }
        if (validRegistration) {
            this.setState({
                ...this.state,
                validationErrors: false
            }, async () => {
                try {
                    await this.props.dispatch(authorizeRegister(this.state.username.value, this.state.email.value, this.state.password.value));
                    if (!this.props.userAuthenticated) throw new Error();
                    else this.props.history.push('/');
                }
                catch (err) {
                    // Handle the error here...
                    this.setState({
                        ...this.state,
                        validationErrors: true,
                        validationErrorMessage: 'There was an issue registering your account, try again in a few moments. If the problem persists, please contact us.'
                    });
                }
            });
        } else {
            this.setState({
                ...this.state,
                validationErrors: true,
                validationErrorMessage: 'Registration details invalid, please make corrections and try again.'
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
                <div className="authPage">
                    <img className='RPGToolIcon' src={LoadingIcon} alt='RPGToolICon' style={{width:'5em',height:'5em'}}/>
                    <div className='authForm'>
                        <h2>Embark On Your Journey!</h2>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            {/* Logic for the Username header/input and validations warnings */}
                            <span id='username'  onMouseOver={this.handleHoverOver.bind(this)} onMouseOut={this.handleHoverOut.bind(this)}>Username</span> 
                            {
                                (this.state.username.valid != null && !this.state.username.valid && this.state.username.messages.length > 0) && 
                                <span>
                                    <AiFillExclamationCircle  className='registrationAlertIcon' id='username'  onMouseOver={this.handleHoverOver.bind(this)} onMouseOut={this.handleHoverOut.bind(this)}/>
                                    {
                                        (this.state.username.messageVisible) &&
                                        <div className='registrationAlertBox'>
                                            {
                                                this.state.username.messages.map(message => (            
                                                    <p className='registrationAlert' key={message}><AiFillExclamationCircle /> {message} </p>
                                                ))
                                            }
                                        </div>
                                    }

                                </span>
                            }
                            {
                                (this.state.username.valid) && 
                                <span>
                                    <AiFillCheckCircle className='registrationValidIcon' id='username'  onMouseOver={this.handleHoverOver.bind(this)} onMouseOut={this.handleHoverOut.bind(this)}/>
                                    {
                                        (this.state.username.messageVisible) &&   
                                        <div className='registrationAlertBox'>
                                            {
                                                this.state.username.messages.map(message => (            
                                                    <p className='registrationValid' key={message}><AiFillCheckCircle /> {message} </p>
                                                ))
                                            }
                                        </div>                                         
                                    }
                                </span>
                            }
                            <input type='text' name='username' value={this.state.username.value} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} />
                            <hr/>
                            {/* Logic for the Email header/input and validations warnings */}
                            <span id='email'  onMouseOver={this.handleHoverOver.bind(this)} onMouseOut={this.handleHoverOut.bind(this)}>Email</span> 
                            {
                                (this.state.email.valid != null && !this.state.email.valid && this.state.email.messages.length > 0) && 
                                <span>
                                    <AiFillExclamationCircle  className='registrationAlertIcon' id='email'  onMouseOver={this.handleHoverOver.bind(this)} onMouseOut={this.handleHoverOut.bind(this)}/>
                                    {
                                        (this.state.email.messageVisible) &&
                                        <div className='registrationAlertBox'>
                                            {
                                                this.state.email.messages.map(message => (            
                                                    <p className='registrationAlert' key={message}><AiFillExclamationCircle /> {message} </p>
                                                ))
                                            }
                                        </div>
                                    }

                                </span>
                            }
                            {
                                (this.state.email.valid) && 
                                <span>
                                    <AiFillCheckCircle className='registrationValidIcon' id='email'  onMouseOver={this.handleHoverOver.bind(this)} onMouseOut={this.handleHoverOut.bind(this)}/>
                                    {
                                        (this.state.email.messageVisible) &&   
                                        <div className='registrationAlertBox'>
                                            {
                                                this.state.email.messages.map(message => (            
                                                    <p className='registrationValid' key={message}><AiFillCheckCircle /> {message} </p>
                                                ))
                                            }
                                        </div>                                         
                                    }
                                </span>
                            }
                            <input type='text' name='email' value={this.state.email.value} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} />
                            <hr/>
                            {/* Logic for the Confirm Email header/input and validations warnings */}
                            <span id='confirmEmail'  onMouseOver={this.handleHoverOver.bind(this)} onMouseOut={this.handleHoverOut.bind(this)}>Confirm Email</span> 
                            {
                                (this.state.confirmEmail.valid != null && !this.state.confirmEmail.valid && this.state.confirmEmail.messages.length > 0) && 
                                <span>
                                    <AiFillExclamationCircle  className='registrationAlertIcon' id='confirmEmail'  onMouseOver={this.handleHoverOver.bind(this)} onMouseOut={this.handleHoverOut.bind(this)}/>
                                    {
                                        (this.state.confirmEmail.messageVisible) &&
                                        <div className='registrationAlertBox'>
                                            {
                                                this.state.confirmEmail.messages.map(message => (            
                                                    <p className='registrationAlert' key={message}><AiFillExclamationCircle /> {message} </p>
                                                ))
                                            }
                                        </div>
                                    }

                                </span>
                            }
                            <input type='text' name='confirmEmail' value={this.state.confirmEmail.value} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} />
                            <hr/>
                            {/* Logic for the Password header/input and validations warnings */}
                            <span id='password'  onMouseOver={this.handleHoverOver.bind(this)} onMouseOut={this.handleHoverOut.bind(this)}>Password</span> 
                            {
                                (this.state.password.valid != null && !this.state.password.valid && this.state.password.messages.length > 0) && 
                                <span>
                                    <AiFillExclamationCircle  className='registrationAlertIcon' id='password'  onMouseOver={this.handleHoverOver.bind(this)} onMouseOut={this.handleHoverOut.bind(this)}/>
                                    {
                                        (this.state.password.messageVisible) &&
                                        <div className='registrationAlertBox'>
                                            {
                                                this.state.password.messages.map(message => (            
                                                    <p className='registrationAlert' key={message}><AiFillExclamationCircle /> {message} </p>
                                                ))
                                            }
                                        </div>
                                    }

                                </span>
                            }
                            <input type='password' name='password' value={this.state.password.value} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} />
                            <hr/>
                            {/* Logic for the Confirm Password header/input and validations warnings */}
                            <span id='confirmPassword'  onMouseOver={this.handleHoverOver.bind(this)} onMouseOut={this.handleHoverOut.bind(this)}>Confirm Password</span> 
                            {
                                (this.state.confirmPassword.valid != null && !this.state.confirmPassword.valid && this.state.confirmPassword.messages.length > 0) && 
                                <span>
                                    <AiFillExclamationCircle  className='registrationAlertIcon' id='confirmPassword'  onMouseOver={this.handleHoverOver.bind(this)} onMouseOut={this.handleHoverOut.bind(this)}/>
                                    {
                                        (this.state.confirmPassword.messageVisible) &&
                                        <div className='registrationAlertBox'>
                                            {
                                                this.state.confirmPassword.messages.map(message => (            
                                                    <p className='registrationAlert' key={message}><AiFillExclamationCircle /> {message} </p>
                                                ))
                                            }
                                        </div>
                                    }

                                </span>
                            }
                            <input type='password' name='confirmPassword' value={this.state.confirmPassword.value} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} />
                            <hr/>
                            {
                                (this.state.validationErrors) && 
                                <p className='registrationAlert'><AiFillExclamationCircle /> {this.state.validationErrorMessage} </p>
                            }
                            <button type='submit'>Register for Service</button>
                        </form>
                        <span>Existing user? <Link to='/login'>Sign In</Link></span>
                        <span>Having login issues? <Link to='/' >Forgot Password</Link></span>
                    </div>  
                </div>
            )
        }     
    }
}

const mapStateToProps = (state) => ({
    userAuthenticated: state.auth.userInfo.authenticated
});

export default connect(mapStateToProps)(Register);