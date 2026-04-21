// components/cells/SymbolCell.jsx

import { Box, Typography } from "@mui/material";

export const SymbolCell = ({ row }) => {
  const name = (row.name || "").toUpperCase();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "100%",
        justifyContent: "flex-start", // Force left alignment
      }}
    >
      {/* logo */}
      <Box
        component="img"
        src={row.logo || "/stock_demo.png"}
        alt={name}
        sx={{
          width: 24,
          height: 24,
          borderRadius: "5px",
          objectFit: "cover",
          backgroundColor: "#F2F2F2",
          border: "1px solid #e5e5e5",
          flexShrink: 0, // Prevent shrinking
        }}
      />

      {/* ticker chip */}
      <Box
        sx={{
          height: 24,
          px: "4px",
          borderRadius: "3px",
          bgcolor: "#F2F2F2",
          fontSize: "12px",
          fontWeight: 700,
          display: "inline-flex",
          alignItems: "center",
          lineHeight: 1,
          textTransform: "uppercase",
          color: "#111",
          flexShrink: 0,
          transition: "all 0.2s",
          ".MuiDataGrid-row:hover &": {
            bgcolor: "#1976d2",
            color: "#fff",
          },
        }}
      >
        {row.symbol}
      </Box>

      {/* company name with hover blue */}
      <Typography
        title={name}
        sx={{
          fontSize: "14px",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: "#000",
          lineHeight: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          transition: "color 0.2s",
          flex: 1, // Take remaining space
          textAlign: "left", // Force left alignment
          "&:hover": {
            color: "#1e88e5",
            cursor: "pointer",
          },
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};