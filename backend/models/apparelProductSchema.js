import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true }
});

const PricingTierSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  perOneSide: Number,
  perTwoSides: Number,
  additionalSide: Number,
  perUnit: Number
});

const DecorationMethodSchema = new mongoose.Schema({
  method: { type: String, required: true },
  options: mongoose.Schema.Types.Mixed
});

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
    sizes: [String],
    colors: [ColorSchema],
    features: [String],
    decorationMethods: [DecorationMethodSchema]
  },
  { timestamps: true }
);

export const ApparelProduct = mongoose.model("ApparelProduct", ApparelProductSchema);
export { ApparelProductSchema };