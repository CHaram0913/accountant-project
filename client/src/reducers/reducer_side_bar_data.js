import * as TYPES from './../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case TYPES.GET_SIDE_BAR_DATA:
            return action.payload

        default:
            return state;
    }
};