import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

interface NavbarProps {
  onLoginClick: () => void;
  user?: { name: string } | null;
  onLogout?: () => void;
}

function Navbar({ onLoginClick, user, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => setServicesOpen(false), 150);
  };

  const handleMobileLinkClick = () => {
    setMenuOpen(false); // Close menu on mobile link click
    setServicesOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] px-4 py-3 md:px-12 md:py-4">
      <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
        {/* Logo */}
        <div className="w-[140px] md:w-[200px] h-[45px] md:h-[70px] flex-shrink-0">
          <img
            src="logo1.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-white font-medium text-sm md:text-[16px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-orange-300 font-semibold"
                : "hover:text-orange-300"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-orange-300 font-semibold" // active effect
                : "hover:text-orange-300"
            }
          >
            About
          </NavLink>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="cursor-pointer hover:text-orange-300 select-none">
              Services
            </span>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white/20 backdrop-blur-md rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/insurance"
                  className="block px-4 py-2 text-gray-900 hover:bg-white/30 transition"
                >
                  Insurance
                </Link>
                <Link
                  to="/auditing"
                  className="block px-4 py-2 text-gray-900 hover:bg-white/30 transition"
                >
                  Auditing
                </Link>
                <Link
                  to="/booksStationary"
                  className="block px-4 py-2 text-gray-900 hover:bg-white/30 transition"
                >
                  Books & Stationery
                </Link>
              </div>
            )}
          </div>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-orange-300 font-semibold"
                : "hover:text-orange-300"
            }
          >
            Contact Us
          </NavLink>
          <a href="/brochure.pdf" download className="hover:text-orange-300">
            Brochure
          </a>

          <div className="flex items-center gap-2 text-white">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-white hover:text-orange-300"
            >
              <Phone size={18} />
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>

        {/* Auth + Mobile Hamburger */}
        <div className="flex items-center gap-4 md:gap-6">
          {user ? (
            <button
              onClick={onLogout}
              className="font-semibold text-orange-300 cursor-pointer hidden sm:inline"
            >
              Logout ({user.name})
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="font-semibol text-orange-300 cursor-pointer hidden sm:inline"
            >
              Login
            </button>
          )}

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X size={22} className="text-white" />
              ) : (
                <Menu size={22} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col items-start gap-3 mt-3 px-4 md:hidden text-white font-medium bg-gradient-to-r from-[#3726E7]/80 via-[#2996F7]/80 to-[#FB7196]/80 backdrop-blur-sm rounded-lg py-3">
          <NavLink
            to="/"
            onClick={handleMobileLinkClick}
            className={({ isActive }) =>
              isActive
                ? "text-orange-300 font-semibold"
                : "hover:text-orange-300"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={handleMobileLinkClick}
            className={({ isActive }) =>
              isActive
                ? "text-orange-300 font-semibold"
                : "hover:text-orange-300"
            }
          >
            About
          </NavLink>

          {/* Mobile Services Dropdown */}
          <div className="w-full">
            <span
              className="cursor-pointer hover:text-orange-300 select-none"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services
            </span>
            {servicesOpen && (
              <div className="mt-1 w-full bg-white/10 backdrop-blur-sm rounded-lg py-2">
                <Link
                  to="/insurance"
                  onClick={handleMobileLinkClick}
                  className="block px-4 py-2 hover:bg-white/20 transition"
                >
                  Insurance
                </Link>
                <Link
                  to="/auditing"
                  onClick={handleMobileLinkClick}
                  className="block px-4 py-2 hover:bg-white/20 transition"
                >
                  Auditing
                </Link>
                <Link
                  to="/booksStationary"
                  onClick={handleMobileLinkClick}
                  className="block px-4 py-2 hover:bg-white/20 transition"
                >
                  Books & Stationery
                </Link>
              </div>
            )}
          </div>

          <NavLink
            to="/contact"
            onClick={handleMobileLinkClick}
            className={({ isActive }) =>
              isActive
                ? "text-orange-300 font-semibold"
                : "hover:text-orange-300"
            }
          >
            Contact Us
          </NavLink>

          <a
            href="/brochure.pdf"
            download
            onClick={handleMobileLinkClick}
            className="hover:text-orange-300 w-full"
          >
            Brochure
          </a>

          <a
            href="tel:+919876543210"
            onClick={handleMobileLinkClick}
            className="flex items-center gap-2 text-white hover:text-orange-300 w-full mt-2"
          >
            <Phone size={18} />
            <span>+91 98765 43210</span>
          </a>

          {user ? (
            <button
              onClick={() => {
                handleMobileLinkClick();
                onLogout?.();
              }}
              className="font-semibold text-white hover:text-orange-300 cursor-pointer mt-2 w-full text-left"
            >
              Logout ({user.name})
            </button>
          ) : (
            <button
              onClick={() => {
                handleMobileLinkClick();
                onLoginClick();
              }}
              // className="font-semibold text-white hover:text-orange-300 cursor-pointer mt-2 w-full text-left"
              className="font-semibold text-orange-300 cursor-pointer mt-2 w-full text-left"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
