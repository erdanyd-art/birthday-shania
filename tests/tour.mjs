// Walks the whole tour as a first-time guest and checks nobody can skip ahead.
// Run with the dev server up:  npm run dev  (one terminal), then  npm run test:tour  (another).
// Every line should say PASS. Screenshots land in tests/out/ (not committed).
// One known harmless console line: "Transition was aborted… Viewport size changed"
// (headless Chrome only).
import { launch, sleep } from './drive.mjs';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL || 'http://localhost:4321';
const OUT = new URL('./out/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const b = await launch();
const path = () => b.ev('location.pathname');
let failures = 0;
const check = (name, ok, extra = '') => {
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? '  · ' + extra : ''}`);
};
const progress = () => b.ev(`JSON.parse(localStorage.getItem('slw-progress-v2')||'{}')`);
const mapShown = () => b.ev(`(()=>{const l=document.querySelector('.house-link'); return !!l && getComputedStyle(l).display!=='none';})()`);
const tourBar = () => b.ev(`[...document.querySelectorAll('[data-stop]')].map(li=>li.dataset.stop+':'+(li.classList.contains('locked')?'locked':li.classList.contains('current')?'current':li.classList.contains('done')?'done':'open')+(li.querySelector('a').hasAttribute('href')?'':'(nolink)')).join(' ')`);
const tryLink = async (href) => { await b.ev(`(()=>{const a=document.createElement('a');a.href=${JSON.stringify(href)};document.body.append(a);a.click();})()`); await sleep(1800); return path(); };
const dock = () => b.ev(`(()=>{const d=document.querySelector('[data-dock]'); if(!d) return 'none'; const vis=s=>{const e=d.querySelector(s);return e&&e.offsetParent!==null}; return d.dataset.state+(d.hasAttribute('data-led')?' led':'')+' todo:'+vis('.mini-todo')+' go:'+vis('.mini-go');})()`);
const openGate = async () => {
  await b.ev(`document.querySelector('[data-gate]').dispatchEvent(new Event('game:won'))`);
  await sleep(1000);
  await b.click('[data-gate-enter]');
  await sleep(600);
};
const toBottom = async () => { await b.ev(`window.scrollTo(0, document.documentElement.scrollHeight)`); await sleep(400); };

// 1. A stranger with a deep link lands at the box office.
await b.go(BASE + '/curtain-call');
check('deep link to finale → box office', (await path()) === '/', await path());
await b.go(BASE + '/house');
check('deep link to map → box office', (await path()) === '/', await path());
await b.shot(OUT + '01-entrance.png');

// 2. The ticket leads to the host.
await b.click('[data-tear]');
await sleep(3500);
check('ticket → stage', (await path()) === '/stage', await path());
check('map hidden during the tour', !(await mapShown()));
check('link ahead to /wings is turned back', (await tryLink('/wings')) === '/stage', await path());

// 3. Through the introduction.
for (let i = 0; i < 5; i++) { await b.click('[data-intro] [data-next]'); await sleep(500); }
await sleep(1800);
check('intro → archive', (await path()) === '/archive', await path());
check('tour bar: only Photos reachable', /archive:current dressing:locked\(nolink\) wings:locked\(nolink\) finale:locked\(nolink\)/.test(await tourBar()), await tourBar());
check('link ahead to /dressing-room is turned back', (await tryLink('/dressing-room')) === '/archive', await path());
await openGate();
await b.click('[data-dock-tuck]');
await sleep(500);
check('tucked dock shows the task, not Next', /todo:true go:false/.test(await dock()), await dock());
await b.shot(OUT + '02-archive-todo.png');
await sleep(4000);
await toBottom();
await sleep(1500);
check('reaching the end without lifting does not lead on', !(await dock()).includes('led'), await dock());
await b.ev('window.scrollTo(0,0)');
await b.click('[data-lift]');
await sleep(800);
await toBottom();
await sleep(1500);
check('after lifting + reading, Ambrose leads on', /lead led/.test(await dock()), await dock());
check('archive marked done', (await progress()).done?.includes('archive'));
check('tour bar: Notes now open', /dressing:open/.test(await tourBar()), await tourBar());
await b.shot(OUT + '03-archive-lead.png');
await b.click('[data-dock] .go');
await sleep(2000);
check('→ dressing room', (await path()) === '/dressing-room', await path());

// 4. Every note is open on the mirror; reading down to the end leads on.
await openGate();
check('notes shown in full, no pop-up', await b.ev(`!document.querySelector('dialog') && document.querySelectorAll('.note .words').length > 0`));
await b.shot(OUT + '04-dressing.png');
await sleep(4200);
await toBottom();
await sleep(1500);
check('end of the notes → leads on', /lead led/.test(await dock()), await dock());
await b.click('[data-dock] .go');
await sleep(2000);
check('→ wings', (await path()) === '/wings', await path());

// 5. The letter.
await openGate();
await sleep(4200);
await toBottom();
await sleep(1500);
check('end of the letter → leads on', /lead led/.test(await dock()), await dock());
check('map still hidden before the finale', !(await mapShown()));
await b.click('[data-dock] .go');
await sleep(2000);
check('→ curtain call', (await path()) === '/curtain-call', await path());

// 6. The finale, then the map.
await openGate();
for (let i = 0; i < 4; i++) { await b.click('[data-finale] [data-next]'); await sleep(i === 0 ? 3800 : 700); }
await sleep(800);
check('map link appears after the curtain', await mapShown());
check('tour bar all ticked', !/locked/.test(await tourBar()), await tourBar());
await b.shot(OUT + '05-company.png');
await b.click('[data-company] .btn');
await sleep(2000);
check('company → house map', (await path()) === '/house', await path());
await b.shot(OUT + '06-house.png');

// 7. Afterwards everything is open, and a reload keeps it.
await b.go(BASE + '/archive');
check('revisit any room after the show', (await path()) === '/archive', await path());
await b.go(BASE + '/');
check('box office offers the house', (await b.ev(`document.querySelector('[data-returning]').textContent`)).includes('house'));

console.log(b.logs.length ? 'console:\n' + b.logs.join('\n') : 'console: clean');
console.log(failures ? `${failures} FAILED` : 'All checks passed.');
await b.close();
process.exit(failures ? 1 : 0);
