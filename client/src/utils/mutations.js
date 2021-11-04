import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $name: String!, $phoneNumber: String!, $address: String!) {
    addUser(email: $email, password: $password, name: $name, phoneNumber: $phoneNumber, address: $address ) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
mutation addCart($productId: ID!) {
  addCart(productId: $productId ) {
    cart {
      _id
      productName
      price
      imageUrl
    }
  }
}
  
`;

export const REMOVE_PRODUCT = gql`
mutation removeCart($productId: ID!) {
  removeCart(productId: $productId ) {
    cart {
      _id
      productName
      price
      imageUrl
    }
  }
}
  
`;

export const ADD_ORDER = gql`
mutation addOrder($products: [ProductInput]!) {
  addOrder(products: $products) {
    previousOrder {
      _id
      orderdate 
      productList {
        _id
        productName
        price
        imageUrl
      }  
    }
  }
}
`;
