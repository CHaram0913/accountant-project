import * as TYPES from './../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case TYPES.CREATE_ACCOUNT:
            return action.payload

        case TYPES.CLEAR_POST_ACCOUNT_RESULT:
            return action.payload

        default:
            return state;
    }
};