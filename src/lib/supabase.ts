import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const createSafeQueryBuilder = () => {
  const safePromise = Promise.resolve({ data: null, error: null });

  const chainable = {
    select: () => chainable,
    insert: () => safePromise,
    eq: () => chainable,
    neq: () => chainable,
    order: () => chainable,
    limit: () => chainable,
    maybeSingle: () => safePromise,
    then: safePromise.then.bind(safePromise),
    catch: safePromise.catch.bind(safePromise),
    finally: safePromise.finally.bind(safePromise),
  };

  return chainable;
};

const createSafeSupabaseClient = () => ({
  from: () => createSafeQueryBuilder(),
});

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createSafeSupabaseClient() as ReturnType<typeof createClient>;
