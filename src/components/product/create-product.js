import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardBody, 
    FormGroup, Label, Input,
     Button} from 'reactstrap';

class ProductCreate extends Component {

  render() {
    return (
      <Card>
        <CardHeader>
          <strong>Enter Product Details</strong>
        </CardHeader>
        <CardBody>
          {/*Product Name*/}
          <FormGroup>
            <Label htmlFor="name">Product Name</Label>
            <Input type="text" id="name" placeholder="Dark Fantasy" value={this.props.productDetails.name}
                   onChange={(e) => {
                     this.props.onChange('name', e.target.value);
                   }}/>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="image">Image Url</Label>
            <Input type="text" id="image" placeholder="Dark Fantasy" value={this.props.productDetails.image}
                   onChange={(e) => {
                     this.props.onChange('image', e.target.value);
                   }}/>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="price">Price</Label>
            <Input type="text" id="price" placeholder="Dark Fantasy" value={this.props.productDetails.price}
                   onChange={(e) => {
                     this.props.onChange('price', e.target.value);
                   }}/>
          </FormGroup>


                <Button color="primary" block type="submit"
                 onClick={this.props.mutation}
                 >
                  {this.props.buttonText}
                </Button>
        </CardBody>
      </Card>
    );
  };
}


function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ProductCreate);
