import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

// Mailtrap credentials (hardcoded for local testing)
// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendPaymentEmail = async (toEmail, userName, paymentToken) => {
  const paymentLink = `http://localhost:3000/payment/${paymentToken}`;

  const mailOptions = {
    from: `"Dhallaty" <no-reply@dhallaty.com>`,
    to: toEmail,
    subject: "Item Found - Complete Your Payment",
    text: `Hello ${
      userName || "Customer"
    }, please complete your payment here: ${paymentLink}`,
    html: `<p>Hello ${userName || "Customer"},</p>
           <p>A match has been found for your lost item. Please complete the payment:</p>
           <p><a href="${paymentLink}">Pay Now</a></p>`,
  };

  try {
    const info = await transport.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};

export default sendPaymentEmail;
