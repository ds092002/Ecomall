const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male','Female']
  },
  email: {
    type: String,
    required: true,     // For Compulsory requirement in data
    unique: true        // For Compulsory requirement in data
  },
  profileImage: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    require: true
  },
  mobileNo: {
    type: Number
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
},
{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);