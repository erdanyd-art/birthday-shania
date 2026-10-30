import { defineConfig } from 'astro/config';

export default defineConfig({
  // Set SITE_URL when deploying so link previews get absolute URLs.
  site: process.env.SITE_URL || 'http://localhost:4321',
  prefetch: { prefetchAll: true },
  devToolbar: { enabled: false },
});
