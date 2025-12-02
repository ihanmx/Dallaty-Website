// hooks
import { useMemo, useEffect } from "react";

// React router-dom
import { Routes, Route } from "react-router-dom";

//contexts
import { LostUserInfoProvider } from "./contexts/LostUserInfoContext";
import { FoundUserInfoProvider } from "./contexts/FoundUserInfoContext";
import { SnackbarProvider } from "./contexts/SnackbarProvider";

// theme
import getTheme from "./themes/theme";

// i-18 library
import { useTranslation } from "react-i18next";

// MUI
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

//local components
import TrustedBySection from "./components/TrustedBySection";
import ScrollToTop from "./components/ScrollToTop";
import AppLayout from "./components/AppLayout";
import ItemDetails from "./pages/ItemDetails";

// local pages
import PaymentPage from "./pages/PaymentPage";
import PaymentStatus from "./pages/PaymentStatus";
import AdminDashboard from "./pages/AdminDashboard";
import LostForm from "./pages/LostForm";
import LandingPage from "./pages/LandingPage";
import FoundForm from "./pages/FoundForm";
import AboutPage from "./pages/AboutPage";
import AdminMatchDashboard from "./pages/AdminMatchDashboard";
import ItemDetailsErrPage from "./pages/ItemDetailsErrPage";

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
                {/* <AdminDashboard /> */}

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
                  <Route
                    path="/payment/:paymentToken"
                    element={<PaymentPage />}
                  />
                  <Route
                    path="/payment-status/:reportId"
                    element={<PaymentStatus />}
                  />
                  <Route
                    path="/payment-status/invalid"
                    element={<PaymentStatus />}
                  />

                  <Route
                    path="/admin-match-dashboard"
                    element={<AdminMatchDashboard />}
                  />

                  <Route
                    path="/item-details/:reportId"
                    element={<ItemDetails />}
                  />

                  <Route
                    path="/item-details-error"
                    element={<ItemDetailsErrPage />}
                  />
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
