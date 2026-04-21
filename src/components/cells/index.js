import { Box, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveIcon from "@mui/icons-material/Remove";
import { 
  fmtINR1, 
  fmtPct, 
  changeColor, 
  multColor, 
  fmtINR0, 
  priceScoreColor,
  sectorScoreColor,
  getLetterColor 
} from "../utils/formatters";



export const SymbolCell = ({ row }) => {
  const name = (row.name || "").toUpperCase();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "100%",
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
        }}
      />

      {/* ticker chip */}
      <Box
        sx={{
          fontFamily: "Roboto, sans-serif", // ✅ Add Roboto font
          px: "7px",
          py: "6px",
          borderRadius: "5px",
          bgcolor: "#F2F2F2",
          fontSize: "12px",
          fontWeight: 900,
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
          fontFamily: "Roboto, sans-serif", // ✅ Add Roboto font
          fontSize: "14px",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: "#000",
          lineHeight: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          transition: "color 0.2s",
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

// export const CombineRatingCell = ({ row }) => {
//   const score = Number(row.combineScore);
//   const delta = Number(row.combineDelta ?? 0);

//   if (!isFinite(score)) {
//     return <Typography sx={{ color: "#999", textAlign: "right", width: "100%" }}>—</Typography>;
//   }

//   let label = "Weak";
//   let color = "#d32f2f"; // red
//   if (score >= 75)      { label = "Strong";  color = "#2e7d32"; } // green
//   else if (score >= 45) { label = "Neutral"; color = "#f57c00"; } // orange

//   const Icon = delta > 0 ? KeyboardArrowUpIcon : delta < 0 ? KeyboardArrowDownIcon : RemoveIcon;

//   return (
//     <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontWeight: 700, color, fontSize: 14, justifyContent: "flex-end" }}>
//       <Icon sx={{ fontSize: 16 }} />
//       {score.toFixed(0)} <span style={{ fontWeight: 500 }}>({label})</span>
//     </Box>
//   );
// };


export const CombineRatingCell = ({ row }) => {
  const score = Number(row.combineScore);
  const delta = Number(row.combineDelta ?? 0);
  
  if (!isFinite(score)) {
    return <Typography sx={{ color: "#999", textAlign: "right", width: "100%" }}>—</Typography>;
  }
  
  // Determine label and color based on score
  let label = "Weak";
  let color = "#d32f2f"; // red for Weak
  let defaultIcon = KeyboardArrowDownIcon; // default for Weak
  
  if (score >= 75) {
    label = "Strong";
    color = "#2e7d32"; // green for Strong
    defaultIcon = KeyboardArrowUpIcon; // default for Strong
  } else if (score >= 45) {
    label = "Neutral";
    color = "#ed6c02"; // orange for Neutral
    defaultIcon = RemoveIcon; // default for Neutral
  }
  
  // Use delta if available, otherwise use default icon based on label
  const Icon = delta !== 0 
    ? (delta > 0 ? KeyboardArrowUpIcon : KeyboardArrowDownIcon)
    : defaultIcon;
  
  return (
    <Box sx={{ 
      display: "flex", 
      alignItems: "center", 
      gap: 0.5, 
      fontWeight: 700, 
      color, 
      fontSize: 14, 
      justifyContent: "flex-end" 
    }}>
      <Icon sx={{ fontSize: 16 }} />
      {score.toFixed(0)} <span style={{ fontWeight: 500 }}>({label})</span>
    </Box>
  );
};

export const PriceCell = ({ row }) => {
  const price = row.price;
  const last  = Number(row.price_last);

    const chgPct = isFinite(price) && isFinite(last) && last > 0
    ? (price - last) / last
    : null;


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
        sx={{ fontSize: 11,fontWeight: 500, color: changeColor(chgPct) }}
      >
        ({fmtPct(chgPct)})
      </Box>
    </Typography>
  );
};

export const VolumeCell = ({ row }) => {
  const today = row.todayVol;
  const avg = row.avgVol;
  const mult = row.multX ?? (avg ? Number(today) / Number(avg) : null);
  const multText = mult == null || !isFinite(mult) ? "—" : `${mult.toFixed(0)}X`;

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
      {fmtINR1(today)}{" "}
      <Box component="span" sx={{ fontSize: 14, color: "#000" }}>
        ({fmtINR1(avg)})
      </Box>{" "}
      <Box
        component="span"
        sx={{ fontSize: 10, color: multColor(mult) }}
      >
        {multText}
      </Box>
    </Typography>
  );
};

export const DivYieldCell = ({ row }) => {
  // accept a few possible shapes
  const raw =
    row.divYield ??
    row.div_yield ??
    row.metrics?.divYield ??
    null;

  const value = Number(raw);
  // Heuristic: if it's > 1.5, assume already in % (e.g., 3.2) and convert to fraction
  // const frac = Number.isFinite(n) ? (n > 1.5 ? n / 100 : n) : null;

  // simple coloring: <2% = neutral, 2–8% = green, >8% = red (possible trap)
  const color =
    !Number.isFinite(value)
      ? "#999"
      : value >= 8
      ? "#c62828" // high (possible trap)
      : value >= 2
      ? "#2e7d32" // healthy
      : "#ff8f00"; // low

  return (
    <Typography
      sx={{
        width: "100%",
        textAlign: "right",
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: "-0.01em",
        color,
      }}
      title={
        !Number.isFinite(value) ? "—" : `${value.toFixed(2)}%`
      }
    >
      {!Number.isFinite(value) ? "—" : `${value.toFixed(2)}%`}
    </Typography>
  );
};



export const MarketCapCell = ({ row }) => {
  const cap = row.marketCap;
  const cat = row.capBucket; // <-- was marketCapCategory

  return (
    <Box sx={{ textAlign: "right", width: "100%" }}>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 400,
          color: "#000",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px", // space between number & category
        }}
      >
        {fmtINR0(cap)}
        {cat && (
          <Box component="span" sx={{ fontSize: 11,fontWeight: 500, color: "#000" }}>
            ({cat})
          </Box>
        )}
      </Typography>
    </Box>
  );
};


export const PriceRatingCell = ({ row }) => {
  const val = Number(row.priceRating);
  const text = isFinite(val) ? val.toFixed(0) : "—";
  return (
    <Typography
      sx={{
        width: "100%",
        textAlign: "right",
        fontSize: "14px",
        fontWeight: 400,
        letterSpacing: "-0.01em",
        color: priceScoreColor(val),
      }}
    >
      {text}
    </Typography>
  );
};

export const EarningRatingCell = ({ row }) => {
  const val = row.earningRating;
  let color = "#999";
  if (val != null) {
    if (val >= 70) color = "#2e7d32";
    else if (val >= 40) color = "#ff6a00";
    else color = "#d32f2f";
  }

  return (
    <Typography
      sx={{
        color,
        fontWeight: 600,
        fontSize: 14,
        textAlign: "center",
        width: "100%",
      }}
    >
      {val != null ? val : "—"}
    </Typography>
  );
};

export const SectorPriceRatingCell = ({ value }) => {
  const v = Number(value);
  const text = isFinite(v) ? v.toFixed(0) : "—";
  return (
    <Typography
      sx={{ width: "100%", textAlign: "right", fontSize: 14, fontWeight: 400, letterSpacing: "-0.01em", color: sectorScoreColor(isFinite(v) ? v : null) }}
    >
      {text}
    </Typography>
  );
};


export const LetterRatingCell = ({ grade }) => (
  <Typography
    sx={{
      fontWeight: 400,
      fontSize: 14,
      color: getLetterColor(grade),
    }}
  >
    {grade ?? "—"}
  </Typography>
);


export const DebtEqCell = ({ row }) => {
  const raw =
    row.debtEq ??
    row.debt_eq ??
    row.metrics?.debtEq ??
    null;

  const val = Number(raw);

  return (
    <Typography
      sx={{
        width: "100%",
        textAlign: "right",
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: "-0.01em",
      }}
      title={Number.isFinite(val) ? `${val.toFixed(2)}` : "—"}
    >
      {Number.isFinite(val) ? val.toFixed(2) : "—"}
    </Typography>
  );
};





export const PECell = ({ row }) => {
  const raw = row.pe ?? row.PE ?? row.metrics?.pe ?? null;
  const val = Number(raw);
  
  const displayValue = Number.isFinite(val) ? val.toFixed(2) : "—";
  
  return (
    <Typography
      sx={{
        width: "100%",
        textAlign: "right",
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: "-0.01em",
        color: "#000", // Fixed black color
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={Number.isFinite(val) ? `P/E: ${val.toFixed(2)}` : "P/E: Not available"}
    >
      {displayValue}
    </Typography>
  );
};


export const PBCell = ({ row }) => {
  const raw = row.pb ?? row.pb ?? row.metrics?.pb ?? null;
  const val = Number(raw);
  
  const displayValue = Number.isFinite(val) ? val.toFixed(2) : "—";
  
  return (
    <Typography
      sx={{
        width: "100%",
        textAlign: "right",
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: "-0.01em",
        color: "#000", // Fixed black color
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={Number.isFinite(val) ? `P/B: ${val.toFixed(2)}` : "P/B: Not available"}
    >
      {displayValue}
    </Typography>
  );
};


export const PEGCell = ({ row }) => {
  const raw = row.peg ?? row.PEG ?? row.metrics?.peg ?? null;
  const val = Number(raw);
  
  const displayValue = Number.isFinite(val) ? val.toFixed(2) : "—";
  
  return (
    <Typography
      sx={{
        width: "100%",
        textAlign: "right",
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: "-0.01em",
        color: "#000", // Fixed black color
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={Number.isFinite(val) ? `PEG (TTM): ${val.toFixed(2)}` : "PEG (TTM): Not available"}
    >
      {displayValue}
    </Typography>
  );
};

