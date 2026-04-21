"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import "./lib/mui-x-license";

import FiltersBar from "./FiltersBar";
import { useStockData, useProcessedStockData } from "../hooks/useStockData";
import { createColumns } from "../config/columns";

import { COLORS, SIZES } from "./styles";
export default function StockTable() {
  // Add mounted state to prevent hydration issues
  const [mounted, setMounted] = useState(false);

  // State for filters
  const [changePct, setChangePct] = useState("any");
  const [symbolQuery, setSymbolQuery] = useState("");
  const [symbolSearchOpen, setSymbolSearchOpen] = useState(false);

  // Custom hooks for data management
  const { rowsRaw, loading, handleRowsScrollEnd } = useStockData();
  const processedRows = useProcessedStockData(rowsRaw, changePct, symbolQuery);

  // Column configuration with search states
  const columns = createColumns(
    processedRows,
    symbolQuery,
    setSymbolQuery,
    symbolSearchOpen,
    setSymbolSearchOpen
  );

  // Only render after client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading during SSR
  if (!mounted) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Loading...</div>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <DataGridPro
        rows={processedRows}
        columns={columns}
        checkboxSelection={false}
        rowBuffer={8}
        rowThreshold={12}
        columnHeaderHeight={60}
        loading={loading}
        onRowsScrollEnd={handleRowsScrollEnd}
        slots={{
          toolbar: () => (
            <FiltersBar changePct={changePct} setChangePct={setChangePct} />
          ),
        }}
        disableColumnResize
        disableColumnMenu
        disableColumnSelector
        disableColumnFilter
        hideFooter
        density="compact"
        rowHeight={58}
        pinnedColumns={{ left: ["symbol"] }}
        // Additional props to remove borders
        showCellVerticalBorder={false}
        showColumnVerticalBorder={false}
        showRowHorizontalBorder={false}
        disableVirtualization={false}
        sx={{
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',

          "& .MuiDataGrid-columnHeaderTitleContainerContent":{
            width:"100% !important"
          },
          "& .MuiDataGrid-columnHeader[data-field='pe'] .MuiDataGrid-columnHeaderTitleContainerContent": {
            justifyContent: "end",
          },
          
          "& .MuiDataGrid-columnHeader[data-field='pb'] .MuiDataGrid-columnHeaderTitleContainerContent": {
            justifyContent: "end",
          },
          
          "& .MuiDataGrid-columnHeader[data-field='peg'] .MuiDataGrid-columnHeaderTitleContainerContent": {
            justifyContent: "end",
          },
          
          
          "& .MuiDataGrid-columnHeader[data-field='debtEq'] .MuiDataGrid-columnHeaderTitleContainerContent": {
            justifyContent: "end",
          },



         "& .MuiDataGrid-row": {
           borderBottom: "1px solid #ebebeb !important",
         },

          // Column header hover effects
          "& .MuiDataGrid-columnHeader:hover": {
            backgroundColor: "#f5f5f5 !important",
          },

          // Hide sort icons by default
          "& .MuiDataGrid-sortIcon": {
            opacity: 0,
            transition: "opacity 0.2s ease",
          },

          // Show sort icons on hover
          "& .MuiDataGrid-columnHeader:hover .MuiDataGrid-sortIcon": {
            opacity: 1,
          },

          // Style the sort icon
          "& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon": {
            fontSize: "16px",
            color: "#666",
          },


          "& .MuiDataGrid-menuIconButton": {
            display: "none !important",
          },

          "& .MuiDataGrid-columnSeparator": {
            display: "none !important",
          },

          // Remove cell borders
          "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
            borderRight: "none !important",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 500,
          },

          "& .MuiDataGrid-sortIcon": {
            display: "none !important",
          },

          "& .MuiDataGrid-menuIconButton": {
            display: "none !important",
          },

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#fff",
            borderBottom: "1px solid #ddd",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#666",
          },

          "& .MuiDataGrid-pinnedColumnHeaders, & .MuiDataGrid-pinnedColumns": {
            backgroundColor: "#fff",
            boxShadow: "inset -1px 0 0 #e5e5e5",
            zIndex: 2,
          },

          "& .MuiDataGrid-columnHeaderTitleContainer": {
            overflow: "visible !important",
            whiteSpace: "normal !important",
            lineHeight: 1.1,
          },

          "& .MuiDataGrid-cell[data-field='symbol']": {
            paddingTop: "10px !important",
            paddingBottom: "10px !important",
            paddingLeft: "22px !important",
            paddingRight: "7px !important",
          },
          "& .MuiDataGrid-row": { 
            maxHeight: '42px !important', height: "42px !important",minHeight: "42px !important"
           },
          // hover grey
          "& .MuiDataGrid-row:hover": { backgroundColor: "#fafafa" },

          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "#e3effd !important",
          },
          "& .MuiDataGrid-row.Mui-selected:hover": {
            backgroundColor: "#d6e7fc !important",
          },
          "& .MuiDataGrid-row.Mui-selected .MuiDataGrid-cell": {
            backgroundColor: "inherit !important",
          },

          "& .MuiDataGrid-columnHeader[data-field='price'], \
  .MuiDataGrid-cell[data-field='price'], \
  .MuiDataGrid-columnHeader[data-field='todayVol'], \
  .MuiDataGrid-cell[data-field='todayVol']": {
            justifyContent: "flex-end",
          },

          "& .MuiDataGrid-columnHeader[data-field='symbol']": {
            paddingLeft: "22px !important",
            paddingRight: "7px !important",
          },

          // remove focus outlines
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
            { outline: "none" },

          // general cell text
          "& .MuiDataGrid-cell": {
            fontSize: "0.8125rem",
            px: 1,
            display: "flex",
            alignItems: "center",
            color:'#000',
          },
        }}
      />
    </Box>
  );
}
