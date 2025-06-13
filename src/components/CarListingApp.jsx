import { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";

export default function CarListingApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="text-black font-poppins">
      {/* Header */}
      <header className="fixed w-full top-0 left-0 z-50 bg-white shadow-md transition-all">
        <nav className="flex items-center justify-between p-5 max-w-6xl mx-auto">
          <a href="#" className="text-xl font-bold text-blue-600">
            Prom<span className="text-black">Autos</span>
          </a>
          <ul
            className={`md:flex md:space-x-6 uppercase font-medium text-sm absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-500 ${menuOpen ? "block" : "hidden md:flex"}`}
          >
            <li><a href="#" className="block py-2 px-4 hover:text-blue-600">Home</a></li>
            <li><a href="#" className="block py-2 px-4 hover:text-blue-600">Cars</a></li>
            <li><a href="#" className="block py-2 px-4 hover:text-blue-600">About</a></li>
            <li><a href="#" className="block py-2 px-4 hover:text-blue-600">Blog</a></li>
            <li><a href="#" className="block py-2 px-4 hover:text-blue-600">Contact</a></li>
          </ul>
          <div className="flex space-x-4 items-center">
            <FaSearch className="text-lg cursor-pointer" onClick={() => setSearchOpen(!searchOpen)} />
            <FaBars className="text-lg cursor-pointer md:hidden" onClick={() => setMenuOpen(!menuOpen)} />
          </div>
        </nav>
        {searchOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-3 flex justify-center">
            <input type="text" placeholder="Search..." className="w-11/12 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white px-10 bg-cover bg-center" style={{ backgroundImage: "url('/img/Background-home.png')" }}>
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl font-bold leading-tight">Find Your <span className="text-blue-600">Dream Car</span></h1>
          <p className="mt-4 text-lg">Discover top deals on the latest models and best-selling cars.</p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">Explore Now</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="mb-3 md:mb-0">&copy; 2025 CarZone. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-300">Privacy Policy</a>
            <a href="#" className="hover:text-blue-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
