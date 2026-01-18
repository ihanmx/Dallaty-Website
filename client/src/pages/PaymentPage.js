

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
import Modal from "@mui/material/Modal";
//api config
import API_URL from "../config/api";

//context

export default function PaymentPage() {
  const { paymentToken } = useParams(); //takes the token from the header of URL
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const [openImage, setOpenImage] = useState(false);

  useEffect(() => {
    const fetchUserReportDetails = async () => {
      try {
        const res = await axios.get(
          //development
          `http://localhost:5000/payment-details/${paymentToken}`
          //production
          // `${API_URL}/payment-details/${paymentToken}`
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
    //development
    const res = await axios.post("http://localhost:5000/api/create-payment", {
      //production
    // const res = await axios.post(`${API_URL}/api/create-payment`, {
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
          width: { xs: "95%", sm: "85%", md: "55%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          // wordBreak: "break-word",
          whiteSpace: "normal",
          overflowWrap: "break-word",
        }}
      >
        {/*       //opens when penImage state is true to expand image */}
        {/* <Modal open={openImage} onClose={() => setOpenImage(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              // p: 2,
              borderRadius: 2,
              width: "90%",
              maxWidth: "90vw",
              height: "auto",

              maxHeight: "auto",
              outline: "none",
            }}
            onClick={() => setOpenImage(false)}
          >
            <img
            //development
              src={`http://localhost:5000${reportData.file}`}
              //production
              src={`${API_URL}${reportData.file}`}
              alt="Expanded Item"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Modal> */}
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
          color="primary.main"
        >
          {t("report_details")}
        </Typography>
        <CardContent sx={{ width: "80%" }}>
          <Typography variant="h6" mt="2">
            {t("found_at_date")}
          </Typography>

          <Typography variant="body1">{reportData.found_date}</Typography>

          {/* <Typography mt={2} variant="h6">
            {t("email")}
          </Typography> */}

          {/* <Typography variant="body1">{reportData.location}</Typography> */}

          <Typography mt={2} variant="h6">
            {t("description")}
          </Typography>

          <Typography variant="body1">{reportData.description}</Typography>

          <Typography mt={2} variant="h6">
            {t("location")}
          </Typography>

          <Typography variant="body1">
            {reportData.recipient_details}
          </Typography>

            {/* <Typography mt={2} variant="body1"color="primary.main"> */}
          <Typography mt={2} variant="body1" color="primary.main">
            {t("complete_payment_instruction")}
          </Typography>

          {/* <img
          //development
            src={`http://localhost:5000${reportData.file}`}
            //production
            src={`${API_URL}${reportData.file}`}
            onClick={() => setOpenImage(true)}
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "auto",
              marginTop: "1rem",
              borderRadius: "12px",
              objectFit: "contain",
              cursor: "pointer",
              display: "block",
            }}
          /> */}
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
