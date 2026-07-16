import React, { useState, useEffect, useCallback } from "react";
import VehicleCard from "../components/VehicleCard";
import PartCard from "../components/PartCard";
import { dealerStats } from "../data/mockData";
import { FaArrowRight, FaWhatsapp, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Hero carousel slides — curated car images
const heroSlides = [
  {
    image: "/img/Background-home.png",
    tagline: "Pure Velocity & Precision",
    heading: ["REDEFINE YOUR", "DRIVING EXPERIENCE"],
    description:
      "Welcome to PROM AUTOS. Discover our curated catalog of elite hypercars, track-focused supercars, and high-grade carbon performance parts. Engineered for those who refuse to settle.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1920&q=80",
    tagline: "Unleash Raw Power",
    heading: ["LUXURY MEETS", "PERFORMANCE"],
    description:
      "From track-ready supercars to refined luxury sedans, our handpicked collection delivers unmatched driving thrills. Experience the art of speed at PROM AUTOS.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
    tagline: "Exclusive Collection",
    heading: ["CURATED FOR", "THE ELITE"],
    description:
      "Every vehicle in our showroom has been meticulously selected. We offer only the finest machines from the world's most prestigious marques.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1920&q=80",
    tagline: "Built For The Road",
    heading: ["YOUR DREAM CAR", "AWAITS YOU"],
    description:
      "Whether you seek a weekend track weapon or a daily grand tourer, PROM AUTOS connects you with extraordinary machines and world-class car rental services.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80",
    tagline: "Timeless Elegance",
    heading: ["DRIVE BEYOND", "EXPECTATIONS"],
    description:
      "Step into a world where engineering excellence meets artistic design. Our collection represents the pinnacle of automotive achievement.",
  },
];

const SLIDE_INTERVAL = 6000; // 6 seconds per slide

const Home = ({ vehicles, parts, setCurrentPage, onViewDetails }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideKey, setSlideKey] = useState(0); // Force re-trigger kenburns

  // Select featured items or first 4
  const featuredVehicles = vehicles.filter((v) => v.featured).slice(0, 4);
  if (featuredVehicles.length === 0) {
    featuredVehicles.push(...vehicles.slice(0, 4));
  }

  const featuredParts = parts.filter((p) => p.featured).slice(0, 4);
  if (featuredParts.length === 0) {
    featuredParts.push(...parts.slice(0, 4));
  }

  // Navigate to a specific slide
  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setSlideKey((k) => k + 1);
        setIsTransitioning(false);
      }, 600);
    },
    [isTransitioning, currentSlide]
  );

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % heroSlides.length;
      goToSlide(nextSlide);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [currentSlide, goToSlide]);

  // Previous / Next handlers
  const handlePrev = () => {
    const prev =
      (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    goToSlide(prev);
  };
  const handleNext = () => {
    const next = (currentSlide + 1) % heroSlides.length;
    goToSlide(next);
  };

  const slide = heroSlides[currentSlide];

  return (
    <div className="text-white">
      {/* ===== 1. HERO CAROUSEL ===== */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center overflow-hidden">
        {/* Background image with Ken Burns */}
        <div
          key={`slide-bg-${slideKey}`}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 animate-kenburns ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: `url('${slide.image}')` }}
        />

        {/* Dark overlay mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.08)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(18,18,18,0.08)_1.5px,transparent_1.5px)] [background-size:30px_30px]" />

        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0C10] to-transparent z-[5]" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-8 z-10">
          <div
            key={`slide-content-${slideKey}`}
            className={`max-w-2xl transition-opacity duration-700 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="text-[#BF1E2E] font-black text-xs uppercase tracking-widest bg-red-950/40 border border-red-900/40 px-3.5 py-1.5 rounded-full inline-block mb-4 animate-slide-up">
              {slide.tagline}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none mb-6 animate-slide-up-delay-1">
              {slide.heading[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF1E2E] to-red-500">
                {slide.heading[1]}
              </span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base mb-8 leading-relaxed font-medium animate-slide-up-delay-2">
              {slide.description}
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up-delay-3">
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

        {/* Slide Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#BF1E2E] backdrop-blur-sm text-white p-3 rounded-full border border-white/10 hover:border-transparent transition-all cursor-pointer"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-sm" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#BF1E2E] backdrop-blur-sm text-white p-3 rounded-full border border-white/10 hover:border-transparent transition-all cursor-pointer"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-sm" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? "w-8 h-2.5 bg-[#BF1E2E] animate-dot-pulse"
                  : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ===== 2. ACHIEVEMENTS STATISTICS BAR ===== */}
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

      {/* ===== 3. FEATURED VEHICLES SECTION ===== */}
      <section className="relative py-20 px-6 md:px-8 bg-[#0B0C10] overflow-hidden">
        {/* Subtle car silhouette watermark */}
        <div
          className="absolute inset-0 opacity-[0.03] bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=80')",
          }}
        />

        <div className="relative max-w-7xl mx-auto z-10">
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
            {featuredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. PARTS VAULT PREVIEW SECTION ===== */}
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
            {featuredParts.map((part) => (
              <PartCard
                key={part.id}
                part={part}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. CTA SECTION WITH CAR INTERIOR BACKGROUND ===== */}
      <section className="relative py-16 px-6 md:px-8 overflow-hidden">
        {/* Background — car interior / dashboard image */}
        <div
          className="absolute inset-0 bg-cover bg-center parallax-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0B0C10]/90" />

        <div className="relative max-w-6xl mx-auto bg-gradient-to-r from-[#171923]/90 to-[#1F2232]/90 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden z-10">
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
                href="https://wa.me/233545526710"
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