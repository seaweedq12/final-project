import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
  me {
    _id
    email
    name
    phoneNumber
    address
    cart {
      _id
      productName
      price
      imageUrl
    }
    previousOrder {
      _id
      orderdate
      productList{
        _id
        productName
        price
        imageUrl
      }
    }
  }
}  
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query products {
    products {
      _id
      productName
      price
      imageUrl
    }
  }  
`;



