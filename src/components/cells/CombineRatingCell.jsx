import { Box, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveIcon from "@mui/icons-material/Remove";

export const CombineRatingCell = ({ row }) => {
  const score = Number(row.combineScore ?? null);
  const delta = Number(row.combineDelta ?? null);

  if (!score || isNaN(score)) {
    return <Typography sx={{ color: "#999" }}>—</Typography>;
  }

  let label = "Weak";
  let color = "#d32f2f";
  if (score >= 75) {
    label = "Strong";
    color = "#2e7d32";
  } else if (score >= 45) {
    label = "Neutral";
    color = "#f57c00";
  }

  let Icon = RemoveIcon;
  if (delta > 0) Icon = KeyboardArrowUpIcon;
  else if (delta < 0) Icon = KeyboardArrowDownIcon;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        fontWeight: 700,
        color,
        fontSize: "0.875rem",
      }}
    >
      <Icon sx={{ fontSize: 16 }} />
      {score.toFixed(0)}{" "}
      <span style={{ fontWeight: 500 }}>({label})</span>
    </Box>
  );
};

// components/cells/PriceCell.jsx
import { Typography, Box } from "@mui/material";
import { fmtINR1, fmtPct } from "../../utils/formatters";
import { changeColor } from "../../utils/colors";

export const PriceCell = ({ row }) => {
  const price = row.price;
  const chgPct = row.changePct;

  return (
    <Typography
      sx={{
        width: "100%",
        textAlign: "right",
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {fmtINR1(price)}{" "}
      <Box
        component="span"
        sx={{ fontSize: 10, color: changeColor(chgPct) }}
      >
        ({fmtPct(chgPct)})
      </Box>
    </Typography>
  );
};
