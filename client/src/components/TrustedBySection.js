import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MVPlogo from "../images/MVPlogo1.png";
import garageLogo from "../images/garageLogo2.png";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

const TrustedBySection = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack
      direction="column"
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        padding: "2rem",
        boxSizing: "border-box",
        bgcolor: (theme) => theme.palette.light.main,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{ color: (theme) => theme.palette.dark.main }}
      >
        {t("Trusted By")}
      </Typography>

      <Stack
        direction="row"
        sx={{
          width: "100%",
          padding: "2rem",
          boxSizing: "border-box",
          bgcolor: (theme) => theme.palette.light.main,
          alignItems: "center",
          justifyContent: "center",
        }}
        gap={{ xs: 4, md: 10 }}
      >
        <Box
          component="img"
          src={garageLogo}
          alt="Landing Page"
          sx={{
            height: { xs: 60, sm: 120, md: 120 }, // responsive image height

            objectFit: "contain",
          }}
        />

        <Box
          component="img"
          src={MVPlogo}
          alt="Landing Page"
          sx={{
            height: { xs: 60, sm: 120, md: 120 }, // responsive image height

            objectFit: "contain",
          }}
        />
      </Stack>
    </Stack>
  );
};

export default TrustedBySection;
