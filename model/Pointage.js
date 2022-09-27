const mongoose = require('mongoose');
const pointageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    unique : true ,
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }, // admin , manager , client
  createAt: {
    type: String,
    default: new Date().toDateString().slice(0, 10),
  },
});
module.exports = mongoose.model('Pointage', pointageSchema);
