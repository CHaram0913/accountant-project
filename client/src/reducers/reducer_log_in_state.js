import * as TYPES from './../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case TYPES.CHECK_LOG_IN_STATE:
            return action.payload

        default:
            return state;
    }
};