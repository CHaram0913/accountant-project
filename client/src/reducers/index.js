import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import modalReducer from './reducer_modal';
import postAccountResultReducer from './reducer_create_account';
import postLogInResultReducer from './reducer_log_in';
import checkLogInState from './reducer_log_in_state';
import postRecordResultReducer from './reducer_post_record';
import tableDataReducer from './reducer_table_data';
import sideBarDataReducer from './reducer_side_bar_data';
import suggestionsReducer from './reducer_suggestions';
import initialFormReducer from './reducer_record_form_initial';
import recordCSVReducer from './reducer_create_record_csv';
import recordExcelReducer from './reducer_create_record_excel';
import uploadFileReducer from './reducer_upload_file';
import readUploadedFileReducer from './reducer_read_uploaded_file';
import deleteRecordsReducer from './reducer_delete_selected_records';
import categorySearchTermReducer from './reducer_search_category';
import recordSearchTermReducer from './reducer_search_record';

export default combineReducers ({ 
    modalOpen: modalReducer,
    postAccountResult: postAccountResultReducer,
    postLogInResult: postLogInResultReducer,
    logInState: checkLogInState,
    postRecordResult: postRecordResultReducer,
    form: formReducer,
    tableData: tableDataReducer,
    sideBarData: sideBarDataReducer,
    suggestions: suggestionsReducer,
    initialForm: initialFormReducer,
    csvFile: recordCSVReducer,
    excelFile: recordExcelReducer,
    uploadFile: uploadFileReducer,
    readUploadedFile: readUploadedFileReducer,
    deleteRecords: deleteRecordsReducer,
    categorySearchTerm: categorySearchTermReducer,
    recordSearchTerm: recordSearchTermReducer
});