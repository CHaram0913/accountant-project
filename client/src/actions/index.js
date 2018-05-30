import axios from 'axios';

import * as TYPES from './types';
import { intervalArray } from './../resources';

export function handleModal(modal_state) {
    return dispatch => {
        dispatch({
            type: TYPES.UPDATE_MODAL, 
            payload: modal_state
        });
    };
}

export function addTransactionRecord(form) {
    let formattedAmount = Number(form.amount);

    if (!form.notification) {
        form.notification = false;
    }

    if (!form.income) {
        form.income = false;
        formattedAmount = formattedAmount * -1;
    }

    let orderedForm = {
        recordTime: form.date,
        amount: formattedAmount,
        category: {
            category: intervalArray[form.category],
            notification: form.notification,
            subCategory: form.subCategory
        },
        detail: {
            payee: form.payee,
            memo: form.memo
        }
    }
    
    return async dispatch => {
        let response = await axios.post('/api/record/add', orderedForm);
        
        dispatch({
            type : TYPES.POST_TRANSACTION,
            payload : response.data
        });
    };
}

export function clearPostResult() {
    return dispatch => {
        dispatch({
            type: TYPES.CLEAR_POST_RESULT, 
            payload: {}
        });
    };
}