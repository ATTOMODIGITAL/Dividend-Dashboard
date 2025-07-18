/* "use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import Flag from "react-world-flags";
import { isoToName } from "@/consts/isoToName";
import { RoundedBarStart } from "./RoundedBarStart";
import { RoundedBarMiddle } from "./RoundedBarMiddle";
import { RoundedBarEnd } from "./RoundedBarEnd";

export function AverageRecoveryTimeCard({ method, data }) {
  // --- START OF THE FIX ---

  // 1. Define a fixed height for each row (bar + label).
  // This gives you precise control over the spacing. Let's use 50px per country.
  const ROW_HEIGHT = 50;

  // 2. Define a base height for the chart's margins (top and bottom).
  const MARGIN_HEIGHT = 10; // Corresponds to margin: { top: 20, bottom: 20 }

  // --- END OF THE FIX ---

  const barSize = Math.max(8, 20 - (data?.length || 0));

  const maxValue = Math.max(
    0,
    ...(data?.flatMap((d) => [
      d.minimumRecoveryTime,
      d.averageRecoveryTime,
      d.maximumRecoveryTime,
    ]) || [])
  );

  const roundedMax = Math.ceil(maxValue / 5) * 5;

  const cleanedData =
    data?.filter(
      (d) =>
        d.minimumRecoveryTime > 0 &&
        d.averageRecoveryTime > 0 &&
        d.maximumRecoveryTime > 0 &&
        d.minimumRecoveryTime < d.averageRecoveryTime &&
        d.averageRecoveryTime < d.maximumRecoveryTime
    ) || [];

  const transformedData = cleanedData.map((d) => ({
    ...d,
    original: { ...d },
    averageRecoveryTime: d.averageRecoveryTime - d.minimumRecoveryTime,
    maximumRecoveryTime: d.maximumRecoveryTime - d.averageRecoveryTime,
  }));

  const sortedData = transformedData.sort((a, b) => {
    const totalA =
      a.original.minimumRecoveryTime +
      a.original.averageRecoveryTime +
      a.original.maximumRecoveryTime;
    const totalB =
      b.original.minimumRecoveryTime +
      b.original.averageRecoveryTime +
      b.original.maximumRecoveryTime;
    return totalB - totalA;
  });

  // --- START OF THE FIX ---

  // 3. Calculate the total dynamic height.
  // This is the number of countries multiplied by the height per row, plus margins.
  const dynamicHeight = sortedData.length * ROW_HEIGHT + MARGIN_HEIGHT;

  // --- END OF THE FIX ---

  return (
    // 4. Apply the calculated height to this wrapping div.
    // The `h-96` class is replaced with a dynamic style.
    <div style={{ height: `${dynamicHeight}px`, width: "100%" }}>
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={sortedData}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          // 5. Adjust the gap between bars to be consistent.
          barCategoryGap="40%" // Use a percentage for responsive spacing
        >
          <XAxis
            type="number"
            domain={[0, roundedMax]}
            tickFormatter={(v) => `${v} meses`}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 14 }}
          />
          <YAxis
            type="category"
            dataKey="country"
            width={110}
            axisLine={false}
            tickLine={false}
            // 6. Set interval to 0 to explicitly tell recharts to render every single tick.
            interval={0}
            tick={({ x, y, payload }) => {
              const isoCode = payload.value;
              const name = isoToName[isoCode] || isoCode;
              return (
                <g transform={`translate(${x - 90},${y - 12})`}>
                  <foreignObject x={0} y={0} width={100} height={24}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontFamily: "Bricolage Grotesque, sans-serif",
                        color: "#374151",
                      }}
                    >
                      <div className="relative w-7 h-5 overflow-hidden rounded">
                        <Flag
                          code={isoCode}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          className="flag-image"
                        />
                        <div className="absolute inset-0 pointer-events-none rounded" />
                      </div>
                      <span>{name}</span>
                    </div>
                  </foreignObject>
                </g>
              );
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="minimumRecoveryTime"
            fill="#60C6FF"
            stackId="a"
            barSize={barSize}
            shape={<RoundedBarStart />}
          />
          <Bar
            dataKey="averageRecoveryTime"
            fill="#1E3558"
            stackId="a"
            barSize={barSize}
            shape={<RoundedBarMiddle />}
          />
          <Bar
            dataKey="maximumRecoveryTime"
            fill="#A7E3F2"
            stackId="a"
            barSize={barSize}
            shape={<RoundedBarEnd />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} */

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import Flag from "react-world-flags";
import { isoToName } from "@/consts/isoToName";
import { RoundedBarStart } from "./RoundedBarStart";
import { RoundedBarMiddle } from "./RoundedBarMiddle";
import { RoundedBarEnd } from "./RoundedBarEnd";

// --- START OF THE FIX ---
// 1. Accept `chartHeight` as a prop.
export function AverageRecoveryTimeCard({ method, data, chartHeight }) {
  // --- END OF THE FIX ---

  const barSize = Math.max(8, 20 - (data?.length || 0));

  const maxValue = Math.max(
    0,
    ...(data?.flatMap((d) => [
      d.minimumRecoveryTime,
      d.averageRecoveryTime,
      d.maximumRecoveryTime,
    ]) || [])
  );

  const roundedMax = Math.ceil(maxValue / 5) * 5;

  const cleanedData =
    data?.filter(
      (d) =>
        d.minimumRecoveryTime > 0 &&
        d.averageRecoveryTime > 0 &&
        d.maximumRecoveryTime > 0 &&
        d.minimumRecoveryTime < d.averageRecoveryTime &&
        d.averageRecoveryTime < d.maximumRecoveryTime
    ) || [];

  const transformedData = cleanedData.map((d) => ({
    ...d,
    original: { ...d },
    averageRecoveryTime: d.averageRecoveryTime - d.minimumRecoveryTime,
    maximumRecoveryTime: d.maximumRecoveryTime - d.averageRecoveryTime,
  }));

  const sortedData = transformedData.sort((a, b) => {
    const totalA =
      a.original.minimumRecoveryTime +
      a.original.averageRecoveryTime +
      a.original.maximumRecoveryTime;
    const totalB =
      b.original.minimumRecoveryTime +
      b.original.averageRecoveryTime +
      b.original.maximumRecoveryTime;
    return totalB - totalA;
  });

  return (
    // 2. Use the `chartHeight` prop to set the height of the container div.
    // The internal calculation has been removed.
    <div style={{ height: `${chartHeight}px`, width: "100%" }}>
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={sortedData}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          barCategoryGap="40%"
        >
          {/* ... (The rest of your component remains exactly the same) ... */}
          <XAxis
            type="number"
            domain={[0, roundedMax]}
            tickFormatter={(v) => `${v} meses`}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 14 }}
          />
          <YAxis
            type="category"
            dataKey="country"
            width={110}
            axisLine={false}
            tickLine={false}
            interval={0} // This remains crucial for showing all labels
            tick={({ x, y, payload }) => {
              const isoCode = payload.value;
              const name = isoToName[isoCode] || isoCode;
              return (
                <g transform={`translate(${x - 90},${y - 12})`}>
                  <foreignObject x={0} y={0} width={100} height={24}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontFamily: "Bricolage Grotesque, sans-serif",
                        color: "#374151",
                      }}
                    >
                      <div className="relative w-7 h-5 overflow-hidden rounded">
                        <Flag
                          code={isoCode}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          className="flag-image"
                        />
                        <div className="absolute inset-0 pointer-events-none rounded" />
                      </div>
                      <span>{name}</span>
                    </div>
                  </foreignObject>
                </g>
              );
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="minimumRecoveryTime"
            fill="#60C6FF"
            stackId="a"
            barSize={barSize}
            shape={<RoundedBarStart />}
          />
          <Bar
            dataKey="averageRecoveryTime"
            fill="#1E3558"
            stackId="a"
            barSize={barSize}
            shape={<RoundedBarMiddle />}
          />
          <Bar
            dataKey="maximumRecoveryTime"
            fill="#A7E3F2"
            stackId="a"
            barSize={barSize}
            shape={<RoundedBarEnd />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
