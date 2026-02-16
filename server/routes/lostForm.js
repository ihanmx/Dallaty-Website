// routes/lostForm.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { postLostController } from "../controllers/LostController.js";

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
//attach multer instance as middleware that expects one images from the field called image
//key image must match with frontend
// POST /form/lost
router.post("/form/lost", upload.single("image"), postLostController);

export default router;
