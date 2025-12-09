import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#001553] text-white px-6 sm:px-12 md:px-24 lg:px-32 pt-8 pb-6">
      {/* Desktop Footer */}
      <div className="hidden md:flex w-full flex-row justify-between gap-6 md:gap-10">
        {/* Column 1 */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="font-semibold mb-2 pl-20">
            <Link to="/">Home</Link>
          </h3>
          <ul className="space-y-2 text-sm text-gray-300 pl-20">
            <li>
              <Link to="/about">About</Link>
            </li>           
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        {/* <div className="flex-1 min-w-[150px]">
          <h3 className="font-semibold mb-2">
            <Link to="/insurance">Insurance Service</Link>
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="#">4 Wheelers Insurance</Link>
            </li>
            <li>
              <Link to="#">2 Wheelers Insurance</Link>
            </li>
            <li>
              <Link to="#">Term Life Insurance</Link>
            </li>
            <li>
              <Link to="#">Family Health Insurance</Link>
            </li>
          </ul>
        </div> */}

        <div className="flex-1 min-w-[150px]">
          <h3 className="font-semibold mb-2">
            <Link to="/insurance" className="cursor-pointer">
              Insurance Service
            </Link>
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <span>4 Wheelers Insurance</span>
            </li>
            <li>
              <span>2 Wheelers Insurance</span>
            </li>
            <li>
              <span>Term Life Insurance</span>
            </li>
            <li>
              <span>Family Health Insurance</span>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        {/* <div className="flex-1 min-w-[150px]">
          <h3 className="font-semibold mb-2">
            <Link to="/auditing">Auditing</Link>
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="#">Financial Planning</Link>
            </li>
            <li>
              <Link to="#">Mutual Funds</Link>
            </li>
            <li>
              <Link to="#">Child Education</Link>
            </li>
            <li>
              <Link to="#">Tax Planning</Link>
            </li>
            <li>
              <Link to="#">Wealth Management</Link>
            </li>
          </ul>
        </div> */}

        <div className="flex-1 min-w-[150px]">
          <h3 className="font-semibold mb-2">
            <Link to="/auditing" className="cursor-pointer">
              Auditing
            </Link>
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <span>Financial Planning</span>
            </li>
            <li>
              <span>Mutual Funds</span>
            </li>
            <li>
              <span>Child Education</span>
            </li>
            <li>
              <span>Tax Planning</span>
            </li>
            <li>
              <span>Wealth Management</span>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        {/* <div className="flex-1 min-w-[150px]">
          <h3 className="font-semibold mb-2">
            <Link to="/booksStationary">Books & Stationery</Link>
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="#">Academic Books</Link>
            </li>
            <li>
              <Link to="#">Office Stationery</Link>
            </li>
            <li>
              <Link to="#">Art Supplies</Link>
            </li>
            <li>
              <Link to="#">Exam Materials</Link>
            </li>
          </ul>
        </div> */}

        <div className="flex-1 min-w-[150px]">
          <h3 className="font-semibold mb-2">
            <Link to="/booksStationary" className="cursor-pointer">
              Books & Stationery
            </Link>
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <span>Academic Books</span>
            </li>
            <li>
              <span>Office Stationery</span>
            </li>
            <li>
              <span>Art Supplies</span>
            </li>
            <li>
              <span>Exam Materials</span>
            </li>
          </ul>
        </div>

        {/* Column 5 - Customer Stats */}
        <div className="flex-1 min-w-[200px]">
          <p
            className="text-yellow-400 font-bold mb-4"
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: "24px",
              lineHeight: "30px",
            }}
          >
            1,20,000 +<br />
            HAPPY CUSTOMERS <br />
            Since 2023
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span>Terms</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>

      {/* Desktop Divider */}
      <div className="hidden md:block border-t border-gray-700 mt-12"></div>

      {/* Desktop Copyright */}
      {/* <div className="hidden md:block text-center text-sm text-gray-400 mt-6">
        © 2025 Dakseyu Business Solution. All rights reserved.
      </div> */}
      <div className="hidden md:block text-center text-sm text-gray-400 mt-6">
        © 2025 Dakseyu Business Solution. All rights reserved. Developed by{" "}
        <a
          href="https://sukalpatechsolutions.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:underline"
        >
          Sukalpa Tech Solutions
        </a>
        .
      </div>

      {/* Mobile Footer */}
      <div className="flex flex-col md:hidden items-center justify-center gap-4 text-center mt-6">
        <p
          className="text-yellow-400 font-bold text-xl"
          style={{ fontFamily: "Lato, sans-serif", lineHeight: "28px" }}
        >
          1,20,000 +<br />
          HAPPY CUSTOMERS
        </p>

        {/* Mobile Divider */}
        <div className="border-t border-gray-700 w-full my-4"></div>

        {/* Mobile Copyright */}
        {/* <div className="text-sm text-gray-400">
          © 2025 Dakseyu Business Solution. All rights reserved.
        </div> */}
        <div className="text-sm text-gray-400">
          © 2025 Dakseyu Business Solution. All rights reserved. Developed by{" "}
          <a
            href="https://sukalpatechsolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:underline"
          >
            Sukalpa Tech Solutions
          </a>
          .
        </div>
      </div>
    </footer>
  );
}

export default Footer;
