import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

interface User {
  pic: string;
  name: string;
  role: string;
  company: string;
  testimonial: string;
}

const BooksStationaryMainPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      img: "images/Customised_Notebook.png",
      title: "Customized Notebooks",
      desc: "Create personalized notebooks for schools, offices, and events to suit every need.",
      btn: "Learn More",
    },
    {
      img: "images/All_Books_Publications.png",
      title: "All Publications & Textbooks",
      desc: "Access a wide range of textbooks and publications for students and professionals.",
      btn: "Learn More",
    },
    {
      img: "images/Sports_Materials.png",
      title: "Sports Materials",
      desc: "High-quality sports equipment for schools, colleges, and clubs to promote active lifestyles.",
      btn: "Learn More",
    },
    {
      img: "images/Study_Materials.png",
      title: "Study Materials",
      desc: "Comprehensive study guides and learning materials to enhance academic performance.",
      btn: "Learn More",
    },
    {
      img: "images/PreSchool_Setup_Equipment.png",
      title: "Preschool Setup & Play Equipment",
      desc: "Safe and engaging setups for preschools including furniture and play equipment.",
      btn: "Learn More",
    },
  ];

  const users: User[] = [
    {
      pic: "/testimonial2.png",
      name: "Appayya Hiremath",
      role: "Spiritual Professor.",
      company: "",
      testimonial:
        "I appreciate Dakseyu Private Limited for their exceptional service, professionalism, and reliable support. Highly recommended!",
    },
    {
      pic: "/avatar.png",
      name: "Kiran Patil",
      role: "Senior Project Manager",
      company: "",
      testimonial:
        "Really happy with Dakseyu Private Limited – their insurance support is smooth and professional.",
    },
    {
      pic: "/avatar.png",
      name: "Vinayak Natikar",
      role: "Software Developer",
      company: "",
      testimonial:
        "Dakseyu Private Limited delivers professional and efficient service with reliable support. Truly impressed!",
    },
    {
      pic: "/avatar.png",
      name: "Pavithra",
      role: "Accountant",
      company: "",
      testimonial:
        "I deeply appreciate Dakseyu Private Limited for their efficient and thorough auditing services. Their professionalism stands out!",
    },
    {
      pic: "/avatar.png",
      name: "Prajwal",
      role: "Financial Advisor",
      company: "",
      testimonial:
        "Big thanks to Dakseyu Private Limited for making our auditing process smooth and hassle-free. Highly recommend!",
    },
    {
      pic: "/avatar.png",
      name: "Sarika",
      role: "Engineer",
      company: "",
      testimonial:
        "Insurance handled perfectly by Dakseyu Private Limited – fast, reliable, and professional service!",
    },
  ];

  const handleNavigate = (title: string) => {
    navigate("/books-stationary-details", { state: { type: title } });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full pt-10">
        {/* <div className="w-full bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] 
    flex flex-col md:flex-row items-center 
    py-10 md:py-20 px-6 md:px-24 
    min-h-[600px] sm:min-h-[650px] md:min-h-[700px]"> */}
        <div
          className="w-full bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] 
    flex flex-col md:flex-row items-center 
    py-10 md:py-20 px-6 md:px-24"
        >
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0 order-1 md:order-2">
            <img
              src="BooksHomeBanner.png"
              alt="Books&Stationary Agent"
              className="w-3/4 sm:w-2/3 md:w-[600px] h-auto object-contain"
            />
          </div>
          {/* Text */}
          {/* <div className="w-full md:w-1/2 text-center md:text-left max-w-xl order-2 md:order-1 md:pl-12"> */}
          <div className="w-full md:w-1/2 text-center md:text-left max-w-xl order-2 md:order-1 md:pl-12 flex flex-col gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-lato font-semibold mb-4 text-white">
              Books and Stationery Services
            </h1>
            <p className="text-base sm:text-lg md:text-lg font-lato mb-6 text-white">
              Explore our wide range of books, study materials,{" "}
              <br className="hidden md:block" />
              and school essentials.
            </p>
            {/* <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-800 transition w-[140px] sm:w-[160px] md:w-[170px] mt-6">
              Get started
            </button> */}
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-12 bg-gray-50 w-full">
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12 px-2 sm:px-6 md:px-0 lg:px-0 max-w-full lg:max-w-none mx-auto leading-snug">
            Discover <span className="text-blue-600">our services</span> for{" "}
            <span className="text-pink-600">Books & Stationery</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center">
            {services.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl max-w-xs w-full"
              >
                {/* Image */}
                <div className="relative w-full h-[250px] md:h-[300px]">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/100 to-transparent p-4">
                    <h3 className="font-bold text-xl md:text-2xl text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Description + Button */}
                <div className="bg-gray-50 p-4 md:p-6 flex flex-col flex-grow justify-between">
                  <p className="text-sm sm:text-base text-gray-700 mb-4 min-h-[66px]">
                    {item.desc}
                  </p>
                  <button
                    // className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm px-6 py-2 rounded-full transition transform hover:scale-105 hover:shadow-lg"
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm px-6 py-2 rounded-full transition transform hover:scale-105 hover:shadow-lg mt-4 sm:mt-6 md:mt-8"
                    onClick={() => handleNavigate(item.title)}
                  >
                    {item.btn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-200 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Section heading */}
          <h2 className="text-3xl sm:text-4xl font-lato font-bold mb-12">
            <span className="text-blue-600">What they say about</span>
          </h2>

          {/* Swiper carousel */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
          >
            {users.map((user, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-6 sm:p-8 shadow-lg flex flex-col rounded-lg min-h-[190px]">
                  {/* User info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-left flex-1">
                      <h3 className="text-lg sm:text-xl font-bold">
                        {user.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {user.role}
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        {user.company}
                      </p>
                    </div>

                    {/* User image */}
                    <img
                      src={user.pic}
                      alt={user.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full flex-shrink-0 ml-4"
                    />
                  </div>

                  {/* Testimonial */}
                  <p className="text-gray-700 text-sm sm:text-base mt-2 text-left leading-relaxed flex-none">
                    {user.testimonial}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default BooksStationaryMainPage;
