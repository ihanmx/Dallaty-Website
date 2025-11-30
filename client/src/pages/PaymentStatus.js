import { useEffect, useState } from "react";

//MUI components

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from "@mui/material/CircularProgress";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Stack from "@mui/material/Stack";

// Router
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// i18-next
import { useTranslation } from "react-i18next";

export default function PaymentStatus() {
  const { reportId } = useParams(); // e.g., /payment/:reportId
  const query = new URLSearchParams(window.location.search);
  const alreadyPaid = query.get("alreadyPaid") === "true";
  const error = query.get("error");

  const [status, setStatus] = useState("in_progress");
  const { t } = useTranslation();

  const statusInfo = {
    success: {
      message: t("payment_success_message"),
      description: t("payment_success_message_describtion"),
      icon: (
        <CheckCircleIcon
          sx={{ fontSize: { xs: 60, md: 90, lg: 100 }, color: "green" }}
        />
      ),
    },
    fail: {
      message: t("payment_fail_message"),
      description: t("payment_fail_message_describtion"),
      icon: (
        <CancelIcon
          sx={{ fontSize: { xs: 60, md: 90, lg: 100 }, color: "red" }}
        />
      ),
    },
    in_progress: {
      message: t("payment_progress_message"),
      description: t("payment_progress_message_describtion"),
      icon: <CircularProgress size={80} />,
    },
    server_error: {
      message: t("payment_server_error_message"),
      description: t("payment_server_error_message_describtion"),
      icon: (
        <WarningRoundedIcon
          sx={{ fontSize: { xs: 60, md: 90, lg: 100 }, color: "orange" }}
        />
      ),
    },
    payed: {
      message: t("payment_already_success_message"),
      description: t("payment_already_success_message_describtion"),
      icon: (
        <CheckCircleIcon
          sx={{ fontSize: { xs: 60, md: 90, lg: 100 }, color: "green" }}
        />
      ),
    },

    unautharized_paymentToken: {
      message: t("payment_unautharized_paymentToken_message"),
      description: t("payment_unautharized_paymentToken_describtion"),
      icon: (
        <WarningRoundedIcon
          sx={{ fontSize: { xs: 60, md: 90, lg: 100 }, color: "orange" }}
        />
      ),
    },

    unautharized_reportId: {
      message: t("payment_unautharized_reportId_message"),
      description: t("payment_unautharized_reportId_describtion"),
      icon: (
        <WarningRoundedIcon
          sx={{ fontSize: { xs: 60, md: 90, lg: 100 }, color: "orange" }}
        />
      ),
    },
  };

  const { message, description, icon } =
    statusInfo[status] || statusInfo["server_error"];

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/payment-status/${reportId}`
        );
        const data = await res.json();
        if (alreadyPaid) {
          //from url query
          setStatus("payed");
          clearInterval(interval);
        } else if (error === "invalidToken") {
          setStatus("unautharized_paymentToken");
          clearInterval(interval);
        } else if (error === "serverError") {
          setStatus("server_error");
          clearInterval(interval);

          //from res status
        } else if (data.status === "success") {
          setStatus("success");

          clearInterval(interval);
        } else if (data.status === "failed" || data.status === "declined") {
          setStatus("fail");
          clearInterval(interval);
        } else if (data.status === "not_found") {
          setStatus("unautharized_reportId");
          clearInterval(interval);
        } else if (data.status === "error") {
          setStatus("server_error");
          clearInterval(interval);
        } else {
          setStatus("in_progress");
        }
      } catch (err) {
        console.error(err);

        setStatus("server_error");
      }
    };

    // poll every 5 seconds for updates
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval); //to clean when unmount
  }, [reportId, alreadyPaid]);

  return (
    <Stack
      direction="column"
      textAlign="center"
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        background: "linear-gradient(135deg, #11747f 0%, #385e5b 100%)",
      }}
    >
      <Card
        sx={{
          width: { xs: "70%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 5, md: 6, lg: 10 },
        }}
      >
        {icon}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {message}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          {status !== "in_progress" && (
            <Link to="/home">
              <Button variant="contained" size="small">
                {t("Homepage")}
              </Button>
            </Link>
          )}
        </CardActions>
      </Card>
    </Stack>
  );
}
