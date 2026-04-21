// Fixed Home.jsx
import DropdownFilter from "@/components/DropdownFilter";
import FilterBar from "@/components/FilterBar";
import Header from "@/components/Header";
import StockTable from "@/components/StockTable";
import GraphCardList from "@/components/ui/GraphCardList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative z-0 bg-white">
      <Header />
      <GraphCardList />
      {/* Removed z-50, now uses default stacking */}
      <div className="relative">
        <FilterBar />
      </div>
      <StockTable />
    </main>
  );
}