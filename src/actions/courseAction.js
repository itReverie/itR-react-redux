//File to create actions
import * as types from './actionTypes';

export function createCourse(course)
{
  //Creating an action that has a type and an object
  // we can return as many properties as I want, in this case its just Course
  return {type : types.CREATE_COURSE, course};
}
