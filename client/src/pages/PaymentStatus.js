//  Note: this page need for (Front designing) we only use this draft to test the back
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function PaymentStatus() {
  const { reportId } = useParams(); // e.g., /payment/:reportId
  const [message, setMessage] = useState("Processing your payment...");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/payment-status/${reportId}`
        );
        const data = await res.json();

        if (data.status === "success") {
          setMessage("✅ Payment Successful! Thank you for using Dhallaty.");
        } else if (data.status === "failed" || data.status === "declined") {
          setMessage("❌ Payment Failed. Please try again.");
        } else {
          setMessage("⏳ Payment still processing...");
        }
      } catch (err) {
        console.error(err);
        setMessage(
          "⚠️ Unable to retrieve payment status. Please check again later."
        );
      }
    };

    // poll every 5 seconds for updates
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [reportId]);

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h5">{message}</Typography>
    </Box>
  );
}
