import { combineReducers } from 'redux';
import leadsReducers from './leads';
import errorsReducer from './errors';
import messagesReducer from './messages';
import authReducer from './auth';

const rootReducer = {
    leads: leadsReducers,
    errors: errorsReducer,
    messages: messagesReducer,
    auth: authReducer,
};

export default combineReducers(rootReducer);
