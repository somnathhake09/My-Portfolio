const mongoose = require('mongoose');
const s = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  subject: String,
  message: { type: String, required: true },
  isRead:  { type: Boolean, default: false },
  ip:      String,
}, { timestamps: true });
module.exports = mongoose.model('Contact', s);
