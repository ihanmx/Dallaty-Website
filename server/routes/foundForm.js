// routes/foundForm.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import pool from "../dp.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const uploadsFoundDir = path.join(process.cwd(), "uploads", "found");

if (!fs.existsSync(uploadsFoundDir))
  fs.mkdirSync(uploadsFoundDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsFoundDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/form/found", upload.single("image"), async (req, res) => {
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
      "INSERT INTO users1 (name,email,description,found_date,location,file,recipientDescription,terms,instruction,reportId) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
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
});

export default router;
