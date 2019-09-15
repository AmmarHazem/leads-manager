import { USER_LOADED, AUTH_ERROR, USER_LOADING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, REGISTER_ERROR, REGISTER_SUCCESS } from '../actions/types';


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_LOADING:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case USER_LOADED:
            return Object.assign({}, state, {
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            });
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return Object.assign({}, state, {
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            });
        case REGISTER_ERROR:
        case LOGIN_ERROR:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return Object.assign({}, state, {
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            })

        default:
            return state
    }
}

export default authReducer;
