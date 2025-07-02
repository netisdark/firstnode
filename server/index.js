const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Article = require('./models/Article');
const app = express();

app.use(cors());
app.use(express.json());

const MongoDB_URL = process.env.MongoDB_URL || 'mongodb://localhost:27017/technews';

mongoose.connect(MongoDB_URL)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });


app.use(express.static(path.join(__dirname, '../client/dist')));
app.get(/^\/(?!api|server).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ timestamp: -1 }).limit(20);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

app.post('/api/articles', async (req, res) => {
  try {
    const article = new Article(req.body);
    const saved = await article.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Save failed:', err.message);
    res.status(400).json({ error: 'Invalid article data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
