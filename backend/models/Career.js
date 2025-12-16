const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  role: { type: String, required: true },
  dept: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Career', careerSchema);