import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import VehicleCard from "../components/VehicleCard";

const NewCars = ({ vehicles, onViewDetails }) => {
  const [selectedMake, setSelectedMake] = useState("ALL");

  // Filter for NEW condition
  const newVehicles = vehicles.filter(v => v.condition === "NEW");

  // Get list of unique makes among new cars
  const uniqueMakes = ["ALL", ...new Set(newVehicles.map(v => v.make))];

  // Apply filter
  const filteredVehicles = selectedMake === "ALL" 
    ? newVehicles 
    : newVehicles.filter(v => v.make === selectedMake);

  return (
    <div className="bg-[#0B0C10] min-h-screen pb-16">
      {/* Page Header */}
      <PageHeader title="New Showroom" breadcrumbs={["New Cars"]} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-10">
        {/* Brand filter bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-gray-900">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-2">Filter Brand:</span>
          {uniqueMakes.map((make) => (
            <button
              key={make}
              onClick={() => setSelectedMake(make)}
              className={`text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                selectedMake === make
                  ? "bg-[#BF1E2E] text-white border-transparent shadow-md"
                  : "bg-[#171923] text-gray-400 border-gray-800 hover:text-white hover:border-gray-700"
              }`}
            >
              {make}
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#171923] border border-gray-800 rounded-xl p-16 text-center">
            <p className="text-gray-400 text-sm">No new vehicles match the selected brand filter.</p>
            <button 
              onClick={() => setSelectedMake("ALL")}
              className="mt-4 bg-[#BF1E2E] hover:bg-red-800 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCars;
