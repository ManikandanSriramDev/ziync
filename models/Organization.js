const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['firm', 'NGO'] }, // Specify organization type
  createdAt: { type: Date, default: Date.now }
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;