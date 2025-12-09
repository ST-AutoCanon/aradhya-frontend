import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ClaimAndWhyBuy from "../ClaimAndWhyBuy";
import FillDetailsAuditing from "../FillDetails/FillDetailsAuditing"; // Ensure correct path
import { FaArrowLeft } from "react-icons/fa";
// Bounce/pop animation for offer image
const bounce = {
  animate: {
    y: [0, -10, 0],
    scale: [1, 1.1, 1],
    transition: { duration: 1.2, repeat: Infinity },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

type AuditServiceDetails = {
  title: string;
  description: string;
  keyPoints?: string[];
  offer?: string;
  image?: string;
};

const AuditingSubServicePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const serviceType: string =
    location.state?.type || "Bookkeeping & Day-to-Day Accounting";
  const [showForm, setShowForm] = useState(false);

  const auditServices: Record<string, AuditServiceDetails> = {
    "Bookkeeping & Day-to-Day Accounting": {
      title: "Bookkeeping & Day-to-Day Accounting",
      description:
        "Keep your financial records accurate, up-to-date, and ready for decision-making.",
      keyPoints: [
        "Recording daily transactions & maintaining ledgers",
        "Accounts receivable & payable management",
        "Bank and cash reconciliations",
        "Inventory accounting",
      ],
      offer: "Special Offer: Start your accounting journey today!",
      image: "images/Book_Day_To_Day.png",
    },
    "Financial Reporting & Statements": {
      title: "Financial Reporting & Statements",
      description:
        "Clear, compliant, and insightful reports to understand your business performance.",
      keyPoints: [
        "Profit & Loss, Balance Sheet, and Cash Flow statements",
        "Schedule III compliant financial statements (Companies Act)",
        "Monthly/quarterly/annual MIS reports",
        "Variance and trend analysis",
      ],
      offer: "Limited Offer: Free financial report consultation!",
      image: "images/FInancial_Reporting.png",
    },
    "Tax Compliance & Planning": {
      title: "Tax Compliance & Planing",
      description:
        "Minimise tax risks and optimise savings while staying fully compliant.",
      keyPoints: [
        "GST registration, filing & reconciliation",
        "Income Tax, TDS/TCS compliance & filing",
        "Advance tax calculation",
        "Tax audit support & representation",
        "Strategic tax planning",
      ],
      offer: "Get expert tax planning today!",
      image: "images/Tax_Planing.png",
    },
    "Auditing & Assurance Services": {
      title: "Auditing & Assurance Services",
      description:
        "Independent, thorough checks to strengthen trust and compliance.",
      keyPoints: [
        "Internal audits",
        "Statutory audit assistance",
        "Stock & inventory audits",
        "Compliance & forensic audit support",
      ],
      offer: "Ensure compliance with professional auditing!",
      image: "images/Auditing_Assurance.png",
    },
    "Payroll & Employee Compliance": {
      title: "Payroll & Employee Compliance",
      description:
        "Hassle-free payroll processing with all statutory compliances handled.",
      keyPoints: [
        "Monthly payroll processing & payslips",
        "PF, ESI, PT compliance",
        "Employee tax (TDS) filing",
        "Bonus, gratuity & leave encashment accounting",
      ],
      offer: "Streamline your payroll processes!",
      image: "images/PayRoll.png",
    },
    "Budgeting, Forecasting & Insights": {
      title: "Budgeting, Forecasting & Insights",
      description:
        "Plan with confidence and make informed financial decisions.",
      keyPoints: [
        "Annual & rolling budgets",
        "Cash flow projections",
        "Break-even & scenario analysis",
      ],
      offer: "Unlock financial insights for your business!",
      image: "images/Budget_Forecasting.png",
    },
    "Specialised Accounting Solutions": {
      title: "Specialised Accounting Solutions",
      description: "Tailored accounting for specific industries and needs.",
      keyPoints: [
        "Project & fund accounting",
        "NGO, trust & society accounting",
        "Cost & profitability analysis",
        "Fixed asset management & depreciation schedules",
        "Group company consolidation",
      ],
      offer: "Custom accounting solutions for your industry!",
      image: "images/Specialised_Accounting.png",
    },
    "Business Advisory & Consulting": {
      title: "Business Advisory & Consulting",
      description: "Your strategic partner for growth and transformation.",
      keyPoints: [
        "Accounting system setup & migration (Tally, QuickBooks, Zoho Books, SAP)",
        "Process automation & ERP integration",
        "Financial due diligence",
        "Business restructuring & valuation support",
      ],
      offer: "Get expert business advisory now!",
      image: "images/Business_Advisory.png",
    },
  };

  const selectedDetails = auditServices[serviceType];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
      className="relative min-h-screen pt-10"
    >
      {/* Banner Section */}
      {/* <section className="w-full">
        <div
          className="w-full bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] 
               flex flex-col md:flex-row items-center justify-center 
               py-10 md:py-16 px-6 gap-8"
        >
         
          <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2">
            <img
              src={selectedDetails.image || "/images/default.png"}
              alt={selectedDetails.title}
              className="w-36 h-36 sm:w-48 sm:h-48 md:w-[280px] md:h-[280px] 
                         object-cover rounded-full shadow-lg"
            />
          </div>

          
          <div className="w-full md:w-1/2 text-center md:text-left max-w-xl order-2 md:order-1 md:pl-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-lato font-semibold mb-4 text-white leading-snug">
              {selectedDetails.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-lato mb-6 text-white leading-relaxed">
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
              onClick={() => navigate("/auditing")}
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
                onClick={() => navigate("/auditing")}
                className="inline-flex items-center gap-3 bg-white/20 rounded-full px-4 py-2 hover:bg-white/30 transition"
              >
                <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-white rounded-full">
                  <FaArrowLeft className="w-3 h-3 text-black" />
                </span>
                <span className="text-base md:text-lg font-lato text-white leading-snug">
                  Back to Auditing
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
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-fixed opacity-30 -z-10"
        style={{
          backgroundImage: "url('')",
          backgroundPosition: "center",
        }}
      />

      {/* Page Title */}
      <motion.h1
        variants={fadeInUp}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center 
             mt-6 sm:mt-8 md:mt-12 mb-6 sm:mb-8 md:mb-12 leading-tight
             bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] 
             text-transparent bg-clip-text px-4"
      >
        {serviceType}
      </motion.h1>

      {/* Service Details */}
      <motion.div
        variants={fadeInUp}
        className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl 
                   border-t-4 border-[#3726E7] hover:shadow-2xl transition duration-300 
                   mt-8 sm:mt-12 max-w-4xl mx-auto"
      >
        <motion.h2
          className="text-xl sm:text-2xl font-bold mb-4
                     bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] 
                     text-transparent bg-clip-text"
        >
          {serviceType}
        </motion.h2>

        <p className="mb-4 text-gray-700 leading-relaxed text-sm sm:text-base">
          {selectedDetails.description}
        </p>

        {selectedDetails.keyPoints && (
          <ul className="space-y-2 mb-6 list-disc pl-5 sm:pl-6 text-gray-700 text-sm sm:text-base">
            {selectedDetails.keyPoints.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                {point}
              </motion.li>
            ))}
          </ul>
        )}

        {selectedDetails.offer && (
          <motion.div className="mb-6 flex items-center gap-3">
            {/* Animated Offer Image */}
            <motion.img
              src="images/SPLoffer.png"
              alt="Special Offer"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              {...bounce}
            />
            {/* Offer Text */}
            <p className="font-bold text-base sm:text-lg text-gray-800">
              {selectedDetails.offer}
            </p>
          </motion.div>
        )}

        <div className="text-center">
          <button
            className="px-5 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] 
                       text-white rounded-full shadow-md hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
            onClick={() => setShowForm(true)}
          >
            Explore More
          </button>
        </div>
      </motion.div>

      {/* Auditing Form Modal */}
      {showForm && (
        <FillDetailsAuditing
          mainService="Auditing"
          subService={serviceType}
          onClose={() => setShowForm(false)}
        />
      )}

      <ClaimAndWhyBuy />
    </motion.div>
  );
};

export default AuditingSubServicePage;
