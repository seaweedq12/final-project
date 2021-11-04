const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
    name: String
    phoneNumber: String  
    address: String
    cart: [Product]
    previousOrder:[Order]
  }

  type Order {
    _id: ID
    orderdate: String
    productList: [Product]
  }

  type Product {
    _id: ID
    productName: String
    price: Float
    imageUrl: String
  }

  input ProductInput {
    _id: ID
    productName: String
    price: Float
    imageUrl: String
  }
  
  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    products: [Product]
    me: User
    checkout(products: [ProductInput]!): Checkout
  }

  type Mutation {
    addUser(email: String!, password: String!, name: String!, phoneNumber: String!, address: String!): Auth
    login(email: String!, password: String!): Auth
    addCart(productId: ID!): User
    removeCart(productId: ID!): User
    addOrder(products: [ProductInput]!): User
  }
`;

module.exports = typeDefs;
