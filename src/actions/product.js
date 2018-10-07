import * as ActionTypes from '../constants/action-types';
import { client } from '../utils/apollo-client';
import { GET_SINGLE_PRODUCT_QUERY } from '../constants/queries';

function setCurrentProduct(product) {
  return {
    type: ActionTypes.PRODUCT.SET_CURRENT_PRODUCT_ITEM,
    data: product
  };
}

export function getSingleProduct(id, callback) {
  return async (dispatch) => {
    const { data } = await client.query({
        query: GET_SINGLE_PRODUCT_QUERY,
        variables: {id}
    });
    let product = {
      id: data.product.id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.image
    }
    dispatch(setCurrentProduct(product));
    if(callback){
        callback(product);
    }
  };
}
