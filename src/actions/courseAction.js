//File to create actions
export function createCourse(course)
{
  //Creating an action that has a type and an object
  // we can return as many properties as I want, in this case its just Course
  return {type : 'CREATE_COURSE', course}
}
