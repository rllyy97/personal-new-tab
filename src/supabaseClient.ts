import { createClient } from "@supabase/supabase-js";

export const Supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!, 
  process.env.REACT_APP_SUPABASE_KEY!
)
