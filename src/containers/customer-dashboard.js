import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { Query } from 'react-apollo';
import { PRODUCT_QUERY } from '../constants/queries';  

class CustomerDashboardContainer extends Component {

    renderBody(productItem){
        return (
                <Col xs={3}>
                    <div>
                    <img src={productItem.image} height="232" width="287" />
                    </div>
                    <div align="center">
                    {productItem.name}
                    </div>
                    <div align="center">
                    Rs. {productItem.price}
                    </div>
                </Col>
        )
    }


  render() {
    return (
        <Query query={PRODUCT_QUERY}>
          {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>
              const productList = data.products.products;

              return(
                <div className="animated fadeIn">
                <Row>
                {productList.map(this.renderBody.bind(this))}
                </Row>
            </div>
              )
          }}
        </Query>
    );
  }
}

export default CustomerDashboardContainer;
