import { useState } from "react";
import AdminAddJobs from "./AdminAddJob";
import AdminViewJobs from "./AdminViewJobs";

export default function AdminJobsData() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "add" | "view">(
    "dashboard"
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      {/* Dashboard View */}
      {activeTab === "dashboard" && (
        <>
          <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
            Admin Jobs Dashboard
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-6xl mx-auto mt-5">
            {/* Add Job Card */}
            <div
              onClick={() => setActiveTab("add")}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition cursor-pointer flex flex-col justify-between"
            >
              <h2 className="text-xl font-bold text-indigo-600 mb-2">
                Add Job
              </h2>
              <p className="text-gray-600 mb-4">
                Click here to add a new job posting.
              </p>
              <button className="mt-auto bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-600 transition">
                Add Job
              </button>
            </div>

            {/* View Jobs Card */}
            <div
              onClick={() => setActiveTab("view")}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition cursor-pointer flex flex-col justify-between"
            >
              <h2 className="text-xl font-bold text-green-600 mb-2">
                View Applications
              </h2>
              <p className="text-gray-600 mb-4">
                Click here to view all job Applications.
              </p>
              <button className="mt-3 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition">
                View Applications
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add Job Content */}
      {activeTab === "add" && (
        <div>
          <button
            onClick={() => setActiveTab("dashboard")}
            className="mb-6 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded transition"
          >
            ← Back to Dashboard
          </button>
          <AdminAddJobs />
        </div>
      )}

      {/* View Jobs Content */}
      {activeTab === "view" && (
        <div>
          <button
            onClick={() => setActiveTab("dashboard")}
            className="mb-6 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded transition"
          >
            ← Back to Dashboard
          </button>
          <AdminViewJobs />
        </div>
      )}
    </div>
  );
}
