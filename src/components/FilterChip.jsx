"use client";

import { useState } from "react";
import { Box, Popover } from "@mui/material";

export default function FilterChip({ label }) {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          px: 1.4,
          py: 0.6,
          borderRadius: "5px",
          border: "1px solid #EAEAEA",
          backgroundColor: "#fff",
          fontSize: "0.75rem",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          whiteSpace: "nowrap",

          "&:hover": {
            backgroundColor: "#fafafa",
          },
        }}
      >
        {label}
        <span style={{ fontSize: "10px" }}>▾</span>
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: "6px",
            border: "1px solid #EAEAEA",
            p: 1,
          },
        }}
      >
        Dummy
      </Popover>
    </>
  );
}