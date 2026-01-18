import express from "express";
import {
  getDashboardData,
  postConfirmMatchLost,
  postConfirmMatchFound,
  getTableData,
} from "../controllers/AdminController.js";

const router = express.Router();

router.get("/dashboard-data", getDashboardData);
router.get("/table/:tableName", getTableData);

//confirm matching and sending emails route

router.post("/confirm-match-lost", postConfirmMatchLost);


router.post("/confirm-match-found", postConfirmMatchFound);


export default router;
