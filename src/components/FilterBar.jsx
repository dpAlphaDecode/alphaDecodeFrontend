import React from 'react';
import DropdownFilter from './DropdownFilter';
import RatingsFilterPopover from './RatingsFilterPopover';
import SearchBar from './ui/SearchBar';
import { Box } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

const FilterBar = () => {
  return (
    <div className="flex items-center overflow-visible gap-2 p-2  rounded-lg bg-white">
    
    <Box
  sx={{
    display: "flex",
    alignItems: "center",
 
    "&:focus-within": {
      borderColor: "#1976d2",
  
    },
  }}
>

</Box>
      <DropdownFilter label="Analyst rating" />
      <RatingsFilterPopover />
      <DropdownFilter label="Change %" />
      <DropdownFilter label="Sector" />
      <DropdownFilter label="Industry" />
      <DropdownFilter label="MarketCap" />
      <DropdownFilter label="PE" />
      <DropdownFilter label="PB" />
      <DropdownFilter label="PEG" />
      <DropdownFilter label="Div Yeld" />
      <DropdownFilter label="Debt/equity" />
    </div>
  );
};

export default FilterBar;