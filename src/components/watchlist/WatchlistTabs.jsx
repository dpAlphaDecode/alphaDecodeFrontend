"use client";

import {
  Tabs,
  Tab,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import WatchlistTable from "./WatchlistTable";

export default function WatchlistTabs({
  watchlists,
  setWatchlists,   // 👈 ADD THIS
  activeTab,
  setActiveTab,
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const createWatchlist = async () => {
    if (!name) return;

    // 🔥 Optimistic UI
    const tempId = Date.now();
    const newWatchlist = { id: tempId, name };

    setWatchlists((prev) => [...prev, newWatchlist]);
    setActiveTab(watchlists.length);

    setName("");
    setOpen(false);

    try {
      const res = await fetch("/api/watchlist/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      // ✅ Replace temp ID with real ID
      setWatchlists((prev) =>
        prev.map((wl) =>
          wl.id === tempId ? { ...wl, id: data.id } : wl
        )
      );
    } catch (err) {
      // ❌ rollback if failed
      setWatchlists((prev) => prev.filter((wl) => wl.id !== tempId));
    }
  };

  const deleteWatchlist = async (id, index) => {
    const backup = [...watchlists];

    // 🔥 Optimistic remove
    setWatchlists((prev) => prev.filter((wl) => wl.id !== id));

    // adjust active tab
    if (activeTab >= index && activeTab > 0) {
      setActiveTab(activeTab - 1);
    }

    try {
      await fetch("/api/watchlist/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      // ❌ rollback
      setWatchlists(backup);
    }
  };

  return (
    <Box>
      {/* Tabs */}
      <Box display="flex" alignItems="center">
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          variant="scrollable"
        >
          {watchlists.map((wl, index) => (
            <Tab
              key={wl.id}
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  {wl.name}

                  <IconButton
                    component="span"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteWatchlist(wl.id, index);
                    }}
                    sx={{
                      p: "4px",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.08)" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
            />
          ))}
        </Tabs>

        {/* Add button */}
        <IconButton onClick={() => setOpen(true)}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* Tab Content */}
      <Box mt={3}>
        {watchlists[activeTab] && (
          <WatchlistTable watchlist={watchlists[activeTab]} />
        )}
      </Box>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Watchlist</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Watchlist Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={createWatchlist}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}