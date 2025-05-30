"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { useGetDataByYear } from "@/hooks/useGetDataByYear";
import { CustomLegend } from "../CustomLegend";
import { RoundedBar } from "../RoundedBar";
import SkeletonChartVertical from "../SkeletonChartVertical";
import { useFilters } from "@/contexts/FiltersContext";

// Inline shape personalizado para aplicar border-radius solo si es la barra superior

export function YearsChart() {
  const { data, loading, error } = useGetDataByYear();
  const { claimStatus, updateClaimStatus } = useFilters();

  if (loading) return <SkeletonChartVertical height="h-80" />;
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>;

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer debounce={300} width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize={12} dataKey="name" />
          <YAxis
            fontSize={12}
            tickFormatter={(value) => value.toLocaleString("es-ES")}
          />
          <Tooltip formatter={(value) => value.toLocaleString("es-ES")} />
          <Legend
            wrapperStyle={{ paddingTop: 10 }}
            content={<CustomLegend />}
          />
          {claimStatus.includes("EN TRÁMITE") && (
            <Bar
              dataKey="enTramite"
              stackId="a"
              fill="#C9C9C9"
              name="En trámite"
              activeBar={{ fill: "#9d9d9d" }}
              shape={(props) => <RoundedBar {...props} dataKey="enTramite" />}
            />
          )}
          {claimStatus.includes("ENVIADO") && (
            <Bar
              dataKey="enviado"
              stackId="a"
              fill="#4F84A6"
              name="Enviado"
              activeBar={{ fill: "#417191" }}
              shape={(props) => <RoundedBar {...props} dataKey="enviado" />}
            />
          )}
          {claimStatus.includes("RECUPERADO") && (
            <Bar
              dataKey="recuperado"
              stackId="a"
              fill="#244A76"
              name="Recuperado"
              activeBar={{ fill: "#1f436c" }}
              shape={(props) => <RoundedBar {...props} dataKey="recuperado" />}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
