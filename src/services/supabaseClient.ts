import { createClient } from "@supabase/supabase-js";

// Avoided using .env file so you can access it

const supabaseUrl = "https://yiibihtcpenmmfdcihuo.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpaWJpaHRjcGVubW1mZGNpaHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM5NTc2MTcsImV4cCI6MjAxOTUzMzYxN30.GouLs0yZ344Ufkhrxhs5ByTXLkD5WBw4Vr5j0O4G4bM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
