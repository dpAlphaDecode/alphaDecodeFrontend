import Header from "@/components/Header";
import WatchlistManager from "@/components/watchlist/WatchlistManager";

export default function WatchlistPage() {
  return (
    <main className="relative z-0 bg-white">
      <Header />
      <WatchlistManager />
    </main>
  );
}