import Stack from "@mui/material/Stack";
import mainLogo from "../images/mainLogo.png";

import { AiFillTikTok } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import DraftsIcon from "@mui/icons-material/Drafts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import HoverMotion from "./HoverMotion";
const Footer = () => {
  const { t, i18n } = useTranslation();

  const socialIconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: "spring", stiffness: 200, damping: 10 },
    },
  };

  const pages = [
    { pageName: "Home", pageLink: "/" },
    { pageName: "About", pageLink: "/about" },
    { pageName: "Lost something", pageLink: "/lostform" },
    { pageName: "Found something", pageLink: "/foundform" },
    { pageName: "FAQs", pageLink: "/about#faqs" },
  ];

  return (
    <>
      <Stack
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: "100vw",
          maxWidth: "100vw",
          padding: "2rem",
          boxSizing: "border-box",
          bgcolor: (theme) => theme.palette.dark.main,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {/* logo and social */}

        <Stack
          direction="column"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <motion.img
            src={mainLogo}
            style={{ height: "10rem", width: "auto" }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          />

          {/* Social container */}

          <Stack
            direction="row"
            gap={1}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            {/* the size by px */}
            <HoverMotion>
              <Link component="a" href="https://x.com/dhallaty?s=21">
                <FaSquareXTwitter size={40} color="#9ab5ae" />
              </Link>
            </HoverMotion>

            <HoverMotion>
              <Link
                component="a"
                href="https://www.linkedin.com/company/%D8%B6%D8%A7%D9%84%D8%AA%D9%8A-dhallaty/posts/?feedView=all"
              >
                <FaLinkedin size={40} color="#9ab5ae" />
              </Link>
            </HoverMotion>

            <HoverMotion>
              <Link
                component="a"
                href="https://www.instagram.com/dhallaty?igsh=MTEwem0ydjl5Yzd6dA%3D%3D"
              >
                <AiFillInstagram size={43} color="#9ab5ae" />
              </Link>
            </HoverMotion>

            <HoverMotion>
              <Link
                component="a"
                href="https://www.tiktok.com/@dhallaty_?_t=ZS-8zbd5sc7bDp&_r=1"
              >
                <AiFillTikTok size={43} color="#9ab5ae" />
              </Link>
            </HoverMotion>
          </Stack>
        </Stack>

        {/* Navigation */}

        <Stack
          direction={{ xs: "row", md: "column" }}
          flexWrap="wrap"
          sx={{ justifyContent: "center", mb: 2 }}
          gap={2}
        >
          <Typography
            variant="h6"
            sx={{
              color: "white",
              mb: "1rem",
              display: { xs: "none", md: "block" },
            }}
          >
            {t("Site map")}
          </Typography>

          {pages.map((page) => {
            return (
              <Link
                component={motion.a}
                whileHover={{ scale: 1.05, x: 5 }}
                to={page.pageLink}
                href="#"
                variant="body1"
                sx={{
                  color: "white",
                  transition: "color 0.3s ease",
                  fontWeight: 500,
                  "&:hover": {
                    color: (theme) => theme.palette.secondary.main,
                  },
                }}
              >
                {t(page.pageName)}
              </Link>
            );
          })}
        </Stack>

        {/* contact us*/}
        {/* container */}
        <Stack direction="column" sx={{ mt: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              mb: "1rem",
            }}
          >
            {t("Contact us")}
          </Typography>
          {/* mail */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <DraftsIcon sx={{ color: "white" }} />
            <Link
              href="mailto:support@dhallaty.sa"
              underline="hover"
              sx={{ color: "white" }}
              variant="body1"
            >
              support@dhallaty.sa
            </Link>
          </Stack>

          {/* Location */}

          <Stack direction="row" alignItems="center" spacing={1}>
            <LocationOnIcon
              sx={{ color: (theme) => theme.palette.light.main }}
            />
            <Link
              href="https://maps.app.goo.gl/PHGy8JCYLav7FFZb7"
              underline="hover"
              sx={{ color: "white" }}
              variant="body1"
            >
              The Garage, Riyadh
            </Link>
          </Stack>
        </Stack>
      </Stack>

      {/* copy rights */}
      <Stack
        sx={{
          width: "100vw",

          padding: "2rem",

          boxSizing: "border-box",
          bgcolor: (theme) => theme.palette.dark.main,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle1" sx={{ color: "white" }}>
          ©2025 Dhallaty, All right reserved.{" "}
        </Typography>
      </Stack>
    </>
  );
};

export default Footer;
