// handelers
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

//React-dom
import { Link } from "react-router-dom";

//local components
import TrustedBySection from "./TrustedBySection";

//imgs
import landpageImage from "../images/landpageImage.png";

//MUI components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

//MUI icons
import DeviceUnknownOutlinedIcon from "@mui/icons-material/DeviceUnknownOutlined";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";

const LandingPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* // Main container */}
      <Stack
        id="container"
        direction={{ md: "row", xs: "column" }}
        justifyContent="center"
        alignItems="center"
        gap={2}
        sx={{
          height: { md: "100vh", xs: "auto" },
          maxHeight: { md: "100vh", xs: "auto" },
          minHeight: "100vh",
          width: "100%",

          maxWidth: "100%",
          boxSizing: "border-box",
          alignItems: "center",
          p: 2,

          justifyContent: "space-evenly",
          overflowX: "clip",

          // backgroundColor: "red",
        }}

        // sx={{ backgroundColor: "light.main" }}
      >
        {/* left side (buttons and typogrophy) */}

        <Stack
          id="text-container"
          sx={{
            height: { md: "100%", xs: "30%" },
            maxHeight: { md: "100%", xs: "30%" },
            width: { md: "45%", xs: "100%" },
            maxWidth: { md: "45%", xs: "100%" },

            alignItems: "center",
            justifyContent: "center",
            pr: { xs: 2, md: 1 },
            pl: { xs: 2, md: 1 },
            // backgroundColor: "green",
            order: { xs: 2, md: 1 }, // flips on small screens to show the image before the text
            boxSizing: "border-box",
          }}
        >
          {/* Typography stack */}
          <Stack
            id="text-stack"
            className="Typography-Stack"
            direction={"column"}
            //  sx={{ backgroundColor: "yellow" }}
            gap={2}
          >
            <Typography
              textAlign={"center"}
              variant="h4"
              color="primary.main"
              sx={{ pb: { xs: 1, md: 2 } }}
            >
              {t("We work on")}{" "}
              <Typography component="span" color="secondary.main" variant="h3">
                {t("matching")}
              </Typography>{" "}
              {t("lost items reports with those who find them")}
            </Typography>

            <Typography
              textAlign={"center"}
              variant="h3"
              color="secondary.main"
            >
              {t("Precisely, Quickly, and Securely")}
            </Typography>
          </Stack>

          {/* Buttons stack */}
          <Stack
            id="buttons-stack"
            className="Buttons-Stack"
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            mt={4}
          >
            <Link to="/lostform">
              <Button
                variant="contained"
                startIcon={<DeviceUnknownOutlinedIcon />}
                sx={{ bgcolor: "primary.main" }}
              >
                {t("Lost Something")}
              </Button>
            </Link>

            <Link to="/foundform">
              <Button
                variant="outlined"
                startIcon={<ScreenSearchDesktopOutlinedIcon />}
              >
                {t("Found Something")}
              </Button>
            </Link>
          </Stack>
        </Stack>

        {/* right side (image) */}
        <Stack
          id="image-container"
          sx={{
            height: { md: "100%", xs: "50%" },
            maxHeight: { md: "100%", xs: "50%" },
            maxWidth: { md: "55%", xs: "90%" },
            width: { md: "55%", xs: "100%" },
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            // backgroundColor: "blue",
            order: { xs: 1, md: 2 }, // flips on small screens to show the image before the text
          }}
        >
          <Box
            component="img"
            src={landpageImage}
            alt="Landing Page"
            sx={{
              width: "90%",
              height: { xs: "100%", md: "80%" },
              objectFit: "contain",
            }}
          />
        </Stack>
      </Stack>
      <TrustedBySection />
    </>
  );
};

export default LandingPage;
