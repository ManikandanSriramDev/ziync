const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  token: { type: String, required: true },
  status: { type: String, required: true, default: 'pending' }, // pending, accepted, or declined
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;