const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const orderSchema = new Schema({
  orderdate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  productList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],

});

const Order = model('Order', orderSchema);

module.exports = Order;
