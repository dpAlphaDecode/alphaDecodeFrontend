import Header from "@/components/Header";
import StockTable from "@/components/StockTable";
import GraphCardList from "@/components/ui/GraphCardList";

export default function Home() {
  return (
    <main className="relative z-0 bg-white">
      <Header />
      <GraphCardList />
      <StockTable />
    </main>
  );
}