// Music and small theatre sounds, all made in the browser: no audio files, nothing to license.
// One switch controls both. It starts "on", but nothing ever plays until the guest taps
// something (tearing the ticket starts the music), and the switch is on every screen.

export type SoundName = 'tear' | 'paper' | 'curtain' | 'applause' | 'host';

const KEY = 'slw-sound';
let context: AudioContext | null = null;

export function soundOn(): boolean {
  try {
    return localStorage.getItem(KEY) !== 'off';
  } catch {
    return true;
  }
}

export function setSound(on: boolean): void {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    // Not remembered; it still works for this visit.
  }
  if (on) startMusic();
  else stopMusic();
}

function audio(): AudioContext | null {
  if (!context) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    context = new Ctor();
    // Nothing plays in a background tab (and it saves the phone's battery).
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) void context?.suspend();
      else if (soundOn()) void context?.resume();
    });
  }
  if (context.state === 'suspended' && !document.hidden) void context.resume();
  return context;
}

let noiseBuffer: AudioBuffer | null = null;
function noise(c: AudioContext): AudioBuffer {
  if (!noiseBuffer) {
    noiseBuffer = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

/** One burst of filtered noise. */
function burst(c: AudioContext, at: number, length: number, peak: number, filter: BiquadFilterType, freq: number, q = 1) {
  const src = c.createBufferSource();
  src.buffer = noise(c);
  const f = c.createBiquadFilter();
  f.type = filter;
  f.frequency.value = freq;
  f.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(0, at);
  g.gain.linearRampToValueAtTime(peak, at + Math.min(0.004, length / 4));
  g.gain.exponentialRampToValueAtTime(0.0001, at + length);
  src.connect(f).connect(g).connect(c.destination);
  src.start(at, Math.random() * 1.5, length + 0.05);
  return { f, g };
}

/**
 * Paper is a crackle: many tiny, bright clicks. (A single soft burst in the middle of the
 * range reads as a voice going "hmm", which is what the first version sounded like.)
 */
function crackle(c: AudioContext, at: number, length: number, grains: number, loudness: number, brightness = 4200) {
  for (let i = 0; i < grains; i++) {
    const t = at + length * Math.pow(Math.random(), 0.8);
    burst(c, t, 0.002 + Math.random() * 0.006, loudness * (0.4 + Math.random() * 0.6), 'highpass', brightness + Math.random() * 3000, 0.7);
  }
}

export function play(name: SoundName): void {
  if (!soundOn()) return;
  const c = audio();
  if (!c) return;
  const now = c.currentTime + 0.01;

  if (name === 'tear') crackle(c, now, 0.32, 70, 0.22, 2600);
  if (name === 'paper') crackle(c, now, 0.18, 26, 0.12);

  if (name === 'curtain') {
    const { f } = burst(c, now, 1.7, 0.22, 'lowpass', 300, 0.7);
    f.frequency.setValueAtTime(300, now);
    f.frequency.linearRampToValueAtTime(1500, now + 0.7);
    f.frequency.linearRampToValueAtTime(500, now + 1.7);
  }

  if (name === 'host') {
    // Ambrose's signature: three quick notes on the waltz's music box, in its key,
    // so it sits inside the music instead of on top of it. Three variations take turns.
    const motif = hostMotifs[hostTurn++ % hostMotifs.length]!;
    const out = c.createGain();
    out.gain.value = 0.5;
    out.connect(c.destination);
    motif.forEach((midi, i) => tine(c, out, now + i * 0.09, midi, 0.16 - i * 0.02));
  }

  if (name === 'applause') {
    // Many small claps, thickest in the middle, over a soft wash of crowd.
    burst(c, now, 3.2, 0.05, 'lowpass', 1800, 0.5);
    for (let i = 0; i < 170; i++) {
      const t = now + 2.9 * Math.pow(Math.random(), 1.15);
      burst(c, t, 0.012 + Math.random() * 0.012, 0.05 + Math.random() * 0.08, 'bandpass', 1000 + Math.random() * 1600, 1.2);
    }
  }
}

const hostMotifs = [[84, 81, 89], [81, 84, 86], [77, 81, 84]];
let hostTurn = 0;

// ---------------------------------------------------------------------------
// Music: an original waltz for a music box, in F major, 3/4, about 70 seconds before it repeats.

const BEAT = 60 / 84;
const VOLUME = 0.16;

const chords: Record<string, [number, number, number]> = {
  F: [53, 57, 60], Dm: [50, 57, 62], Bb: [46, 58, 62], C: [48, 55, 64], Am: [45, 57, 64],
};
const progression = ['F', 'Dm', 'Bb', 'C', 'F', 'Am', 'Bb', 'C', 'Dm', 'Bb', 'F', 'C', 'Bb', 'C', 'F', 'F'];
/** The tune, bar by bar: [beat in the bar, MIDI note, length in beats]. */
const tune: [number, number, number][][] = [
  [[0, 81, 2], [2, 84, 1]],
  [[0, 86, 1], [1, 84, 1], [2, 81, 1]],
  [[0, 82, 1.5], [1.5, 81, 0.5], [2, 79, 1]],
  [[0, 79, 2], [2, 76, 1]],
  [[0, 77, 1], [1, 81, 1], [2, 84, 1]],
  [[0, 88, 2], [2, 84, 1]],
  [[0, 86, 1], [1, 82, 1], [2, 79, 1]],
  [[0, 84, 3]],
  [[0, 81, 1], [1, 86, 1], [2, 81, 1]],
  [[0, 82, 2], [2, 86, 1]],
  [[0, 84, 1], [1, 81, 1], [2, 77, 1]],
  [[0, 79, 1], [1, 81, 1], [2, 82, 1]],
  [[0, 86, 2], [2, 84, 1]],
  [[0, 82, 1], [1, 81, 1], [2, 79, 1]],
  [[0, 77, 3]],
  [[0, 72, 1], [1, 77, 1], [2, 81, 1]],
];

type Note = { beat: number; midi: number; gain: number };
const LOOP_BEATS = progression.length * 3 * 2;

/** Two passes: the second adds a quiet sparkle an octave up on each bar's first note. */
const score: Note[] = (() => {
  const notes: Note[] = [];
  for (let pass = 0; pass < 2; pass++) {
    progression.forEach((name, bar) => {
      const at = (pass * progression.length + bar) * 3;
      const [root, a, b] = chords[name]!;
      notes.push({ beat: at, midi: root, gain: 0.42 });
      notes.push({ beat: at + 1, midi: a, gain: 0.13 }, { beat: at + 1, midi: b, gain: 0.11 });
      notes.push({ beat: at + 2, midi: a, gain: 0.11 }, { beat: at + 2, midi: b, gain: 0.09 });
      tune[bar]!.forEach(([beat, midi], i) => {
        notes.push({ beat: at + beat, midi, gain: 0.5 });
        if (pass === 1 && i === 0) notes.push({ beat: at + beat, midi: midi + 12, gain: 0.14 });
      });
    });
  }
  return notes.sort((x, y) => x.beat - y.beat);
})();

/** A music-box tine: a few sine partials that ring and fade, lower notes ringing longer. */
function tine(c: AudioContext, out: AudioNode, at: number, midi: number, gain: number) {
  const freq = 440 * 2 ** ((midi - 69) / 12);
  const ring = 0.7 + Math.min(1.3, 700 / freq);
  for (const [ratio, amp, decay] of [[1, 1, 1.5], [2, 0.3, 0.6], [3.01, 0.09, 0.3], [4.17, 0.04, 0.16]] as const) {
    const osc = c.createOscillator();
    osc.frequency.value = freq * ratio;
    const g = c.createGain();
    const end = at + decay * ring;
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(gain * amp, at + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, end);
    osc.connect(g).connect(out);
    osc.start(at);
    osc.stop(end + 0.05);
  }
}

let master: GainNode | null = null;
let bus: GainNode | null = null;
let timer = 0;
let loopStart = 0;
let nextNote = 0;
let level = 1;

function buildChain(c: AudioContext) {
  master = c.createGain();
  master.gain.value = 0;
  master.connect(c.destination);
  bus = c.createGain();
  bus.connect(master);
  // A small room: a short, soft reverb from decaying noise.
  const verb = c.createConvolver();
  const length = c.sampleRate * 2.2;
  const impulse = c.createBuffer(2, length, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
  }
  verb.buffer = impulse;
  const wet = c.createGain();
  wet.gain.value = 0.28;
  bus.connect(verb).connect(wet).connect(master);
}

function schedule() {
  const c = context;
  if (!c || !bus) return;
  const horizon = c.currentTime + 0.3;
  for (;;) {
    const note = score[nextNote]!;
    const at = loopStart + note.beat * BEAT;
    if (at > horizon) break;
    if (at > c.currentTime - 0.05) tine(c, bus, at, note.midi, note.gain);
    nextNote += 1;
    if (nextNote >= score.length) {
      nextNote = 0;
      loopStart += LOOP_BEATS * BEAT;
    }
  }
}

export const musicPlaying = () => timer !== 0;

/** Start the waltz. Call it from a tap: browsers only allow sound after one. */
export function startMusic(): void {
  if (!soundOn() || timer) return;
  const c = audio();
  if (!c) return;
  if (!master) buildChain(c);
  loopStart = c.currentTime + 0.25;
  nextNote = 0;
  schedule();
  timer = window.setInterval(schedule, 100);
  master!.gain.cancelScheduledValues(c.currentTime);
  master!.gain.setValueAtTime(master!.gain.value, c.currentTime);
  master!.gain.linearRampToValueAtTime(VOLUME * level, c.currentTime + 2.5);
}

export function stopMusic(): void {
  const c = context;
  if (!c || !master || !timer) return;
  window.clearInterval(timer);
  timer = 0;
  master.gain.cancelScheduledValues(c.currentTime);
  master.gain.setValueAtTime(master.gain.value, c.currentTime);
  master.gain.linearRampToValueAtTime(0, c.currentTime + 0.8);
}

/** Softer or fuller: 1 is normal. The Wings play it quietly; the curtain call ducks it for applause. */
export function setMusicLevel(next: number, seconds = 1.5): void {
  level = next;
  const c = context;
  if (!c || !master || !timer) return;
  master.gain.cancelScheduledValues(c.currentTime);
  master.gain.setValueAtTime(master.gain.value, c.currentTime);
  master.gain.linearRampToValueAtTime(VOLUME * level, c.currentTime + seconds);
}
