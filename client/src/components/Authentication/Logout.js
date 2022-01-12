import React from 'react'

import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

import { checkIfAuthorized, logoutUser } from '../../apis/authAPI';

import { logoutUser as logoutUserStore } from '../../actions/authActions';

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
        if (this.props.userAuthenticated) {
            await this.logOut().then((loggedOut) => {
                this.props.dispatch(logoutUserStore());
            });
            // } else {
            //     this.setState({
            //         ...this.state,
            //         userAuthenticated: authorized
            //     });
            // }
        } // );
    }

    render() {
        if (this.props.userAuthenticated == undefined) {
            return (<div className='LoadingBox'><img className='Loading' src={LoadingIcon} alt='Loading...' style={{ width: '250px', height: '250px' }} /></div>);
        } else {
            return <Redirect to='/login' />
        } 
    }
}

const mapStateToProps = (state) => ({
    userAuthenticated: state.auth.userInfo.authenticated
});

export default connect(mapStateToProps)(Logout);