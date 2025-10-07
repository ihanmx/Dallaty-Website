import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import mainLogo from "../images/mainLogo.png";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
// import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  // const theme = useTheme();
  // console.log(theme);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="nav-box" sx={{ flexGrow: 1, maxWidth: "100vw" }}>
      <AppBar
        className="nav-bar"
        position="fixed"
        sx={{
          boxShadow: "none",
          backgroundColor: "light.main",
        }}
      >
        <Toolbar
          className="tool-bar"
          sx={{ display: "flex", justifyContent: "space-between", p: 0 }}
        >
          {/* Left side: Logo */}
          <Box
            className="nav-logo-box"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={mainLogo}
              alt="Main Logo"
              style={{ width: "80px", height: "80px", marginRight: "10px" }}
            />
          </Box>

          {/* Right side: Navigation */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Show only on medium screens and larger */}
            <Box
              className="nav-navigation-box"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tabs
                className="nav-tabs"
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="secondary"
                aria-label="main navigation tabs"
                sx={{ display: { xs: "none", md: "flex", boxShadow: "none" } }}
              >
                <Tab label="Home" />
                <Tab label="About" />
                <Tab label="Lost Something" />
                <Tab label="Found Something" />
              </Tabs>
            </Box>
            {/* Show only on small screens */}
            <IconButton
              size="large"
              edge="end"
              color="primary"
              aria-label="menu"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

// I can use theme without importing it by useTheme hook if I used sx props

// <Button variant="contained" sx={{ bgcolor: "light.main" }}></Button>
