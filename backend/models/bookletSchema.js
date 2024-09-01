const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pricingSchema = new Schema({
  quantityRange: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const bookletSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  pricing: {
    type: [pricingSchema],
    required: true,
  },
  image: {
    type: String,
    required: false,
  }
});

const Booklet = mongoose.model('Booklets', bookletSchema, 'booklets');

module.exports = Booklet;