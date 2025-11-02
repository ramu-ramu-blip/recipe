// server/routes/favs.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { addFavorite, removeFavorite, listFavorites } = require('../controllers/favController');

router.use(auth);
router.post('/:recipeId', addFavorite);
router.delete('/:recipeId', removeFavorite);
router.get('/', listFavorites);

module.exports = router;
