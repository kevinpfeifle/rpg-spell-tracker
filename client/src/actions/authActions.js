'use strict'

import { checkIfAuthorized, authorizeUser, registerUser } from '../apis/authAPI';

// Auth action types for the Redux Store.
export const LOGIN_USER = 'LOGIN_USER';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

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

// Actions for the Redux Store.
export function authorizeLogin(usernameOrEmail, password) {
    return async (dispatch) => {
        dispatch(loginUser());
        try {
            await checkIfAuthorized().then(async (res) => {
                if (res.authenticated) dispatch(loginUserSuccess({userId: res.payload.userId}));
                else {
                    await authorizeUser(usernameOrEmail, password).then((results) => {  
                        if (!results) dispatch(loginUserFailure({error: false}));
                        else dispatch(loginUserSuccess({userId: results.payload.userId}));
                    }).catch((err) => {
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
                if (res.authenticated) dispatch(loginUserSuccess({userId: res.payload.userId}));
                else {
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
                if (res.authenticated) dispatch(loginUserSuccess({userId: res.payload.userId}));
                else {
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