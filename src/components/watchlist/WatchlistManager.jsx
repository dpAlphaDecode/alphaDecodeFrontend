"use client";

import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import WatchlistTabs from "./WatchlistTabs";

export default function WatchlistManager() {
  const [watchlists, setWatchlists] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchWatchlists = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/watchlist/get", {
        credentials: "include",
      });
      const data = await res.json();
      setWatchlists(data || []);
    } catch (err) {
      console.error(err);
      setWatchlists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlists();
  }, []);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      {watchlists.length === 0 && (
        <Box p={3}>
          <Typography color="text.secondary">
            No watchlists found. Please create one ➕
          </Typography>
        </Box>
      )}

      <WatchlistTabs
        watchlists={watchlists}
        setWatchlists={setWatchlists}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Box>
  );
}