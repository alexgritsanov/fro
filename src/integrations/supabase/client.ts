// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xedlenoatcosdcjeqfqx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlZGxlbm9hdGNvc2RjamVxZnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2MDM4NjIsImV4cCI6MjA1ODE3OTg2Mn0.q4Q-94tak2CBRz0KGoXBZpTteWgVWIzOnBOiEpqAsCw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);