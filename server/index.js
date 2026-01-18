import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import paymentRoute from "./routes/payment.js";
import { initializeTables } from "./config/initBD.js";

import lostFormRoute from "./routes/lostForm.js";
import foundFormRoute from "./routes/foundForm.js";
import adminRoute from "./routes/admin.js";
import matchedItemRouter from "./routes/matchedItem.js";
import ngrok from "@ngrok/ngrok";


//development
const app = express();
const port = 5000;

dotenv.config();
//development

//production
// Load environment variables first
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;
// const isProduction = process.env.NODE_ENV === "production";
//production

process.on("unhandledRejection", (err) => {
  console.error("🔴 Unhandled Promise Rejection:", err);
});


//development
//to enable front to access back
app.use(cors());
app.use(express.json()); //built in body parser
//development

//production
// CORS configuration
// const corsOptions = {
//   origin: isProduction 
//     ? process.env.FRONTEND_URL || "http://185.164.25.144"
//     : "*",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// };
// app.use(cors(corsOptions));
// app.use(express.json()); //built in body parser

//production

// It makes the uploads folder public so the browser can access the image directly.
const uploadsLostDir = path.join(process.cwd(), "uploads", "lost");
const uploadsFoundDir = path.join(process.cwd(), "uploads", "found");
[uploadsLostDir, uploadsFoundDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// serve static uploads
app.use("/uploads/lost", express.static(uploadsLostDir));
app.use("/uploads/found", express.static(uploadsFoundDir));

//development
app.use("/", (req, res) => {
  res.send("<h1>here is server 5000</h1>");
});
//development
//production
// Health check endpoint
// app.get("/health", (req, res) => {
//   res.json({ status: "ok", environment: process.env.NODE_ENV || "development" });
// });
//production
// mount routes
app.use(lostFormRoute);
app.use(foundFormRoute);
app.use(paymentRoute);
app.use("/admin", adminRoute);
app.use(matchedItemRouter);
//development
app.get("/test", (req, res) => {
  console.log("✅ /test route reached through ngrok");
  res.send("Ngrok works!");});
//development
//production
// app.get("/test", (req, res) => {
//   console.log("✅ /test route reached");
//   res.send("Server is running!");
// });

//production
//unsupported url error msg
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found !</h1>");
});


//development
// Initialize database tables
await initializeTables(); //
app.listen(port, async () => {
  console.log(`✅ Server is running locally on port ${port}`); // Connect ngrok tunnel
  const listener = await ngrok.forward({
    // The port your app is running on.
    addr: 5000,
    authtoken: process.env.NGROK_AUTHTOKEN, // Secure your endpoint with a traffic policy. // This could also be a path to a traffic policy file.
  });

  console.log(`Ingress established at ${listener.url()}`);});

//production
// Initialize database tables and start server
// await initializeTables();
// app.listen(port, "0.0.0.0", () => {
//   console.log(`✅ Server is running on port ${port}`);
//   console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
// });
