import React from 'react';
import DropdownFilter from './DropdownFilter';
import RatingsFilterPopover from './RatingsFilterPopover';
import SearchBar from './ui/SearchBar';
import { Box } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

const FilterBar = () => {
  return (
    <div className="flex items-center overflow-visble gap-2 p-2  rounded-lg bg-white">
    
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
      <DropdownFilter label="Ratings" />
      <DropdownFilter label="Analyst Rating" />
      <DropdownFilter label="Marketcap Range" />
      <RatingsFilterPopover />
      <DropdownFilter label="Change %" />
      <DropdownFilter label="PE" />
      <DropdownFilter label="PB" />
      <DropdownFilter label="Div yield" />
      <DropdownFilter label="Debt/equity ratio" />
      <DropdownFilter label="Price change %" />
    </div>
  );
};

export default FilterBar;