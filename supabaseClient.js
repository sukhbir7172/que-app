import { createClient } from "@supabase/supabase-js";

const SUPA_BASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPA_BASE_ANNON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPA_BASE_URL,SUPA_BASE_ANNON_KEY)
