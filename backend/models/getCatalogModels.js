import mongoose from "mongoose";
import { productSchema } from "./productSchemas.js";
import {ApparelProductSchema} from "./apparelProductSchema.js";

const modelCache = {};

export function getCatalogModel(collectionName) {
  if (!collectionName) return null;

  const modelName = collectionName
    .replace(/(^\w|_\w)/g, (m) => m.replace("_", "").toUpperCase());

  if (modelCache[modelName]) {
    return modelCache[modelName];
  }

  let schemaToUse = productSchema;

  // Apparel collections
  const apparelCollections = [
    "t_shirts",
    "hoodies",
    "custom_apparel",
    "embroidery",
    "dtf",
    "screen_printing"
  ];

  if (apparelCollections.includes(collectionName)) {
    schemaToUse = ApparelProductSchema;
  }

  const model = mongoose.model(modelName, schemaToUse, collectionName);
  modelCache[modelName] = model;

  return model;
}