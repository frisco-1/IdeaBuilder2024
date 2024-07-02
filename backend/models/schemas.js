const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
  quantity: {
    type: Number, 
    required: true,
  },
  price: {
    type: Number, 
    default: null
  }
});

const productSchema = new Schema({
  name: {
    type: String, 
    required: true,
  },
  order: {
    type: [orderSchema],
    required: true,
  },
  code: {
    type: String, 
    required: true,
  }
});

const BusinessCard = mongoose.model('BusinessCard', productSchema, 'business_cards');
const Flyer = mongoose.model('Flyer', productSchema, 'flyers');

const mySchemas = {'BusinessCards': BusinessCard, 'Flyer': Flyer}
module.exports = mySchemas;