import React from "react";

interface TotalEnquiriesProps {
  serviceData: any;
}

const TotalEnquiries: React.FC<TotalEnquiriesProps> = ({ serviceData }) => {
  const data = serviceData?.totalEnquiries || { total: 0 };

  // Filter out the 'total' key so we can display the rest dynamically
  const subServices = Object.keys(data).filter((key) => key !== "total");

  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 sm:p-6 bg-white rounded-[14px] shadow">
      {/* Total Enquiries */}

      <div className="bg-[#EBEBEB] p-4 rounded-lg">
        <span className="text-[16px] font-normal text-black">
          Total Enquiries
        </span>
        <p className="text-3xl font-semibold text-black">{data.total}</p>
      </div>
      {/* Sub-services dynamically */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
  {subServices.map((key, index) => (
    <div
      key={key}
      className={`flex flex-col gap-2 p-4 rounded ${
        index % 2 === 0 ? "bg-[#F1EDFE]" : "bg-[#EDF5E8]"
      }`}
    >
      <span className="text-[14px] sm:text-[16px] font-normal text-black">
        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
      </span>
      <p className="text-xl sm:text-2xl font-semibold text-black">{data[key]}</p>
    </div>
  ))}
</div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {subServices.map((key, index) => (
          <div
            key={key}
            className={`flex flex-col gap-2 p-4 rounded ${
              index % 2 === 0 ? "bg-[#F1EDFE]" : "bg-[#EDF5E8]"
            }`}
          >
            <span className="text-[14px] sm:text-[16px] font-normal text-black">
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </span>
            <p className="text-xl sm:text-2xl font-semibold text-black">
              {data[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalEnquiries;
