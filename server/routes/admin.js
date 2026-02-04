import express from "express";
// Add 'login' to the existing import list
import {
  login,
  getDashboardData,
  postConfirmMatchLost,
  postConfirmMatchFound,
  getTableData,
} from "../controllers/AdminController.js";
// Import the authentication middleware
import verifyAdminToken from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
//  1. Public Routes (Accessible without token)
// Admin login route to generate JWT token
router.post("/login", login); 

// ==========================================
//  2. Protected Routes (Require JWT Token)
// Apply authentication middleware. 
// Any route defined below this line will automatically require a valid token.
router.use(verifyAdminToken);

router.get("/dashboard-data", getDashboardData);
router.get("/table/:tableName", getTableData);

//confirm matching and sending emails route

router.post("/confirm-match-lost", postConfirmMatchLost);


router.post("/confirm-match-found", postConfirmMatchFound);


export default router;
