import * as ActionTypes from '../constants/action-types';
import { client } from '../utils/apollo-client';

//Utils
import * as AuthUtils from '../utils/auth';
import * as UrlUtils from '../constants/url';

//Constants
import { GET_CURRENT_USER_QUERY } from '../constants/queries';

function toggleAuthInProgress() {
  return {
    type: ActionTypes.USER.TOGGLE_AUTH_IN_PROGRESS
  };
}

function setCurrentUser(user) {
  return {
    type: ActionTypes.USER.SET_CURRENT_USER,
    currentUser: user
  };
}

function unsetCurrentUser() {
  return {
    type: ActionTypes.USER.UNSET_CURRENT_USER
  };
}

export function authenticateUser(data) {
  return (dispatch) => {
    dispatch(toggleAuthInProgress());
    dispatch(setCurrentUser(data.login.user));
    dispatch(toggleAuthInProgress());
    AuthUtils.saveAuthCookie(data.login.token);
      
  };
}

export function initialiseUser() {
  return async (dispatch) => {
      const { data } = await client.query({
          query: GET_CURRENT_USER_QUERY
      });
      let user = {
        id: data.user.id,
        name: data.user.name
      }
      dispatch(setCurrentUser(user));
  };
};

export function logoutUser() {
  return (dispatch) => {
    dispatch(unsetCurrentUser());
    AuthUtils.removeAuthCookie();
    window.location.href = UrlUtils.LOGIN;
  };
}


