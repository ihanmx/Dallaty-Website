import pool from "../config/dp.js";
import { v4 as uuidv4 } from "uuid";
import sendPaymentEmail from "../services/nodemailer.js";

export const getDashboardData = async (req, res) => {
  try {
    const [lostReports, foundReports, paymentRecords] = await Promise.all([
      pool.query(`SELECT * FROM lostreports`),
      pool.query(`SELECT * FROM foundreports`),
      pool.query(`SELECT * FROM payments`),
    ]); //we used array destructuring to store the queries in 3 constants + Promise to retrive values at the same time instead of await since there is no dependencies between them

    res.json({
      lostReports: lostReports.rows,
      foundReports: foundReports.rows,
      paymentRecords: paymentRecords.rows,
    });

    console.log("dashboared endpoint called");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to load DBs " });
  }
};

export const postConfirmMatchLost = async (req, res) => {
  const { reportId, lostOwnerEmail, lostOwnerName } = req.body;
  console.log(reportId, lostOwnerEmail, lostOwnerName);
  try {
    //update LostReports database by the admin
    await pool.query(
      `UPDATE lostreports SET status='found_pending_payment' WHERE reportid=$1`,
      [reportId]
    );
    //create payment token
    const paymentToken = uuidv4();

    //add new record in payment table (we fill it with the customer data)
    const result = await pool.query(
      `INSERT INTO payments (report_id, email, amount, currency, payment_token, status)
       VALUES ($1,$2,$3,$4,$5,'pending') RETURNING *`,
      [reportId, lostOwnerEmail, 25.0, "SAR", paymentToken]
    );

    //call the function that sends email for the user to pay the fees
    await sendPaymentEmail(lostOwnerEmail, lostOwnerName, paymentToken);

    res.json({
      message: "Lost item matched, payment created, email sent.",
      payment: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to confirm lost item match" });
  }
};

export const postConfirmMatchFound = async (req, res) => {
  const { reportId } = req.body;
  console.log("found Item confirmed", reportId);
  try {
    //update LostReports database by the admin
    const result = await pool.query(
      `UPDATE foundreports SET status='matched' WHERE reportid=$1 RETURNING *`,
      [reportId]
    );

    res.json({
      message: "Found item matched",
      payment: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to confirm found item match" });
  }
};
