import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import paymentRoute from "./routes/payment.js";

import lostFormRoute from "./routes/lostForm.js";
import foundFormRoute from "./routes/foundForm.js";
import adminRoute from "./routes/admin.js";
import ngrok from "@ngrok/ngrok";

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
// app.use("/", (req, res) => {
//   res.send("<h1>here is server 5000</h1>");
// });

// mount routes
app.use(lostFormRoute);
app.use(foundFormRoute);
app.use(paymentRoute);
app.use("/admin", adminRoute);
app.get("/test", (req, res) => {
  console.log("✅ /test route reached through ngrok");
  res.send("Ngrok works!");
});

//unsupported url error msg
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found !</h1>");
});

app.listen(port, async () => {
  console.log(`✅ Server is running locally on port ${port}`); // Connect ngrok tunnel
  const listener = await ngrok.forward({
    // The port your app is running on.
    addr: 5000,
    authtoken: process.env.NGROK_AUTHTOKEN, // Secure your endpoint with a traffic policy. // This could also be a path to a traffic policy file.
  });

  console.log(`Ingress established at ${listener.url()}`);
});
