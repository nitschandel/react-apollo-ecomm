import gql from 'graphql-tag';

export const PRODUCT_QUERY = gql`
query {
  products {
    count
    products{
      id
      name
      price
      image
    }
  }
}
`

export const GET_SINGLE_PRODUCT_QUERY = gql`
query getProduct($id: String!) {
  product(id: $id) {
    id
    name
    image
    price
  }
}
`

export const GET_CURRENT_USER_QUERY = gql`
query {
  user {
    id
    name
  }
}
`

export const CREATE_PRODUCT_MUTATION = gql`
mutation createProductMutation($name: String!, $image: String!, $price: String!) {
  createProduct(name: $name, image: $image, price: $price) {
    id
    name
    image
    price
  }
}
`

export const EDIT_PRODUCT_MUTATION = gql`
  mutation editProductMutation($id: String!, $name: String!, $image: String!, $price: String!) {
    editProduct(id: $id, name: $name, image: $image, price: $price) {
      id
      name
      image
      price
    }
  }
`

export const LOGIN_MUTATION = gql`
mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user{
      id
      name
      email
    }
  }
}
`
