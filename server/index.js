// Very first line to use .env
import "dotenv/config"; // loads env variables immediately
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import paymentRoute from "./routes/payment.js";
import { initializeTables } from "./config/initBD.js";
import cookieParser from "cookie-parser"; // import cookieParser
import lostFormRoute from "./routes/lostForm.js";
import foundFormRoute from "./routes/foundForm.js";
import adminRoute from "./routes/admin.js";
import matchedItemRouter from "./routes/matchedItem.js";
import corsOptions from "./config/corsOptions.js";

//development
const app = express();
const port = process.env.PORT || 5000;

// const isProduction = process.env.NODE_ENV === "production";
//production

process.on("unhandledRejection", (err) => {
  console.error("🔴 Unhandled Promise Rejection:", err);
});

//development
//to enable front to access back
app.use(cors(corsOptions));
app.use(express.json()); //built in body parser
app.use(cookieParser()); // Enable Cookie Parser
//development

//check if uploads folders exists if not create them
const uploadsLostDir = path.join(process.cwd(), "uploads", "lost");
const uploadsFoundDir = path.join(process.cwd(), "uploads", "found");
[uploadsLostDir, uploadsFoundDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// serve static folders so the browser can access them
app.use("/uploads/lost", express.static(uploadsLostDir));
app.use("/uploads/found", express.static(uploadsFoundDir));

//development
// Root route for testing server status.
// app.get("/", (req, res) => {
//   res.send("<h1>here is server 5000</h1>");
// });
//development

//production
// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
  });
});
//production

// mount routes
app.use(lostFormRoute);
app.use(foundFormRoute);
app.use(paymentRoute);
app.use("/admin", adminRoute);
app.use(matchedItemRouter);

//development
// app.get("/test", (req, res) => {
//   console.log("✅ /test route reached through ngrok");
//   res.send("Ngrok works!");
// });
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

// Initialize database tables
// await initializeTables(); //
// app.listen(port, async () => {
//   console.log(`✅ Server is running locally on port ${port}`);

//   if (process.env.NGROK_AUTHTOKEN) {
//     const { default: ngrok } = await import("@ngrok/ngrok");
//     const listener = await ngrok.forward({
//       addr: port,
//       authtoken: process.env.NGROK_AUTHTOKEN,
//     });
//     console.log(`Ingress established at ${listener.url()}`);
//   }
// });

//production
// Initialize database tables and start server
await initializeTables();
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server is running on port ${port}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});
