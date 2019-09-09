import axios from 'axios';

import { GET_LEADS, DELETE_LEAD, CREATE_LEAD } from './types';

export const createLead = data => {
    return dispatch => {
        axios.post('/api/leads/', data)
        .then(res => {
            dispatch({
                type: CREATE_LEAD,
                payload: res.data,
            });
        })
        .catch(e => console.log('--- error creating lead ', e));
    }
}

export const deleteLead = (leadId) => {
    return dispatch => {
        axios.delete(`/api/leads/${leadId}/`)
        .then(res => {
            dispatch({
                type: DELETE_LEAD,
                payload: leadId,
            });
        })
        .catch(e => console.log('--- error deleting lead ', e))
    }
}

export const getLeads = () => {
    return function(dispatch){
        axios.get('/api/leads/')
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data,
            });
        })
        .catch(e => console.log('--- error getting leads ', e));
    }
}
