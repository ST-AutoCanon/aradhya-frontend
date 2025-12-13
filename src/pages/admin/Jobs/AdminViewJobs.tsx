import { useEffect, useState } from "react";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  location: string;
  type: string;
  description: string;
}

export default function AdminViewJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingForm, setEditingForm] = useState<Job | null>(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleUpdateJob = async (id: string, form: Job) => {
    try {
      await axios.put(`${backendUrl}/api/jobs/${id}`, form);
      setEditingId(null);
      setEditingForm(null);
      fetchJobs();
      alert("Job updated successfully!"); // ✅ Alert added
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`${backendUrl}/api/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-6 md:p-10 w-full max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
        Manage Jobs
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition w-full flex flex-col justify-between"
          >
            {editingId === job._id && editingForm ? (
              <>
                <input
                  type="text"
                  value={editingForm.title}
                  onChange={(e) =>
                    setEditingForm({ ...editingForm, title: e.target.value })
                  }
                  className="border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <input
                  type="text"
                  value={editingForm.location}
                  onChange={(e) =>
                    setEditingForm({ ...editingForm, location: e.target.value })
                  }
                  className="border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <input
                  type="text"
                  value={editingForm.type}
                  onChange={(e) =>
                    setEditingForm({ ...editingForm, type: e.target.value })
                  }
                  className="border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <textarea
                  value={editingForm.description}
                  onChange={(e) =>
                    setEditingForm({
                      ...editingForm,
                      description: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() =>
                      editingForm && handleUpdateJob(job._id, editingForm)
                    }
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-black border border-black text-sm font-medium transition hover:bg-black hover:text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingForm(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-black border border-gray-500 text-sm font-medium transition hover:bg-gray-500 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-blue-600">{job.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2 text-gray-600 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {job.location}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-700 mt-3 line-clamp-4">
                  {job.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    onClick={() => {
                      setEditingId(job._id);
                      setEditingForm(job);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-black border border-black text-sm font-medium transition hover:bg-black hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-black border border-black text-sm font-medium transition hover:bg-black hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
