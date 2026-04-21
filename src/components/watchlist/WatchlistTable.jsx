"use client";

import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Paper,
    Typography,
    Stack,
    Divider,
    Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useStockData } from "@/hooks/useStockData";

export default function WatchlistTable({ watchlist, refresh }) {
    const [selectedSymbols, setSelectedSymbols] = useState([]);
    const { rowsRaw, loading } = useStockData();

    // ✅ Add multiple stocks
    const addStock = async () => {
        if (!selectedSymbols.length) return;

        await Promise.all(
            selectedSymbols.map((sym) =>
                fetch("/api/watchlist/add-item", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        watchlistId: watchlist.id,
                        symbol: sym.symbol.toUpperCase(),
                    }),
                })
            )
        );

        setSelectedSymbols([]);
        refresh();
    };

    // ❌ Remove stock
    const removeStock = async (symbol) => {
        await fetch("/api/watchlist/remove-item", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                watchlistId: watchlist.id,
                symbol,
            }),
        });

        refresh();
    };

    // 🔥 Filter already added stocks
    const availableOptions =
        rowsRaw?.filter(
            (row) =>
                !watchlist.items?.some(
                    (item) => item.symbol === row.symbol
                )
        ) || [];

    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 2,
                overflow: "hidden",
            }}
        >
            {/* Header */}
            <Box px={2.5} py={2}>
                <Typography fontWeight={600} fontSize="1rem">
                    {watchlist.name}
                </Typography>
            </Box>

            <Divider />

            {/* Add Stock Section */}
            <Box px={2.5} py={2}>
                <Stack direction="row" spacing={1.5}>
                    <Autocomplete
                        multiple
                        options={availableOptions}
                        getOptionLabel={(option) => option.symbol || ""}
                        value={selectedSymbols}
                        onChange={(e, newValue) =>
                            setSelectedSymbols(newValue)
                        }
                        filterSelectedOptions
                        loading={loading}
                        size="small"
                        limitTags={2}
                        sx={{ flex: 1 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Select stocks and add to watchlist"
                            />
                        )}
                    />

                    <Button
                        variant="contained"
                        onClick={addStock}
                        startIcon={<AddIcon />}
                        sx={{
                            textTransform: "none",
                            color: "#ffffff",
                            backgroundColor: "#3c3b3b",
                            "&:hover": {
                                backgroundColor: "#6a6767",
                            },
                            fontWeight: 600,
                        }}
                    >
                        Add
                    </Button>
                </Stack>
            </Box>

            <Divider />

            {/* Table */}
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#fafafa" }}>
                        <TableCell sx={{ fontWeight: 600 }}>
                            Symbol
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {watchlist.items?.length ? (
                        watchlist.items.map((item) => (
                            <TableRow
                                key={item.id}
                                hover
                                sx={{ transition: "0.2s" }}
                            >
                                <TableCell>{item.symbol}</TableCell>

                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            removeStock(item.symbol)
                                        }
                                        sx={{
                                            color: "#494444",
                                            "&:hover": {
                                                backgroundColor: "#b1abab",
                                            },
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Box textAlign="center" py={4}>
                                    <Typography
                                        color="text.secondary"
                                        fontSize="0.9rem"
                                    >
                                        No stocks added yet
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
}