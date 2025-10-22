import express from "express";
import pool from "../dp.js";

const router = express.Router();

router.get("/api/payments", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM payments ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching payments:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

export default router;
