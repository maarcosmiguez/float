// Simulación temporal del crecimiento de socios: arranca en RULETA_BASE y suma
// un paso de 2 dígitos (10-99) cada 3 días, determinístico (mismo valor en
// servidor y cliente). Reemplazar por el conteo real (API de YouTube/Mercado
// Pago/PayPal) cuando exista ese conteo dinámico.
const RULETA_START = new Date("2026-08-03T00:00:00-03:00");
const RULETA_BASE = 536;
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

function seededStep(periodIndex: number): number {
  const x = Math.sin(periodIndex * 9973 + 12345) * 10000;
  const frac = x - Math.floor(x);
  return 10 + Math.floor(frac * 90); // 10-99
}

export function getSociosCount(now: Date = new Date()): number {
  const diffMs = now.getTime() - RULETA_START.getTime();
  if (diffMs < 0) return RULETA_BASE;

  const periodsElapsed = Math.floor(diffMs / THREE_DAYS_MS);
  let total = RULETA_BASE;
  for (let i = 0; i < periodsElapsed; i++) {
    total += seededStep(i);
  }
  return total;
}
