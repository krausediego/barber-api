import env from '@/main/config/environments/supabase';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(env.projectUrl, env.apiKey);
