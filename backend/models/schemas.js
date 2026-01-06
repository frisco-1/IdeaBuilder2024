// models/schemas.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// Shared sub-schema for quantity/price
const orderSchema = new Schema({
  quantity: {
    type: [Number, String],
    required: true,
  },
  price: {
    type: Number,
    default: null,
  },
});

// Main product schema (for catalog items like business cards, flyers, booklets, etc.)
export const productSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true }, // for URLs
  code: { type: String, required: true },
  image: { type: String, required: true },

  // Pricing model
  pricingType: {
    type: String,
    enum: ["fixed", "tiered"],
    required: true,
  },

  // Fixed pricing (e.g. 1000 / 5000)
  order: {
    type: [orderSchema],
    required: false,
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
});

// Lite product schema (simpler items like signs, tickets, etc.)
export const liteProductSchema = new Schema({
  code: { type: String, required: true },
  quantity: { type: Number, required: true },
  name: { type: String },
  price: { type: Number, default: null },
  image: { type: String },
  description: { type: String },
});

// Invitations schema
export const invitationSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  order: { type: [orderSchema], required: true },
  envelopeFee: { type: Number },
  extraQuantityFee: { type: Number },
  image: { type: String },
});

// Keywords schema (for search)
export const keywordsSchema = new Schema({
  keyword: { type: String, required: true },
  productLink: { type: String, required: true },
  productName: { type: String, required: true },
});