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

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <Stack
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
            // order: { xs: 3, md: 1 },
          }}
        >
          <img src={mainLogo} style={{ height: "10rem", width: "auto" }} />

          {/* Social container */}

          <Stack
            direction="row"
            gap={1}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            {/* the size by px */}

            <Link href="https://x.com/dhallaty?s=21">
              <FaSquareXTwitter size={40} color="#9ab5ae" />
            </Link>

            <Link href="https://www.linkedin.com/company/%D8%B6%D8%A7%D9%84%D8%AA%D9%8A-dhallaty/posts/?feedView=all">
              <FaLinkedin size={40} color="#9ab5ae" />
            </Link>

            <Link href="https://www.instagram.com/dhallaty?igsh=MTEwem0ydjl5Yzd6dA%3D%3D">
              <AiFillInstagram size={43} color="#9ab5ae" />
            </Link>

            <Link href="https://www.tiktok.com/@dhallaty_?_t=ZS-8zbd5sc7bDp&_r=1">
              <AiFillTikTok size={43} color="#9ab5ae" />
            </Link>
          </Stack>
        </Stack>

        {/* Navigation */}

        <Stack
          direction={{ xs: "row", md: "column" }} // row on small screens, column on large
          flexWrap="wrap" // allows wrapping when items overflow
          sx={{ justifyContent: "center", mb: 2 }}
          gap={2}
        >
          <Typography
            variant="h4"
            sx={{
              color: (theme) => theme.palette.light.main,
              mb: "1rem",
              display: { xs: "none", md: "block" },
            }}
          >
            {t("Site map")}
          </Typography>
          <Link
            component={RouterLink}
            to="/"
            variant="h6"
            href="#"
            sx={{ color: (theme) => theme.palette.light.main }}
          >
            {t("Home")}
          </Link>
          <Link
            component={RouterLink}
            to="/about"
            variant="h6"
            href="#"
            sx={{ color: (theme) => theme.palette.light.main }}
          >
            {t("About")}
          </Link>
          <Link
            component={RouterLink}
            to="/lostform"
            variant="h6"
            href="#"
            sx={{ color: (theme) => theme.palette.light.main }}
          >
            {t("Lost something")}
          </Link>
          <Link
            component={RouterLink}
            to="foundform"
            variant="h6"
            href="#"
            sx={{ color: (theme) => theme.palette.light.main }}
          >
            {t("Found something")}
          </Link>
          <Link
            component={RouterLink}
            to="/about"
            variant="h6"
            href="#"
            sx={{ color: (theme) => theme.palette.light.main }}
          >
            {t("FAQs")}
          </Link>
        </Stack>

        {/* contact us*/}
        {/* container */}
        <Stack direction="column" sx={{ mt: 1 }}>
          <Typography
            variant="h4"
            sx={{
              color: (theme) => theme.palette.light.main,
              mb: "1rem",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {t("Contact us")}
          </Typography>
          {/* mail */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <DraftsIcon sx={{ color: (theme) => theme.palette.light.main }} />
            <Link
              href="mailto:support@dhallaty.sa"
              underline="hover"
              sx={{ color: (theme) => theme.palette.light.main }}
              variant="h6"
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
              sx={{ color: (theme) => theme.palette.light.main }}
              variant="h6"
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
        <Typography
          variant="subtitle1"
          sx={{ color: (theme) => theme.palette.light.main }}
        >
          ©2025 Dhallaty, All right reserved.{" "}
        </Typography>
      </Stack>
    </>
  );
};

export default Footer;
