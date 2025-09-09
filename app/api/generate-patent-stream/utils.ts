// Utility to delay execution
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Retry with exponential backoff - optimized for Gemini API rate limits
export async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 2, // Reduced retries to avoid spam
  initialDelay = 5000 // Increased initial delay to 5 seconds
): Promise<Response | { error: string; status: number }> {
  let lastError: Error | null = null;
  let currentDelay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      // If rate limited, wait longer and retry
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after');
        // Use longer wait times for rate limits
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.max(currentDelay, 10000);
        console.log(`Rate limited. Waiting ${waitTime}ms before retry (attempt ${attempt + 1}/${maxRetries + 1})...`);
        await delay(waitTime);
        currentDelay = Math.min(currentDelay * 2, 60000); // Cap at 60 seconds
        continue;
      }

      // Success - return the response
      if (response.ok) {
        return response;
      }

      // Non-rate-limit error
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error as Error;
      console.error(`Attempt ${attempt + 1} failed:`, error);
      
      if (attempt < maxRetries) {
        console.log(`Waiting ${currentDelay}ms before retry...`);
        await delay(currentDelay);
        currentDelay = Math.min(currentDelay * 2, 30000); // Cap at 30 seconds for non-rate-limit errors
      }
    }
  }

  return {
    error: `API request failed after ${maxRetries + 1} attempts: ${lastError?.message || 'Unknown error'}`,
    status: 429
  };
}
