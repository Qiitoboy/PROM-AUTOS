import React, { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";

const HeroSection = ({ scrollToSection, homeRef, aboutRef, carsRef, blogRef }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <section
      ref={homeRef}
      className="relative w-full min-h-[640px] flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/img/Background-home.png')" }}
    >
      {/* Header */}
<header className="absolute top-0 left-0 w-full z-50 bg-white shadow-md transition-all">   
       <nav className="flex items-center justify-between p-5 max-w-6xl mx-auto">
          {/* Logo */}
        <a className="flex items-center">
  <img src="/promlogo.jpeg" alt="Prom Autos Logo" className="h-10 w-auto" />
</a>

          {/* Navigation Links */}
          <ul
            className={`md:flex md:space-x-6 uppercase font-medium text-sm absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-500 ${
              menuOpen ? "block" : "hidden md:flex"
            }`}
          >
            <li>
              <button
            className="block py-2 px-4 text-black hover:text-[#BF1E2E] font-bold"
                onClick={() => scrollToSection(homeRef)}
              >
                Home
              </button>
            </li>
            <li>
              <button
            className="block py-2 px-4 text-black hover:text-[#BF1E2E] font-bold"                onClick={() => scrollToSection(carsRef)}
              >
                Cars
              </button>
            </li>
            <li>
              <button
               className="block py-2 px-4 text-black hover:text-[#BF1E2E] font-bold"
                onClick={() => scrollToSection(aboutRef)}
              >
                About
              </button>
            </li>
            <li>
              <button
                className="block py-2 px-4 text-black hover:text-[#BF1E2E] font-bold"
                onClick={() => scrollToSection(blogRef)}
              >
                Blog
              </button>
            </li>
          </ul>

          {/* Icons */}
          <div className="flex space-x-4 items-center">
            <FaSearch
              className="text-lg text-black cursor-pointer hover:text-[#BF1E2E]"
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <FaBars
             className="text-lg text-black cursor-pointer md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
        </nav>

        {/* Search Bar */}
        {searchOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-3 flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-11/12 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#BF1E2E]"
            />
          </div>
        )}
      </header>

      {/* Hero Section Content */}
      <div className="p-16 mt-16">
        <h1 className="text-4xl text-white font-bold">
          Welcome to <span className="text-[#BF1E2E]">Our Cars</span>
        </h1>
        <p className="text-white mt-4">Find your dream car with us.</p>

        <button
          className="mt-4 px-6 py-2 bg-[#BF1E2E] text-white rounded hover:bg-red-900"
          onClick={() => scrollToSection(carsRef)}
        >
          Explore Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
