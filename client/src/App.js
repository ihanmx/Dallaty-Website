// import "./App.css";
import { useMemo, useEffect } from "react";
import getTheme from "./themes/theme";
import { ThemeProvider } from "@mui/material/styles";
import { LostUserInfoProvider } from "./contexts/LostUserInfoContext";
import LostForm from "./components/LostForm";
import LandingPage from "./components/LandingPage";
import FoundForm from "./components/FoundForm";
import AboutPage from "./components/AboutPage";
import { FoundUserInfoProvider } from "./contexts/FoundUserInfoContext";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { useTranslation } from "react-i18next";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "./contexts/SnackbarProvider";

function App() {
  const { i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  // Create theme based on language direction
  const theme = useMemo(() => getTheme(direction), [direction]);

  // Update document direction
  useEffect(() => {
    document.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [direction, i18n.language]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LostUserInfoProvider>
          <FoundUserInfoProvider>
            {/* Because nav is fixed we need to push content by the nav height */}
            <SnackbarProvider>
              <AppLayout>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/lostform" element={<LostForm />} />
                  <Route path="/foundform" element={<FoundForm />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </AppLayout>
            </SnackbarProvider>
          </FoundUserInfoProvider>
        </LostUserInfoProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
