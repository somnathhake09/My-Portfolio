const mongoose = require('mongoose');
const s = new mongoose.Schema({
  name:        { type: String, required: true },
  role:        String,
  bio1:        String,
  bio2:        String,
  email:       String,
  phone:       String,
  location:    String,
  education:   String,
  resumeUrl:   { type: String, default: '/assets/resume.pdf' },
  stats:       [{ num: String, label: String }],
  typingTexts: [String],
}, { timestamps: true });
module.exports = mongoose.model('About', s);
