import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaEdit,
  FaCloudUploadAlt,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";

interface UploadedFile {
  id: string;
  name: string;
  type: "image" | "video";
  url: string;
  description?: string;
}

const AdminUploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState(""); // For video description
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [filterType, setFilterType] = useState<"all" | "image" | "video">(
    "image"
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDescription, setEditingDescription] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const MAX_FILE_SIZE_MB = 50;

  // Fetch uploaded files
  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/uploaded_files`);
      const normalized: UploadedFile[] = res.data.map((f: any) => ({
        id: f._id,
        name: f.name,
        type: f.type,
        url: f.url,
        description: f.description,
      }));
      setUploadedFiles(normalized);
    } catch (err) {
      console.error("Failed to fetch files:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // const handleUpload = async () => {
  //   if (!file) return;

  //   // File size validation
  //   if (file.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
  //     setMessage(`File size exceeds ${MAX_FILE_SIZE_MB} MB`);
  //     return;
  //   }

  //   setLoading(true);
  //   setMessage(null);

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   if (file.type.startsWith("video/")) {
  //     formData.append("description", description);
  //   }

  //   try {
  //     const res = await axios.post(
  //       `${backendUrl}/api/uploaded_files`,
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     const newFile: UploadedFile = {
  //       id: res.data._id,
  //       name: res.data.name,
  //       type: res.data.type,
  //       url: res.data.url,
  //       description: res.data.description,
  //     };
  //     setUploadedFiles((prev) => [...prev, newFile]);
  //     setMessage("Upload successful!");
  //     setFile(null);
  //     setDescription("");
  //   } catch (error) {
  //     console.error(error);
  //     setMessage("Upload failed!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
/////////////////////////////
  // const handleUpload = async () => {
  //   if (!file) return;

  //   // File size validation
  //   if (file.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
  //     setMessage(`File size exceeds ${MAX_FILE_SIZE_MB} MB`);
  //     return;
  //   }

  //   setLoading(true);
  //   setMessage(null);

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   if (file.type.startsWith("video/")) {
  //     formData.append("description", description);
  //   }

  //   try {
  //     const res = await axios.post(
  //       `${backendUrl}/api/uploaded_files`,
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     const newFile: UploadedFile = {
  //       id: res.data._id,
  //       name: res.data.name,
  //       type: res.data.type,
  //       url: res.data.url,
  //       description: res.data.description,
  //     };

  //     setUploadedFiles((prev) => [...prev, newFile]);
  //     setFile(null);
  //     setDescription("");

  //     // Show success popup
  //     alert("Upload successful!");
  //   } catch (error) {
  //     console.error(error);
  //     setMessage("Upload failed!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleUpload = async () => {
    if (!file) return;

    // File size validation
    if (file.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
      setMessage(`File size exceeds ${MAX_FILE_SIZE_MB} MB`);
      return;
    }

    // ---------- NEW LIMIT CHECK ----------
    const imageCount = uploadedFiles.filter((f) => f.type === "image").length;
    const videoCount = uploadedFiles.filter((f) => f.type === "video").length;

 if (file.type.startsWith("image/") && imageCount >= 20) {
   alert("Maximum 20 images allowed!");

   setFile(null); // ← clear React state
   return;
 }

    if (file.type.startsWith("video/") && videoCount >= 10) {
      alert("Maximum 10 videos allowed!");

      setFile(null); // ← clear React state

      return;
    }
    // --------------------------------------

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    if (file.type.startsWith("video/")) {
      formData.append("description", description);
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/uploaded_files`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const newFile: UploadedFile = {
        id: res.data._id,
        name: res.data.name,
        type: res.data.type,
        url: res.data.url,
        description: res.data.description,
      };

      setUploadedFiles((prev) => [...prev, newFile]);
      setFile(null);
      setDescription("");

      alert("Upload successful!");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed!");
    } finally {
      setLoading(false);
    }
  };


  // const handleDelete = async (id: string) => {
  //   try {
  //     await axios.delete(`${backendUrl}/api/uploaded_files/${id}`);
  //     setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  //     // setMessage("File deleted!");
  //   } catch (err) {
  //     console.error(err);
  //     // setMessage("Delete failed!");
  //   }
  // };

  const handleDelete = async (id: string) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirmDelete) return; // If user clicks "Cancel", do nothing

    try {
      await axios.delete(`${backendUrl}/api/uploaded_files/${id}`);
      setUploadedFiles((prev) => prev.filter((f) => f.id !== id));

      // Show success popup
      alert("File deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete the file!");
    }
  };

  const handleEdit = (file: UploadedFile) => {
    if (file.type !== "video") return;
    setEditingId(file.id);
    setEditingDescription(file.description || "");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingDescription("");
  };

  // const handleSaveEdit = async (id: string) => {
  //   try {
  //     await axios.put(`${backendUrl}/api/uploaded_files/${id}`, {
  //       description: editingDescription,
  //     });
  //     setUploadedFiles((prev) =>
  //       prev.map((f) =>
  //         f.id === id ? { ...f, description: editingDescription } : f
  //       )
  //     );
  //     setEditingId(null);
  //     setEditingDescription("");
  //     // setMessage("Description updated!");
  //   } catch (err) {
  //     console.error(err);
  //     // setMessage("Update failed!");
  //   }
  // };

  const handleSaveEdit = async (id: string) => {
    // Ask for confirmation before saving
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this description?"
    );
    if (!confirmUpdate) return; // If user clicks "Cancel", do nothing

    try {
      await axios.put(`${backendUrl}/api/uploaded_files/${id}`, {
        description: editingDescription,
      });

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, description: editingDescription } : f
        )
      );
      setEditingId(null);
      setEditingDescription("");

      // Show success popup
      alert("Description updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update the description!");
    }
  };

  const filteredFiles = uploadedFiles.filter((f) => f.type === filterType);

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Upload</h1>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
        <label
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const droppedFile = e.dataTransfer.files[0];
            if (!droppedFile) return;
            if (
              !droppedFile.type.startsWith("image/") &&
              !droppedFile.type.startsWith("video/")
            ) {
              alert("Only images or videos are allowed");
              return;
            }
            if (droppedFile.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
              alert(`File size exceeds ${MAX_FILE_SIZE_MB} MB`);
              return;
            }
            setFile(droppedFile);
          }}
        >
          <FaCloudUploadAlt size={40} className="text-gray-700" />
          <span className="mt-2 text-gray-700">
            {file ? file.name : "Click or drag to upload image/video"}
          </span>
          <input
            type="file"
            className="hidden"
            accept="image/,video/"
            onChange={(e) => {
              const selectedFile = e.target.files ? e.target.files[0] : null;
              if (!selectedFile) return;
              if (selectedFile.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
                setMessage(`File size exceeds ${MAX_FILE_SIZE_MB} MB`);
                return;
              }
              setFile(selectedFile);
            }}
          />
        </label>

        {/* Video Description */}
        {file && file.type.startsWith("video/") && (
          <div className="mt-4">
            <label className="block mb-1 font-semibold">
              Video Description:
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        )}

        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            Upload
          </button>
          {loading && (
            <div className="loader border-gray-300 border-4 border-t-4 border-t-blue-600 rounded-full w-6 h-6 animate-spin"></div>
          )}
        </div>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-4">
        {["image", "video"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type as "image" | "video")}
            className={`px-4 py-2 rounded ${
              filterType === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {type === "image" ? "Images" : "Videos"}
          </button>
        ))}
      </div>

      {/* Files Table */}
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100 border-b border-gray-300 text-left">
            <tr>
              <th className="p-3 border-r border-gray-300">SL</th>
              <th className="p-3 border-r border-gray-300">File Name</th>
              <th className="p-3 border-r border-gray-300">Type</th>
              <th className="p-3 border-r border-gray-300">Description</th>
              <th className="p-3 border-r border-gray-300">View</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map((f, idx) => (
              <tr key={f.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{idx + 1}</td>
                <td className="p-3 border-b border-gray-300">{f.name}</td>
                <td className="p-3 border-b border-gray-300 capitalize">
                  {f.type}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {editingId === f.id ? (
                    <input
                      type="text"
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    f.description || "-"
                  )}
                </td>
                <td className="p-3 border-b border-gray-300">
                  <a
                    href={`${backendUrl}${f.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                </td>
                <td className="p-3 border-b border-gray-300">
                  <div className="flex items-center justify-center h-full gap-2">
                    {editingId === f.id ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(f.id)}
                          className="text-green-500 hover:text-green-700 flex items-center justify-center"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-500 hover:text-gray-700 flex items-center justify-center"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        {f.type === "video" && (
                          <button
                            onClick={() => handleEdit(f)}
                            className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
                          >
                            <FaEdit />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(f.id)}
                          className="text-red-500 hover:text-red-700 flex items-center justify-center"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filteredFiles.length === 0 && (
              <tr>
                <td colSpan={6} className="p-3 text-center text-gray-500">
                  No files found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>
        {`
          .loader {
            border-top-color: #2563eb;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
};

export default AdminUploadPage;
