import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import VehicleCard from "../components/VehicleCard";
import { getNewCars } from "../api/cars";

const NewCars = ({ onViewDetails }) => {
  const [selectedMake, setSelectedMake] = useState("ALL");
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getNewCars()
      .then((response) => {
        console.log("New cars:", response.data);
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const newVehicles = vehicles;
  const uniqueMakes = ["ALL", ...new Set(newVehicles.map(v => v.make))];
  const filteredVehicles = selectedMake === "ALL"
    ? newVehicles
    : newVehicles.filter(v => v.make === selectedMake);

  return (
    <div className="theme-bg-primary min-h-screen pb-16">
      <PageHeader
        title="New Showroom"
        breadcrumbs={["New Cars"]}
        backgroundImage="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-10">
        {/* Brand filter bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b theme-border">
          <span className="text-xs font-bold theme-text-muted uppercase tracking-widest mr-2">Filter Brand:</span>
          {uniqueMakes.map((make) => (
            <button
              key={make}
              onClick={() => setSelectedMake(make)}
              className={`text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                selectedMake === make
                  ? "bg-[#BF1E2E] text-white border-transparent shadow-md"
                  : "theme-bg-card theme-text-secondary theme-border hover:text-[#BF1E2E] hover:border-[#BF1E2E]/40"
              }`}
            >
              {make}
            </button>
          ))}
        </div>

        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} onViewDetails={onViewDetails} />
            ))}
          </div>
        ) : (
          <div className="theme-card border rounded-xl p-16 text-center">
            <p className="theme-text-secondary text-sm">No new vehicles match the selected brand filter.</p>
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