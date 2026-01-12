import mongoose from "mongoose";
import { productSchema } from "./productSchemas.js"; // your unified schema

// Cache so Mongoose doesn't re-register models
const modelCache = {};

export function getCatalogModel(collectionName) {
  if (!collectionName) return null;

  // Convert "business_cards" → "BusinessCards"
  const modelName = collectionName.replace(/(^\w|_\w)/g, (m) =>
    m.replace("_", "").toUpperCase()
  );

  // Return cached model if already created
  if (modelCache[modelName]) {
    return modelCache[modelName];
  }

  // Create model dynamically using your unified productSchema
  const model = mongoose.model(modelName, productSchema, collectionName);

  modelCache[modelName] = model;
  return model;
}