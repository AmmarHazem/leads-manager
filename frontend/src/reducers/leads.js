import { GET_LEADS, DELETE_LEAD, CREATE_LEAD, UPDATE_LEAD, STOP_LOADING, LOADING, CLEAR_LEADS } from '../actions/types';

const initialState = {
    leads: [],
    isLoading: false,
}

const leadsReducers = (state = initialState, action) => {
    let {payload} = action;
    switch(action.type){
        case CLEAR_LEADS:
            return Object.assign({}, state, {
                leads: [],
            });
        case LOADING:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case STOP_LOADING:
            return Object.assign({}, state, {
                isLoading: false,
            });
        case UPDATE_LEAD:
            let {leads} = state;
            let lewLeads = leads.map(lead => {
                if(lead.id == action.payload.id)
                {
                    return action.payload;
                }
                return lead;
            });
            return Object.assign({}, state, {
                leads: lewLeads,
            });
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
