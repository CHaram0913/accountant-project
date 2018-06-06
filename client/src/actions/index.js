import axios from 'axios';
import moment from 'moment-timezone';
import path from 'path';

import * as TYPES from './types';
import { intervalArray } from './../resources';

export function createAccount(form) {
    let accountDetail = {
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName
    }

    return async dispatch => {
        let response = await axios.post('/api/user/create_account', accountDetail);

        dispatch({
            type : TYPES.CREATE_ACCOUNT,
            payload : response.data
        });
    };
}

export function clearPostAccountResult() {
    return dispatch => {

        dispatch({
            type: TYPES.CLEAR_POST_ACCOUNT_RESULT, 
            payload: {}
        });
    };
}

export function logInToAccount(form) {
    let accountDetail = {
        email: form.email,
        password: form.password
    }

    return async dispatch => {
        let response = await axios.post('/api/user/login', accountDetail);

        dispatch({
            type : TYPES.LOG_IN,
            payload : response.data
        });
    };
}

export function clearPostLogInResult() {
    return dispatch => {

        dispatch({
            type: TYPES.CLEAR_POST_LOG_IN_RESULT, 
            payload: {}
        });
    };
}

export function checkLogInState() {
    return async dispatch => {
        let response = await axios.get('/api/user');
        
        dispatch({
            type : TYPES.CHECK_LOG_IN_STATE,
            payload : response.data
        });
    };
}

export function handleModal(modal_state) {
    return dispatch => {
        
        dispatch({
            type: TYPES.UPDATE_MODAL, 
            payload: modal_state
        });
    };
}

export function getSuggestions() {
    return async dispatch => {
        let response = await axios.get('/api/record/suggestions');
        
        dispatch({
            type : TYPES.GET_SUGGESTIONS,
            payload : response.data
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

export function clearPostRecordResult() {
    return dispatch => {
        
        dispatch({
            type: TYPES.CLEAR_POST_RECORD_RESULT, 
            payload: {}
        });
    };
}

export function receiveRecordData(term) {
    let searchTerm = { term };

    return async dispatch => {
        let response = await axios.post('/api/record', searchTerm);
        
        dispatch({
            type : TYPES.GET_RECORD_DATA,
            payload : response.data
        });
    };
}

export function receiveSideBarData(term) {
    let searchTerm = { term };

    return async dispatch => {
        let response = await axios.post('/api/record/categories', searchTerm);
        
        dispatch({
            type : TYPES.GET_SIDE_BAR_DATA,
            payload : response.data
        });
    };
}

export function initializeRecordForm(dropResult) {
    let record_template = {
        date: moment().tz('Asia/Seoul').format('YYYY-MM-DD'),
        category: intervalArray.findIndex(i => i === dropResult.interval),
        subCategory: dropResult.category,
        income: false,
        amount: dropResult.average
    }

    return dispatch => {
        dispatch({
            type: TYPES.INITIALIZE_RECORD_FORM, 
            payload: record_template
        });
    };
}

export function createCsv(record_data) {
    return async dispatch => {
        let response = await axios.post('/api/record/csv', record_data);
        
        dispatch({
            type : TYPES.CREATE_CSV,
            payload : response.data
        });
    };
}

export function createExcel(record_data) {
    return async dispatch => {
        let response = await axios.post('/api/record/excel', record_data);
        
        dispatch({
            type : TYPES.CREATE_EXCEL,
            payload : response.data
        });
    };
}

export function uploadFile(file) {
    let fileType = path.extname(file.files[0].name);

    if (fileType === '.csv' || fileType === '.xlsx') {
        let data = new FormData();
        data.append('file', file.files[0]);

        return async dispatch => {
            let response = await axios.post('/api/record/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            dispatch({
                type : TYPES.UPLOAD_FILE,
                payload : response.data
            });
        };

    } else {
        return dispatch => {
            dispatch({
                type: TYPES.UPLOAD_FILE, 
                payload: {
                    success: false,
                    data: 'Only .csv and .xlsx file can be uploaded.'
                }
            });
        };
    }
}

export function readUploadedFile(file_data) {
    return async dispatch => {
        let response = await axios.post('/api/record/read_file', file_data);
        
        dispatch({
            type : TYPES.READ_UPLOADED_FILE,
            payload : response.data
        });
    };
}

export function deleteSelectedRecords(selected_records_ids) {
    return async dispatch => {
        let response = await axios.post('/api/record/delete_selected', selected_records_ids);
        
        dispatch({
            type : TYPES.DELETE_SELECTED_RECORDS,
            payload : response.data
        });
    };
}

export function updateCategorySearchTerm(category_text) {
    return dispatch => {
        dispatch({
            type : TYPES.SEARCH_CATEGORY,
            payload : { term: category_text }
        });
    };
}

export function updateRecordSearchTerm(record_text) {
    return dispatch => {
        dispatch({
            type : TYPES.SEARCH_RECORD,
            payload : { term: record_text }
        });
    };
}
