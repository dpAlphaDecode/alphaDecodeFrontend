"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  Box,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";

const dropdownSections = {
  dashboard: [
    { key: "overview", label: "Overview" },
    { key: "analytics", label: "Analytics" },
    { key: "activity", label: "Activity" },
  ],
  portfolio: [
    { key: "holdings", label: "Holdings" },
    { key: "performance", label: "Performance" },
    { key: "watchlist", label: "Watchlist" },
  ],
  settings: [
    { key: "trending-indicator", label: "Trending Indicator" },
    { key: "trending-sectors", label: "Trending Sectors" },
    { key: "index-data-feed", label: "$ Index Data Feed" },
  ],
};

const sections = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} className="mr-3 text-black" />,
    hasDropdown: true,
  },
  {
    key: "portfolio",
    label: "Portfolio",
    icon: <Box size={20} className="mr-3 text-black" />,
    hasDropdown: true,
  },
  {
    key: "screener",
    label: "Screener",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        className="mr-3 text-blue-600"
      >
        <path
          fill="currentColor"
          d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
        />
      </svg>
    ),
    active: true,
    hasDropdown: false,
  },
  {
    key: "settings",
    label: "Settings",
    icon: <Settings size={20} className="mr-3 text-black" />,
    hasDropdown: true,
  },
];

const ProfileSidebar = ({ isOpen, onClose, user, onLogout }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (key) => {
    setOpenSection(openSection === key ? null : key);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } flex flex-col`}
    >
      {/* Profile Header */}
      <div className="p-6 flex text-black items-center space-x-4 border-b">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src={user?.avatar || "/avatar.jpg"}
            alt="Profile"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/48";
              e.target.onerror = null;
            }}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base">{user?.name || "User"}</h3>
          <p className="text-sm text-black">
            {user?.email || "user@example.com"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-2 px-3">
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.key}>
                {section.hasDropdown ? (
                  <>
                    <button
                      onClick={() => toggleSection(section.key)}
                      className="w-full flex items-center text-black justify-between py-3 px-3 rounded-md hover:bg-black-100"
                    >
                      <div className="flex items-center">
                        {section.icon}
                        <span className="font-medium">{section.label}</span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-black transform transition-transform duration-300 ${
                          openSection === section.key ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openSection === section.key && (
                      <ul
                        className="pl-9 mt-1 space-y-2 text-black overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                          maxHeight:
                            openSection === section.key ? "500px" : "0px",
                        }}
                      >
                        {dropdownSections[section.key].map((item) => (
                          <li key={item.key}>
                            <a
                              href="#"
                              className="block py-2 text-gray-600 hover:text-gray-900"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <a
                    href="#"
                    className={`flex items-center justify-between py-3 px-3 rounded-md ${
                      section.active ? "bg-blue-50" : "hover:bg-black-100"
                    }`}
                  >
                    <div className="flex items-center">
                      {section.icon}
                      <span
                        className={`font-medium ${
                          section.active ? "text-blue-600" : ""
                        }`}
                      >
                        {section.label}
                      </span>
                    </div>
                  </a>
                )}
              </li>
            ))}

            {/* Logout */}
            <li className="mt-4">
              <button
                onClick={onLogout}
                className="flex items-center py-3 px-3 rounded-md hover:bg-black-100 w-full text-left"
              >
                <LogOut size={20} className="mr-3 text-black" />
                <span className="font-medium text-black">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t p-4">
        <div className="text-center text-xs text-black space-y-1">
          <div>
            <a href="/privacy-policy" className="hover:underline text-black">
              Privacy Policy
            </a>
            <span className="mx-2">•</span>
            <a
              href="/terms-and-conditions"
              className="hover:underline text-black"
            >
              Terms & Conditions
            </a>
          </div>
          <p className="text-black">© 2023 DecodeAlpha</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
