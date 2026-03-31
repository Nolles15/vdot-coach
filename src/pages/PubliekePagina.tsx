import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAthleteById, getTestResults, type Athlete, type TestResult } from '../lib/supabase';
import { formatTime, RACE_DISTANCES } from '../lib/vdot';
import ZonesTabel from '../components/ZonesTabel';
import VdotGrafiek from '../components/VdotGrafiek';

export default function PubliekePagina() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([getAthleteById(id), getTestResults(id)]).then(([a, r]) => {
      setAthlete(a);
      setResults(r);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-gray-400 text-sm">Laden...</p>;

  if (!athlete) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">{t('public_no_data')}</p>
      </div>
    );
  }

  const sorted = [...results].sort(
    (a, b) => new Date(b.test_date).getTime() - new Date(a.test_date).getTime()
  );
  const latest = sorted[0] ?? null;

  function distanceLabel(meters: number): string {
    const found = RACE_DISTANCES.find((d) => d.meters === meters);
    return found ? found.label : `${meters} m`;
  }

  return (
    <div className="space-y-6">
      {/* Atleet header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">{athlete.name}</h1>
        {latest && (
          <p className="text-sm text-gray-500 mt-1">
            {t('vdot_label')}{' '}
            <span className="font-bold text-gray-900 text-lg">
              {latest.vdot.toFixed(1)}
            </span>
            {' '}· {t('public_tested')}{' '}
            {new Date(latest.test_date).toLocaleDateString('nl-NL')}
            {' '}· {distanceLabel(latest.distance_meters)}{' '}
            {formatTime(latest.time_minutes)}
          </p>
        )}
      </div>

      {/* Zones */}
      {latest ? (
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
          <h2 className="font-semibold text-gray-800">{t('zones_title')}</h2>
          <ZonesTabel vdot={latest.vdot} defaultMode="coach" />
        </div>
      ) : (
        <p className="text-gray-400 italic">{t('public_no_data')}</p>
      )}

      {/* Voortgang */}
      {results.length > 1 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
          <h2 className="font-semibold text-gray-800">{t('progress_title')}</h2>
          <VdotGrafiek results={results} />
        </div>
      )}
    </div>
  );
}
