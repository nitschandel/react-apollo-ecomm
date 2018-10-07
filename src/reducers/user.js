import * as ActionTypes from '../constants/action-types.js';

const defaultState = {
  isAuthInProgress: false,
  currentUser: undefined
};


export default function user(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.USER.SET_CURRENT_USER:
    {
      return {
        ...state,
        currentUser: action.currentUser
      };
    }
    case ActionTypes.USER.UNSET_CURRENT_USER:
    {
      return {
        ...state,
        currentUser: undefined
      };
    }
    case ActionTypes.USER.TOGGLE_AUTH_IN_PROGRESS:
    {
      return {
        ...state,
        isAuthInProgress: !state.isAuthInProgress
      };
    }
    default:
    {
      return state;
    }
  }
}
