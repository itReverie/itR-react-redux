import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallInProgress from './ajaxStatusReducer';

//We are using ES6: the shorthand property name
const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallInProgress
});


export default rootReducer;
