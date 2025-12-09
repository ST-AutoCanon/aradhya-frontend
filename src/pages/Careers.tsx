import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import axios from "axios";

export default function Careers() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [resume, setResume] = useState<File | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    comments: "",
  });

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

  const openModal = (job: any) => {
    setSelectedJob(job);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedJob(null);
    setResume(null);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      qualification: "",
      experience: "",
      comments: "",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setResume(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    try {
      const formData = new FormData();
      formData.append("jobId", selectedJob._id);
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("qualification", form.qualification);
      formData.append("experience", form.experience);
      formData.append("comments", form.comments);

      if (resume) {
        formData.append("resume", resume);
      }

      await axios.post(`${backendUrl}/api/job-applications`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(`Application submitted for ${selectedJob.title}!`);
      closeModal();
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-32 sm:pt-36 lg:pt-40 px-4 sm:px-6 lg:px-12 pb-20 bg-gradient-to-b from-[#3726E7]/5 via-[#2996F7]/5 to-[#FB7196]/5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#3726E7] mb-4 sm:mb-6">
          Join Our Team
        </h1>
        <p className="text-gray-700 text-base sm:text-lg max-w-3xl mb-10 mt-5">
          We are always looking for passionate and talented individuals to join
          our growing company. Explore current openings and apply easily.
        </p>

        {/* Job List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white shadow-lg rounded-2xl p-5 sm:p-6 border hover:shadow-2xl transition flex flex-col justify-between h-full"
              >
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#3726E7]">
                    {job.title}
                  </h2>
                  {/* <p className="text-gray-600 mt-1 text-sm sm:text-base">
                    {job.location}
                  </p>
                  <span className="text-sm sm:text-sm text-[#2996F7] font-medium">
                    {job.type}
                  </span> */}
                  <div className="flex flex-wrap gap-2 mt-2 text-gray-600 text-sm">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {job.location}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-3 text-sm sm:text-base">
                    {job.description}
                  </p>
                </div>

                <button
                  onClick={() => openModal(job)}
                  className="mt-4 sm:mt-6 w-full bg-[#3726E7] text-white py-2 rounded-xl hover:bg-[#2996F7] transition text-sm sm:text-base"
                >
                  Apply Now
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center text-base sm:text-lg">
              No jobs available at the moment.
            </p>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {/* <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/40"></div>

        <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 overflow-auto">
          <Dialog.Panel className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl sm:text-2xl font-bold text-[#3726E7]">
                Apply for {selectedJob?.title}
              </Dialog.Title>
              <button onClick={closeModal}>
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-red-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                {[
                  "fullName",
                  "email",
                  "phone",
                  "qualification",
                  "experience",
                ].map((field) => (
                  <div key={field}>
                    <label className="block text-gray-700 font-medium text-sm sm:text-base">
                      {field === "fullName"
                        ? "Full Name"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      pattern={
                        field === "phone" || field === "experience"
                          ? "\\d*"
                          : undefined
                      }
                      maxLength={field === "phone" ? 10 : undefined}
                      required={["fullName", "email", "phone"].includes(field)}
                      placeholder={
                        field === "fullName"
                          ? "Enter your full name"
                          : field === "email"
                          ? "Enter your email"
                          : field === "phone"
                          ? "Enter your phone number"
                          : `Enter your ${field}`
                      }
                      value={(form as any)[field]}
                      onChange={(e) =>
                        setForm({ ...form, [field]: e.target.value })
                      }
                      className="w-full border rounded-xl p-2 sm:p-3 mt-1 text-sm sm:text-base"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-gray-700 font-medium text-sm sm:text-base">
                  Upload Resume (optional)
                </label>
                <div className="mt-1 border rounded-xl p-3 sm:p-4 flex items-center justify-between">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="text-sm sm:text-base"
                  />
                  <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-[#3726E7]" />
                </div>
                {resume && (
                  <p className="text-xs sm:text-sm text-green-600 mt-1">
                    Selected: {resume.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium text-sm sm:text-base">
                  Comments (optional)
                </label>
                <textarea
                  value={form.comments}
                  onChange={(e) =>
                    setForm({ ...form, comments: e.target.value })
                  }
                  className="w-full border rounded-xl p-2 sm:p-3 mt-1 text-sm sm:text-base"
                  rows={3}
                  placeholder="Add any additional comments"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2996F7] text-white py-2 sm:py-3 rounded-xl hover:bg-[#3726E7] transition text-sm sm:text-base"
              >
                Submit Application
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog> */}

      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40" />

        {/* Centered Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 overflow-auto">
          <Dialog.Panel className="bg-white rounded-xl p-4 sm:p-5 w-full max-w-sm sm:max-w-md shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <Dialog.Title className="text-lg sm:text-xl font-semibold text-[#3726E7]">
                Apply for {selectedJob?.title}
              </Dialog.Title>
              <button onClick={closeModal}>
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {[
                  "fullName",
                  "email",
                  "phone",
                  "qualification",
                  "experience",
                ].map((field) => (
                  <div key={field}>
                    <label className="block text-gray-700 text-sm sm:text-sm font-medium">
                      {field === "fullName"
                        ? "Full Name"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      pattern={
                        field === "phone" || field === "experience"
                          ? "\\d*"
                          : undefined
                      }
                      maxLength={field === "phone" ? 10 : undefined}
                      required={["fullName", "email", "phone"].includes(field)}
                      placeholder={
                        field === "fullName"
                          ? "Enter your full name"
                          : field === "email"
                          ? "Enter your email"
                          : field === "phone"
                          ? "Enter your phone number"
                          : `Enter your ${field}`
                      }
                      value={(form as any)[field]}
                      onChange={(e) =>
                        setForm({ ...form, [field]: e.target.value })
                      }
                      className="w-full border rounded-lg p-2 text-sm sm:text-sm mt-1"
                    />
                  </div>
                ))}
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-gray-700 text-sm sm:text-sm font-medium">
                  Upload Resume (optional)
                </label>
                <div className="mt-1 border rounded-lg p-2 sm:p-3 flex items-center justify-between">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="text-sm sm:text-sm"
                  />
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-[#3726E7]" />
                </div>
                {resume && (
                  <p className="text-xs text-green-600 mt-1">
                    Selected: {resume.name}
                  </p>
                )}
              </div>

              {/* Comments */}
              <div>
                <label className="block text-gray-700 text-sm sm:text-sm font-medium">
                  Comments (optional)
                </label>
                <textarea
                  value={form.comments}
                  onChange={(e) =>
                    setForm({ ...form, comments: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 text-sm sm:text-sm mt-1"
                  rows={3}
                  placeholder="Add any additional comments"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#2996F7] text-white py-2 rounded-lg hover:bg-[#3726E7] transition text-sm sm:text-sm"
              >
                Submit Application
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
