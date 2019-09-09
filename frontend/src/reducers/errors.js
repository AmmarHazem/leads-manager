import { GET_ERRORS } from '../actions/types';

const initialState = {
    msg: {},
    state: null,
}

const errorsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ERRORS:
            return Object.assign({}, state, {
                msg: action.payload.msg,
                state: action.payload.state,
            });

        default:
            return state
    }
}

export default errorsReducer;
