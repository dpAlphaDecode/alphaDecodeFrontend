"use client";

import { Box } from "@mui/material";
import DropdownFilter from "./DropdownFilter";
import MultiSelectFilter from "./MultiSelectFilter"; // ✅ ADD THIS
import AlphaDecodeFilter from "./AlphaDecodeFilter";
import { useMemo } from "react";

export default function AnalystFilterBar({ filters, setFilters, sectorOptions,  industryOptions, alphadecodeFilter, setAlphadecodeFilter}) {

  const FILTERS = [
    {
      key: "analyst",
      label: "Analyst Rating",
      options: [
        { label: "Strong", value: "strong", desc: "(Composite Rating above 60)" },
        { label: "Weak", value: "weak", desc: "(below 39)" },
        { label: "Neutral", value: "neutral", desc: "(40 to 59)" },

      ],
    },

    {
      key: "sector",
      label: "Sector",
      options: sectorOptions,
      multi: true,
    },

    {
      key: "changePct",
      label: "Change %",
      options: [
        { label: "Exceptional up", value: "up_30", desc: "Above 30%" },
        { label: "Very Strong up", value: "up_20", desc: "Above 20%" },
        { label: "Strong up", value: "up_10", desc: "Above 10%" },
        { label: "Moderate up", value: "up_5", desc: "Above 5%" },
        { label: "Weak up", value: "up_0_5", desc: "0% - 5%" },
        { label: "Up", value: "up_all", desc: "Above 0%" },

        { label: "Down", value: "down_all", desc: "Below 0%" },
        { label: "Weak Down", value: "down_0_5", desc: "-5% to 0%" },
        { label: "Moderate Down", value: "down_5", desc: "Below -5%" },
        { label: "Strong Down", value: "down_10", desc: "Below -10%" },
        { label: "Severe Down", value: "down_20", desc: "Below -20%" },
        { label: "Extreme Down", value: "down_30", desc: "Below -30%" },
      ],
    },

    {
      key: "industry",
      label: "Industry",
      options: industryOptions,
      multi: true,
    },

    {
      key: "marketCap",
      label: "Market Cap",
      options: [
        { label: "Large", value: "large", desc: "Top 100" },
        { label: "Mid", value: "mid", desc: "Top 101-250" },
        { label: "Small", value: "small", desc: "Top 251-500" },
        { label: "Micro", value: "micro", desc: "Top 501-750" },
        { label: "Nano", value: "nano", desc: "Top 750-all" },
      ],
    },

    {
      key: "pe",
      label: "PE",
      options: [
        { label: "Extremely High", value: "pe_50", desc: "50+" },
        { label: "Very High", value: "pe_35_50", desc: "35 - 50" },
        { label: "High", value: "pe_25_35", desc: "25 - 35" },
        { label: "Moderate", value: "pe_15_25", desc: "15 - 25" },
        { label: "Low", value: "pe_5_15", desc: "5 - 15" },
        { label: "Very Low", value: "pe_0_5", desc: "0 - 5" },
      ],
    },

    {
      key: "pb",
      label: "PB",
      options: [
        { label: "Extremely High", value: "pb_10", desc: "10+" },
        { label: "Very High", value: "pb_5_10", desc: "5 - 10" },
        { label: "High", value: "pb_3_5", desc: "3 - 5" },
        { label: "Moderate", value: "pb_1_5_3", desc: "1.5 - 3" },
        { label: "Low", value: "pb_0_75_1_5", desc: "0.75 - 1.5" },
        { label: "Very Low", value: "pb_0_75", desc: "< 0.75" },
      ],
    },

    {
      key: "peg",
      label: "PEG",
      options: [
        { label: "Extremely High", value: "peg_3", desc: "Above 3" },
        { label: "Very High", value: "peg_2_3", desc: "2 - 3" },
        { label: "High", value: "peg_1_5_2", desc: "1.5 - 2" },
        { label: "Moderate", value: "peg_1_1_5", desc: "1 - 1.5" },
        { label: "Low", value: "peg_0_5_1", desc: "0.5 - 1" },
      ],
    },

    {
      key: "divYield",
      label: "Div Yield",
      options: [
        { label: "Exceptional", value: "div_15", desc: "Above 15%" },
        { label: "Very High", value: "div_10_15", desc: "10% - 15%" },
        { label: "High", value: "div_6_10", desc: "6% - 10%" },
        { label: "Moderate", value: "div_4_6", desc: "4% - 6%" },
        { label: "Low", value: "div_2_4", desc: "2% - 4%" },
        { label: "Very Low", value: "div_0_2", desc: "0% - 2%" },
        { label: "No Dividend", value: "div_0", desc: "0%" },
      ],
    },

    {
      key: "debtEq",
      label: "Debt / Equity",
      options: [
        { label: "Debt-free", value: "de_0_0_1", desc: "0 – 0.1x" },
        { label: "Low", value: "de_0_1_0_5", desc: "0.1x – 0.5x" },
        { label: "Moderate", value: "de_0_5_1", desc: "0.5x – 1x" },
        { label: "High", value: "de_1_2", desc: "1x – 2x" },
        { label: "Very High", value: "de_2_4", desc: "2x – 4x" },
        { label: "Dangerously High", value: "de_4", desc: "4x+" },
      ],
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 2,
        py: 1,
        borderBottom: "1px solid #EEEEEE",
        backgroundColor: "#fff",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      {/* Analyst */}
      <DropdownFilter
        label={FILTERS[0].label}
        value={filters[FILTERS[0].key] || "any"}
        options={FILTERS[0].options}
        onChange={(val) =>
          setFilters((prev) => ({
            ...prev,
            [FILTERS[0].key]: val,
          }))
        }
      />

      <AlphaDecodeFilter alphadecodeFilter = {alphadecodeFilter} setAlphadecodeFilter = {setAlphadecodeFilter}/>

      {/* Rest Filters */}
      {FILTERS.slice(1).map((filter) =>
        filter.multi ? (
          <MultiSelectFilter
            key={filter.key}
            label={filter.label}
            options={filter.options}
            selected={filters[filter.key] || []} // ✅ FIXED
            onChange={(val) =>
              setFilters((prev) => ({
                ...prev,
                [filter.key]: val,
              }))
            }
          />
        ) : (
          <DropdownFilter
            key={filter.key}
            label={filter.label}
            value={filters[filter.key] || "any"}
            options={filter.options}
            onChange={(val) =>
              setFilters((prev) => ({
                ...prev,
                [filter.key]: val,
              }))
            }
          />
        )
      )}
    </Box>
  );
}