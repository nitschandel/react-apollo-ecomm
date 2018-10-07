import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Card, CardHeader, CardBody,
        Row, Col, Button } from 'reactstrap';


class ProductListComponent extends Component {

  constructor(){
    super();
  }

  renderBody(productItem){
    return(
      <tr>
        <td>{productItem.name}</td>
        <td><img src={productItem.image} height="60" width="60" /></td>
        <td>Rs. {productItem.price}</td>
        <td>
        <Button type="submit"onClick={() => {
            this.props.history.push(`/admin/products/${productItem.id}`);
        }}>
          Edit
        </Button>
        </td>
      </tr>
    );
  }

  render() {
    let { headers, productList } = this.props;
    
    return (
      <div className="animated fadeIn">
        <Card>
        <CardHeader>
            <Row>
                <Col xs={6}>
                Products
                </Col>
                <Col xs={6}>
                    <Button color="primary" className="float-right" onClick={() => {
                        this.props.history.push('/admin/products/new');
                    }}>
                        Create Product
                    </Button>
                </Col>
            </Row>
        </CardHeader>
        <CardBody>
            <Table bordered>
              <thead>
                <tr>
                  {headers.map(header =>{
                    return (<th>{header}</th>);
                  })}
                </tr>
              </thead>
              <tbody>
                {productList.map(this.renderBody.bind(this))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  };


}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ProductListComponent);
