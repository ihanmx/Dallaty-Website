// Admin login page for Dhallaty
// This page is based on the LostForm page structure and MUI design

import React, { useState } from "react";
import { Box, Typography, TextField, Button, InputLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import design1 from "../images/design1.png";

const AdminLogin = () => {
  // State for email and password fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  // Handle email input change
  const handleEmailChange = (e) => setEmail(e.target.value);
  // Handle password input change
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement admin login logic here
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <Box
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: "80%", sm: "70%", md: "50%", lg: "45%" },
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          borderRadius: "8px",
          p: { xs: "1rem", md: "1.5rem" },
          mt: 2,
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h3"
          color="primary.main"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontFamily: "inherit",
            mb: 1,
          }}
        >
          {t("Admin Login")}
        </Typography>

        {/* Email label and input */}
        <InputLabel
          htmlFor="email-input"
          sx={{
            mt: 2,
            width: i18n.language === "ar" ? "100%" : "65%",
            color: "#222",
            fontWeight: 600,
            fontSize: 20,
            textAlign: i18n.language === "ar" ? "right" : "left",
            direction: i18n.language === "ar" ? "rtl" : "ltr",
          }}
        >
          {t("Email")} <span style={{ color: "red" }}>*</span>
        </InputLabel>
        <TextField
          required
          name="email"
          id="email-input"
          type="email"
          placeholder={t("Enter your email")}
          fullWidth
          size="small"
          value={email}
          onChange={handleEmailChange}
          InputProps={{
            sx: {
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              fontSize: 18,
              color: "#222",
              textAlign: "left",
            },
          }}
        />

        {/* Password label and input */}
        <InputLabel
          htmlFor="password-input"
          sx={{
            mt: 2,
            width: i18n.language === "ar" ? "100%" : "65%",
            color: "#222",
            fontWeight: 600,
            fontSize: 20,
            textAlign: i18n.language === "ar" ? "right" : "left",
            direction: i18n.language === "ar" ? "rtl" : "ltr",
          }}
        >
          {t("Password")} <span style={{ color: "red" }}>*</span>
        </InputLabel>
        <TextField
          required
          name="password"
          id="password-input"
          type="password"
          placeholder={t("Enter your password")}
          fullWidth
          size="small"
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            sx: {
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              fontSize: 18,
              color: "#222",
              textAlign: "left",
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            width: "40%",
            alignSelf: "center",
            textTransform: "none",
            fontWeight: 600,
            fontSize: 18,
          }}
          disabled={loading}
        >
          {loading ? t("Logging In...") : t("Login")}
        </Button>
      </Box>
    </Box>
  );
};

export default AdminLogin;
