import * as TYPES from './../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case TYPES.GET_RECORD_DATA:
            return action.payload

        default:
            return state;
    }
};