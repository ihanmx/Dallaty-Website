// hooks
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// React-dom
import { Link } from "react-router-dom";

// local components
import LanguageSwitch from "./LanguageSwitch";

// imgs
import mainLogo from "../images/mainLogo.png";

// MUI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

//MUI icons
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuIcon from "@mui/icons-material/Menu";

// import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
// import DeviceUnknownOutlinedIcon from "@mui/icons-material/DeviceUnknownOutlined";
// import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";

const Navbar = () => {
  // States and hooks
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    document.documentElement.dir = i18n.dir(lang);
  }, [lang]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Lost Something", path: "/lostform" },
    { label: "Found Something", path: "/foundform" },
  ];

  //handlers
  const handleMenuClick = () => {
    setOpen(!open);
  };

  const handleLanguageChange = () => {
    const newLang = lang === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  return (
    //nav container
    <AppBar
      position="fixed"
      sx={{ bgcolor: (theme) => theme.palette.light.main, boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={mainLogo}
            alt="Logo"
            style={{ width: 80, height: 80, marginRight: 10 }}
          />
        </Box>

        {/* Navigation Buttons (desktop) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {navItems.map((item) => (
            <Link key={item.label} to={item.path}>
              <Button
                onClick={() => setActive(item.label)}
                sx={{
                  color: active === item.label ? "primary.main" : "black3.main",
                  fontWeight: active === item.label ? 700 : 500,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "primary.light",
                  },
                }}
              >
                {t(item.label)}
              </Button>
            </Link>
          ))}
          {/* <LanguageSwitch
            checked={i18n.language === "ar"}
            onChange={handleLanguageChange}
            inputProps={{ "aria-label": "language switch" }}
          /> */}

          <Button variant="outlined" onClick={handleLanguageChange}>
            {i18n.language === "en" ? "عربي" : "English"}
          </Button>
        </Box>

        {/* Hamburger menu (mobile) */}
        <IconButton
          size="large"
          edge="end"
          color="primary"
          aria-label="menu"
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={handleMenuClick}
        >
          {open ? <CloseRoundedIcon /> : <MenuIcon />}
        </IconButton>
        {open && (
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              right: 0,
              width: "100%",
              bgcolor: (theme) => theme.palette.light.main,
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              alignItems: "center",
              py: 2,
            }}
          >
            {navItems.map((item) => (
              <Link to={item.path} key={item.label}>
                <Button
                  onClick={() => {
                    setActive(item.label);
                    setOpen(false);
                  }}
                  sx={{
                    color:
                      active === item.label ? "primary.main" : "text.primary",
                    fontWeight: active === item.label ? 700 : 500,
                    textTransform: "none",
                    my: 1,
                  }}
                >
                  {t(item.label)}
                </Button>
              </Link>
            ))}

            <Button variant="outlined" onClick={handleLanguageChange}>
              {i18n.language === "en" ? "عربي" : "English"}
            </Button>

            {/* <LanguageSwitch
              checked={i18n.language === "ar"}
              onChange={handleLanguageChange}
              inputProps={{ "aria-label": "language switch" }}
            /> */}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
