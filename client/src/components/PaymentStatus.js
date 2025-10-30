import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Processing your payment...");

  useEffect(() => {
    const status = searchParams.get("respStatus"); // PayTabs may send params like ?respStatus=A
    if (status === "A") {
      setMessage("✅ Payment Successful! Thank you for using Dhallaty.");
    } else if (status) {
      setMessage("❌ Payment Failed. Please try again.");
    }
  }, [searchParams]);

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h5">{message}</Typography>
    </Box>
  );
}
