import { defineConfig } from 'astro/config';

// The Instagram carousel (promo/) is a page that only exists under `astro dev`,
// so it never ships with the site. `npm run promo` renders it to PNGs.
// Rendered per request so it can read the QR address from its query string.
const promo = {
  name: 'promo',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command !== 'dev') return;
      injectRoute({ pattern: '/promo', entrypoint: new URL('./promo/Carousel.astro', import.meta.url), prerender: false });
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
