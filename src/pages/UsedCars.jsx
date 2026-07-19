import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import VehicleCard from "../components/VehicleCard";
import { getUsedCars } from "../api/cars";

const UsedCars = ({ onViewDetails }) => {
  const [make, setMake] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getUsedCars()
      .then((response) => {
        console.log("Used cars:", response.data);
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const usedVehicles = vehicles;
  const uniqueMakes = ["ALL", ...new Set(usedVehicles.map(v => v.make))];

  let filtered = usedVehicles;
  if (make !== "ALL") filtered = filtered.filter(v => v.make === make);
  if (maxPrice) filtered = filtered.filter((v) => Number(v.price) <= Number(maxPrice));
  if (sortOrder === "price-asc") filtered = [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
  else if (sortOrder === "price-desc") filtered = [...filtered].sort((a, b) => Number(b.price) - Number(a.price));
  else if (sortOrder === "year-desc") filtered = [...filtered].sort((a, b) => Number(b.year) - Number(a.year));

  const selectClass = "w-full theme-input border rounded-lg p-3 text-xs focus:outline-none focus:border-[#BF1E2E] cursor-pointer";

  return (
    <div className="theme-bg-primary min-h-screen pb-16">
      <PageHeader
        title="Pre-Owned Inventory"
        breadcrumbs={["Used Cars"]}
        backgroundImage="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-10">
        {/* Filter box */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 theme-card border rounded-xl p-5 mb-8 shadow-md">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider theme-text-muted block">Select Make</label>
            <select value={make} onChange={(e) => setMake(e.target.value)} className={selectClass}>
              {uniqueMakes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider theme-text-muted block">Max Price</label>
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={selectClass}>
              <option value="">No Limit</option>
              <option value="100000">₵100,000</option>
              <option value="150000">₵150,000</option>
              <option value="200000">₵200,000</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider theme-text-muted block">Sort By</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={selectClass}>
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => { setMake("ALL"); setMaxPrice(""); setSortOrder("default"); }}
              className="w-full theme-bg-button hover:bg-[#BF1E2E] theme-text-primary hover:text-white border theme-border hover:border-transparent font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-lg transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} onViewDetails={onViewDetails} />
            ))}
          </div>
        ) : (
          <div className="theme-card border rounded-xl p-16 text-center">
            <p className="theme-text-secondary text-sm">No used vehicles match your filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsedCars;
