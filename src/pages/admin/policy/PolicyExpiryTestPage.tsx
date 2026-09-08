import React, { useEffect, useState } from "react";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/policy-expiry`;

interface TestDateResponse {
  success: boolean;
  testDate: string | null;
  usingRealDate: boolean;
}

interface SetTestDateResponse {
  success: boolean;
  message: string;
  testDate: string | null;
}

const PolicyExpiryTestPage: React.FC = () => {
  const [testDate, setTestDate] = useState("");
  const [currentTestDate, setCurrentTestDate] = useState<string | null>(null);
  const [usingRealDate, setUsingRealDate] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --------------------------------------------------
  // GET CURRENT TEST DATE
  // --------------------------------------------------
  const fetchTestDate = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/test-date`);

      if (!response.ok) {
        throw new Error("Failed to fetch test date.");
      }

      const data: TestDateResponse = await response.json();

      if (!data.success) {
        throw new Error("Failed to fetch test date.");
      }

      setCurrentTestDate(data.testDate);
      setUsingRealDate(data.usingRealDate);

      // Populate input if a test date is already configured
      if (data.testDate) {
        setTestDate(data.testDate);
      } else {
        setTestDate("");
      }
    } catch (err) {
      console.error("Failed to fetch policy expiry test date:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch current test date.",
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // LOAD ON PAGE OPEN
  // --------------------------------------------------
  useEffect(() => {
    fetchTestDate();
  }, []);

  // --------------------------------------------------
  // SET TEST DATE
  // --------------------------------------------------
  const handleSetTestDate = async () => {
    if (!testDate) {
      setError("Please select a test date.");
      setSuccess("");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(`${API_URL}/test-date`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testDate,
        }),
      });

      const data: SetTestDateResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to set policy expiry test date.",
        );
      }

      setCurrentTestDate(data.testDate);
      setUsingRealDate(data.testDate === null);

      setSuccess(
        data.message || "Policy expiry test date updated successfully.",
      );
    } catch (err) {
      console.error("Failed to set policy expiry test date:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to set policy expiry test date.",
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // RESET TO REAL DATE
  // Uses the SAME POST API with testDate: null
  // --------------------------------------------------
  const handleResetTestDate = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(`${API_URL}/test-date`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testDate: null,
        }),
      });

      const data: SetTestDateResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to reset policy expiry test date.",
        );
      }

      setTestDate("");
      setCurrentTestDate(null);
      setUsingRealDate(true);

      setSuccess(data.message || "Policy expiry test date reset successfully.");
    } catch (err) {
      console.error("Failed to reset policy expiry test date:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to reset policy expiry test date.",
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // STYLES
  // --------------------------------------------------

  const pageStyle: React.CSSProperties = {
    padding: "24px",
    maxWidth: "900px",
    margin: "0 auto",
  };

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: "24px",
    fontWeight: 600,
    color: "#111827",
  };

  const descriptionStyle: React.CSSProperties = {
    marginTop: "8px",
    marginBottom: "24px",
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: 1.6,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#374151",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "350px",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  const primaryButtonStyle: React.CSSProperties = {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 500,
    cursor: saving || loading ? "not-allowed" : "pointer",
    opacity: saving || loading ? 0.6 : 1,
  };

  const secondaryButtonStyle: React.CSSProperties = {
    padding: "10px 18px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    background: "#fff",
    color: "#374151",
    fontSize: "14px",
    fontWeight: 500,
    cursor: saving || loading ? "not-allowed" : "pointer",
    opacity: saving || loading ? 0.6 : 1,
  };

  const statusCardStyle: React.CSSProperties = {
    marginTop: "24px",
    padding: "16px",
    borderRadius: "8px",
    background: usingRealDate ? "#f3f4f6" : "#fff7ed",
    border: usingRealDate ? "1px solid #d1d5db" : "1px solid #fed7aa",
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Policy Expiry Testing</h1>

        <p style={descriptionStyle}>
          Set a test date to simulate a different current date when the policy
          expiry notification cron runs. This allows you to test before,
          on-expiry, after-expiry, last-N-days, and recurring notifications
          without changing the actual policy expiry dates.
        </p>

        {/* ERROR */}
        {error && (
          <div
            style={{
              marginBottom: "16px",
              padding: "12px 14px",
              borderRadius: "8px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#b91c1c",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div
            style={{
              marginBottom: "16px",
              padding: "12px 14px",
              borderRadius: "8px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#15803d",
              fontSize: "14px",
            }}
          >
            {success}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div
            style={{
              padding: "24px 0",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Loading test date...
          </div>
        ) : (
          <>
            {/* TEST DATE */}
            <div>
              <label htmlFor="policy-expiry-test-date" style={labelStyle}>
                Test Date
              </label>

              <input
                id="policy-expiry-test-date"
                type="date"
                value={testDate}
                onChange={(e) => {
                  setTestDate(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                style={inputStyle}
                disabled={saving}
              />

              <p
                style={{
                  marginTop: "8px",
                  color: "#6b7280",
                  fontSize: "13px",
                }}
              >
                Example: Select <strong>2026-02-01</strong> to make the policy
                expiry service behave as if today is February 1, 2026.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={handleSetTestDate}
                disabled={saving || !testDate}
                style={primaryButtonStyle}
              >
                {saving ? "Saving..." : "Set Test Date"}
              </button>

              <button
                type="button"
                onClick={handleResetTestDate}
                disabled={saving || usingRealDate}
                style={secondaryButtonStyle}
              >
                Reset to Real Date
              </button>
            </div>

            {/* CURRENT STATUS */}
            <div style={statusCardStyle}>
              {usingRealDate ? (
                <>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    🟢 Real Date Mode
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: "13px",
                      color: "#6b7280",
                    }}
                  >
                    The policy expiry service is using the actual server date.
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#c2410c",
                    }}
                  >
                    🧪 Test Date Mode
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: "13px",
                      color: "#7c2d12",
                    }}
                  >
                    Policy expiry notifications will be processed as if today
                    is:
                  </div>

                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#9a3412",
                    }}
                  >
                    {currentTestDate}
                  </div>
                </>
              )}
            </div>

            {/* WARNING */}
            {!usingRealDate && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  background: "#fffbeb",
                  border: "1px solid #fde68a",
                  color: "#92400e",
                  fontSize: "13px",
                  lineHeight: 1.5,
                }}
              >
                <strong>⚠️ Testing mode is enabled.</strong>
                <br />
                The next policy expiry cron execution will use the configured
                test date instead of the actual current date. Remember to reset
                the test date when you finish testing.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PolicyExpiryTestPage;
