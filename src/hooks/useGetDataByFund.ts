import { useEffect, useState } from "react";
import { useFilters } from "@/contexts/FiltersContext";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axiosInstance";

export function useGetDataByFund() {
  const { selectedFilters } = useFilters();
  const { token, collaboratorId } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collaboratorId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const ids = selectedFilters.funds.map((f) => f.id).join(",");
      try {
        const res = await axiosInstance.get(
          `/claims/total-by-fund/${collaboratorId}?funds=${ids}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(res.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilters.funds, collaboratorId, token]);
  const fundsObjectLength = Object.keys(data?.data?.byFund || {}).length;

  /*  const fundsObjectLength = 8; */
  return { data, loading, error, fundsObjectLength };
}
