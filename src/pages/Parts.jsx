import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import PartCard from "../components/PartCard";
import { FaSearch } from "react-icons/fa";

const Parts = ({ parts, onViewDetails, searchFilter = "" }) => {
  const [category, setCategory] = useState("ALL");
  const [query, setQuery] = useState("");

  const categories = ["ALL", "ENGINE", "BRAKES", "SUSPENSION", "EXHAUST", "WHEELS", "INTERIOR"];

  // Filter based on both category, local search, and global Navbar search
  const filtered = parts.filter(part => {
    // Category check
    const matchesCategory = category === "ALL" || part.category.toUpperCase() === category;
    
    // Search query check (Local or global navbar query)
    const activeSearch = query || searchFilter;
    const matchesSearch = !activeSearch || 
      part.name.toLowerCase().includes(activeSearch.toLowerCase()) || 
      part.compatibility.toLowerCase().includes(activeSearch.toLowerCase()) ||
      part.category.toLowerCase().includes(activeSearch.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0B0C10] min-h-screen pb-16">
      {/* Page Header */}
      <PageHeader title="Parts Vault" breadcrumbs={["Parts Catalog"]} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-10">
        {/* Search and Category filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 pb-4 border-b border-gray-900">
          {/* Categories list */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-[9px] font-black uppercase tracking-wider px-4 py-2.5 rounded-lg shrink-0 border transition-all cursor-pointer ${
                  category === cat
                    ? "bg-[#BF1E2E] text-white border-transparent"
                    : "bg-[#171923] text-gray-400 border-gray-800 hover:text-white hover:border-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Local Search input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              <FaSearch className="text-xs" />
            </span>
            <input
              type="text"
              placeholder="Search components..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#171923] border border-gray-800 text-white rounded-lg pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#BF1E2E]"
            />
          </div>
        </div>

        {/* Catalog grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((part) => (
              <PartCard
                key={part.id}
                part={part}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#171923] border border-gray-800 rounded-xl p-16 text-center">
            <p className="text-gray-400 text-sm">No performance parts found matching your criteria.</p>
          </div>
        )}

        {/* Custom source section */}
        <div className="mt-16 bg-[#171923] border border-gray-800 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wide">Looking for Custom Components?</h4>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xl">
              We maintain direct supplier relations with Brembo, Akrapovič, Recaro, Bilstein, and more. Send us your vehicle chassis number and request, and our techs will source it.
            </p>
          </div>
          <a
            href="https://wa.me/15550199900"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#BF1E2E] hover:bg-red-800 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-all text-center shrink-0 cursor-pointer py-3"
          >
            Custom Parts Request
          </a>
        </div>
      </div>
    </div>
  );
};

export default Parts;
