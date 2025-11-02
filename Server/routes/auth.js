// server/routes/auth.js
// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login, me } = require("../controllers/authController");
// const authMiddleware = require("../middleware/authMiddleware"); // if you have one

router.post("/register", register);  // ✅ should call register
router.post("/login", login);
// router.get("/me", authMiddleware, me);

// backend/routes/userRoutes.js


module.exports = router;

