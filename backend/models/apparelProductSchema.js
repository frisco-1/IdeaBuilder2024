import mongoose from "mongoose";

//
// COLOR SCHEMA (for shirt colors)
//
const ColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true }
});

//
// INK COLOR SCHEMA (for screen printing)
//
const InkColorSchema = new mongoose.Schema({
  key: { type: String, required: true },
  name: { type: String, required: true },
  hex: { type: String, required: true }
});

//
// PRICING TIER SCHEMA
//
const PricingTierSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  perOneSide: Number,
  perTwoSides: Number,
  additionalSide: Number,
  perUnit: Number
});

//
// SIZE SCHEMA (new)
//
const SizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  additionalFee: { type: Number, default: 0 }
});

//
// DECORATION METHOD SCHEMA
//
const DecorationMethodSchema = new mongoose.Schema({
  method: { type: String, required: true },
  options: mongoose.Schema.Types.Mixed,
  inkColors: [InkColorSchema] // NEW
});

//
// MAIN PRODUCT SCHEMA
//
const ApparelProductSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    brand_logo: String,
    images: [String],
    category: { type: String, required: true },
    productGroup: { type: String, required: true, index: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },

    // UPDATED
    sizes: [SizeSchema],

    colors: [ColorSchema],
    features: [String],

    // UPDATED
    decorationMethods: [DecorationMethodSchema]
  },
  { timestamps: true }
);

export const ApparelProduct = mongoose.model(
  "ApparelProduct",
  ApparelProductSchema
);

export { ApparelProductSchema };