import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";

import paymentRoute from "./routes/payment.js";
import paymentDashboardRoute from "./routes/AdminDashboard.js";
import lostFormRoute from "./routes/lostForm.js";
import foundFormRoute from "./routes/foundForm.js";

const app = express();
const port = 5000;

dotenv.config();
app.use(cors());
app.use(express.json());

// ensure uploads directories exist
const uploadsLostDir = path.join(process.cwd(), "uploads", "lost");
const uploadsFoundDir = path.join(process.cwd(), "uploads", "found");
[uploadsLostDir, uploadsFoundDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// serve static uploads
app.use("/uploads/lost", express.static(uploadsLostDir));
app.use("/uploads/found", express.static(uploadsFoundDir));

// mount routes
app.use(lostFormRoute);
app.use(foundFormRoute);
app.use(paymentRoute);
app.use(paymentDashboardRoute);

//unsupported url error msg
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found !</h1>");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
