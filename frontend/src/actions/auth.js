import axios from 'axios';

import { handleErrors } from './leads';
import { USER_LOADING, USER_LOADED, AUTH_ERROR } from './types';


export const loadUser = () => {
    return (dispatch, getState) => {
        console.log('--- get state ', getState());
        dispatch({type: USER_LOADING});
        let token = getState().auth.token;
        let config = {
            headers: {
                'Content-Type' : 'application/json',
            }
        };

        if(token){
            config.headers['Authentication'] = `Token ${token}`;
        }

        axios.get('/api/auth/user/', config)
        .then(res => {
            dispatch({type: USER_LOADED, payload: res.data});
        })
        .catch(err => {
            handleErrors(err, dispatch);
            dispatch({type: AUTH_ERROR});
        });
    }
}
