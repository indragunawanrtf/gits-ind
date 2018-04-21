const mongoose = require('mongoose');

const portofolioSchema = mongoose.Schema({
  name_project: String,
  description: String
});

module.exports = mongoose.model('Portofolio', portofolioSchema);