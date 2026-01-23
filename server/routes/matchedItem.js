import express from "express";

import { getItemDetails } from "../controllers/matchedItemController.js";

const router = express.Router();

router.get("/api/item-details/:reportId", getItemDetails);

export default router;
