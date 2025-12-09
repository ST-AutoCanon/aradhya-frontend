import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

type Props = {
  onClose: () => void;
  mainService: string;
  subService: string;
};

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const FillDetailsAuditing: React.FC<Props> = ({
  onClose,
  mainService,
  subService,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [turnover, setTurnover] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [focusField, setFocusField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getBorderClass = (field: string, value: string) => {
    if (focusField === field) return "border-[#7C8BD8] border-[1.5px]";
    if (value) return "border-[#A3B0FF] border-[1px]";
    return "border-gray-200 border-[1px]";
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
      formData.append("companyName", companyName);
      formData.append("turnover", turnover);
      formData.append("yearEstablished", yearEstablished);
      formData.append("mainService", mainService);
      formData.append("subService", subService);

      if (file) formData.append("file", file);

      const response = await axios.post(
        `${backendUrl}/api/fillDetails/auditing`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("✅ Details submitted successfully!");
      console.log(response.data);

      setTimeout(() => {
        onClose();
      }, 800);
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
        className="bg-gradient-to-br from-[#EFF3FF] via-[#E0E7FF] to-[#DDE6FF] p-6 sm:p-6 rounded-xl w-full max-w-sm sm:max-w-md shadow-xl relative z-10"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } }}
        exit={{ opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.3 } }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-lg"
        >
          ✕
        </button>

        {/* Form Title */}
        <motion.h3 className="text-xl sm:text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] tracking-wide drop-shadow-md">
          {mainService} Form
        </motion.h3>

        {/* Form */}
        <motion.form
          className="grid gap-3"
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Inputs */}
          {[
            {
              label: "Full Name *",
              value: fullName,
              setter: setFullName,
              key: "fullName",
            },
            {
              label: "Email *",
              value: email,
              setter: setEmail,
              key: "email",
              type: "email",
            },
            {
              label: "Mobile Number *",
              value: phone,
              setter: setPhone,
              key: "phone",
              type: "numeric",
            },
            {
              label: "Company Name/Organization Name",
              value: companyName,
              setter: setCompanyName,
              key: "companyName",
            },
            {
              label: "Approximate Turnover (₹)",
              value: turnover,
              setter: setTurnover,
              key: "turnover",
              type: "numeric",
            },
            {
              label: "Year of Establishment",
              value: yearEstablished,
              setter: setYearEstablished,
              key: "yearEstablished",
              type: "numeric",
            },
          ].map((field) => (
            <motion.input
              key={field.key}
              type={field.type === "email" ? "email" : "text"}
              inputMode={field.type === "numeric" ? "numeric" : undefined}
              pattern={field.type === "numeric" ? "[0-9]*" : undefined}
              placeholder={field.label}
              value={field.value}
              onChange={(e) => {
                const val =
                  field.type === "numeric"
                    ? e.target.value.replace(/\D/g, "")
                    : e.target.value;
                field.setter(val);
              }}
              onFocus={() => setFocusField(field.key)}
              onBlur={() => setFocusField(null)}
              className={`p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C8BD8] text-sm sm:text-sm shadow-sm bg-white ${getBorderClass(
                field.key,
                field.value
              )}`}
              variants={fieldVariants}
            />
          ))}

          {/* File Upload */}
          <motion.div variants={fieldVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Document
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

          {/* Message */}
          {message && (
            <p className="text-xs sm:text-sm text-red-500">{message}</p>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className="mt-1 bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] text-white py-2 rounded-full font-semibold hover:shadow-lg text-sm sm:text-sm cursor-pointer"
          >
            {loading ? "Submitting..." : "Submit"}
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default FillDetailsAuditing;
