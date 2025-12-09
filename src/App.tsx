//03-11-2024

// import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";

// import Home from "./pages/Home";
// import AdminPage from "./pages/admin/AdminPage";

// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
// import LoginModal from "./components/LoginModal";
// import RegisterModal from "./components/RegisterModal";
// import AdminNavbar from "./components/Navbar/NavbarAdmin";
// import InsuranceMainPage from "./pages/InsurancePages/InsuranceMainPage";

// import InsuranceSubServicePage from "./pages/InsurancePages/InsuranceSubServicePage";
// import AuditingMainPage from "./pages/AuditingPages/AuditingMainpage";
// import BooksStationaryMainPage from "./pages/BooksStationary/BooksStationaryMainPage";    
// import AuditingSubServicePage from "./pages/AuditingPages/AuditingSubServicePage";
// import BooksStationarySubService from "./pages/BooksStationary/BooksStationarySubService";
// import FillDetailsBooksStationary from "./pages/FillDetails/FillDetailsBooksStationary";
// import CookieConsent from "./components/CookieConsent";
// import ContactUs from "./pages/ContactUs";
// import About from "./pages/About";
// import CookiePolicy from "./pages/CookiePolicy";
// import Careers from "./pages/Careers";
// import AdminJobsData from "./pages/admin/Jobs/AdminJobdata";
// import AdminAddJobsData from "./pages/admin/Jobs/AdminAddJob";
// import AdminViewJobs from "./pages/admin/Jobs/AdminViewJobs";

// const App = () => {
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isRegisterOpen, setIsRegisterOpen] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [cookiesAccepted, setCookiesAccepted] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

// useEffect(() => {
//   const savedToken = localStorage.getItem("token");
//   const savedUser = localStorage.getItem("user");
//   const consent = localStorage.getItem("cookiesAccepted") === "true";

//   if (savedToken && savedUser && consent) {
//     setToken(savedToken);
//     setUser(JSON.parse(savedUser));
//     navigate("/admin"); // Redirect logged-in user to admin page
//   }
// }, []);

//   const handleLoginSuccess = (
//     newToken: string,
//     newUser: any,
//     consent: boolean
//   ) => {
//     setToken(newToken);
//     setUser(newUser);

//     if (consent) {
//       localStorage.setItem("token", newToken);
//       localStorage.setItem("user", JSON.stringify(newUser));
//     }

//     setIsLoginOpen(false);
//     navigate("/admin");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setToken(null);
//     setUser(null);
//     navigate("/");
//   };

//   const handleConsentAccept = () => {
//     setCookiesAccepted(true);
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {location.pathname.startsWith("/admin") ? (
//         <AdminNavbar user={user} onLogout={handleLogout} />
//       ) : (
//         <Navbar
//           onLoginClick={() => setIsLoginOpen(true)}
//           user={user}
//           onLogout={handleLogout}
//         />
//       )}

//       <main className="flex-grow">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/admin" element={<AdminPage />} />

//           <Route path="about" element={<About />} />
//           <Route path="contact" element={<ContactUs />} />
//           <Route path="/insurance" element={<InsuranceMainPage />} />
//           <Route
//             path="/insurance-details"
//             element={<InsuranceSubServicePage />}
//           />
//           <Route path="/auditing" element={<AuditingMainPage />} />
//           <Route
//             path="/auditing-details"
//             element={<AuditingSubServicePage />}
//           />
//           <Route
//             path="/booksStationary"
//             element={<BooksStationaryMainPage />}
//           />
//           <Route
//             path="/books-stationary-details"
//             element={<BooksStationarySubService />}
//           />

//           <Route path="/form/books" element={<FillDetailsBooksStationary />} />
//           <Route path="/cookie-policy" element={<CookiePolicy />} />

//           <Route path="/careers" element={<Careers />} />

//           <Route path="/admin" element={<AdminJobsData />} />
//           <Route path="/admin/add-job" element={<AdminAddJobsData />} />
//           <Route path="/admin/view-jobs" element={<AdminViewJobs />} />
//         </Routes>
//       </main>

//       <Footer />

//       <LoginModal
//         isOpen={isLoginOpen}
//         onClose={() => setIsLoginOpen(false)}
//         onLoginSuccess={handleLoginSuccess}
//       />
//       <RegisterModal
//         isOpen={isRegisterOpen}
//         onClose={() => setIsRegisterOpen(false)}
//       />

//       <CookieConsent onAccept={handleConsentAccept} />
//     </div>
//   );
// };

// export default App;




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
      navigate("/admin"); // redirect automatically
    }

    setAuthLoading(false);
  }, [navigate]);

  const handleLoginSuccess = (
    newToken: string,
    newUser: any,
    consent: boolean
  ) => {
    setToken(newToken);
    setUser(newUser);

    if (consent) {
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("cookiesAccepted", "true");
    }

    setIsLoginOpen(false);
    navigate("/admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cookiesAccepted");
    setToken(null);
    setUser(null);
    navigate("/");
  };

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
