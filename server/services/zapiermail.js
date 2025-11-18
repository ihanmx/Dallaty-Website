import axios from "axios";

const sendPaymentEmail = async (toEmail, userName, paymentToken) => {
  const paymentLink = `http://localhost:3000/payment/${paymentToken}`;
  try {
    await axios.post("https://hooks.zapier.com/hooks/catch/25303820/uspp94x/", {
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
