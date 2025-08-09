const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    vehicleId: { 
      type: String, 
      required: true 
    },
    vehicleTitle: { 
      type: String, 
      required: true 
    },
    vehicleImage: { 
      type: String 
    },
    vehiclePrice: { 
      type: String 
    }
  },
  { timestamps: true }
);

// Ensure a user can't favorite the same vehicle twice
FavoriteSchema.index({ userId: 1, vehicleId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', FavoriteSchema);
