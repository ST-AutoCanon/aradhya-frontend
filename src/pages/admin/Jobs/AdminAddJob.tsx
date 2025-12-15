import { useState } from "react";
import axios from "axios";

interface Job {
  _id?: string;
  title: string;
  location: string;
  type: string;
  description: string;
}

export default function AdminAddJobs() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleAddJob = async (form: Omit<Job, "_id">) => {
    try {
      await axios.post(`${backendUrl}/api/jobs`, form);
      alert("Job added successfully!");
    } catch (err) {
      console.error("Error adding job:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-6 md:p-10 w-full max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
        Add New Job
      </h1>
      <AddJobForm onAdd={handleAddJob} />
    </div>
  );
}

const AddJobForm: React.FC<{ onAdd: (form: Omit<Job, "_id">) => void }> = ({
  onAdd,
}) => {
  const [form, setForm] = useState<Omit<Job, "_id">>({
    title: "",
    location: "",
    type: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
    setForm({ title: "", location: "", type: "", description: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-white rounded-xl shadow-md mt-10 mb-12"
    >
      <input
        placeholder="Job Title"
        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Location"
        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <input
        placeholder="Job Type"
        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      />
      <textarea
        placeholder="Job Description"
        className="border border-gray-300 p-2 rounded w-full sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button
        type="submit"
        className="col-span-1 sm:col-span-2 bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-600 w-full transition duration-200"
      >
        Add Job
      </button>
    </form>
  );
};
