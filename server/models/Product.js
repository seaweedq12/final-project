const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  imageUrl:{
    type: String
  }
});

const Product = model('Product', productSchema);

module.exports = Product;