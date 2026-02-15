import express from "express";
//admin controller
import {
  login,
  logout,
  getDashboardData,
  postConfirmMatchLost,
  postConfirmMatchFound,
  getTableData,
  deleteTableRows,
} from "../controllers/AdminController.js";
//refresh token controller
import { handleRefreshToken } from "../controllers/refreshTokenController.js";
//auth middleware
import { verifyAdminToken } from "../middleware/authMiddleware.js";

const router = express.Router();

//  1. Public Routes (Accessible without token)
// Login Route
// Frontend endpoint: POST /admin/login
router.post("/login", login);
// Refresh Token Route (MUST be public/before middleware)
// Frontend calls this when it gets a 403 error
// Frontend endpoint: GET /admin/refresh
router.get("/refresh", handleRefreshToken);
// Logout Route
// Frontend endpoint: POST /admin/logout
router.post("/logout", logout);

//  2. Protected Routes (Require Valid Access Token)

// Apply authentication middleware to all routes below this line
// router.use(verifyAdminToken);
// Frontend endpoint: GET /admin/dashboard-data
router.get("/dashboard-data", getDashboardData);
// Frontend endpoint: GET /admin/table/:tableName
router.get("/table/:tableName", getTableData); // this route should matche the frontend request

router.delete("/table/:tableName", deleteTableRows);

//confirm matching and sending emails route

router.post("/confirm-match-lost", postConfirmMatchLost);
// Frontend endpoint: POST /admin/confirm-match-found
router.post("/confirm-match-found", postConfirmMatchFound);

export default router;
