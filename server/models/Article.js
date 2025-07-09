const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  summary: { type: String, default: '' },
  content: { type: String, default: '' },
  jokes: { type: String, default: '' },
  quote: { type: String, default: '' },
  questions: { type: [String], default: [] },
  imageIdeas: { type: [String], default: [] },
  source: { type: String, default: '' },
  images: { type: [String], default: [] },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);