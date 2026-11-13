# Panduan: mengisi, mengecek, dan menerbitkan

Untuk Erdany. Semua isi pribadi ada di folder `content/`. Hampir semua sisa pekerjaan cukup
mengedit file teks di sana, tidak perlu menyentuh `src/`.

## Menjalankan di laptop

```sh
npm install          # sekali saja, setelah clone
npm run dev          # buka http://localhost:4321 (di HP: http://IP-laptop:4321, satu Wi-Fi)
```

Di mode ini isi yang belum ada tampil sebagai kotak bertulisan PLACEHOLDER, jadi kelihatan
apa yang masih kurang. Simpan file, halaman langsung berubah.

Kalau mau mencoba tur dari awal lagi di browser: buka halaman denah (`/house`) lalu tekan
"Start the tour over", atau hapus data situs di pengaturan browser.

## Yang masih kurang (per 13 Nov 2026)

| Apa | Taruh di mana |
|---|---|
| Ucapan Cut dan Farra | `content/messages.ts` (pindahkan dari `awaiting` ke `messages`) |
| Ucapan teman-teman lain | `content/messages.ts` |
| Izin Cut dan Farra fotonya dipajang | tanya langsung; foto ada di `content/photos/internship-photobooth.jpg` |
| Foto asli photobooth (kalau ada, versi kirim sebagai dokumen) | ganti file di atas, nama sama |
| Foto kecil Shania + foto sekarang | `content/archive.ts` + file di `content/photos/` |
| Narasi singkat untuk dua foto itu | `content/archive.ts`, bagian `narration` |
| Surat kamu + tanda tangan | `content/letter.ts` |
| Foto untuk surat (opsional) | `content/letter.ts`, bagian `photo` |
| Benda kesukaan Shania (opsional) | `content/site.ts`, bagian `favourites` |
| Alamat situs | saat deploy (lihat bawah) |

`npm run build` sengaja **gagal** selama masih ada yang kosong, dan pesan errornya menyebut
apa saja yang kurang. Jadi placeholder tidak mungkin ikut terbit.

## Menambah ucapan

Buka `content/messages.ts`. Satu ucapan = satu blok di dalam `messages`:

```ts
{
  id: 'nadia',                      // bebas, asal tidak kembar
  name: 'Nadia',                    // nama seperti yang dia mau ditampilkan
  relationship: 'Teman kuliah',     // opsional, tampil kecil di bawah nama
  message: 'Isi ucapannya, persis seperti yang dikirim.\n\nBaris kosong = paragraf baru.',
},
```

- Salin ucapannya **persis**, termasuk typo, panggilan, dan emoji.
- Semua ucapan tampil di satu cermin, sesuai urutan di file.
- **Satu paket** (beberapa teman kirim bareng, seperti Key, Cut, Farra): beri semuanya
  `group: 'Internship friends'` (teks yang sama persis). Mereka dikumpulkan jadi satu bundel.
  Kalau ada satu foto untuk satu paket, daftarkan di `groupPhotos`.
- Foto per orang (opsional): taruh file di `content/photos/`, lalu tambah
  `photo: 'nama-file.jpg', photoAlt: 'apa yang terlihat di foto'`.
- Kalau ucapannya belum datang tapi orangnya sudah pasti: tulis di `awaiting`. Begitu datang,
  pindahkan ke `messages` dan hapus dari `awaiting`.

Ucapan Cut nanti tinggal ditambah seperti ini, lalu baris Cut di `awaiting` dihapus:

```ts
{
  id: 'cut',
  name: 'Cut',
  group: 'Internship friends',
  message: '...isi dari Cut...',
},
```

## Foto

- Kirim dan simpan **file asli** (di WhatsApp: kirim sebagai dokumen, bukan foto).
- Taruh di `content/photos/`. Tidak perlu dikecilkan, build yang mengurusnya.
- Nama file peka huruf besar-kecil: `Kecil.JPG` beda dengan `kecil.jpg`.
- `alt`: satu kalimat apa yang terlihat di foto (untuk pembaca layar).
- `focus`: bagian yang harus tetap kelihatan kalau foto terpotong, misalnya `'50% 30%'`
  (tengah, sepertiga atas). Ubah kalau wajahnya kepotong.

## Mengubah kata-kata

- Semua kalimat Ambrose: `content/host.ts`.
- Nama Shania, nama kamu, nama host, judul, lagu: `content/site.ts`. Ganti di sini, semua
  halaman ikut berubah.
- Ambrose selalu memanggil "Shania", jangan nama panggilan.

## Mengecek sebelum terbit

```sh
npm run check        # harus 0 errors
npm run dev          # biarkan jalan, lalu di terminal lain:
npm run test:tour    # menjalani tur dari awal sampai akhir; semua baris harus PASS
npm run build        # harus berhasil (artinya semua isi sudah lengkap)
npm run preview      # lihat hasil build di http://localhost:4321
```

Coba juga di HP sungguhan: buka dari awal, mainkan keempat permainan, baca sampai habis,
tarik tirai di akhir.

## Menerbitkan (deploy)

Situsnya statis, jadi bisa di Vercel, Netlify, atau Cloudflare Pages (semuanya ada versi gratis).
Contoh di Vercel:

1. Masuk ke vercel.com dengan akun GitHub, "Add New Project", pilih repo `birthday-shania`.
2. Framework: Astro. Build command `npm run build`, output `dist` (biasanya terisi otomatis).
3. Setelah dapat alamatnya (misalnya `https://birthday-shania.vercel.app`), tambahkan
   Environment Variable `SITE_URL` = alamat itu, lalu deploy ulang. Ini supaya gambar pratinjau
   saat link dibagikan di WhatsApp/Instagram muncul.
4. Jangan pernah mengisi `PUBLIC_ALLOW_PLACEHOLDERS` di hosting.

Deploy pertama akan gagal kalau isinya belum lengkap. Itu disengaja.

Situs memakai `noindex`, jadi tidak muncul di Google; hanya yang punya link yang bisa buka.

## Gambar promosi Instagram

```sh
SITE_URL=https://alamat-asli npm run promo
```

Hasilnya di `promo/out/`. Teksnya di `promo/copy.ts`.

## Repo dan privasi

- Repo GitHub `erdanyd-art/birthday-shania` harus tetap **private**: ada foto Shania dan
  teman-temannya di dalamnya.
- Jangan unggah foto atau ucapan teman ke akun AI yang dipakai bersama orang lain.
- Lanjut pakai AI lain (Codex dsb.)? Dia akan membaca `AGENTS.md` di folder utama, yang
  berisi aturan proyek ini. Minta dia menjalankan `npm run check` dan `npm run test:tour`
  setiap selesai mengubah sesuatu.
