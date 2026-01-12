// models/categorySchema.js
import mongoose from "mongoose";

const CategoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  image: { type: String, default: "" }
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  header: { type: String, default: "" },
  description: { type: [String], default: [] },
  images: { type: [String], default: [] },
  items: { type: [CategoryItemSchema], default: [] }
});

export default CategorySchema;