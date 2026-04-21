import { Typography, Box } from "@mui/material";
import { fmtINR1 } from "../../utils/formatters";
import { multColor } from "../../utils/colors";

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
      <Box component="span" sx={{ fontSize: 14, color: "#777" }}>
        ({fmtINR1(avg)})
      </Box>{" "}
      <Box component="span" sx={{ fontSize: 14, color: multColor(mult) }}>
        {multText}
      </Box>
    </Typography>
  );
};
