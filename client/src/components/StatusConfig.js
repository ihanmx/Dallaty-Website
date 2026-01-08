import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from "@mui/material/CircularProgress";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

const statusInfo = (
  t //this ( ) means return
) => ({
  //t is the translation function from i=18-next
  payment_success: {
    message: t("payment_success_message"),
    description: t("payment_success_message_describtion"),
    icon: (
      <CheckCircleIcon
        sx={{ fontSize: { xs: 60, md: 90, lg: 100 }, color: "green" }}
      />
    ),
  },
  payment_fail: {
    message: t("payment_fail_message"),
    description: t("payment_fail_message_describtion"),
    icon: (
      <CancelIcon
        sx={{ fontSize: { xs: 60, md: 90, lg: 100 }, color: "red" }}
      />
    ),
  },
  payment_in_progress: {
    message: t("payment_progress_message"),
    description: t("payment_progress_message_describtion"),
    icon: <CircularProgress size={80} />,
  },
  payment_server_error: {
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

  item_details_bad_request: {
    message: t("item_details_bad_request_message"),
    description: t("item_details_bad_request_describtion"),
    icon: (
      <WarningRoundedIcon
        sx={{ fontSize: { xs: 60, md: 90, lg: 100 }, color: "orange" }}
      />
    ),
  },

  item_details_not_found: {
    message: t("item_details_not_found_message"),
    description: t("item_details_not_found_describtion"),
    icon: (
      <WarningRoundedIcon
        sx={{ fontSize: { xs: 60, md: 90, lg: 100 }, color: "orange" }}
      />
    ),
  },

  item_details_server_error: {
    message: t("item_details_server_error_message"),
    description: t("item_details_server_error_describtion"),
    icon: (
      <WarningRoundedIcon
        sx={{ fontSize: { xs: 60, md: 90, lg: 100 }, color: "orange" }}
      />
    ),
  },
});

export default statusInfo;
