'use strict'

import * as actions from '../actions/userActions'

const initState = {
    auth: {
        authenticated: null,
        loginError: null
    },
    userInfo: {
        userId: null,
        username: null,
    },
    userPreferences: {
        activeCharacterId: null
    },
    loading: false
};

const authReducer = (state = initState, action) => {
    let auth, userInfo, userPreferences;
    switch (action.type) {
        // Authorization Actions
        case actions.LOGIN_USER:
            return { ...state, loading: true };
        case actions.LOGIN_USER_SUCCESS:
            // Update auth as true, set the user data that is relevant.
            auth = {...state.auth};
            auth.authenticated = true;
            auth.loginError =  null
            userInfo = {...state.userInfo};
            userInfo.userId = action.payload.userId;
            return { ...state, auth: auth, userInfo: userInfo, loading: false };
        case actions.LOGIN_USER_FAILURE:
            // Update auth as false, and ensure any user data is unset and returns to the initial state.
            auth = {
                authenticated: false,
                loginError: action.error
            };
            return { ...state, auth: auth, userInfo: initState.userInfo, userPreferences: initState.userPreferences, loading: false };
        case actions.LOGOUT_USER:
            // On logout just return almoist the initial state since we don't need any of the data, except that we know they are not authed.
            let newState = {...initState, auth: {...initState.auth, authenticated: false}, loading: false}
            return newState;
        // User Data Actions
        case actions.FETCH_USER_PREFERENCES:
            return { ...state, loading: true };
        case actions.FETCH_USER_PREFERENCES_SUCCESS:
            // Update the user information and preferences based on what was pulled from the DB. 
            userInfo = {...state.userInfo};
            userInfo.username = action.payload.username;
            userPreferences = {...state.userPreferences};
            userPreferences.activeCharacterId = (action.payload.active_character_id != null) ? action.payload.active_character_id : -1;
            return { ...state, userInfo: userInfo, userPreferences: userPreferences, loading: false }; 
        case actions.FETCH_USER_PREFERENCES_FAILURE:
            // In this scenario, we are still authenticated as user, but the query failed, so initalized the userPreferences to default.
            return {...state, userPreferences: initState.userPreferences, loading: false}; 
    }

    return state;
}

export default authReducer;