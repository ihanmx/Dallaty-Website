import jwt from "jsonwebtoken";

/**
 * Middleware: verifyAdminToken
 * Purpose: Protects routes by verifying the JWT token sent in the request header.
 */
const verifyAdminToken = (req, res, next) => {
  // 1. Get the 'Authorization' header from the request
  const authHeader = req.headers['authorization'];

  // 2. Extract the token 
  const token = authHeader && authHeader.split(' ')[1];

  // 3. Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided!" });
  }

  try {
    // 4. Verify the token using the Secret Key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // 5. Attach user data to the request object
    req.user = verified;
    
    // 6. Proceed to the next step
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default verifyAdminToken;