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

const uploadsLostDir = path.join(process.cwd(), "uploads", "lost"); // absolute path to uploads/lost
const uploadsFoundDir = path.join(process.cwd(), "uploads", "found"); // absolute path to uploads/found

//if folders don't exist create them
[uploadsLostDir, uploadsFoundDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// configure disk storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // example: check req.url to decide were to store image based on the path of req
    const folder = req.url.includes("/found")
      ? uploadsFoundDir
      : uploadsLostDir;
    cb(null, folder);
  },
  // replace spaces with underscores and prepend timestamp to avoid name conflicts
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

app.use("/uploads/lost", express.static(uploadsLostDir));
app.use("/uploads/found", express.static(uploadsFoundDir));
//builtin middleware reads incoming requests that have JSON data and puts it in req.body must be after multer
app.use(express.json());

// serve uploaded files statically

// Routes
// Create a user

//use multer to handle file uploads

// lost endpoint

app.post("/form/lost", upload.single("image"), async (req, res) => {
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
    const filePath = req.file ? `/uploads/lost/${req.file.filename}` : null;

    const newUser = await pool.query(
      "INSERT INTO users (name,email,description,location,file,resource,terms,fees) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [name, email, description, location, filePath, resource, terms, fees]
    );
    console.log("DB insert result:", newUser);

    if (newUser && newUser.rowCount && newUser.rowCount > 0) {
      res.status(201).json(newUser.rows[0]);
    } else {
      console.warn("DB insert returned no rows", newUser);
      res.status(400).json({ error: "User could not be created" });
    }

    console.log(req.body);
    console.log(req.file);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// found endpoint
app.post("/form/found", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      email,
      description,
      location,
      recipientDescription,
      foundDate, // ✅ extract it from req.body
    } = req.body;
    // convert checkbox string values to booleans because they came as strings from the client
    const terms =
      req.body.terms === "true" ||
      req.body.terms === "on" ||
      req.body.terms === "1";
    const instruction =
      req.body.instruction === "true" ||
      req.body.instruction === "on" ||
      req.body.instruction === "1";

    // multer adds file information to req.file
    const filePath = req.file ? `/uploads/found/${req.file.filename}` : null;

    // ensure foundDate is either null or a string date acceptable by the DB
    const found_date_value = foundDate && foundDate !== "" ? foundDate : null;

    const newUser = await pool.query(
      "INSERT INTO users1 (name,email,description,found_date,location,file,recipientDescription,terms,instruction) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
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
      ]
    );

    console.log("DB insert result:", newUser);

    if (newUser && newUser.rowCount && newUser.rowCount > 0) {
      res.status(201).json(newUser.rows[0]);
    } else {
      console.warn("DB insert returned no rows", newUser);
      res.status(400).json({ error: "User could not be created" });
    }
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
