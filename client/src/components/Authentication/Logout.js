import React from 'react'

import { Redirect } from 'react-router-dom'

import { checkIfAuthorized, logoutUser } from '../../apis/authAPI';

import Cookies from 'js-cookie'

import LoadingIcon from '../../vendor/d20.png';

class Logout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userAuthenticated: undefined
        }
    }

    async logOut() {
        return new Promise((resolve, reject) => {
            logoutUser().then((loggedOut) => {
                Cookies.remove('RPGSESID');
                resolve(loggedOut);
            });
        });
    }

    async componentDidMount() {
        await checkIfAuthorized().then(async (authorized) => {
            if (authorized)  {
                await this.logOut().then((loggedOut) => {
                    this.setState({
                        ...this.state,
                        userAuthenticated: authorized
                    });
                });
            } else {
                this.setState({
                    ...this.state,
                    userAuthenticated: authorized
                });
            }
        });
    }

    render() {
        if (this.state.userAuthenticated == undefined) {
            return (<div className='LoadingBox'><img className='Loading' src={LoadingIcon} alt='Loading...' style={{ width: '250px', height: '250px' }} /></div>);
        } else {
            return <Redirect to='/login' />
        } 
    }
}

export default Logout;