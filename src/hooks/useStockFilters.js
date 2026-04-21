import { useState, useMemo } from "react";
import { capBucket } from "../utils/helpers";

export const useStockFilters = (rowsRaw) => {
  const [changePct, setChangePct] = useState("any");
  const [symbolQuery, setSymbolQuery] = useState("");

  const rows = useMemo(() => {
    const mapped = rowsRaw.map((s, i) => {
      const marketCapCr = s.price && s.shares
        ? (s.price * s.shares) / 1e7
        : s.market_cap_cr ?? null;

      return {
        id: s.symbol_id ?? i,
        symbol: s.symbol,
        name: s.name,
        logo: s.logo ?? "",
        sector: s.sector,
        industry: s.industry,
        price: s.price,
        changePct: s.changePct ?? null,
        todayVol: s.volume,
        avgVol: s.volume_avg_21day,
        multX: s.multiplier ?? 1,
        high52w: s.high_52_week,
        pctBelow52w: s.pctBelow52w ?? null,
        pe: s.pe ?? null,
        pb: s.price_to_book ?? null,
        peg: s.peg ?? null,
        divYield: s.dividend_yield ?? null,
        debtEq: s.debt_to_equity ?? null,
        marketCap: marketCapCr,
        capBucket: capBucket(marketCapCr),
        combineScore: Number(s.compositeScore ?? s.composite_rating ?? 0),
        combineDelta: Number(s.compositeDelta ?? 0),
        priceRating: s.rsRating ?? 75,
        earningRating: s.epsRating ?? "C",
        smrRating: s.smrRating ?? "B",
        instBuying: s.adRating ?? "C",
        sectorPriceRating: s.sectorPriceRating ?? 47,
        analyst: s.analystRating ?? "Neutral",
      };
    });

    return mapped.filter((r) => {
      const passChange = changePct === "any" || r.changePct == null
        ? true
        : changePct === "pos"
        ? r.changePct >= 0
        : r.changePct < 0;

      if (!passChange) return false;

      if (!symbolQuery) return true;
      const q = symbolQuery.trim().toLowerCase();
      return (
        (r.symbol || "").toLowerCase().includes(q) ||
        (r.name || "").toLowerCase().includes(q)
      );
    });
  }, [rowsRaw, changePct, symbolQuery]);

  return {
    rows,
    changePct,
    setChangePct,
    symbolQuery,
    setSymbolQuery,
  };
};
