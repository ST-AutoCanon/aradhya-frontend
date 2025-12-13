// FillDetailsHealth.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

type Props = {
  onClose?: () => void;
  mainService: string;
  subService: string;
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const FillDetailsHealth: React.FC<Props> = ({
  onClose,
  mainService,
  subService,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [familyMembers, setFamilyMembers] = useState("");
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
      formData.append("dob", dob);
      formData.append("location", location);
      formData.append("occupation", occupation);
      formData.append("annualIncome", annualIncome);
      formData.append("familyMembers", familyMembers);
      formData.append("mainService", mainService);
      formData.append("subService", subService);
      if (file) formData.append("file", file);

      const response = await axios.post(
        `${backendUrl}/api/fillDetails/health`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("✅ Details submitted successfully!");
      console.log(response.data);

      setTimeout(() => {
        if (onClose) onClose();
      }, 800);

      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setDob("");
      setLocation("");
      setOccupation("");
      setAnnualIncome("");
      setFamilyMembers("");
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
      className="fixed inset-0 flex justify-center items-center z-50 px-4 sm:px-6"
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
        // className="bg-gradient-to-br from-[#EFF3FF] via-[#E0E7FF] to-[#DDE6FF]
        //            p-3 sm:p-3.5 rounded-2xl w-full max-w-[60%] sm:max-w-[45%] md:max-w-[30%] shadow-xl relative z-10"
        className="bg-gradient-to-br from-[#EFF3FF] via-[#E0E7FF] to-[#DDE6FF] p-8 rounded-2xl w-full max-w-md shadow-xl relative z-10"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.3 } }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-base"
        >
          ✕
        </button>

        {/* Form Title */}
        <motion.h3
          className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-center 
                     bg-clip-text text-transparent bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] tracking-wide"
        >
          Health Insurance Form
        </motion.h3>

        {/* Form */}
        <motion.form
          className="grid gap-2 sm:gap-2.5"
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {[
            {
              placeholder: "Full Name *",
              value: fullName,
              setter: setFullName,
              field: "fullName",
            },
            {
              placeholder: "Email *",
              value: email,
              setter: setEmail,
              field: "email",
              type: "email",
            },
            {
              placeholder: "Mobile Number *",
              value: phone,
              setter: (val: string) => {
                const numeric = val.replace(/\D/g, "");
                if (numeric.length <= 10) setPhone(numeric);
              },
              field: "phone",
              type: "text",
            },
            {
              // ✅ Corrected DOB Field
              placeholder: "Date of Birth (DD/MM/YYYY)",
              value: dob,
              setter: (val: string) => {
                const cleaned = val.replace(/[^0-9/]/g, "").slice(0, 10);
                setDob(cleaned);
              },
              field: "dob",
              type: "text",
            },
            {
              placeholder: "Location/Pin Code",
              value: location,
              setter: setLocation,
              field: "location",
              type: "text",
            },
            {
              placeholder: "Occupation",
              value: occupation,
              setter: setOccupation,
              field: "occupation",
            },
            {
              placeholder: "Annual Income",
              value: annualIncome,
              setter: (val: string) => {
                const numeric = val.replace(/\D/g, "");
                setAnnualIncome(numeric);
              },
              field: "annualIncome",
              type: "text",
            },
            {
              placeholder: "Family Members",
              value: familyMembers,
              setter: (val: string) => {
                const numeric = val.replace(/\D/g, "");
                if (numeric.length <= 2) setFamilyMembers(numeric);
              },
              field: "familyMembers",
              type: "text",
            },
          ].map((item, idx) => (
            <motion.input
              key={idx}
              type={item.type || "text"}
              inputMode={
                ["phone", "location", "annualIncome", "familyMembers"].includes(
                  item.field
                )
                  ? "numeric"
                  : undefined
              }
              pattern={
                ["phone", "location", "annualIncome", "familyMembers"].includes(
                  item.field
                )
                  ? "[0-9]*"
                  : undefined
              }
              placeholder={item.placeholder}
              value={item.value}
              onChange={(e) => item.setter(e.target.value)}
              onFocus={() => setFocusField(item.field)}
              onBlur={() => setFocusField(null)}
              className={`w-full p-1.5 sm:p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C8BD8] 
                          text-sm sm:text-sm md:text-sm shadow-sm bg-white ${getBorderClass(
                            item.field,
                            item.value
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

          {message && <p className="text-sm text-red-500">{message}</p>}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-gradient-to-r from-[#3726E7] via-[#2996F7] to-[#FB7196] 
                       text-white py-1.5 sm:py-2 rounded-full font-semibold hover:shadow-lg text-sm cursor-pointer"
          >
            {loading ? "Submitting..." : "Submit"}
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default FillDetailsHealth;
