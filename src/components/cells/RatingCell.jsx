import { Typography } from "@mui/material";
import { priceScoreColor, getLetterColor } from "../../utils/colors";

export const PriceRatingCell = ({ value }) => {
  const val = Number(value);
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


export const LetterRatingCell = ({ value }) => {
  return (
    <Typography
      sx={{
        fontWeight: 400,
        fontSize: 14,
        color: getLetterColor(value),
      }}
    >
      {value ?? "—"}
    </Typography>
  );
};
