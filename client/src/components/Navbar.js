// hooks
import { useTranslation } from "react-i18next";
import { useState } from "react";

// React-dom
import { Link } from "react-router-dom";

// imgs
import mainLogo from "../images/mainLogo.png";

// MUI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

//MUI icons
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  // States and hooks
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);
  const [langMenuAnchor, setLangMenuAnchor] = useState(null);
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
  ];

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

  const handleNavClick = (label) => {
    setActive(label);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLanguageMenuOpen = (event) => {
    setLangMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLangMenuAnchor(null);
  };

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    handleLanguageMenuClose();
  };

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    //nav container
    <AppBar
      component={motion.div} //act as div that wrapped by motion to use framer motion
      initial={{ y: -100 }} //slide the nav in whan we land from -100 to 0 which is the normal place
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }} //type of motion and duration
      position="fixed" //to stay in the place even when you scroll
      sx={{
        bgcolor: "#f8f9fa",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
        backdropFilter: "blur(10px)", //blur effect on images
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
        }}
      >
        {/* Logo */}
        <Link to="/" onClick={() => handleNavClick("Home")}>
          <Box
            component={motion.div}
            whileHover={{ scale: 1.05 }} //to change the size of logo while hoover with mouse
            whileTap={{ scale: 0.95 }} //to change the size of logo while tapping on phones
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <img
              src={mainLogo}
              alt="Logo"
              style={{ width: 80, height: 80, marginRight: 10 }}
            />
          </Box>
        </Link>

        {/* Navigation Buttons (desktop) */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            alignItems: "center",
          }}
        >
          {navItems.map((item, index) => (
            <Link key={item.label} to={item.path}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item.label)}
                sx={{
                  color: active === item.label ? "primary.main" : "black3.main",
                  fontWeight: active === item.label ? 700 : 500, // add css to selected items
                  textTransform: "none", // to remove capitalization MUI
                  position: "relative", //to add absolute tab indicator
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "primary.light",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: active === item.label ? "100%" : "0%", //apply the indicator oly on active tab
                    height: "3px",
                    backgroundColor: "primary.main",
                    transition: "width 0.3s ease", //animate the indicator from 0 to 100 width
                  },
                  "&:hover::after": {
                    width: "100%", //on hover will show indicators motion even if the tab not active
                  },
                }}
              >
                {t(item.label)}
              </Button>
            </Link>
          ))}

          {/* Language Selector */}
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLanguageMenuOpen}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              px: 2,
              py: 1,
              border: "1px solid",
              borderColor: "primary.main",
              color: "primary.main",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
              "& .MuiButton-endIcon": {
                marginLeft: "5px",
                marginRight: "5px",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span>{currentLanguage?.name}</span>
            </Box>
          </Button>

          <Menu
            anchorEl={langMenuAnchor} //to open when I click on a specific elements
            open={Boolean(langMenuAnchor)}
            onClose={handleLanguageMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              mt: 1,
              "& .MuiPaper-root": {
                borderRadius: 2,
                minWidth: 160,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            {languages.map((lang) => (
              <MenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                selected={i18n.language === lang.code}
                sx={{
                  py: 1.5,
                  px: 2,
                  "&.Mui-selected": {
                    backgroundColor: "primary.light",
                    "&:hover": {
                      backgroundColor: "primary.light",
                    },
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <span style={{ fontWeight: 500 }}>{lang.name}</span>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Hamburger menu (mobile) */}
        <IconButton
          component={motion.button}
          whileTap={{ scale: 0.9 }}
          size="large"
          edge="end"
          color="primary"
          aria-label="menu"
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={handleMenuClick}
        >
          {open ? <CloseRoundedIcon /> : <MenuIcon />}
        </IconButton>

        <AnimatePresence>
          {open && (
            <Box
              component={motion.div}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              sx={{
                position: "absolute",
                top: "100%",
                right: 0,
                width: "100%",
                bgcolor: "#f8f9fa",
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
                alignItems: "center",
                py: 2,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              {navItems.map((item, index) => (
                <Link to={item.path} key={item.label}>
                  <Button
                    component={motion.button}
                    custom={index}
                    variants={menuItemVariants}
                    fontSize="h6"
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleNavClick(item.label);
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

              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLanguageMenuOpen}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  border: "1px solid",
                  borderColor: "primary.main",
                  color: "primary.main",
                  "& .MuiButton-endIcon": {
                    marginLeft: "5px",
                    marginRight: "5px",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span style={{ fontSize: "1.2rem" }}>
                    {currentLanguage?.flag}
                  </span>
                  <span>{currentLanguage?.name}</span>
                </Box>
              </Button>
            </Box>
          )}
        </AnimatePresence>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
