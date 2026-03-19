const mongoose = require('mongoose');
const s = new mongoose.Schema({
  emoji:       String,
  title:       { type: String, required: true },
  description: String,
  tags:        [String],
  liveUrl:     { type: String, default: '#' },
  githubUrl:   { type: String, default: '#' },
  btn1Label:   { type: String, default: 'Live Demo' },
  btn2Label:   { type: String, default: 'GitHub' },
  featured:    { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('Project', s);
