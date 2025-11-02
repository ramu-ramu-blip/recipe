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

// ✅ Search recipes by name, cuisine, ingredient, or time
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q?.toLowerCase() || "";

    // If user enters a number, treat it as cook time
    const isTime = !isNaN(q) && q.trim() !== "";

    let sql = "SELECT * FROM recipes WHERE ";
    let params = [];

    if (isTime) {
      sql += "cook_time_min <= ?";
      params.push(Number(q));
    } else {
      sql += `
        LOWER(title) LIKE ? OR
        LOWER(cuisine) LIKE ? OR
        LOWER(ingredients) LIKE ?
      `;
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    const [rows] = await pool.query(sql, params);
    const formatted = rows.map((r) => ({
      ...r,
      steps: r.steps ? r.steps.split("||") : [],
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error searching recipes:", err);
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
