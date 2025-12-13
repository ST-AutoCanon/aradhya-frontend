// FillDetailsBooksStationary.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

type Props = {
  onClose?: () => void;
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const FillDetailsBooksStationary: React.FC<Props> = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolName, setschoolName] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [focusField, setFocusField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const mainService = "Books & Stationary";
  const subService = "Books/Stationary Order";

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getBorderClass = (field: string, value: string) => {
    if (focusField === field) return "border-[#7C8BD8] border-1.8";
    if (value) return "border-[#A3B0FF] border-[1.2px]";
    return "border-gray-200 border-[1.2px]";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone) {
      setMessage("Please fill all required fields (*)");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("schoolName", schoolName);
      formData.append("address", address);
      formData.append("mainService", mainService);
      formData.append("subService", subService);

      if (file) formData.append("file", file);

      const response = await axios.post(
        `${backendUrl}/api/fillDetails/booksStationary`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("✅ Details submitted successfully!");
      console.log("Response:", response.data);

      // Close form after success (short delay so message is visible)
      setTimeout(() => {
        if (onClose) onClose();
      }, 800);

      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setschoolName("");
      setAddress("");
      setFile(null);
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center z-50"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Blurred Background */}
      <motion.div
        className="absolute inset-0 bg-white/10 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Form Container */}
      <motion.div
        className="bg-gradient-to-br from-[#EFF3FF] via-[#E0E7FF] to-[#DDE6FF] p-8 rounded-2xl w-full max-w-md shadow-xl relative z-10"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.3 } }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-lg"
        >
          ✕
        </button>

        {/* Form Title */}
        <motion.h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] tracking-wide drop-shadow-md">
          Fill Books & Stationery Details
        </motion.h3>

        {/* Form */}
        <motion.form
          className="grid gap-4"
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.input
            type="text"
            placeholder="Full Name *"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onFocus={() => setFocusField("fullName")}
            onBlur={() => setFocusField(null)}
            className={`p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8BD8] text-sm sm:text-base shadow-sm bg-white ${getBorderClass(
              "fullName",
              fullName
            )}`}
            variants={fieldVariants}
          />

          <motion.input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusField("email")}
            onBlur={() => setFocusField(null)}
            className={`p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8BD8] text-sm sm:text-base shadow-sm bg-white ${getBorderClass(
              "email",
              email
            )}`}
            variants={fieldVariants}
          />

          {/* <motion.input
            type="tel"
            placeholder="Mobile Number *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onFocus={() => setFocusField("phone")}
            onBlur={() => setFocusField(null)}
            className={`p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8BD8] text-sm sm:text-base shadow-sm bg-white ${getBorderClass(
              "phone",
              phone
            )}`}
            variants={fieldVariants}
          /> */}

          <motion.input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
            placeholder="Mobile Number *"
            value={phone}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, ""); // only digits
              if (numericValue.length <= 10) setPhone(numericValue); // limit to 10 digits
            }}
            onFocus={() => setFocusField("phone")}
            onBlur={() => setFocusField(null)}
            className={`p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8BD8] text-sm sm:text-base shadow-sm bg-white ${getBorderClass(
              "phone",
              phone
            )}`}
            variants={fieldVariants}
          />

          <motion.input
            type="text"
            placeholder="Name of Company/Trust/Society/School"
            value={schoolName}
            onChange={(e) => setschoolName(e.target.value)}
            onFocus={() => setFocusField("schoolName")}
            onBlur={() => setFocusField(null)}
            className={`p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8BD8] text-sm sm:text-base shadow-sm bg-white ${getBorderClass(
              "schoolName",
              schoolName
            )}`}
            variants={fieldVariants}
          />

          <motion.input
            type="text"
            placeholder="Address with Pin Code"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onFocus={() => setFocusField("address")}
            onBlur={() => setFocusField(null)}
            className={`p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8BD8] text-sm sm:text-base shadow-sm bg-white ${getBorderClass(
              "address",
              address
            )}`}
            variants={fieldVariants}
          />

          {/* File Upload */}
          <motion.div variants={fieldVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Required Books/Material List
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,.xls,.xlsx"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              className="w-full text-sm text-gray-600 file:rounded-full file:bg-white file:text-blue-700"
            />
          </motion.div>

          {/* Error / Success Message */}
          {message && <p className="text-sm text-red-500">{message}</p>}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] text-white py-2 rounded-full font-semibold hover:shadow-lg text-sm sm:text-base cursor-pointer"
          >
            {loading ? "Submitting..." : "Submit"}
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default FillDetailsBooksStationary;
