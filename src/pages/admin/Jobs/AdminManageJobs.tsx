import { useState } from "react";
import AdminAddJobs from "./AdminAddJob";
import AdminViewJobs from "./AdminViewJobs";

export default function AdminManageJobs() {
  const [activeTab, setActiveTab] = useState<"add" | "view" | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      {/* <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Admin Job Dashboard
      </h1> */}

      {/* Show cards only when no tab is active */}
      {!activeTab && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto mt-10">
          <div
            onClick={() => setActiveTab("add")}
            className="cursor-pointer bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2">Add Job</h2>
            <p className="text-gray-600 text-center">
              Click here to add new job postings.
            </p>
          </div>

          <div
            onClick={() => setActiveTab("view")}
            className="cursor-pointer bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2">View Jobs</h2>
            <p className="text-gray-600 text-center">
              Click here to view, edit, or delete existing jobs.
            </p>
          </div>
        </div>
      )}

      {/* Render the selected tab */}
      {activeTab === "add" && <AdminAddJobs />}
      {activeTab === "view" && <AdminViewJobs />}

      {/* Back button to return to cards */}
      {/* {activeTab && (
        <div className="max-w-4xl mx-auto mt-6">
          <button
            onClick={() => setActiveTab(null)}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
          >
            Back to Dashboard
          </button>
        </div>
      )} */}
    </div>
  );
}
