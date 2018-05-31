import * as TYPES from './../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case TYPES.LOG_IN:
            return action.payload

        case TYPES.CLEAR_POST_LOG_IN_RESULT:
            return action.payload

        default:
            return state;
    }
};