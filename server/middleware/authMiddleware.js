import jwt from "jsonwebtoken";

/**
 * Middleware: verifyAdminToken (UPDATED for Access Token)
 * Purpose: Protects routes by verifying the Short-Lived Access Token.
 */
export const verifyAdminToken = (req, res, next) => {
  // 1. Get the 'Authorization' header from the request
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  // 2. Check if header exists and starts with 'Bearer '
  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided!" });
  }

  // 3. Extract the token
  const token = authHeader.split(" ")[1];

  // 4. Verify the token using the ACCESS_TOKEN_SECRET (Not JWT_SECRET anymore)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // 5. Handle Errors
    if (err) {
      // We return 403 (Forbidden) specifically to tell the Frontend:
      // "Your token is expired, please use the refresh token to get a new one."
      return res.status(403).json({ message: "Invalid or Expired Token" });
    }

    // 6. Attach user data to the request object
    req.user = decoded;

    // 7. Proceed to the next step
    next();
  });
};
