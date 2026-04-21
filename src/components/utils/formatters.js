// Utility functions for formatting and calculations

export const nf0 = (n) =>
  n == null ? "—" : Intl.NumberFormat("en-IN").format(Number(n));

export const nf2 = (n) =>
  n == null
    ? "—"
    : Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(
        Number(n)
      );

export const stop = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

export const capBucket = (cr) => {
  if (cr == null) return null;
  if (cr > 50000) return "Large Cap";
  if (cr >= 10000) return "Mid Cap";
  if (cr >= 1000) return "Small Cap";
  return "Micro Cap";
};

export const sectorScoreColor = (n) => {
  const v = Number(n);
  if (!isFinite(v)) return "#5f6368"; // gray when missing
  if (v >= 65) return "#337954"; // green
  if (v >= 45) return "#FF6A00"; // orange
  return "#D61515"; // red
};

export const colorForLetter = (x) => {
  const v = (x || "").toUpperCase();
  return v === "A"
    ? "#2e7d32"
    : v === "B"
    ? "#1e88e5"
    : v === "C"
    ? "#f57c00"
    : v === "D"
    ? "#d32f2f"
    : v === "E"
    ? "#7b1fa2"
    : "#5f6368";
};

export const fmtINR1 = (n) =>
  n == null || isNaN(Number(n))
    ? "—"
    : new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(Number(n));

export const fmtPct = (n) => {
  if (n == null || isNaN(Number(n))) return "—";
  const v = Number(n);
  const sign = v > 0 ? "+" : v < 0 ? "−" : "";
  return `${sign}${Math.abs(v).toFixed(2)}%`;
};

export const changeColor = (n) =>
  n == null || isNaN(Number(n))
    ? "#999"
    : Number(n) > 0
    ? "#2e7d32"
    : Number(n) < 0
    ? "#d32f2f"
    : "#5f6368";

export const multColor = (x) => {
  if (x == null || isNaN(Number(x))) return "#5f6368";
  const v = Number(x);
  if (v > 1) return "#2e7d32";
  if (v < 1) return "#d32f2f";
  return "#5f6368";
};

export const fmtINR0 = (n) => {
  if (n == null || isNaN(Number(n))) return "—";
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Number(n));
};

export const getLetterColor = (grade) => {
  switch (grade) {
    case "A":
      return "#2e7d32"; // Green
    case "B":
      return "#1976d2"; // Blue
    case "C":
      return "#ff6a00"; // Orange
    case "D":
      return "#d32f2f"; // Red
    case "E":
      return "#c62828"; // Dark Red
    default:
      return "#999"; // Grey fallback
  }
};

export const priceScoreColor = (n) => {
  const v = Number(n);
  if (!isFinite(v)) return "#5f6368"; // gray for missing
  if (v >= 65) return "#337954"; // green
  if (v >= 45) return "#FF6A00"; // orange
  return "#D61515"; // red
};

export const strengthLabel = (score) => {
  if (score == null || isNaN(score)) return null;
  if (score >= 75) return "Strong";
  if (score >= 45) return "Neutral";
  return "Weak";
};

export const strengthColor = (score) => {
  if (score == null || isNaN(score)) return "#5f6368"; // gray
  if (score >= 75) return "#2e7d32"; // green
  if (score >= 45) return "#f57c00"; // orange
  return "#d32f2f"; // red
};

export const trendIcon = (delta) => {
  if (delta == null || Number(delta) === 0) return "RemoveIcon";
  return Number(delta) > 0 ? "KeyboardArrowUpIcon" : "KeyboardArrowDownIcon";
};