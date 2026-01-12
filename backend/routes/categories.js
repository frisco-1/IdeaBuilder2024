// backend/routes/categories.js
import express from "express";
import { Category } from "../models/index.js";

const router = express.Router();

/* ---------------------------------------------
   GET ALL CATEGORIES
   Returns the unified categoryMeta document
---------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findOne({});
    if (!categories) {
      return res.status(404).json({ error: "No categories found" });
    }
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;