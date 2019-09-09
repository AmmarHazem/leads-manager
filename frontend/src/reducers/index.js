import { combineReducers } from 'redux';
import leadsReducers from './leads';
import errorsReducer from './errors';
import messagesReducer from './messages';

const rootReducer = {
    leads: leadsReducers,
    errors: errorsReducer,
    messages: messagesReducer,
};

export default combineReducers(rootReducer);
