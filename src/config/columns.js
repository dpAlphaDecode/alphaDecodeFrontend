import {
  Box,
  Typography,
  IconButton,
  InputBase,
  ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import {
  SymbolCell,
  CombineRatingCell,
  PriceCell,
  VolumeCell,
  MarketCapCell,
  PriceRatingCell,
  EarningRatingCell,
  SectorPriceRatingCell,
  LetterRatingCell,
  DivYieldCell,
  DebtEqCell,
  PECell,
  PBCell,
  PEGCell,
} from "../components/cells";
import { Header, HeaderWithHover } from "../components/ui";
import { nf0, nf2 } from "../components/utils/formatters"; // Fixed typo: utils not utilis

// Search Header Component
// const SymbolSearchHeader = ({ rows, symbolQuery, setSymbolQuery, symbolSearchOpen, setSymbolSearchOpen }) => {
//   const handleSearchClick = () => {
//     setSymbolSearchOpen(true);
//   };

//   const handleCloseSearch = () => {
//     setSymbolSearchOpen(false);
//     setSymbolQuery(""); // Clear search when closing
//   };

//   const handleClickAway = () => {
//     if (symbolSearchOpen && !symbolQuery.trim()) {
//       setSymbolSearchOpen(false);
//     }
//   };

//   if (symbolSearchOpen) {
//     return (
//       <ClickAwayListener onClickAway={handleClickAway}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: "25px", width: "100%" }}>
//           {/* <SearchIcon sx={{ fontSize: "20px", color: "#000000" }} /> */}
//           <InputBase
//             placeholder="Search symbol..."
//             value={symbolQuery}
//             onChange={(e) => setSymbolQuery(e.target.value)}
//             autoFocus
//             sx={{
//               flex: 1,
//               fontSize: 12,
//               "& .MuiInputBase-input": {
//                 padding: "2px 4px",
//                 fontSize: 12,
//               },
//             }}
//           />
//           <IconButton
//             size="small"
//             onClick={handleCloseSearch}
//             sx={{ padding: "2px" }}
//           >
//             <CloseIcon sx={{ fontSize: 14 }} />
//           </IconButton>
//         </Box>
//       </ClickAwayListener>
//     );
//   }

//   return (
//     <Box sx={{ display: "flex", alignItems: "center", gap: "25px", width: "100%" }}>
//       <IconButton
//         size="small"
//         onClick={handleSearchClick}
//         sx={{
//           padding: "0",
//           "&:hover": {
//             backgroundColor: "rgba(25, 118, 210, 0.04)",
//           }
//         }}
//       >
//         <SearchIcon sx={{ fontSize: "20px", color: "#000000" }} />
//       </IconButton>
//       <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
//         <Typography sx={{ fontSize: 14, fontWeight: 500, color: "#707070" }}>
//           Symbol
//         </Typography>
//         <Typography sx={{ fontSize: 11, fontWeight: 500, color: "#9aa0a6" }}>
//           {nf0(rows.length)}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// Option 2: Width-based animation (more subtle)
const SymbolSearchHeader = ({
  rows,
  symbolQuery,
  setSymbolQuery,
  symbolSearchOpen,
  setSymbolSearchOpen,
}) => {
  const handleSearchClick = () => {
    setSymbolSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setSymbolSearchOpen(false);
    setSymbolQuery(""); // Clear search when closing
  };

  const handleClickAway = () => {
    if (symbolSearchOpen && !symbolQuery.trim()) {
      setSymbolSearchOpen(false);
    }
  };

  if (symbolSearchOpen) {
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
            width: "100%",
            animation: "slideInRight 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
            "@keyframes slideInRight": {
              "0%": {
                transform: "translateX(20px)",
                opacity: 0,
              },
              "100%": {
                transform: "translateX(0)",
                opacity: 1,
              },
            },
          }}
        >
          <InputBase
            placeholder="Search symbol..."
            value={symbolQuery}
            onChange={(e) => setSymbolQuery(e.target.value)}
            autoFocus
            sx={{
              flex: 1,
              fontSize: 12,
              "& .MuiInputBase-input": {
                padding: "2px 4px",
                fontSize: 12,
              },
            }}
          />
          <IconButton
            size="small"
            onClick={handleCloseSearch}
            sx={{ padding: "2px" }}
          >
            <CloseIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      </ClickAwayListener>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "25px",
        width: "100%",
        animation: "slideInLeft 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
        "@keyframes slideInLeft": {
          "0%": {
            transform: "translateX(-20px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
      }}
    >
      <IconButton
        size="small"
        onClick={handleSearchClick}
        sx={{
          padding: "0",
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.04)",
          },
        }}
      >
        <SearchIcon sx={{ fontSize: "20px", color: "#000000" }} />
      </IconButton>
      <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: "#707070" }}>
          Symbol
        </Typography>
        <Typography sx={{ fontSize: 11, fontWeight: 500, color: "#9aa0a6" }}>
          {nf0(rows.length)}
        </Typography>
      </Box>
    </Box>
  );
};

export const createColumns = (
  rows,
  symbolQuery,
  setSymbolQuery,
  symbolSearchOpen,
  setSymbolSearchOpen
) => [
  {
    field: "symbol",
    width: 300,
    pinned: "left",
    sortable: true,
    disableColumnMenu: true,
    align: "left",
    headerAlign: "left",
    renderHeader: () => (
      <SymbolSearchHeader
        rows={rows}
        symbolQuery={symbolQuery}
        setSymbolQuery={setSymbolQuery}
        symbolSearchOpen={symbolSearchOpen}
        setSymbolSearchOpen={setSymbolSearchOpen}
      />
    ),
    renderCell: ({ row }) => <SymbolCell row={row} />,
  },
  {
    field: "combineScore",
    width: 100,
    sortable: true, // Enable sorting
    disableColumnMenu: true,
    align: "right",
    renderHeader: () => (
      <HeaderWithHover main="Combine" sub="Rating" fieldName="combineScore" />
    ),
    renderCell: ({ row }) => <CombineRatingCell row={row} />,
  },
  {
    field: "priceRating",
    width: 80,
    sortable: true, // Enable sorting
    disableColumnMenu: true,
    renderHeader: () => (
      <HeaderWithHover main="Price" sub="Rating" fieldName="priceRating" />
    ),
    align: "right",
    headerAlign: "right",
    renderCell: ({ row }) => <PriceRatingCell row={row} />,
  },
  {
    field: "earningRating",
    width: 80,
    sortable: true, // Enable sorting
    disableColumnMenu: true,
    align: "right",
    renderHeader: () => (
      <HeaderWithHover main="Earning" sub="Rating" fieldName="earningRating" />
    ),
    renderCell: ({ row }) => <EarningRatingCell row={row} />,
  },
  {
    field: "smrRating",
    width: 60,
    sortable: true, // Enable sorting
    disableColumnMenu: true,
    align: "right",
    renderHeader: () => (
      <HeaderWithHover main="SMR" sub="Rating" fieldName="smrRating" />
    ),
    renderCell: ({ row }) => <LetterRatingCell grade={row.smrRating} />,
  },
  {
    field: "instBuying",
    width: 100,
    sortable: true, // Enable sorting
    disableColumnMenu: true,
    align: "right",
    renderHeader: () => (
      <HeaderWithHover
        main="Institutional"
        sub="Buying Rating"
        fieldName="instBuying"
      />
    ),
    renderCell: ({ row }) => <LetterRatingCell grade={row.instBuying} />,
  },
  {
    field: "sectorPriceRating",
    width: 90,
    sortable: true,
    disableColumnMenu: true,
    renderHeader: () => (
      <HeaderWithHover
        main="Sector"
        sub="Price Rating"
        fieldName="sectorPriceRating"
      />
    ),
    align: "right",
    headerAlign: "right",
    // FIX: Replace 0 or null with "—"
    renderCell: ({ value }) => (
      <SectorPriceRatingCell
        value={value === 0 || value == null ? null : value}
      />
    ),
  },
  {
    field: "sector",
    headerName: "Sector",
    width: 160,
    sortable: true, // Enable sorting
    disableColumnMenu: true,
  },
  {
    field: "industry",
    headerName: "Industry",
    width: 220,
    sortable: true, // Enable sorting
    disableColumnMenu: true,
  },
  {
    field: "marketCap",
    width: 140,
    sortable: true, // Enable sorting
    disableColumnMenu: true,
    renderHeader: () => (
      <HeaderWithHover
        main="Market cap"
        sub="Cr (Category)"
        fieldName="marketCap"
      />
    ),
    align: "right",
    headerAlign: "right",
    renderCell: ({ row }) => <MarketCapCell row={row} />,
  },
  {
    field: "price",
    width: 130,
    minWidth: 120,
    sortable: true, // Enable sorting
    disableColumnMenu: true,
    renderHeader: () => (
      <HeaderWithHover
        main="Price LTP"
        sub="INR (Change %)"
        fieldName="price"
      />
    ),
    align: "right",
    headerAlign: "right",
    renderCell: ({ row }) => <PriceCell row={row} />,
  },
  {
    field: "todayVol",
    width: 200,
    minWidth: 180,
    sortable: true, // Enable sorting
    disableColumnMenu: true,
    renderHeader: () => (
      <HeaderWithHover
        main="Today's Volume"
        sub="(Avg. Volume) Multiplier"
        fieldName="todayVol"
      />
    ),
    align: "right",
    headerAlign: "right",
    renderCell: ({ row }) => <VolumeCell row={row} />,
  },
  {
  field: "pe",
  width: 60,
  headerName: "P/E",
  type: "number",
  align: "right",
  headerAlign: "right",
  sortable: true,
  disableColumnMenu: true,
  renderCell: ({ row }) => <PECell row={row} />,
},
{
  field: "pb",
  width: 60,
  headerName: "P/B",
  type: "number",
  align: "right",
  headerAlign: "right",
  sortable: true,
  disableColumnMenu: true,
  renderCell: ({ row }) => <PBCell row={row} />,
},
  {
  field: "peg",
  width: 110,
  headerName: "PEG (TTM)",
  type: "number",
  align: "right",
  headerAlign: "right",
  sortable: true,
  disableColumnMenu: true,
  renderCell: ({ row }) => <PEGCell row={row} />,
},
  {
    field: "divYield",
    width: 90,
    disableColumnMenu: true,
    renderHeader: () => (
      <HeaderWithHover main="Div Yield %" sub="FY" fieldName="divYield" />
    ),
    align: "right",
    headerAlign: "right",
    renderCell: ({ row }) => <DivYieldCell row={row} />,
  },
  {
    field: "debtEq",
    width: 100,
    renderHeader: () => (
      <HeaderWithHover main="Debt/equity" sub="FQ" fieldName="DebtEq" />
    ),
    sortable: true,
    disableColumnMenu: true,
    align: "right",
  headerAlign: "right",
    renderCell: ({ row }) => <DebtEqCell row={row} />,
    valueFormatter: (p) => nf2(p?.value),
  },
];
