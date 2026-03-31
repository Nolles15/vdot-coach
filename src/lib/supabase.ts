import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Athlete {
  id: string;
  name: string;
  created_at: string;
}

export interface TestResult {
  id: string;
  athlete_id: string;
  test_date: string;
  distance_meters: number;
  time_minutes: number;
  vdot: number;
  notes: string | null;
  created_at: string;
}

// ─── Atleten ──────────────────────────────────────────────────────────────────

export async function getAthletes(): Promise<Athlete[]> {
  const { data, error } = await supabase
    .from('athletes')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addAthlete(name: string): Promise<Athlete> {
  const { data, error } = await supabase
    .from('athletes')
    .insert({ name })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteAthlete(id: string): Promise<void> {
  const { error } = await supabase.from('athletes').delete().eq('id', id);
  if (error) throw error;
}

export async function getAthleteById(id: string): Promise<Athlete | null> {
  const { data, error } = await supabase
    .from('athletes')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
}

// ─── Testresultaten ───────────────────────────────────────────────────────────

export async function getTestResults(athleteId: string): Promise<TestResult[]> {
  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('athlete_id', athleteId)
    .order('test_date', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addTestResult(params: {
  athleteId: string;
  testDate: string;
  distanceMeters: number;
  timeMinutes: number;
  vdot: number;
  notes?: string;
}): Promise<TestResult> {
  const { data, error } = await supabase
    .from('test_results')
    .insert({
      athlete_id: params.athleteId,
      test_date: params.testDate,
      distance_meters: params.distanceMeters,
      time_minutes: params.timeMinutes,
      vdot: params.vdot,
      notes: params.notes ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTestResult(id: string): Promise<void> {
  const { error } = await supabase.from('test_results').delete().eq('id', id);
  if (error) throw error;
}

// ─── Overzicht: alle atleten met hun laatste/beste/huidige VDOT ──────────────

export interface AthleteWithStats extends Athlete {
  current_vdot: number | null;
  best_vdot: number | null;
  last_vdot: number | null;
  last_test_date: string | null;
  results: TestResult[];
}

export async function getAthletesWithStats(): Promise<AthleteWithStats[]> {
  const athletes = await getAthletes();

  const results = await Promise.all(
    athletes.map(async (a) => {
      const tests = await getTestResults(a.id);
      const sorted = [...tests].sort(
        (x, y) => new Date(y.test_date).getTime() - new Date(x.test_date).getTime()
      );
      return {
        ...a,
        results: tests,
        current_vdot: sorted[0]?.vdot ?? null,
        best_vdot: tests.length ? Math.max(...tests.map((t) => t.vdot)) : null,
        last_vdot: sorted[0]?.vdot ?? null,
        last_test_date: sorted[0]?.test_date ?? null,
      };
    })
  );

  // Gesorteerd op current VDOT aflopend (geen test onderaan)
  return results.sort((a, b) => (b.current_vdot ?? -1) - (a.current_vdot ?? -1));
}
