import express from "express";
import {
  postCreatePayment,
  postPaymentWebhook,
  getPaymentStatus,
} from "../controllers/PaymentController.js";

const router = express.Router();

// Create paytab request
router.post("/api/create-payment", postCreatePayment);

//called by paytabs after payment
//server to server only
router.post("/api/webhook", postPaymentWebhook);

router.get("/api/payment-status/:reportId", getPaymentStatus);

export default router;
