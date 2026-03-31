// Alle formules exact overgenomen uit vdot-kennisbasis.md (Jack Daniels methode)

// ─── Kernberekeningen ────────────────────────────────────────────────────────

export function calculateVDOT(distanceMeters: number, timeMinutes: number): number {
  const V = distanceMeters / timeMinutes;
  const T = timeMinutes;
  const num = -4.60 + 0.182258 * V + 0.000104 * V * V;
  const den =
    0.8 +
    0.1894393 * Math.exp(-0.012778 * T) +
    0.2989558 * Math.exp(-0.1932605 * T);
  return num / den;
}

export function predictRaceTime(vdot: number, distanceMeters: number): number {
  let T = distanceMeters / 250;
  for (let i = 0; i < 100; i++) {
    const V = distanceMeters / T;
    const num = -4.60 + 0.182258 * V + 0.000104 * V * V;
    const den =
      0.8 +
      0.1894393 * Math.exp(-0.012778 * T) +
      0.2989558 * Math.exp(-0.1932605 * T);
    const err = num / den - vdot;
    if (Math.abs(err) < 0.00001) break;
    T += err * 0.3;
    if (T < 0.5) T = 0.5;
  }
  return T;
}

export function calcTrainingPace(
  vdot: number,
  fractionOfVDOT: number,
  referenceDurationMin: number
): number {
  const T = referenceDurationMin;
  const den =
    0.8 +
    0.1894393 * Math.exp(-0.012778 * T) +
    0.2989558 * Math.exp(-0.1932605 * T);
  const targetVO2 = vdot * fractionOfVDOT;
  const a = 0.000104;
  const b = 0.182258;
  const c = -(targetVO2 * den + 4.6);
  const V = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  return 1000 / V; // min/km
}

// ─── Daniels 5 zones ─────────────────────────────────────────────────────────

export interface DanielsZones {
  E_slow: number;
  E_fast: number;
  M: number;
  T: number;
  I: number;
  R: number;
}

export function getAllTrainingPaces(vdot: number): DanielsZones {
  return {
    E_slow: calcTrainingPace(vdot, 0.59, 90),
    E_fast: calcTrainingPace(vdot, 0.74, 90),
    M: calcTrainingPace(vdot, 0.84, 180),
    T: calcTrainingPace(vdot, 0.88, 60),
    I: calcTrainingPace(vdot, 1.0, 12),
    R: calcTrainingPace(vdot, 1.1, 2),
  };
}

// ─── 9 Coach-zones ───────────────────────────────────────────────────────────

export interface CoachZone {
  id: number;
  name: string;
  slow: number;
  fast: number;
  core_slow: number | null;
  core_fast: number | null;
}

export function getCoachZones(vdot: number): CoachZone[] {
  const p = (frac: number, dur: number) => calcTrainingPace(vdot, frac, dur);

  return [
    {
      id: 1,
      name: 'Herstel',
      slow: p(0.6, 90),
      fast: p(0.65, 90),
      core_slow: null,
      core_fast: null,
    },
    {
      id: 2,
      name: 'Easy',
      slow: p(0.65, 90),
      fast: p(0.755, 90),
      core_slow: null,
      core_fast: null,
    },
    {
      id: 3,
      name: 'Steady',
      slow: p(0.755, 90),
      fast: p(0.815, 120),
      core_slow: p(0.77, 90),
      core_fast: p(0.8, 120),
    },
    {
      id: 4,
      name: 'AET / Marathon',
      slow: p(0.815, 120),
      fast: p(0.875, 60),
      core_slow: p(0.84, 120),
      core_fast: p(0.86, 60),
    },
    {
      id: 5,
      name: 'LT',
      slow: p(0.875, 60),
      fast: p(0.925, 60),
      core_slow: p(0.89, 60),
      core_fast: p(0.91, 60),
    },
    {
      id: 6,
      name: 'Groove',
      slow: p(0.925, 60),
      fast: p(0.975, 12),
      core_slow: p(0.94, 20),
      core_fast: p(0.96, 12),
    },
    {
      id: 7,
      name: 'Vo2M',
      slow: p(0.975, 12),
      fast: p(1.015, 12),
      core_slow: p(0.99, 12),
      core_fast: p(1.0, 12),
    },
    {
      id: 8,
      name: 'Fast Pace',
      slow: p(1.015, 4),
      fast: p(1.1, 2),
      core_slow: p(1.04, 3),
      core_fast: p(1.08, 2),
    },
    {
      id: 9,
      name: 'Sprint Pace',
      slow: p(1.1, 2),
      fast: p(1.2, 1),
      core_slow: p(1.12, 1.5),
      core_fast: p(1.18, 1),
    },
  ];
}

// ─── Hulpfuncties ─────────────────────────────────────────────────────────────

export function formatTime(minutes: number): string {
  const totalSec = Math.round(minutes * 60);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function formatPace(minPerKm: number): string {
  const m = Math.floor(minPerKm);
  const s = Math.round((minPerKm - m) * 60);
  if (s === 60) return `${m + 1}:00`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function parseTimeToMinutes(mm: string, ss: string): number {
  return parseInt(mm || '0') + parseInt(ss || '0') / 60;
}

export function minKmToSec100m(minPerKm: number): number {
  return (minPerKm * 60) / 10;
}

export function formatZonePace(
  minPerKm: number,
  zoneId: number,
  mode: 'auto' | 'weg' | 'baan' = 'auto'
): string {
  const useBaan = mode === 'baan' || (mode === 'auto' && zoneId >= 8);
  if (useBaan) {
    const sec = Math.round(minKmToSec100m(minPerKm) * 10) / 10;
    return `${sec.toFixed(1)}`;
  }
  return formatPace(minPerKm);
}

// ─── Afstandslijsten ──────────────────────────────────────────────────────────

export const RACE_DISTANCES = [
  { label: '1 km', meters: 1000 },
  { label: '1500 m', meters: 1500 },
  { label: '1 mijl', meters: 1609 },
  { label: '3 km', meters: 3000 },
  { label: '5 km', meters: 5000 },
  { label: '10 km', meters: 10000 },
  { label: 'Halve marathon', meters: 21097 },
  { label: 'Marathon', meters: 42195 },
  { label: 'Custom', meters: null as number | null },
];

export const PREDICT_DISTANCES = [
  { label: '1 km', meters: 1000 },
  { label: '1500 m', meters: 1500 },
  { label: '1 mijl', meters: 1609 },
  { label: '3 km', meters: 3000 },
  { label: '5 km', meters: 5000 },
  { label: '10 km', meters: 10000 },
  { label: 'Halve marathon', meters: 21097 },
  { label: 'Marathon', meters: 42195 },
];
