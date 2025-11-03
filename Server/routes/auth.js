
const express = require("express");
const router = express.Router();
const { register, login, me } = require("../controllers/authController");
// const authMiddleware = require("../middleware/authMiddleware"); // if you have one

router.post("/register", register);  // ✅ should call register
router.post("/login", login);


// backend/routes/userRoutes.js


module.exports = router;

