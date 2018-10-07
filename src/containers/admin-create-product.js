import React, { Component } from 'react';
import { connect } from 'react-redux';
import {toastr} from 'react-redux-toastr';
import { Mutation } from 'react-apollo';

//Component
import ProductCreate from '../components/product/create-product';

//Constant
import { CREATE_PRODUCT_MUTATION, PRODUCT_QUERY } from '../constants/queries';


class AdminCreateProductContainer extends Component {

    constructor(){
        super();
        this.state = {
          productDetails: {}
        };
    }

    createProductSuccess(){
        toastr.success('', 'Product created');
        this.props.history.push('/admin');
    }  

    onChange(key, value){

    let productDetails = this.state.productDetails;
    productDetails[key] = value;

    this.setState({productDetails});
    }

    updateProductCache(store, data){
        let storeData = store.readQuery({query: PRODUCT_QUERY});
        storeData.products.products.push(data.data.createProduct);
        
        store.writeQuery({query: PRODUCT_QUERY, data: storeData});
    }

    render() {
        let {name, image, price} =  this.state.productDetails;
        return (
        <div className="animated fadeIn">
            <Mutation
                          mutation={CREATE_PRODUCT_MUTATION}
                          variables={{ name, image, price }}
                          onCompleted={data => this.createProductSuccess(data)}
                          update={(store,data)=>
                            this.updateProductCache(store,data)
                          }
                        >
                        {(mutation) => (
                            <ProductCreate
                                {...this.state}
                                mutation={mutation}
                                onChange= {this.onChange.bind(this)}
                                buttonText = "Create Product"
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

export default connect(mapStateToProps)(AdminCreateProductContainer);
