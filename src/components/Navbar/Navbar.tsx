// import { useState } from "react";
// import { Menu, X, Phone } from "lucide-react";
// import { NavLink, Link } from "react-router-dom";

// interface NavbarProps {
//   onLoginClick: () => void;
//   user?: { name: string } | null;
//   onLogout?: () => void;
// }

// function Navbar({ onLoginClick, user, onLogout }: NavbarProps) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [servicesOpen, setServicesOpen] = useState(false);
//   let hoverTimeout: NodeJS.Timeout;

//   const handleMouseEnter = () => {
//     clearTimeout(hoverTimeout);
//     setServicesOpen(true);
//   };

//   const handleMouseLeave = () => {
//     hoverTimeout = setTimeout(() => setServicesOpen(false), 150);
//   };

//   const handleMobileLinkClick = () => {
//     setMenuOpen(false); // Close menu on mobile link click
//     setServicesOpen(false);
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] px-4 py-3 md:px-12 md:py-4">
//       <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
//         {/* Logo */}
//         <div className="w-[140px] md:w-[200px] h-[45px] md:h-[70px] flex-shrink-0">
//           <img
//             src="logo1.png"
//             alt="Logo"
//             className="w-full h-full object-contain"
//           />
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-8 text-white font-medium text-sm md:text-[16px]">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-orange-300 font-semibold"
//                 : "hover:text-orange-300"
//             }
//           >
//             Home
//           </NavLink>

//           <NavLink
//             to="/about"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-orange-300 font-semibold" // active effect
//                 : "hover:text-orange-300"
//             }
//           >
//             About
//           </NavLink>

//           {/* Services Dropdown */}
//           <div
//             className="relative"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <span className="cursor-pointer hover:text-orange-300 select-none">
//               Services
//             </span>
//             {servicesOpen && (
//               <div className="absolute top-full left-0 mt-2 w-48 bg-white/20 backdrop-blur-md rounded-lg shadow-lg py-2 z-50">
//                 <Link
//                   to="/insurance"
//                   className="block px-4 py-2 text-gray-900 hover:bg-white/30 transition"
//                 >
//                   Insurance
//                 </Link>
//                 <Link
//                   to="/auditing"
//                   className="block px-4 py-2 text-gray-900 hover:bg-white/30 transition"
//                 >
//                   Auditing
//                 </Link>
//                 <Link
//                   to="/booksStationary"
//                   className="block px-4 py-2 text-gray-900 hover:bg-white/30 transition"
//                 >
//                   Books & Stationery
//                 </Link>
//               </div>
//             )}
//           </div>
//           <NavLink
//             to="/contact"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-orange-300 font-semibold"
//                 : "hover:text-orange-300"
//             }
//           >
//             Contact Us
//           </NavLink>
//           <a href="/brochure.pdf" download className="hover:text-orange-300">
//             Brochure
//           </a>

//           <div className="flex items-center gap-2 text-white">
//             <a
//               href="tel:+916366295968"
//               className="flex items-center gap-2 text-white hover:text-orange-300"
//             >
//               <Phone size={18} />
//               <span>+91 63662 95968</span>
//             </a>
//           </div>
//         </div>

//         {/* Auth + Mobile Hamburger */}
//         <div className="flex items-center gap-4 md:gap-6">
//           {user ? (
//             <button
//               onClick={onLogout}
//               className="font-semibold text-orange-300 cursor-pointer hidden sm:inline"
//             >
//               Logout ({user.name})
//             </button>
//           ) : (
//             <button
//               onClick={onLoginClick}
//               className="font-semibol text-orange-300 cursor-pointer hidden sm:inline"
//             >
//               Login
//             </button>
//           )}

//           <div className="md:hidden">
//             <button onClick={() => setMenuOpen(!menuOpen)}>
//               {menuOpen ? (
//                 <X size={22} className="text-white" />
//               ) : (
//                 <Menu size={22} className="text-white" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="flex flex-col items-start gap-3 mt-3 px-4 md:hidden text-white font-medium bg-gradient-to-r from-[#3726E7]/80 via-[#2996F7]/80 to-[#FB7196]/80 backdrop-blur-sm rounded-lg py-3">
//           <NavLink
//             to="/"
//             onClick={handleMobileLinkClick}
//             className={({ isActive }) =>
//               isActive
//                 ? "text-orange-300 font-semibold"
//                 : "hover:text-orange-300"
//             }
//           >
//             Home
//           </NavLink>

//           <NavLink
//             to="/about"
//             onClick={handleMobileLinkClick}
//             className={({ isActive }) =>
//               isActive
//                 ? "text-orange-300 font-semibold"
//                 : "hover:text-orange-300"
//             }
//           >
//             About
//           </NavLink>

//           {/* Mobile Services Dropdown */}
//           <div className="w-full">
//             <span
//               className="cursor-pointer hover:text-orange-300 select-none"
//               onClick={() => setServicesOpen(!servicesOpen)}
//             >
//               Services
//             </span>
//             {servicesOpen && (
//               <div className="mt-1 w-full bg-white/10 backdrop-blur-sm rounded-lg py-2">
//                 <Link
//                   to="/insurance"
//                   onClick={handleMobileLinkClick}
//                   className="block px-4 py-2 hover:bg-white/20 transition"
//                 >
//                   Insurance
//                 </Link>
//                 <Link
//                   to="/auditing"
//                   onClick={handleMobileLinkClick}
//                   className="block px-4 py-2 hover:bg-white/20 transition"
//                 >
//                   Auditing
//                 </Link>
//                 <Link
//                   to="/booksStationary"
//                   onClick={handleMobileLinkClick}
//                   className="block px-4 py-2 hover:bg-white/20 transition"
//                 >
//                   Books & Stationery
//                 </Link>
//               </div>
//             )}
//           </div>

//           <NavLink
//             to="/contact"
//             onClick={handleMobileLinkClick}
//             className={({ isActive }) =>
//               isActive
//                 ? "text-orange-300 font-semibold"
//                 : "hover:text-orange-300"
//             }
//           >
//             Contact Us
//           </NavLink>

//           <a
//             href="/brochure.pdf"
//             download
//             onClick={handleMobileLinkClick}
//             className="hover:text-orange-300 w-full"
//           >
//             Brochure
//           </a>

//           <a
//             href="tel:+916366295968"
//             onClick={handleMobileLinkClick}
//             className="flex items-center gap-2 text-white hover:text-orange-300 w-full mt-2"
//           >
//             <Phone size={18} />
//             <span>+91 63662 95968</span>
//           </a>

//           {user ? (
//             <button
//               onClick={() => {
//                 handleMobileLinkClick();
//                 onLogout?.();
//               }}
//               className="font-semibold text-white hover:text-orange-300 cursor-pointer mt-2 w-full text-left"
//             >
//               Logout ({user.name})
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 handleMobileLinkClick();
//                 onLoginClick();
//               }}
//               // className="font-semibold text-white hover:text-orange-300 cursor-pointer mt-2 w-full text-left"
//               className="font-semibold text-orange-300 cursor-pointer mt-2 w-full text-left"
//             >
//               Login
//             </button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
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

  const whatsappNumber = "916366295968";
  const email = "contact@dakseyu.info";

  const handleEmailClick = () => {
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => setServicesOpen(false), 150);
  };

  const handleMobileLinkClick = () => {
    setMenuOpen(false);
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
                ? "text-orange-300 font-semibold"
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

          {/* Brochure */}
          <a href="/brochure.pdf" download className="hover:text-orange-300">
            Brochure
          </a>

          {/* Contact Buttons */}
          <div className="flex items-center gap-5">
            {/* Phone */}
            <a
              href="tel:+916366295968"
              className="flex items-center gap-2 text-white hover:text-orange-300 transition"
              title="Call us"
            >
              <Phone size={18} />
              <span>+91 63662 95968</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-green-300 transition"
              title="Chat on WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px] fill-current"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.53 0 .2 5.32.2 11.87c0 2.09.55 4.13 1.59 5.93L.1 24l6.35-1.67a11.86 11.86 0 0 0 5.63 1.43h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.15-3.44-8.41ZM12.09 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.88 9.88 0 0 1-1.52-5.28C2.17 6.41 6.61 1.97 12.09 1.97c2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.9 7.01c0 5.47-4.45 9.91-9.91 9.91Zm5.43-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
              </svg>

              <span>WhatsApp</span>
            </a>

            {/* Email */}
            <button
              onClick={handleEmailClick}
              className="flex items-center gap-2 text-white hover:text-orange-300 transition"
              title="Email us"
            >
              <Mail size={18} />
              <span>Email</span>
            </button>
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
              className="font-semibold text-orange-300 cursor-pointer hidden sm:inline"
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

          {/* Mobile Services */}
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

          {/* Brochure */}
          <a
            href="/brochure.pdf"
            download
            onClick={handleMobileLinkClick}
            className="hover:text-orange-300 w-full"
          >
            Brochure
          </a>

          {/* Phone */}
          <a
            href="tel:+916366295968"
            onClick={handleMobileLinkClick}
            className="flex items-center gap-2 text-white hover:text-orange-300 w-full mt-2"
          >
            <Phone size={18} />
            <span>+91 63662 95968</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleMobileLinkClick}
            className="flex items-center gap-2 text-white hover:text-green-300 w-full"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-[18px] h-[18px] fill-current"
              aria-hidden="true"
            >
              <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.53 0 .2 5.32.2 11.87c0 2.09.55 4.13 1.59 5.93L.1 24l6.35-1.67a11.86 11.86 0 0 0 5.63 1.43h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.15-3.44-8.41ZM12.09 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.88 9.88 0 0 1-1.52-5.28C2.17 6.41 6.61 1.97 12.09 1.97c2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.9 7.01c0 5.47-4.45 9.91-9.91 9.91Zm5.43-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
            </svg>

            <span>WhatsApp</span>
          </a>

          {/* Email */}
          <button
            onClick={() => {
              handleMobileLinkClick();
              handleEmailClick();
            }}
            className="flex items-center gap-2 text-white hover:text-orange-300 w-full text-left"
          >
            <Mail size={18} />
            <span>Email</span>
          </button>

          {/* Login / Logout */}
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