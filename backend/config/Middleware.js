const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your_jwt_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach user info to the request object
    req.user = decoded;  // Assuming decoded contains the user object with an 'id'
    next();
  });
};

module.exports = authenticateUser;
