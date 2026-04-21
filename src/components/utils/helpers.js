export const capBucket = (cr) => {
  if (cr == null) return null;
  if (cr > 50000) return "Large Cap";
  if (cr >= 10000) return "Mid Cap";
  if (cr >= 1000) return "Small Cap";
  return "Micro Cap";
};

export const strengthLabel = (score) => {
  if (score == null || isNaN(score)) return null;
  if (score >= 75) return "Strong";
  if (score >= 45) return "Neutral";
  return "Weak";
};
