import { defineConfig } from 'astro/config';

// The Instagram carousel and the link-preview card (promo/) only exist under `astro dev`,
// so they never ship with the site. `npm run promo` / `npm run og` render them to PNGs.
// Rendered per request so it can read the QR address from its query string.
const promo = {
  name: 'promo',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command !== 'dev') return;
      injectRoute({ pattern: '/promo', entrypoint: new URL('./promo/Carousel.astro', import.meta.url), prerender: false });
      injectRoute({ pattern: '/og-card', entrypoint: new URL('./promo/OgCard.astro', import.meta.url), prerender: false });
    },
  },
};

export default defineConfig({
  // Set SITE_URL when deploying so link previews get absolute URLs.
  site: process.env.SITE_URL || 'http://localhost:4321',
  prefetch: { prefetchAll: true },
  devToolbar: { enabled: false },
  integrations: [promo],
});
