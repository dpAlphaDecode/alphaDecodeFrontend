import { Box } from "@mui/material";

export const LogoSquare = ({ src, alt }) => (
  <Box
    component="img"
    src={src || "/placeholder-logo.png"}
    alt={alt || ""}
    sx={{
      width: 24,
      height: 24,
      borderRadius: "5px",
      objectFit: "cover",
      backgroundColor: "#F2F2F2",
      border: "1px solid #e5e5e5",
    }}
  />
);
