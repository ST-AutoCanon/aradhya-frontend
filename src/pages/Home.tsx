import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useBanner } from "../context/BannerContext";

interface Video {
  id: string;
  url: string;
  description: string;
}

interface User {
  pic: string;
  name: string;
  role: string;
  company: string;
  testimonial: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { bannerMessages } = useBanner();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Users data (unchanged)
  // const users: User[] = [
  //   {
  //     pic: "/testimonial2.png",
  //     name: "Appayya Hiremath",
  //     role: "Spiritual Professor.",
  //     company: "",
  //     testimonial:
  //       "I appreciate Dakseyu Private Limited for their exceptional service, professionalism, and reliable support. Highly recommended!",
  //   },
  //   {
  //     pic: "/avatar.png",
  //     name: "Kiran Patil",
  //     role: "Senior Project Manager",
  //     company: "",
  //     testimonial:
  //       "Really happy with Dakseyu Private Limited – their insurance support is smooth and professional.",
  //   },
  //   {
  //     pic: "/avatar.png",
  //     name: "Vinayak Natikar",
  //     role: "Software Developer",
  //     company: "",
  //     testimonial:
  //       "Dakseyu Private Limited delivers professional and efficient service with reliable support. Truly impressed!",
  //   },
  //   {
  //     pic: "/avatar.png",
  //     name: "Pavithra",
  //     role: "Accountant",
  //     company: "",
  //     testimonial:
  //       "I deeply appreciate Dakseyu Private Limited for their efficient and thorough auditing services. Their professionalism stands out!",
  //   },
  //   {
  //     pic: "/avatar.png",
  //     name: "Prajwal",
  //     role: "Financial Advisor",
  //     company: "",
  //     testimonial:
  //       "Big thanks to Dakseyu Private Limited for making our auditing process smooth and hassle-free. Highly recommend!",
  //   },
  //   {
  //     pic: "/avatar.png",
  //     name: "Sarika",
  //     role: "Engineer",
  //     company: "",
  //     testimonial:
  //       "Insurance handled perfectly by Dakseyu Private Limited – fast, reliable, and professional service!",
  //   },
  // ];


  const users: User[] = [
    {
      pic: "/testimonial2.png",
      name: "Arunkumar Patil",
      role: "President",
      company: "Akshara Sri Vidya Public School & SV International School",
      testimonial:
        "We appreciate the professional approach and reliable support provided by Dakseyu Private Limited.",
    },
    {
      pic: "/avatar.png",
      name: "Sandra M Dilema",
      role: "General Manager",
      company: "Right Gear Logistics",
      testimonial:
        "Dakseyu Private Limited has demonstrated professionalism and dependable support throughout our association.",
    },
    {
      pic: "/avatar.png",
      name: "Nataraja MS",
      role: "Secretary",
      company: "Venus International School",
      testimonial:
        "We value the professional service and consistent support provided by Dakseyu Private Limited.",
    },
    {
      pic: "/avatar.png",
      name: "Kiran Kumar BV, FCA",
      role: "FCA",
      company: "",
      testimonial:
        "Dakseyu Private Limited provides professional and reliable service with a strong focus on client support.",
    },
    {
      pic: "/avatar.png",
      name: "Naveen Kumar BV",
      role: "CEO",
      company: "Rohan Capital",
      testimonial:
        "We appreciate Dakseyu Private Limited for their professional approach and reliable service.",
    },
    {
      pic: "/avatar.png",
      name: "Bhadram",
      role: "Owner",
      company: "Right Gear Logistics",
      testimonial:
        "Dakseyu Private Limited has provided dependable support with professionalism and efficiency.",
    },
    {
      pic: "/avatar.png",
      name: "Nanjundaiah",
      role: "Secretary",
      company: "Cordial School",
      testimonial:
        "We appreciate the efficient service and professional support provided by Dakseyu Private Limited.",
    },
    {
      pic: "/avatar.png",
      name: "Ganganna",
      role: "",
      company: "Harward Group of Institutions",
      testimonial:
        "Dakseyu Private Limited has been professional, responsive, and reliable in their service.",
    },
    {
      pic: "/avatar.png",
      name: "Balakrishna",
      role: "",
      company: "Sri Sharada Cambridge International School",
      testimonial:
        "We appreciate the professional service and dependable support provided by Dakseyu Private Limited.",
    },
    {
      pic: "/avatar.png",
      name: "Ranganath",
      role: "",
      company: "Sri Sharada Cambridge International School",
      testimonial:
        "Dakseyu Private Limited delivers professional service with reliable and responsive support.",
    },
    {
      pic: "/avatar.png",
      name: "Yashwanth",
      role: "",
      company: "Sri Sai Modern English School",
      testimonial:
        "We appreciate Dakseyu Private Limited for their professional service and consistent support.",
    },
    {
      pic: "/avatar.png",
      name: "Kumar",
      role: "",
      company: "AS Logistics",
      testimonial:
        "Dakseyu Private Limited provides dependable service with a professional and client-focused approach.",
    },
  ];
  const partners = [
    { id: 1, logo: "testimonials/appolor.png", name: "Partner 1" },
    { id: 2, logo: "testimonials/bupa.png", name: "Partner 2" },
    { id: 3, logo: "testimonials/care.png", name: "Partner 3" },
    { id: 4, logo: "testimonials/united.png", name: "Partner 4" },
    { id: 5, logo: "testimonials/chola.png", name: "Partner 5" },
    { id: 6, logo: "testimonials/future_gen.png", name: "Partner 6" },
    { id: 7, logo: "testimonials/hdfc.png", name: "Partner 7" },
    { id: 8, logo: "testimonials/icici.png", name: "Partner 8" },
    { id: 9, logo: "testimonials/iffco.png", name: "Partner 9" },
    { id: 10, logo: "testimonials/reliance.png", name: "Partner 10" },
    { id: 11, logo: "testimonials/sbi-gen.png", name: "Partner 11" },
    { id: 12, logo: "testimonials/sbi.png", name: "Partner 12" },
    { id: 13, logo: "testimonials/star.png", name: "Partner 13" },
    { id: 14, logo: "testimonials/sundaram.png", name: "Partner 14" },
    { id: 15, logo: "testimonials/tataAIG.png", name: "Partner 15" },
  ];

  // Fetch videos from backend
  // Fetch videos from backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/uploaded_files`
        );
        const videoFiles: Video[] = res.data
          .filter((f: any) => f.type === "video")
          .map((v: any) => ({
            id: v._id,
            url: `${import.meta.env.VITE_BACKEND_URL}${v.url}`,
            description: v.description || "",
          }));
        setVideos(videoFiles);
        if (videoFiles.length > 0) setSelectedVideo(videoFiles[0]);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="w-full">
      {/* ✅ Banner Carousel */}
      <section className="w-full pt-10">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="w-full"
        >
          {[
            {
              img: "InsurancePerson.png",
              alt: "Insurance Agent",
              title: "Insurance Services",
              desc: "Protect your life, vehicle, and health with our comprehensive insurance plans.",
              route: "/insurance",
            },
            {
              img: "AuditingHomeBanner.png",
              alt: "Auditing Agent",
              title: "Auditing Services",
              desc: "Efficient, accurate, and insightful auditing services for your business.",
              route: "/auditing",
            },
            {
              img: "BooksHomeBanner.png",
              alt: "Books & Stationary",
              title: "Books and Stationery Services",
              desc: "Explore our wide range of books, study materials, and school essentials.",
              route: "/booksStationary",
            },
          ].map((slide, i) => (
            <SwiperSlide key={i}>
              <div
                className="w-full bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] 
          flex flex-col md:flex-row items-center 
          py-10 md:py-20 px-6 md:px-24 
          min-h-[600px] sm:min-h-[650px] md:min-h-[700px]"
              >
                {/* Image */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0 order-1 md:order-2">
                  <img
                    src={slide.img}
                    alt={slide.alt}
                    className="w-[280px] sm:w-[350px] md:w-[600px] h-[250px] sm:h-[320px] md:h-[500px] object-contain"
                  />
                </div>

                {/* Text */}
                {/* <div className="w-full md:w-1/2 text-center md:text-left max-w-xl order-2 md:order-1 md:pl-12"> */}
                <div className="w-full md:w-1/2 text-center md:text-left max-w-xl order-2 md:order-1 md:pl-12 flex flex-col gap-4">
                  <h1 className="text-3xl sm:text-4xl md:text-4xl font-lato font-semibold mb-4 text-white">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-lg font-lato mb-6 text-white">
                    {slide.desc}
                  </p>

                  <button
                    onClick={() => navigate(slide.route)}
                    className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-800 transition w-[140px] sm:w-[160px] md:w-[170px] mt-6"
                  >
                    Get started
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <div className="bg-gray-300 py-2 px-6 overflow-hidden">
        <div className="inline-block animate-scroll whitespace-nowrap">
          {/* <span className="text-gray-800 font-medium text-sm sm:text-base">
            {bannerMessages}
            {bannerMessages}
          </span> */}
          <span className="text-gray-800 font-medium text-sm sm:text-base">
            {bannerMessages.join("   ")}
            {/* Add 2–3 spaces for readability */}
            {"   "}
            {bannerMessages.join("   ")}
          </span>
        </div>
      </div>

      {/* Services*/}
      <section className="py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="text-blue-600">Our</span>{" "}
          <span className="text-pink-600">Services</span>
        </h2>
      </section>

      <section className="py-12 bg-gray-50 w-full">
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
          <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-12 justify-items-center">
            {[
              {
                img: "images/Insurance_Serivces.png",
                title: "Insurance Services",
                desc: "Get Additional Protection for your life, vehicle, and health with our comprehensive plans.",
              },
              {
                img: "images/Auditing_Services.png",
                title: "Auditing Services",
                desc: "Professional auditing services to ensure accuracy and compliance for your business.",
              },
              {
                img: "images/Books_Stationary_Services.png",
                title: "Books & Stationery",
                desc: "Quality stationery and books for personal and professional use.",
              },
            ].map((item, index) => (
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
                  <p className="text-sm sm:text-base text-gray-700 mb-4">
                    {item.desc}
                  </p>
                  <button
                    // className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm px-6 py-2 rounded-full transition transform hover:scale-105 hover:shadow-lg"
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm px-6 py-2 rounded-full transition transform hover:scale-105 hover:shadow-lg mt-4 sm:mt-6 md:mt-8"
                    onClick={() => {
                      if (item.title.includes("Insurance"))
                        navigate("/insurance");
                      else if (item.title.includes("Auditing"))
                        navigate("/auditing");
                      else if (item.title.includes("Books"))
                        navigate("/booksStationary");
                      else if (item.title.includes("Consultancy"))
                        navigate("/consultancy");
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Latest News Section */}
      <section className="bg-[#0a1f44] text-white py-12 w-full">
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
          <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
            Latest News
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left - Big Video */}
            <div className="w-full md:w-2/3 bg-white text-black shadow-lg rounded-lg h-[250px] sm:h-[300px] md:h-[450px]">
              {selectedVideo && (
                <video
                  controls
                  className="w-full h-full object-cover rounded-lg"
                  key={selectedVideo.id}
                >
                  <source src={selectedVideo.url} type="video/mp4" />
                </video>
              )}
            </div>

            {/* Right - Thumbnails */}
            <div className="flex flex-col gap-3 overflow-y-auto h-[250px] sm:h-[300px] md:h-[450px] w-full md:w-[480px]">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className={`bg-white text-black shadow p-2 sm:p-3 rounded-lg cursor-pointer flex flex-row items-start gap-3 transition hover:bg-gray-100 ${
                    selectedVideo?.id === video.id
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => setSelectedVideo(video)}
                >
                  {/* Thumbnail Video */}
                  <video className="w-24 sm:w-28 md:w-50 h-16 sm:h-20 md:h-28 object-cover rounded flex-shrink-0">
                    <source src={video.url} type="video/mp4" />
                  </video>

                  {/* Description next to thumbnail */}
                  <p className="text-xs sm:text-sm md:text-sm text-gray-700 flex-1 break-words">
                    {video.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Partners Auto-Scrolling Slider */}
      <section className="text-center py-10 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="text-blue-600">Our</span>{" "}
          <span className="text-blue-600">Partners</span>
        </h2>

        <div className="mt-8 px-6 md:px-24">
          {" "}
          {/* Added same padding as banner for consistency */}
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={3000}
            loop
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 30 },
              1024: { slidesPerView: 5, spaceBetween: 40 },
            }}
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <div className="flex justify-center items-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-[120px] h-[60px] md:w-[180px] md:h-[80px] object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Testimonials */}

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
            className="items-stretch"
          >
            {users.map((user, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg h-full min-h-[280px] flex flex-col">
                  {/* User info */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="text-left flex-1 min-w-0 pr-4">
                      <h3 className="text-lg sm:text-xl font-bold">
                        {user.name}
                      </h3>

                      {user.role && (
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                          {user.role}
                        </p>
                      )}

                      {user.company && (
                        <p className="text-sm sm:text-base text-gray-600">
                          {user.company}
                        </p>
                      )}
                    </div>

                    {/* User image */}
                    <img
                      src={user.pic}
                      alt={user.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full flex-shrink-0"
                    />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 mb-4" />

                  {/* Testimonial */}
                  <p className="text-gray-700 text-sm sm:text-base text-left leading-relaxed">
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

export default Home;
