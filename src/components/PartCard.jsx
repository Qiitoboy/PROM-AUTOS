import React from "react";
import { FaTag, FaCheckCircle, FaTimesCircle, FaTools } from "react-icons/fa";

const PartCard = ({ part, onViewDetails }) => {
  const { name, category, price, compatibility, inStock, stockCount, image } = part;

  const formatPrice = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="group bg-[#171923] border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-gray-700 transition-all duration-300 flex flex-col h-full">
      {/* Image container */}
      <div className="relative aspect-square w-full p-4 bg-gray-950 flex items-center justify-center overflow-hidden">
        {/* Category Badge */}
        <span className="absolute top-3.5 left-3.5 z-10 bg-gray-800 text-gray-300 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded border border-gray-700">
          {category}
        </span>

        {/* Stock Badge */}
        <span className={`absolute top-3.5 right-3.5 z-10 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 shadow-md ${
          inStock 
            ? "bg-green-950/80 text-green-400 border border-green-900/40" 
            : "bg-red-950/80 text-red-400 border border-red-900/40"
        }`}>
          {inStock ? (
            <>
              <FaCheckCircle className="text-[8px]" /> In Stock ({stockCount})
            </>
          ) : (
            <>
              <FaTimesCircle className="text-[8px]" /> Out of Stock
            </>
          )}
        </span>

        {/* Part Image */}
        <img 
          src={image} 
          alt={name} 
          className="max-h-48 max-w-full object-contain transform group-hover:scale-105 transition-all duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=400&q=80"; // fallback
          }}
        />
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title & Price */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <h3 className="font-extrabold text-sm text-white group-hover:text-[#BF1E2E] transition-colors line-clamp-2 min-h-10">
            {name}
          </h3>
          <span className="text-sm font-black text-[#BF1E2E] bg-red-950/20 border border-red-900/30 px-2 py-0.5 rounded shrink-0">
            {formatPrice(price)}
          </span>
        </div>

        {/* Compatibility banner */}
        <div className="flex items-center gap-2 bg-[#0F111A] border border-gray-800/80 rounded-lg p-3 mb-5 text-xs text-gray-400 flex-grow">
          <FaTools className="text-[#BF1E2E] text-sm shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-gray-500 block uppercase tracking-wider">COMPATIBILITY</span>
            <span className="font-medium text-gray-300 line-clamp-1">{compatibility}</span>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={() => onViewDetails(part)}
          className="w-full bg-[#1F2232] hover:bg-[#BF1E2E] text-white border border-gray-800 hover:border-transparent font-extrabold text-xs uppercase tracking-wider py-3 rounded-lg transition-all duration-200 cursor-pointer shadow-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PartCard;
