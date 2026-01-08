import express from "express";

import { getItemDetails } from "../controllers/matchedItemController.js";

const router = express.Router();

router.get("/item-details/:reportId", getItemDetails);

export default router;
