import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

//We are using ES6: the shorthand property name
const rootReducer = combineReducers({
  courses,
  authors
});


export default rootReducer;
