
import CategorySchema from "./categorySchema.js";

import {
  connectCatalogDatabase,
  connectCategoryMetaDatabase
} from "../config/connection.js";




// Connect to catalog DB
await connectCatalogDatabase();

// Connect to categoryMeta DB

const categoryMetaDB = await connectCategoryMetaDatabase();
const Category = categoryMetaDB.model("Category", CategorySchema);

export { Category };