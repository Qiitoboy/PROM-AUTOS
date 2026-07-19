import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes, FaPhoneAlt, FaEnvelope, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ currentPage, setCurrentPage, onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "new-cars", label: "New Cars" },
    { id: "used-cars", label: "Used Cars" },
    { id: "parts", label: "Parts Vault" },
    { id: "contact", label: "Contact Us" },
    { id: "admin", label: "Command Center" }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  return (
    <header className="sticky top-0 z-50 theme-bg-navbar border-b theme-border shadow-sm transition-all duration-300" style={{ backdropFilter: "blur(12px)" }}>
      {/* Top micro bar for dealer info */}
      <div className="theme-bg-topbar border-b theme-border py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs theme-text-secondary font-medium">
          <div className="flex space-x-6">
            <span className="flex items-center gap-1.5"><FaPhoneAlt className="text-[#BF1E2E]" /> +233 576 021 655</span>
            <span className="flex items-center gap-1.5"><FaEnvelope className="text-[#BF1E2E]" /> promautosltd@gmail.com</span>
          </div>
          <div>
            <span>Mon - Sat: 8:00 AM - 6:00 PM | Sunday: Closed</span>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 md:px-8">
        {/* Brand Logo */}
        <div
          className="flex items-center cursor-pointer group"
          onClick={() => handleNavClick("home")}
        >
          <div className="bg-white py-1 px-4 rounded-lg flex items-center justify-center h-12 md:h-14 shadow-sm transition-transform group-hover:scale-105">
            <img src="/promlogo.jpg" alt="PROM AUTOS" className="h-full w-40 md:w-48 object-contain" />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className={`text-xs uppercase font-extrabold tracking-wider transition-all duration-200 cursor-pointer relative py-2 ${
                  currentPage === link.id
                    ? "text-[#BF1E2E]"
                    : "theme-text-secondary hover:text-[#BF1E2E]"
                }`}
              >
                {link.label}
                {currentPage === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#BF1E2E] animate-fade-in" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Icons / Call Actions */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="theme-text-secondary hover:text-[#BF1E2E] text-lg p-2 rounded-full hover:bg-gray-200/30 dark:hover:bg-gray-800/50 transition-all cursor-pointer"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <button
            className="theme-text-secondary hover:text-[#BF1E2E] text-lg p-2 rounded-full hover:bg-gray-200/30 transition-all cursor-pointer"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search Toggle"
          >
            {searchOpen ? <FaTimes /> : <FaSearch />}
          </button>

          <button
            onClick={() => handleNavClick("contact")}
            className="hidden sm:inline-block bg-[#BF1E2E] hover:bg-red-800 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-all transform hover:-translate-y-[1px] active:translate-y-0 cursor-pointer"
          >
            Get In Touch
          </button>

          <button
            className="lg:hidden theme-text-secondary hover:text-[#BF1E2E] text-xl p-2 rounded-full hover:bg-gray-200/30 transition-all cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu Toggle"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Slide-out Search Bar */}
      {searchOpen && (
        <div className="theme-bg-topbar border-b theme-border py-4 px-6 animate-slide-down">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-2">
            <input
              type="text"
              placeholder="Search vehicles, parts, specifications..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-grow theme-input border rounded-lg px-4 py-3 focus:outline-none focus:border-[#BF1E2E] focus:ring-1 focus:ring-[#BF1E2E] text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="bg-[#BF1E2E] hover:bg-red-800 text-white px-6 rounded-lg text-sm font-bold transition-all cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full theme-bg-navbar border-b theme-border py-6 px-6 flex flex-col space-y-4 shadow-xl z-40 animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-left text-sm uppercase font-extrabold tracking-wider py-2.5 px-4 rounded-md transition-all ${
                currentPage === link.id
                  ? "bg-[#BF1E2E] text-white"
                  : "theme-text-secondary hover:bg-gray-200/30 hover:text-[#BF1E2E]"
              }`}
            >
              {link.label}
            </button>
          ))}
          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 text-left text-sm uppercase font-extrabold tracking-wider py-2.5 px-4 rounded-md theme-text-secondary hover:bg-gray-200/30 transition-all"
          >
            {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-indigo-500" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <div className="pt-4 border-t theme-border flex flex-col space-y-2 text-xs theme-text-secondary px-4">
            <span className="flex items-center gap-2"><FaPhoneAlt className="text-[#BF1E2E]" /> +233 576 021 655</span>
            <span className="flex items-center gap-2"><FaEnvelope className="text-[#BF1E2E]" /> promautosltd@gmail.com</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
