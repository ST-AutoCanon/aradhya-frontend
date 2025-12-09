//20-10-2025

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { FontSize } from "@tiptap/extension-font-size";
import { TextAlign } from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { Mark, mergeAttributes } from "@tiptap/core";
import axios from "axios";
import Image from "@tiptap/extension-image";
import {
  BiBold,
  BiItalic,
  BiUnderline,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiListUl,
  BiListOl,
  BiSend,
  BiColorFill,
  BiHighlight,
  BiPaperclip,
  BiX,
  BiImage,
} from "react-icons/bi";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

// Highlight extension
export const Highlight = Mark.create({
  name: "highlight",
  addOptions() {
    return { HTMLAttributes: {}, color: "yellow" };
  },
  addAttributes() {
    return {
      color: {
        default: this.options.color,
        parseHTML: (el) => el.getAttribute("data-color") || this.options.color,
        renderHTML: (attrs) => ({ style: `background-color: ${attrs.color}` }),
      },
    };
  },
  parseHTML() {
    return [{ tag: "mark" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "mark",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});

interface SendEmailProps {
  isOpen: boolean;
  onClose: () => void;
  recipients: string[];
  serviceName: string;
}

const SendEmail: React.FC<SendEmailProps> = ({
  isOpen,
  onClose,
  recipients,
  serviceName,
}) => {
  const [subject, setSubject] = useState(`${serviceName} Enquiry`);
  const [sending, setSending] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedFont, setSelectedFont] = useState("Arial, sans-serif");
  const [selectedSize, setSelectedSize] = useState("13px");
  const [previewOpen, setPreviewOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle.configure({ types: ["textStyle"] }),
      Color,
      FontFamily,
      FontSize,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link,
      BulletList,
      OrderedList,
      ListItem,
      Highlight,
      // Image,
  Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: "max-width:150px; height:auto; display:block;",
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ["img", { ...HTMLAttributes }];
  },
})

    ],
    content: `<p style="font-family: Arial, sans-serif; font-size:13px;">Hello, this is a message from <b>${serviceName}</b> enquiry.</p>`,
  });

  // useEffect(() => {
  //   if (!editor) return;

  //   const loadSignature = async () => {
  //     try {
  //       const url = `${BACKEND}/api/send-email/get-signature`;
  //       const response = await fetch(url);
  //       if (response.ok) {
  //         // Insert into editor
  //         editor.chain().focus().setImage({ src: url }).run();
  //       }
  //     } catch (err) {
  //       console.error("Error loading signature:", err);
  //     }
  //   };

  //   // Call it when the modal opens
  //   if (isOpen) {
  //     loadSignature();
  //   }
  // }, [editor, isOpen]);

  const insertOrReplaceSignature = (url: string) => {
    if (!editor) return;

    // Remove all existing images
    const imagePositions: number[] = [];
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === "image") imagePositions.push(pos);
      return true;
    });

    for (let i = imagePositions.length - 1; i >= 0; i--) {
      editor
        .chain()
        .focus()
        .deleteRange({ from: imagePositions[i], to: imagePositions[i] + 1 })
        .run();
    }

    // Insert new image
    editor.chain().focus().setImage({ src: url }).run();
  };

  const loadSignature = async () => {
    if (!editor) return;
    try {
      const url = `${BACKEND}/api/send-email/get-signature`;
      const response = await fetch(url);
      if (response.ok) {
        insertOrReplaceSignature(url); // replaces or inserts
      }
    } catch (err) {
      console.error("Error loading signature:", err);
    }
  };

  useEffect(() => {
    if (!editor) return;
    if (isOpen) loadSignature();
  }, [editor, isOpen]);

  const handleSignatureUpload = async (file: File) => {
    const MAX_SIZE = 200 * 1024; // 200 KB
    if (!file || !editor) return;

    if (file.size > MAX_SIZE) {
      alert("Signature image size should not exceed 200 KB.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("signature", file);

      await axios.post(`${BACKEND}/api/send-email/upload-signature`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Get fresh signature URL
      const url = `${BACKEND}/api/send-email/get-signature?t=${Date.now()}`;
      insertOrReplaceSignature(url);
    } catch (err) {
      console.error("Error uploading signature:", err);
      alert("Failed to upload signature");
    }
  };

  useEffect(() => {
    if (!editor) return;
    const update = () => {
      const font =
        editor.getAttributes("textStyle").fontFamily || "Arial, sans-serif";
      const size = editor.getAttributes("textStyle").fontSize || "13px";
      setSelectedFont(font);
      setSelectedSize(size);
    };
    editor.on("selectionUpdate", update);
    return () => editor.off("selectionUpdate", update);
  }, [editor]);

  useEffect(() => {
    if (isOpen) {
      setSubject(`${serviceName} Enquiry`);
      setAttachments([]);
      editor?.commands.setContent(
        `<p style="font-family: Arial, sans-serif; font-size:13px;">Hello, this is a message from <b>${serviceName}</b> enquiry.</p>`
      );
    }
  }, [isOpen, serviceName, editor]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  if (isOpen) console.log("✅ SendEmail is rendering on mobile");

  const MAX_FILE_SIZE = 20 * 1024 * 1024;
  const MAX_TOTAL_SIZE = 20 * 1024 * 1024;

  const validateFiles = (files: File[]) => {
    let totalSize = attachments.reduce((acc, f) => acc + f.size, 0);
    const validFiles: File[] = [];
    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE)
        alert(`${file.name} exceeds 20 MB per file limit.`);
      else if (totalSize + file.size > MAX_TOTAL_SIZE)
        alert(`Total attachments exceed 20 MB limit.`);
      else {
        validFiles.push(file);
        totalSize += file.size;
      }
    });
    return validFiles;
  };

  const sendEmail = async () => {
    if (!recipients.length) return alert("No recipients found!");
    setSending(true);
    try {
      const html = editor?.getHTML() || "";
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("html", html);
      if (recipients.length > 1)
        recipients.forEach((r) => formData.append("recipients", r));
      else formData.append("to", recipients[0]);
      attachments.forEach((file) => formData.append("attachments", file));
      const endpoint =
        recipients.length > 1
          ? `${BACKEND}/api/send-email/bulk`
          : `${BACKEND}/api/send-email/single`;
      await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Email sent successfully!");
      setAttachments([]);
      setPreviewOpen(false);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error sending email");
    } finally {
      setSending(false);
    }
  };

  if (!editor) return null;

  const toggleMark = (mark: string) => editor.chain().focus()[mark]().run();
  const setTextAlign = (alignment: "left" | "center" | "right" | "justify") =>
    editor.chain().focus().setTextAlign(alignment).run();
  const toggleHighlight = () =>
    editor.isActive("highlight")
      ? editor.chain().focus().unsetMark("highlight").run()
      : editor.chain().focus().setMark("highlight", { color: "yellow" }).run();
  const applyTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
    setShowColorPicker(false);
  };
  const handleClose = () => {
    setAttachments([]);
    onClose();
  };

  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#FFC0CB",
    "#A52A2A",
    "#808080",
    "#000080",
  ];

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
        <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-4 md:p-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">✉️ Send Email</h2>
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

          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email Subject"
            className="border rounded px-3 py-2 w-full text-sm mb-3"
          />

          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 mb-2 relative text-xs md:text-sm">
            <select
              value={selectedFont}
              onChange={(e) => {
                const font = e.target.value;
                setSelectedFont(font);
                editor?.chain().focus().setFontFamily(font).run();
              }}
              className="border rounded px-2 py-1"
              title="Font Family"
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Noto Sans, sans-serif">Noto Sans</option>
              <option value="Verdana, sans-serif">Verdana</option>
              <option value="Tahoma, sans-serif">Tahoma</option>
              <option value="Times New Roman, serif">Times New Roman</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Courier New, monospace">Courier New</option>
            </select>

            <select
              value={selectedSize}
              onChange={(e) => {
                const size = e.target.value;
                setSelectedSize(size);
                editor?.chain().focus().setFontSize(size).run();
              }}
              className="border rounded px-2 py-1"
              title="Font Size"
            >
              <option value="10px">10</option>
              <option value="11px">11</option>
              <option value="12px">12</option>
              <option value="13px">13</option>
              <option value="14px">14</option>
              <option value="16px">16</option>
              <option value="18px">18</option>
              <option value="20px">20</option>
              <option value="24px">24</option>
              <option value="28px">28</option>
              <option value="32px">32</option>
            </select>

            <button onClick={() => toggleMark("toggleBold")} title="Bold">
              <BiBold size={20} />
            </button>
            <button onClick={() => toggleMark("toggleItalic")} title="Italic">
              <BiItalic size={20} />
            </button>
            <button
              onClick={() => toggleMark("toggleUnderline")}
              title="Underline"
            >
              <BiUnderline size={20} />
            </button>
            <button onClick={() => setTextAlign("left")} title="Align Left">
              <BiAlignLeft size={20} />
            </button>
            <button onClick={() => setTextAlign("center")} title="Align Center">
              <BiAlignMiddle size={20} />
            </button>
            <button onClick={() => setTextAlign("right")} title="Align Right">
              <BiAlignRight size={20} />
            </button>
            <button
              onClick={() => toggleMark("toggleBulletList")}
              title="Bullet List"
            >
              <BiListUl size={20} />
            </button>
            <button
              onClick={() => toggleMark("toggleOrderedList")}
              title="Numbered List"
            >
              <BiListOl size={20} />
            </button>
            <button onClick={toggleHighlight} title="Highlight">
              <BiHighlight size={20} />
            </button>

            {/* <label
              className="cursor-pointer flex items-center"
              title="Attach File"
            >
              <BiPaperclip size={20} />
              <input
                type="file"
                multiple
                onChange={(e) => {
                  const newFiles = validateFiles(
                    Array.from(e.target.files || [])
                  );
                  setAttachments((prev) => [...prev, ...newFiles]);
                  e.target.value = "";
                }}
                className="hidden"
              />
            </label> */}

            <label
              className="cursor-pointer flex items-center"
              title="Attach File"
            >
              <BiPaperclip size={20} />
              <input
                type="file"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (!files.length) return;

                  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB per file
                  const MAX_TOTAL_SIZE = 20 * 1024 * 1024; // 20 MB total

                  // calculate total size of already attached files
                  const currentTotal = attachments.reduce(
                    (sum, f) => sum + f.size,
                    0
                  );

                  const validFiles: File[] = [];
                  let newTotal = currentTotal;

                  for (const file of files) {
                    if (file.size > MAX_FILE_SIZE) {
                      alert(`${file.name} exceeds the 20 MB per-file limit.`);
                      continue;
                    }
                    if (newTotal + file.size > MAX_TOTAL_SIZE) {
                      alert(
                        `Total attachments exceed the 20 MB combined limit.`
                      );
                      break;
                    }
                    validFiles.push(file);
                    newTotal += file.size;
                  }

                  if (validFiles.length > 0) {
                    // run your existing validation (e.g. file type)
                    const newFiles = validateFiles(validFiles);
                    setAttachments((prev) => [...prev, ...newFiles]);
                  }

                  // reset input so same file can be re-uploaded if needed
                  e.target.value = "";
                }}
                className="hidden"
              />
            </label>

            {/* <label
              className="cursor-pointer flex items-center"
              title="Insert Signature"
            >
              <BiImage size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file || !editor) return;
                  e.target.value = "";

                  try {
                    const formData = new FormData();
                    formData.append("signature", file);

                    // Call your existing backend signature upload route
                    const { data } = await axios.post(
                      `${BACKEND}/api/send-email/upload-signature`,
                      formData,
                      { headers: { "Content-Type": "multipart/form-data" } }
                    );

                    if (data.url) {
                      // Insert the uploaded image into the editor at cursor
                      editor.chain().focus().setImage({ src: data.url }).run();
                    }
                  } catch (err) {
                    console.error("Error uploading signature:", err);
                    alert("Failed to upload signature");
                  }
                }}
                className="hidden"
              />
            </label> */}

            {/* <label
                className="cursor-pointer flex items-center"
                title="Insert Signature"
              >
                <BiImage size={20} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file || !editor) return;
                    e.target.value = "";

                    try {
                      const formData = new FormData();
                      formData.append("signature", file);

                      // Upload to server
                      await axios.post(
                        `${BACKEND}/api/send-email/upload-signature`,
                        formData,
                        { headers: { "Content-Type": "multipart/form-data" } }
                      );

                      // Insert fresh image
                      const url = `${BACKEND}/api/send-email/get-signature?t=${Date.now()}`;
                      editor.chain().focus().setImage({ src: url }).run();
                    } catch (err) {
                      console.error("Error uploading signature:", err);
                      alert("Failed to upload signature");
                    }
                  }}
                  className="hidden"
                />
              </label> */}

            <label
              className="cursor-pointer flex items-center"
              title="Insert Signature"
            >
              <BiImage size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  handleSignatureUpload(file); // call reusable function
                }}
                className="hidden"
              />
            </label>

            <div className="relative">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                title="Text Color"
              >
                <BiColorFill size={20} />
              </button>
              {showColorPicker && (
                <div className="absolute top-full mt-1 p-1 bg-white border rounded shadow flex flex-wrap w-40 z-50">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 m-1 rounded cursor-pointer border"
                      style={{ backgroundColor: color }}
                      onClick={() => applyTextColor(color)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <EditorContent
            editor={editor}
            className="border p-2 min-h-[200px] prose"
          />

          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm shadow-sm"
                >
                  <BiPaperclip className="mr-1 text-gray-600" />
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button
                    onClick={() =>
                      setAttachments((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className="ml-2 text-gray-500 hover:text-red-500"
                    title="Remove"
                  >
                    <BiX />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-end gap-2 mt-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 border rounded hover:bg-gray-100 w-full md:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={() => setPreviewOpen(true)}
              className="px-4 py-2 border rounded hover:bg-gray-100 w-full md:w-auto"
            >
              Preview
            </button>

            <button
              onClick={sendEmail}
              disabled={sending}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1 w-full md:w-auto"
            >
              <BiSend /> {sending ? "Sending..." : "Send Email"}
            </button>
          </div>
        </div>
      </div>
      {/* {previewOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-4 md:p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">📄 Email Preview</h2>
              <button
                onClick={() => setPreviewOpen(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <BiX size={24} />
              </button>
            </div>

            <div className="mb-3">
              <strong>Subject:</strong> {subject}
            </div>

            <div className="mb-3">
              <strong>Recipients:</strong> {recipients.join(", ")}
            </div>

            <div
              className="border p-2 min-h-[200px] overflow-auto prose"
              dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
            />

            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm shadow-sm"
                  >
                    <BiPaperclip className="mr-1 text-gray-600" />
                    <span className="truncate max-w-[150px]">{file.name}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-3">
              <button
                onClick={() => setPreviewOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )} */}
      {previewOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-4 md:p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">📧 Preview Email</h2>
              <button
                onClick={() => setPreviewOpen(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <BiX size={24} />
              </button>
            </div>

            <div className="mb-3 text-sm text-gray-600 truncate">
              <strong>Recipients:</strong>{" "}
              {recipients.length > 3
                ? `${recipients.slice(0, 3).join(", ")} +${
                    recipients.length - 3
                  }`
                : recipients.join(", ")}
            </div>

            <div className="mb-3">
              <strong>Subject:</strong> {subject}
            </div>

            <div className="border p-3 min-h-[200px] overflow-auto prose">
              {/* Render the actual HTML content */}
              <div
                dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
              />
            </div>

            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm shadow-sm"
                  >
                    <BiPaperclip className="mr-1 text-gray-600" />
                    <span className="truncate max-w-[150px]">{file.name}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setPreviewOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={sendEmail}
                disabled={sending}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1"
              >
                <BiSend /> {sending ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SendEmail;
