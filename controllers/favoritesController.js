const Favorite = require('../models/Favorite');

// Get user's favorites
exports.getFavorites = async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.render('favorites', { favorites: [] });
    }

    const favorites = await Favorite.find({ userId: req.session.user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.render('favorites', { favorites });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.render('favorites', { favorites: [] });
  }
};

// Add to favorites
exports.addToFavorites = async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { vehicleId, vehicleTitle, vehicleImage, vehiclePrice } = req.body;

    if (!vehicleId || !vehicleTitle) {
      return res.status(400).json({ error: 'Vehicle ID and title are required' });
    }

    // Check if already in favorites
    const existingFavorite = await Favorite.findOne({
      userId: req.session.user._id,
      vehicleId: vehicleId
    });

    if (existingFavorite) {
      return res.status(409).json({ error: 'Vehicle already in favorites' });
    }

    const favorite = new Favorite({
      userId: req.session.user._id,
      vehicleId,
      vehicleTitle,
      vehicleImage,
      vehiclePrice
    });

    await favorite.save();
    res.json({ message: 'Added to favorites successfully' });
  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Remove from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { vehicleId } = req.body;

    if (!vehicleId) {
      return res.status(400).json({ error: 'Vehicle ID is required' });
    }

    await Favorite.deleteOne({
      userId: req.session.user._id,
      vehicleId: vehicleId
    });

    res.json({ message: 'Removed from favorites successfully' });
  } catch (error) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
