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
      setWatchlists(data);
    } catch (err) {
      console.error(err);
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

  if (!watchlists.length) {
    return (
      <Box p={6}>
        <Typography>No watchlists found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{height: "100vh", width: "100%"}}>
      <WatchlistTabs
        watchlists={watchlists}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        refresh={fetchWatchlists}
      />
    </Box>
  );
}