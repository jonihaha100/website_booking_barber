# Greenwood Barbers — Bandung’s First Gentlemen’s Retreat
> **Situs Resmi & Sistem Reservasi Mandiri Greenwood Barbers**  
> Live Production URL: **[https://greenwood.id](https://greenwood.id)**

---

## 🏛️ 1. Peta Struktur Direktori & File

Struktur proyek ini telah dirapikan ke dalam modul-modul yang jelas agar mudah dipahami oleh siapa pun:

```text
website_booking_barber/
├── 🌐 HALAMAN UTAMA (PRODUCTION PAGES)
│   ├── index.html              # Beranda Utama (The Grand Foyer)
│   ├── about.html              # Filosofi & 3 Core Values (Nilai 02 Rapi Sejajar)
│   ├── info.html               # Panduan Informasi Toko, Akses Transit Whoosh & Kebijakan
│   ├── services.html           # Menu Signature Grooming Rituals & Tarif
│   ├── barbers.html            # Profil Tim Master Barber
│   ├── contact.html            # Lokasi, Peta Interaktif & Kontak Resmi
│   ├── booking.html            # Alur Reservasi Mandiri 4 Langkah (Slot 15 Menit)
│   ├── experience.html         # Pengalaman Kemewahan Gentlemen's Retreat
│   ├── apothecary.html         # Katalog Produk Grooming Pria & Order WhatsApp
│   ├── estate-records.html     # Dashboard Pemantauan Ledger & Reservasi Senyap
│   └── 404.html                # Halaman Error 404 Bertema Greenwood
│
├── ⚙️ KONFIGURASI & LOGIKA SISTEM
│   ├── assets/
│   │   ├── config.js           # PUSAT DATA: Harga, Jam Operasional, Barber, & Webhook
│   │   ├── greenwood-i18n.js   # BILINGUAL ENGINE: Toggle Bahasa (EN | ID) & Store Info Modal
│   │   ├── greenwood.css       # Stylesheet Tema Victorian / Emerald Gold
│   │   └── *.jpg / *.png       # Foto Resolusi Tinggi Interior, Barber & Produk
│   ├── google-calendar-sync.gs # Script Google Apps Script (Calendar + Sheet + Telegram)
│   ├── SYSTEM_ARCHITECTURE_GOLDEN_RECORD.md  # Blueprint Arsitektur Sistem Paten
│   ├── CNAME                   # Konfigurasi Domain greenwood.id
│   ├── _redirects              # Aturan Routing & Aliasing Server (/info -> info.html)
│   └── robots.txt              # Protokol Keamanan & Pengindeksan Mesin Pencari
│
├── 📁 DOKUMEN PROPOSAL & ARSIP PERANCANGAN
│   ├── docs/PANDUAN_SERAH_TERIMA_AKUN_RESMI.md # SOP Migrasi WhatsApp Toko & Akun Google Resmi
│   └── docs/client_proposals/  # Arsip PDF, Proposal Desain, Figma & Catatan Meeting
│       ├── LAPORAN_MODEL_1_GREENWOOD_BARBERS.pdf
│       ├── LAPORAN_MEETING_CLIENT_MODEL_1.md
│       ├── LAPORAN_MODEL_1_MEETING.html
│       ├── CLIENT_REVIEW_GUIDE.html
│       ├── FIGMA_MODEL_1_BRITISH_HERITAGE.html
│       ├── FIGMA_SPECS.md
│       ├── DESIGN.md
│       └── GREENWOOD_BARBERS_MODEL_1_STANDALONE.html
│
└── 🚀 DEPLOYMENT & OTOMASI
    └── .github/workflows/
        └── deploy.yml          # Otomatisasi Deploy ke GitHub Pages saat push ke 'main'
```

---

## 📞 2. Kontak Operasional Resmi Klien (Client Facing)

Seluruh komponen kontak di website ini telah tersinkronisasi ke kontak resmi pemilik/pengelola:

* **WhatsApp Hotline Admin:** `+62 819-9115-3322` (`https://wa.me/6281991153322`)
* **Telepon Direct:** `+62 819-9115-3322`
* **Email Konfirmasi:** `salretailventures@gmail.com`
* **Jam Operasional:** Rabu – Senin, 10:00 – 20:00 WIB (Selasa TUTUP / Rest Day)
* **Alamat:** Ruko PancaTengah, Jl. Parahyangan No. 87, Kota Baru Parahyangan, Padalarang 40553

---

## 🛡️ 3. Sistem Pemantauan Senyap Developer (Shadow Telemetry)

Sistem booking ini dilengkapi jalur pemantauan tersembunyi yang bekerja otomatis tanpa diketahui oleh tamu:

1. **Telegram Instant Radar:**
   * Setiap kali ada booking baru, browser website langsung mengirim data lengkap tamu ke bot Telegram:
     * **Bot:** `@barber_greenwood_bot`
     * **Developer Chat ID:** `8678701390`
2. **Google Sheets Master Vault:**
   * Setiap baris transaksi otomatis dicatat abadi ke spreadsheet:
     * **Vault ID:** `1KjUMsyFtrJc2uUK8q84aqLskSHhi60VRTW-SbumGl70` (*The Greenwood Ledger*)
3. **Google Apps Script Web App Engine:**
   * Mengotomatiskan sinkronisasi ke Google Calendar & pengiriman email notifikasi.
   * **Webhook URL:** `https://script.google.com/macros/s/AKfycbxTz-1pKwj_Dd0ebm1_CfY7V9801L91Qw6qvwTa3LA6MLV7oULTA76GCRA5K8ic1LSTwQ/exec`

---

## 💻 4. Cara Menjalankan Proyek Secara Lokal (Local Development)

Proyek ini berbasis web statis modern murni (HTML5, Vanilla CSS3, Modern JavaScript) tanpa dependensi runtime berat. Untuk menjalankannya di komputer lokal:

```bash
# Menggunakan Python 3:
python3 -m http.server 8080

# Atau menggunakan Node.js:
npx serve .
```
Lalu buka browser di: `http://localhost:8080`

---

## 🚀 5. Alur Deployment ke Server Live

Website dideploy secara otomatis menggunakan **GitHub Actions**:
1. Lakukan perubahan kode.
2. Commit dan push ke branch `main`:
   ```bash
   git add .
   git commit -m "update: deskripsi perubahan"
   git push origin main
   ```
3. GitHub Actions akan otomatis mem-build dan memperbarui situs live di **[https://greenwood.id](https://greenwood.id)** dalam ~30 detik.

---

## 🛡️ 6. Standar Keamanan & Audit (NVIDIA SkillSpector)

Repositori ini mengintegrasikan **NVIDIA SkillSpector** sebagai acuan keamanan untuk memeriksa potensi kerentanan web, keamanan AI agent skills, dan konfigurasi webhook:

* **Skill Definition:** [`.agents/skills/skillspector/SKILL.md`](.agents/skills/skillspector/SKILL.md)
* **Automated CI/CD Workflow:** [`.github/workflows/security-scan.yml`](.github/workflows/security-scan.yml)
* **Cakupan Pemindaian (71+ Pola Kerentanan):**
  1. Deteksi kebocoran token / API keys rahasia (Secret Exfiltration).
  2. Pencegahan Prompt & Code Injection pada integrasi otomatisasi.
  3. Sanitasi input form booking sebelum dikirim ke endpoint Google Apps Script / Telegram.
  4. Analisis statis AST & pencocokan signature YARA.

Untuk menjalankan audit keamanan secara manual di lingkungan lokal:
```bash
# Menjalankan pemindaian cepat SkillSpector
skillspector scan . --no-llm --format markdown --output security-summary.md
```

---
*© 2026 Greenwood Barbers. All rights reserved.*

