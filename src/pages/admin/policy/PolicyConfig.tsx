
import React, { useEffect, useState } from "react";

type ScheduleType =
  | "BEFORE_EXPIRY"
  | "ON_EXPIRY"
  | "AFTER_EXPIRY"
  | "LAST_N_DAYS";

interface NotificationConfig {
  _id: string;
  name: string;
  type: ScheduleType;
  daysBeforeExpiry?: number;
  daysAfterExpiry?: number;
  lastNDays?: number;
  subject: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  name: string;
  type: ScheduleType;
  daysBeforeExpiry: string;
  daysAfterExpiry: string;
  lastNDays: string;
  subject: string;
  enabled: boolean;
}

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/policy-notification-configs`;

const emptyForm: FormData = {
  name: "",
  type: "BEFORE_EXPIRY",
  daysBeforeExpiry: "7",
  daysAfterExpiry: "",
  lastNDays: "",
  subject: "",
  enabled: true,
};

const PolicyNotificationConfigPage: React.FC = () => {
  const [configs, setConfigs] = useState<NotificationConfig[]>([]);
  const [form, setForm] = useState<FormData>(emptyForm);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [showForm, setShowForm] = useState<boolean>(false);

  /**
   * ============================================
   * FETCH ALL CONFIGURATIONS
   * ============================================
   */
  const fetchConfigs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to fetch notification configurations."
        );
      }

      setConfigs(result.data || []);
    } catch (err: any) {
      setError(
        err?.message || "Failed to fetch notification configurations."
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * ============================================
   * INITIAL LOAD
   * ============================================
   */
  useEffect(() => {
    fetchConfigs();
  }, []);

  /**
   * ============================================
   * HANDLE FORM CHANGE
   * ============================================
   */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /**
   * ============================================
   * HANDLE ENABLED CHANGE
   * ============================================
   */
  const handleEnabledChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((previous) => ({
      ...previous,
      enabled: e.target.checked,
    }));
  };

  /**
   * ============================================
   * RESET FORM
   * ============================================
   */
  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  /**
   * ============================================
   * OPEN CREATE FORM
   * ============================================
   */
  const handleCreate = () => {
    setError("");
    setSuccess("");

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  /**
   * ============================================
   * OPEN EDIT FORM
   * ============================================
   */
  const handleEdit = (config: NotificationConfig) => {
    setError("");
    setSuccess("");

    setEditingId(config._id);

    setForm({
      name: config.name,
      type: config.type,
      daysBeforeExpiry:
        config.daysBeforeExpiry !== undefined
          ? String(config.daysBeforeExpiry)
          : "",
      daysAfterExpiry:
        config.daysAfterExpiry !== undefined
          ? String(config.daysAfterExpiry)
          : "",
      lastNDays:
        config.lastNDays !== undefined
          ? String(config.lastNDays)
          : "",
      subject: config.subject,
      enabled: config.enabled,
    });

    setShowForm(true);
  };

  /**
   * ============================================
   * BUILD REQUEST BODY
   * ============================================
   */
  const buildPayload = () => {
    const payload: {
      name: string;
      type: ScheduleType;
      subject: string;
      enabled: boolean;
      daysBeforeExpiry?: number;
      daysAfterExpiry?: number;
      lastNDays?: number;
    } = {
      name: form.name.trim(),
      type: form.type,
      subject: form.subject.trim(),
      enabled: form.enabled,
    };

    if (form.type === "BEFORE_EXPIRY") {
      payload.daysBeforeExpiry = Number(form.daysBeforeExpiry);
    }

    if (form.type === "AFTER_EXPIRY") {
      payload.daysAfterExpiry = Number(form.daysAfterExpiry);
    }

    if (form.type === "LAST_N_DAYS") {
      payload.lastNDays = Number(form.lastNDays);
    }

    return payload;
  };

  /**
   * ============================================
   * CLIENT SIDE VALIDATION
   * ============================================
   */
  const validateForm = (): boolean => {
    if (!form.name.trim()) {
      setError("Reminder name is required.");
      return false;
    }

    if (!form.subject.trim()) {
      setError("Email subject is required.");
      return false;
    }

    if (form.type === "BEFORE_EXPIRY") {
      const value = Number(form.daysBeforeExpiry);

      if (!Number.isInteger(value) || value < 1) {
        setError(
          "Days before expiry must be a positive integer."
        );
        return false;
      }
    }

    if (form.type === "AFTER_EXPIRY") {
      const value = Number(form.daysAfterExpiry);

      if (!Number.isInteger(value) || value < 1) {
        setError(
          "Days after expiry must be a positive integer."
        );
        return false;
      }
    }

    if (form.type === "LAST_N_DAYS") {
      const value = Number(form.lastNDays);

      if (!Number.isInteger(value) || value < 1) {
        setError(
          "Last N days must be a positive integer."
        );
        return false;
      }
    }

    return true;
  };

  /**
   * ============================================
   * CREATE / UPDATE
   * ============================================
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const payload = buildPayload();

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to save notification configuration."
        );
      }

      setSuccess(
        editingId
          ? "Notification configuration updated successfully."
          : "Notification configuration created successfully."
      );

      resetForm();

      await fetchConfigs();
    } catch (err: any) {
      setError(
        err?.message ||
          "Failed to save notification configuration."
      );
    } finally {
      setSaving(false);
    }
  };

  /**
   * ============================================
   * DELETE
   * ============================================
   */
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notification configuration?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to delete notification configuration."
        );
      }

      setSuccess(
        "Notification configuration deleted successfully."
      );

      await fetchConfigs();
    } catch (err: any) {
      setError(
        err?.message ||
          "Failed to delete notification configuration."
      );
    }
  };

  /**
   * ============================================
   * TOGGLE ENABLE / DISABLE
   * ============================================
   */
  const handleToggle = async (
    config: NotificationConfig
  ) => {
    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/${config._id}/toggle`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            enabled: !config.enabled,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to update notification configuration."
        );
      }

      setSuccess(
        result.message ||
          "Notification configuration updated successfully."
      );

      await fetchConfigs();
    } catch (err: any) {
      setError(
        err?.message ||
          "Failed to update notification configuration."
      );
    }
  };

  /**
   * ============================================
   * FORMAT SCHEDULE
   * ============================================
   */
  const getScheduleText = (
    config: NotificationConfig
  ): string => {
    switch (config.type) {
      case "BEFORE_EXPIRY":
        return `${config.daysBeforeExpiry} day${
          config.daysBeforeExpiry === 1 ? "" : "s"
        } before expiry`;

      case "ON_EXPIRY":
        return "On expiry date";

      case "AFTER_EXPIRY":
        return `${config.daysAfterExpiry} day${
          config.daysAfterExpiry === 1 ? "" : "s"
        } after expiry`;

      case "LAST_N_DAYS":
        return `Every day during last ${config.lastNDays} day${
          config.lastNDays === 1 ? "" : "s"
        }`;

      default:
        return "-";
    }
  };

  /**
   * ============================================
   * GET TYPE LABEL
   * ============================================
   */
  const getTypeLabel = (
    type: ScheduleType
  ): string => {
    switch (type) {
      case "BEFORE_EXPIRY":
        return "Before Expiry";

      case "ON_EXPIRY":
        return "On Expiry";

      case "AFTER_EXPIRY":
        return "After Expiry";

      case "LAST_N_DAYS":
        return "Last N Days";

      default:
        return type;
    }
  };

  /**
   * ============================================
   * RENDER
   * ============================================
   */
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "32px",
        fontFamily:
          "Inter, Arial, Helvetica, sans-serif",
      }}
    >
      {/* ======================================
          HEADER
      ======================================= */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              Policy Notification Configurations
            </h1>

            <p
              style={{
                marginTop: "8px",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              Manage policy expiry reminder schedules.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            style={{
              border: "none",
              background: "#2563eb",
              color: "#ffffff",
              padding: "12px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            + Add Reminder
          </button>
        </div>

        {/* ======================================
            SUCCESS
        ======================================= */}
        {success && (
          <div
            style={{
              background: "#ecfdf5",
              color: "#047857",
              border: "1px solid #a7f3d0",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {success}
          </div>
        )}

        {/* ======================================
            ERROR
        ======================================= */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fecaca",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* ======================================
            CREATE / EDIT FORM
        ======================================= */}
        {showForm && (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              padding: "24px",
              marginBottom: "24px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  color: "#111827",
                }}
              >
                {editingId
                  ? "Edit Notification Reminder"
                  : "Create Notification Reminder"}
              </h2>

              <button
                type="button"
                onClick={resetForm}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#6b7280",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",
                  gap: "18px",
                }}
              >
                {/* NAME */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Reminder Name
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. 7 Days Before Expiry"
                    style={inputStyle}
                  />
                </div>

                {/* TYPE */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Reminder Type
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={(e) => {
                      setForm((previous) => ({
                        ...previous,
                        type: e.target
                          .value as ScheduleType,
                        daysBeforeExpiry: "",
                        daysAfterExpiry: "",
                        lastNDays: "",
                      }));
                    }}
                    style={inputStyle}
                  >
                    <option value="BEFORE_EXPIRY">
                      Before Expiry
                    </option>

                    <option value="ON_EXPIRY">
                      On Expiry
                    </option>

                    <option value="AFTER_EXPIRY">
                      After Expiry
                    </option>

                    <option value="LAST_N_DAYS">
                      Last N Days
                    </option>
                  </select>
                </div>

                {/* DYNAMIC DAYS FIELD */}
                {form.type ===
                  "BEFORE_EXPIRY" && (
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Days Before Expiry
                    </label>

                    <input
                      type="number"
                      min="1"
                      name="daysBeforeExpiry"
                      value={
                        form.daysBeforeExpiry
                      }
                      onChange={handleChange}
                      placeholder="7"
                      style={inputStyle}
                    />
                  </div>
                )}

                {form.type ===
                  "AFTER_EXPIRY" && (
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Days After Expiry
                    </label>

                    <input
                      type="number"
                      min="1"
                      name="daysAfterExpiry"
                      value={
                        form.daysAfterExpiry
                      }
                      onChange={handleChange}
                      placeholder="2"
                      style={inputStyle}
                    />
                  </div>
                )}

                {form.type ===
                  "LAST_N_DAYS" && (
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Last N Days
                    </label>

                    <input
                      type="number"
                      min="1"
                      name="lastNDays"
                      value={form.lastNDays}
                      onChange={handleChange}
                      placeholder="3"
                      style={inputStyle}
                    />
                  </div>
                )}

                {/* SUBJECT */}
                <div
                  style={{
                    gridColumn: "1 / -1",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Email Subject
                  </label>

                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Policy Expiry Reminder"
                    style={inputStyle}
                  />
                </div>

                {/* ENABLED */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input
                    id="enabled"
                    type="checkbox"
                    checked={form.enabled}
                    onChange={handleEnabledChange}
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                  />

                  <label
                    htmlFor="enabled"
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Enable this reminder
                  </label>
                </div>
              </div>

              {/* FORM ACTIONS */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "24px",
                }}
              >
                <button
                  type="button"
                  onClick={resetForm}
                  style={secondaryButtonStyle}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    ...primaryButtonStyle,
                    opacity: saving ? 0.6 : 1,
                  }}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Reminder"
                    : "Create Reminder"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ======================================
            LIST
        ======================================= */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              padding: "18px 20px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                  color: "#111827",
                }}
              >
                Notification Reminders
              </h2>

              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "13px",
                  color: "#6b7280",
                }}
              >
                {configs.length} configuration
                {configs.length === 1
                  ? ""
                  : "s"}
              </p>
            </div>

            <button
              type="button"
              onClick={fetchConfigs}
              disabled={loading}
              style={secondaryButtonStyle}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {loading && configs.length === 0 ? (
            <div
              style={{
                padding: "50px",
                textAlign: "center",
                color: "#6b7280",
              }}
            >
              Loading notification configurations...
            </div>
          ) : configs.length === 0 ? (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "40px",
                  marginBottom: "12px",
                }}
              >
                🔔
              </div>

              <h3
                style={{
                  margin: 0,
                  color: "#111827",
                }}
              >
                No notification reminders
              </h3>

              <p
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                Create your first policy expiry
                reminder.
              </p>

              <button
                type="button"
                onClick={handleCreate}
                style={primaryButtonStyle}
              >
                + Create Reminder
              </button>
            </div>
          ) : (
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "950px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#f9fafb",
                    }}
                  >
                    <th style={thStyle}>
                      Name
                    </th>

                    <th style={thStyle}>
                      Type
                    </th>

                    <th style={thStyle}>
                      Schedule
                    </th>

                    <th style={thStyle}>
                      Email Subject
                    </th>

                    <th style={thStyle}>
                      Status
                    </th>

                    <th
                      style={{
                        ...thStyle,
                        textAlign: "right",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {configs.map((config) => (
                    <tr
                      key={config._id}
                      style={{
                        borderTop:
                          "1px solid #e5e7eb",
                      }}
                    >
                      {/* NAME */}
                      <td style={tdStyle}>
                        <div
                          style={{
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {config.name}
                        </div>

                        <div
                          style={{
                            marginTop: "4px",
                            fontSize: "12px",
                            color: "#9ca3af",
                          }}
                        >
                          ID: {config._id}
                        </div>
                      </td>

                      {/* TYPE */}
                      <td style={tdStyle}>
                        <span
                          style={{
                            display:
                              "inline-block",
                            padding:
                              "5px 9px",
                            borderRadius:
                              "999px",
                            background:
                              "#eff6ff",
                            color:
                              "#1d4ed8",
                            fontSize:
                              "12px",
                            fontWeight: 600,
                          }}
                        >
                          {getTypeLabel(
                            config.type
                          )}
                        </span>
                      </td>

                      {/* SCHEDULE */}
                      <td style={tdStyle}>
                        {getScheduleText(
                          config
                        )}
                      </td>

                      {/* SUBJECT */}
                      <td style={tdStyle}>
                        {config.subject}
                      </td>

                      {/* STATUS */}
                      <td style={tdStyle}>
                        <button
                          type="button"
                          onClick={() =>
                            handleToggle(
                              config
                            )
                          }
                          style={{
                            border: "none",
                            cursor: "pointer",
                            padding:
                              "6px 10px",
                            borderRadius:
                              "999px",
                            background:
                              config.enabled
                                ? "#dcfce7"
                                : "#f3f4f6",
                            color:
                              config.enabled
                                ? "#166534"
                                : "#6b7280",
                            fontWeight: 600,
                            fontSize:
                              "12px",
                          }}
                        >
                          {config.enabled
                            ? "Enabled"
                            : "Disabled"}
                        </button>
                      </td>

                      {/* ACTIONS */}
                      <td
                        style={{
                          ...tdStyle,
                          textAlign:
                            "right",
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            justifyContent:
                              "flex-end",
                            gap: "8px",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                config
                              )
                            }
                            style={{
                              ...smallButtonStyle,
                              color:
                                "#2563eb",
                            }}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                config._id
                              )
                            }
                            style={{
                              ...smallButtonStyle,
                              color:
                                "#dc2626",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * ============================================
 * STYLES
 * ============================================
 */

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "7px",
  outline: "none",
  fontSize: "14px",
  color: "#111827",
  background: "#ffffff",
};

const primaryButtonStyle: React.CSSProperties = {
  border: "none",
  background: "#2563eb",
  color: "#ffffff",
  padding: "10px 16px",
  borderRadius: "7px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "14px",
};

const secondaryButtonStyle: React.CSSProperties = {
  border: "1px solid #d1d5db",
  background: "#ffffff",
  color: "#374151",
  padding: "10px 16px",
  borderRadius: "7px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "14px",
};

const smallButtonStyle: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  padding: "7px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "12px",
};

const thStyle: React.CSSProperties = {
  padding: "13px 16px",
  textAlign: "left",
  fontSize: "12px",
  fontWeight: 700,
  color: "#6b7280",
  textTransform: "uppercase",
};

const tdStyle: React.CSSProperties = {
  padding: "16px",
  fontSize: "14px",
  color: "#374151",
  verticalAlign: "middle",
};

export default PolicyNotificationConfigPage;

