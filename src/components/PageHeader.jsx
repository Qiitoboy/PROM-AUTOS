import React from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";

const PageHeader = ({ title, breadcrumbs = [], backgroundImage }) => {
  return (
    <div
      className="relative border-b border-gray-800 py-20 px-6 overflow-hidden"
      style={
        backgroundImage
          ? { backgroundImage: `url('${backgroundImage}')`, backgroundSize: "cover", backgroundPosition: "center" }
          : {}
      }
    >
      {/* Dark overlay for image backgrounds */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C10] via-[#0B0C10]/85 to-[#0B0C10]/70" />
      )}

      {/* Fallback gradient when no image */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F111A] to-[#1F2232]" />
      )}

      {/* Subtle grid/dot pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#BF1E2E_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0B0C10] to-transparent" />

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10">
        {/* Title */}
        <div className="animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            {title}
          </h1>
          <div className="w-16 h-1 bg-[#BF1E2E] mt-2 rounded" />
        </div>

        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2.5 text-xs font-semibold uppercase tracking-wider text-gray-400 bg-[#0B0C10]/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-800 animate-slide-up-delay-1">
          <span className="flex items-center gap-1 text-gray-500">
            <FaHome className="text-sm" /> Home
          </span>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <FaChevronRight className="text-gray-600 text-[9px]" />
              <span className={idx === breadcrumbs.length - 1 ? "text-white" : "text-gray-500"}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PageHeader;
