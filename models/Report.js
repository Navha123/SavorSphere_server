const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  type: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);