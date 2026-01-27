// models/productSchemas.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// Shared sub-schema for quantity/price
const orderSchema = new Schema({
  quantity: {
    type: Schema.Types.Mixed, // allows number or string
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  }
});


// Main product schema (for catalog items like business cards, flyers, booklets, etc.)
export const productSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true }, // for URLs
  code: { type: String, required: true },
  image: { type: [String], required: true },
  category: { type: String, required: true },
productGroup: { type: String, required: true },

  // Pricing model
  pricingType: {
    type: String,
    enum: ["fixed", "tiered", "hybrid", "perUnit"],
    required: true,
  },

  // Fixed pricing (e.g. 1000 / 5000)
  order: {
    type: [orderSchema],
    required: false,
  },

  pricingPerUnit: {
    type: [
      {
        print: { type: Number, required: true },
        label: { type: String, required: true },
        price: { type: Number, required: true }
      }
    ],
    required: false
  },

  // Tiered pricing (e.g. 25–49, 50–99, 100+)
  pricing: {
    type: [
      {
        quantityRange: { type: String },
        price: { type: Number },
      },
    ],
    required: false,
  },

  // Additional options/add-ons
  /*Components that use this attribute:
  Magnetic Signs
  */
 
  addOns: {
    type: [
      {
        name: { type: String },
        price: { type: Number },
        description: { type: String },
      },
    ],
    required: false,
  },

  // Detail page content
  shortDescription: { type: String },
  description: { type: String },
  features: { type: [String] },
  deliveryOptions: {
    type: [
      {
        type: { type: String },
        dateText: { type: String },
      },
    ],
  },

  searchResult: {
    type: {
      type: String,
      enum: ["product"],
      default: "product"
    },
    name: { type: String },
    url: { type: String }
  },

});