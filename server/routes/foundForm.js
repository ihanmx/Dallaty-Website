// routes/foundForm.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { postFoundController } from "../controllers/FoundController.js";
import { formLimiter } from "../config/rateLimiter.js";
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

router.post(
  "/form/found",
  formLimiter,
  upload.single("image"),
  postFoundController,
);

export default router;
