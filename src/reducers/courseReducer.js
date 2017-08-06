import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action)
{
  switch (action.type)
  {
    case types.LOAD_COURSES_SUCCESS:
     return  action.course;
    case types.CREATE_COURSE_SUCCESS:
      //We are adding a course to the current state.
      //The spread operator is very helpful as it just adds it to the array.
      return  [
              ...state,
              Object.assign({},action.course)
              ];
    case types.UPDATE_COURSE_SUCCESS:
       // Get all  the courses except the one we want to update as we will assign the new version of that course, hence we exclude it from the state
      return  [
              ...state.filter(course=>course.id !== action.course.id),
              Object.assign({},action.course)
              ];
    default:
       return state;

  }
}
