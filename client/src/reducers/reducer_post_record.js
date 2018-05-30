import * as TYPES from './../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case TYPES.POST_TRANSACTION:
            return action.payload

        case TYPES.CLEAR_POST_RESULT:
            return action.payload

        default:
            return state;
    }
};