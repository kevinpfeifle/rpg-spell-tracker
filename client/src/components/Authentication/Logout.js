import React from 'react'

import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

import { logoutUser } from '../../apis/authAPI';

import { logoutUser as logoutUserStore } from '../../actions/authActions';

import Cookies from 'js-cookie'

import LoadingIcon from '../../vendor/d20.png';

class Logout extends React.Component {

    constructor(props) {
        super(props);
    }

    async logOut() {
        return new Promise(async (resolve, reject) => {
            try {
                await logoutUser().catch((err) => {
                    console.log(err); // Most likely the error is the session has already expired. Will need to log this somewhere private outside of browser console.
                });
                Cookies.remove('RPGSESID');
                await this.props.dispatch(logoutUserStore());
                resolve(true);
            } catch (err) {
                console.log(err); // This one might be a real error though... Will need to log this somewhere private outside of browser console.
                resolve(false);
            }
        });
    }
    
    render() {
        let component = null;
        if (this.props.userAuthenticated == undefined) {
            component =  (<div className='LoadingBox'><img className='Loading' src={LoadingIcon} alt='Loading...' style={{ width: '250px', height: '250px' }} /></div>);
        } else if (this.props.userAuthenticated) {
            this.logOut().then((results) => {
                component = <Redirect to='/login' />
            });
        } else {
            component = <Redirect to='/login' />
        }
        return component;
    }
}

const mapStateToProps = (state) => ({
    userAuthenticated: state.auth.userInfo.authenticated
});

export default connect(mapStateToProps)(Logout);