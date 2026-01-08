import pool from "../db.js";
import { v4 as uuidv4 } from "uuid";

export async function createPayment(
  reportId,
  email,
  amount = 25.0,
  currency = "SAR"
) {
  const paymentToken = uuidv4();

  const result = await pool.query(
    `INSERT INTO payments (report_id, email, amount, currency, payment_token, status)
     VALUES ($1,$2,$3,$4,$5,'pending') RETURNING *`,
    [reportId, email, amount, currency, paymentToken]
  );

  return result.rows[0];
}
