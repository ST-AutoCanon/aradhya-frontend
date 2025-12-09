// // src/context/BannerContext.tsx
// import React, { createContext, useState, useContext, ReactNode } from 'react';

// interface BannerContextType {
//   bannerText: string;
//   setBannerText: (text: string) => void;
// }

// const BannerContext = createContext<BannerContextType | undefined>(undefined);

// const DEFAULT_BANNER =
//   '🚗 Buy car insurance & save up to ₹5000! • 🛡️ Compare term insurance plans in 2 minutes • ❤️ Get free quotes on family health insurance • 💡 Secure your future with life insurance today!';

// export const BannerProvider = ({ children }: { children: ReactNode }) => {
//   const [bannerText, setBannerTextState] = useState<string>(() => {
//     return localStorage.getItem('bannerText') || DEFAULT_BANNER;
//   });

//   const setBannerText = (text: string) => {
//     setBannerTextState(text);
//     localStorage.setItem('bannerText', text);
//   };

//   return (
//     <BannerContext.Provider value={{ bannerText, setBannerText }}>
//       {children}
//     </BannerContext.Provider>
//   );
// };

// export const useBanner = (): BannerContextType => {
//   const context = useContext(BannerContext);
//   if (!context) throw new Error('useBanner must be used within BannerProvider');
//   return context;
// };

// // src/context/BannerContext.tsx
// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   ReactNode,
// } from "react";
// import axios from "axios";

// interface BannerContextType {
//   bannerMessages: string[];
// }

// const BannerContext = createContext<BannerContextType | undefined>(undefined);

// export const BannerProvider = ({ children }: { children: ReactNode }) => {
//   const [bannerMessages, setBannerMessages] = useState<string[]>([]);
//   const backendUrl =
//     import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
//   useEffect(() => {
//     // const fetchBanners = async () => {
//     //   try {
//     //     const res = await axios.get("http://localhost:5000/api/banner");
//     //     if (res.data?.messages) setBannerMessages(res.data.messages);
//     //   } catch (err) {
//     //     console.error("Failed to fetch banners:", err);
//     //   }
//     // };
//     const fetchBanners = async () => {
//       try {
//         const res = await axios.get(`${backendUrl}/api/banner`);
//         setBannerMessages(res.data?.messages || []); // always set an array
//       } catch (err) {
//         console.error("Failed to fetch banners:", err);
//         setBannerMessages([]); // fallback to empty array
//       }
//     };

//     fetchBanners();
//   }, []);

//   return (
//     <BannerContext.Provider value={{ bannerMessages }}>
//       {children}
//     </BannerContext.Provider>
//   );
// };

// export const useBanner = (): BannerContextType => {
//   const context = useContext(BannerContext);
//   if (!context) throw new Error("useBanner must be used within BannerProvider");
//   return context;
// };

//29-10-2025
// src/context/BannerContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface BannerContextType {
  bannerMessages: string[];
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [bannerMessages, setBannerMessages] = useState<string[]>([]);
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/banner`);
        setBannerMessages(res.data?.messages || []);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
        setBannerMessages([]); // fallback to empty array
      }
    };

    // ✅ Initial fetch
    fetchBanners();

    const interval = setInterval(fetchBanners, 10000); // every 10 seconds

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [backendUrl]);

  return (
    <BannerContext.Provider value={{ bannerMessages }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = (): BannerContextType => {
  const context = useContext(BannerContext);
  if (!context) throw new Error("useBanner must be used within BannerProvider");
  return context;
};
