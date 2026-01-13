//MUI components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//locale images
import MVPlogo from "../images/MVPlogo1.png";
import garageLogo from "../images/garageLogo.png";
//i18 next
import { useTranslation } from "react-i18next";
//framer motion
import { motion } from "framer-motion";
//local components
import HoverMotion from "./HoverMotion";

const TrustedBySection = () => {
  const { t } = useTranslation();

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

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Stack
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      direction="column"
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        padding: "3rem 2rem",
        boxSizing: "border-box",
        bgcolor: "#f8f9fa",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        component={motion.h2}
        variants={titleVariants}
        variant="h2"
        sx={{
          color: "primary.main",
          fontWeight: 700,
          mb: 2,
        }}
      >
        {t("Trusted By")}
      </Typography>

      <Stack
        direction="row"
        sx={{
          width: "100%",
          padding: "2rem",
          boxSizing: "border-box",
          bgcolor: "#f8f9fa",
          alignItems: "center",
          justifyContent: "center",
        }}
        gap={{ xs: 4, md: 10 }}
      >
        <HoverMotion hoverScale={1.1} hoverRotate={3}>
          <Box
            component="img"
            variants={logoVariants}
            src={garageLogo}
            alt="Garage Logo"
            sx={{
              height: { xs: 60, sm: 120, md: 120 },
              objectFit: "contain",
              filter: "grayscale(50%)",
              transition: "filter 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                filter: "grayscale(0%)",
              },
            }}
          />
        </HoverMotion>

        <HoverMotion hoverScale={1.1} hoverRotate={3}>
          <Box
            component="img"
            variants={logoVariants}
            src={MVPlogo}
            alt="MVP Logo"
            sx={{
              height: { xs: 60, sm: 120, md: 120 },
              objectFit: "contain",
              filter: "grayscale(50%)",
              transition: "filter 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                filter: "grayscale(0%)",
              },
            }}
          />
        </HoverMotion>
      </Stack>
    </Stack>
  );
};

export default TrustedBySection;
