import { Box, Typography } from "@mui/material";
import { fmtINR0 } from "../../utils/formatters";

export const MarketCapCell = ({ row }) => {
  const cap = row.marketCap;
  const cat = row.marketCapCategory;

  return (
    <Box sx={{ textAlign: "right", width: "100%" }}>
      <Typography sx={{ fontSize: 14, fontWeight: 400, color: "#000" }}>
        {fmtINR0(cap)}
      </Typography>
      <Typography sx={{ fontSize: 10, color: "#777", lineHeight: 1 }}>
        {cat ? `(${cat})` : "—"}
      </Typography>
    </Box>
  );
};
