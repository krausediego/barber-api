import * as env from 'env-var';

export default {
  baseUrl: env.get('BASE_URL_GEOCODING').asString(),
  apiKey: env.get('API_KEY_GEOCODING').asString(),
} as const;
