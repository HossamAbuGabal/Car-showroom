const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    userType: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    passwordHash: { type: String, required: true },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
    profilePicture: { type: String, default: '' },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    preferences: {
      preferredBrands: [String],
      budget: {
        min: Number,
        max: Number
      },
      fuelType: [String]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);


