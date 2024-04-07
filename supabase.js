// supabase.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uymohtxakjtqlpvgxckg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5bW9odHhha2p0cWxwdmd4Y2tnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3Mzk4OTgsImV4cCI6MjAyNzMxNTg5OH0.OqNq1Ai0OLLs_8x_pUijvqlUIny4wrQGW80puOQJHGY';

const supabase = createClient(supabaseUrl, supabaseKey);
