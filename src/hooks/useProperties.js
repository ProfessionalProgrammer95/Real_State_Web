import { useEffect, useMemo, useState } from "react";
import { fetchProperties } from "../services/api";

function useProperties() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const items = await fetchProperties();
        setData(items);
      } catch {
        setErr("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const countries = useMemo(() => {
    const s = new Set();
    data.forEach((p) => p.country && s.add(p.country));
    return Array.from(s);
  }, [data]);

  return { data, loading, err, countries };
}

export default useProperties;