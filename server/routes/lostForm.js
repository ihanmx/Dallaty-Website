// routes/lostForm.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import pool from "../dp.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Define upload directory
const uploadsLostDir = path.join(process.cwd(), "uploads", "lost");

// Ensure directory exists
if (!fs.existsSync(uploadsLostDir))
  fs.mkdirSync(uploadsLostDir, { recursive: true });

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsLostDir),
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

// POST /form/lost
router.post("/form/lost", upload.single("image"), async (req, res) => {
  try {
    const { name, email, description, location, resource } = req.body;

    const terms =
      req.body.terms === "true" ||
      req.body.terms === "on" ||
      req.body.terms === "1";

    const fees =
      req.body.fees === "true" ||
      req.body.fees === "on" ||
      req.body.fees === "1";

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
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error in /form/lost:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

export default router;
