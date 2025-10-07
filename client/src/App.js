import "./App.css";
import Navbar from "./components/Navbar";
import theme from "./themes/theme";
import { ThemeProvider } from "@mui/material/styles";
import { LostUserInfoProvider } from "./contexts/LostUserInfoContext";
import LostForm from "./components/LostForm";
import LandingPage from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <LostUserInfoProvider>
        <ThemeProvider theme={theme}>
          <Navbar />
          <LandingPage />
          <LostForm />

          {/* APP ROUTES */}
          {/* Should be inside providers */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />

            <Route path="/lostform" element={<LostForm />} />
          </Routes>
        </ThemeProvider>
      </LostUserInfoProvider>
    </>
  );
}

export default App;
