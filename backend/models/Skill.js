const mongoose = require('mongoose');
const s = new mongoose.Schema({
  icon:       String,
  title:      { type: String, required: true },
  subtitle:   String,
  tags:       [String],
  percentage: { type: Number, min: 0, max: 100, default: 0 },
  order:      { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('Skill', s);
