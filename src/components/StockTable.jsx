"use client";

import {useEffect, useMemo, useState} from "react";
import {Box, Popover} from "@mui/material";
import {DataGridPro} from "@mui/x-data-grid-pro";
import WatchlistPopover from "./WatchlistModal";
import "./lib/mui-x-license";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import AnalystFilterBar from "./AnalystFilterBar";
import {useProcessedStockData, useStockData} from "@/hooks/useStockData";
import {createColumns} from "@/config/columns";


// ✅ ✅ CLEAN CUSTOM TOOLBAR (NO STYLE CONFLICT)


export default function StockTable() {
    const [mounted, setMounted] = useState(false);

    // Filters
    const [changePct, setChangePct] = useState("any");
    const [symbolQuery, setSymbolQuery] = useState("");
    const [symbolSearchOpen, setSymbolSearchOpen] = useState(false);
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const [filters, setFilters] = useState({
        analyst: "any",
        changePct: "any",
        marketCap: "any",
        pe: "any",
        pb: "any",
        peg: "any",
        divYield: "any",
        debtEq: "any",
    });

    const [alphadecodeFilter, setAlphadecodeFilter] = useState({
        price: [0, 100],
        sector: [0, 100],
        earning: [0, 100],
        institutional: [],
        smr: [],
    });

    // Data
    const {rowsRaw, loading, handleRowsScrollEnd} = useStockData();
    let processedRows = useProcessedStockData(
        rowsRaw,
        changePct,
        symbolQuery
    );

    // ✅ Sector options
    const sectorOptions = useMemo(() => {
        return [
            ...new Set(
                processedRows?.map((row) => row.sector)?.filter(Boolean)
            ),
        ]; // ✅ return plain array
    }, [processedRows]);

    // ✅ Industry options
    const industryOptions = useMemo(() => {
        return [
            ...new Set(
                processedRows?.map((row) => row.industry)?.filter(Boolean)
            ),
        ]; // ✅ return plain array
    }, [processedRows]);

    const CustomToolbar = ({filters, setFilters, alphadecodeFilter, setAlphadecodeFilter}) => {
        return (
            <Box
                sx={{
                    width: "100%",
                    px: 2,
                    py: 1,
                    borderBottom: "1px solid #e5e5e5",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                }}
            >
                <AnalystFilterBar filters={filters} setFilters={setFilters} sectorOptions={sectorOptions}
                                  industryOptions={industryOptions} alphadecodeFilter={alphadecodeFilter}
                                  setAlphadecodeFilter={setAlphadecodeFilter}/>
            </Box>
        );
    };


    // ✅ FILTER LOGIC
    const finalRows = useMemo(() => {
        if (filters.marketCap !== "any") {
            console.log(filters.marketCap)
            if (filters.marketCap === "large") {
                processedRows = processedRows.filter((row) => row.marketCap != null)
                    .sort((a, b) => Number(b.marketCap) - Number(a.marketCap)).slice(0, 100)
            }
            if (filters.marketCap === "mid") {
                processedRows = processedRows.filter((row) => row.marketCap != null)
                    .sort((a, b) => Number(b.marketCap) - Number(a.marketCap)).slice(100, 250)
            }
            if (filters.marketCap === "Small") {
                processedRows = processedRows.filter((row) => row.marketCap != null)
                    .sort((a, b) => Number(b.marketCap) - Number(a.marketCap)).slice(251, 500)
            }
            if (filters.marketCap === "micro") {
                processedRows = processedRows.filter((row) => row.marketCap != null)
                    .sort((a, b) => Number(b.marketCap) - Number(a.marketCap)).slice(500, 750)
            }
            if (filters.marketCap === "nano") {
                processedRows = processedRows.filter((row) => row.marketCap != null)
                    .sort((a, b) => Number(b.marketCap) - Number(a.marketCap)).slice(750,)
            }
        }
        return processedRows.filter((row) => {
            // 🔹 Analyst
            console.log(filters.divYield)

            if (filters.analyst !== "any") {
                const rating = Number(row.combineScore);

                if (filters.analyst === "strong" && rating < 60) return false;
                if (filters.analyst === "weak" && rating > 40) return false;
                if (filters.analyst === "neutral" && (rating <= 40 || rating >= 60)) return false;
            }
            if (filters.pe !== "any") {
                const rating = Number(row.pe);

                if (filters.pe === "pe_50" && rating != null && rating <= 50) return false;
                if (filters.pe === "pe_35_50" && rating != null && (rating > 50 || rating <= 35)) return false;
                if (filters.pe === "pe_25_35" && rating != null && (rating > 35 || rating <= 25)) return false;
                if (filters.pe === "pe_15_25" && rating != null && (rating > 25 || rating <= 15)) return false;
                if (filters.pe === "pe_5_15" && rating != null && (rating > 15 || rating <= 5)) return false;
                if (filters.pe === "pe_0_5" && rating > 5) return false;
            }

            if (filters.pb !== "any") {
                const rating = row.pb;

                if (filters.pb === "pb_10" && rating <= 10) return false;
                if (filters.pb === "pb_5_10" && (rating > 10 || rating <= 5)) return false;
                if (filters.pb === "pb_3_5" && (rating > 5 || rating <= 3)) return false;
                if (filters.pb === "pb_1_5_3" && (rating > 3 || rating <= 1.5)) return false;
                if (filters.pb === "pb_0_75_1_5" && (rating > 1.5 || rating <= 0.75)) return false;
                if (filters.pb === "pb_0_75" && rating > 0.75) return false;

            }

            if (filters.peg !== "any") {
                const rating = Number(row.peg);

                if (filters.peg === "peg_3" && rating <= 3) return false;
                if (filters.peg === "peg_2_3" && (rating > 3 || rating <= 2)) return false;
                if (filters.peg === "peg_1_5_2" && (rating > 2 || rating <= 1.5)) return false;
                if (filters.peg === "peg_1_1_5" && (rating > 1.5 || rating <= 1)) return false;
                if (filters.peg === "peg_0_5_1" && rating > 0.5) return false;
            }

            if (filters.divYield !== "any") {
                const rating = Number(row.divYield);
                if (filters.divYield === "div_15" && rating <= 15) return false;
                if (filters.divYield === "div_10_15" && !(rating > 10 && rating <= 15)) return false;
                if (filters.divYield === "div_6_10" && !(rating > 6 && rating <= 10)) return false;
                if (filters.divYield === "div_4_6" && !(rating > 4 && rating <= 6)) return false;
                if (filters.divYield === "div_2_4" && !(rating > 2 && rating <= 4)) return false;
                if (filters.divYield === "div_0_2" && !(rating > 0 && rating <= 2)) return false;
                if (filters.divYield === "div_0" && rating !== 0) return false;
            }

            if (filters.debtEq !== "any") {
                const rating = Number(row.debtEq);
                if (filters.debtEq === "de_4" && rating <= 4) return false;
                if (filters.debtEq === "de_2_4" && !(rating > 4 && rating <= 2)) return false;
                if (filters.debtEq === "de_1_2" && !(rating > 2 && rating <= 1)) return false;
                if (filters.debtEq === "de_0_5_1" && !(rating > 1 && rating <= 0.5)) return false;
                if (filters.debtEq === "de_0_1_0_5" && !(rating > 0.5 && rating <= 0.1)) return false;
                if (filters.debtEq === "de_0_0_1" && rating > 0.1) return false;
            }

            console.log(">>>>",filters.sector?.length)
            console.log(">>>>",filters.industry?.length)
            // ✅ SECTOR FILTER
            if (filters.sector?.length > 0) {
                if (!filters.sector.includes(row.sector)) return false;
            }

            // ✅ INDUSTRY FILTER
            if (filters.industry?.length > 0) {
                if (!filters.industry.includes(row.industry)) return false;
            }

            // ✅ PRICE RANGE
            console.log(">>>>>>>", alphadecodeFilter)
            if (alphadecodeFilter.price?.length === 2) {
                const val = Number(row.priceRating); // 👈 change key if different
                if (row.priceRating == null) return false; // ✅ handles null & undefined
                if (val < alphadecodeFilter.price[0] || val > alphadecodeFilter.price[1]) {
                    return false;
                }
            }
//
// // ✅ SECTOR RANGE
            if (alphadecodeFilter.sector?.length === 2) {
                const val = Number(row.sectorPriceRating);
                if (val < alphadecodeFilter.sector[0] || val > alphadecodeFilter.sector[1]) {
                    return false;
                }
            }

// ✅ EARNING RANGE
            if (alphadecodeFilter.earning?.length === 2) {
                const val = Number(row.earningRating);
                if (val < alphadecodeFilter.earning[0] || val > alphadecodeFilter.earning[1]) {
                    return false;
                }
            }

            // ✅ INSTITUTIONAL RATING
            if (alphadecodeFilter.institutional?.length > 0) {
                if (!alphadecodeFilter.institutional.includes(row.instBuying)) {
                    return false;
                }
            }

// ✅ SMR RATING
            console.log(">>>>>>>", );
            if (alphadecodeFilter.smr?.length > 0) {
                if (!alphadecodeFilter.smr.includes(row.smrRating)) {
                    return false;
                }
            }

            return true;
        });
    }, [processedRows, filters, alphadecodeFilter]);

    // ✅ COLUMNS
    const columns = useMemo(() => {
        const baseColumns = createColumns(
            finalRows,
            symbolQuery,
            setSymbolQuery,
            symbolSearchOpen,
            setSymbolSearchOpen
        );

        return baseColumns.map((col) => {
            if (col.field === "symbol") {
                return {
                    ...col,
                    renderCell: (params) => (
                        <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                            <BookmarkBorderIcon
                                sx={{
                                    fontSize: 18,
                                    color: "#888",
                                    cursor: "pointer",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedSymbol(params.row.symbol);
                                    setAnchorEl(e.currentTarget);
                                }}
                            />
                            <span>{params.value}</span>
                        </Box>
                    ),
                };
            }
            return col;
        });
    }, [finalRows, symbolQuery, symbolSearchOpen]);

    // Hydration fix
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Loading...
            </Box>
        );
    }

    return (
        <>
            <Box sx={{height: "100vh", width: "100%"}}>
                <DataGridPro
                    rows={finalRows}
                    columns={columns}
                    loading={loading}
                    onRowsScrollEnd={handleRowsScrollEnd}

                    // ✅ CLEAN TOOLBAR INJECTION (NO INLINE FUNCTION)
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    slotProps={{
                        toolbar: {
                            filters,
                            setFilters,
                            alphadecodeFilter,
                            setAlphadecodeFilter,
                            processedRows,
                        },
                    }}
                    showToolbar
                    checkboxSelection={false}
                    hideFooter
                    density="compact"
                    rowHeight={58}
                    columnHeaderHeight={60}
                    pinnedColumns={{left: ["symbol"]}}

                    disableColumnResize
                    disableColumnMenu
                    disableColumnSelector
                    disableColumnFilter

                    sx={{
                        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',

                        "& .MuiDataGrid-row": {
                            borderBottom: "1px solid #ebebeb",
                            height: "42px !important",
                        },

                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#fff",
                            borderBottom: "1px solid #ddd",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: "#666",
                        },

                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#fafafa",
                        },

                        "& .MuiDataGrid-cell": {
                            fontSize: "0.8125rem",
                            display: "flex",
                            alignItems: "center",
                        },

                        "& .MuiDataGrid-columnSeparator": {
                            display: "none",
                        },

                        "& .MuiDataGrid-sortIcon": {
                            display: "none",
                        },
                    }}
                />
            </Box>

            {/* ✅ WATCHLIST POPOVER */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        p: 2,
                        width: 360,
                        backgroundColor: "#f4f8ff",
                    },
                }}
            >
                <WatchlistPopover
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    symbol={selectedSymbol}
                />
            </Popover>
        </>
    );
}