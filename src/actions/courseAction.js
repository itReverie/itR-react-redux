//File to create actions
import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function loadCoursesSuccess(course)
{
  //Creating an action that has a type and an object
  // we can return as many properties as I want, in this case its just Course
  return {type : types.LOAD_COURSES_SUCCESS, course};
}


export function loadCourses(){
  return function (dispatch){

    //Here I can call an ajax API at this moment i am calling a mock API
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).
      catch(error => {
        throw (error);
    });
  };
}
