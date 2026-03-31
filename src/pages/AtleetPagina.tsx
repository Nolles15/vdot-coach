import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  getAthleteById, getTestResults, deleteTestResult,
  type Athlete, type TestResult,
} from '../lib/supabase';
import { formatTime, RACE_DISTANCES } from '../lib/vdot';
import TestInvoerForm from '../components/TestInvoerForm';
import ZonesTabel from '../components/ZonesTabel';
import VdotGrafiek from '../components/VdotGrafiek';

export default function AtleetPagina() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [results, setResults] = useState<TestResult[]>([]);
  const [copied, setCopied] = useState(false);

  async function load() {
    if (!id) return;
    const [a, r] = await Promise.all([getAthleteById(id), getTestResults(id)]);
    setAthlete(a); setResults(r);
  }

  useEffect(() => { load(); }, [id]);

  const sorted = [...results].sort(
    (a, b) => new Date(b.test_date).getTime() - new Date(a.test_date).getTime()
  );
  const latestResult = sorted[0] ?? null;

  function copyPublicLink() {
    navigator.clipboard.writeText(`${window.location.origin}/p/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleDelete(rid: string) {
    if (!window.confirm(t('confirm_delete_test'))) return;
    await deleteTestResult(rid);
    await load();
  }

  function distanceLabel(meters: number): string {
    const found = RACE_DISTANCES.find((d) => d.meters === meters);
    return found ? found.label : `${meters} m`;
  }

  if (!athlete) {
    return (
      <div className="flex items-center gap-2 text-slate-500 text-sm">
        <div className="w-4 h-4 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
        Laden...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-200 transition-colors font-medium">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Terug
          </Link>
          <span className="text-slate-700">/</span>
          <h1 className="text-xl font-bold text-slate-100">{athlete.name}</h1>
        </div>
        <button
          onClick={copyPublicLink}
          className={`flex items-center gap-2 text-sm border rounded-lg px-3 py-1.5 transition-all font-medium ${
            copied
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : 'border-slate-700 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400 text-slate-400'
          }`}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7L5.5 10.5L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('link_copied')}
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M8 2H10C11.1 2 12 2.9 12 4V10C12 11.1 11.1 12 10 12H4C2.9 12 2 11.1 2 10V8M5 2H4C2.9 2 2 2.9 2 4V5M6 8L10 4M10 4H7.5M10 4V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('public_link')}
            </>
          )}
        </button>
      </div>

      {/* VDOT hero */}
      {latestResult && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-start gap-6 flex-wrap">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">VDOT</p>
              <p className="text-7xl font-black text-white leading-none tabular-nums">
                {latestResult.vdot.toFixed(1)}
              </p>
              <p className="text-sm text-slate-500 mt-3">
                {new Date(latestResult.test_date).toLocaleDateString('nl-NL')} ·{' '}
                {distanceLabel(latestResult.distance_meters)} ·{' '}
                {formatTime(latestResult.time_minutes)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Test invoer */}
      <TestInvoerForm athleteId={athlete.id} onSaved={load} />

      {/* Zones */}
      {latestResult && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="font-bold text-slate-100 mb-5">{t('zones_title')}</h2>
          <ZonesTabel vdot={latestResult.vdot} />
        </div>
      )}

      {/* Voortgangsgrafiek */}
      {results.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="font-bold text-slate-100 mb-5">{t('progress_title')}</h2>
          <VdotGrafiek results={results} />
        </div>
      )}

      {/* Testhistorie */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <h2 className="font-bold text-slate-100 mb-5">{t('history_title')}</h2>
        {sorted.length === 0 ? (
          <p className="text-sm text-slate-500 italic">{t('no_results')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-700">
                  <th className="pb-3 text-left">{t('col_date')}</th>
                  <th className="pb-3 text-left">{t('col_distance')}</th>
                  <th className="pb-3 text-center">{t('col_time')}</th>
                  <th className="pb-3 text-center">{t('col_vdot')}</th>
                  <th className="pb-3 text-left">{t('col_notes')}</th>
                  <th className="pb-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {sorted.map((r, i) => (
                  <tr key={r.id} className="hover:bg-slate-700/30 transition-colors group">
                    <td className="py-3 text-slate-500 text-xs">
                      {new Date(r.test_date).toLocaleDateString('nl-NL')}
                    </td>
                    <td className="py-3 text-slate-300 font-medium">
                      {distanceLabel(r.distance_meters)}
                    </td>
                    <td className="py-3 text-center font-mono text-slate-300">
                      {formatTime(r.time_minutes)}
                    </td>
                    <td className="py-3 text-center">
                      <span className={`font-bold tabular-nums ${i === 0 ? 'text-blue-400' : 'text-slate-300'}`}>
                        {r.vdot.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-3 text-slate-600 text-xs">{r.notes ?? ''}</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all p-1 rounded"
                        title={t('delete_test')}
                      >
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                          <path d="M1 3.5H13M5 3.5V2H9V3.5M2.5 3.5L3.5 12H10.5L11.5 3.5H2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
