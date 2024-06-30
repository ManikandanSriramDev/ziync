const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }]
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;