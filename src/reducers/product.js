import * as ActionTypes from '../constants/action-types.js';

const defaultState = {
    isRequestInProgress: false,
    currentProduct: undefined,
    productList: []
};


export default function product(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.PRODUCT.SET_CURRENT_PRODUCT_ITEM:
    {
      return {
        ...state,
        currentProduct: action.data
      };
    }
    case ActionTypes.PRODUCT.SET_PRODUCT_LIST:
    {
      return {
        ...state,
        productList: acton.products
      };
    }
    case ActionTypes.PRODUCT.TOGGLE_REQUEST_IN_PROGRESS:
    {
      return {
        ...state,
        isRequestInProgress: !state.isRequestInProgress
      };
    }
    default:
    {
      return state;
    }
  }
}
