// src/components/CookieConsent.tsx
import { useState, useEffect } from "react";

interface CookieBannerProps {
  onAccept?: () => void; // callback when user accepts
}

const CookieConsent: React.FC<CookieBannerProps> = ({ onAccept }) => {
  const [visible, setVisible] = useState(false);

  // Show banner only if no consent is recorded
  useEffect(() => {
    const consent = localStorage.getItem("cookiesAccepted");
    if (consent === null) setVisible(true); // only show if user hasn't made a choice
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
    onAccept?.(); // call callback if provided
  };

  const handleDecline = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setVisible(false);
  };

  const handleCustomize = () => {
    // Optional: implement customization logic
    localStorage.setItem("cookiesAccepted", "customized");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-xl bg-white/95 border border-gray-200 shadow-lg rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 z-50">
      <p className="text-gray-800 text-sm md:text-base text-center md:text-left flex-1">
        We use cookies to enhance your browsing experience.{" "}
        <a href="/cookie-policy" className="text-blue-600 underline">
          Learn more
        </a>
        .
      </p>

      <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
        <button
          onClick={handleAccept}
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-1 rounded-full font-semibold transition"
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-1 rounded-full font-semibold transition"
        >
          Decline
        </button>
        <button
          onClick={handleCustomize}
          className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full font-semibold transition"
        >
          Customize
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
