import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const sendPaymentEmail = async (toEmail, userName, paymentToken) => {
  const paymentLink = `http://localhost:3000/payment/${paymentToken}`;
  try {
    await axios.post(process.env.ZAPIER_PAYMENT_WEBHOOK_URL, {
      email: toEmail,
      userName: userName,
      link: paymentLink,
    });

    console.log("✅ Zapier webhook triggered successfully");
  } catch (err) {
    console.error("❌ Error triggering Zapier webhook:", err);
  }
};

export default sendPaymentEmail;
