"use client";
import * as React from "react";
import { LineChart } from "@mui/x-charts-pro";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { generateDummyData } from "../utils/generateDummyData";

const GraphCard = ({ title, value, change }) => {
  const isPositive = !change.toString().includes("-");
  const numericValue =
    typeof value === "string" ? Number(value.replace(/,/g, "")) : value;
  const dummyData = generateDummyData(numericValue, 12);

  const lineColor = isPositive ? "#22C55E" : "#EF4444";
  const areaColor = isPositive ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)";

  return (
    <Card className="rounded-xl w-full shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="mb-0.5">
          <h4 className="text-xs font-medium text-gray-500">{title}</h4>
        </div>
        <div className="flex justify-between items-center mb-1.5">
          <p className="text-base font-bold text-black">{value}</p>
          <div
            className={`flex items-center text-xs font-semibold px-1.5 py-0.5 rounded ${
              isPositive
                ? "bg-green-100 text-green-500"
                : "bg-red-100 text-red-500"
            }`}
          >
            {isPositive ? (
              <ArrowUp className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDown className="mr-1 h-3 w-3" />
            )}
            {change.replace("-", "")}
          </div>
        </div>
        <div className=" w-full relative justify-center left-0">
          <LineChart
            xAxis={[
              { data: dummyData.map((_, i) => i + 1), scaleType: "point" },
            ]}
            series={[
              {
                data: dummyData.map((d) => d.value),
                area: true,
                color: lineColor,
                showMark: false,
              },
            ]}
            grid={{ horizontal: false, vertical: false }}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            sx={{
              width: "100%",
              height: "100%",
              ".MuiLineElement-root": { strokeWidth: 2 },
              ".MuiAreaElement-root": {
                fill: isPositive
                  ? "rgba(34,197,94,0.15)"
                  : "rgba(239,68,68,0.15)",
              },
              ".MuiMarkElement-root": { display: "none" },
              ".MuiChartsAxis-root": { display: "none" },
              ".MuiChartsAxis-tickContainer": { display: "none" },
              ".MuiChartsAxis-tickLabel": { display: "none" },
              ".MuiChartsAxis-line": { display: "none" },
              ".MuiChartsAxis-label": { display: "none" },
            }}
          />
        </div>
       
      </CardContent>
    </Card>
  );
};

export default GraphCard;
