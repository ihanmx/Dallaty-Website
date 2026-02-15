import express from "express";
// Add 'login and logout' to the existing import list
import {
  login,
  logout,
  getDashboardData,
  postConfirmMatchLost,
  postConfirmMatchFound,
  getTableData,
} from "../controllers/AdminController.js";
// Import the authentication middleware
// Import Middleware
// I use { } here because I used 'export const' in the middleware file
import { verifyAdminToken } from "../middleware/authMiddleware.js"; 
import { handleRefreshToken } from "../controllers/refreshTokenController.js";
const router = express.Router();

//  1. Public Routes (Accessible without token)
// Login Route
router.post("/login", login);

// Refresh Token Route (MUST be public/before middleware)
// Frontend calls this when it gets a 403 error
router.get("/refresh", handleRefreshToken);

// Logout Route
router.post("/logout", logout);

//  2. Protected Routes (Require Valid Access Token)

// Apply authentication middleware to all routes below this line
router.use(verifyAdminToken);

router.get("/dashboard-data", getDashboardData);
router.get("/table/:tableName", getTableData); // this route should matche the frontend request
router.post("/confirm-match-lost", postConfirmMatchLost);
router.post("/confirm-match-found", postConfirmMatchFound);


export default router;
