import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jwbvgaxeniozmtyigfcr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3YnZnYXhlbmlvem10eWlnZmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2OTAyMTYsImV4cCI6MjA5NTI2NjIxNn0.wuJA6LbNwl8J_gle9JeFtKKxXdiGewjbOm2YrU9-ASI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
