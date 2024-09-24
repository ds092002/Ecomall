const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,     // For Compulsory requirement in data
    unique: true        // For Compulsory requirement in data
  },
  password: {
    type: String,
    required: true
  }
},
{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('users', userSchema)