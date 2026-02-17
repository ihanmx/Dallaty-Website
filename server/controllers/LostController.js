import pool from "../config/dp.js";
import { v4 as uuidv4 } from "uuid";
export const postLostController = async (req, res) => {
  try {
    const { name, email, description, location, resource } = req.body;

    if (!name || !email || !description || !location || !resource) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const terms =
      req.body.terms === "true" ||
      req.body.terms === "on" ||
      req.body.terms === "1";

    const fees =
      req.body.fees === "true" ||
      req.body.fees === "on" ||
      req.body.fees === "1";

    if (!terms || !fees) {
      return res
        .status(400)
        .json({ error: "You must agree to the terms and fees" });
    }

    //req.file is the object multer attaches to the request. It contains filename, originalname, mimetype, size, etc.
    const filePath = req.file ? `/uploads/lost/${req.file.filename}` : null;
    const reportId = uuidv4();

    const result = await pool.query(
      "INSERT INTO lostreports (name,email,description,location,file,resource,terms,fees,reportid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        name,
        email,
        description,
        location,
        filePath,
        resource,
        terms,
        fees,
        reportId,
      ],
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error in /form/lost:", err.message);
    res.status(500).json({ error: "Server error can't send the report" });
  }
};
