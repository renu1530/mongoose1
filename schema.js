var mongoose = require('mongoose');
var validator = require('validator');

let firstSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid email address'
    }
  }
});

module.exports = mongoose.model('firstModel', firstSchema); // Model name is 'firstModel'