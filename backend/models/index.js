// models/index.js
import mongoose from "mongoose";
import {
  productSchema,
  liteProductSchema,
  invitationSchema,
  keywordsSchema,
} from "./schemas.js";
import "dotenv/config";

// Connect to MongoDB once
if (!process.env.DB_URI) {
  throw new Error("DB_URI environment variable is required");
}

mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("✅ Mongoose connected (models/index.js)");
});

db.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

// Helper to convert collection name to ModelName (e.g. "business_cards" → "BusinessCards")
const toModelName = (collectionName) =>
  collectionName.replace(/(^\w|_\w)/g, (m) => m.replace("_", "").toUpperCase());

// Collections that use the main product schema
const productCollections = [
  "business_cards",
  "flyers",
  "door_hangers",
  "envelopes",
  "letterheads",
  "invoices",
  "pocket_folders",
  "recordatorios",
  "vinyl_stickers",
  "booklets",
];

// Collections that use the lite product schema
const liteCollections = [
  "tickets",
  "printed_vinyl_laminated",
  "realtor_signs",
  "coroplast_signs",
  "a_frame",
  "arrow_signs",
  "single_arm_sign_post",
  "roll_up_banners",
  "custom_flags",
  "table_covers",
  "magnetic_signs",
  "max_metal_laminated",
  "foam_signs_laminated",
  "coroplast_signs_laminated",
];

// Register models dynamically
const models = {};

productCollections.forEach((collectionName) => {
  const modelName = toModelName(collectionName); // e.g. "business_cards" → "BusinessCards"
  models[modelName] = mongoose.model(modelName, productSchema, collectionName);
});

liteCollections.forEach((collectionName) => {
  const modelName = toModelName(collectionName);
  models[modelName] = mongoose.model(modelName, liteProductSchema, collectionName);
});

// Static models
models.Invitations = mongoose.model("Invitations", invitationSchema, "invitations");
models.Keywords = mongoose.model("Keywords", keywordsSchema, "keywords");

// Export all models
export default models;