// server/controllers/authController.js
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateRegister, validateLogin } = require('../utils/validators');
require('dotenv').config();

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    console.log("Incoming data:", { name, email });

    const errors = validateRegister({ name, email, password });
    if (Object.keys(errors).length)
      return res.status(400).json({ errors });

    // ✅ Check if email already exists
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length)
      return res.status(400).json({ message: 'Email already registered' });

    // ✅ Hash password and insert new user
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashed]
    );

    const userId = result.insertId;

    // ✅ Generate token
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      token,
      user: { id: userId, name, email }
    });

  } catch (err) {
    console.error("Register error details:", err);
    return res.status(500).json({ message: 'Server error' });
  }
}



async function login(req, res) {
  try {
    const { email, password } = req.body;
    const errors = validateLogin({ email, password });
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    const [rows] = await pool.query('SELECT id, name, email, password FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(400).json({ message: 'Invalid credentials' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function me(req, res) {
  try {
    const userId = req.userId;
    const [rows] = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [userId]);
    if (!rows.length) return res.status(404).json({ message: 'User not found' });

    const user = rows[0];
    // fetch favorites ids (optional)
    const [favRows] = await pool.query('SELECT recipe_id FROM favorites WHERE user_id = ?', [userId]);
    const favorites = favRows.map(r => r.recipe_id);

    return res.json({ ...user, favorites });
  } catch (err) {
    console.error('Me error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { register, login, me };
