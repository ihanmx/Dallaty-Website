// i18-next
import { useTranslation } from "react-i18next";

//Router-dom
import { Link } from "react-router-dom";

//local images
import landpageImage from "../images/landpageImage.png";

//MUI components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

//MUI icons
import DeviceUnknownOutlinedIcon from "@mui/icons-material/DeviceUnknownOutlined";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";

// Framer Motion
import { motion } from "framer-motion";

const LandingPage = () => {
  const { t, i18n } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <>
      {/* // Main container */}
      <Stack
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
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

          background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
        }}
      >
        {/* left side (buttons and typogrophy) */}
        <Stack
          component={motion.div}
          variants={textVariants}
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
            order: { xs: 2, md: 1 },
            boxSizing: "border-box",
          }}
        >
          {/* Typography stack */}
          <Stack
            id="text-stack"
            className="Typography-Stack"
            direction={"column"}
            gap={2}
          >
            <Typography
              textAlign={"center"}
              variant="h4"
              color="primary.main"
              sx={{
                pb: { xs: 1, md: 2 },
                fontWeight: 700,
              }}
            >
              {t("We work on")}{" "}
              <Typography
                component={motion.span}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                color="secondary.main"
                variant="h3"
                sx={{
                  // fontWeight: 800,
                  background:
                    "linear-gradient(45deg, #9ab5ae 30%, #11747f 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("matching")}
              </Typography>{" "}
              {t("lost items reports with those who find them")}
            </Typography>

            <Typography
              textAlign={"center"}
              variant="h3"
              color="secondary.main"
              sx={{
                fontWeight: 600,
              }}
            >
              {t("Precisely, Quickly, and Securely")}
            </Typography>
          </Stack>

          {/* Buttons stack */}
          <Stack
            id="buttons-stack"
            className="Buttons-Stack"
            direction={{ xs: "column", md: "row" }}
            sx={{ justifyContent: "center", alignItems: "center" }}
            gap={2}
            mt={4}
          >
            <Link to="/lostform">
              <Button
                size="large"
                component={motion.button}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                variant="contained"
                startIcon={<DeviceUnknownOutlinedIcon sx={{ ml: 1 }} />}
                sx={{
                  bgcolor: "primary.main",
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: "1rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 15px rgba(17, 116, 127, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(17, 116, 127, 0.4)",
                  },
                }}
              >
                {t("Lost Something")}
              </Button>
            </Link>

            <Link to="/foundform">
              <Button
                size="large"
                component={motion.button}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                variant="outlined"
                startIcon={<ScreenSearchDesktopOutlinedIcon sx={{ ml: 1 }} />}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderWidth: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderWidth: 2,
                    backgroundColor: "rgba(17, 116, 127, 0.05)",
                  },
                }}
              >
                {t("Found Something")}
              </Button>
            </Link>
          </Stack>
        </Stack>

        {/* right side (image) */}
        <Stack
          component={motion.div}
          variants={imageVariants}
          id="image-container"
          sx={{
            height: { md: "100%", xs: "50%" },
            maxHeight: { md: "100%", xs: "50%" },
            maxWidth: { md: "55%", xs: "90%" },
            width: { md: "55%", xs: "100%" },
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            order: { xs: 1, md: 2 },
          }}
        >
          <Box
            component={motion.img}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
            src={landpageImage}
            alt="Landing Page"
            sx={{
              width: "90%",
              height: { xs: "100%", md: "80%" },
              objectFit: "contain",
              filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15))",
            }}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default LandingPage;
