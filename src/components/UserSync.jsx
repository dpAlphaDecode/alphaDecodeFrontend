"use client";

import { useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export default function UserSync() {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      axios.post("/api/user/sync");
    }
  }, [isLoaded, isSignedIn]);

  return null;
}