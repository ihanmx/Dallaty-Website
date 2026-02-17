import { useEffect, useState } from "react";

//MUI components

import statusInfo from "../components/StatusConfig";

// Router

import { useParams } from "react-router-dom";

// i18-next
import { useTranslation } from "react-i18next";
import StatusMessage from "../components/StatusMessage";
//api config

import config from "../config/index";

import axios from "../api/axios";

export default function PaymentStatus() {
  const { reportId } = useParams(); // e.g., /payment/:reportId
  const query = new URLSearchParams(window.location.search);
  const alreadyPaid = query.get("alreadyPaid") === "true";
  const error = query.get("error");

  const [status, setStatus] = useState("payment_in_progress");
  const { t } = useTranslation();
  const { apiUrl } = config;

  const { message, description, icon } =
    statusInfo(t)[status] || statusInfo(t)["payment_server_error"];
  //note this structure calling statusInfo function sends (t) to it for translation
  //and since statusInfo return object we used [] to acceess it based on our dynamic key status

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          //development
          `/api/payment-status/${reportId}`,
          //production
          // `${API_URL}/api/payment-status/${reportId}`
        );
        const data = res.data;
        if (alreadyPaid) {
          //from url query
          setStatus("payed");
          clearInterval(interval);
        } else if (error === "invalidToken") {
          setStatus("unautharized_paymentToken");
          clearInterval(interval);
        } else if (error === "serverError") {
          setStatus("payment_server_error");
          clearInterval(interval);

          //from res status
        } else if (data.status === "success") {
          setStatus("payment_success");

          clearInterval(interval);
        } else if (data.status === "failed" || data.status === "declined") {
          setStatus("payment_fail");
          clearInterval(interval);
        } else if (data.status === "not_found") {
          setStatus("unautharized_reportId");
          clearInterval(interval);
        } else if (data.status === "error") {
          setStatus("payment_server_error");
          clearInterval(interval);
        } else {
          setStatus("payment_in_progress");
        }
      } catch (err) {
        console.error(err);

        setStatus("payment_server_error");
      }
    };

    // poll every 5 seconds for updates
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval); //to clean when unmount
  }, [reportId, alreadyPaid]);

  return (
    <StatusMessage
      message={message}
      description={description}
      icon={icon}
      showHomepage={status !== "payment_in_progress"}
    />
  );
}
