import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getCoachZones, getAllTrainingPaces, formatZonePace, formatPace } from '../lib/vdot';
import { ZONE_COLORS } from '../lib/zones';
import type { AthleteWithStats } from '../lib/supabase';

interface Props {
  athletes: AthleteWithStats[];
}

type ZoneMode = 'coach' | 'daniels';

const COACH_ZONE_NAMES = [
  'Herstel', 'Easy', 'Steady', 'AET / M',
  'LT', 'Groove', 'Vo2M', 'Fast', 'Sprint',
];

function fmtZone(minPerKm: number, zoneId: number): string {
  return formatZonePace(minPerKm, zoneId, 'auto');
}

const TH_BASE = 'px-3 py-2.5 text-center text-xs font-semibold whitespace-nowrap border-b-2';

export default function ZonesOverzicht({ athletes }: Props) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<ZoneMode>('coach');

  const withVdot = athletes.filter((a) => a.current_vdot !== null);

  if (withVdot.length === 0) {
    return <p className="text-sm text-slate-500 italic">{t('no_athletes')}</p>;
  }

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex rounded-lg overflow-hidden border border-slate-700 text-xs font-semibold w-fit">
        {(['coach', 'daniels'] as ZoneMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 transition-colors ${
              mode === m
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {m === 'coach' ? t('toggle_coach') : t('toggle_daniels')}
          </button>
        ))}
      </div>

      {/* ── Coach zones ── */}
      {mode === 'coach' && (
        <div className="overflow-x-auto">
          <table className="text-xs border-collapse min-w-full">
            <thead>
              <tr>
                <th className="px-3 py-2.5 text-left bg-slate-900 border-b border-slate-700 text-slate-400 font-semibold min-w-[130px] sticky left-0">
                  {t('col_name')}
                </th>
                <th className="px-3 py-2.5 text-center bg-slate-900 border-b border-slate-700 text-slate-400 font-semibold">
                  VDOT
                </th>
                {[1,2,3,4,5,6,7,8,9].map((id) => {
                  const c = ZONE_COLORS[id];
                  return (
                    <th key={id} className={`${TH_BASE} bg-slate-900 text-slate-200 ${c.border}`}>
                      <span className={`${c.text}`}>{id}</span>
                      <div className="text-slate-500 font-normal mt-0.5">{COACH_ZONE_NAMES[id - 1]}</div>
                    </th>
                  );
                })}
              </tr>
              <tr>
                <th className="px-3 py-1.5 bg-slate-900 border-b border-slate-700 sticky left-0" />
                <th className="px-3 py-1.5 bg-slate-900 border-b border-slate-700" />
                {[1,2,3,4,5,6,7].map((id) => (
                  <th key={id} className="px-3 py-1.5 bg-slate-900 border-b border-slate-700 text-center text-slate-600 font-normal">
                    /km
                  </th>
                ))}
                {[8,9].map((id) => (
                  <th key={id} className="px-3 py-1.5 bg-slate-900 border-b border-slate-700 text-center text-slate-600 font-normal">
                    s/100m
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {withVdot.map((athlete, ri) => {
                const vdot = athlete.current_vdot!;
                const zones = getCoachZones(vdot);
                return (
                  <tr key={athlete.id} className={`group hover:bg-blue-500/5 transition-colors ${ri % 2 === 0 ? 'bg-slate-800/60' : 'bg-slate-800/30'}`}>
                    <td className={`px-3 py-2.5 font-semibold sticky left-0 ${ri % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/80'}`}>
                      <Link to={`/atleet/${athlete.id}`} className="text-slate-200 group-hover:text-blue-400 transition-colors">
                        {athlete.name}
                      </Link>
                      {athlete.last_test_date && (
                        <div className="text-slate-600 text-xs font-normal mt-0.5">
                          {new Date(athlete.last_test_date).toLocaleDateString('nl-NL')}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center font-black text-white tabular-nums text-sm">
                      {vdot.toFixed(1)}
                    </td>
                    {zones.map((zone) => {
                      const c = ZONE_COLORS[zone.id];
                      const slowVal = zone.core_slow ?? zone.slow;
                      const fastVal = zone.core_fast ?? zone.fast;
                      return (
                        <td key={zone.id} className="px-3 py-2.5 text-center font-mono border-l border-slate-700/30">
                          <div className={`font-bold text-xs tabular-nums ${c.text}`}>
                            {fmtZone(fastVal, zone.id)}
                          </div>
                          <div className="text-slate-500 text-xs tabular-nums">
                            {fmtZone(slowVal, zone.id)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-xs text-slate-600 mt-3">
            Zones 1–7: mm:ss /km · Zones 8–9: sec/100m · Toont core range waar beschikbaar
          </p>
        </div>
      )}

      {/* ── Daniels zones ── */}
      {mode === 'daniels' && (
        <div className="overflow-x-auto">
          <table className="text-xs border-collapse min-w-full">
            <thead>
              <tr>
                <th className="px-3 py-2.5 text-left bg-slate-900 border-b border-slate-700 text-slate-400 font-semibold min-w-[130px] sticky left-0">
                  {t('col_name')}
                </th>
                <th className="px-3 py-2.5 text-center bg-slate-900 border-b border-slate-700 text-slate-400 font-semibold">
                  VDOT
                </th>
                {[
                  { label: 'Easy (E)',       id: 1 },
                  { label: 'Marathon (M)',   id: 3 },
                  { label: 'Threshold (T)',  id: 5 },
                  { label: 'Interval (I)',   id: 7 },
                  { label: 'Repetition (R)', id: 9 },
                ].map((z) => {
                  const c = ZONE_COLORS[z.id];
                  return (
                    <th key={z.label} className={`${TH_BASE} bg-slate-900 ${c.border}`}>
                      <span className={c.text}>{z.label}</span>
                      <div className="text-slate-600 font-normal mt-0.5">/km</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {withVdot.map((athlete, ri) => {
                const vdot = athlete.current_vdot!;
                const paces = getAllTrainingPaces(vdot);
                return (
                  <tr key={athlete.id} className={`group hover:bg-blue-500/5 transition-colors ${ri % 2 === 0 ? 'bg-slate-800/60' : 'bg-slate-800/30'}`}>
                    <td className={`px-3 py-2.5 font-semibold sticky left-0 ${ri % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/80'}`}>
                      <Link to={`/atleet/${athlete.id}`} className="text-slate-200 group-hover:text-blue-400 transition-colors">
                        {athlete.name}
                      </Link>
                      {athlete.last_test_date && (
                        <div className="text-slate-600 text-xs font-normal mt-0.5">
                          {new Date(athlete.last_test_date).toLocaleDateString('nl-NL')}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center font-black text-white tabular-nums text-sm">
                      {vdot.toFixed(1)}
                    </td>
                    {/* Easy: bandbreedte */}
                    <td className="px-3 py-2.5 text-center font-mono border-l border-slate-700/30">
                      <div className={`font-bold text-xs tabular-nums ${ZONE_COLORS[1].text}`}>
                        {formatPace(paces.E_fast)}
                      </div>
                      <div className="text-slate-500 text-xs tabular-nums">
                        {formatPace(paces.E_slow)}
                      </div>
                    </td>
                    {/* M, T, I, R */}
                    {(['M', 'T', 'I', 'R'] as const).map((key, i) => {
                      const colorId = [3, 5, 7, 9][i];
                      return (
                        <td key={key} className="px-3 py-2.5 text-center font-mono border-l border-slate-700/30">
                          <span className={`font-bold text-xs tabular-nums ${ZONE_COLORS[colorId].text}`}>
                            {formatPace(paces[key])}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-xs text-slate-600 mt-3">Alle paces in mm:ss /km</p>
        </div>
      )}
    </div>
  );
}
