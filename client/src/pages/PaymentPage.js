//  Note: this page need for (Front designing) we only use this draft to test the back

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function PaymentPage() {
  const { paymentToken } = useParams(); //takes the token from the header of URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const createPayment = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/create-payment",
          {
            paymentToken,
          }
        );
        console.log("front create payment called and send token", paymentToken);
        // Redirect to PayTabs checkout page (which is sent by the backend server)
        window.location.href = res.data.url;
      } catch (err) {
        console.error(err);
        setError("Failed to initiate payment. Please try again later.");
        setLoading(false);
      }
    };

    if (paymentToken) createPayment(); //we would only call the paytab page if there was token in the used URL
  }, [paymentToken]);

  if (loading && !error) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        <Typography mt={2}>Redirecting to secure payment...</Typography>
      </Box>
    );
  }

  return (
    <Box textAlign="center" mt={10}>
      <Typography color="error">{error}</Typography>
      <button onClick={() => navigate("/")}>Go Back</button>
    </Box>
  );
}
