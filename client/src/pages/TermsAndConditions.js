// Main Terms and Conditions page component
import { Container, Typography, Box, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
  const { t } = useTranslation();

  const sections = t("terms.sections", { returnObjects: true });
  const lastUpdate = t("terms.lastUpdate", { returnObjects: true });
  const pageTitle = t("terms.pageTitle", { returnObjects: true });
  const WEBSITE_URL = "https://dhallaty.sa";
  if (!Array.isArray(sections)) return null;

  return (
    <Box sx={{ bgcolor: "#f8fafb", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4 }}>
          <Typography
            variant="h4"
            align="center"
            fontWeight={700}
            gutterBottom
            sx={{ fontFamily: "inherit" }}
          >
            {pageTitle}
          </Typography>

          <Typography
            variant="subtitle2"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            {lastUpdate}
          </Typography>
          {sections.map((section) => (
            <Box key={section.id} sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {section.title}
              </Typography>

              {section.items.map((item, index) => (
                <Typography key={index} paragraph>
                  {item}
                </Typography>
              ))}

              {section.hasWebsite && (
                <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer">
                  {WEBSITE_URL}{" "}
                </a>
              )}
            </Box>
          ))}
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsAndConditions;
