// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dhupeqacigadaojsursd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRodXBlcWFjaWdhZGFvanN1cnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MTg0NjUsImV4cCI6MjA2NjA5NDQ2NX0.TMSNycF4nnOhlV5m6iVeuTb02Q1ap8JD4Cl20OjL0dg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});