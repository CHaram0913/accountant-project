import * as TYPES from './../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case TYPES.UPLOAD_FILE:
            return action.payload

        default:
            return state;
    }
};