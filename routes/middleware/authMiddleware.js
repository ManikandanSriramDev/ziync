const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next(); // User is authenticated, proceed to the next middleware/route handler
  } else {
    // Log unauthorized access attempt
    console.error(`Unauthorized access attempt at ${req.originalUrl} on ${new Date().toISOString()}`);
    return res.status(401).send('You are not authenticated'); // User is not authenticated
  }
};

const isAdmin = (req, res, next) => {
  // Assuming isAdmin flag is part of the user session
  if (req.session && req.session.isAdmin) {
    return next();
  } else {
    // Log forbidden access attempt
    console.error(`Forbidden access attempt by user ${req.session.userId || 'unknown'} at ${req.originalUrl} on ${new Date().toISOString()}`);
    return res.status(403).send('You do not have permission to perform this action');
  }
};

const isSuperUser = (req, res, next) => {
  // Assuming superUser flag is part of the user session or user model
  if (req.session && req.session.isSuperUser) {
    return next();
  } else {
    // Log forbidden access attempt
    console.error(`Forbidden access attempt by user ${req.session.userId || 'unknown'} at ${req.originalUrl} on ${new Date().toISOString()}`);
    return res.status(403).send('You do not have permission to perform this action');
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isSuperUser
};