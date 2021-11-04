const { AuthenticationError } = require('apollo-server-express');
const { User, Order, Product } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51JolECLX6WERfsl8hWbRqxn8PYARdZEr8nuMXnL5XOKxU5W5R3zc3V522uh16IAgZjLCZSfuAC1C4dCoKlZAvGWH00neqcLuZ9');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('cart').populate({path: 'previousOrder', populate: { path: 'productList'}});
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    products: async () => {
      return Product.find();
    },
    checkout: async (parent, { products }, context) => {
      const url = new URL(context.headers.referer).origin;
      const line_items = [];

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].productName,
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'aud',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }
     
      const session = await stripe.checkout.sessions.create({
        line_items,
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${url}/success`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
   
  },
  Mutation: {
    addUser: async (parent, { email, password, name, phoneNumber, address }) => {

      const user = await User.create({ email, password, name, phoneNumber, address });

      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {

      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addCart: async (parent, { productId }, context) => {
    
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { cart: productId } }
      ).populate('cart');
      
      return user;
    },
    removeCart: async (parent, { productId }, context) => {

      const user = await User.findOneAndUpdate(
        { _id: context.user._id},
        { $pull: { cart: productId } }
      ).populate('cart');

      return user;
      
    },
    addOrder: async (parent, { products }, context) => {
        const newOrder = await Order.create({});

        for (let i = 0; i < products.length; i++) {
          const updateOrder = await Order.findOneAndUpdate(
            { _id: newOrder._id },
            {
              $addToSet: {
                productList: products[i]._id,
              },
            }
          );
        }

        for (let j = 0; j < products.length; j++) {
          const updateUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $pull: {
                cart: products[j]._id,
              },
            }
          );
        }

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { previousOrder: newOrder._id } }
        ).populate('previousOrder');

        return user;
    },
    
  },
};

module.exports = resolvers;
