//MUI components
import Box from "@mui/material/Box";

// local components
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = ({ children }) => {
  return (
    <Box
      sx={{
        bgcolor: "#fafafa",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%", // ✅ instead of maxWidth: "100vw"
        // overflowX: "hidden", // ✅ hide any accidental overflow
      }}
    >
      <Navbar />
      <Box component="main" flex="1" sx={{ mt: "64px" }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default AppLayout;
