//File to create actions
import * as types from './actionTypes';
import AuthorsApi from '../api/mockAuthorApi';

export function loadAuthorsSuccess(authors)
{
  //Creating an action that has a type and an object
  // we can return as many properties as I want, in this case its just Course
  return {type : types.LOAD_AUTHORS_SUCCESS, authors};
}


export function loadAuthors(){
  return function (dispatch){

    //Here I can call an ajax API at this moment i am calling a mock API
    return AuthorsApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).
    catch(error => {
      throw (error);
    });
  };
}
