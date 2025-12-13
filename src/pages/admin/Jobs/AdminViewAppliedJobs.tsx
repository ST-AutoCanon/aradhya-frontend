import { useEffect, useState } from "react";
import axios from "axios";

// Checkbox Component
const Checkbox: React.FC<{ checked: boolean; onClick: () => void }> = ({
  checked,
  onClick,
}) => (
  <div
    onClick={onClick}
    role="button"
    aria-pressed={checked}
    className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition ${
      checked ? "bg-gray-500 border-gray-500" : "bg-white border-gray-300"
    }`}
  >
    {checked && (
      <div className="w-2.5 h-1.5 border-l-2 border-b-2 border-white rotate-[-45deg]" />
    )}
  </div>
);

interface JobApplication {
  _id: string;
  jobId:
    | {
        _id: string;
        title: string;
        location: string;
        type: string;
      }
    | string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  qualification: string;
  education?: string;
  experience: number;
  comments?: string;
  resume?: string;
  status: "pending" | "shortlisted" | "rejected";
}

export default function AdminViewJobs() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch all job applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/job-applications`);
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  // Handle checkbox selection
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Delete single application
  const deleteSingle = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    try {
      await axios.delete(`${backendUrl}/api/job-applications/${id}`);
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete multiple applications
  const deleteMultiple = async () => {
    if (selectedIds.length === 0) return alert("No applications selected.");
    if (!confirm("Delete selected applications?")) return;

    try {
      await axios.post(`${backendUrl}/api/job-applications/delete-multiple`, {
        ids: selectedIds,
      });
      setSelectedIds([]);
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  // Update status with confirmation
  const updateStatus = async (
    id: string,
    currentStatus: JobApplication["status"],
    newStatus: JobApplication["status"]
  ) => {
    if (currentStatus === newStatus) return;
    if (!confirm(`Do you want to update the status to "${newStatus}"?`)) return;

    try {
      await axios.patch(`${backendUrl}/api/job-applications/${id}/status`, {
        status: newStatus,
      });
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        All Job Applications
      </h1>

      {/* Delete Multiple Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={deleteMultiple}
          className="flex items-center gap-2 w-full sm:w-auto px-4 py-2 rounded-lg bg-white text-black text-sm font-medium transition hover:bg-black hover:text-white whitespace-nowrap border border-gray-300"
        >
          <span>Delete Selected</span>
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 border-b border-gray-200">
                <Checkbox
                  checked={
                    selectedIds.length === applications.length &&
                    applications.length > 0
                  }
                  onClick={() =>
                    setSelectedIds(
                      selectedIds.length === applications.length
                        ? []
                        : applications.map((a) => a._id)
                    )
                  }
                />
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-200">
                Job Title
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-200">
                Applicant
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-200">
                Email
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-200">
                Phone
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-200">
                Qualification
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-200">
                Experience
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-200">
                Status
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-200">
                Resume
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-200">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b border-gray-200">
                    <Checkbox
                      checked={selectedIds.includes(app._id)}
                      onClick={() => toggleSelect(app._id)}
                    />
                  </td>

                  <td className="px-4 py-2 border-b border-gray-200 font-semibold text-gray-800">
                    {app.jobTitle}
                  </td>

                  <td className="px-4 py-2 border-b border-gray-200">
                    {app.fullName}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {app.email}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {app.phone}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {app.qualification}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {app.experience} yrs
                  </td>

                  <td className="px-4 py-2 border-b border-gray-200">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        updateStatus(
                          app._id,
                          app.status,
                          e.target.value as JobApplication["status"]
                        )
                      }
                      className="border border-gray-200 rounded px-2 py-1 bg-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>

                  <td className="px-4 py-2 border-b border-gray-200">
                    {app.resume ? (
                      <a
                        href={`${backendUrl}/uploads/resumes/${app.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-4 py-2 border-b border-gray-200">
                    <button
                      onClick={() => deleteSingle(app._id)}
                      className="px-3 py-1 border border-gray-300 text-black rounded hover:bg-black hover:text-white transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
