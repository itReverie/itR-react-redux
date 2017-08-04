import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action)
{
  switch (action.type)
  {
    case types.LOAD_COURSES_SUCCESS:
     return  action.course;
    case types.TEXT_SAVED:
      return  action.course;
    case types.TEXT_ONCHANGED:
      return  action.course;
    default:
       return state;

  }
}
