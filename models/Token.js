const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '2h' }, // Token expires after 2 hours
  purpose: { type: String, required: true, enum: ['transaction', 'activity', 'invitation', 'resetPassword'] }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;