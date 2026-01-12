// backend/routes/router.js
import express from "express";
import {  Category } from "../models/index.js";  // ✅ FIXED
import { getCatalogModel } from "../models/catalogModels.js";



const router = express.Router();

// GET ALL CATEGORIES FOR THE NAVBAR
router.get("/api/category", async (req, res) => {
  try {
    const categories = await Category.find({}); // fetch ALL documents

    res.json(categories);
  } catch (err) {
    console.error("Category list fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------------------------------------------------------
   GET ALL PRODUCTS IN A PRODUCT GROUP
--------------------------------------------------------- */
router.get("/api/category/:categorySlug/:productGroupSlug", async (req, res) => {
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
   GET A SINGLE PRODUCT
--------------------------------------------------------- */
router.get("/api/category/:categorySlug/:productGroupSlug/:productSlug", async (req, res) => {
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



// 1. GET CATEGORY OVERVIEW
router.get("/api/category/:categorySlug", async (req, res) => {
  const { categorySlug } = req.params;

  try {
    const category = await Category.findOne({ slug: categorySlug });  // ✅ FIXED

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error("Category fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;