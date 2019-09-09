import { GET_LEADS, DELETE_LEAD, CREATE_LEAD } from '../actions/types';

const initialState = {
    leads: [],
}

const leadsReducers = (state = initialState, action) => {
    let {payload} = action;
    switch(action.type){
        case CREATE_LEAD:
            return Object.assign({}, state, {
                leads: [ action.payload, ...state.leads],
            });
        case DELETE_LEAD:
            let newLeads = state.leads.filter(lead => lead.id !== action.payload);
            return Object.assign({}, state, {leads: newLeads});
        case GET_LEADS:
            return Object.assign({}, state, {
                leads: payload,
            });

        default:
            return state;
    }
}

export default leadsReducers;
