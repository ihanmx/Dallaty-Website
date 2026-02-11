import pool from "../config/dp.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  // 1. Check if cookies exist and contain jwt
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized

  const refreshToken = cookies.jwt;
  try {
    // 2. Check if the refresh token exists in the Database
    // This is a crucial security step (Reuse Detection)
    const foundAdmin = await pool.query(
      "SELECT * FROM admins WHERE refresh_token = $1",
      [refreshToken],
    );

    // If token not found in DB (maybe user logged out or token stolen), forbid access
    if (foundAdmin.rows.length === 0) return res.sendStatus(403); // Forbidden

    const admin = foundAdmin.rows[0];

    // 3. Verify the Refresh Token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        // If verification fails or token belongs to another user
        if (err || admin.id !== decoded.id) return res.sendStatus(403);

        // 4. If valid, generate a NEW Access Token
        const accessToken = jwt.sign(
          { id: decoded.id, email: decoded.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }, // Short life for security
        );

        // Send the new access token to frontend
        res.json({ accessToken });
      },
    );
  } catch (err) {
    console.error("Refresh token error:", err);
    res.sendStatus(500);
  }
};
