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

export const priceScoreColor = (n) => {
  const v = Number(n);
  if (!isFinite(v)) return "#5f6368";
  if (v >= 65) return "#337954";
  if (v >= 45) return "#FF6A00";
  return "#D61515";
};

export const sectorScoreColor = (n) => {
  const v = Number(n);
  if (!isFinite(v)) return "#5f6368";
  if (v >= 65) return "#337954";
  if (v >= 45) return "#FF6A00";
  return "#D61515";
};

export const getLetterColor = (grade) => {
  switch (grade) {
    case "A": return "#2e7d32";
    case "B": return "#1976d2";
    case "C": return "#ff6a00";
    case "D": return "#d32f2f";
    case "E": return "#c62828";
    default: return "#999";
  }
};

export const strengthColor = (score) => {
  if (score == null || isNaN(score)) return "#5f6368";
  if (score >= 75) return "#2e7d32";
  if (score >= 45) return "#f57c00";
  return "#d32f2f";
};
