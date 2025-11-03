const express = require("express");
const router = express.Router();
const pool = require("../db");

// ✅ Get all recipes
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM recipes");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ message: "Server error" });
  }
});




// ✅ Get single recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM recipes WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Recipe not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching recipe:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
