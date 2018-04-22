const mongoose = require('mongoose');

const portofolioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name_project: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Portofolio', portofolioSchema);