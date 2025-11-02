// server/controllers/favController.js
const pool = require('../db');

async function addFavorite(req, res) {
  try {
    const userId = req.userId;
    const recipeId = Number(req.params.recipeId);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    await pool.query('INSERT IGNORE INTO favorites (user_id, recipe_id) VALUES (?, ?)', [userId, recipeId]);

    return res.json({ message: 'Added to favorites' });
  } catch (err) {
    console.error('addFavorite', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function removeFavorite(req, res) {
  try {
    const userId = req.userId;
    const recipeId = Number(req.params.recipeId);
    await pool.query('DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?', [userId, recipeId]);
    return res.json({ message: 'Removed from favorites' });
  } catch (err) {
    console.error('removeFavorite', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function listFavorites(req, res) {
  try {
    const userId = req.userId;
    const [rows] = await pool.query(
      `SELECT r.* FROM recipes r
       JOIN favorites f ON f.recipe_id = r.id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`, [userId]);

    const formatted = rows.map(r => ({ ...r, steps: r.steps ? r.steps.split('||') : [] }));
    return res.json(formatted);
  } catch (err) {
    console.error('listFavorites', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { addFavorite, removeFavorite, listFavorites };
