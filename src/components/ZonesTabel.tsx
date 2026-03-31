import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllTrainingPaces, getCoachZones, formatZonePace, formatPace } from '../lib/vdot';
import { ZONE_COLORS, getUnitLabel } from '../lib/zones';

type ZoneMode = 'coach' | 'daniels' | 'both';
type UnitMode = 'auto' | 'weg' | 'baan';

interface Props {
  vdot: number;
  defaultMode?: ZoneMode;
}

function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-slate-700 text-xs font-semibold">
      {options.map((o) => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          className={`px-3 py-1.5 transition-colors ${
            value === o.key
              ? 'bg-blue-500 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const DANIELS_ZONE_CONFIG = [
  { label: 'Easy (E)',       color: ZONE_COLORS[1] },
  { label: 'Marathon (M)',   color: ZONE_COLORS[3] },
  { label: 'Threshold (T)',  color: ZONE_COLORS[5] },
  { label: 'Interval (I)',   color: ZONE_COLORS[7] },
  { label: 'Repetition (R)', color: ZONE_COLORS[9] },
];

export default function ZonesTabel({ vdot, defaultMode = 'both' }: Props) {
  const { t } = useTranslation();
  const [zoneMode, setZoneMode] = useState<ZoneMode>(defaultMode);
  const [unitMode, setUnitMode] = useState<UnitMode>('auto');

  const coachZones = getCoachZones(vdot);
  const daniels = getAllTrainingPaces(vdot);

  const fmt = (minPerKm: number, zoneId: number) =>
    formatZonePace(minPerKm, zoneId, unitMode);

  return (
    <div className="space-y-4">
      {/* Toggles */}
      <div className="flex flex-wrap gap-3">
        <ToggleGroup
          options={[
            { key: 'coach' as ZoneMode,   label: t('toggle_coach') },
            { key: 'daniels' as ZoneMode, label: t('toggle_daniels') },
            { key: 'both' as ZoneMode,    label: t('toggle_both') },
          ]}
          value={zoneMode}
          onChange={setZoneMode}
        />
        <ToggleGroup
          options={[
            { key: 'auto' as UnitMode, label: t('toggle_auto') },
            { key: 'weg' as UnitMode,  label: t('toggle_weg') },
            { key: 'baan' as UnitMode, label: t('toggle_baan') },
          ]}
          value={unitMode}
          onChange={setUnitMode}
        />
      </div>

      <div className={`grid gap-5 ${zoneMode === 'both' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>

        {/* ── Coach zones ── */}
        {(zoneMode === 'coach' || zoneMode === 'both') && (
          <div>
            {zoneMode === 'both' && (
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                {t('toggle_coach')}
              </p>
            )}
            <div className="rounded-xl border border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-10">#</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Zone</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Bandbreedte</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Core</th>
                  </tr>
                </thead>
                <tbody>
                  {coachZones.map((zone, i) => {
                    const colors = ZONE_COLORS[zone.id];
                    const unit = getUnitLabel(zone.id, unitMode);
                    const hasCore = zone.core_slow !== null && zone.core_fast !== null;
                    return (
                      <tr
                        key={zone.id}
                        className={`border-b border-slate-700/50 last:border-0 ${i % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/50'}`}
                      >
                        <td className="pl-4 py-3">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold ${colors.badge}`}>
                            {zone.id}
                          </span>
                        </td>
                        <td className={`px-4 py-3 font-semibold text-sm ${colors.text}`}>
                          {zone.name}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="font-bold text-slate-100 tabular-nums font-mono">
                            {fmt(zone.fast, zone.id)} – {fmt(zone.slow, zone.id)}
                          </span>
                          <span className="text-slate-500 text-xs ml-1">{unit}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {hasCore ? (
                            <>
                              <span className="text-slate-400 tabular-nums font-mono text-sm">
                                {fmt(zone.core_fast!, zone.id)} – {fmt(zone.core_slow!, zone.id)}
                              </span>
                              <span className="text-slate-600 text-xs ml-1">{unit}</span>
                            </>
                          ) : (
                            <span className="text-slate-700">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Daniels zones ── */}
        {(zoneMode === 'daniels' || zoneMode === 'both') && (
          <div>
            {zoneMode === 'both' && (
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                {t('toggle_daniels')}
              </p>
            )}
            <div className="rounded-xl border border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Zone</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Pace</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: t('daniels_E'), color: ZONE_COLORS[1], pace: `${formatPace(daniels.E_fast)} – ${formatPace(daniels.E_slow)}` },
                    { label: t('daniels_M'), color: ZONE_COLORS[3], pace: formatPace(daniels.M) },
                    { label: t('daniels_T'), color: ZONE_COLORS[5], pace: formatPace(daniels.T) },
                    { label: t('daniels_I'), color: ZONE_COLORS[7], pace: formatPace(daniels.I) },
                    { label: t('daniels_R'), color: ZONE_COLORS[9], pace: formatPace(daniels.R) },
                  ].map((z, i) => (
                    <tr
                      key={z.label}
                      className={`border-b border-slate-700/50 last:border-0 ${i % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/50'}`}
                    >
                      <td className="px-4 py-3 flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${z.color.border.replace('border-', 'bg-')}`} />
                        <span className={`font-semibold ${z.color.text}`}>{z.label}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-bold text-slate-100 tabular-nums font-mono">{z.pace}</span>
                        <span className="text-slate-500 text-xs ml-1">/km</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
