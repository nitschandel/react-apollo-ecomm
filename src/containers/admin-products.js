import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

//Constants
import * as Headers from '../constants/table-headers';
import { PRODUCT_QUERY } from '../constants/queries';

//Components
import ProductList from '../components/product/product-list'

class AdminProductsContainer extends Component {

  constructor(){
    super();
  }

  render() {
    let headers = Headers.productListHeaders;
    
    return (
      <Query query={PRODUCT_QUERY}>
          {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>
              const productList = data.products.products;

              return(
                <div className="animated fadeIn">
                <ProductList 
                  {...this.props}
                  headers= {headers}
                  productList= {productList}
                />
            </div>
              )
          }}
        </Query>
    );
  };


}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AdminProductsContainer);
