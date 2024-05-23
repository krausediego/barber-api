import * as env from 'env-var';

export default {
  projectUrl: env.get('SUPABASE_PROJECT_URL').required().asString(),
  apiKey: env.get('SUPABASE_API_KEY').required().asString(),
} as const;
