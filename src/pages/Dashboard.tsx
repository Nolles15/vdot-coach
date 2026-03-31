import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  getAthletesWithStats,
  addAthlete,
  deleteAthlete,
  type AthleteWithStats,
} from '../lib/supabase';
import ZonesOverzicht from '../components/ZonesOverzicht';

type Tab = 'atleten' | 'overzicht';

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(/\s+/);
  const letters = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : parts[0].slice(0, 2);
  return (
    <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
      <span className="text-xs font-bold text-blue-400 uppercase">{letters}</span>
    </div>
  );
}

function TrendIndicator({ current, best }: { current: number; best: number }) {
  if (best <= current) return null; // huidig IS best, geen trend tonen
  return null;
}

function VdotTrend({ results }: { results: AthleteWithStats['results'] }) {
  if (results.length < 2) return null;
  const sorted = [...results].sort(
    (a, b) => new Date(b.test_date).getTime() - new Date(a.test_date).getTime()
  );
  const delta = sorted[0].vdot - sorted[1].vdot;
  if (Math.abs(delta) < 0.05) return null;
  const positive = delta > 0;
  return (
    <span className={`flex items-center gap-0.5 text-xs font-bold tabular-nums ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
      {positive ? (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 8V2M2 5L5 2L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 2V8M2 5L5 8L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {positive ? '+' : ''}{delta.toFixed(1)}
    </span>
  );
}

export default function Dashboard() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>('atleten');
  const [athletes, setAthletes] = useState<AthleteWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await getAthletesWithStats();
      setAthletes(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    try {
      await addAthlete(newName.trim());
      setNewName('');
      setShowForm(false);
      await load();
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(e: React.MouseEvent, id: string, name: string) {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`${t('confirm_delete_athlete')}\n\n"${name}"`)) return;
    await deleteAthlete(id);
    await load();
  }

  return (
    <div className="space-y-6">
      {/* Tab toggle + actieknop */}
      <div className="flex items-center justify-between">
        <div className="flex bg-slate-800 border border-slate-700 rounded-xl p-1 gap-1">
          {(['atleten', 'overzicht'] as Tab[]).map((t_) => (
            <button
              key={t_}
              onClick={() => setTab(t_)}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
                tab === t_
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t_ === 'atleten' ? t('nav_athletes') : t('nav_overview')}
            </button>
          ))}
        </div>

        {tab === 'atleten' && (
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {t('add_athlete').replace('+ ', '')}
          </button>
        )}
      </div>

      {/* Toevoeg-formulier */}
      {tab === 'atleten' && showForm && (
        <form
          onSubmit={handleAdd}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex gap-3 items-end"
        >
          <div className="flex-1 max-w-xs">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              {t('col_name')}
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={t('athlete_name_placeholder')}
              autoFocus
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={adding || !newName.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-400 disabled:opacity-40 transition-colors"
          >
            {adding ? '...' : t('add_btn')}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Annuleer
          </button>
        </form>
      )}

      {tab === 'atleten' && (
        <>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 animate-pulse">
                  <div className="h-4 bg-slate-700 rounded w-24 mb-4" />
                  <div className="h-10 bg-slate-700 rounded w-16" />
                </div>
              ))}
            </div>
          ) : athletes.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <div className="text-5xl mb-4">🏃</div>
              <p className="font-medium text-slate-400">{t('no_athletes')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {athletes.map((a) => (
                <Link
                  key={a.id}
                  to={`/atleet/${a.id}`}
                  className="group bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all block relative overflow-hidden"
                >
                  {/* Subtiele glow op hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />

                  {/* Naam + avatar + delete */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <Initials name={a.name} />
                      <div>
                        <p className="font-bold text-slate-100 text-sm group-hover:text-blue-400 transition-colors">
                          {a.name}
                        </p>
                        {a.last_test_date && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            {new Date(a.last_test_date).toLocaleDateString('nl-NL')}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDelete(e, a.id, a.name)}
                      className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all p-1 -mr-1 -mt-1 rounded"
                      title={t('delete_athlete')}
                    >
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M1 3.5H13M5 3.5V2H9V3.5M2.5 3.5L3.5 12H10.5L11.5 3.5H2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* VDOT groot + trend */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">VDOT</p>
                      {a.current_vdot !== null ? (
                        <div className="flex items-end gap-2">
                          <p className="text-5xl font-black text-white tabular-nums leading-none">
                            {a.current_vdot.toFixed(1)}
                          </p>
                          <div className="mb-1">
                            <VdotTrend results={a.results} />
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 italic">Geen test</p>
                      )}
                    </div>

                    {a.best_vdot !== null && a.current_vdot !== null && a.best_vdot > a.current_vdot && (
                      <div className="text-right">
                        <p className="text-xs text-slate-500 mb-1">Best</p>
                        <p className="text-sm font-bold text-slate-400 tabular-nums">
                          {a.best_vdot.toFixed(1)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-700 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {a.results.length} {a.results.length === 1 ? 'test' : 'tests'}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-400 flex items-center gap-1 transition-colors">
                      Open
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5H8M5 2L8 5L5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'overzicht' && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <div className="mb-5">
            <h2 className="font-bold text-slate-100">{t('overview_title')}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{t('overview_subtitle')}</p>
          </div>
          {loading ? (
            <p className="text-slate-500 text-sm">Laden...</p>
          ) : (
            <ZonesOverzicht athletes={athletes} />
          )}
        </div>
      )}
    </div>
  );
}
