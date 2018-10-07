import React, { Component } from 'react';
import { connect } from 'react-redux';
import {toastr} from 'react-redux-toastr';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

//Component
import ProductCreate from '../components/product/create-product';

//Action
import * as ProductActions from '../actions/product';

//Constant
import { EDIT_PRODUCT_MUTATION, PRODUCT_QUERY } from '../constants/queries';


class AdminEditProductContainer extends Component {

    constructor(){
        super();
        this.state = {
          productDetails: {}
        };
    }

    componentWillMount(){
        this.props.dispatch(ProductActions.getSingleProduct(this.props.match.params.productId,
                                                            this.getSingleProductCallback.bind(this)))
    }

    getSingleProductCallback(productDetails){
        this.setState({
          productDetails: productDetails
        });
      }

    createProductSuccess(){
        toastr.success('', 'Product updated');
        this.props.history.push('/admin');
    }  

    onChange(key, value){

        let productDetails = this.state.productDetails;
        productDetails[key] = value;

        this.setState({productDetails});
    }

    updateProductCache(store, data, productId){
        let storeData = store.readQuery({query: PRODUCT_QUERY});
        let product = storeData.products.products.find(product => product.id === productId);
        product = data.data.editProducts;
        
        store.writeQuery({query: PRODUCT_QUERY, data: storeData});
    }

    render() {
        let {id, name, image, price} =  this.state.productDetails;
        return (
        <div className="animated fadeIn">
            <Mutation
                          mutation={EDIT_PRODUCT_MUTATION}
                          variables={{ id, name, image, price }}
                          onCompleted={data => this.createProductSuccess(data)}
                          update={(store,data,id)=>
                            this.updateProductCache(store,data)
                          }
                        >
                        {(mutation) => (
                            <ProductCreate
                                {...this.state}
                                mutation={mutation}
                                onChange= {this.onChange.bind(this)}
                                buttonText = "Save Changes"
                            />
                        )}
            </Mutation>
        </div>
        );
    };


}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AdminEditProductContainer);
