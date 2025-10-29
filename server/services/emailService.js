// import { MailerSend } from "mailersend";
// import dotenv from "dotenv";
// import axios from "axios";

// dotenv.config();

// const mailerSend = new MailerSend({
//   apiKey: process.env.MAILERSEND_API_KEY,
// });

// const sendPaymentEmail = async (toEmail, Username, paymentToken) => {
//   const paymentLink = `http://localhost:3000/payment/${paymentToken}`;
//   console.log(paymentLink);

//   //https://dhallaty.com/payment/{token} in production this is the link and should be taken from .env

//   // MailerSend expects structured objects for from/to
//   const emailData = {
//     from: { email: "Hanan.bayazeed56@gmail.com", name: "Dhallaty" },
//     to: [{ email: "Hanan.bayazeed56@gmail.com", name: Username || "Customer" }],
//     subject: "Item Found - Complete Your Payment",
//     html: `
//       <p>Hello ${Username || "Customer"},</p>
//       <p>A match has been found for your lost item. Please complete the payment to access location details:</p>
//       <p><a href="${paymentLink}">Pay Now</a></p>
//       <p>Thank you.</p>
//     `,
//     text: `Hello ${
//       Username || "Customer"
//     },\nPlease complete your payment: ${paymentLink}`,
//   };

//   try {
//     const response = await axios.post(
//       "https://api.mailersend.com/v1/email",
//       emailData,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("✅ Email sent:", response.data);
//   } catch (error) {
//     console.error(
//       "❌ Error sending email:",
//       error.response?.data || error.message
//     );
//   }
// };

// export default sendPaymentEmail;
