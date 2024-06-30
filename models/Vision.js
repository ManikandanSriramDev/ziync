const mongoose = require('mongoose');

const visionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }
});

const Vision = mongoose.model('Vision', visionSchema);

module.exports = Vision;