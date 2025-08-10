const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    userType: { type: String, enum: ['Customer', 'Business'], required: true },
    passwordHash: { type: String, required: true },
    // Satisfy potential legacy unique index on `username`
    username: { 
      type: String, 
      unique: true, 
      default: function() { return this.email; } 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
