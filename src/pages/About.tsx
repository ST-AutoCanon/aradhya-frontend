// src/pages/About.tsx
import React from "react";
import { Target, Users, Award, MessageCircle, Briefcase } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 sm:pt-40 px-4 sm:px-6 md:px-12 pb-12">
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
        {/* About Us */}
        {/* <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-md p-6 sm:p-10 md:p-12 hover:shadow-xl transition-transform transform hover:-translate-y-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3726E7] mb-4 sm:mb-6">
            About Us
          </h1>
          <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4">
            M/s Dakseyu Group are the best manufacturers, service providers &
            wholesale traders of students’ friendly notebooks, textbooks, and
            other stationery items. Millions of customers across India have
            accessed our variety of products & services including Insurance
            Advisory Services, Accounting – Auditing & Consulting Services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We guide, educate, and cover all the risks for the benefits of our
            clients. Majority rely on us for our guarantee of resources and
            commitment. Our aim is to reach every citizen in India.
          </p>
        </section> */}
        <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-md p-6 sm:p-10 md:p-12 hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3726E7]">
            About Us
          </h1>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
            M/s Dakseyu Group are the best manufacturers, service providers &
            wholesale traders of students’ friendly notebooks, textbooks, and
            other stationery items. Millions of customers across India have
            accessed our variety of products & services including Insurance
            Advisory Services, Accounting – Auditing & Consulting Services.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
            We guide, educate, and cover all the risks for the benefits of our
            clients. Majority rely on us for our guarantee of resources and
            commitment. Our aim is to reach every citizen in India.
          </p>
        </section>

        {/* Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-md p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#FB7196]/20 p-2 rounded-full">
                <Target className="text-[#FB7196] w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3726E7]">
                Vision
              </h2>
            </div>
            {/* <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
              Our customers will enjoy the benefits of dealing with a global
              Indian brand that understands their needs and delivers customized
              solutions. “ONE STOP SOLUTION FOR ALL” @ Dakseyu Groups
            </p> */}
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
              Our customers will enjoy the benefits of dealing with a global
              Indian brand that understands their needs and delivers customized
              solutions. “ONE STOP SOLUTION FOR ALL”
              <br />@ Dakseyu Groups
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-md p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#FB7196]/20 p-2 rounded-full">
                <Users className="text-[#FB7196] w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3726E7]">
                Mission
              </h2>
            </div>
            <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base md:text-lg space-y-1">
              <li>
                Be the most preferred provider of consumer services in India.
              </li>
              <li>Achieve healthy growth & offer consistent service.</li>
              <li>
                Provide top-notch service facilitating growth & sustainability.
              </li>
              <li>
                Build enduring value and relationships by providing timely
                solutions.
              </li>
            </ul>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-md p-6 sm:p-8 hover:shadow-xl transition-transform transform hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <div className="bg-[#FB7196]/20 p-2 rounded-full">
              <Award className="text-[#FB7196] w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3726E7]">
              Values
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base md:text-lg">
            <li>
              <strong>Quality:</strong> Never compromise on quality
            </li>
            <li>
              <strong>Integrity:</strong> Striving for excellence
            </li>
            <li>
              <strong>Reliability:</strong> Earn reliability by matching
              services with expectations
            </li>
            <li>
              <strong>Prosperity:</strong> Dakseyu Group believes in every
              individual’s growth
            </li>
          </ul>
        </section>

        {/* Director’s Message */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#3726E7] mb-12">
              Our Management Team
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
              {/* Team Member */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-md p-6 sm:p-8 flex items-center gap-6 hover:shadow-xl transition-transform transform hover:-translate-y-1">
                <img
                  src="/team/gangadhar.jpg"
                  alt="Gangadhar Aradhya"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-[#3726E7]/20"
                />
                <div>
                  <h3 className="text-xl font-bold text-[#3726E7]">
                    Gangadhar Aradhya
                  </h3>
                  <p className="text-gray-700 font-medium">M.Com, LL.B</p>
                  <p className="text-gray-600">Managing Director</p>
                </div>
              </div>

              {/* Team Member */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-md p-6 sm:p-8 flex items-center gap-6 hover:shadow-xl transition-transform transform hover:-translate-y-1">
                <img
                  src="/team/kirankumar.jpg"
                  alt="Kirankumar B.V."
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-[#3726E7]/20"
                />
                <div>
                  <h3 className="text-xl font-bold text-[#3726E7]">
                    Kirankumar B.V.
                  </h3>
                  <p className="text-gray-700 font-medium">FCA</p>
                  <p className="text-gray-600">
                    Advisor in Audit, Account & Taxation
                  </p>
                </div>
              </div>

              {/* Team Member */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-md p-6 sm:p-8 flex items-center gap-6 hover:shadow-xl transition-transform transform hover:-translate-y-1">
                <img
                  src="/team/shivakumar.jpg"
                  alt="Shivakumar B.R"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-[#3726E7]/20"
                />
                <div>
                  <h3 className="text-xl font-bold text-[#3726E7]">
                    Shivakumar B.R
                  </h3>
                  <p className="text-gray-600">Director</p>
                </div>
              </div>

              {/* Team Member */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-md p-6 sm:p-8 flex items-center gap-6 hover:shadow-xl transition-transform transform hover:-translate-y-1">
                <img
                  src="/team/mahesh.jpg"
                  alt="Mahesh M.C."
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-[#3726E7]/20"
                />
                <div>
                  <h3 className="text-xl font-bold text-[#3726E7]">
                    Mahesh M.C.
                  </h3>
                  <p className="text-gray-700 font-medium">M.Com</p>
                  <p className="text-gray-600">General Manager</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#3726E7] mb-12">
              Our Management Team
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
             
              <div className="bg-white shadow-md p-6 rounded-xl text-center">
                <img
                  src="/public/team/gangadhar.jpg"
                  className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
                  alt="Gangadhar"
                />
                <h3 className="text-xl font-bold text-[#3726E7]">
                  Gangadhar Aradhya
                </h3>
                <p className="text-gray-700 font-medium">M.Com, LL.B</p>
                <p className="text-gray-600">Managing Director</p>
              </div>

              <div className="bg-white shadow-md p-6 rounded-xl text-center">
                <img
                  src="/public/team/kirankumar.jpg"
                  className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
                  alt="Kiran"
                />
                <h3 className="text-xl font-bold text-[#3726E7]">
                  Kirankumar B.V.
                </h3>
                <p className="text-gray-700 font-medium">FCA</p>
                <p className="text-gray-600">Audit & Taxation Advisor</p>
              </div>

              <div className="bg-white shadow-md p-6 rounded-xl text-center">
                <img
                  src="/public/team/shivakumar.jpg"
                  className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
                  alt="Shivakumar"
                />
                <h3 className="text-xl font-bold text-[#3726E7]">
                  Shivakumar B.R
                </h3>
                <p className="text-gray-600">Director</p>
              </div>

              <div className="bg-white shadow-md p-6 rounded-xl text-center">
                <img
                  src="/public/team/mahesh.jpg"
                  className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
                  alt="Mahesh"
                />
                <h3 className="text-xl font-bold text-[#3726E7]">
                  Mahesh M.C.
                </h3>
                <p className="text-gray-700 font-medium">M.Com</p>
                <p className="text-gray-600">General Manager</p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Services Offered */}
        <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-md p-6 sm:p-8 hover:shadow-xl transition-transform transform hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <div className="bg-[#FB7196]/20 p-2 rounded-full">
              <Briefcase className="text-[#FB7196] w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3726E7]">
              Services Offered
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            <p>
              We have a highly experienced team confident in handling tasks of
              any complexity.
            </p>
            <ol className="list-decimal list-inside space-y-2 sm:space-y-3">
              <li>
                <strong>Education Institution Services:</strong>
                <ul className="list-disc list-inside ml-5 space-y-1">
                  <li>
                    Supply of stationery items and textbooks as per board
                    requirements.
                  </li>
                  <li>
                    Printing and supplying school dairies, brochures, ID cards,
                    prospectus, medals, and mementos.
                  </li>
                  <li>
                    Training and placement facilities for students and staff.
                  </li>
                  <li>Tour operator services for educational institutions.</li>
                </ul>
              </li>
              <li>
                <strong>Life and General Insurance Advisory Services:</strong>
                <ul className="list-disc list-inside ml-5 space-y-1">
                  <li>
                    Motor Insurance – Bikes, Cars, Buses, Vans, Goods Carriers.
                  </li>
                  <li>Health Insurance – Individual & Family plans.</li>
                  <li>Group Medi-claim Insurance for employees & family.</li>
                  <li>Fire & Burglary Insurance.</li>
                  <li>Travel Insurance.</li>
                  <li>
                    Life Insurance – Term, Savings, Retirement, ULIP plans.
                  </li>
                </ul>
              </li>
              <li>
                <strong>
                  Accounts, Auditing, and Tax Consultant Services:
                </strong>
                <ul className="list-disc list-inside ml-5 space-y-1">
                  <li>
                    Income tax registration and filing – Individual & Corporate.
                  </li>
                  <li>GST registration and monthly filing.</li>
                  <li>Bookkeeping through trained accountants.</li>
                  <li>Internal control & financial transaction review.</li>
                  <li>
                    Assistance for 80G and 12A certificate registration/renewal.
                  </li>
                  <li>
                    Assistance for society and trust registration/renewal.
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
