import { User, Session } from "@supabase/supabase-js"

export interface AuthState {
  user: User | null
  session: Session | null
  error: Error | null
}