import { Box, Typography,Tooltip } from "@mui/material";
import { useState } from "react";

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

export const TickerChip = ({ text }) => (
  <Box
    sx={{
      height: 24,
      px: 1,
      borderRadius: "5px",
      bgcolor: "#F2F2F2",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#111",
      textTransform: "uppercase",
      lineHeight: 1,
      minWidth: 48,
    }}
  >
    {text}
  </Box>
);

export const Pill = ({ label, color, minW = 36 }) => (
  <Box
    sx={{
      minWidth: minW,
      height: 22,
      px: 1,
      borderRadius: "999px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12,
      fontWeight: 700,
      color: "#fff",
      backgroundColor: color,
    }}
  >
    {label ?? "-"}
  </Box>
);

export const Header = ({ main, sub }) => (
  <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
    <Typography sx={{ fontSize: 12, fontWeight: 500, color: "#222" }}>
      {main}
    </Typography>
    {sub ? (
      <Typography sx={{ fontSize: 11, fontWeight: 500, color: "#9aa0a6" }}>
        {sub}
      </Typography>
    ) : null}
  </Box>
);

export const PriceRatingCell = ({ value }) => (
  <Typography
    sx={{
      fontWeight: 700,
      fontSize: 14,
      color: "#111",
      textAlign: "right",
      width: "100%",
    }}
  >
    {value == null || isNaN(Number(value)) ? "—" : Number(value).toFixed(0)}
  </Typography>
);


// export const HeaderWithHover = ({ main, sub, fieldName }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <Box
//       sx={{ 
//         display: "flex", 
//         flexDirection: "column", 
//         lineHeight: 1,
//         position: "relative",
//         width: "100%",
//         height: "100%",
//         alignItems: "flex-end",
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Typography sx={{ fontSize: 12, fontWeight: 500, color: "#222" }}>
//         {main}
//       </Typography>
//       {sub && (
//         <Typography sx={{ fontSize: 11, fontWeight: 500, color: "#9aa0a6" }}>
//           {sub}
//         </Typography>
//       )}
      
//       {/* Hover Badge - positioned at TOP */}
//       {isHovered && (
//         <Box
//           sx={{
//             position: "absolute",
//             top: -6, // Position at the top
//             left: 0,
//             backgroundColor: "#333",
//             color: "#fff",
//             fontSize: 10,
//             fontWeight: 500,
//             px: 0.75,
//             py: 0.25,
//             borderRadius: 1,
//             textTransform: "capitalize",
//             zIndex: 1000,
//             pointerEvents: "none",
//             animation: "fadeIn 0.15s ease-in",
//             "@keyframes fadeIn": {
//               from: { opacity: 0, transform: "translateY(-2px)" },
//               to: { opacity: 1, transform: "translateY(0)" },
//             },
//           }}
//         >
//           {fieldName}
//         </Box>
//       )}
//     </Box>
//   );
// };


// export const HeaderWithHover = ({ main, sub, fieldName }) => {
//   return (
//     <Tooltip
//       title={fieldName}
//       placement="top"             // show above
//       arrow                      // small arrow like your screenshot
//       enterDelay={150}
//       PopperProps={{
//         modifiers: [{ name: "offset", options: { offset: [0, 8] } }], // a little gap
//       }}
//       slotProps={{
//         popper: { sx: { zIndex: 2000 } }, // over the grid headers
//         tooltip: { sx: { fontSize: 11, fontWeight: 600, textTransform: "capitalize" } }
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           lineHeight: 1,
//           width: "100%",
//           height: "100%",
//           alignItems: "flex-end",
//           cursor: "default",
//         }}
//       >
//         <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#707070" }}>{main}</Typography>
//         {sub && (
//           <Typography sx={{ fontSize: 10, fontWeight: 500, color: "#9aa0a6" }}>
//             {sub}
//           </Typography>
//         )}
//       </Box>
//     </Tooltip>
//   );
// };


export const HeaderWithHover = ({ main, sub, fieldName }) => (
  <Tooltip
    title={fieldName}
    placement="top"
    arrow
    enterDelay={150}
    slotProps={{
      popper: { sx: { zIndex: 2000 } },
      tooltip: { sx: { fontSize: 11, fontWeight: 600, textTransform: "capitalize" } },
    }}
  >
    <Box
      title=""  // <— prevents native browser tooltip on this container
      sx={{
        display: "flex",
        flexDirection: "column",
        lineHeight: 1,
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        cursor: "default",
      }}
    >
      <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#707070" }}>{main}</Typography>
      {sub && (
        <Typography sx={{ fontSize: 10, fontWeight: 500, color: "#9aa0a6" }}>
          {sub}
        </Typography>
      )}
    </Box>
  </Tooltip>
);
