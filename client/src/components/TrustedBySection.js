import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MVPlogo from "../images/MVPlogo1.png";
import garageLogo from "../images/garageLogo2.png";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const TrustedBySection = () => {
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
        bgcolor: "primary.main",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        component={motion.h2}
        variants={titleVariants}
        variant="h2"
        sx={{
          color: (theme) => theme.palette.dark.main,
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
          bgcolor: "primary.main",
          alignItems: "center",
          justifyContent: "center",
        }}
        gap={{ xs: 4, md: 10 }}
      >
        <Box
          component={motion.img}
          variants={logoVariants}
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.2 },
          }}
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

        <Box
          component={motion.img}
          variants={logoVariants}
          whileHover={{
            scale: 1.1,
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.5 },
          }}
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
      </Stack>
    </Stack>
  );
};

export default TrustedBySection;
