//  Note: this page need for (Front designing) we only use this draft to test the back

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

//local images
import design1 from "../images/design1.png";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

//context

export default function PaymentPage() {
  const { paymentToken } = useParams(); //takes the token from the header of URL
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserReportDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/payment-details/${paymentToken}`
        );

        console.log("server res with details", res);

        setReportData(res.data);
        setLoading(false);
      } catch (err) {
        // Axios puts backend response here
        const url = err.response?.data?.url;

        if (url) {
          window.location.href = url;
        } else {
          console.error("Unexpected error:", err);
          setError("server");
        }
      }
    };

    fetchUserReportDetails();
  }, [paymentToken]);

  const handlePayClick = async () => {
    const res = await axios.post("http://localhost:5000/api/create-payment", {
      paymentToken,
      agreedToTerms: agreed,
    });
    window.location.href = res.data.url;
  };

  if (loading && !error) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        <Typography mt={2}>{t("payment_redirect")}</Typography>
      </Box>
    );
  }

  return (
    <Stack
      id="lost-page"
      sx={{
        p: 2,
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        backgroundColor: "white",
        padding: "1rem",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        backgroundImage: `url(${design1})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflowX: "hidden",
      }}
    >
      <Card
        sx={{
          width: { xs: "70%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
          color="primary.main"
        >
          {t("report_details")}
        </Typography>
        <CardContent sx={{ width: "80%" }}>
          <Typography variant="h6" mt="2">
            {t("name")}
          </Typography>

          <Typography variant="body1">{reportData.name}</Typography>

          <Typography mt={2} variant="h6">
            {t("email")}
          </Typography>

          <Typography variant="body1">{reportData.email}</Typography>

          <Typography mt={2} variant="h6">
            {t("description")}
          </Typography>

          <Typography variant="body1">{reportData.description}</Typography>

          <Typography mt={2} variant="h6">
            {t("location")}
          </Typography>

          <Typography variant="body1">{reportData.location}</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                }}
              />
            }
            label={t("payment_terms")}
            sx={{ mt: 2 }}
          />
        </CardContent>
        <CardActions>
          <Button
            disabled={!agreed}
            onClick={handlePayClick}
            variant="contained"
            size="small"
          >
            {t("pay_now")}
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
}
