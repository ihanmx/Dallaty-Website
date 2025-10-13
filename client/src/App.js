// import "./App.css";
import Navbar from "./components/Navbar";
import theme from "./themes/theme";
import { ThemeProvider } from "@mui/material/styles";
import { LostUserInfoProvider } from "./contexts/LostUserInfoContext";
import LostForm from "./components/LostForm";
import LandingPage from "./components/LandingPage";
import FoundForm from "./components/FoundForm";
import { FoundUserInfoProvider } from "./contexts/FoundUserInfoContext";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import FAQs from "./components/FAQs";
import ReportInstruction from "./components/ReportInstruction";
import Box from "@mui/material/Box";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <>
      <LostUserInfoProvider>
        <FoundUserInfoProvider>
          <ThemeProvider theme={theme}>
            {/* Because nav is fixed we need to push content by the nav height */}
            <AppLayout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/lostform" element={<LostForm />} />
                <Route path="/foundform" element={<FoundForm />} />
                <Route path="/about" element={<FAQs />} />
              </Routes>
            </AppLayout>
          </ThemeProvider>
        </FoundUserInfoProvider>
      </LostUserInfoProvider>
    </>
  );
}

export default App;
