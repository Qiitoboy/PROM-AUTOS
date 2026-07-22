import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import PartCard from "../components/PartCard";
import { FaSearch } from "react-icons/fa";
import { getParts } from "../api/parts";

const Parts = ({ onViewDetails, searchFilter = "" }) => {
  const [parts, setParts] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getParts()
      .then((response) => {
        console.log("Parts:", response.data);
        setParts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const categories = [
    "ALL",
    ...new Set(parts.map((part) => part.category?.toUpperCase()))
  ].filter(Boolean);

  const filtered = parts.filter((part) => {
    const matchesCategory =
      category === "ALL" ||
      part.category?.toUpperCase() === category;

    const activeSearch = query || searchFilter;

    const matchesSearch =
      !activeSearch ||
      part.name?.toLowerCase().includes(activeSearch.toLowerCase()) ||
      part.compatibility?.toLowerCase().includes(activeSearch.toLowerCase()) ||
      part.category?.toLowerCase().includes(activeSearch.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="theme-bg-primary min-h-screen pb-16">
      <PageHeader
        title="Parts Vault"
        breadcrumbs={["Parts Catalog"]}
        backgroundImage="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 pb-4 border-b theme-border">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-[9px] font-black uppercase tracking-wider px-4 py-2.5 rounded-lg shrink-0 border transition-all cursor-pointer ${category === cat
                    ? "bg-[#BF1E2E] text-white border-transparent"
                    : "theme-bg-card theme-text-secondary theme-border hover:text-[#BF1E2E] hover:border-[#BF1E2E]/40"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none theme-text-muted">
              <FaSearch className="text-xs" />
            </span>

            <input
              type="text"
              placeholder="Search components..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full theme-input border rounded-lg pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#BF1E2E]"
            />
          </div>
        </div>

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
          <div className="theme-card border rounded-xl p-16 text-center">
            <p className="theme-text-secondary text-sm">
              No performance parts found matching your criteria.
            </p>
          </div>
        )}

        <div className="mt-16 theme-card border rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="theme-text-primary font-extrabold text-sm uppercase tracking-wide">
              Looking for Custom Components?
            </h4>

            <p className="theme-text-secondary text-xs leading-relaxed max-w-xl">
              We maintain direct supplier relations with Brembo, Akrapovic,
              Recaro, Bilstein, and more. Send us your chassis number and
              request, and our techs will source it.
            </p>
          </div>

          <a
            href="https://wa.me/233545526710"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#BF1E2E] hover:bg-red-800 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-all text-center shrink-0 cursor-pointer"
          >
            Custom Parts Request
          </a>
        </div>
      </div>
    </div>
  );
};

export default Parts;