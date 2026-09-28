"use client";

import { useEffect, useState } from "react";
import { ahoraMvd } from "./aire";

// Reloj de Montevideo para el footer (el mismo dato que muestra el chip).
export default () => {
  const [hhmm, setHhmm] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setHhmm(ahoraMvd().hhmm);
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{hhmm ?? "--:--"}</span>;
};
