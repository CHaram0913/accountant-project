import * as TYPES from './../actions/types';

export default function (state = { term: '' }, action) {
    switch (action.type) {
        case TYPES.SEARCH_CATEGORY:
            return action.payload

        default:
            return state;
    }
};