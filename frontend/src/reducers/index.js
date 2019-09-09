import { combineReducers } from 'redux';
import leadsReducers from './leads';

const rootReducer = {
    leads: leadsReducers,
};

export default combineReducers(rootReducer);
