import StatusMessage from "../components/StatusMessage";
import { useTranslation } from "react-i18next";
import statusInfo from "../components/StatusConfig";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ItemDetailsErrPage = () => {
  const [status, setStatus] = useState("in_progress");
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const { message, description, icon } =
    statusInfo(t)[status] || statusInfo(t)["item_details_server_error"];

  useEffect(() => {
    const statusCode = searchParams.get("status");

    if (statusCode === "404") setStatus("item_details_not_found");
    else if (statusCode === "400") setStatus("item_details_bad_request");
    else setStatus("server_error");
  }, []);

  return (
    <StatusMessage
      message={message}
      description={description}
      icon={icon}
      showHomepage={status !== "in_progress"}
    />
  );
};

export default ItemDetailsErrPage;
