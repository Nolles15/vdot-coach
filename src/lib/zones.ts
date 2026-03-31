// Zone-kleuren als accent — uitsluitend voor borders, tekst en badges (NOOIT cel-achtergrond)

export const ZONE_COLORS: Record<number, { border: string; text: string; badge: string }> = {
  1: { border: 'border-emerald-500', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-400' },
  2: { border: 'border-emerald-400', text: 'text-emerald-300', badge: 'bg-emerald-500/20 text-emerald-300' },
  3: { border: 'border-yellow-400',  text: 'text-yellow-400',  badge: 'bg-yellow-500/20 text-yellow-400'  },
  4: { border: 'border-yellow-500',  text: 'text-yellow-500',  badge: 'bg-yellow-500/20 text-yellow-500'  },
  5: { border: 'border-orange-500',  text: 'text-orange-400',  badge: 'bg-orange-500/20 text-orange-400'  },
  6: { border: 'border-orange-600',  text: 'text-orange-500',  badge: 'bg-orange-500/20 text-orange-500'  },
  7: { border: 'border-red-500',     text: 'text-red-400',     badge: 'bg-red-500/20 text-red-400'        },
  8: { border: 'border-red-600',     text: 'text-red-500',     badge: 'bg-red-500/20 text-red-500'        },
  9: { border: 'border-red-700',     text: 'text-red-600',     badge: 'bg-red-600/20 text-red-600'        },
};

export function getUnitLabel(zoneId: number, mode: 'auto' | 'weg' | 'baan'): string {
  const useBaan = mode === 'baan' || (mode === 'auto' && zoneId >= 8);
  return useBaan ? 'sec/100m' : '/km';
}
