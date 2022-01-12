'use strict'

import * as actions from '../actions/authActions'

const initState = {
    userInfo: {
        authenticated: false,
        userId: null,
        loginError: null,
        username: null
    },
    loading: false
};

const authReducer = (state = initState, action) => {
    let authedUser = {};
    switch (action.type) {
        case actions.LOGIN_USER:
            return { ...state, loading: true };
        case actions.LOGIN_USER_SUCCESS:
            console.log(action);
            authedUser = {
                authenticated: true
                // userId: action.payload.userId,
                // username: action.payload.username
            };
            return { ...state, userInfo: authedUser, loading: false }; // adds the new object to the current state
        case actions.LOGIN_USER_FAILURE:
            authedUser = {
                authenticated: false,
                id: null,
                loginError: action.error,
                username: null
            };
            return { ...state, userInfo: authedUser, loading: false }; // adds the new object to the current state
        case actions.LOGOUT_USER:
            authedUser = {
                authenticated: false,
                id: null,
                loginError: null,
                username: null
            };
            return { ...state, userInfo: authedUser, loading: false }; // adds the new object to the current state
    }
    return state;
}

export default authReducer;