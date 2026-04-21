"use client";

import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    CircularProgress,
} from "@mui/material";
import {useEffect, useState} from "react";
import AddIcon from "@mui/icons-material/Add";

export default function WatchlistPopover({open, onClose, symbol}) {
    const [watchlists, setWatchlists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newName, setNewName] = useState("");
    const [creating, setCreating] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [error, setError] = useState("");

    // Fetch watchlists
    const fetchWatchlists = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/watchlist");

            if (res.status === 401) {
                setError("Please login first to add to watchlist");
                setWatchlists([]);
                setLoading(false); // ✅ ADD THIS
                return;
            }

            const data = await res.json();

            const list =
                data?.watchlists ||
                data?.data ||
                data ||
                [];

            setWatchlists(Array.isArray(list) ? list : []);
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    useEffect(() => {
        if (open) fetchWatchlists();
    }, [open]);

    // Add stock
    const addToWatchlist = async (watchlistId) => {
        await fetch("/api/watchlist/add-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({watchlistId, symbol}),
        });

        onClose();
    };

    // Create watchlist
    const createWatchlist = async () => {
        if (!newName) return;

        setCreating(true);
        try {
            const res = await fetch("/api/watchlist/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: newName}),
            });

            const data = await res.json();

            setWatchlists((prev) => [
                {
                    ...data,
                    _count: {items: 0},
                },
                ...(Array.isArray(prev) ? prev : []),
            ]);

            setNewName("");
            setShowInput(false);
        } catch (err) {
            console.error(err);
        }
        setCreating(false);
    };

    return (
        <Box sx={{width: 260}}>
            {/* Header */}
            <Typography fontWeight={600} mb={1}>
                Save <b>{symbol}</b>
            </Typography>

            {/* Loader */}
            {loading ? (
                <Box textAlign="center" py={2}>
                    <CircularProgress size={20}/>
                </Box>
            ) : error ? (
                // 👇 ADD HERE
                <Box textAlign="center" py={2}>
                    <Typography fontSize={13} color="error">
                        {error}
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={1}>
                    {/* ➕ Create New */}
                    <Grid item xs={6}>
                        <Box
                            onClick={() => setShowInput(true)}
                            sx={{
                                height: 90,
                                borderRadius: 2,
                                border: "1px dashed #ccc",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                cursor: "pointer",
                                "&:hover": {
//                   borderColor: "#1976d2",
                                    backgroundColor: "#f0f4ff",
                                },
                            }}
                        >
                            <AddIcon fontSize="small"/>
                            <Typography variant="caption">New</Typography>
                        </Box>
                    </Grid>

                    {/* Input */}
                    {showInput && (
                        <Grid item xs={6} sm={4}>
                            <Box
                                sx={{
                                    height: 100,
                                    p: 1.5,
                                    borderRadius: 3,
                                    border: "1px solid #d6dbe6",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    transition: "all 0.2s",
                                }}
                            >
                                {/* ❌ Close Button */}
                                <Box
                                    onClick={() => {
                                        setShowInput(false);
                                        setNewName("");
                                    }}
                                    sx={{
                                        position: "absolute",
                                        top: -8,        // 👈 push to border edge
                                        right: -8,      // 👈 push to border edge
                                        width: 20,
                                        height: 20,
                                        borderRadius: "50%",
                                        backgroundColor: "#fff",
                                        border: "1px solid #d6dbe6",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 12,
                                        cursor: "pointer",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                        zIndex: 2,
                                        "&:hover": {
                                            backgroundColor: "#f5f7fa",
                                        },
                                    }}
                                >
                                    ✕
                                </Box>

                                {/* Input */}
                                <TextField
                                    size="small"
                                    placeholder="Watchlist name"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    sx={{
                                        mt: 0.5,
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            height: 32, // 👈 smaller height
                                            fontSize: 13, // 👈 smaller text
                                        },
                                        "& .MuiInputBase-input": {
                                            py: 0.5, // 👈 reduce inner padding
                                        },
                                    }}
                                />

                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={createWatchlist}
                                    disabled={creating}
                                    sx={{
                                        mt: 0.5,
                                        alignSelf: "flex-start", // 👈 prevents full width
                                        px: 1.5, // 👈 smaller width
                                        minWidth: "unset", // 👈 remove default MUI width
                                        height: 28, // 👈 compact height
                                        fontSize: 12,
                                        textTransform: "none",
                                        borderRadius: 2,
                                    }}
                                >
                                    {creating ? "..." : "Create"}
                                </Button>
                            </Box>
                        </Grid>
                    )}

                    {/* Watchlists */}
                    {(watchlists || []).map((wl) => (
                        <Grid item xs={6} key={wl.id}>
                            <Box
                                onClick={() => addToWatchlist(wl.id)}
                                sx={{
                                    height: 90,
                                    p: 1,
                                    borderRadius: 2,
                                    border: "1px solid #ddd",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "#f0f4ff",
                                    },
                                }}
                            >
                                <Typography fontSize={13} fontWeight={600} noWrap>
                                    {wl.name}
                                </Typography>

                                <Typography variant="caption" color="text.secondary">
                                    {wl._count?.items || 0}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}