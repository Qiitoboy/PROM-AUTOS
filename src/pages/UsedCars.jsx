import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import VehicleCard from "../components/VehicleCard";

const UsedCars = ({ vehicles, onViewDetails }) => {
  // Filters state
  const [make, setMake] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  // Filter for USED condition
  const usedVehicles = vehicles.filter(v => v.condition === "USED");

  // Get unique makes
  const uniqueMakes = ["ALL", ...new Set(usedVehicles.map(v => v.make))];

  // Apply filters
  let filtered = usedVehicles;

  if (make !== "ALL") {
    filtered = filtered.filter(v => v.make === make);
  }

  if (maxPrice) {
    filtered = filtered.filter(v => v.price <= parseInt(maxPrice));
  }

  // Sort
  if (sortOrder === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortOrder === "year-desc") {
    filtered = [...filtered].sort((a, b) => b.year - a.year);
  }

  return (
    <div className="bg-[#0B0C10] min-h-screen pb-16">
      {/* Page Header */}
      <PageHeader title="Pre-Owned Inventory" breadcrumbs={["Used Cars"]} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-10">
        {/* Dropdown filter box */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-[#171923] border border-gray-800 rounded-xl p-5 mb-8 shadow-md">
          {/* Make select */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block">Select Make</label>
            <select
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full bg-[#0F111A] border border-gray-850 text-white rounded-lg p-3 text-xs focus:outline-none focus:border-[#BF1E2E] cursor-pointer"
            >
              {uniqueMakes.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Max Price select */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block">Max Price</label>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-[#0F111A] border border-gray-850 text-white rounded-lg p-3 text-xs focus:outline-none focus:border-[#BF1E2E] cursor-pointer"
            >
              <option value="">No Limit</option>
              <option value="100000">$100,000</option>
              <option value="150000">$150,000</option>
              <option value="200000">$200,000</option>
            </select>
          </div>

          {/* Sort order select */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block">Sort By</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full bg-[#0F111A] border border-gray-850 text-white rounded-lg p-3 text-xs focus:outline-none focus:border-[#BF1E2E] cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setMake("ALL");
                setMaxPrice("");
                setSortOrder("default");
              }}
              className="w-full bg-[#1F2232] hover:bg-[#BF1E2E] text-white border border-gray-800 hover:border-transparent font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-lg transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Vehicles Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#171923] border border-gray-800 rounded-xl p-16 text-center">
            <p className="text-gray-400 text-sm">No used vehicles match your filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsedCars;
