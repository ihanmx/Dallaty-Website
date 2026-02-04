import pool from "../config/dp.js";
import { v4 as uuidv4 } from "uuid";
// import sendPaymentEmail from "../services/nodemailer.js";
import { sendPaymentEmail } from "../services/zapiermail.js";
import bcrypt from "bcrypt";         // Import bcrypt to check hashed passwords
import jwt from "jsonwebtoken";      // Import JWT to generate tokens

// ==========================================
//  ADMIN LOGIN FUNCTION
/**
 * Login Function
 * Purpose: Authenticate admin and return a JWT token.
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email/password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password" });
    }

    // 2. Find admin in Database
    // NOTE: Ensure your database has a table named 'admins'
    const result = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);

    // Check if user exists
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = result.rows[0];

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Generate Token (Expires in 1 hour)
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5. Send response
    res.json({
      message: "Login successful",
      token: token,
      admin: { id: admin.id, email: admin.email }
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

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
  const { matchedLostReportId, matchedFoundReportId } = req.body;

  try {
    const LostUserRecord = await pool.query(
      "SELECT * FROM lostreports WHERE reportid=$1",
      [matchedLostReportId]
    );

    const lostRow = LostUserRecord.rows[0];

    const FoundUserRecord = await pool.query(
      "SELECT * FROM foundreports WHERE reportid=$1",
      [matchedFoundReportId]
    );

    const foundRow = FoundUserRecord.rows[0];

    if (!lostRow) {
      return res.status(404).json({ error: "lost_report_not_found" });
    }

    if (!foundRow) {
      return res.status(404).json({ error: "found_report_not_found" });
    }

    if (
      lostRow.status === "matched" ||
      lostRow.status === "found_pending_payment" ||
      lostRow.status === "paid"
    ) {
      return res.status(400).json({ error: "lost_already_matched" });
    } else if (foundRow.status === "matched") {
      return res.status(400).json({ error: "found_already_matched" });
    }

    console.log(lostRow);

    //update LostReports database by the admin
    await pool.query(
      `UPDATE lostreports SET status='found_pending_payment' WHERE reportid=$1`,
      [matchedLostReportId]
    );
    //create payment token
    const paymentToken = uuidv4();

    //add new record in payment table (we fill it with the customer data)
    const result = await pool.query(
      `INSERT INTO payments (report_id, email, amount, currency, payment_token, status)
       VALUES ($1,$2,$3,$4,$5,'pending') RETURNING *`,
      [matchedLostReportId, lostRow.email, 25.0, "SAR", paymentToken]
    );

    //update found database by the admin
    const result1 = await pool.query(
      `UPDATE foundreports SET status='matched' WHERE reportid=$1 RETURNING *`,
      [matchedFoundReportId]
    );

    //initiate record for the matched item
    const matchedRecord = await pool.query(
      `INSERT INTO matched_items (lost_reportid, found_reportid, lost_report_date, found_date, description, location,recipient_details,file)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        lostRow.reportid,
        foundRow.reportid,
        lostRow.created_date,
        foundRow.found_date,
        foundRow.description,
        foundRow.location,
        foundRow.recipientdescription,
        foundRow.file,
      ]
    );

    //call the function that sends email for the user to pay the fees
    await sendPaymentEmail(lostRow.email, lostRow.name, paymentToken);

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

export const getTableData = async (req, res) => {
  const { tableName } = req.params;
  const allowedTables = ['users', 'lostreports', 'foundreports', 'payments', 'matched_items'];

  if (!allowedTables.includes(tableName)) {
    return res.status(400).json({ error: "Invalid table name" });
  }

  try {
    const result = await pool.query(`SELECT * FROM ${tableName}`);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching table data:", error);
    res.status(500).json({ error: "Failed to fetch table data" });
  }
};
