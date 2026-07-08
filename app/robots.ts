import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Standard Search Engines
        userAgent: '*',
        allow: '/',
      },
      {
        // OpenAI GPTBot
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        // Common Crawl (used by many LLMs)
        userAgent: 'CCBot',
        allow: '/',
      },
      {
        // Anthropic Claude
        userAgent: 'Anthropic-ai',
        allow: '/',
      },
      {
        // Google Extended (Gemini)
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        // Perplexity
        userAgent: 'PerplexityBot',
        allow: '/',
      }
    ],
    // Update this to your actual production domain once deployed
    sitemap: 'https://akshayraheja.com/sitemap.xml',
  };
}
