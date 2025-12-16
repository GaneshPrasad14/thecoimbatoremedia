const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true }, // path to image
  color: { type: String, default: '#FFD700' } // for hover effect
});

const aboutSchema = new mongoose.Schema({
  team: [teamMemberSchema]
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);