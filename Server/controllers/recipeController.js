// server/controllers/recipeController.js
const pool = require('../db');

/**
 * Utility: parse ingredients text -> lowercase trimmed array
 */
function parseIngredients(text) {
  if (!text) return [];
  return text.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
}

async function listRecipes(req, res) {
  try {
    const { q, ingredients, cuisine, maxTime, limit = 100 } = req.query;

    // If ingredients provided - we'll do two-step: fetch candidates then score
    if (ingredients) {
      const provided = ingredients.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      if (!provided.length) return res.json([]);

      // get candidates where any ingredient matches (OR) to limit result set
      const likeClauses = provided.map(() => 'ingredients LIKE ?').join(' OR ');
      const params = provided.map(i => `%${i}%`);
      let sql = `SELECT * FROM recipes WHERE (${likeClauses})`;
      if (cuisine) { sql += ' AND cuisine = ?'; params.push(cuisine); }
      if (maxTime) { sql += ' AND cook_time_min <= ?'; params.push(Number(maxTime)); }
      sql += ' ORDER BY created_at DESC LIMIT ?';
      params.push(Number(limit));

      const [rows] = await pool.query(sql, params);

      // compute match score
      const scored = rows.map(r => {
        const rIngs = parseIngredients(r.ingredients);
        const matchCount = provided.reduce((acc, p) => acc + (rIngs.includes(p) ? 1 : 0), 0);
        return { ...r, steps: r.steps ? r.steps.split('||') : [], matchCount };
      });
console.log(rows)
      scored.sort((a, b) => (b.matchCount - a.matchCount) || (a.cook_time_min - b.cook_time_min));
      return res.json(scored);
    }

    // Else basic search by title or ingredients
    let sql = 'SELECT * FROM recipes WHERE 1=1';
    const params = [];

    if (q) {
      sql += ' AND (title LIKE ? OR ingredients LIKE ?)';
      params.push(`%${q}%`, `%${q}%`);
    }
    if (cuisine) {
      sql += ' AND cuisine = ?';
      params.push(cuisine);
    }
    if (maxTime) {
      sql += ' AND cook_time_min <= ?';
      params.push(Number(maxTime));
    }
    sql += ' ORDER BY created_at DESC LIMIT ?';
    params.push(Number(limit));

    const [rows] = await pool.query(sql, params);
    const formatted = rows.map(r => ({ ...r, steps: r.steps ? r.steps.split('||') : [] }));
    return res.json(formatted);

  } catch (err) {
    console.error('listRecipes error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function getRecipeById(req, res) {
  try {
    const id = req.params.id;
    const [rows] = await pool.query('SELECT * FROM recipes WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Recipe not found' });
    const r = rows[0];
    r.steps = r.steps ? r.steps.split('||') : [];
    return res.json(r);
  } catch (err) {
    console.error('getRecipeById', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function createRecipe(req, res) {
  try {
    const { title, cuisine, ingredients, cook_time_min, steps, video_url, nutrition, image } = req.body;
    const created_by = req.userId || null;

    if (!title || !ingredients) return res.status(400).json({ message: 'Title and ingredients required' });

    const [result] = await pool.query(
      `INSERT INTO recipes (title, cuisine, ingredients, cook_time_min, steps, video_url, nutrition, image, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        cuisine || null,
        Array.isArray(ingredients) ? ingredients.join(', ') : ingredients,
        cook_time_min || null,
        Array.isArray(steps) ? steps.join('||') : steps || null,
        video_url || null,
        nutrition ? JSON.stringify(nutrition) : null,
        image || null,
        created_by
      ]
    );

    const insertId = result.insertId;
    const [rows] = await pool.query('SELECT * FROM recipes WHERE id = ?', [insertId]);
    const newRecipe = rows[0];
    newRecipe.steps = newRecipe.steps ? newRecipe.steps.split('||') : [];
    return res.status(201).json(newRecipe);
  } catch (err) {
    console.error('createRecipe', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

/**
 * Suggest endpoint: /api/recipes/suggest?ingredients=eggs,tomato&time=30
 * For convenience this delegates to listRecipes with ingredients param.
 */
async function suggest(req, res) {
  // reuse listRecipes logic by forwarding query params
  return listRecipes(req, res);
}

module.exports = { listRecipes, getRecipeById, createRecipe, suggest };
