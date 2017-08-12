//File to create actions
import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall,ajaxCallError} from "./ajaxStatusActions";


export function loadCoursesSuccess(course)
{
  // we can return as many properties as I want, in this case its just Course
  return {type : types.LOAD_COURSES_SUCCESS, course};
}
export function createCourseSuccess(course)
{
  return {type : types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course)
{
  return {type : types.UPDATE_COURSE_SUCCESS, course};
}








export function loadCourses(){
  return function (dispatch){

    //Loading dots (Async state to create a user experience)
    dispatch(beginAjaxCall());

    //Here I can call an ajax API at this moment i am calling a mock API
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).
      catch(error => {
        throw (error);
    });
  };
}




export function saveCourse(course){
  //NOTE!!! In a bigger application it might be worth it to pass another parameter , getState
  //The purpose is to just access the piece of the state we need from the store
  return function (dispatch){

    //Loading dots (Async state to create a user experience)
    dispatch(beginAjaxCall());

    //Here I can call an ajax API at this moment i am calling a mock API
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch (updateCourseSuccess(savedCourse)):
      dispatch(createCourseSuccess(savedCourse));
    }).
    catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  };
}
