const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // Bearer Token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // else if (req.cookies.token) {
  //   token = req.cookies.token
  // }

  // Token Exists?
  if (!token) {
    return next(new ErrorResponse('Not authorized to access route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Verify Token
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access route', 401));
  }
});

// Grant Access by Roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(`User role ${req.user.role} not authorized to access this route`, 401));
    }
    next();
  }
  next();
}