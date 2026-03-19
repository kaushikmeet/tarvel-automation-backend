// core/middleware/role.middleware.js
module.exports = (...roles) => {
  return (req, res, next) => {
    // req.user comes from the auth middleware
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: You don't have the right role" });
    }
  };
};