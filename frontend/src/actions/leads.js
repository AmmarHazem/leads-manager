import axios from 'axios';

import { GET_LEADS, DELETE_LEAD, CREATE_LEAD, UPDATE_LEAD, LOADING, STOP_LOADING, SHOW_ERRORS } from './types';
import { getMessages } from './messages';
import { getConfig } from './auth';

export function showErrors(e, dispatch){
    try{
        let errors = {
            msg: e.response.data,
            status: e.response.status,
        }
        let action = {
            type: SHOW_ERRORS,
            payload: errors,
        };
        dispatch(action);
    }
    catch (err){
        console.log('--- handle errors ', err);
    }
}

export const updateLead = data => {
    return (dispatch, getState) => {
        dispatch({
            type: LOADING,
        });
        axios.patch(`/api/leads/${data.id}/`, data, getConfig(getState().auth.token))
        .then(res => {
            dispatch({
                type: UPDATE_LEAD,
                payload: res.data,
            });
            // document.getElementById(`modal-close-${data.id}`).click();
            dispatch(getMessages({leadUpdated: 'Lead Updated Successfully'}));
            console.log('--- update success');
        })
        .catch(e => {showErrors(e, dispatch); console.log('--- update error');})
        .finally(() => dispatch({type: STOP_LOADING}));
    }
}

export const createLead = data => {
    return (dispatch, getState) => {
        dispatch({
            type: LOADING,
        });
        axios.post('/api/leads/', data, getConfig(getState().auth.token))
        .then(res => {
            dispatch({
                type: CREATE_LEAD,
                payload: res.data,
            });
            dispatch(getMessages({leadAdded: 'Lead Added Successfully'}));
        })
        .catch(e => showErrors(e, dispatch))
        .finally(() => dispatch({type: STOP_LOADING}));
    }
}

export const deleteLead = (leadId) => {
    return (dispatch, getState) => {
        dispatch({
            type: LOADING,
        });
        axios.delete(`/api/leads/${leadId}/`, getConfig(getState().auth.token))
        .then(res => {
            dispatch({
                type: DELETE_LEAD,
                payload: leadId,
            });
            dispatch(getMessages({leadDeleted: 'Lead Deleted Successfully'}));
        })
        .catch(e => showErrors(e, dispatch))
        .finally(() => dispatch({type: STOP_LOADING}));
    }
}

export const getLeads = () => {
    return function(dispatch, getState){
        dispatch({
            type: LOADING,
        });
        axios.get('/api/leads/', getConfig(getState().auth.token))
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data,
            });
        })
        .catch(e => showErrors(e, dispatch))
        .finally(() => dispatch({type: STOP_LOADING}));
    }
}
