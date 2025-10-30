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
import TrustedBySection from "./components/TrustedBySection";
import ScrollToTop from "./components/ScrollToTop";
import PaymentDash from "./components/PaymentDash";
import PaymentPage from "./components/PaymentPage";
import PaymentStatus from "./components/PaymentStatus";
import MockPayTabs from "./components/MockPaytabs";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const { i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  // Create theme based on language direction
  //useMemo to avoid recalculate memo with each render it only change when its value is updated
  const theme = useMemo(() => getTheme(direction), [direction]);

  // Update document direction

  useEffect(() => {
    document.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [direction, i18n.language]);

  //change lang and access dom change the state and are side effects so we need to avoid calling them out side function
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LostUserInfoProvider>
          <FoundUserInfoProvider>
            {/* Because nav is fixed we need to push content by the nav height */}
            <SnackbarProvider>
              <AppLayout>
                <ScrollToTop />
                <AdminDashboard />

                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <LandingPage />
                        <AboutPage />
                        <TrustedBySection />
                      </>
                    }
                  />
                  <Route
                    path="/home"
                    element={
                      <>
                        <LandingPage />
                        <AboutPage />
                        <TrustedBySection />
                      </>
                    }
                  />
                  <Route path="/lostform" element={<LostForm />} />
                  <Route path="/foundform" element={<FoundForm />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/" element={<PaymentPage />} />
                  <Route
                    path="/payment/:paymentToken"
                    element={<PaymentPage />}
                  />
                  <Route path="/payment-status" element={<PaymentStatus />} />
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
