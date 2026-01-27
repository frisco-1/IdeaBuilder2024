// backend/routes/router.js
import express from "express";
import mongoose from "mongoose";
import {  Category } from "../models/index.js";  // ✅ FIXED
import { getCatalogModel } from "../models/getCatalogModels.js";



const router = express.Router();



router.get("/search", async (req, res) => {
  const { query } = req.query;
  console.log("🔥 /api/search route HIT");

  if (!query || !query.trim()) {
    return res.json([]);
  }

  try {
    const collections = await mongoose.connection.db.listCollections().toArray();

    const productCollections = collections
      .map(c => c.name)
      .filter(name =>
        !name.startsWith("system.") &&
        name !== "categories" &&
        name !== "users"
      );

    let allResults = [];

    for (const collectionName of productCollections) {
      const indexName = `${collectionName}_search`; // assumes index is named after collection

      const docs = await mongoose.connection.db
        .collection(collectionName)
        .aggregate([
          {
            $search: {
              index: indexName,
              compound: {
                should: [
                  {
                    autocomplete: {
                      query,
                      path: "searchResult.name",
                      fuzzy: { maxEdits: 1 }
                    }
                  },
                  {
                    text: {
                      query,
                      path: "searchResult.name",
                      fuzzy: { maxEdits: 2 }
                    }
                  }
                ]
              }
            }
          },
          {
            $addFields: {
              relevance: {
                $switch: {
                  branches: [
                    { case: { $eq: ["$searchResult.type", "category"] }, then: 5 },
                    { case: { $eq: ["$searchResult.type", "productGroup"] }, then: 3 },
                    { case: { $eq: ["$searchResult.type", "product"] }, then: 1 }
                  ],
                  default: 1
                }
              }
            }
          },
          { $sort: { relevance: -1 } },
          { $limit: 5 },
          { $project: { searchResult: 1 } }
        ])
        .toArray();

      const results = docs
        .map(d => d.searchResult)
        .filter(Boolean); // remove undefined/null

      allResults.push(...results);
    }

    res.json(allResults);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// GET ALL CATEGORIES FOR THE NAVBAR
router.get("/category", async (req, res) => {
  try {
    const categories = await Category.find({}); // fetch ALL documents

    res.json(categories);
  } catch (err) {
    console.error("Category list fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------------------------------------------------------
   2. GET CATEGORY OVERVIEW PAGE
   /api/:categorySlug
--------------------------------------------------------- */
router.get("/:categorySlug", async (req, res) => {
  const { categorySlug } = req.params;

  try {
    const category = await Category.findOne({ slug: categorySlug });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error("Category fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------------------------------------------------------
   3. GET ALL PRODUCTS IN A PRODUCT GROUP
   /api/:categorySlug/:productGroupSlug
--------------------------------------------------------- */
router.get("/:categorySlug/:productGroupSlug", async (req, res) => {
  const { productGroupSlug } = req.params;

  const Model = getCatalogModel(productGroupSlug);
  if (!Model) {
    return res.status(404).json({ error: "Invalid product group" });
  }

  try {
    const products = await Model.find({});
    if (!products.length) {
      return res.status(404).json({ error: "No products found" });
    }

    res.json(products);
  } catch (err) {
    console.error("Product group fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------------------------------------------------------
   4. GET A SINGLE PRODUCT
   /api/:categorySlug/:productGroupSlug/:productSlug
--------------------------------------------------------- */
router.get("/:categorySlug/:productGroupSlug/:productSlug", async (req, res) => {
  const { productGroupSlug, productSlug } = req.params;

  const Model = getCatalogModel(productGroupSlug);
  if (!Model) {
    return res.status(404).json({ error: "Invalid product group" });
  }

  try {
    const product = await Model.findOne({ slug: productSlug });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Product fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});




export default router;
