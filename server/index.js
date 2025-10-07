import express from "express";
import cors from "cors";
import multer from "multer";
import pool from "./dp.js";
import path from "path";
import fs from "fs";

const app = express();
const port = 5000;

//middleware allowes multiple ports to communicate with each other
app.use(cors());

//check if uploads folder existed in the directory if not(create it)

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// configure disk storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),

  // name the file and remove spaces
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

// accept only images and limit file size
const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.use("/uploads", express.static(uploadsDir));
//builtin middleware reads incoming requests that have JSON data and puts it in req.body must be after multer
app.use(express.json());

// serve uploaded files statically

// Routes
// Create a user

//use multer to handle file uploads

app.post("/form", upload.single("image"), async (req, res) => {
  try {
    const { name, email, description, location, resource } = req.body;
    // convert checkbox string values to booleans because they came as strings from the client
    const terms =
      req.body.terms === "true" ||
      req.body.terms === "on" ||
      req.body.terms === "1";
    const fees =
      req.body.fees === "true" ||
      req.body.fees === "on" ||
      req.body.fees === "1";

    // multer adds file information to req.file
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;
    const newUser = await pool.query(
      "INSERT INTO users (name,email,description,location,file,resource,terms,fees) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [name, email, description, location, filePath, resource, terms, fees]
    );
    res.json(newUser.rows[0]);
    console.log(req.body);
    console.log(req.file);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// check if the server is running on port 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
