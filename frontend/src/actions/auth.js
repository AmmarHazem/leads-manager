import axios from 'axios';

import { showErrors } from './leads';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, CLEAR_LEADS, REGISTER_SUCCESS, REGISTER_ERROR } from './types';
import { getMessages } from './messages';

export function getConfig(token){
    let config = {
        headers: {
            'Content-Type' : 'application/json',
        }
    };
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
}

export const registerUser = ({username, email, password, password2}) => {
    return (dispatch, getState) => {
        dispatch({type: USER_LOADING});
        axios.post('/api/auth/register/', JSON.stringify({username, email, password, password2}), getConfig(getState().auth.token))
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
            dispatch(getMessages({registerSuccess: `Welcome ${username}`}));
        })
        .catch(err => {
            showErrors(err, dispatch);
            dispatch({type: REGISTER_ERROR});
        })
    }
}

export const logoutUser = () => {
    return (dispatch, getState) => {
        
        axios.post('/api/auth/logout/', null, getConfig(getState().auth.token))
        .then(res => {
            dispatch({
                type: LOGOUT,
                payload: res.data,
                payload: res.data,
            });
            dispatch({type: CLEAR_LEADS});
        })
        .catch(err => showErrors(err, dispatch));
    }
}

export const loadUser = () => {
    return (dispatch, getState) => {
        dispatch({type: USER_LOADING});

        axios.get('/api/auth/user/', getConfig(getState().auth.token))
        .then(res => {
            dispatch({type: USER_LOADED, payload: res.data});
        })
        .catch(err => {
            showErrors(err, dispatch);
            dispatch({type: AUTH_ERROR});
        });
    }
}

export const loginUser = ({username, password}) => {
    return dispatch => {

        let body = {username, password};
        dispatch({type: USER_LOADING});
        axios.post('/api/auth/login/', body, getConfig())
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            dispatch(getMessages({loggedIn: `Logged in as ${username}`}));
        })
        .catch(err => {
            showErrors(err, dispatch);
            dispatch({
                type: LOGIN_ERROR,
            });
        });
    }
}
