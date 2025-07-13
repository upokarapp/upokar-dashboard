import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  const requestOrigin = req.headers.origin;

  console.log("Token is :- ",token , " requestOrigin is :- ", requestOrigin);
  
  if (!token) return res.status(401).json({ message: 'You are not authenticated!' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return  res.status(403).json({ message: 'You are not authorized!' });
    req.user = decoded; // Add the decoded payload to the request object
    next();
  });
};

export {
  authenticateToken,
};


// const jwt = require('jsonwebtoken');

// const authMiddleware = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//       next();
//     } catch (error) {
//       res.status(401).json({ message: 'Not authorized, invalid token' });
//     }
//   }
//   if (!token) {
//     res.status(401).json({ message: 'Not authorized, no token provided' });
//   }
// };

// module.exports = authMiddleware;
