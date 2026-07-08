import React from "react";
import { FaCalendarAlt, FaCog, FaGasPump, FaTachometerAlt } from "react-icons/fa";

const VehicleCard = ({ vehicle, onViewDetails }) => {
  const { name, price, year, condition, transmission, fuel, speed, image } = vehicle;

  // Format currency
  const formatPrice = (num) => {
    return "₵" + new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="group bg-[#171923] border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-gray-700 transition-all duration-300 flex flex-col h-full">
      {/* Image container */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-950">
        {/* Condition Badge */}
        <span className={`absolute top-3.5 left-3.5 z-10 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md ${
          condition === "NEW" 
            ? "bg-[#BF1E2E] text-white" 
            : "bg-gray-800 text-gray-200"
        }`}>
          {condition}
        </span>
        
        {/* Vehicle Image */}
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"; // fallback
          }}
        />
        
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title & Price */}
        <div className="flex justify-between items-start gap-2 mb-4">
          <h3 className="font-extrabold text-base text-white group-hover:text-[#BF1E2E] transition-colors line-clamp-1">
            {name}
          </h3>
          <span className="text-sm font-black text-[#BF1E2E] bg-red-950/20 border border-red-900/30 px-2 py-0.5 rounded shrink-0">
            {formatPrice(price)}
          </span>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs text-gray-400 mb-6 flex-grow">
          <div className="flex items-center gap-2 bg-[#0F111A] p-2.5 rounded-lg border border-gray-800/80">
            <FaCalendarAlt className="text-[#BF1E2E]" />
            <span>{year} Model</span>
          </div>
          <div className="flex items-center gap-2 bg-[#0F111A] p-2.5 rounded-lg border border-gray-800/80">
            <FaCog className="text-[#BF1E2E]" />
            <span className="truncate">{transmission}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#0F111A] p-2.5 rounded-lg border border-gray-800/80">
            <FaGasPump className="text-[#BF1E2E]" />
            <span className="truncate">{fuel}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#0F111A] p-2.5 rounded-lg border border-gray-800/80">
            <FaTachometerAlt className="text-[#BF1E2E]" />
            <span className="truncate">{speed}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewDetails(vehicle)}
          className="w-full bg-transparent hover:bg-[#BF1E2E] text-white border border-[#BF1E2E] hover:border-transparent font-extrabold text-xs uppercase tracking-wider py-3 rounded-lg transition-all duration-200 cursor-pointer shadow-sm group-hover:shadow-md"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
