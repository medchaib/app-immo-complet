const mongoose = require('mongoose');
const visiteSchema = new mongoose.Schema({

  Date_Visite: {
    type: String,
    required: true,
  },
  id_client: {
    type: String,
    required: true,
  },
  id_agent: {
    type: String,
    required: true,
  },
  id_bien: {
    type: String,
    required: true,
  },
  confirm: {
    type: Boolean,
    required: true,
  },
  Visited: {
    type: Boolean,
    required: true,
  },
  createAt: {
    type: String,
    default: new Date().toDateString().slice(0, 10),
  },
});
module.exports = mongoose.model('Visite', visiteSchema);
