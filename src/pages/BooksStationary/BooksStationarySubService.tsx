import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ClaimAndWhyBuy from "../ClaimAndWhyBuy";
import FillDetailsBooksStationary from "../FillDetails/FillDetailsBooksStationary";
import { FaArrowLeft } from "react-icons/fa";

const bounce = {
  animate: {
    y: [0, -10, 0],
    scale: [1, 1.05, 1],
    transition: { duration: 1.2, repeat: Infinity },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

type BookCategory = {
  name: string;
  description: string[];
};

type BannerDetails = {
  image: string;
  title: string;
  description: string;
};

const BooksStationarySubService: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = location.state as { type: string };
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const bannerDetails: Record<string, BannerDetails> = {
    "All Publications & Textbooks": {
      image: "images/All_Books_Publications.png",
      title: "All Publications & Textbooks",
      description:
        "Access a wide range of textbooks and publications for students and professionals.",
    },
    "Customized Notebooks": {
      image: "images/Customised_Notebook.png",
      title: "Customized Notebooks",
      description:
        "Create personalized notebooks for schools, offices, and events to suit every need.",
    },
    "Sports Materials": {
      image: "images/Sports_Materials.png",
      title: "Sports Materials",
      description:
        "High-quality sports equipment for schools, colleges, and clubs to promote active lifestyles.",
    },
    "Study Materials": {
      image: "images/Exam_Materials.png",
      title: "Study Materials",
      description:
        "Comprehensive study guides and learning materials to enhance academic performance.",
    },
    "Preschool Setup & Play Equipment": {
      image: "images/PreSchool_Setup_Equipment.png",
      title: "Preschool Setup & Play Equipment",
      description:
        "Safe and engaging setups for preschools including furniture and play equipment.",
    },
  };

  const selectedDetails = bannerDetails[type] || {
    image: "/images/default.png",
    title: type,
    description: "Explore our wide range of books and stationery services.",
  };

  const textbookCategories: BookCategory[] = [
    {
      name: "NCERT",
      description: [
        "Books available for all standards (1st–12th).",
        "Latest editions with solutions and guides.",
        "Covers Physics, Chemistry, Math, Biology, Social Science, and Languages.",
        "Useful for school exams and competitive preparation.",
      ],
    },
    {
      name: "CBSE",
      description: [
        "Complete set of CBSE board textbooks from 1st to 12th grade.",
        "Includes reference guides and supplementary study material.",
        "Books follow NCERT curriculum and CBSE guidelines.",
        "Special combo packs for high school and senior secondary.",
      ],
    },
    {
      name: "ICSE",
      description: [
        "ICSE board syllabus textbooks for all grades.",
        "Strong focus on English and Sciences.",
        "Includes workbooks and practice guides.",
        "Recommended publications for ICSE schools.",
      ],
    },
    {
      name: "Semester Books",
      description: [
        "Semester-wise textbooks for all classes.",
        "Helps in preparing for mid-term and final exams.",
        "Aligned with school academic calendars.",
        "Includes solved examples and practice guides.",
      ],
    },
    {
      name: "Work Books",
      description: [
        "Practice workbooks for Mathematics, Science, and Languages.",
        "Activity-based learning material included.",
        "Available from preschool to higher secondary.",
        "Supports regular revision and exam preparation.",
      ],
    },
    {
      name: "Others",
      description: [
        "Miscellaneous educational books and study materials.",
        "Includes guides, sample papers, and additional reference content.",
        "Covers various subjects and special editions not listed in other categories.",
        "Useful for supplementary learning and exam preparation.",
      ],
    },
  ];

  const filteredCategories = textbookCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <section className="w-full mb-10 relative">
        {/* <div className="w-full bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] flex flex-col md:flex-row items-center justify-center py-10 md:py-16 px-4 sm:px-6 gap-6 md:gap-8 relative"> */}
        <div
          className="w-full bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] 
    flex flex-col md:flex-row items-center 
    py-10 md:py-20 px-6 md:px-24"
        >
          {/* Mobile-only Back button */}
          <div className="absolute top-8 left-4 sm:hidden">
            <button
              onClick={() => navigate("/booksStationary")}
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
            <div className="hidden sm:block mb-4">
              <button
                onClick={() => navigate("/booksStationary")}
                className="inline-flex items-center gap-3 bg-white/20 rounded-full px-4 py-2 hover:bg-white/30 transition"
              >
                <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-white rounded-full">
                  <FaArrowLeft className="w-3 h-3 text-black" />
                </span>
                <span className="text-base md:text-lg font-lato text-white leading-snug">
                  Back to Books and Stationery
                </span>
              </button>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-4xl font-lato font-semibold mb-2 sm:mb-3 md:mb-4 text-white leading-snug">
              {selectedDetails.title}
            </h1>

            <p className="text-sm sm:text-base md:text-lg font-lato text-white leading-relaxed">
              {selectedDetails.description}
            </p>
          </div>
        </div>
      </section>

      {/* Page Title */}
      <motion.h1
        variants={fadeInUp}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center 
                   mt-6 sm:mt-8 md:mt-12 mb-6 sm:mb-8 md:mb-12 leading-tight
                   bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] 
                   text-transparent bg-clip-text px-4"
      >
        {type}
      </motion.h1>

      {/* Search & Category */}
      {type === "All Publications & Textbooks" && (
        <motion.div
          variants={fadeInUp}
          className="mt-6 sm:mt-8 md:mt-12 mb-12 max-w-2xl mx-auto relative px-[10px] sm:px-0"
        >
          <input
            type="text"
            placeholder="Search books..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedCategory(null);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          {/* {isFocused && (
            <div className="absolute left-[10px] right-[10px] sm:left-0 sm:right-0 mt-2 bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto z-10">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setSearchTerm(cat.name);
                      setIsFocused(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md select-none"
                  >
                    {cat.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 select-none">
                  No matches found
                </div>
              )}
            </div>
          )} */}
          {isFocused && (
            <div className="absolute left-[10px] right-[10px] sm:left-0 sm:right-0 mt-2 bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto z-10">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat, index) => (
                  <div
                    key={index}
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevents input blur before click
                      setSelectedCategory(cat.name);
                      setSearchTerm(cat.name);
                      setIsFocused(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md select-none"
                  >
                    {cat.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 select-none">
                  No matches found
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Selected Category Details with left padding */}
      {selectedCategory && (
        <motion.div
          variants={fadeInUp}
          className="max-w-4xl bg-white p-2 sm:p-8 pl-6 sm:pl-12 pb-12 sm:pb-16 rounded-2xl shadow-xl border-t-4 border-[#3726E7] 
             mt-6 sm:mt-8 md:mt-12 mb-12 mx-[20px] sm:mx-auto"
        >
          <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            {selectedCategory}
          </h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            {textbookCategories
              .find((cat) => cat.name === selectedCategory)
              ?.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
          </ul>
          <div className="text-center mt-8">
            <button
              className="px-6 py-3 bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] text-white rounded-full shadow-md hover:scale-105 transition-transform duration-300"
              onClick={() => setShowForm(true)}
            >
              Explore More
            </button>
          </div>
        </motion.div>
      )}

      {/* Other Subservices Details with left padding */}
      {type !== "All Publications & Textbooks" && (
        <motion.div
          variants={fadeInUp}
          className="mt-6 sm:mt-8 md:mt-12 max-w-4xl mx-auto bg-white p-8 pl-6 sm:pl-12 pb-12 sm:pb-16 rounded-2xl shadow-xl border-t-4 border-[#3726E7] hover:shadow-2xl transition duration-300 mb-12 px-4 sm:px-0"
        >
          <motion.h2
            className="text-2xl font-bold mb-4
            bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] text-transparent bg-clip-text"
          >
            About our {type}
          </motion.h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our {type.toLowerCase()} services are crafted to deliver the best
            quality and reliability. Every product is carefully selected to
            ensure durability, accessibility, and affordability for students and
            institutions alike. We provide solutions that support academic
            growth, extracurricular development, and overall educational
            excellence.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Premium quality materials for long-lasting use.</li>
            <li>Affordable pricing with bulk order support.</li>
            <li>Designed to meet modern educational needs.</li>
            <li>Trusted by schools, colleges, and institutions.</li>
          </ul>
          <div className="text-center">
            <button
              className="px-6 py-3 bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] text-white rounded-full shadow-md hover:scale-105 transition-transform duration-300"
              onClick={() => setShowForm(true)}
            >
              Explore More
            </button>
          </div>
        </motion.div>
      )}

      {showForm && (
        <FillDetailsBooksStationary onClose={() => setShowForm(false)} />
      )}
      <ClaimAndWhyBuy />
    </motion.div>
  );
};

export default BooksStationarySubService;
