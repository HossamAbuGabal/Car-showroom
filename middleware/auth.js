// Authentication middleware
const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.session || !req.session.user || req.session.user.userType !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

const optionalAuth = (req, res, next) => {
  // Add user info to locals if authenticated, but don't require it
  if (req.session && req.session.user) {
    res.locals.user = req.session.user;
    res.locals.isAuthenticated = true;
  } else {
    res.locals.user = null;
    res.locals.isAuthenticated = false;
  }
  next();
};

module.exports = {
  requireAuth,
  requireAdmin,
  optionalAuth
};
