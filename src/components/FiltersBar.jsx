import { Box, Chip, Select, MenuItem, InputBase } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid-pro";

const FiltersBar = ({ changePct, setChangePct }) => {
  const filterOptions = [
    ["Change %", "change"],
    ["PE", "pe"],
    ["PB", "pb"],
    ["Div yield", "div"],
    ["Debt /equity ratio", "de"],
    ["Price change %", "pc"],
  ];

  return (
    <GridToolbarContainer sx={{ p: 1, gap: 1, flexWrap: "wrap" }}>
      <Chip label="Market in uptrend" size="small" sx={{ fontWeight: 600 }} />
      <Box sx={{ flex: 1 }} />
      {filterOptions.map(([label, value]) => (
        <Select
          key={value}
          size="small"
          value={value === "change" ? changePct : "any"}
          onChange={(e) =>
            value === "change" ? setChangePct(e.target.value) : null
          }
          input={<InputBase />}
          sx={{
            border: "1px solid #ddd",
            borderRadius: 1,
            fontSize: 13,
            px: 1,
            height: 30,
          }}
        >
          <MenuItem value={value === "change" ? "any" : "any"}>
            {label}
          </MenuItem>
          {value === "change" && (
            <>
              <MenuItem value="pos">Positive</MenuItem>
              <MenuItem value="neg">Negative</MenuItem>
            </>
          )}
        </Select>
      ))}
    </GridToolbarContainer>
  );
};

export default FiltersBar;