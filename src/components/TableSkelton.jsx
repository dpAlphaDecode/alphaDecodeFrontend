import React from "react";
import { Box, Skeleton } from "@mui/material";

const columns = [
  "Symbol", "Market Cap", "Price (LTP)", "Change %", "Volume",
  "Avg Volume (50D)", "Volume Change %", "High (52W)", "Low (52W)",
  "P/E", "P/B", "PEG (TTM)", "Div Yield % (FY)", "Debt/Equity (FQ)",
  "Composite Rating", "EPS Rating", "RS Rating", "SMR Rating", "AD Rating",
  "IGPS Rating", "Industry", "Analyst Rating", "Sector"
];

const TableSkeleton = ({ rows = 10 }) => {
  return (
    <Box sx={{ overflowX: "auto", px: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        {columns.map((col, i) => (
          <Skeleton
            key={i}
            variant="text"
            width={140}
            height={25}
            sx={{ flexShrink: 0 }}
          />
        ))}
      </Box>

      {/* Rows */}
      {[...Array(rows)].map((_, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{ display: "flex", gap: 2, mb: 1 }}
        >
          {columns.map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              variant="rectangular"
              width={140}
              height={25}
              sx={{ borderRadius: 1, flexShrink: 0 }}
              animation="wave"
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default TableSkeleton;
