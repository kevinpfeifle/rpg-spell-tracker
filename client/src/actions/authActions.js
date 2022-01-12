'use strict'

import { checkIfAuthorized, authorizeUser } from '../apis/authAPI';

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
    console.log('test2');
    return async (dispatch) => {
        console.log('test4');
        dispatch(loginUser());
        try {
            await checkIfAuthorized().then(async (userAuthed) => {
                if (userAuthed) dispatch(loginUserSuccess());
                else {
                    await authorizeUser(usernameOrEmail, password).then((results) => {  
                        console.log(results);
                        if (!results) dispatch(loginUserFailure({payload: results, error: false}));
                        else dispatch(loginUserSuccess(results));
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
            dispatch(loginUserFailure(err));
        }
    }
}