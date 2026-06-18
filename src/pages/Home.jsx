import React from "react";
import VehicleCard from "../components/VehicleCard";
import PartCard from "../components/PartCard";
import { dealerStats } from "../data/mockData";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";

const Home = ({ vehicles, parts, setCurrentPage, onViewDetails }) => {
  // Select featured items or first 4
  const featuredVehicles = vehicles.filter(v => v.featured).slice(0, 4);
  if (featuredVehicles.length === 0) {
    featuredVehicles.push(...vehicles.slice(0, 4));
  }

  const featuredParts = parts.filter(p => p.featured).slice(0, 4);
  if (featuredParts.length === 0) {
    featuredParts.push(...parts.slice(0, 4));
  }

  return (
    <div className="text-white">
      {/* 1. Hero Section */}
      <section 
        className="relative h-[85vh] min-h-[500px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/img/Background-home.png')" }}
      >
        {/* Dark overlay mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.08)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(18,18,18,0.08)_1.5px,transparent_1.5px)] [background-size:30px_30px]" />

        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-8 z-10">
          <div className="max-w-2xl">
            <span className="text-[#BF1E2E] font-black text-xs uppercase tracking-widest bg-red-950/40 border border-red-900/40 px-3.5 py-1.5 rounded-full inline-block mb-4">
              Pure Velocity & Precision
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none mb-6">
              REDEFINE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF1E2E] to-red-500">
                DRIVING EXPERIENCE
              </span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base mb-8 leading-relaxed font-medium">
              Welcome to PROM AUTOS. Discover our curated catalog of elite hypercars, track-focused supercars, and high-grade carbon performance parts. Engineered for those who refuse to settle.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setCurrentPage("new-cars")}
                className="bg-[#BF1E2E] hover:bg-red-800 text-white font-extrabold text-xs uppercase tracking-wider px-7 py-4 rounded-lg shadow-lg hover:shadow-red-900/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Browse Inventory
              </button>
              <button 
                onClick={() => setCurrentPage("parts")}
                className="bg-transparent hover:bg-white/5 text-white border border-gray-700 hover:border-gray-500 font-extrabold text-xs uppercase tracking-wider px-7 py-4 rounded-lg transition-all cursor-pointer"
              >
                Explore Parts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Achievements Statistics Bar */}
      <section className="bg-[#BF1E2E] py-8 px-6 text-white relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {dealerStats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black tracking-tight">{stat.value}</div>
              <div className="text-[10px] sm:text-xs font-black tracking-wider text-red-200 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Vehicles Section */}
      <section className="py-20 px-6 md:px-8 bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[#BF1E2E] font-extrabold text-xs uppercase tracking-wider">
                Exquisite Selection
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
                Featured Showroom
              </h2>
            </div>
            <button 
              onClick={() => setCurrentPage("new-cars")}
              className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-[#BF1E2E] hover:text-white transition-colors cursor-pointer"
            >
              View Full Inventory <FaArrowRight />
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVehicles.map(vehicle => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                onViewDetails={onViewDetails} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Parts Vault Preview Section */}
      <section className="py-20 px-6 md:px-8 bg-[#0F111A] border-t border-b border-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[#BF1E2E] font-extrabold text-xs uppercase tracking-wider">
                Precision Parts
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
                Featured Components
              </h2>
            </div>
            <button 
              onClick={() => setCurrentPage("parts")}
              className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-[#BF1E2E] hover:text-white transition-colors cursor-pointer"
            >
              Browse Parts Vault <FaArrowRight />
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredParts.map(part => (
              <PartCard 
                key={part.id} 
                part={part} 
                onViewDetails={onViewDetails} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Call To Action (CTA) Section */}
      <section className="py-16 px-6 md:px-8 bg-[#0B0C10]">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-[#171923] to-[#1F2232] border border-gray-800 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          {/* Red decorative glow */}
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#BF1E2E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 z-10">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3">
                Find Your Perfect Ride
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connect with our team to inquire about custom configurations, leasing rates, or scheduling a visit to our private showroom. Let us bring your dream machine to life.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 w-full lg:w-auto shrink-0">
              <button
                onClick={() => setCurrentPage("contact")}
                className="w-full sm:w-auto bg-[#BF1E2E] hover:bg-red-800 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all cursor-pointer text-center"
              >
                Inquire Now
              </button>
              <a
                href="https://wa.me/15550199900"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-gray-800 text-white border border-gray-700 hover:border-gray-500 font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all"
              >
                <FaWhatsapp className="text-green-500 text-base" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;