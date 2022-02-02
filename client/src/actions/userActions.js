import { checkIfAuthorized, authorizeUser, registerUser } from '../apis/authAPI';

import { getUser } from '../apis/userAPI';

// User action types for the Redux Store.
// Actions specific to authorizing the user.
export const LOGIN_USER = 'LOGIN_USER';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

// Actions specific to fetching user info.
export const FETCH_USER_PREFERENCES = 'FETCH_USER_PREFERENCES';

export const FETCH_USER_PREFERENCES_SUCCESS = 'FETCH_USER_PREFERENCES_SUCCESS';

export const FETCH_USER_PREFERENCES_FAILURE = 'FETCH_USER_PREFERENCES_FAILURE';

// Action creators for the Redux Store.
export const loginUser = () => ({
    type: LOGIN_USER
});

export const loginUserSuccess = (authStatus) => ({
    type: LOGIN_USER_SUCCESS,
    payload: authStatus
});

export const loginUserFailure = (loginFail) => ({
    type: LOGIN_USER_FAILURE,
    payload: loginFail.payload,
    error: loginFail.error
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});

export const fetchUserPreferences = () => ({
    type: FETCH_USER_PREFERENCES
});

export const fetchUserPreferencesSuccess = (userPrefs) => ({
    type: FETCH_USER_PREFERENCES_SUCCESS,
    payload: userPrefs
});

export const fetchUserPreferencesFailure = (fetchFail) => ({
    type: FETCH_USER_PREFERENCES_FAILURE,
    payload: fetchFail.payload,
    error: fetchFail.error
});

// Authorization actions for the Redux Store.
export function authorizeLogin(usernameOrEmail, password) {
    return async (dispatch) => {
        dispatch(loginUser());
        try {
            await checkIfAuthorized().then(async (res) => {
                if (res.authenticated) {
                    dispatch(loginUserSuccess({userId: res.payload.userId}));
                    dispatch(getUserPreferences(res.payload.userId));
                } else {
                    await authorizeUser(usernameOrEmail, password).then((results) => {  
                        if (!results) dispatch(loginUserFailure({error: false}));
                        else {
                            dispatch(loginUserSuccess({userId: results.payload.userId}));
                            dispatch(getUserPreferences(results.payload.userId));
                        }
                    }).catch((err) => {
                        console.log(err);
                        // Handle the error here...
                        dispatch(loginUserFailure({
                            payload: err,
                            error: true
                        }));
                    });
                }
            });
        } catch (err) {
            dispatch(loginUserFailure({
                payload: err,
                error: true
            }));
        }
    }
}

export function authorizeSession() {
    return async (dispatch) => {
        dispatch(loginUser());
        try {
            await checkIfAuthorized().then((res) => {
                if (res.authenticated) {
                    dispatch(loginUserSuccess({userId: res.payload.userId}));
                    dispatch(getUserPreferences(res.payload.userId));
                } else {
                    dispatch(loginUserFailure({error: false}));
                }
            });
        } catch (err) {
            dispatch(loginUserFailure({
                payload: err,
                error: true
            }));
        }
    }
}

export function authorizeRegister(username, email, password) {
    return async (dispatch) => {
        dispatch(loginUser()); 
        try {
            await registerUser(username, email, password).then((res) => {   
                if (res.authenticated) {
                    dispatch(loginUserSuccess({userId: res.payload.userId}));
                    dispatch(getUserPreferences(res.payload.userId));
                } else {
                    dispatch(loginUserFailure({error: true, payload: res.error}));
                }
            });
        } catch (err) {
            dispatch(loginUserFailure({
                payload: err,
                error: true
            }));
        }
    };
}

// User actions for the Redux Store.
export function getUserPreferences(userId) {
    return async (dispatch) => {
        dispatch(fetchUserPreferences());
        try {
            await getUser(userId).then((res) => {
                if (res.data && res.data.length !== {}) dispatch(fetchUserPreferencesSuccess(res.data));
                else dispatch(fetchUserPreferencesFailure({data: res.data, error: true}));
            });
        } catch (err) {
            console.log(err);
            dispatch(fetchUserPreferencesFailure({
                payload: err,
                error: true
            }));
        }
    }
}