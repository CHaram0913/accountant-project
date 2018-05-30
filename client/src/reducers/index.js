import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import modalReducer from './reducer_modal';
import postResultReducer from './reducer_post_record';

export default combineReducers ({ 
    modalOpen: modalReducer,
    postResult: postResultReducer,
    form: formReducer
});