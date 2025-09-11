// API Configuration - Change this to switch between providers
export const API_CONFIG = {
  // Switch between 'gemini' and 'groq'
  provider: 'groq' as 'gemini' | 'groq',
  
  // API endpoints
  endpoints: {
    gemini: '/api/generate-patent-stream',
    groq: '/api/generate-patent-groq'
  },
  
  // Provider specific settings
  settings: {
    gemini: {
      rateLimitDelay: 5000, // 5 seconds between requests
      maxRetries: 2,
      model: 'gemini-1.5-flash'
    },
    groq: {
      rateLimitDelay: 500, // 0.5 seconds between requests
      maxRetries: 2,
      model: 'llama-3.1-70b-versatile'
    }
  }
}

// Helper function to get the current API endpoint
export function getApiEndpoint(): string {
  return API_CONFIG.endpoints[API_CONFIG.provider];
}

// Helper function to get current provider settings
export function getProviderSettings() {
  return API_CONFIG.settings[API_CONFIG.provider];
}
