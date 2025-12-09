//27-10-2025( updated code )
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ClaimAndWhyBuy from "../ClaimAndWhyBuy";
import { FaLink, FaArrowLeft } from "react-icons/fa";

// Import your two separate form components
import FillVehicleInsuranceForm from "../FillDetails/FillDetailsVehicle";
import FillHealthInsuranceForm from "../FillDetails/FillDetailsHealth";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Bounce animation for SPL offer
const bounce = {
  animate: {
    y: [0, -10, 0],
    scale: [1, 1.05, 1],
    transition: { duration: 1.2, repeat: Infinity },
  },
};

type InsuranceDetails = {
  description: string;
  keyPoints?: string[];
  priceRange: string;
  offer: string;
  extraLinks?: { label: string; url: string }[];
  image?: string;
  title?: string;
};

const InsuranceSubServicePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const insuranceType: string = location.state?.type || "Two Wheeler";

  const bannerContent: Record<string, InsuranceDetails> = {
    "Two Wheeler": {
      title: "Two Wheeler Insurance",
      description:
        "Affordable protection for your bike or scooter. Ride worry-free with coverage against accidents, theft, and damages.",
      image: "images/2_Wheeler_Insurance.png",
      priceRange: "₹ 2 per day",
      offer: "Special Offer: ₹299 Only",
    },
    "Four Wheeler": {
      title: "Four Wheeler Insurance",
      description:
        "Comprehensive plans for your car – covering accidents, theft, fire, and third-party liabilities.",
      image: "images/4_Wheeler_insurance.png",
      priceRange: " 9 per day",
      offer: "Limited Time: 15% Off",
    },
    Health: {
      title: "Health Insurance",
      description:
        "Safeguard yourself and your family against rising medical expenses with cashless hospitalization and annual checkups.",
      image: "images/Health_Insurance.png",
      priceRange: "₹ 10 per day ",
      offer: "💚 Free Annual Health Check-up included!",
      keyPoints: [
        "Cashless hospitalization in 5000+ hospitals",
        "Annual health check-ups included",
        "Coverage for critical illness and maternity",
      ],
      extraLinks: [
        {
          label: "1Cr Life Cover @ ₹512/m*",
          url: "https://smartcare.sbilife.co.in/epolicy/SmartShieldPlus/UI/PersonalDetailsMinor.aspx?",
        },
        {
          label: "2Cr Life Cover @ ₹842/m*",
          url: "https://smartcare.sbilife.co.in/epolicy/SmartShieldPremier/UI/investment-details.aspx?utm_source=google&utm_medium=search&utm_campaign=LS_SBI_SSPL_Brand_Core_EM_PI&utm_adgroup=Core&utm_term=sbi%20life&utm_network=g&utm_location=9198441&utm_device=c&utm_extension=sitelink_2Cr_SSPR&utm_content=e",
        },
        {
          label: "Retirement Plan",
          url: "https://smartcare.sbilife.co.in/epolicy/RetireSmartPlus/UI/investment-details.aspx?utm_source=google&utm_medium=search&utm_campaign=LS_SBI_SSPL_Brand_Core_EM_PI&utm_adgroup=Core&utm_term=sbi%20life&utm_network=g&utm_location=9198441&utm_device=c&utm_extension=sitelink_Retire_Plan&utm_content=e",
        },
        {
          label: "Child Plan",
          url: "https://smartcare.sbilife.co.in/epolicy/SmartScholarPlus/UI/investment-details.aspx?",
        },
        {
          label: "Accidental Benefit",
          url: "https://smartcare.sbilife.co.in/epolicy/SmartShieldPlus/UI/PersonalDetailsMinor.aspx?",
        },
      ],
    },
    "Term Life": {
      title: "Term Life Insurance",
      description:
        "Secure your family’s future with high coverage at affordable premiums. Get tax benefits and peace of mind.",
      image: "images/Term_Life_Insurance.png",
      priceRange: "₹ 50 per day for 1cr coverage",
      offer: "🔥 Save up to 20% on online purchase!",
      keyPoints: [
        "High coverage at affordable premium",
        "Tax benefits under section 80C",
        "Flexible policy terms",
      ],
      extraLinks: [
        {
          label: "eShield Insta Plan Overview",
          url: "https://www.sbilife.co.in/en/individual-life-insurance/protection-plans/eshield-insta",
        },
        {
          label: "Smart Shield Plus Plan Overview",
          url: "https://www.sbilife.co.in/en/individual-life-insurance/protection-plans/smart-shield-plus",
        },
      ],
    },
  };

  const selectedDetails = bannerContent[insuranceType] || {
    title: "Insurance Services",
    description:
      "Explore our wide range of insurance solutions tailored for you.",
    image: "/banners/defaultBanner.png",
    priceRange: "",
    offer: "",
  };

  const vehicleOptions: string[] = ["Liability", "Comprehensive", "ZeroDep"];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] =
    useState<string[]>(vehicleOptions);
  const [isFocused, setIsFocused] = useState(false);
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);

  // const insuranceDetails: Record<string, InsuranceDetails> = {
  //   Liability: {
  //     description:
  //       "Protects against damages you cause to others. Legal support included.",
  //     priceRange: "₹2 per day",
  //     offer: "Special Offer: our customers Only",
  //   },
  //   Comprehensive: {
  //     description:
  //       "Covers accidents, theft, fire, and natural disasters. Peace of mind guaranteed.",
  //     priceRange: "₹2 per day",
  //     offer: "Limited Time: 15% Off",
  //   },
  //   ZeroDep: {
  //     description:
  //       "Full replacement cost of parts without depreciation. Ideal for new vehicles.",
  //     priceRange: "₹2 per day",
  //     offer: "Bonus: Free Roadside Assistance",
  //   },
  //   ...bannerContent,
  // };


  const insuranceDetails: Record<string, any> = {
    "Two Wheeler": {
      Liability: {
        description: "Covers third-party damages for your bike.",
        priceRange: "₹2/day",
        offer: "Special Bike Offer: 20% off for bikes",
      },
      Comprehensive: {
        description:
          "Full coverage for your two-wheeler including theft, fire, and accident.",
        priceRange: "₹2/day",
        offer: "Limited Time: 10% off for bikes",
      },
      ZeroDep: {
        description:
          "Zero depreciation add-on for brand new bikes and scooters.",
        priceRange: "₹2/day",
        offer: "Bonus: Free roadside assistance",
      },
    },
    "Four Wheeler": {
      Liability: {
        description:
          "Third-party liability coverage for your car – legally required and essential.",
        priceRange: "₹9/day",
        offer: "Free personal accident cover!",
      },
      Comprehensive: {
        description:
          "Complete protection for your car: damage, theft, fire, and more.",
        priceRange: "₹9/day",
        offer: "Flat 15% off for online car policy purchase",
      },
      ZeroDep: {
        description:
          "Covers full replacement cost of car parts without depreciation.",
        priceRange: "₹9/day",
        offer: "Includes cashless garage repair",
      },
    },
    Health: {
      title: "Health Insurance",
      description:
        "Safeguard yourself and your family against rising medical expenses with cashless hospitalization and annual checkups.",
      image: "images/Health_Insurance.png",
      priceRange: "₹ 10 per day ",
      offer: "💚 Free Annual Health Check-up included!",
      keyPoints: [
        "Cashless hospitalization in 5000+ hospitals",
        "Annual health check-ups included",
        "Coverage for critical illness and maternity",
      ],
      extraLinks: [
        {
          label: "1Cr Life Cover @ ₹512/m*",
          url: "https://smartcare.sbilife.co.in/epolicy/SmartShieldPlus/UI/PersonalDetailsMinor.aspx?",
        },
        {
          label: "2Cr Life Cover @ ₹842/m*",
          url: "https://smartcare.sbilife.co.in/epolicy/SmartShieldPremier/UI/investment-details.aspx?utm_source=google&utm_medium=search&utm_campaign=LS_SBI_SSPL_Brand_Core_EM_PI&utm_adgroup=Core&utm_term=sbi%20life&utm_network=g&utm_location=9198441&utm_device=c&utm_extension=sitelink_2Cr_SSPR&utm_content=e",
        },
        {
          label: "Retirement Plan",
          url: "https://smartcare.sbilife.co.in/epolicy/RetireSmartPlus/UI/investment-details.aspx?utm_source=google&utm_medium=search&utm_campaign=LS_SBI_SSPL_Brand_Core_EM_PI&utm_adgroup=Core&utm_term=sbi%20life&utm_network=g&utm_location=9198441&utm_device=c&utm_extension=sitelink_Retire_Plan&utm_content=e",
        },
        {
          label: "Child Plan",
          url: "https://smartcare.sbilife.co.in/epolicy/SmartScholarPlus/UI/investment-details.aspx?",
        },
        {
          label: "Accidental Benefit",
          url: "https://smartcare.sbilife.co.in/epolicy/SmartShieldPlus/UI/PersonalDetailsMinor.aspx?",
        },
      ],
    },
    "Term Life": {
      title: "Term Life Insurance",
      description:
        "Secure your family’s future with high coverage at affordable premiums. Get tax benefits and peace of mind.",
      image: "images/Term_Life_Insurance.png",
      priceRange: "₹ 50 per day for 1cr coverage",
      offer: "🔥 Save up to 20% on online purchase!",
      keyPoints: [
        "High coverage at affordable premium",
        "Tax benefits under section 80C",
        "Flexible policy terms",
      ],
      extraLinks: [
        {
          label: "eShield Insta Plan Overview",
          url: "https://www.sbilife.co.in/en/individual-life-insurance/protection-plans/eshield-insta",
        },
        {
          label: "Smart Shield Plus Plan Overview",
          url: "https://www.sbilife.co.in/en/individual-life-insurance/protection-plans/smart-shield-plus",
        },
      ],
    },
  };

  const handleInputChange = (value: string) => {
    setSearch(value);
    const filtered =
      value === ""
        ? vehicleOptions
        : vehicleOptions.filter((opt) =>
            opt.toLowerCase().includes(value.toLowerCase())
          );
    setFilteredSuggestions(filtered);
    setSelectedOption(null);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearch(suggestion);
    setFilteredSuggestions([]);
    setSelectedOption(suggestion);
  };

  const buttonClasses =
    "px-6 py-3 text-base sm:text-lg font-semibold rounded-full shadow-md transition transform hover:scale-105 hover:shadow-xl";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
      className="relative w-full pt-10"
    >
      {/* Dynamic Banner */}
      {/* <section className="w-full mb-10">
        <div className="w-full bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] flex flex-col md:flex-row items-center justify-center py-10 md:py-16 px-4 sm:px-6 gap-6 md:gap-8">
          <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2">
            <img
              src={selectedDetails.image || "/images/default.png"}
              alt={selectedDetails.title}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-64 md:h-64 object-cover rounded-full shadow-lg"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left max-w-xl order-2 md:order-1 md:pl-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-lato font-semibold mb-3 md:mb-4 text-white leading-snug">
              {selectedDetails.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-lato text-white leading-relaxed">
              {selectedDetails.description}
            </p>
          </div>
        </div>
      </section> */}

      <section className="w-full mb-10 relative">
        {/* <div className="w-full bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] flex flex-col md:flex-row items-center justify-center py-10 md:py-16 px-4 sm:px-6 gap-6 md:gap-8 relative"> */}
        <div
          className="w-full bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] 
    flex flex-col md:flex-row items-center 
    py-10 md:py-20 px-6 md:px-24"
        >
          {/* Mobile-only Back button at top-left */}
          <div className="absolute top-8 left-4 sm:hidden">
            <button
              onClick={() => navigate("/insurance")}
              className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5 hover:bg-white/30 transition"
            >
              <span className="flex items-center justify-center w-5 h-5 bg-white rounded-full">
                <FaArrowLeft className="w-3 h-3 text-black" />
              </span>
              <span className="text-xs font-lato text-white">Back</span>
            </button>
          </div>

          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2">
            <img
              src={selectedDetails.image || "/images/default.png"}
              alt={selectedDetails.title}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-60 md:h-60 object-cover rounded-full shadow-lg"
            />
          </div>

          {/* Right: Text + Desktop Back button */}
          {/* <div className="w-full md:w-1/2 text-center md:text-left max-w-xl order-2 md:order-1 md:pl-6"> */}
          <div className="w-full md:w-1/2 text-center md:text-left max-w-xl order-2 md:order-1 md:pl-12">
            {/* Desktop back button */}
            <div className="hidden sm:block mb-4">
              <button
                onClick={() => navigate("/insurance")}
                className="inline-flex items-center gap-3 bg-white/20 rounded-full px-4 py-2 hover:bg-white/30 transition"
              >
                <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-white rounded-full">
                  <FaArrowLeft className="w-3 h-3 text-black" />
                </span>
                <span className="text-base md:text-lg font-lato text-white leading-snug">
                  Back to insurance
                </span>
              </button>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-4xl font-lato font-semibold mb-2 sm:mb-3 md:mb-4 text-white leading-snug">
              {selectedDetails.title}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg font-lato text-white leading-relaxed">
              {selectedDetails.description}
            </p>
          </div>
        </div>
      </section>

      {/* Page Title */}
      <motion.h1
        variants={fadeInUp}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 md:mb-12 bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] text-transparent bg-clip-text px-4"
      >
        {insuranceType} Insurance
      </motion.h1>

      {/* Vehicle Insurance Section */}
      {(insuranceType === "Two Wheeler" ||
        insuranceType === "Four Wheeler") && (
        <motion.div
          variants={fadeInUp}
          className="max-w-4xl mx-auto mt-6 sm:mt-8 md:mt-12 mb-12 px-4 sm:px-6"
        >
          {/* Search */}
          <div className="relative mb-4">
            <motion.input
              whileFocus={{
                scale: 1.02,
                boxShadow: "0px 0px 12px rgba(55,38,231,0.3)",
              }}
              type="text"
              value={search}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                setFilteredSuggestions(vehicleOptions);
              }}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search plans or offers..."
              className="w-full p-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3726E7] transition shadow text-sm sm:text-base"
            />
            {/* {isFocused && filteredSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-blue-200 rounded-xl mt-1 shadow-lg max-h-48 overflow-y-auto text-sm sm:text-base">
                {filteredSuggestions.map((suggestion, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-4 py-2 hover:bg-[#eef2ff] cursor-pointer"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </motion.li>
                ))}
              </ul>
            )} */}
            {isFocused && filteredSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-blue-200 rounded-xl mt-1 shadow-lg max-h-48 overflow-y-auto text-sm sm:text-base">
                {filteredSuggestions.map((suggestion, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-4 py-2 hover:bg-[#eef2ff] cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault(); // prevents input from losing focus before click
                      handleSelectSuggestion(suggestion);
                    }}
                  >
                    {suggestion}
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          {/* Selected Option Details */}
          {selectedOption && (
            <motion.div
              variants={fadeInUp}
              className="bg-white/90 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border-t-4 border-[#3726E7] hover:shadow-2xl transition duration-300 mt-6"
            >
              <motion.h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] text-transparent bg-clip-text">
                {selectedOption}
              </motion.h2>
              <p className="mb-3 sm:mb-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                {/* {insuranceDetails[selectedOption].description} */}
                {insuranceDetails[insuranceType]?.[selectedOption]?.description}
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
                Price Range:{" "}
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-[#2996F7] font-bold"
                >
                  {/* {insuranceDetails[selectedOption].priceRange} */}
                  {
                    insuranceDetails[insuranceType]?.[selectedOption]
                      ?.priceRange
                  }
                </motion.span>
              </p>

              {/* SPL Offer Animation */}
              <motion.div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
                <motion.img
                  src="images/SPLoffer.png"
                  alt="Special Offer"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                  {...bounce}
                />
                <p className="font-bold text-sm sm:text-base text-gray-800 text-center sm:text-left">
                  {/* {insuranceDetails[selectedOption].offer} */}
                  {insuranceDetails[insuranceType]?.[selectedOption]?.offer}
                </p>
              </motion.div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${buttonClasses} w-full sm:w-auto bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] text-white`}
                  onClick={() => setShowInsuranceForm(true)}
                >
                  Explore More
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Term Life / Health Insurance Section */}
      {(insuranceType === "Term Life" || insuranceType === "Health") && (
        <motion.div
          variants={fadeInUp}
          className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md mt-6 sm:mt-8 md:mt-12 
             p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-[#3726E7]/30 
             hover:shadow-2xl transition duration-300 px-4 sm:px-6 mb-12"
        >
          <p className="mb-3 sm:mb-4 text-gray-700 leading-relaxed text-sm sm:text-base">
            {insuranceDetails[insuranceType].description}
          </p>

          {insuranceDetails[insuranceType].keyPoints && (
            <ul className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
              {insuranceDetails[insuranceType].keyPoints?.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-2 text-gray-800 font-medium text-sm sm:text-base"
                >
                  ✅ {point}
                </motion.li>
              ))}
            </ul>
          )}

          {/* {insuranceDetails[insuranceType].extraLinks && (
            <div className="mb-4 sm:mb-6">
              <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-2">
                Useful Links
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {insuranceDetails[insuranceType].extraLinks?.map(
                  (link, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{ scale: 1.05, x: 3 }}
                      className="flex items-center gap-2 bg-white/90 px-3 sm:px-4 py-2 rounded-lg shadow-sm border hover:border-[#3726E7] cursor-pointer text-[#2996F7] font-medium text-sm sm:text-base"
                    >
                      <FaLink /> {link}
                    </motion.li>
                  )
                )}
              </ul>
            </div>
          )} */}
          {insuranceDetails[insuranceType].extraLinks && (
            <div className="mb-4 sm:mb-6">
              <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-2">
                Useful Links
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {insuranceDetails[insuranceType].extraLinks?.map(
                  (link, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{ scale: 1.05, x: 3 }}
                      className="flex items-center gap-2 bg-white/90 px-3 sm:px-4 py-2 rounded-lg shadow-sm border hover:border-[#3726E7] cursor-pointer text-[#2996F7] font-medium text-sm sm:text-base"
                    >
                      <FaLink />
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  )
                )}
              </ul>
            </div>
          )}

          <p className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
            Price Range:{" "}
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[#2996F7] font-bold"
            >
              {insuranceDetails[insuranceType].priceRange}
            </motion.span>
          </p>

          {/* SPL Offer Animation */}
          <motion.div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
            <motion.img
              src="images/SPLoffer.png"
              alt="Special Offer"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              {...bounce}
            />
            <p className="font-bold text-sm sm:text-base text-gray-800 text-center sm:text-left">
              {insuranceDetails[insuranceType].offer}
            </p>
          </motion.div>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className={`${buttonClasses} w-full sm:w-auto bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] text-white`}
              onClick={() => setShowInsuranceForm(true)}
            >
              Explore More
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Render the correct form */}
      {showInsuranceForm && (
        <>
          {(insuranceType === "Two Wheeler" ||
            insuranceType === "Four Wheeler") && (
            <FillVehicleInsuranceForm
              onClose={() => setShowInsuranceForm(false)}
              mainService="Vehicle Insurance"
              subService={insuranceType}
            />
          )}
          {(insuranceType === "Term Life" || insuranceType === "Health") && (
            <FillHealthInsuranceForm
              onClose={() => setShowInsuranceForm(false)}
              mainService="Health Insurance"
              subService={insuranceType}
            />
          )}
        </>
      )}

      <ClaimAndWhyBuy />
    </motion.div>
  );
};

export default InsuranceSubServicePage;
