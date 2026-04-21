// src/components/Header.jsx
'use client';

import Link from 'next/link';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Bell, Bookmark, Plus, Menu } from 'lucide-react';
import ProfileSidebar from './ui/ProfileSidebar';
import { useRouter } from "next/navigation";

// Clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useUser,
  useClerk
} from '@clerk/nextjs';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut, openSignIn } = useClerk();
  const router = useRouter();

  // Map Clerk user -> your sidebar's expected shape
  const sidebarUser = useMemo(() => {
    if (!clerkUser) return null;
    return {
      name: clerkUser.fullName || clerkUser.username || '',
      email: clerkUser.primaryEmailAddress?.emailAddress || '',
      avatar: clerkUser.imageUrl || '/avatar.jpg',
    };
  }, [clerkUser]);

  // Sync user with backend
  useEffect(() => {
    if (!clerkUser || !isLoaded) return;

    const API_BASE = window.location.origin;

    const syncUser = async () => {
      try {
        await fetch(`${API_BASE}/api/user/sync`, {
          method: "POST",
          credentials: "include",
        });
      } catch (err) {
        console.error("User sync failed", err);
      }
    };

    syncUser();
  }, [clerkUser?.id, isLoaded]);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  const handleLogout = useCallback(async () => {
    await signOut({ redirectUrl: '/' });
  }, [signOut]);

  // ✅ Protected navigation handler
  const handleProtectedRoute = useCallback((path) => {
    if (!clerkUser) {
      openSignIn(); // opens Clerk modal
      return;
    }
    router.push(path);
  }, [clerkUser, openSignIn, router]);

  return (
    <div className="w-full border-b border-gray-200 relative z-50">
      {/* Main Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white">

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="block">
            <img
              src="/Logo.svg"
              alt="DecodeAlpha Logo"
              width={280}
              height={60}
              className="h-11 w-auto"
            />
          </Link>
        </div>

        {/* Actions + Auth */}
        <div className="flex items-center space-x-4">

          {/* Market Status */}
          <div className="hidden sm:flex items-center border border-gray-300 rounded-md px-3 py-1 bg-white">
            <span className="text-black font-semibold text-sm">
              Market in uptrend
            </span>
            <div className="ml-2 w-6 h-6 flex items-center justify-center">
              <img
                src="/market_uptrend.svg"
                alt="Market uptrend indicator"
                className="w-6 h-6"
              />
            </div>
          </div>

          {/* Icon buttons */}
          <div className="flex items-center space-x-1">

            {/* ✅ Bookmark (Protected) */}
            <button
              onClick={() => handleProtectedRoute("/watchlist")}
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="View bookmarks"
            >
              <Bookmark className="h-5 w-5 text-black" />
            </button>

            {/* Notifications */}
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="h-5 w-5 text-black" />
            </button>

            {/* Add */}
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Create new item"
            >
              <Plus className="h-5 w-5 text-black" />
            </button>

            {/* Menu */}
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-black" />
            </button>
          </div>

          {/* Auth area */}
          <SignedOut>
            <SignInButton mode="modal" signUpUrl="/sign-up">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">
                Login / Signup
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <button
              type="button"
              onClick={openSidebar}
              className="ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
              aria-label="Open user profile"
              disabled={!isLoaded}
            >
              <img
                src={sidebarUser?.avatar || '/avatar.jpg'}
                alt={(sidebarUser?.name || sidebarUser?.email || 'User') + ' avatar'}
                className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer object-cover hover:border-gray-300 transition-colors duration-200"
              />
            </button>
          </SignedIn>

        </div>
      </header>

      {/* Mobile Header */}
      <div className="md:hidden px-4 py-2 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-black">Stock Screener</h1>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-black">Uptrend</span>
            <img src="/market_uptrend.svg" className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black/20 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Profile Sidebar */}
      <SignedIn>
        <ProfileSidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          user={sidebarUser}
          onLogout={handleLogout}
          loading={false}
        />
      </SignedIn>
    </div>
  );
}