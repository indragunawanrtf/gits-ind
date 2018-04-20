const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  name: String,
  address: String,
  gender: String,
  expert: String,
  department: String,
  region: String,
  bio: String,
  employeeImage: String

});

module.exports = mongoose.model('Employees', employeeSchema);