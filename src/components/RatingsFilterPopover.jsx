'use client'
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const RatingsFilterPopover = ({ onFilterChange }) => {
  const [numericFilters, setNumericFilters] = useState({
    Composite: 30,
    EPS: 30,
    RS: 30,
  });

  const [gradeFilters, setGradeFilters] = useState({
    SMR: [],
    AD: [],
    IGPS: [],
  });

  const handleNumericChange = (key, delta) => {
    setNumericFilters((prev) => {
      const updated = { ...prev, [key]: Math.min(100, Math.max(0, prev[key] + delta)) };
      onFilterChange({ numericFilters: updated, gradeFilters });
      return updated;
    });
  };

  const toggleGrade = (metric, grade) => {
    setGradeFilters((prev) => {
      const current = prev[metric];
      const updated = current.includes(grade)
        ? current.filter((g) => g !== grade)
        : [...current, grade];
      const newFilters = { ...prev, [metric]: updated };
      onFilterChange({ numericFilters, gradeFilters: newFilters });
      return newFilters;
    });
  };

  return (
    <Popover>
      <PopoverTrigger className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-gray-50 focus:outline-none">
        Ratings filters <ChevronDown className="ml-1 h-4 w-4" />
      </PopoverTrigger>

      <PopoverContent className="w-[420px] p-4 bg-white rounded-xl shadow-lg z-[9999] space-y-4">
        {/* Numeric Filters */}
        {["Composite", "EPS", "RS"].map((item) => (
          <div key={item} className="flex items-center justify-between">
            <span className="w-24 font-medium">{item}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNumericChange(item, -5)}
                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
              >
                −
              </button>
              <span className="text-blue-600 font-semibold w-12 text-center">
                {numericFilters[item]}%
              </span>
              <button
                onClick={() => handleNumericChange(item, 5)}
                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <span className="ml-2 text-sm text-gray-600">and above</span>
          </div>
        ))}

        {/* Grade Filters */}
        {["SMR", "AD", "IGPS"].map((metric) => (
          <div key={metric} className="pt-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-24 font-medium">{metric}</span>
              <div className="flex gap-2">
                {["A", "B", "C", "D", "E"].map((grade) => {
                  const selected = gradeFilters[metric].includes(grade);
                  return (
                    <button
                      key={grade}
                      onClick={() => toggleGrade(metric, grade)}
                      className={`w-8 h-8 rounded border text-sm font-semibold transition ${
                        selected
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {grade}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        <div className="pt-2">
          <button className="text-red-600 text-sm hover:underline">Remove</button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RatingsFilterPopover;
