import { Box, Typography } from "@mui/material";

export const Header = ({ main, sub }) => (
  <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
    <Typography sx={{ fontSize: 12, fontWeight: 500, color: "#222" }}>
      {main}
    </Typography>
    {sub && (
      <Typography sx={{ fontSize: 11, fontWeight: 500, color: "#9aa0a6" }}>
        {sub}
      </Typography>
    )}
  </Box>
);
