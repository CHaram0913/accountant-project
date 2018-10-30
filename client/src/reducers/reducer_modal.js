import * as TYPES from './../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case TYPES.UPDATE_MODAL:
            return action.payload

        default:
            return state;
    }
};