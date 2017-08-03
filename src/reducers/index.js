import {combineReducers} from 'redux';
import courses from './courseReducer';

//We are using ES6: the short hand property name
const rootReducer = combineReducers({
  courses
});


export default rootReducer;
