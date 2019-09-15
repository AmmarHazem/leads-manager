import { SHOW_ERRORS } from '../actions/types';

const initialState = {
    msg: {},
    status: null,
}

const errorsReducer = (state = initialState, action) => {
    switch(action.type){
        case SHOW_ERRORS:
            return Object.assign({}, state, {
                msg: action.payload.msg,
                status: action.payload.status,
            });

        default:
            return state
    }
}

export default errorsReducer;
