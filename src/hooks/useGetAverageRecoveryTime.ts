// src/hooks/useChartData.ts
import { useEffect, useState } from "react";
import { useFilters } from "@/contexts/FiltersContext";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axiosInstance";

export function useGetAverageRecoveryTime() {
  const { selectedFilters } = useFilters();
  const { token, collaboratorId } = useAuth();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collaboratorId) return;
    const fetchAverageRecoveryTime = async () => {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (selectedFilters.countries.length)
        params.append(
          "countries",
          selectedFilters.countries.map((c) => c.isoCode).join(",")
        );
      if (selectedFilters.methods.length)
        params.append("methods", selectedFilters.methods.join(","));

      try {
        const response = await axiosInstance.get(
          `/claims/average-recovery-time-static?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAverageRecoveryTime();
  }, [selectedFilters, token]);

  return { data, isLoading, error };
}
