// router.js
import express from "express";
import models from "../models/index.js";

const router = express.Router();

// Convert "business_cards" → "BusinessCards"
const toModelName = (collectionName) =>
  collectionName.replace(/(^\w|_\w)/g, (m) => m.replace("_", "").toUpperCase());

/* ---------------------------------------------
   1. GET ALL PRODUCTS IN A CATEGORY
   Example: GET /api/products/business_cards
---------------------------------------------- */
router.get("/api/products/:category", async (req, res) => {
  const { category } = req.params;

  const modelName = toModelName(category);
  const Model = models[modelName];

  if (!Model) {
    return res.status(404).json({ error: "Category not found" });
  }

  try {
    const products = await Model.find({});
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------------------------------------------
   2. GET A SINGLE PRODUCT BY SLUG
   Example: GET /api/products/business_cards/full-color-4-4-16pt
---------------------------------------------- */
router.get("/api/products/:category/:slug", async (req, res) => {
  const { category, slug } = req.params;

  const modelName = toModelName(category);
  const Model = models[modelName];

  if (!Model) {
    return res.status(404).json({ error: "Category not found" });
  }

  try {
    const product = await Model.findOne({ slug });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------------------------------------------
   3. SEARCH API (unchanged)
---------------------------------------------- */
router.get("/api/search", async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const results = await models.Keywords.find({
      keyword: { $regex: query, $options: "i" },
    }).select("productName productLink");

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;