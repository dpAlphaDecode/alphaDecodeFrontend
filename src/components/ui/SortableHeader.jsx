'use client';
import React from "react";

const SortableHeader = ({ label, columnKey, sortBy, sortDirection, onSort }) => {
  const isActive = sortBy === columnKey;
  const direction = isActive ? sortDirection : null;
  const icon = direction === "asc" ? "↑" : direction === "desc" ? "↓" : "↑";
  const tooltipLabel = isActive ? "Change sort" : `Sort by ${label}`;

  return (
    <th
      onClick={() => onSort(columnKey)}
      className="group relative px-4 py-3 text-center text-base font-semibold cursor-pointer select-none whitespace-nowrap hover:bg-gray-100"
    >
      <div className="flex items-center justify-center gap-1 relative">
        {/* Icon with Tooltip */}
        <div className="relative flex items-center justify-center">
          <span
            className={`text-sm transition-opacity ${
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {icon}
          </span>

          {/* Tooltip */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
            {tooltipLabel}
          </div>
        </div>

        <span>{label}</span>
      </div>
    </th>
  );
};

export default SortableHeader;
