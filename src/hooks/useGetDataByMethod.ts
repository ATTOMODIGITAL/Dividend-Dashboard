import { useEffect, useState } from "react";
import { useFilters } from "@/contexts/FiltersContext";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axiosInstance";

export function useGetDataByMethod() {
  const { selectedFilters } = useFilters();
  const { token, collaboratorId } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collaboratorId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const methods = selectedFilters.methods.join(",");

      try {
        const res = await axiosInstance.get(
          `/claims/total-by-method/${collaboratorId}?methods=${methods}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const parsed = Object.entries(res.data.data.byMethod).map(
          ([method, values]) => ({
            name: method,
            // @ts-expect-error sorry dayan
            enTramite: values.totalPendiente,
            // @ts-expect-error sorry dayan
            enviado: values.totalEnviado,
            // @ts-expect-error sorry dayan
            recuperado: values.totalRecuperado,
          })
        );
        // @ts-expect-error sorry dayan

        setData(parsed);
      } catch (err) {
        // @ts-expect-error sorry dayan
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilters.methods, collaboratorId, token]);

  return { data, loading, error };
}
