const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');
const rdvSchema = new mongoose.Schema({
  id_client: {
    type: String,
    required: true,
  },
  id_Bien: {
    type: String,
    required: true,
  },
  dateRDV: {
    type: String,
    required: true,
  },
  affected:{
    type:boolean,
    required: true,
  },
  createAt: {
    type: String,
    default: new Date().toDateString().slice(0, 10),
  },

});
module.exports = mongoose.model('Rdv', rdvSchema);
