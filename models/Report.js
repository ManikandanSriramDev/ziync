const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true } // Made the employee reference required
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;