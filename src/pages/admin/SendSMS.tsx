// 📁 src/pages/admin/SendSMS.tsx
import React, { useState, useEffect } from "react";
import { BiSend, BiX } from "react-icons/bi";

interface SendSMSProps {
  isOpen: boolean;
  onClose: () => void;
  recipients: string[]; // Numbers with country code e.g., "911234567890"
  serviceName: string;
}

const SendSMS: React.FC<SendSMSProps> = ({
  isOpen,
  onClose,
  recipients,
  serviceName,
}) => {
  const defaultMessage = `Hello, this is a message from ${serviceName} enquiry.`;
  const [message, setMessage] = useState(defaultMessage);
  const [sending, setSending] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMessage(defaultMessage);
      setPreviewOpen(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setMessage(defaultMessage);
    setPreviewOpen(false);
    onClose();
  };

  const openPreview = () => setPreviewOpen(true);
  const closePreview = () => setPreviewOpen(false);

  const sendSMS = () => {
    if (!recipients.length) return alert("No recipients found!");
    setSending(true);

    try {
      recipients.forEach((number) => {
        const cleanNumber = number.replace(/\D/g, ""); // Remove non-digit chars
        const url = `sms:${cleanNumber}?body=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
      });

      alert("SMS message window(s) opened!");
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Error sending SMS messages");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">📱 Send SMS</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-red-500"
            >
              <BiX size={24} />
            </button>
          </div>

          <div className="mb-3 text-sm text-gray-600 truncate">
            <strong>Recipients:</strong>{" "}
            {recipients.length > 3
              ? `${recipients.slice(0, 3).join(", ")} +${recipients.length - 3}`
              : recipients.join(", ")}
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your SMS message..."
            className="border rounded px-3 py-2 w-full text-sm mb-3 resize-none"
            rows={5}
          />

          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={openPreview}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Preview
            </button>
            <button
              onClick={sendSMS}
              disabled={sending}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"
            >
              <BiSend /> {sending ? "Opening..." : "Send"}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">📄 Preview Message</h2>
              <button
                onClick={closePreview}
                className="text-gray-500 hover:text-red-500"
              >
                <BiX size={24} />
              </button>
            </div>
            <div className="border p-3 rounded bg-gray-50 whitespace-pre-wrap text-sm">
              {message}
            </div>
            <div className="flex justify-end mt-3">
              <button
                onClick={closePreview}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SendSMS;
