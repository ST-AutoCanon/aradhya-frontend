import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaTools,
  FaSearch,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const handleEmailClick = () => {
  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
  const email = "contact@dakseyu.info";

  if (isMobile) {
    window.location.href = `mailto:${email}`;
  } else {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
};


const ClaimAndWhyBuy: React.FC = () => {
  const [showClaimProcess, setShowClaimProcess] = useState(true);

  const buttonClasses =
    "px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-full shadow-md transition transform hover:scale-105";

  return (
    // <div className="w-full px-4 sm:px-6 lg:px-0 max-w-4xl mx-auto flex flex-col gap-8 mt-8 sm:mt-12">
    <div className="w-full px-4 sm:px-6 lg:px-0 max-w-4xl mx-auto flex flex-col gap-8 mt-8 sm:mt-12 pb-12">
      {/* Claims Support Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
        className="p-6 sm:p-8 rounded-2xl shadow-xl bg-[#BD0074] text-white transition-all duration-300"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-xl sm:text-2xl font-bold flex items-center gap-2 mb-4"
        >
           Support anytime, anywhere!{" "}
          {/* <span className="text-white" role="img" aria-label="scooter">
            🛵
          </span> */}
        </motion.h2>

        <motion.ul className="space-y-2 text-sm sm:text-base">
          {[
            "24x7 Claims assistance for all customers",
            "Dedicated claim manager helping you at every step",
            "Get latest updates at regular intervals",
          ].map((text, i) => (
            <motion.li
              key={i}
              variants={fadeInUp}
              className="flex items-center gap-2"
            >
              <FaCheckCircle className="text-white" /> {text}
            </motion.li>
          ))}
        </motion.ul>

        {/* Easy Claim Process */}
        <div className="mt-6">
          <button
            onClick={() => setShowClaimProcess(!showClaimProcess)}
            className={`${buttonClasses} bg-[#FFFFFF] text-black flex items-center justify-center gap-2`}
          >
            {showClaimProcess ? "Hide Claim Process" : "Show Claim Process"}
            <span
              style={{ display: "inline-block", transition: "transform 0.3s" }}
              className="text-lg sm:text-xl"
            >
              <IoIosArrowDown
                style={{
                  transform: showClaimProcess
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              />
            </span>
          </button>

          {showClaimProcess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row items-start bg-[#FFFFFF] rounded-2xl shadow-sm p-4 sm:p-6 mt-4 gap-4"
            >
              {/* Icon Section */}
              {/* <div className="flex-shrink-0 bg-[#BD0074] p-2 sm:p-3 rounded-full text-white text-lg sm:text-xl flex items-center justify-center">
                <span className="text-white">🛵</span>
              </div> */}
              {/* <div className="flex-shrink-0 bg-[#BD0074] p-2 sm:p-3 rounded-full text-white text-lg sm:text-xl flex items-center justify-center">
                <span className="text-white">📄</span>
              </div> */}

              <div className="flex-shrink-0 bg-white border-2 border-[#BD0074] p-2 sm:p-3 rounded-full text-lg sm:text-xl flex items-center justify-center">
                <img
                  src="images/claim_icon.png"
                  alt="icon"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  Easy Claim Process
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3">
                  Reach out to the Dakseyu team, and we will assist you with the
                  remaining process.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 shadow-sm text-sm sm:text-base">
                    <FaPhone className="text-[#3726E7]" />
                    <span className="text-gray-800 font-medium">
                      <a
                        href="tel:+916366295968"
                        className="text-gray-800 font-medium"
                      >
                        +91 63662 95968
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 shadow-sm text-sm sm:text-base">
                    <FaEnvelope className="text-[#3726E7]" />
                    <span className="text-gray-800 font-medium">
                      {/* <a
                        href="mailto:contact@dakseyu.info"
                        className="text-gray-800 font-medium"
                      >
                        contact@dakseyu.info
                      </a> */}
                      <button
                        onClick={handleEmailClick}
                        // className="text-gray-800 font-medium hover:text-blue-600"
                      >
                        contact@dakseyu.info
                      </button>
                    </span>
                  </div>
                </div>

                <div className="h-1 w-16 sm:w-20 mt-4 rounded-full bg-[#3726E7]"></div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Why Buy Card */}
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
        className="p-6 sm:p-8 rounded-2xl shadow-xl bg-[#BD0074] text-white transition-all duration-300"
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
          Why Buy from Dakseyu
        </h3>

        <ul className="space-y-2 text-sm sm:text-base">
          {[
            { icon: <FaTools />, text: "Claim assistance anytime, anywhere" },
            { icon: <FaSearch />, text: "Compare & choose best plan" },
            { icon: <FaPhone />, text: "24*7 support helpline" },
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 hover:text-gray-200 transition-colors duration-300"
            >
              {item.icon} {item.text}
            </li>
          ))}
        </ul>

        <button
          className={`${buttonClasses} bg-[#FFFFFF] text-black mt-6 hover:scale-105`}
        >
          💬 Chat with Us
        </button>
      </motion.div>
    </div>
  );
};

export default ClaimAndWhyBuy;
