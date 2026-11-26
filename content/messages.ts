// Birthday notes for the Dressing Room. Every note is tucked into the same mirror, in the
// order they're listed here. Only real messages, from real people who agreed to be shown.
// Never add samples here.
//
// Shape of one entry (see types.ts):
//   {
//     id: 'msg-01',
//     name: 'Name as they want it shown',
//     relationship: 'Optional, e.g. Her cousin',
//     group: 'Campus friends',   // optional: only for a package sent together (see below)
//     message: 'Their words, exactly as sent.',
//     photo: 'optional-file-in-content-photos.jpg',
//     photoAlt: 'What the photo shows',
//   },
//
// Friends who sent their notes together as one package: give them all the same `group`
// and they're clipped together as one bundle, with the group's name on its tag. If they
// sent one photo for all of them, add it to `groupPhotos` below and it sits on top.

import type { BirthdayMessage, GroupPhoto } from './types';

export const messages: BirthdayMessage[] = [
  // ---- Internship friends: Key, Cut and Farra, one photo for the three (see groupPhotos) ----
  {
    id: 'key',
    name: 'Key',
    group: 'Internship friends',
    message:
      'Happiest birthdayyy shandut! hope your days are always filled with laughter, love, and little things that make you happy. enjoy your special day! 🥹💗 calam imut dari cakey terlucu sefh.',
  },
  {
    id: 'farra',
    name: 'Farra',
    group: 'Internship friends',
    message:
      'haaiiii shania ku, shandut ndut ndut, happy birthdayy tooo youu!! 🥳💗\n\nsemoga panjang umur, sehat selaluuu, makin cantik, makin unyuuu, makin bahagia, dan semoga apa pun yang kamu inginkan satu per satu bisa tercapai yaaa. semoga di umur yang baru ini banyak hal baik yang datang ke hidup kamu, selalu dikelilingi orang-orang baik, dan semua urusan kamu dipermudah.\n\nmakasih yaaa udah jadi salah satu orang yang bikin masa-masa kuliah aku jadi lebih seru dan berwarna. siapa sangka kenal dari semester 3 bisa jadi sedeket iniii, dari duduk sebelahan di kelas, main ke mall, kulineran, sampe magang barenggg. pokoknya semoga kita masih punya banyaaaak kesempatan buat bikin cerita dan kenangan lucu lainnya yaaa!!\n\nSTOPPPP SKIP MAKAAN SAMPE BEGETEERRR PLSS?!?! 😭😭 jangan suka begitu lagi, harus makan yang banyak biar sehat dan bisa nemenin aku kulineran teruss!!\n\nmarie kita wujudkan store cikumro and tahu kocek di depan rumah, ayooo kita kulineran lagii nyam nyam nyammm. semoga kita awet terusss sampe menjadi nenek" kalcer RORRR, jangan bosen-bosen sama aku yaaa shanduttt. love uuuu, enjoy your special dayyyy!! 💗💗\n\nwith love, farra❤️',
  },
  {
    id: 'cut',
    name: 'Cut',
    group: 'Internship friends',
    message:
      'hi candut, ini ncut😝 happy birthday yaa my sayang, sehat teruss, lancar rejekinya biar kita bisaaa mainnn terusss belii chikuro dan jajanan laper mata ntuh..\n\nhappy terusss yaaa...\n\nlu jelek kalo sedih 🤬\n\nhope all ur wish come true,\n\nwith love\n\n-ncut',
  },
  {
    id: 'nonik',
    name: 'Nonik',
    relationship: 'An old friend',
    message:
      'happy birthday niakk🫶🏻, ak gatauu si skrg umurmu brp, keknya otw 21 deh, tambah tua kan? sama🙂, tp yang pentingg km sehat, ttp happy, langgeng sm dany, rezekimu lancar, dijauhin dr toxic people sih yg terpenting, pokonya bahagia selalu , dari guee temen lama loo, princes nonikk🫶🏻😘🩷🩷🪽🌹',
    // One frame from Nonik's four-photo selfie collage.
    photo: 'nonik-selfie.jpg',
    photoAlt: 'A selfie of Shania and Nonik side by side, one in a grey hijab scrunching her nose at the camera, the other smiling with her head tilted.',
  },
  {
    id: 'githa',
    name: 'Githa',
    message:
      'happy birthday, shania!! ♡\n\nanother year, another chapterrr. may your days be filled with little joys, genuine love, and countless reasons to smile. wishing you nothing but the best, always!!\n\nxoxo, thaa🥂',
    photo: 'githa-courtroom.jpg',
    photoAlt: 'Shania and Githa standing side by side in a courtroom, both in black advocate robes with white bibs, smiling at the camera.',
  },
  // Nawa sits next to Githa on purpose: the two are close.
  {
    id: 'nawa',
    name: 'Nawa',
    message:
      "happy birthday my cutie pie bestie shan shan🐣😻👯‍♀️💝\n\nmy wish for you is that you put ur HEALTH FIRST cuz for me ur health is more important than anything. stop malas makan deh kata gue mah, kurangin begadang juga please?!\n\nsemua sayang shan shan so please make sure u love urself just as much, okay? i hope life treats u gently, semoga semua hal baik selalu nemuin jalan ke kamu. i hope u get everything u've been wishing for, more happiness, more laughter, and less things to worry about.\n\nthankiee sudah mau jadi cabat sedekat nadi(slalu bersama even mau tdr makan belajar semuwa dech) temenan sampe nenek nenek ya please masi banyak wishlist aneh yang blm kita realisasikan dan masi banyak jokes yang perlu kita ketawain HAHAHAHA\n\nso please stay healthy, stay happy, and never lose that silly little personality of yours. thank u for being u, and i hope this year brings u nothing but good things.\n\nlove u lots, shan shan😽💗",
    // The top frame of Nawa's two-photo booth strip.
    photo: 'nawa-photobooth.jpg',
    photoAlt: 'A photo-booth picture of Shania and Nawa under a disco ball, one winking with her hands on her cheeks, the other pouting with her chin on her hand.',
  },
  {
    id: 'caca',
    name: 'Caca',
    message:
      'happppyiiy bdaayyy kakk shannn! i hope your special day brings you as much happiness as you bring to everyone around you. may all ur dreams come true this year and never stop chasing your dreams, cz i know you are capable of achieving absolute greatness. may this year open doors to new opportunities, bring you peace of mind, and surround you with people who uplift you. cheers to another year of growing, learning, and shining bright! MICCCC UUUU KAKK SHANNN',
    photo: 'caca-beach.jpg',
    photoAlt: 'Shania and Caca standing together on a beach at dusk, a dark sea and a red streak of sunset behind them.',
  },
  {
    id: 'astried',
    name: 'Astried',
    message:
      'Happy birthday nyaaaakk! 🎂✨ Honestly, still can’t figure out how you’re getting older while staying this petite and cute😣💟Semoga di umur yang baru ini kamu makin happy, makin banyak rezekinya, and all your wishes come true. Please don’t ever change, stay sweet and mostly innocent even when your brain randomly being dirty-minded😭iykyk HAHA. andddddddd keep yapping, keep being my favorite pocket-sized cutie, and have the happiest birthday ever ya sayangko wuppyuuuuuu💖',
  },
  {
    id: 'salsa',
    name: 'Salsa',
    message:
      'happy birthday ya niakkk!🤍\n\nhope you’ll always be surrounded by love and happiness. I hope this year brings you everything you have ever wished for. be happy yaa Nia wishing you all the best.🤍🤍',
  },
  // ---- PUBG squad: Fatih and Alpian so far; a squad photo and maybe one more note to come ----
  {
    id: 'fatih',
    name: 'Fatih',
    group: 'PUBG squad',
    message:
      'saya mengucapkan selamat ulang tahun kepada mbak shania, semoga cepet putus dan melanjutkan ke jenjang yang lebih serius bersama mas erdany',
  },
  {
    id: 'alpian',
    name: 'Alpian',
    group: 'PUBG squad',
    message:
      'selamat ulang tahun mbak shania, sehat selalu semoga panjang umur, semoga dipermudah segala urusannya semoga cum laude',
  },
];

/**
 * People whose notes are still on their way. While developing, each gets a stamped
 * stand-in on the mirror (in their bundle, if they have a group), so the layout shows everyone. A launch build won't
 * run while anyone is listed here: move them into `messages` when their note arrives,
 * or delete them if it never does.
 */
export const awaiting: { name: string; group?: string }[] = [
];

export const groupPhotos: GroupPhoto[] = [
  {
    group: 'Internship friends',
    // One frame from Key's photo-booth strip.
    file: 'internship-photobooth.jpg',
    alt: 'A photo-booth picture of Shania with Key, Cut and Farra, four friends squeezed together in front of a red curtain, smiling and pouting at the camera.',
    focus: '50% 40%',
  },
];
