import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = ({ setCurrentPage }) => {
  const handleLinkClick = (pageId, e) => {
    e.preventDefault();
    if (setCurrentPage) {
      setCurrentPage(pageId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0B0C10] border-t border-gray-800 text-gray-400 text-sm">
      {/* Top Banner section */}
      <div className="bg-[#BF1E2E] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight">Looking for a high-performance vehicle?</h3>
            <p className="text-sm text-red-100 mt-1">Get in touch with our team for exclusive offers and custom build options.</p>
          </div>
          <div className="flex gap-3">
            <a 
              href="https://wa.me/233545526710" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-white text-black hover:bg-black hover:text-white px-5 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-all"
            >
              <FaWhatsapp className="text-green-600 text-lg" /> WhatsApp Sales
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleLinkClick("contact", e)} 
              className="flex items-center bg-black hover:bg-gray-900 text-white border border-gray-800 px-5 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer columns */}
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="bg-white py-1.5 px-3.5 rounded-lg flex items-center justify-center h-10 shadow-sm w-fit">
            <img src="/promlogo.jpg" alt="PROM AUTOS" className="h-full w-auto object-contain" />
          </div>
          <p className="text-gray-500 leading-relaxed text-xs">
            PROM AUTOS is the premier high-performance luxury automotive dealership. We specialize in track-ready supercars, custom tuning components, premium car rental services, and bespoke customer service.
          </p>
          {/* Social icons */}
          <div className="flex space-x-3 pt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-950 border border-gray-800 flex items-center justify-center hover:bg-[#BF1E2E] hover:text-white transition-all text-gray-400">
              <FaFacebookF size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-950 border border-gray-800 flex items-center justify-center hover:bg-[#BF1E2E] hover:text-white transition-all text-gray-400">
              <FaTwitter size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-950 border border-gray-800 flex items-center justify-center hover:bg-[#BF1E2E] hover:text-white transition-all text-gray-400">
              <FaYoutube size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-950 border border-gray-800 flex items-center justify-center hover:bg-[#BF1E2E] hover:text-white transition-all text-gray-400">
              <FaInstagram size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-white font-extrabold uppercase text-xs tracking-wider mb-4 border-l-2 border-[#BF1E2E] pl-3">
            Inventory & Shop
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href="#" onClick={(e) => handleLinkClick("new-cars", e)} className="hover:text-white transition-colors">New Arrivals</a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleLinkClick("used-cars", e)} className="hover:text-white transition-colors">Pre-Owned Supercars</a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleLinkClick("parts", e)} className="hover:text-white transition-colors">Parts Vault Catalog</a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleLinkClick("home", e)} className="hover:text-white transition-colors">Featured Gallery</a>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div>
          <h4 className="text-white font-extrabold uppercase text-xs tracking-wider mb-4 border-l-2 border-[#BF1E2E] pl-3">
            Dealership Address
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <FaMapMarkerAlt className="text-[#BF1E2E] mt-0.5 shrink-0" />
              <span className="text-gray-500 leading-relaxed">
                Achimota Mile 7<br />
                Accra, Ghana
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <FaPhoneAlt className="text-[#BF1E2E] shrink-0" />
              <span className="text-gray-500">+233 576 021 655</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FaEnvelope className="text-[#BF1E2E] shrink-0" />
              <span className="text-gray-500">promautosltd@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter subscribe */}
        <div>
          <h4 className="text-white font-extrabold uppercase text-xs tracking-wider mb-4 border-l-2 border-[#BF1E2E] pl-3">
            Join the Club
          </h4>
          <p className="text-gray-500 text-xs mb-3 leading-relaxed">
            Subscribe to receive alerts on new supercar allocations and special parts releases.
          </p>
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-[#171923] border border-gray-800 text-white rounded-l px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E] w-full"
            />
            <button className="bg-[#BF1E2E] hover:bg-red-800 text-white px-3 rounded-r text-xs font-bold transition-all">
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-[#08090C] border-t border-gray-900 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} PROM AUTOS. All Rights Reserved. All vehicle specs are mock values.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" onClick={(e) => handleLinkClick("admin", e)} className="hover:text-[#BF1E2E] font-semibold transition-colors">Admin Dashboard</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;