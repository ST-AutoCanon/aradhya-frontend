// src/pages/CookiePolicy.tsx
import React from "react";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white p-8">
          <h1 className="text-4xl font-extrabold text-center md:text-left">
            Cookie Policy
          </h1>
          <p className="mt-2 text-white/90 text-center md:text-left">
            Learn how we use cookies to enhance your experience.
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              What Are Cookies?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small files stored on your device that help us provide
              a better browsing experience. They allow us to remember your
              preferences, improve functionality, and analyze website usage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Types of Cookies We Use
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-1">
                  Necessary Cookies
                </h3>
                <p className="text-gray-700 text-sm">
                  Essential for website functionality. Cannot be disabled.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl shadow-sm border border-purple-100">
                <h3 className="font-semibold text-purple-800 mb-1">
                  Analytics Cookies
                </h3>
                <p className="text-gray-700 text-sm">
                  Help us understand user behavior and improve the website.
                </p>
              </div>
              <div className="p-4 bg-pink-50 rounded-xl shadow-sm border border-pink-100">
                <h3 className="font-semibold text-pink-800 mb-1">
                  Marketing Cookies
                </h3>
                <p className="text-gray-700 text-sm">
                  Used for personalized ads and tracking campaigns.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your Choices
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You can accept, reject, or customize cookies using the banner.
              Necessary cookies are always active. You can also manage
              preferences through your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this policy periodically. Updates will be reflected
              on this page with the new date.
            </p>
          </section>

          <p className="text-gray-500 text-sm text-center mt-6">
            Last updated: October 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
