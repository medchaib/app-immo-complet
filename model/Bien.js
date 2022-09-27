const number = require('@hapi/joi/lib/types/number');
const string = require('@hapi/joi/lib/types/string');
const mongoose = require('mongoose');
const bienSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  localisation: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  confirm: {
    type: Boolean,
    required: true,
  },
  Proprietere: {
    type: String,
    required: true,
  },
  telPropritere: {
    type: Number,
    required: true,
  },
  numchambre: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    default : new Date().toDateString().slice(0, 10)
  },
});
module.exports = mongoose.model('Bien', bienSchema);
