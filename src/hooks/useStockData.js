import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import axios from "axios";
import { capBucket } from "../components/utils/formatters"; // ← ADD THIS IMPORT

export const useStockData = () => {
  const fetchingRef = useRef(false);
  const PAGE_SIZE = 5000;

  const [total, setTotal] = useState(null);
  const [rowsRaw, setRowsRaw] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadPage = useCallback(
    async (offset) => {
      if (fetchingRef.current || !hasMore) return;
      fetchingRef.current = true;
      setLoading(true);

      try {
        const res = await axios.get("http://127.0.0.1:8000/rating", {
          params: { skip: offset, limit: PAGE_SIZE },
        });

        const payload = res?.data?.data ?? {};
        const page = Array.isArray(payload.data) ? payload.data : [];

        setRowsRaw((prev) => [...prev, ...page]);
        setCursor((payload.skip ?? offset) + page.length);
        setHasMore(Boolean(payload.has_more));
        setTotal(payload.total ?? null);
      } finally {
        setLoading(false);
        fetchingRef.current = false;
      }
    },
    []
  );

  const handleRowsScrollEnd = useCallback(() => {
    if (hasMore && !loading && !fetchingRef.current) {
      loadPage(cursor);
    }
  }, [hasMore, loading, cursor, loadPage]);

  const resetData = useCallback(() => {
    setRowsRaw([]);
    setCursor(0);
    setHasMore(true);
    setTotal(null);
    loadPage(0);
  }, [loadPage]);

  useEffect(() => {
    resetData();
  }, [resetData]);

  return {
    rowsRaw,
    loading,
    total,
    handleRowsScrollEnd,
    resetData,
  };
};

export const useProcessedStockData = (rowsRaw, changePct, symbolQuery) => {
  function mapSmrRating(score) {
    if (score == null || isNaN(score)) return null;

    if (score < 0) return "E";
    if (score < 10) return "D";
    if (score < 21) return "C";
    if (score < 41) return "B";
    return "A";
  }

  function mapGradeToScore(grade) {
    if (!grade) return null;
    switch (grade) {
      case "A":
        return 99;
      case "B":
        return 80;
      case "C":
        return 60;
      case "D":
        return 40;
      case "E":
        return 20;
      default:
        return null;
    }
  }


  return useMemo(() => {
    const processedRows = rowsRaw.map((s, i) => {
      const marketCapCr =
        s.close && s.shares
          ? (s.close * s.shares) / 1e7
          : s.market_cap_cr ?? null;

      const calculatedPE =
        s.close && s.ttm_eps && s.ttm_eps !== 0 ? s.close / s.ttm_eps : null;

      const calculatedPB =
        s.close && s.book_value_per_share && s.book_value_per_share !== 0
          ? s.close / s.book_value_per_share
          : null;

      const calculatedPEG =
        s.yoy_avg_growth && calculatedPE
          ? calculatedPE / s.yoy_avg_growth
          : null;
      // book_value_per_share

      const priceRating = Number(s.rating_price ?? NaN);
      const earningRating = Math.round(
        Number(s.rating_earnings ?? s.earningRating ?? NaN)
      );
      const smrScore = Math.round(Number(s.rating_smr ?? NaN));
      const smrRating = mapSmrRating(smrScore); // A/B/C/D/E
      const instBuying = s.rating_institutional_buying ?? s.instBuying ?? null;
      const sectorPriceRating = Number(s.rating_sector ?? NaN);

      // In your return object:


      const W_PRICE = 30;
    const W_EARN = 30;
    const W_SMR = 25;
    const W_IBR = 5;
    const W_SECTOR = 10;

    // map letter grades into numeric scores
    const smrNumeric = mapGradeToScore(smrRating);
    const instNumeric = mapGradeToScore(instBuying);

    // combine score calc
    const combineScore =
      (priceRating * W_PRICE) / 100 +
      (earningRating * W_EARN) / 100 +
      (smrNumeric * W_SMR) / 100 +
      (instNumeric * W_IBR) / 100 +
      (sectorPriceRating * W_SECTOR) / 100;


      // console.log("s.calculatedPE ", calculatedPEG);

      return {
        id: s.symbol_id ?? i,
        symbol: s.symbol,
        name: s.name,
        logo: s.logo ?? "",
        sector: s.sector,
        price_last: s.price_last ?? null,
        industry: s.industry,
        price: s.close,
        changePct: s.changePct ?? null,
        todayVol: s.volume,
        avgVol: s.volume_avg_21day,
        multX: s.multiplier ?? null,
        high52w: s._52WeekHigh,
        pctBelow52w: s.pctBelow52w ?? null,
        pe: calculatedPE ?? s.pe ?? null,
        pb: calculatedPB ?? s.pb ?? null,
        peg: calculatedPEG ?? s.peg ?? null,
        divYield: s.dividend_yield ?? null,
        debtEq: s.debt_to_equity ?? null,
        marketCap: marketCapCr,
        capBucket: capBucket(marketCapCr), // <-- use this consistently

        // ratings
      priceRating,
      earningRating,
      smrScore,
      smrRating,
      instBuying,
      sectorPriceRating,
      combineScore: Math.round(combineScore), // round like your sheet
      };
    });

    const filteredRows = processedRows.filter((r) => {
      const passChange =
        changePct === "any" || r.changePct == null
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

    return filteredRows;
  }, [rowsRaw, changePct, symbolQuery]);
};
