import axios from "axios";
import pool from "../config/dp.js";
import dotenv from "dotenv";

import { sendReportDetails } from "../services/zapiermail.js";

dotenv.config();

// PayTabs API credentials (keep in .env)
const PAYTABS_PROFILE_ID = process.env.PAYTABS_PROFILE_ID;
const PAYTABS_SERVER_KEY = process.env.PAYTABS_SERVER_KEY;
const PAYTABS_BASE_URL = process.env.PAYTABS_BASE_URL;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://185.164.25.144";
const BACKEND_URL = process.env.BACKEND_URL || "http://185.164.25.144";

//done
export const getPaymentDetails = async (req, res) => {
  const { paymentToken } = req.params;

  try {
    const userReportData = await pool.query(
      "SELECT matched_items.* from matched_items JOIN payments ON payments.report_id=matched_items.lost_reportid WHERE payments.payment_token=$1",
      [paymentToken]
    );

    if (userReportData.rows.length > 0) {
      console.log("user report details", userReportData.rows[0]);
      res.json(userReportData.rows[0]);
    } else
      res.status(404).json({
        url: `${FRONTEND_URL}/payment-status/invalid?error=invalidToken`,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      url: `${FRONTEND_URL}/payment-status/invalid?error=serverError`,
    });
  }
};

//called when user clicks pay button
export const postCreatePayment = async (req, res) => {
  try {
    //access the user payment token
    const { paymentToken, agreedToTerms } = req.body;

    //access the payment DB to make sure that user has a record + retrive his information to use it in paytabs
    console.log("create payment calles");
    if (!agreedToTerms) {
      return res
        .status(400)
        .json({ error: "You must agree to the payment terms" });
    }

    const paymentQuery = await pool.query(
      `SELECT * FROM payments WHERE payment_token=$1`,
      [paymentToken]
    );
    console.log("row in payment", paymentQuery.rows[0]);

    //validate that there is a record of payment for the user
    if (paymentQuery.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "there is no record of user in the payments DB" });
    } else if (paymentQuery.rows[0].status === "success") {
      return res.json({
        url: `${FRONTEND_URL}/payment-status/${paymentQuery.rows[0].report_id}?alreadyPaid=true`,
      });
    }

    const paymentRecord = paymentQuery.rows[0];
    const returnUrl = `${FRONTEND_URL}/payment-status/${paymentRecord.report_id}`; //front (success page)
    const callbackUrl = `${BACKEND_URL}/api/webhook`; // Production callback URL for PayTabs

    const uniqueCartID = `${paymentRecord.report_id}_${Date.now()}`; //we combined the date of using with the card ID to avoid duplication error when the user access the link multiple times
    //note you must set digital product setting from paytabs dashboard
    const paymentPayload = {
      profile_id: PAYTABS_PROFILE_ID,
      tran_type: "sale",
      tran_class: "ecom",
      cart_id: uniqueCartID,
      cart_currency: paymentRecord.currency,
      cart_amount: paymentRecord.amount,
      cart_description: "Dhallaty service fee",
      callback: callbackUrl,
      return: returnUrl,
      hide_shipping: true,
      hide_billing: true,
    };

    const response = await axios.post(PAYTABS_BASE_URL, paymentPayload, {
      headers: {
        authorization: PAYTABS_SERVER_KEY,
        "Content-Type": "application/json",
      },
    });

    const { tran_ref, redirect_url, cart_id } = response.data; //extract reference and redirect URL from paytabs response

    console.log("the res of Paytabs", response.data);

    //now the user has created a payment proccess it paytabs we are going to store it ref of the procees from paytabs res
    //from paytabs in payment DB and change the record status to initiated
    await pool.query(
      `UPDATE payments SET paytabs_tran_ref=$1, status='initiated', cart_id=$2,agreed_to_terms=$3 WHERE payment_token=$4`,
      [tran_ref, uniqueCartID, agreedToTerms, paymentToken]
    );
    //finally the route will send the redirect URL as a response

    res.json({ url: redirect_url });
  } catch (error) {
    console.error(
      "Error creating PayTabs payment:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Payment initialization failed" });
  }
};

//Done

export const postPaymentWebhook = async (req, res) => {
  try {
    console.log("✅ Webhook triggered");
    console.log("Webhook full body:", JSON.stringify(req.body, null, 2));
    const { tran_ref, payment_result, cart_id } = req.body;

    if (!tran_ref || !cart_id) {
      console.error("Missing data from PayTabs:", req.body);
      return res.status(400).json({ error: "Invalid webhook payload" });
    }

    // PayTabs status
    const statusCode = payment_result?.response_status || "U"; // U = Unknown
    const status =
      statusCode === "A"
        ? "success"
        : statusCode === "D"
          ? "declined"
          : "failed";

    // Extract report ID (we used cart_id = `${reportId}_${Date.now()}`)
    const originalReportId = cart_id.split("_")[0];
    console.error("From webhook the report ID is:", originalReportId);

    // Update payments table
    await pool.query(
      `UPDATE payments SET status=$1, paytabs_tran_ref=$2 WHERE report_id=$3`,
      [status, tran_ref, originalReportId]
    );

    // If payment succeeded, mark lostreports as paid
    if (status === "success") {
      const lostUserData = await pool.query(
        `UPDATE lostreports SET status='paid' WHERE reportid=$1 RETURNING *`,
        [originalReportId]
      );

      const lostUserDataRow = lostUserData.rows[0];

      console.log("for zapier send th id", lostUserDataRow.reportid);
      // const reportData = await pool.query(
      //   "SELECT * from matched_items WHERE lost_reportid=$1",
      //   [originalReportId]
      // );

      //   const sendReportDetails = async (
      //   reportId,
      //   toEmail,
      //   userName,
      //   location,
      //   description,
      //   file,
      //   recipientDescription,
      //   foundDate
      // )

      // const reportDataRow = reportData.rows[0];
      sendReportDetails(
        lostUserDataRow.reportid,
        lostUserDataRow.email,
        lostUserDataRow.name

        // reportDataRow.location,
        // reportDataRow.description,
        // reportDataRow.file,
        // reportDataRow.recipientDescription,
        // reportDataRow.found_date
      );
    }

    console.log(`Webhook processed: report ${originalReportId} → ${status}`);

    res.json({ message: "Webhook processed successfully", status });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    res
      .status(500)
      .json({ error: "Failed to process webhook", status: "error" });
  }
};

//Done

export const getPaymentStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const result = await pool.query(
      `SELECT status FROM payments WHERE report_id=$1`,
      [reportId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ status: "not_found" });
    }

    res.json({ status: result.rows[0].status });
  } catch (err) {
    console.error("Error fetching payment status:", err);
    res.status(500).json({ status: "error" });
  }
};
