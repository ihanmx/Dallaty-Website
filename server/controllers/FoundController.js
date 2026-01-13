import pool from "../config/dp.js";
import { v4 as uuidv4 } from "uuid";

export const postFoundController = async (req, res) => {
  try {
    const {
      name,
      email,
      description,
      location,
      recipientDescription,
      foundDate,
    } = req.body;

    const terms =
      req.body.terms === "true" ||
      req.body.terms === "on" ||
      req.body.terms === "1";

    const instruction =
      req.body.instruction === "true" ||
      req.body.instruction === "on" ||
      req.body.instruction === "1";

    const filePath = req.file ? `/uploads/found/${req.file.filename}` : null;
    const found_date_value = foundDate && foundDate !== "" ? foundDate : null;
    const reportId = uuidv4();

    const result = await pool.query(
      "INSERT INTO foundreports (name,email,description,found_date,location,file,recipientDescription,terms,instruction,reportid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [
        name,
        email,
        description,
        found_date_value,
        location,
        filePath,
        recipientDescription,
        terms,
        instruction,
        reportId,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error in /form/found:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};
