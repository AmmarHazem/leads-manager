import axios from 'axios';

import { GET_LEADS, DELETE_LEAD, CREATE_LEAD, UPDATE_LEAD, LOADING, STOP_LOADING, GET_ERRORS } from './types';
import { getMessages } from './messages';

export function handleErrors(e, dispatch){
    try{
        let errors = {
            msg: e.response.data,
            status: e.response.status,
        }
        dispatch({
            type: GET_ERRORS,
            payload: errors,
        });
    }
    catch (err){
        console.log('--- handle errors ', err);
    }
}

export const updateLead = data => {
    return dispatch => {
        dispatch({
            type: LOADING,
        });
        axios.put(`/api/leads/${data.id}/`, data)
        .then(res => {
            dispatch({
                type: UPDATE_LEAD,
                payload: res.data,
            });
            document.getElementById(`modal-close-${data.id}`).click();
            dispatch(getMessages({leadUpdated: 'Lead Updated Successfully'}));
        })
        .catch(e => handleErrors(e, dispatch))
        .finally(() => dispatch({type: STOP_LOADING}));
    }
}

export const createLead = data => {
    return dispatch => {
        dispatch({
            type: LOADING,
        });
        axios.post('/api/leads/', data)
        .then(res => {
            dispatch({
                type: CREATE_LEAD,
                payload: res.data,
            });
            dispatch(getMessages({leadAdded: 'Lead Added Successfully'}));
        })
        .catch(e => handleErrors(e, dispatch))
        .finally(() => dispatch({type: STOP_LOADING}));
    }
}

export const deleteLead = (leadId) => {
    return dispatch => {
        dispatch({
            type: LOADING,
        });
        axios.delete(`/api/leads/${leadId}/`)
        .then(res => {
            dispatch({
                type: DELETE_LEAD,
                payload: leadId,
            });
            dispatch(getMessages({leadDeleted: 'Lead Deleted Successfully'}));
        })
        .catch(e => handleErrors(e, dispatch))
        .finally(() => dispatch({type: STOP_LOADING}));
    }
}

export const getLeads = () => {
    return function(dispatch){
        dispatch({
            type: LOADING,
        });
        axios.get('/api/leads/')
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data,
            });
        })
        .catch(e => handleErrors(e, dispatch))
        .finally(() => dispatch({type: STOP_LOADING}));
    }
}
