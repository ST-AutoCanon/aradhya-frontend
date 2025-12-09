// src/pages/AdminBanner.tsx
import React, { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, Smile } from "lucide-react";
import { useBanner } from "../../context/BannerContext";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AdminBanner: React.FC = () => {
  const { bannerMessages } = useBanner();
  const [messages, setMessages] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");

  const [pickerPosition, setPickerPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [showAddEmojiPicker, setShowAddEmojiPicker] = useState(false);
  const [showEditEmojiPicker, setShowEditEmojiPicker] = useState(false);

  const addPickerRef = useRef<HTMLDivElement | null>(null);
  const editPickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages(bannerMessages);
  }, [bannerMessages]);

  // 🧠 Close emoji pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addPickerRef.current &&
        !addPickerRef.current.contains(event.target as Node)
      ) {
        setShowAddEmojiPicker(false);
      }
      if (
        editPickerRef.current &&
        !editPickerRef.current.contains(event.target as Node)
      ) {
        setShowEditEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmojiClick = (
    emojiData: EmojiClickData,
    mode: "add" | "edit"
  ) => {
    if (mode === "edit") {
      setEditingValue((prev) => prev + emojiData.emoji);
      setShowEditEmojiPicker(false);
    } else {
      setNewMessage((prev) => prev + emojiData.emoji);
      setShowAddEmojiPicker(false);
    }
  };

  const saveMessages = async (newMessages: string[]) => {
    try {
      await axios.post(`${backendUrl}/api/banner`, { messages: newMessages });
      setMessages(newMessages);
    } catch (err) {
      console.error("Failed to save banners:", err);
    }
  };

  const handleAdd = async () => {
    if (messages.length >= 5) {
      alert("Maximum limit of 5 banner messages reached!");
      return;
    }
    if (!newMessage.trim()) return;
    const newMessages = [...messages, newMessage.trim()];
    setNewMessage("");
    await saveMessages(newMessages);
  };

  const handleEdit = async (index: number) => {
    if (editingIndex === index) {
      const newMessages = messages.map((m, i) =>
        i === index ? editingValue : m
      );
      setEditingIndex(null);
      setEditingValue("");
      await saveMessages(newMessages);
    } else {
      setEditingIndex(index);
      setEditingValue(messages[index]);
    }
  };

  const handleDelete = async (index: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner message?"
    );
    if (!confirmDelete) return;

    try {
      const newMessages = messages.filter((_, i) => i !== index);
      await saveMessages(newMessages);
      alert("Banner message deleted successfully ✅");
    } catch (err) {
      console.error("Failed to delete banner:", err);
      alert("Something went wrong while deleting the banner ❌");
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white flex flex-col items-center">
      <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
        Banner Messages
      </h1>

      {/* Add new message */}
      <div className="flex flex-col sm:flex-row w-full max-w-4xl gap-2 sm:gap-4 mt-6 mb-6 relative">
        <div className="flex items-center w-full relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Add new banner message 🌟"
            // className="flex-1 border rounded px-3 py-2 text-sm sm:text-base"
            className="w-full border border-gray-500 rounded px-2 py-1 text-sm sm:text-base pr-10"
          />

          {/* Emoji button for Add */}
          <button
            type="button"
            onClick={() => {
              setShowAddEmojiPicker((prev) => !prev);
              setShowEditEmojiPicker(false);
            }}
            className="absolute right-2 text-gray-600 hover:text-black"
          >
            <Smile size={20} />
          </button>

          {/* Emoji picker for Add */}
          {showAddEmojiPicker && (
            <div
              ref={addPickerRef}
              className="absolute top-full right-0 mt-2 z-50"
            >
              <EmojiPicker
                onEmojiClick={(emojiData) => handleEmojiClick(emojiData, "add")}
                height={300}
                width={window.innerWidth < 640 ? 260 : 320}
              />
            </div>
          )}
        </div>

        <button
          onClick={handleAdd}
          className="w-full sm:w-36 bg-white text-black border border-black px-3 py-2 sm:px-5 sm:py-2 rounded font-semibold hover:bg-black hover:text-white transition-colors duration-200"
        >
          Add
        </button>
      </div>

      {/* Table */}
      <div className="w-full max-w-4xl overflow-x-auto relative z-0 rounded-md border border-gray-200 shadow-sm">
        <table className="min-w-full border-collapse text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-100 border-b border-gray-300 text-left">
            <tr>
              <th className="p-2 sm:p-3 border-r border-gray-300 w-10 sm:w-12 text-center">
                SL
              </th>
              <th className="p-2 sm:p-3 border-r border-gray-300">
                Description
              </th>
              <th className="p-2 sm:p-3 w-24 sm:w-32 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-2 sm:p-3 border-b border-gray-300 text-center">
                  {idx + 1}
                </td>
                <td className="p-2 sm:p-3 border-b border-gray-300">
                  {editingIndex === idx ? (
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        placeholder="Edit banner message 🌈"
                        // className="w-full border border-gray-500 rounded px-2 py-1 text-sm sm:text-base"
                        className="w-full border border-gray-500 rounded px-2 py-1 text-sm sm:text-base pr-10"
                      />

                      {/* Emoji button for Edit */}
                      <button
                        type="button"
                        onClick={(e) => {
                          const rect = (
                            e.currentTarget as HTMLElement
                          ).getBoundingClientRect();
                          setShowEditEmojiPicker((prev) => !prev);
                          setShowAddEmojiPicker(false);
                          setPickerPosition({
                            top: rect.bottom + 8,
                            left: Math.min(rect.left, window.innerWidth - 320),
                          });
                        }}
                        className="absolute right-2 text-gray-600 hover:text-black"
                      >
                        <Smile size={18} />
                      </button>

                      {/* Floating Emoji Picker for Edit */}
                      {/* Floating Emoji Picker for Edit */}
                      {showEditEmojiPicker && pickerPosition && (
                        <div
                          ref={editPickerRef}
                          className="fixed z-[9999]"
                          style={{
                            top:
                              pickerPosition.top + 360 > window.innerHeight
                                ? window.innerHeight - 370
                                : pickerPosition.top,
                            left:
                              pickerPosition.left + 300 > window.innerWidth
                                ? window.innerWidth - 310
                                : pickerPosition.left,
                          }}
                        >
                          <div
                            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                            style={{
                              width: window.innerWidth < 400 ? "90vw" : 300, // 📱 Responsive width
                              maxHeight: "80vh", // prevent overflow on very small screens
                            }}
                          >
                            <EmojiPicker
                              onEmojiClick={(emojiData) =>
                                handleEmojiClick(emojiData, "edit")
                              }
                              width={"100%"}
                              height={window.innerHeight < 500 ? 300 : 350}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    msg
                  )}
                </td>
                <td className="p-2 sm:p-3 border-b border-gray-300">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <button
                      onClick={() => handleEdit(idx)}
                      className={`p-1 sm:p-2 rounded transition-colors duration-200 ${
                        editingIndex === idx
                          ? "bg-black text-white"
                          : "text-black hover:text-gray-700"
                      }`}
                    >
                      <Pencil size={16} className="sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="text-black hover:text-gray-700 p-1 sm:p-2 rounded"
                    >
                      <Trash2 size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={3} className="p-3 text-center text-gray-500">
                  No banner messages
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBanner;
