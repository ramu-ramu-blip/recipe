// server/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const favRoutes = require('./routes/favs');


const app = express();

app.use(cors());
app.use(express.json());

// health
app.get('/', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use("/api/favorites", favRoutes);


// simple error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
