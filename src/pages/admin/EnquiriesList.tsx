import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PhoneLogo from "../../assets/call.png";
import MessageLogo from "../../assets/message.png";
import WhatsappLogo from "../../assets/whatsapp.png";
import { Pencil, Trash2 } from "lucide-react";
import BulkMessageLogo from "../../assets/bulkMessage.png";
import BulkMessageIactiveLogo from "../../assets/BukInactivelogo.png";
import UploadCloudLogoActive from "../../assets/uploadcloud_active.png";
import UploadCloudLogoInactive from "../../assets/uploadcould_Inactive.png";
import SendWhatsapp from "./SendWhatsapp";
import SendEmail from "./SendEmail";
import { motion, AnimatePresence } from "framer-motion";
import { enquiryHeaders } from "./enquiryHeaders";
const ResponsiveButtonRow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Auto-close dropdown after 3 seconds
  useEffect(() => {
    if (!showDropdown) return;

    const timer = setTimeout(() => {
      setShowDropdown(false);
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timer);
  }, [showDropdown]);

  // Always show first 3 buttons
  const allButtons = React.Children.toArray(children);
  const visibleButtons = allButtons.slice(0, 3);
  const hiddenButtons = allButtons.slice(3);

  return (
    <div className="relative w-full">
      <div className="flex gap-2 items-center">
        {visibleButtons.map((btn, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            {btn}
          </motion.div>
        ))}

        {hiddenButtons.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="px-4 py-2 rounded-lg bg-white text-black border border-black text-sm font-medium hover:bg-black hover:text-white transition"
            >
              More ▾
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col gap-1 p-2 min-w-[160px]"
                >
                  {hiddenButtons.map((btn, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => setShowDropdown(false)}
                    >
                      {btn} {/* Already styled button */}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
type ServiceType = keyof typeof enquiryHeaders;
interface EnquiriesListProps {
  serviceData: any;
  refreshData: () => void;
  serviceName: string;
  serviceType?: ServiceType;
}

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const EnquiriesList: React.FC<EnquiriesListProps> = ({
  serviceData,
  refreshData,
  serviceName,
}) => {
  const rows = serviceData?.rows || [];
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Record<string, any>>({});
  const [newRow, setNewRow] = useState<Record<string, any> | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileRowMenuOpen, setMobileRowMenuOpen] = useState<string | null>(
    null
  );
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailRecipients, setEmailRecipients] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [whatsappRecipients, setWhatsappRecipients] = useState<string[]>([]);
  const templateHeaders =
    enquiryHeaders[(serviceName ?? "vehicle") as ServiceType];
  // const headers =
  //   rows.length > 0 ? Object.keys(rows[0]).filter((k) => k !== "id") : [];

  const headers =
    rows.length > 0
      ? Object.keys(rows[0]).filter((k) => k !== "id")
      : enquiryHeaders[
          (serviceName ?? "vehicle") as keyof typeof enquiryHeaders
        ];
  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      setSelectedRows(rows.map((r: any) => r.id));
      setSelectAll(true);
    }
  };

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

  // const buildPayloadFromDisplay = (display: Record<string, any>) => {
  //   const payload: Record<string, any> = { mainService: serviceName };
  //   Object.keys(display).forEach((key) => {
  //     if (key === "id") return;
  //     if (key === "mobile") payload.phone = display[key];
  //     else if (key === "name") payload.fullName = display[key];
  //     else if (key === "vehicle") payload.vehicleNumber = display[key];
  //     else payload[key] = display[key];
  //   });
  //   return payload;
  // };

  const buildPayloadFromDisplay = (display: Record<string, any>) => {
    const payload: Record<string, any> = {};
    const type = serviceName?.toLowerCase().trim();

    Object.keys(display).forEach((key) => {
      const normalizedKey = key.trim().toLowerCase();
      const value = display[key];

      switch (normalizedKey) {
        // 🔹 Common fields (present in all services)
        case "full name":
        case "fullname":
        case "name":
          payload.fullName = value;
          break;

        case "email":
          payload.email = value;
          break;

        case "phone":
        case "mobile":
          payload.phone = value;
          break;

        case "sub service":
        case "subservice":
          payload.subService = value;
          break;

        case "uploaded file":
        case "uploadedfile":
          payload.uploadedFile = value;
          break;

        // 🔹 Vehicle-specific fields
        // 🔹 Vehicle-specific (matches your service exactly)
        case "vehicle":
          if (type === "vehicle") payload.vehicleNumber = value;
          break;

        case "location":
          if (type === "vehicle" || type === "health") payload.location = value;
          break;

        // 🔹 Health-specific fields
        case "dob":
          if (type === "health") payload.dob = value;
          break;

        case "occupation":
          if (type === "health") payload.occupation = value;
          break;

        case "annual income":
          if (type === "health") payload.annualIncome = Number(value) || 0;
          break;

        case "family members":
          if (type === "health") payload.familyMembers = Number(value) || 0;
          break;

        // 🔹 Books-Stationary-specific fields
        case "school name":
          if (type === "books-stationary") payload.schoolName = value;
          break;

        case "address":
          if (type === "books-stationary") payload.address = value;
          break;

        case "book appointment":
          if (type === "books-stationary")
            payload.bookAppointment =
              value === true || value === "Yes" || value === "yes";
          break;

        // 🔹 Auditing-specific fields
        case "company name":
          if (type === "auditing") payload.companyName = value;
          break;

        case "turnover":
          if (type === "auditing") payload.turnover = value;
          break;

        case "year established":
          if (type === "auditing") payload.yearEstablished = value;
          break;

        default:
          payload[key] = value;
          break;
      }
    });

    // ✅ Always include main service
    payload.mainService = serviceName;

    return payload;
  };

  // --- CRUD Handlers ---

  const handleDelete = async (id?: string) => {
    try {
      // Case 1: No selection & no specific ID
      if (!id && selectedRows.length === 0) return alert("No rows selected!");

      // 🧩 Build dynamic confirmation message
      const confirmMessage = id
        ? "Are you sure you want to delete this enquiry?"
        : `Are you sure you want to delete ${selectedRows.length} selected enquiry(s)?`;

      const confirmDelete = window.confirm(confirmMessage);
      if (!confirmDelete) return;

      // Case 2: Single delete
      if (id) {
        await axios.delete(
          `${BACKEND}/api/enquiries/${serviceName.toLowerCase()}/${id}`
        );
        alert("Enquiry deleted successfully!");
      } else {
        // Case 3: Bulk delete
        const validIds = selectedRows.filter(Boolean);
        if (validIds.length === 0)
          return alert("Selected rows have no valid entries to delete!");

        await Promise.all(
          validIds.map((rowId) =>
            axios.delete(
              `${BACKEND}/api/enquiries/${serviceName.toLowerCase()}/${rowId}`
            )
          )
        );

        alert("Selected enquiries deleted successfully!");

        // Deselect deleted rows
        setSelectedRows([]);
        setSelectAll(false);
      }

      await refreshData();
    } catch (err) {
      console.error(err);
      alert("Error deleting enquiry");
    }
  };

  const handleAddRow = () => {
    const defaultRow: Record<string, any> = { mainService: serviceName };
    headers.forEach((h) => (defaultRow[h] = ""));
    setNewRow(defaultRow);
  };

  // const handleSaveNewRow = async () => {
  //   if (!newRow) return;

  //   // Validation for required fields
  //   if (!newRow.name || !newRow.mobile) {
  //     return alert("Please provide Full Name and Mobile before saving.");
  //   }

  //   // Confirmation popup
  //   const confirmSave = window.confirm(
  //     "Are you sure you want to save this new enquiry?"
  //   );
  //   if (!confirmSave) return;

  //   try {
  //     const formData = new FormData();
  //     const payload = buildPayloadFromDisplay(newRow);

  //     Object.entries(payload).forEach(([key, value]) => {
  //       if (value instanceof File) formData.append(key, value);
  //       else formData.append(key, value as string);
  //     });

  //     await axios.post(
  //       `${BACKEND}/api/enquiries/${serviceName.toLowerCase()}`,
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     setNewRow(null);
  //     await refreshData();
  //     alert("New enquiry saved successfully!"); // Success popup
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error saving new row");
  //   }
  // };

  const handleSaveNewRow = async () => {
    if (!newRow) return;

    // ✅ Match actual table headers
    const fullName =
      newRow["Full Name"] || newRow["full name"] || newRow["name"];
    const phone =
      newRow["Phone"] ||
      newRow["phone"] ||
      newRow["Mobile"] ||
      newRow["mobile"];

    if (!fullName?.trim() || !phone?.trim()) {
      return alert("Please provide Full Name and Phone before saving.");
    }

    const confirmSave = window.confirm(
      "Are you sure you want to save this new enquiry?"
    );
    if (!confirmSave) return;

    try {
      const formData = new FormData();
      const payload = buildPayloadFromDisplay(newRow);

      Object.entries(payload).forEach(([key, value]) => {
        if (value instanceof File) formData.append(key, value);
        else formData.append(key, value as string);
      });

      await axios.post(
        `${BACKEND}/api/enquiries/${serviceName.toLowerCase()}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setNewRow(null);
      await refreshData();
      alert("New enquiry saved successfully!");
    } catch (err: any) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Error saving new row";
      // alert("Error saving new row");
      alert(errorMessage);
    }
  };

  const handleCancelNewRow = () => setNewRow(null);

  const handleEditRow = (row: any) => {
    setEditingRow(row.id);
    setEditingData({ ...row });
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditingData({});
  };

  const handleSaveEditRow = async () => {
    if (!editingRow) return;

    const { name, mobile } = editingData;

    // Validate required fields
    if (!name || !mobile)
      return alert("Please provide Full Name and Mobile before saving.");

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile))
      return alert("Phone number must be exactly 10 digits.");

    // Confirmation popup
    const confirmSave = window.confirm(
      "Are you sure you want to save changes to this enquiry?"
    );
    if (!confirmSave) return;

    try {
      const formData = new FormData();
      const payload = buildPayloadFromDisplay(editingData);

      Object.entries(payload).forEach(([key, value]) => {
        if (value instanceof File) formData.append(key, value);
        else formData.append(key, value as string);
      });

      await axios.put(
        `${BACKEND}/api/enquiries/${serviceName.toLowerCase()}/${editingRow}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setEditingRow(null);
      setEditingData({});
      await refreshData();

      // Success popup
      alert("Enquiry updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating row");
    }
  };

  const openSingleEmailModal = (email: string) => {
    if (!email) return alert("No email found for this record!");
    setEmailRecipients([email]);
    setEmailModalOpen(true);
    // Close mobile dropdown if open
    setMobileRowMenuOpen(null);
    setMobileMenuOpen(false);
  };

  const openBulkEmailModal = () => {
    const emails = rows
      .filter((r: any) => selectedRows.includes(r.id))
      .map((r: any) => r.email)
      .filter(Boolean);
    if (emails.length === 0) return alert("No valid email addresses selected!");
    setEmailRecipients(emails);
    setEmailModalOpen(true);
    // Close mobile dropdown if open
    setMobileRowMenuOpen(null);
    setMobileMenuOpen(false);
    // Deselect deleted rows
    setSelectedRows([]);
    setSelectAll(false);
  };

  const openBulkWhatsappModal = () => {
    const numbers = rows
      .filter((r: any) => selectedRows.includes(r.id))
      .map((r: any) => r.mobile)
      .filter(Boolean);

    if (numbers.length === 0) return alert("No valid phone numbers selected!");

    setWhatsappRecipients(numbers); // ✅ all numbers
    setWhatsappModalOpen(true); // ✅ open modal
  };

  return (
    <div className="w-full bg-white rounded-lg p-4 overflow-x-auto shadow-sm">
      {/* Top Header */}

      <div className="flex flex-col gap-4 mb-4">
        {/* Enquiries Title and List */}
        <h2 className="text-lg sm:text-xl font-semibold">
          {serviceName} Enquiries List
        </h2>

        {/* Mobile Dot Menu */}
        <div className="sm:hidden w-52">
          {/* Dropdown Button */}
          <button
            className="flex justify-between items-center w-full px-3 py-2 bg-gray-100 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-200"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            Menu
            <span className="text-lg">▾</span>
          </button>

          {/* Dropdown Options */}
          {mobileMenuOpen && (
            <div className="mt-1 w-full bg-white border border-gray-200 rounded-md shadow-sm flex flex-col gap-1">
              <button
                onClick={() => {
                  openBulkEmailModal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm text-left"
              >
                <img
                  src={BulkMessageIactiveLogo}
                  alt="Group Email"
                  className="w-4 h-4"
                />
                Group Email
              </button>

              <button
                onClick={() => {
                  openBulkWhatsappModal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm text-left"
              >
                <img
                  src={BulkMessageIactiveLogo}
                  alt="Group WhatsApp"
                  className="w-4 h-4"
                />
                Group WhatsApp
              </button>

              <button
                onClick={() => {
                  handleAddRow();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm text-left"
              >
                <img
                  src={UploadCloudLogoInactive}
                  alt="Add Row"
                  className="w-4 h-4"
                />
                Add Row
              </button>

              <button
                onClick={() => {
                  fileInputRef.current?.click();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm text-left"
              >
                <img
                  src={UploadCloudLogoInactive}
                  alt="Upload Excel"
                  className="w-4 h-4"
                />
                Upload Excel
              </button>

              <button
                onClick={async () => {
                  await handleDelete();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm text-left"
              >
                <img
                  src={UploadCloudLogoInactive}
                  alt="Delete Selected"
                  className="w-4 h-4"
                />
                Delete Selected
              </button>

              <button
                onClick={async () => {
                  try {
                    const response = await fetch(
                      `${BACKEND}/api/excel/download/${serviceName.toLowerCase()}`,
                      { method: "GET" }
                    );
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${serviceName}_template.xlsx`;
                    a.click();
                  } catch (err) {
                    console.error(err);
                    alert("Error downloading template");
                  } finally {
                    setMobileMenuOpen(false);
                  }
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm text-left"
              >
                <img
                  src={UploadCloudLogoInactive}
                  alt="Download Template"
                  className="w-4 h-4"
                />
                Download Template
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept=".xlsx, .xls"
        className="hidden"
        ref={fileInputRef}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
              await axios.post(
                `${BACKEND}/api/enquiries/${serviceName.toLowerCase()}/bulk-excel`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
              );
              await refreshData();
            } catch (err) {
              console.error(err);
              alert("Error uploading file");
            }
          }
        }}
      />
      <div className="hidden sm:block">
        <ResponsiveButtonRow>
          {/* Group Email */}
          <div className="flex items-center gap-2 group">
            <button
              type="button"
              onClick={openBulkEmailModal}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black border border-black 
                     text-sm font-medium transition group-hover:bg-black group-hover:text-white whitespace-nowrap"
            >
              <img
                src={BulkMessageIactiveLogo}
                alt="Message Inactive"
                className="w-4 h-4 group-hover:hidden"
              />
              <img
                src={BulkMessageLogo}
                alt="Message Active"
                className="w-4 h-4 hidden group-hover:block"
              />
              Group Email
            </button>
          </div>

          {/* Group WhatsApp */}
          <div className="flex items-center gap-2 group">
            <button
              type="button"
              onClick={openBulkWhatsappModal}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black border border-black 
                     text-sm font-medium transition group-hover:bg-black group-hover:text-white whitespace-nowrap"
            >
              <img
                src={BulkMessageIactiveLogo}
                alt="Message Inactive"
                className="w-4 h-4 group-hover:hidden"
              />
              <img
                src={BulkMessageLogo}
                alt="Message Active"
                className="w-4 h-4 hidden group-hover:block"
              />
              Group WhatsApp
            </button>
          </div>

          {/* Upload Excel */}
          <div className="flex items-center gap-2 group">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black border border-black 
                     text-sm font-medium transition group-hover:bg-black group-hover:text-white whitespace-nowrap"
            >
              <img
                src={UploadCloudLogoInactive}
                alt="Upload Excel Inactive"
                className="w-5 h-5 group-hover:hidden"
              />
              <img
                src={UploadCloudLogoActive}
                alt="Upload Excel Active"
                className="w-5 h-5 hidden group-hover:block"
              />
              Upload Excel
            </button>
          </div>

          {/* Add Row */}
          {/* <div className="flex items-center gap-2 group">
            <button
              type="button"
              onClick={handleAddRow}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black
                     text-sm font-medium transition group-hover:bg-black group-hover:text-white whitespace-nowrap"
            >
              <img
                src={UploadCloudLogoInactive}
                alt="Add Row Inactive"
                className="w-5 h-5 group-hover:hidden"
              />
              <img
                src={UploadCloudLogoActive}
                alt="Add Row Active"
                className="w-5 h-5 hidden group-hover:block"
              />
              Add Row
            </button>
          </div> */}
          <div className="w-full">
            <button
              type="button"
              onClick={handleAddRow}
              className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-white text-black
               text-sm font-medium transition hover:bg-black hover:text-white whitespace-nowrap"
            >
              <img
                src={UploadCloudLogoInactive}
                alt="Add Row Inactive"
                className="w-5 h-5 flex-shrink-0 hover:hidden"
              />
              <img
                src={UploadCloudLogoActive}
                alt="Add Row Active"
                className="w-5 h-5 flex-shrink-0 hidden hover:block"
              />
              <span className="truncate">Add Row</span>
            </button>
          </div>

          {/* Delete Selected */}
          {/* <div className="flex items-center gap-2 group">
            <button
              type="button"
              onClick={async () => await handleDelete()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black
                     text-sm font-medium transition group-hover:bg-black group-hover:text-white whitespace-nowrap"
            >
              <img
                src={UploadCloudLogoInactive}
                alt="Delete Inactive"
                className="w-5 h-5 group-hover:hidden"
              />
              <img
                src={UploadCloudLogoActive}
                alt="Delete Active"
                className="w-5 h-5 hidden group-hover:block"
              />
              Delete Selected
            </button>
          </div> */}
          <div className="w-full">
            <button
              type="button"
              onClick={async () => await handleDelete()}
              className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-white text-black 
               text-sm font-medium transition hover:bg-black hover:text-white whitespace-nowrap"
            >
              <img
                src={UploadCloudLogoInactive}
                alt="Delete Inactive"
                className="w-5 h-5 flex-shrink-0 hover:hidden"
              />
              <img
                src={UploadCloudLogoActive}
                alt="Delete Active"
                className="w-5 h-5 flex-shrink-0 hidden hover:block"
              />
              <span className="truncate">Delete Selected</span>
            </button>
          </div>

          {/* Download Template */}
          {/* <div className="flex items-center gap-2 group">
            <button
              type="button"
              onClick={async () => {
                try {
                  const response = await fetch(
                    `${BACKEND}/api/excel/download/${serviceName.toLowerCase()}`,
                    { method: "GET" }
                  );
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${serviceName}_template.xlsx`;
                  a.click();
                } catch (err) {
                  console.error(err);
                  alert("Error downloading template");
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black
                     text-sm font-medium transition group-hover:bg-black group-hover:text-white whitespace-nowrap"
            >
              <img
                src={UploadCloudLogoInactive}
                alt="Download Inactive"
                className="w-5 h-5 group-hover:hidden"
              />
              <img
                src={UploadCloudLogoActive}
                alt="Download Active"
                className="w-5 h-5 hidden group-hover:block"
              />
              Download Template
            </button>
          </div> */}
          <div className="w-full">
            <button
              type="button"
              onClick={async () => {
                try {
                  const response = await fetch(
                    `${BACKEND}/api/excel/download/${serviceName.toLowerCase()}`,
                    { method: "GET" }
                  );
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${serviceName}_template.xlsx`;
                  a.click();
                } catch (err) {
                  console.error(err);
                  alert("Error downloading template");
                }
              }}
              className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-white text-black
               text-sm font-medium transition hover:bg-black hover:text-white whitespace-nowrap"
            >
              <img
                src={UploadCloudLogoInactive}
                alt="Download Inactive"
                className="w-5 h-5 hover:hidden flex-shrink-0"
              />
              <img
                src={UploadCloudLogoActive}
                alt="Download Active"
                className="w-5 h-5 hidden hover:block flex-shrink-0"
              />
              <span className="truncate">Download Template</span>
            </button>
          </div>
        </ResponsiveButtonRow>
      </div>
      {/* Table */}
      <div className="w-full bg-white rounded-lg p-4 shadow-sm">
        {/* Shared horizontal scroll container */}
        <div className="overflow-x-auto">
          {/* Buttons Row */}
          {/* <div className="flex gap-2 min-w-max mb-4 hidden sm:block"> */}
          {/* <div className="hidden sm:flex gap-2 min-w-max mb-4"> */}

          {/* </div> */}
          <table className="min-w-full border border-gray-200 table-auto text-sm">
            {/* <thead className="bg-gray-100 border-b border-gray-200 font-medium">
              <tr>
                <th className="p-3 text-left">
                  <Checkbox checked={selectAll} onClick={toggleSelectAll} />
                </th>
                <th className="p-3 text-left">SL</th>
                {headers.map((header) => (
                  <th key={header} className="p-3 text-left whitespace-nowrap">
                    {header.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </th>
                ))}
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead> */}
            <thead className="bg-gray-100 border-b border-gray-200 font-medium">
              <tr>
                <th className="p-3 text-left">
                  <Checkbox checked={selectAll} onClick={toggleSelectAll} />
                </th>
                <th className="p-3 text-left">SL</th>
                {(
                  enquiryHeaders[
                    (serviceName ?? "vehicle") as keyof typeof enquiryHeaders
                  ] || []
                ).map((header) => (
                  <th key={header} className="p-3 text-left whitespace-nowrap">
                    {header.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </th>
                ))}
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {/* New Row */}
              {newRow && (
                <tr className="bg-yellow-50">
                  <td className="p-3" />
                  <td className="p-3">New</td>

                  {headers.map((header) => (
                    <td key={header} className="p-3">
                      {/* {header === "uploadedFile" ? ( */}
                      {header.toLowerCase().replace(/\s+/g, "") ===
                      "uploadedfile" ? (
                        <input
                          type="file"
                          className="border rounded px-2 py-1 w-full"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setNewRow({ ...newRow, uploadedFile: file });
                          }}
                        />
                      ) : (
                        <input
                          type="text"
                          className="border rounded px-2 py-1 w-full"
                          value={newRow[header] ?? ""}
                          onChange={(e) => {
                            const val = e.target.value;

                            // Validate on input
                            if (
                              header === "mobile" &&
                              val &&
                              !/^\d{0,10}$/.test(val)
                            )
                              return;
                            if (
                              (header === "annualIncome" ||
                                header === "familyMembers" ||
                                header === "turnover") &&
                              val &&
                              isNaN(Number(val))
                            )
                              return;
                            if (
                              header === "yearEstablished" &&
                              val &&
                              !/^\d{0,4}$/.test(val)
                            )
                              return;

                            setNewRow({ ...newRow, [header]: val });
                          }}
                          onBlur={() => {
                            // Show alert on blur if invalid
                            const val = newRow[header];
                            if (header === "mobile" && val && val.length !== 10)
                              alert("Phone number must be exactly 10 digits.");
                            if (
                              (header === "annualIncome" ||
                                header === "familyMembers" ||
                                header === "turnover") &&
                              val &&
                              isNaN(Number(val))
                            )
                              alert(`${header} must be a number.`);
                            if (
                              header === "yearEstablished" &&
                              val &&
                              val.length === 4 &&
                              isNaN(Number(val))
                            )
                              alert(
                                "Year Established must be a 4-digit number."
                              );
                          }}
                        />
                      )}
                    </td>
                  ))}

                  <td className="p-3 flex gap-2">
                    <button
                      type="button"
                      onClick={handleSaveNewRow}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelNewRow}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              )}

              {/* Existing Rows */}
              {rows.map((row: any, index: number) => {
                const isSelected = selectedRows.includes(row.id);
                const isEditing = editingRow === row.id;
                return (
                  <tr key={row.id} className="hover:bg-gray-50 transition">
                    <td className="p-3">
                      <Checkbox
                        checked={isSelected}
                        onClick={() => toggleRow(row.id)}
                      />
                    </td>
                    <td className="p-3">{index + 1}</td>
                    {headers.map((header) => (
                      <td
                        key={header}
                        className="p-3 whitespace-nowrap max-w-[200px] truncate"
                      >
                        {isEditing ? (
                          header === "uploadedFile" ? (
                            <input
                              type="file"
                              className="border rounded px-2 py-1 w-full"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setEditingData({
                                  ...editingData,
                                  uploadedFile: file,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="text"
                              className="border rounded px-2 py-1 w-full"
                              value={editingData[header] ?? ""}
                              onChange={(e) => {
                                const val = e.target.value;

                                // Validation for different fields
                                if (
                                  header === "mobile" &&
                                  val &&
                                  !/^\d{0,10}$/.test(val)
                                )
                                  return;
                                if (
                                  (header === "annualIncome" ||
                                    header === "familyMembers" ||
                                    header === "turnover") &&
                                  val &&
                                  isNaN(Number(val))
                                )
                                  return;
                                if (
                                  header === "yearEstablished" &&
                                  val &&
                                  !/^\d{0,4}$/.test(val)
                                )
                                  return;

                                setEditingData({
                                  ...editingData,
                                  [header]: val,
                                });
                              }}
                              onBlur={() => {
                                const val = editingData[header];
                                if (
                                  header === "mobile" &&
                                  val &&
                                  val.length !== 10
                                )
                                  alert(
                                    "Phone number must be exactly 10 digits."
                                  );
                                if (
                                  (header === "annualIncome" ||
                                    header === "familyMembers" ||
                                    header === "turnover") &&
                                  val &&
                                  isNaN(Number(val))
                                )
                                  alert(`${header} must be a number.`);
                                if (
                                  header === "dob" &&
                                  val &&
                                  isNaN(Date.parse(val))
                                )
                                  alert("DOB must be a valid date.");
                                if (
                                  header === "yearEstablished" &&
                                  val &&
                                  val.length === 4 &&
                                  isNaN(Number(val))
                                )
                                  alert(
                                    "Year Established must be a 4-digit number."
                                  );
                              }}
                            />
                          )
                        ) : header === "uploadedFile" && row[header] ? (
                          <div className="flex flex-col">
                            <span className="truncate">
                              {String(row[header])
                                .split("-")
                                .slice(1)
                                .join("-")}
                            </span>
                            <a
                              href={`${BACKEND}/uploads/${row[header]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline text-xs"
                            >
                              View
                            </a>
                          </div>
                        ) : (
                          <span className="truncate">{row[header]}</span>
                        )}
                      </td>
                    ))}
                    <td className="p-3 flex gap-2 items-center relative">
                      {/* Desktop Action Buttons */}
                      <div className="hidden sm:flex gap-1">
                        <button className="w-8 h-8 flex justify-center items-center border border-gray-200 rounded-md hover:bg-gray-100 transition">
                          <img src={PhoneLogo} alt="Call" className="w-4 h-4" />
                        </button>
                        <button
                          className="w-8 h-8 flex justify-center items-center border border-gray-200 rounded-md hover:bg-gray-100 transition"
                          // onClick={() => row.email && sendSingleEmail(row.email)}
                          onClick={() =>
                            row.email && openSingleEmailModal(row.email)
                          }
                        >
                          <img
                            src={MessageLogo}
                            alt="Email"
                            className="w-4 h-4"
                          />
                        </button>

                        <button
                          className="w-8 h-8 flex justify-center items-center border border-gray-200 rounded-md hover:bg-gray-100 transition"
                          onClick={() => {
                            if (!row.mobile)
                              return alert("No phone number found!");
                            setWhatsappRecipients([row.mobile]); // set the recipient
                            setWhatsappModalOpen(true); // open the modal
                          }}
                        >
                          <img
                            src={WhatsappLogo}
                            alt="WhatsApp"
                            className="w-4 h-4"
                          />
                        </button>

                        {isEditing ? (
                          <button
                            onClick={handleSaveEditRow}
                            className="w-8 h-8 flex justify-center items-center bg-black rounded-md hover:bg-gray-800 transition"
                          >
                            <Pencil className="w-4 h-4 text-white" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEditRow(row)}
                            className="w-8 h-8 flex justify-center items-center
                border border-gray-200 rounded-md hover:bg-gray-100 transition"
                          >
                            <Pencil className="w-4 h-4 text-black" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="w-8 h-8 flex justify-center items-center border border-gray-200 rounded-md hover:bg-gray-100 transition"
                        >
                          <Trash2 className="w-4 h-4 text-black" />
                        </button>
                      </div>

                      {/* Mobile Dot Menu */}
                      <div className="sm:hidden relative">
                        <button
                          className="text-xl font-bold px-2 py-1 rounded hover:bg-gray-200"
                          onClick={() =>
                            setMobileRowMenuOpen(
                              mobileRowMenuOpen === row.id ? null : row.id
                            )
                          }
                        >
                          ⋮
                        </button>

                        {mobileRowMenuOpen === row.id && (
                          <div className="absolute right-0 top-8 w-36 bg-white border border-gray-200 rounded shadow-lg z-50 flex flex-col gap-2 p-2">
                            <button
                              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 text-sm"
                              onClick={() =>
                                row.email && openSingleEmailModal(row.email)
                              }
                            >
                              <img
                                src={MessageLogo}
                                alt="Email"
                                className="w-4 h-4"
                              />
                              Email
                            </button>
                            <button
                              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 text-sm"
                              onClick={() => {
                                // Call action here
                                setMobileRowMenuOpen(null);
                              }}
                            >
                              <img
                                src={PhoneLogo}
                                alt="Call"
                                className="w-4 h-4"
                              />
                              Call
                            </button>
                            <button
                              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 text-sm"
                              onClick={() => {
                                // WhatsApp action here
                                setMobileRowMenuOpen(null);
                              }}
                            >
                              <img
                                src={WhatsappLogo}
                                alt="WhatsApp"
                                className="w-4 h-4"
                              />
                              WhatsApp
                            </button>
                            <button
                              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 text-sm"
                              onClick={() => {
                                if (isEditing) {
                                  handleSaveEditRow();
                                } else {
                                  handleEditRow(row);
                                }
                                setMobileRowMenuOpen(null);
                              }}
                            >
                              <Pencil className="w-4 h-4" />
                              {isEditing ? "Save" : "Edit"}
                            </button>
                            <button
                              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 text-sm"
                              onClick={() => {
                                handleDelete(row.id);
                                setMobileRowMenuOpen(null);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <SendEmail
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        recipients={emailRecipients}
        serviceName={serviceName}
      />
      <SendWhatsapp
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        recipients={whatsappRecipients}
        serviceName={serviceName}
      />
    </div>
  );
};

export default EnquiriesList;