'use strict';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as toastr } from 'react-redux-toastr';

//Custom defined reducers
import user from './user';
import product from './product';


export default combineReducers({
  routing,
  toastr,
  user,
  product
});
