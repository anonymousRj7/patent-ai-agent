# API Provider Configuration

This project supports both Groq and Gemini APIs for patent generation. You can easily switch between them.

## Current Setup

### ✅ Groq API (Currently Active)

- **Endpoint**: `/api/generate-patent-groq`
- **Model**: `llama-3.1-70b-versatile`
- **Advantages**:
  - Much faster generation
  - Higher rate limits
  - Better for development and testing
- **Rate Limits**: More generous than Gemini

### 🧠 Gemini API (Alternative)

- **Endpoint**: `/api/generate-patent-stream`
- **Model**: `gemini-1.5-flash`
- **Advantages**:
  - Good quality output
  - Different model capabilities
- **Rate Limits**: ~15 requests per minute (free tier)

## How to Switch Between APIs

### Method 1: Configuration File (Recommended)

Edit `lib/api-config.ts`:

```typescript
export const API_CONFIG = {
  // Change this line to switch providers
  provider: "groq" as "gemini" | "groq", // Change to 'gemini' to use Gemini
  // ... rest of config
};
```

### Method 2: Environment Variable (Future Enhancement)

You could add this to your `.env.local`:

```bash
API_PROVIDER=groq  # or 'gemini'
```

## Environment Variables Required

Make sure these are in your `.env.local`:

```bash
GEMINI_API_KEY=your_gemini_key_here
GROQ_API_KEY=your_groq_key_here
```

## API Key Sources

### Groq API Key

- Sign up at: https://console.groq.com/
- Free tier includes generous rate limits
- Models: Llama 3.1, Mixtral, etc.

### Gemini API Key

- Get from: https://ai.google.dev/
- Free tier with usage limits
- Models: Gemini 1.5 Flash, Pro, etc.

## Files Created/Modified

### New Files:

- `app/api/generate-patent-groq/route.ts` - Groq API endpoint
- `app/api/generate-patent-groq/utils.ts` - Groq-specific utilities
- `lib/api-config.ts` - API configuration
- `components/api-provider-indicator.tsx` - Shows current provider

### Modified Files:

- `app/patent-generation/page.tsx` - Uses dynamic API endpoint
- `.env.local` - Added Groq API key

## Testing

1. **Test Groq (Current)**:

   - Should be much faster
   - Better rate limits
   - Check console for "Generating section: X with Groq"

2. **Test Gemini**:
   - Change `provider: 'gemini'` in `lib/api-config.ts`
   - Restart your dev server
   - Should see original Gemini behavior

## Troubleshooting

### Rate Limits

- **Groq**: Usually much more generous, 0.5s delays between sections
- **Gemini**: 5s delays between sections, more aggressive backoff

### API Key Issues

- Check `.env.local` has the correct keys
- Restart your development server after changing environment variables
- Verify API keys are valid in their respective consoles

### Switching Not Working

- Make sure to restart your Next.js dev server after changing the config
- Check the browser console for any errors
- Look for the API provider indicator in the bottom-right corner

## Performance Comparison

| Feature          | Groq                    | Gemini           |
| ---------------- | ----------------------- | ---------------- |
| Speed            | ⚡ Very Fast            | 🐌 Slower        |
| Rate Limits      | 🟢 Generous             | 🟡 Limited       |
| Model Quality    | 🟢 Excellent            | 🟢 Excellent     |
| Cost (Free Tier) | 🟢 High Usage           | 🟡 Limited Usage |
| Best For         | Development, Production | Light Usage      |

## Recommendation

**Use Groq for development and most production use cases** due to better performance and rate limits.
