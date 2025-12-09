//16-10-2025
// src/pages/AdminPage.tsx
import React, { useEffect, useState, useRef } from "react";
import AdminSidebar from "./AdminSidebar";
import TotalEnquiries from "./TotalEnquiries";
import EnquiriesGraph from "./EnquiriesGraph";
import EnquiriesList from "./EnquiriesList";
import UploadCloudLogoActive from "../../assets/uploadcloud_active.png";
import UploadCloudLogoInactive from "../../assets/uploadcould_Inactive.png";
import AdminUploadPage from "./AdminUploadPage";
import AdminBanner from "./AdminBanner";
import AdminJobsData from "./Jobs/AdminJobdata";

const AdminPage = () => {
  const storedPage = localStorage.getItem("activePage") || "Dashboard";
  const [activePage, setActivePage] = useState<string>(storedPage);
  const [activeButton, setActiveButton] = useState<string>("Vehicle");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [serviceData, setServiceData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const buttons = [
    { id: "Vehicle", label: "Vehicle Insurance", api: "vehicle" },
    { id: "Health", label: "Health Insurance", api: "health" },
    { id: "Auditing", label: "Auditing Service", api: "auditing" },

    {
      id: "Books-Stationary",
      label: "Books & Stationary",
      api: "Books-Stationary",
    },
  ];

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchData = async () => {
    setLoading(true);
    setError("");
    const selected = buttons.find((b) => b.id === activeButton);
    if (!selected) return;

    try {
      const res = await fetch(`${backendUrl}/api/enquiries/${selected.api}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setServiceData(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch data from server");
    } finally {
      setLoading(false);
    }
  };

  // Persist activePage
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  // Fetch data
  useEffect(() => {
    if (activePage === "Dashboard") fetchData();
  }, [activeButton, activePage]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-close dropdown after 3 seconds
  useEffect(() => {
    if (dropdownOpen) {
      const timer = setTimeout(() => setDropdownOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [dropdownOpen]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 border-r border-gray-200">
        <AdminSidebar active={activePage} setActive={setActivePage} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 p-4 sm:p-8 overflow-x-hidden">
        {activePage === "Dashboard" && (
          <div className="w-full flex flex-col gap-6">
            {/* Buttons with Dropdown */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
                {/* Custom Dropdown for first two buttons */}
                <div ref={dropdownRef} className="relative w-full sm:w-[180px]">
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className={`flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 w-full
                      ${
                        activeButton === "Vehicle" || activeButton === "Health"
                          ? "bg-black text-white"
                          : "bg-white text-[#344054] border border-[#D0D5DD] hover:bg-gray-100"
                      }`}
                  >
                    <img
                      src={
                        activeButton === "Vehicle" || activeButton === "Health"
                          ? UploadCloudLogoActive
                          : UploadCloudLogoInactive
                      }
                      alt="Upload Cloud"
                      className="w-5 h-5 mr-2.5"
                    />
                    {/* <span className="flex-1 text-sm font-medium leading-5 whitespace-nowrap text-left">
                      {activeButton === "Vehicle" || activeButton === "Health"
                        ? buttons.find((b) => b.id === activeButton)?.label
                        : "Select Insurance ▾"}
                    </span> */}

                    <span className="flex-1 text-sm font-medium leading-5 whitespace-nowrap text-left flex items-center justify-between">
                      {activeButton === "Vehicle" ||
                      activeButton === "Health" ? (
                        <>
                          {buttons.find((b) => b.id === activeButton)?.label}
                          <span className="ml-2">▾</span>
                        </>
                      ) : (
                        "Select Insurance ▾"
                      )}
                    </span>

                    {/* <svg
                      className="w-4 h-4 ml-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg> */}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute mt-1 w-full bg-white border border-[#D0D5DD] rounded-lg shadow-lg z-10">
                      {buttons.slice(0, 2).map((btn) => (
                        <button
                          key={btn.id}
                          onClick={() => {
                            setActiveButton(btn.id);
                            setDropdownOpen(false);
                          }}
                          className={`flex items-center gap-2.5 px-4 py-2.5 w-full transition-colors duration-200 text-sm leading-5
                            ${
                              activeButton === btn.id
                                ? "bg-black text-white"
                                : "hover:bg-gray-100 text-[#344054]"
                            }`}
                        >
                          <img
                            src={
                              activeButton === btn.id
                                ? UploadCloudLogoActive
                                : UploadCloudLogoInactive
                            }
                            alt="Upload Cloud"
                            className="w-5 h-5"
                          />
                          <span className="whitespace-nowrap">{btn.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Remaining buttons */}
                {buttons.slice(2).map((btn) => {
                  const isActive = activeButton === btn.id;
                  return (
                    <button
                      key={btn.id}
                      onClick={() => {
                        setActiveButton(btn.id);
                        setDropdownOpen(false); // close dropdown if open
                      }}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg transition-colors duration-200
                        ${
                          isActive
                            ? "bg-black text-white"
                            : "bg-white text-[#344054] border border-[#D0D5DD] hover:bg-gray-100"
                        }
                        w-full sm:w-[180px]`}
                    >
                      <img
                        src={
                          isActive
                            ? UploadCloudLogoActive
                            : UploadCloudLogoInactive
                        }
                        alt="Upload Cloud"
                        className="w-5 h-5"
                      />
                      <span className="font-medium text-sm leading-5 whitespace-nowrap">
                        {btn.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div>
                {loading && (
                  <div className="text-gray-500 mt-4">Loading data...</div>
                )}
                {error && <div className="text-red-500 mt-4">{error}</div>}
              </div>
            </div>

            {/* Enquiries Data */}
            <div className="flex flex-col gap-6">
              {!loading && !error && serviceData?.totalEnquiries && (
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
                  <div className="w-full sm:w-1/2 flex-shrink-0">
                    <TotalEnquiries serviceData={serviceData} />
                  </div>
                  <div className="w-full sm:w-1/2 flex-shrink-0">
                    <EnquiriesGraph serviceData={serviceData} />
                  </div>
                </div>
              )}

              {!loading && !error && serviceData?.rows && (
                <EnquiriesList
                  serviceData={serviceData}
                  refreshData={fetchData}
                  serviceName={activeButton}
                />
              )}
            </div>
          </div>
        )}

        {activePage === "Image/Video Upload" && <AdminUploadPage />}
        {activePage === "Banner Data" && <AdminBanner />}
        {activePage === "Jobs Data" && <AdminJobsData />}
      </main>
    </div>
  );
};

export default AdminPage;
