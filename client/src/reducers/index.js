import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import modalReducer from './reducer_modal';
import postAccountResultReducer from './reducer_create_account';
import postLogInResultReducer from './reducer_log_in';
import checkLogInState from './reducer_log_in_state';
import postRecordResultReducer from './reducer_post_record';

export default combineReducers ({ 
    modalOpen: modalReducer,
    postAccountResult: postAccountResultReducer,
    postLogInResult: postLogInResultReducer,
    logInState: checkLogInState,
    postRecordResult: postRecordResultReducer,
    form: formReducer
});