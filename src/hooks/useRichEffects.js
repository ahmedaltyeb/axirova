import { useEffect, useState } from "react";
export default function useRichEffects() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = matchMedia(
      "(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return enabled;
}
