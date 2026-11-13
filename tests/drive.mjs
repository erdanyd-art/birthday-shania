// Minimal Chrome DevTools driver for tests/tour.mjs: headless Chrome at phone size,
// eval + screenshots. No dependencies: needs Node 22+ (built-in WebSocket) and Google Chrome.
// Set CHROME=/path/to/chrome if Chrome lives somewhere else.
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function launch({ width = 390, height = 844, port = 9333 } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'slw-'));
  const proc = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${dir}`,
    '--autoplay-policy=no-user-gesture-required', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  let targets;
  for (let i = 0; i < 50; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch {}
    await sleep(150);
  }
  const page = targets.find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  let id = 0;
  const pending = new Map();
  const logs = [];
  ws.addEventListener('message', (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    if (msg.method === 'Runtime.exceptionThrown') logs.push('EXC ' + msg.params.exceptionDetails.exception?.description);
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') logs.push('ERR ' + msg.params.args.map((a) => a.value ?? a.description).join(' '));
  });
  const send = (method, params = {}) => new Promise((r) => { const n = ++id; pending.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 2, mobile: true });
  await send('Emulation.setTouchEmulationEnabled', { enabled: true });
  const api = {
    logs,
    send,
    async go(url) { await send('Page.navigate', { url }); await sleep(1500); },
    async ev(expr) {
      const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
      if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description ?? 'eval failed');
      return r.result?.result?.value;
    },
    async click(sel) { return api.ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return 'missing ${sel}'; e.click(); return 'ok';})()`); },
    async shot(file) { const r = await send('Page.captureScreenshot', { format: 'png' }); writeFileSync(file, Buffer.from(r.result.data, 'base64')); },
    async close() { ws.close(); proc.kill(); },
  };
  return api;
}
