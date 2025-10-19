import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const AboutPage = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: "faq_verify_match",
      answer: "faq_verify_match_answer",
    },
    {
      question: "faq_service_fee",
      answer: "faq_service_fee_answer",
    },
    {
      question: "faq_ambassadors",
      answer: "faq_ambassadors_answer",
    },
    {
      question: "faq_delivery",
      answer: "faq_delivery_answer",
    },
    {
      question: "faq_duration",
      answer: "faq_duration_answer",
    },
  ];

  const features = [
    {
      icon: <SearchIcon sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "Smart Matching",
      description:
        "Our advanced algorithm matches lost items with found reports using detailed descriptions and AI technology.",
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "Fast Response",
      description:
        "Get instant notifications when a potential match is found, helping you reunite with your items quickly.",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "Secure Platform",
      description:
        "Your personal information is protected with industry-standard encryption and security measures.",
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "Verified Users",
      description:
        "All users are verified to ensure a trustworthy community of helpers and seekers.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Items Reported" },
    { number: "7,500+", label: "Items Reunited" },
    { number: "15,000+", label: "Active Users" },
    { number: "95%", label: "Success Rate" },
  ];

  const values = [
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Community First",
      description:
        "We believe in the power of community helping each other find lost belongings.",
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Continuous Innovation",
      description:
        "We constantly improve our platform to provide the best lost and found experience.",
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Trust & Transparency",
      description:
        "Building trust through transparent processes and verified user interactions.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        id="hero-section"
        sx={{
          background: "linear-gradient(135deg, #11747f 0%, #385e5b 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontWeight: 700,
                mb: 3,
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {t("About Dhallaty")}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.8,
                fontWeight: 400,
              }}
            >
              {t("about_hero_description")}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            align="center"
            color="primary.main"
            sx={{ fontWeight: 700, mb: 4 }}
          >
            {t("Our Mission")}
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              maxWidth: 900,
              mx: "auto",
              fontSize: "1.1rem",
              lineHeight: 2,
              color: "text.secondary",
              mb: 6,
            }}
          >
            {t("mission_description")}
          </Typography>
        </motion.div>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 6, md: 4, lg: 3 }} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  sx={{
                    textAlign: "center",
                    py: 4,
                    background:
                      "linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Typography
                    variant="h3"
                    color="primary.main"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    {t(stat.label)}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: "#f8f9fa", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            color="primary.main"
            sx={{ fontWeight: 700, mb: 6 }}
          >
            {t("Why Choose Dhallaty?")}
          </Typography>
          <Grid
            container
            spacing={4}
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <Grid item size={{ xs: 12, md: 6 }} key={index}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: "100%",
                      p: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                      <Typography
                        variant="h5"
                        color="primary.main"
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        {t(feature.title)}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.8 }}
                      >
                        {t(feature.description)}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h3"
          align="center"
          color="primary.main"
          sx={{ fontWeight: 700, mb: 6 }}
        >
          {t("Our Values")}
        </Typography>
        <Grid
          container
          spacing={4}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <Grid item size={{ xs: 12, md: 12, lg: 4 }} key={index}>
              <motion.div variants={itemVariants}>
                <Stack
                  alignItems="center"
                  spacing={2}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#f8f9fa",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {value.icon}
                  <Typography
                    variant="h5"
                    color="primary.main"
                    sx={{ fontWeight: 600, textAlign: "center" }}
                  >
                    {t(value.title)}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textAlign: "center", lineHeight: 1.8 }}
                  >
                    {t(value.description)}
                  </Typography>
                </Stack>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: "#f8f9fa", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            color="primary.main"
            sx={{ fontWeight: 700, mb: 6 }}
          >
            {t("How It Works")}
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                step: "1",
                title: "Report Your Item",
                description:
                  "Fill out a detailed form about your lost or found item with description and photo.",
              },
              {
                step: "2",
                title: "We Match & Notify",
                description:
                  "Our system automatically matches reports and sends instant notifications.",
              },
              {
                step: "3",
                title: "Connect & Reunite",
                description:
                  "Connect with the finder or owner and arrange safe item return.",
              },
            ].map((step, index) => (
              <Grid item size={{ xs: 12, md: 12, lg: 4 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      p: 4,
                      textAlign: "center",
                      position: "relative",
                      overflow: "visible",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: -20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        boxShadow: "0 4px 15px rgba(17, 116, 127, 0.3)",
                      }}
                    >
                      {step.step}
                    </Box>
                    <CardContent sx={{ mt: 4 }}>
                      <Typography
                        variant="h5"
                        color="primary.main"
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        {t(step.title)}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.8 }}
                      >
                        {t(step.description)}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container id="faqs" maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h3"
          align="center"
          color="primary.main"
          sx={{ fontWeight: 700, mb: 6 }}
        >
          {t("Frequently Asked Questions")}
        </Typography>
        <Box sx={{ maxWidth: 900, mx: "auto" }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleAccordionChange(`panel${index}`)}
                sx={{
                  mb: 2,
                  borderRadius: "12px !important",
                  border: "2px solid",
                  borderColor:
                    expanded === `panel${index}` ? "primary.main" : "#e0e0e0",
                  boxShadow:
                    expanded === `panel${index}`
                      ? "0 4px 20px rgba(17, 116, 127, 0.2)"
                      : "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:before": {
                    display: "none",
                  },
                  "&:hover": {
                    borderColor: "primary.light",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        color:
                          expanded === `panel${index}`
                            ? "primary.main"
                            : "text.secondary",
                        fontSize: 28,
                      }}
                    />
                  }
                  sx={{
                    py: 2,
                    px: 3,
                    "& .MuiAccordionSummary-content": {
                      my: 1,
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color:
                        expanded === `panel${index}`
                          ? "primary.main"
                          : "text.primary",
                    }}
                  >
                    {t(faq.question)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    px: 3,
                    pb: 3,
                    pt: 0,
                    bgcolor: "#f8f9fa",
                    borderTop: "1px solid #e0e0e0",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8 }}
                  >
                    {t(faq.answer)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Container
        maxWidth="md"
        sx={{ py: { xs: 6, md: 10 }, textAlign: "center" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            color="primary.main"
            sx={{ fontWeight: 700, mb: 3 }}
          >
            {t("Join Our Community")}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 4 }}
          >
            {t("join_community_description")}
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutPage;
