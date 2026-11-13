// Renders the Instagram carousel to promo/out/*.png (1080 × 1350 each).
// Uses the project's running `astro dev` (or starts one), opens /promo in headless
// Chrome over the DevTools protocol and photographs every [data-slide] at 2x.
//   npm run promo                                   draft: the QR is a stamped placeholder
//   SITE_URL=https://the-real-address npm run promo   final: a real QR to that address
import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 4399;
const DEBUG_PORT = 9334;
const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = fileURLToPath(new URL('./out/', import.meta.url));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitFor(url, check) {
  let last = 'no response';
  for (let i = 0; i < 150; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return check ? await check(res) : res;
      last = `HTTP ${res.status}`;
    } catch {}
    await sleep(200);
  }
  throw new Error(`Timed out waiting for ${url} (${last}). If it's a 500, open the page in a browser to see the error.`);
}

// Astro runs one dev server per project: reuse it if it's already up (whatever it answers).
const running = await fetch('http://localhost:4321/promo').then(() => true, () => false);
const base = running ? 'http://localhost:4321' : `http://localhost:${PORT}`;
const astro = running ? null : spawn('npx', ['astro', 'dev', '--port', String(PORT)], { cwd: root, stdio: 'ignore' });
// The address for the QR travels in the query, so a running server needn't restart.
const page = `${base}/promo${process.env.SITE_URL ? `?url=${encodeURIComponent(process.env.SITE_URL)}` : ''}`;
const profile = fileURLToPath(new URL('./.chrome-profile/', import.meta.url));
let chrome;

try {
  await waitFor(page);
  chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${DEBUG_PORT}`, `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore' });
  const targets = await waitFor(`http://127.0.0.1:${DEBUG_PORT}/json/list`, async (res) => {
    const list = await res.json();
    if (!list.some((t) => t.type === 'page')) throw new Error('no page yet');
    return list;
  });

  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let seq = 0;
  const pending = new Map();
  const events = new Set();
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
    } else if (msg.method) for (const l of events) l(msg);
  };
  const send = (method, params = {}) =>
    new Promise((res, rej) => {
      const id = ++seq;
      pending.set(id, { res, rej });
      ws.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? 'evaluate failed');
    return r.result.value;
  };

  await send('Page.enable');
  await send('Runtime.enable');
  events.add((m) => {
    if (m.method === 'Runtime.exceptionThrown') console.log('Page error:', m.params.exceptionDetails.exception?.description?.split('\n')[0]);
  });
  await send('Emulation.setDeviceMetricsOverride', { width: 1720, height: 1000, deviceScaleFactor: 2, mobile: false });
  // Every entrance animation snaps to its end state, so nothing is caught mid-move.
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });

  const loaded = new Promise((r) => events.add((m) => m.method === 'Page.loadEventFired' && r()));
  await send('Page.navigate', { url: page });
  await loaded;
  await evaluate('document.fonts.ready.then(() => true)');
  await sleep(600);

  const slides = await evaluate(`[...document.querySelectorAll('[data-slide]')].map((el) => {
    const r = el.getBoundingClientRect();
    return { name: el.dataset.slide, x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height };
  })`);

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  for (const { name, ...clip } of slides) {
    const { data } = await send('Page.captureScreenshot', { format: 'png', clip: { ...clip, scale: 1 }, captureBeyondViewport: true });
    await writeFile(`${outDir}${name}.png`, Buffer.from(data, 'base64'));
    console.log(`promo/out/${name}.png`);
  }
  ws.close();
} finally {
  chrome?.kill();
  astro?.kill();
  await rm(profile, { recursive: true, force: true }).catch(() => {});
}
