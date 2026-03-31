import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateVDOT, RACE_DISTANCES, formatTime } from '../lib/vdot';
import { addTestResult } from '../lib/supabase';

interface Props {
  athleteId: string;
  onSaved: () => void;
}

export default function TestInvoerForm({ athleteId, onSaved }: Props) {
  const { t } = useTranslation();
  const today = new Date().toISOString().split('T')[0];

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(today);
  const [distanceKey, setDistanceKey] = useState('5000');
  const [customMeters, setCustomMeters] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const distanceMeters =
    distanceKey === 'custom' ? parseInt(customMeters) || 0 : parseInt(distanceKey);
  const timeMinutes = (parseInt(minutes) || 0) + (parseInt(seconds) || 0) / 60;
  const canCalculate = distanceMeters >= 800 && timeMinutes > 0 && minutes !== '';
  const previewVdot = canCalculate ? calculateVDOT(distanceMeters, timeMinutes) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (distanceMeters < 800) { setError(t('distance_too_short')); return; }
    if (timeMinutes <= 0) return;
    const vdot = calculateVDOT(distanceMeters, timeMinutes);
    setSaving(true);
    try {
      await addTestResult({
        athleteId,
        testDate: date,
        distanceMeters,
        timeMinutes,
        vdot: Math.round(vdot * 100) / 100,
        notes: notes.trim() || undefined,
      });
      setMinutes(''); setSeconds(''); setNotes('');
      setOpen(false);
      onSaved();
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  }

  const inputCls = 'w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full border-2 border-dashed border-slate-700 rounded-2xl py-4 text-sm font-semibold text-slate-500 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        {t('new_test')}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 border border-blue-500/20 rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-100">{t('new_test')}</h2>
        <button type="button" onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-300 p-1 rounded-lg hover:bg-slate-700 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">{t('field_date')}</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">{t('field_distance')}</label>
          <select value={distanceKey} onChange={(e) => setDistanceKey(e.target.value)} className={`${inputCls} appearance-none`}>
            {RACE_DISTANCES.map((d) => (
              <option key={d.meters ?? 'custom'} value={d.meters ?? 'custom'}>{d.label}</option>
            ))}
          </select>
        </div>
        {distanceKey === 'custom' && (
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">{t('field_custom_meters')}</label>
            <input type="number" value={customMeters} onChange={(e) => setCustomMeters(e.target.value)} placeholder="3000" className={inputCls} min={800} />
          </div>
        )}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">{t('field_time')}</label>
          <div className="flex items-center gap-1.5">
            <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="mm" min={0} className="w-16 bg-slate-900 border border-slate-600 rounded-lg px-2 py-2 text-sm text-center text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <span className="text-slate-600 font-bold">:</span>
            <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} placeholder="ss" min={0} max={59} className="w-16 bg-slate-900 border border-slate-600 rounded-lg px-2 py-2 text-sm text-center text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
        </div>
        <div className="col-span-2 md:col-span-4">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">{t('field_notes')}</label>
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Omstandigheden, gevoel..." className={inputCls} />
        </div>
      </div>

      {/* VDOT preview */}
      {previewVdot !== null && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-5 py-4 flex items-center gap-5">
          <div>
            <p className="text-xs font-semibold text-blue-400/70 uppercase tracking-widest mb-0.5">VDOT</p>
            <p className="text-4xl font-black text-blue-400 leading-none tabular-nums">
              {previewVdot.toFixed(1)}
            </p>
          </div>
          <div className="text-slate-400 text-sm font-mono">{formatTime(timeMinutes)}</div>
        </div>
      )}

      {error && <p className="text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || !canCalculate}
          className="bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-500/20"
        >
          {saving ? t('saving') : t('save_btn')}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors">
          Annuleer
        </button>
      </div>
    </form>
  );
}
