import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { FaCar, FaCogs, FaInbox, FaPlus, FaTrash, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Admin = ({ 
  vehicles, 
  setVehicles, 
  parts, 
  setParts, 
  leads, 
  setLeads 
}) => {
  const [activeTab, setActiveTab] = useState("overview"); // overview, vehicles, parts, leads

  // Form states
  const [vehicleForm, setVehicleForm] = useState({
    name: "", make: "", model: "", type: "Coupe", price: "", year: 2024,
    condition: "NEW", transmission: "Automatic", fuel: "Petrol", speed: "",
    image: "/img/car1.jpg", description: ""
  });

  const [partForm, setPartForm] = useState({
    name: "", category: "Engine", price: "", compatibility: "",
    inStock: true, stockCount: 1, image: "/img/part1.png", description: ""
  });

  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showAddPart, setShowAddPart] = useState(false);

  // Formatting price helper
  const formatPrice = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(num);
  };

  // Add Vehicle handler
  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!vehicleForm.name || !vehicleForm.price) return;
    
    const newV = {
      ...vehicleForm,
      id: "v_" + Date.now(),
      price: parseFloat(vehicleForm.price),
      year: parseInt(vehicleForm.year)
    };

    setVehicles([newV, ...vehicles]);
    setShowAddVehicle(false);
    setVehicleForm({
      name: "", make: "", model: "", type: "Coupe", price: "", year: 2024,
      condition: "NEW", transmission: "Automatic", fuel: "Petrol", speed: "",
      image: "/img/car1.jpg", description: ""
    });
  };

  // Add Part handler
  const handleAddPart = (e) => {
    e.preventDefault();
    if (!partForm.name || !partForm.price) return;

    const newP = {
      ...partForm,
      id: "p_" + Date.now(),
      price: parseFloat(partForm.price),
      stockCount: parseInt(partForm.stockCount),
      inStock: parseInt(partForm.stockCount) > 0
    };

    setParts([newP, ...parts]);
    setShowAddPart(false);
    setPartForm({
      name: "", category: "Engine", price: "", compatibility: "",
      inStock: true, stockCount: 1, image: "/img/part1.png", description: ""
    });
  };

  // Delete helpers
  const handleDeleteVehicle = (id) => {
    if (confirm("Are you sure you want to remove this vehicle?")) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const handleDeletePart = (id) => {
    if (confirm("Are you sure you want to remove this part from catalog?")) {
      setParts(parts.filter(p => p.id !== id));
    }
  };

  const handleDeleteLead = (id) => {
    if (confirm("Remove this customer lead?")) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const handleToggleLeadStatus = (id) => {
    setLeads(leads.map(lead => {
      if (lead.id === id) {
        return { ...lead, status: lead.status === "Resolved" ? "New" : "Resolved" };
      }
      return lead;
    }));
  };

  return (
    <div className="bg-[#0B0C10] min-h-screen pb-16">
      {/* Dashboard Page Header */}
      <PageHeader title="Command Center" breadcrumbs={["Admin Dashboard"]} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-10">
        {/* Dashboard Tabs Header */}
        <div className="flex border-b border-gray-800 mb-8 overflow-x-auto scrollbar-none">
          {["overview", "vehicles", "parts", "leads"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-6 text-xs uppercase font-extrabold tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? "border-[#BF1E2E] text-white"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab === "overview" && "Dashboard Overview"}
              {tab === "vehicles" && "Vehicle Inventory"}
              {tab === "parts" && "Parts Catalog"}
              {tab === "leads" && `Customer Leads (${leads.length})`}
            </button>
          ))}
        </div>

        {/* 1. OVERVIEW VIEW */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#171923] border border-gray-800 rounded-xl p-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Showroom Stock</span>
                  <div className="text-3xl font-black text-white mt-1">{vehicles.length} Units</div>
                </div>
                <span className="bg-[#BF1E2E]/10 border border-[#BF1E2E]/25 text-[#BF1E2E] p-4 rounded-xl">
                  <FaCar className="text-xl" />
                </span>
              </div>

              <div className="bg-[#171923] border border-gray-800 rounded-xl p-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Active Catalog Parts</span>
                  <div className="text-3xl font-black text-white mt-1">{parts.length} Items</div>
                </div>
                <span className="bg-blue-650/10 border border-blue-600/25 text-blue-500 p-4 rounded-xl">
                  <FaCogs className="text-xl" />
                </span>
              </div>

              <div className="bg-[#171923] border border-gray-800 rounded-xl p-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Unresolved Inquiries</span>
                  <div className="text-3xl font-black text-white mt-1">{leads.filter(l => l.status !== "Resolved").length} Leads</div>
                </div>
                <span className="bg-green-650/10 border border-green-600/25 text-green-500 p-4 rounded-xl">
                  <FaInbox className="text-xl" />
                </span>
              </div>
            </div>

            {/* Quick Leads overview */}
            <div className="bg-[#171923] border border-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-extrabold uppercase text-xs tracking-wider text-white">Recent Customer Activity</h3>
                <button 
                  onClick={() => setActiveTab("leads")}
                  className="text-[10px] font-bold text-[#BF1E2E] hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
                >
                  View All Leads
                </button>
              </div>

              {leads.length > 0 ? (
                <div className="space-y-4">
                  {leads.slice(0, 4).map((lead) => (
                    <div key={lead.id} className="bg-[#0F111A] border border-gray-850 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-white">{lead.name}</span>
                          <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            lead.status === "New" ? "bg-red-950 text-red-400 border border-red-900/35" : "bg-green-950 text-green-400 border border-green-900/35"
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Interest: <span className="text-white font-medium">{lead.vehicleInterest || "General"}</span></p>
                        <p className="text-xs text-gray-500 italic mt-2">"{lead.message}"</p>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <button
                          onClick={() => handleToggleLeadStatus(lead.id)}
                          className="flex-grow md:flex-grow-0 bg-[#1F2232] hover:bg-gray-800 text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg border border-gray-800 transition-all cursor-pointer text-center"
                        >
                          Mark {lead.status === "Resolved" ? "New" : "Resolved"}
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="bg-red-950/20 hover:bg-red-950 text-red-400 p-2 rounded-lg border border-red-900/20 transition-all cursor-pointer"
                          title="Delete Lead"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 text-xs">No active inquiries.</div>
              )}
            </div>
          </div>
        )}

        {/* 2. VEHICLE INVENTORY PANEL */}
        {activeTab === "vehicles" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold uppercase text-xs tracking-wider text-white">Dealership Vehicles Catalogue</h3>
              <button
                onClick={() => setShowAddVehicle(!showAddVehicle)}
                className="flex items-center gap-1.5 bg-[#BF1E2E] hover:bg-red-800 text-white font-extrabold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all cursor-pointer"
              >
                <FaPlus /> Add Vehicle
              </button>
            </div>

            {/* Add vehicle form panel */}
            {showAddVehicle && (
              <form onSubmit={handleAddVehicle} className="bg-[#171923] border border-[#BF1E2E]/40 rounded-xl p-6 space-y-4 animate-slide-down">
                <h4 className="font-bold text-xs uppercase tracking-wider text-white border-b border-gray-800 pb-2">Add New Vehicle Entry</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Vehicle Name *</label>
                    <input
                      type="text" required placeholder="e.g. BMW M5"
                      value={vehicleForm.name}
                      onChange={(e) => setVehicleForm({...vehicleForm, name: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Make *</label>
                    <input
                      type="text" required placeholder="e.g. BMW"
                      value={vehicleForm.make}
                      onChange={(e) => setVehicleForm({...vehicleForm, make: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Model</label>
                    <input
                      type="text" placeholder="e.g. M5"
                      value={vehicleForm.model}
                      onChange={(e) => setVehicleForm({...vehicleForm, model: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Price (USD) *</label>
                    <input
                      type="number" required placeholder="e.g. 110900"
                      value={vehicleForm.price}
                      onChange={(e) => setVehicleForm({...vehicleForm, price: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Year</label>
                    <input
                      type="number" placeholder="2024"
                      value={vehicleForm.year}
                      onChange={(e) => setVehicleForm({...vehicleForm, year: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Condition</label>
                    <select
                      value={vehicleForm.condition}
                      onChange={(e) => setVehicleForm({...vehicleForm, condition: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E] cursor-pointer"
                    >
                      <option value="NEW">New</option>
                      <option value="USED">Pre-Owned</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Acceleration</label>
                    <input
                      type="text" placeholder="e.g. 3.1s 0-100 km/h"
                      value={vehicleForm.speed}
                      onChange={(e) => setVehicleForm({...vehicleForm, speed: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Transmission</label>
                    <select
                      value={vehicleForm.transmission}
                      onChange={(e) => setVehicleForm({...vehicleForm, transmission: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E] cursor-pointer"
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Fuel Type</label>
                    <select
                      value={vehicleForm.fuel}
                      onChange={(e) => setVehicleForm({...vehicleForm, fuel: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E] cursor-pointer"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Diesel">Diesel</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Image URL / Path</label>
                    <input
                      type="text" placeholder="/img/car1.jpg"
                      value={vehicleForm.image}
                      onChange={(e) => setVehicleForm({...vehicleForm, image: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase">Description</label>
                  <textarea
                    rows={3} placeholder="Vehicle highlights..."
                    value={vehicleForm.description}
                    onChange={(e) => setVehicleForm({...vehicleForm, description: e.target.value})}
                    className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E] resize-none"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddVehicle(false)}
                    className="bg-[#1F2232] hover:bg-gray-800 text-white font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-lg border border-gray-800 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#BF1E2E] hover:bg-red-800 text-white font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all cursor-pointer"
                  >
                    Save Vehicle
                  </button>
                </div>
              </form>
            )}

            {/* Inventory table */}
            <div className="overflow-x-auto bg-[#171923] border border-gray-800 rounded-xl shadow-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-850 text-[10px] font-black uppercase tracking-wider text-gray-500 bg-[#0F111A]/50">
                    <th className="p-4">Vehicle</th>
                    <th className="p-4">Specs</th>
                    <th className="p-4 text-right">Price</th>
                    <th className="p-4 text-center">Condition</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850 text-xs text-gray-300">
                  {vehicles.map((v) => (
                    <tr key={v.id} className="hover:bg-[#0F111A]/20 transition-all">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={v.image} 
                            alt={v.name} 
                            className="w-12 h-8 object-cover rounded border border-gray-800 shrink-0 bg-gray-950" 
                          />
                          <div>
                            <span className="font-extrabold text-white block">{v.name}</span>
                            <span className="text-[10px] text-gray-500 uppercase">{v.make}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span>{v.year} | {v.transmission} | {v.fuel}</span>
                      </td>
                      <td className="p-4 text-right font-bold text-white">
                        {formatPrice(v.price)}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          v.condition === "NEW" ? "bg-red-950 text-red-400 border border-red-900/35" : "bg-gray-850 text-gray-400 border border-gray-800"
                        }`}>
                          {v.condition}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteVehicle(v.id)}
                          className="bg-red-950/20 hover:bg-red-950 text-red-400 p-2.5 rounded-lg border border-red-900/20 transition-all cursor-pointer"
                          title="Remove Vehicle"
                        >
                          <FaTrash size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. PARTS CATALOG PANEL */}
        {activeTab === "parts" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold uppercase text-xs tracking-wider text-white">Dealership Parts Catalog</h3>
              <button
                onClick={() => setShowAddPart(!showAddPart)}
                className="flex items-center gap-1.5 bg-[#BF1E2E] hover:bg-red-800 text-white font-extrabold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all cursor-pointer"
              >
                <FaPlus /> Add Component
              </button>
            </div>

            {/* Add parts form panel */}
            {showAddPart && (
              <form onSubmit={handleAddPart} className="bg-[#171923] border border-[#BF1E2E]/40 rounded-xl p-6 space-y-4 animate-slide-down">
                <h4 className="font-bold text-xs uppercase tracking-wider text-white border-b border-gray-800 pb-2">Add New Catalog Part</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Part Name *</label>
                    <input
                      type="text" required placeholder="e.g. Brembo Ceramic Brakes"
                      value={partForm.name}
                      onChange={(e) => setPartForm({...partForm, name: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Category</label>
                    <select
                      value={partForm.category}
                      onChange={(e) => setPartForm({...partForm, category: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E] cursor-pointer"
                    >
                      <option value="Engine">Engine</option>
                      <option value="Brakes">Brakes</option>
                      <option value="Suspension">Suspension</option>
                      <option value="Exhaust">Exhaust</option>
                      <option value="Wheels">Wheels</option>
                      <option value="Interior">Interior</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Price (USD) *</label>
                    <input
                      type="number" required placeholder="e.g. 8450"
                      value={partForm.price}
                      onChange={(e) => setPartForm({...partForm, price: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Compatibility Range</label>
                    <input
                      type="text" placeholder="e.g. BMW M5 / AMG GT"
                      value={partForm.compatibility}
                      onChange={(e) => setPartForm({...partForm, compatibility: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Stock Count</label>
                    <input
                      type="number" placeholder="1"
                      value={partForm.stockCount}
                      onChange={(e) => setPartForm({...partForm, stockCount: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Image URL / Path</label>
                    <input
                      type="text" placeholder="/img/part1.png"
                      value={partForm.image}
                      onChange={(e) => setPartForm({...partForm, image: e.target.value})}
                      className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase">Description</label>
                  <textarea
                    rows={3} placeholder="Part specifications and details..."
                    value={partForm.description}
                    onChange={(e) => setPartForm({...partForm, description: e.target.value})}
                    className="w-full bg-[#0F111A] border border-gray-800 text-white rounded px-3 py-2 text-xs focus:outline-none focus:border-[#BF1E2E] resize-none"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddPart(false)}
                    className="bg-[#1F2232] hover:bg-gray-800 text-white font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-lg border border-gray-800 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#BF1E2E] hover:bg-red-800 text-white font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all cursor-pointer"
                  >
                    Save Component
                  </button>
                </div>
              </form>
            )}

            {/* Catalog list table */}
            <div className="overflow-x-auto bg-[#171923] border border-gray-800 rounded-xl shadow-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-850 text-[10px] font-black uppercase tracking-wider text-gray-500 bg-[#0F111A]/50">
                    <th className="p-4">Component</th>
                    <th className="p-4">Compatibility</th>
                    <th className="p-4 text-right">Price</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850 text-xs text-gray-300">
                  {parts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#0F111A]/20 transition-all">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="w-10 h-10 object-contain rounded border border-gray-800 bg-gray-950 p-1 shrink-0" 
                          />
                          <div>
                            <span className="font-extrabold text-white block">{p.name}</span>
                            <span className="text-[10px] text-gray-500 uppercase">{p.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-400 font-medium">{p.compatibility}</span>
                      </td>
                      <td className="p-4 text-right font-bold text-white">
                        {formatPrice(p.price)}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          p.inStock ? "bg-green-950 text-green-400 border border-green-900/35" : "bg-red-950 text-red-400 border border-red-900/35"
                        }`}>
                          {p.inStock ? `In Stock (${p.stockCount})` : "Out of Stock"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeletePart(p.id)}
                          className="bg-red-950/20 hover:bg-red-950 text-red-400 p-2.5 rounded-lg border border-red-900/20 transition-all cursor-pointer"
                          title="Remove Component"
                        >
                          <FaTrash size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. LEADS LIST PANEL */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            <h3 className="font-extrabold uppercase text-xs tracking-wider text-white">Customer Leads & Vehicle Requests</h3>
            
            <div className="overflow-x-auto bg-[#171923] border border-gray-800 rounded-xl shadow-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-850 text-[10px] font-black uppercase tracking-wider text-gray-500 bg-[#0F111A]/50">
                    <th className="p-4">Client Contact</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Interest</th>
                    <th className="p-4">Message Details</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850 text-xs text-gray-300">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#0F111A]/20 transition-all">
                      <td className="p-4">
                        <span className="font-extrabold text-white block">{lead.name}</span>
                        <span className="text-[10px] text-gray-500 block">{lead.email}</span>
                        {lead.phone && <span className="text-[10px] text-gray-600 block">{lead.phone}</span>}
                      </td>
                      <td className="p-4 text-gray-400 whitespace-nowrap">
                        {lead.date}
                      </td>
                      <td className="p-4">
                        <span className="text-gray-200 font-semibold">{lead.vehicleInterest || "General Inquiry"}</span>
                      </td>
                      <td className="p-4 max-w-xs">
                        <p className="text-gray-400 line-clamp-3 text-[11px] leading-relaxed">{lead.message}</p>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          lead.status === "New" 
                            ? "bg-red-950 text-red-400 border border-red-900/35" 
                            : lead.status === "In Progress"
                            ? "bg-amber-950 text-amber-400 border border-amber-900/35"
                            : "bg-green-950 text-green-400 border border-green-900/35"
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex gap-1.5 justify-center">
                          <button
                            onClick={() => handleToggleLeadStatus(lead.id)}
                            className="bg-[#1F2232] hover:bg-gray-800 text-white font-bold text-[9px] uppercase tracking-wider px-2 py-1.5 rounded border border-gray-800 transition-all cursor-pointer"
                          >
                            Toggle
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="bg-red-950/20 hover:bg-red-950 text-red-400 p-2 rounded border border-red-900/20 transition-all cursor-pointer"
                            title="Remove Lead"
                          >
                            <FaTrash size={10} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
