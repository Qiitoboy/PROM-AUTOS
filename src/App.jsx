import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NewCars from "./pages/NewCars";
import UsedCars from "./pages/UsedCars";
import Parts from "./pages/Parts";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

import { initialVehicles, initialParts, initialLeads } from "./data/mockData";
import { FaTimes, FaWhatsapp, FaEnvelope, FaCalendarAlt, FaCog, FaGasPump, FaTachometerAlt, FaTools, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const App = () => {
  // Navigation Routing State
  const [currentPage, setCurrentPage] = useState("home");
  
  // Centralized State Database
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [parts, setParts] = useState(initialParts);
  const [leads, setLeads] = useState(initialLeads);

  // Search filter query
  const [searchFilter, setSearchFilter] = useState("");

  // Details Modal state
  const [selectedItem, setSelectedItem] = useState(null);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Handle lead submission from contact page
  const handleAddLead = (newLead) => {
    const leadWithId = {
      ...newLead,
      id: "lead_" + Date.now()
    };
    setLeads([leadWithId, ...leads]);
  };

  // Open Details Modal helper
  const handleOpenDetails = (item) => {
    setSelectedItem(item);
  };

  // Close Details Modal helper
  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  // Redirect to contact page with item selected
  const handleInquireItem = (itemName) => {
    setSelectedItem(null);
    setCurrentPage("contact");
    
    // Allow contact page to pre-select by updating interest dropdown
    // This is handled by passing down state or using a minor delay
    setTimeout(() => {
      const selectElem = document.querySelector("select");
      if (selectElem) {
        // Find matching option and set value
        const option = Array.from(selectElem.options).find(opt => opt.value === itemName);
        if (option) {
          selectElem.value = itemName;
          // Dispatch change event to trigger form state update
          selectElem.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    }, 100);
  };

  // Universal search handler
  const handleSearch = (query) => {
    setSearchFilter(query);
    // If not already on an inventory page, route to parts catalog by default
    if (currentPage !== "parts" && currentPage !== "new-cars" && currentPage !== "used-cars") {
      setCurrentPage("parts");
    }
  };

  // Helper for formatting prices
  const formatPrice = (num) => {
    return "₵" + new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] flex flex-col font-sans select-none antialiased">
      {/* 1. Header Navigation */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onSearch={handleSearch} 
      />

      {/* 2. Main Page Render */}
      <main className="flex-grow">
        {currentPage === "home" && (
          <Home 
            vehicles={vehicles} 
            parts={parts} 
            setCurrentPage={setCurrentPage} 
            onViewDetails={handleOpenDetails} 
          />
        )}
        {currentPage === "new-cars" && (
          <NewCars 
            vehicles={vehicles} 
            onViewDetails={handleOpenDetails} 
          />
        )}
        {currentPage === "used-cars" && (
          <UsedCars 
            vehicles={vehicles} 
            onViewDetails={handleOpenDetails} 
          />
        )}
        {currentPage === "parts" && (
          <Parts 
            parts={parts} 
            onViewDetails={handleOpenDetails} 
            searchFilter={searchFilter}
          />
        )}
        {currentPage === "contact" && (
          <Contact 
            onSubmitLead={handleAddLead} 
            vehicles={vehicles} 
            parts={parts} 
          />
        )}
        {currentPage === "admin" && (
          <Admin 
            vehicles={vehicles} 
            setVehicles={setVehicles} 
            parts={parts} 
            setParts={setParts} 
            leads={leads} 
            setLeads={setLeads} 
          />
        )}
      </main>

      {/* 3. Footer Bar */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* 4. Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          {/* Modal Container */}
          <div className="bg-[#171923] border border-gray-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            {/* Close Button */}
            <button 
              onClick={handleCloseDetails}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-gray-950/60 p-2.5 rounded-full border border-gray-800/40 hover:border-gray-700 transition-all cursor-pointer"
            >
              <FaTimes />
            </button>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image */}
              <div className="relative bg-gray-950 aspect-video md:aspect-auto md:h-full flex items-center justify-center p-4">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name} 
                  className="max-h-64 md:max-h-96 object-contain"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Product Specifications & Details */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  {/* Category / Condition Badge */}
                  <div className="flex gap-2 mb-3">
                    {selectedItem.condition && (
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                        selectedItem.condition === "NEW" ? "bg-[#BF1E2E] text-white" : "bg-gray-800 text-gray-200"
                      }`}>
                        {selectedItem.condition} Showroom
                      </span>
                    )}
                    {selectedItem.category && (
                      <span className="bg-gray-800 text-gray-300 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        {selectedItem.category} Vault
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <h3 className="text-xl font-black uppercase text-white leading-tight mb-2">
                    {selectedItem.name}
                  </h3>
                  <div className="text-lg font-black text-[#BF1E2E] mb-4">
                    {formatPrice(selectedItem.price)}
                  </div>

                  {/* Details block */}
                  <div className="border-t border-b border-gray-800/80 py-4 mb-4">
                    {selectedItem.condition ? (
                      // Vehicle Specs
                      <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
                        <div className="flex items-center gap-2"><FaCalendarAlt className="text-[#BF1E2E]" /> <span>{selectedItem.year} Model</span></div>
                        <div className="flex items-center gap-2"><FaCog className="text-[#BF1E2E]" /> <span className="truncate">{selectedItem.transmission}</span></div>
                        <div className="flex items-center gap-2"><FaGasPump className="text-[#BF1E2E]" /> <span>{selectedItem.fuel}</span></div>
                        <div className="flex items-center gap-2"><FaTachometerAlt className="text-[#BF1E2E]" /> <span className="truncate">{selectedItem.speed}</span></div>
                      </div>
                    ) : (
                      // Part Specs
                      <div className="space-y-2 text-xs text-gray-400">
                        <div className="flex items-center gap-2"><FaTools className="text-[#BF1E2E]" /> <span>Comp: {selectedItem.compatibility}</span></div>
                        <div className="flex items-center gap-2">
                          {selectedItem.inStock ? (
                            <>
                              <FaCheckCircle className="text-green-500" />
                              <span>In Stock ({selectedItem.stockCount} Units available)</span>
                            </>
                          ) : (
                            <>
                              <FaTimesCircle className="text-red-500" />
                              <span>Out of Stock (Available on order)</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-xs leading-relaxed mb-6 font-medium">
                    {selectedItem.description || "High-performance item crafted from premium materials. Built to undergo rigorous testing under extreme performance parameters."}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleInquireItem(selectedItem.name)}
                    className="flex-grow bg-[#BF1E2E] hover:bg-red-800 text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-lg transition-all cursor-pointer text-center"
                  >
                    Inquire Item
                  </button>
                  <a
                    href={`https://wa.me/233545526710?text=Hello,%20I'm%20interested%2520in%2520the%2520${encodeURIComponent(selectedItem.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent hover:bg-white/5 text-white border border-gray-700 hover:border-gray-500 p-3 rounded-lg transition-all flex items-center justify-center shrink-0"
                  >
                    <FaWhatsapp className="text-green-500 text-lg" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
