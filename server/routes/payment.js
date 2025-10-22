import express from "express";
import axios from "axios";
import pool from "../dp.js";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

// PayTabs API credentials (keep in .env)
const PAYTABS_PROFILE_ID = process.env.PAYTABS_PROFILE_ID;
const PAYTABS_SERVER_KEY = process.env.PAYTABS_SERVER_KEY;
const PAYTABS_BASE_URL = process.env.PAYTABS_BASE_URL;

// Create payment request
router.post("/api/create-payment", async (req, res) => {
  try {
    const { orderId, customerName, customerEmail, amount } = req.body;

    // Your return and callback URLs
    const returnUrl = "http://localhost:3000/payment-status"; // frontend page
    const callbackUrl = "http://localhost:5000/api/payment-callback"; // backend route

    const paymentData = {
      profile_id: PAYTABS_PROFILE_ID,
      tran_type: "sale",
      tran_class: "ecom",
      cart_id: orderId,
      cart_currency: "SAR",
      cart_amount: amount,
      cart_description: "Order payment",
      callback: callbackUrl,
      return: returnUrl,
      customer_details: {
        name: customerName,
        email: customerEmail,
        street1: "NA",
        city: "Riyadh",
        country: "SA",
      },
    };

    // Ensure PayTabs credentials are present
    // If PayTabs credentials are missing, allow a dev-mode mock response so frontend can be tested
    if (!PAYTABS_PROFILE_ID || !PAYTABS_SERVER_KEY) {
      const msg =
        "PayTabs credentials are not configured (PAYTABS_PROFILE_ID or PAYTABS_SERVER_KEY).";
      console.warn(msg);

      // In production we should fail hard. In development, return a mock redirect URL and insert a mock DB row.

      //if dev mode (real server production then no fake data)
      if (process.env.NODE_ENV === "production") {
        return res.status(500).json({ error: msg });
      }

      // Create a mock transaction reference and redirect URL for local testing (development mode)
      //create fake ref for transaction from Date.now()
      const mock_tran_ref = `MOCK-${Date.now()}`;
      const mock_redirect_url = `http://localhost:3000/mock-paytabs?tran_ref=${mock_tran_ref}`;

      // store mock record for admin dashboard
      await pool.query(
        `INSERT INTO payments (order_id, paytabs_tran_ref, status) VALUES ($1, $2, $3)`,
        [orderId, mock_tran_ref, "initiated"]
      );

      return res.json({ url: mock_redirect_url });
    }

    const response = await axios.post(PAYTABS_BASE_URL, paymentData, {
      headers: {
        authorization: PAYTABS_SERVER_KEY,
        "Content-Type": "application/json",
      },
    });

    const { tran_ref, redirect_url } = response.data;

    // store record for admin dashboard
    await pool.query(
      `INSERT INTO payments (order_id, paytabs_tran_ref, status)
       VALUES ($1, $2, $3)`,
      [orderId, tran_ref, "initiated"]
    );

    res.json({ url: redirect_url });
  } catch (error) {
    // Log full error for debugging
    console.error("Error creating PayTabs payment:", {
      message: error.message,
      responseData: error.response?.data,
      status: error.response?.status,
      stack: error.stack,
    });

    // Return something actionable to the client for local debugging
    const clientMessage = error.response?.data || { error: error.message };
    res
      .status(500)
      .json({ error: "Payment initialization failed", details: clientMessage });
  }
});

// Callback from PayTabs (after payment)
router.post("/api/payment-callback", async (req, res) => {
  try {
    const { tran_ref, resp_status, resp_message } = req.body;

    // Update DB with final payment status
    await pool.query(
      `UPDATE payments SET status = $1 WHERE paytabs_tran_ref = $2`,
      [resp_status, tran_ref]
    );

    res.status(200).json({ message: "Callback received" });
  } catch (error) {
    console.error("Error handling callback:", error.message);
    res.status(500).json({ error: "Callback error" });
  }
});

export default router;
