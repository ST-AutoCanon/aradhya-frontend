import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import AdminPage from "./pages/admin/AdminPage";
import AdminJobsData from "./pages/admin/Jobs/AdminJobdata";
import AdminAddJobsData from "./pages/admin/Jobs/AdminAddJob";
import AdminViewJobs from "./pages/admin/Jobs/AdminViewJobs";

import Navbar from "./components/Navbar/Navbar";
import AdminNavbar from "./components/Navbar/NavbarAdmin";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import CookieConsent from "./components/CookieConsent";

import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Careers from "./pages/Careers";
import CookiePolicy from "./pages/CookiePolicy";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import BooksStationaryMainPage from "./pages/BooksStationary/BooksStationaryMainPage";
import AuditingSubServicePage from "./pages/AuditingPages/AuditingSubServicePage";
import AuditingMainPage from "./pages/AuditingPages/AuditingMainpage";
import InsuranceSubServicePage from "./pages/InsurancePages/InsuranceSubServicePage";
import InsuranaceMainPage from "./pages/InsurancePages/InsuranceMainPage";
import BooksStationarySubService from "./pages/BooksStationary/BooksStationarySubService";
import FillDetailsBooksStationary from "./pages/FillDetails/FillDetailsBooksStationary";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  // Restore user from localStorage on page load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const consent = localStorage.getItem("cookiesAccepted") === "true";

    if (savedToken && savedUser && consent) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));

      // Redirect only if user is at home page
      if (location.pathname === "/") {
        navigate("/admin");
      }
    }
    setAuthLoading(false);
  }, [navigate, location.pathname]);

  const handleLoginSuccess = (newToken: string, newUser: any) => {
    setToken(newToken);
    setUser(newUser);

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));

    setIsLoginOpen(false);
    navigate("/admin");
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cookiesAccepted");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  // 🔹 Cookie consent (NON-ESSENTIAL)
  const handleConsentAccept = () => {
    setCookiesAccepted(true);
    localStorage.setItem("cookiesAccepted", "true");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname.startsWith("/admin") ? (
        <AdminNavbar user={user} onLogout={handleLogout} />
      ) : (
        <Navbar
          onLoginClick={() => setIsLoginOpen(true)}
          user={user}
          onLogout={handleLogout}
        />
      )}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          <Route path="/insurance" element={<InsuranaceMainPage />} />
          <Route
            path="/insurance-details"
            element={<InsuranceSubServicePage />}
          />
          <Route path="/auditing" element={<AuditingMainPage />} />
          <Route
            path="/auditing-details"
            element={<AuditingSubServicePage />}
          />
          <Route
            path="/booksStationary"
            element={<BooksStationaryMainPage />}
          />
          <Route
            path="/books-stationary-details"
            element={<BooksStationarySubService />}
          />

          <Route path="/form/books" element={<FillDetailsBooksStationary />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute user={user} loading={authLoading}>
                <AdminPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedAdminRoute user={user} loading={authLoading}>
                <AdminJobsData />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/add-job"
            element={
              <ProtectedAdminRoute user={user} loading={authLoading}>
                <AdminAddJobsData />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/view-jobs"
            element={
              <ProtectedAdminRoute user={user} loading={authLoading}>
                <AdminViewJobs />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </main>

      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      <CookieConsent onAccept={handleConsentAccept} />
    </div>
  );
};

export default App;
