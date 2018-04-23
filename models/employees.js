const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  expert: { type: String, required: true },
  department: { type: String, required: true },
  region: { type: String, required: true },
  bio: { type: String, required: true },
  employeeImage: { type: String, required: true }
});

module.exports = mongoose.model('Employees', employeeSchema);