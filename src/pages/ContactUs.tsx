// src/pages/ContactUs.tsx
import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

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

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3726E7]/5 via-[#2996F7]/5 to-[#FB7196]/5 pt-32 sm:pt-40 px-4 sm:px-12 pb-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side - Contact Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-12 space-y-8">
          <h1 className="text-3xl font-bold text-[#3726E7] mb-4">Contact Us</h1>

          {/* Address */}
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-[#3726E7] mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-[#3726E7]">Address</h2>
              <p className="mt-1 text-gray-700">
                Dakseyu Pvt Ltd
                <br />
                647/10, 2nd Floor, Brindavana Complex,
                <br />
                Dr Rajkumar Road, D Block, 2nd Stage, Rajajinagar,
                <br />
                Near DCB Bank, Gayatrinagar, Bengaluru, Karnataka 560010
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-[#3726E7] mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-[#3726E7]">Phone</h2>
              <div className="mt-1 text-gray-700 space-y-1">
                <a
                  href="tel:+916366295968"
                  className="block hover:text-[#FB7196]"
                >
                  +91 63662 95968
                </a>
                <a
                  href="tel:+919986357888"
                  className="block hover:text-[#FB7196]"
                >
                  +91 99863 57888
                </a>
                <a
                  href="tel:+919980339626"
                  className="block hover:text-[#FB7196]"
                >
                  +91 99803 39626
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-[#3726E7] mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-[#3726E7]">Email</h2>
              <div className="mt-1 text-gray-700 space-y-1">
                {/* <a
                  href="mailto:gangadhar4893@gmail.com"
                  className="block hover:text-[#2996F7]"
                >
                  gangadhar4893@gmail.com
                </a>                */}
                <span>
                  <button
                    onClick={handleEmailClick}
                    className="block hover:text-[#2996F7]"
                    // className="text-gray-800 font-medium hover:text-blue-600"
                  >
                    contact@dakseyu.info
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* Careers */}
          {/* <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-[#3726E7] mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-[#3726E7]">Careers</h2>
              <p className="mt-1 text-gray-700">
                We are always looking for passionate and talented people to join
                our team.
              </p>
              <a
                href="/careers"
                className="inline-block mt-2 text-[#3726E7] font-medium hover:text-[#FB7196]"
              >
                View Open Positions →
              </a>
            </div>
          </div> */}
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-[#3726E7] mt-1 flex-shrink-0" />

            <div>
              <h2 className="text-xl font-semibold text-[#3726E7]">Careers</h2>
              <p className="mt-1 text-gray-700">
                We are always looking for passionate and talented people to join
                our team.
              </p>
              <a
                href="/careers"
                className="inline-block mt-5 text-[#3726E7] font-medium hover:text-[#FB7196]"
              >
                View Open Positions →
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Google Map */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <iframe
            title="Dakseyu Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.9718440468035!2d77.55308933493056!3d13.000640316424587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d850b0e8cc5%3A0xd9a912cecd5a818e!2sDAKSEYU%20Private%20Limited%20(Ksheersa%20Accounting%20services%20Pvt%20Ltd)!5e0!3m2!1sen!2sin!4v1760600510410!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="min-h-[300px] md:min-h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
