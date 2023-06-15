
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  lastname: String,
  name: String
});

module.exports = mongoose.model('User', userSchema);
