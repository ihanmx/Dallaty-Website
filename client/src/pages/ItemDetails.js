import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
//local images
import design1 from "../images/design1.png";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import Modal from "@mui/material/Modal";

const ItemDetails = () => {
  // `http://localhost:3000/item-details/${reportId}`
  const { reportId } = useParams();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [itemDetails, setItemDetails] = useState({});
  const [openImage, setOpenImage] = useState(false);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/item-details/${reportId}`
        );

        console.log("server res with details", res);

        setItemDetails(res.data);
        console.log("item details", ItemDetails);
        setLoading(false);
      } catch (err) {
        // Axios puts backend response here
        const errStatus = err.response?.status || 500;

        if (errStatus) {
          window.location.href = `/item-details-error?status=${errStatus}`;
        } else {
          console.error("Unexpected error:", err);
          // setError("server");
        }
      }
    };

    fetchItemDetails();
  }, []);

  if (loading) {
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
          wordBreak: "break-word",
          whiteSpace: "normal",
          overflowWrap: "break-word",
        }}
      >
        {/*       //opens when penImage state is true to expand image */}
        <Modal open={openImage} onClose={() => setOpenImage(false)}>
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
              src={`http://localhost:5000${itemDetails.file}`}
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
        </Modal>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
          color="primary.main"
        >
          {t("lost_item_details")}
        </Typography>
        <CardContent sx={{ width: "80%" }}>
          <Typography variant="h6" mt="2">
            {t("found_at_date")}
          </Typography>

          <Typography variant="body1"> {itemDetails.found_date}</Typography>

          <Typography mt={2} variant="h6">
            {t("description")}
          </Typography>

          <Typography variant="body1">{itemDetails.description}</Typography>

          <Typography mt={2} variant="h6">
            {t("location")}
          </Typography>

          <Typography variant="body1">{itemDetails.location}</Typography>

          <Typography mt={2} variant="h6">
            {t("recipient_details")}
          </Typography>

          <Typography variant="body1">
            {itemDetails.recipient_details}
          </Typography>

          <Typography mt={2} variant="h6">
            {t("matched_at")}
          </Typography>

          <Typography variant="body1"> {itemDetails.matched_at}</Typography>

          <img
            src={`http://localhost:5000${itemDetails.file}`}
            alt="Found Item"
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
          />
        </CardContent>
        <CardActions>
          <Link to="/home">
            <Button variant="contained" size="small">
              {t("Home")}
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Stack>
  );
};

export default ItemDetails;
