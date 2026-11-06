# DESIGN.md: Greenwood Barbers London Heritage & 3 Distinct Design Architectures

> **Executive Design Read**: Ultra-exclusive gentlemen's barber parlor web application for distinguished patrons in Kota Baru Parahyangan, West Bandung. Functioning purely as an intuitive, high-converting booking gateway to WhatsApp (`+62 812-8899-7721`) with zero admin complexity, zero gimmicks, and zero unneeded features.

---

## 1. Core Principles & Client Resolutions

1. **Pure Booking Gateway**:
   - The website exists exclusively as an authoritative digital barbershop gateway for patrons to review treatments, select their master barber, and immediately reserve a chair via WhatsApp.
   - **NO Memberships / Subscriptions**: Completely omitted.
   - **NO Background Music / Audio Synthesizers**: Completely omitted. Dignified, serious, quiet luxury.

2. **Hierarki Warna Gelap Anti-Silau (Client Feedback)**:
   - **Base Canvas**: Deep Obsidian Pine (`#030c08` & `#06150e`) jauh lebih gelap dan tenang dari warna logo.
   - **Warna Logo Greenwood (`#063827`)**: Khusus digunakan sebagai aksen mid-tone (wax crest, velvet border highlight).
   - **Zero-Glare Neutrals**: Menghilangkan seluruh teks hijau mint/neon pucat yang menyilaukan; menggantinya dengan **Warm British Alabaster Cream (`#f7f2e7`)** dan **Antique Parchment Taupe (`#beb5a5`)**.
   - **Aksen Logam**: Gilded Antique Brass & Ochre Gold (`#c59b48`, `#e2be6c`).

3. **Geometris Simetris & Anti-Enter (Rapi & Sejajar)**:
   - Menghilangkan enter (`<br>`) janggal pada teks deskripsi.
   - Menggunakan flexbox & grid sejajar (`display: flex; flex-direction: column; justify-content: space-between`) sehingga seluruh kartu layanan, kartu barber, dan kartu gallery memiliki tinggi piksel yang identik horizontal line-by-line.

4. **Mobile UI/UX Ergonomics (Sangat Nyaman & Pas di Smartphone)**:
   - **Touch Targets Nyaman**: Seluruh tombol, tab stepper, slot jam, dan link navigasi berukuran minimal 44×44px untuk kenyamanan sentuhan jempol (*thumb-friendly*).
   - **Viewport Fit & Zero Overflow**: Dilengkapi `viewport-fit=cover` dan `overflow-x: hidden` untuk tampilan sempurna di iPhone/Android tanpa pergeseran horizontal canggung.
   - **Anti-Zoom Safari iOS**: Seluruh input formulir berukuran 16px sehingga Safari iPhone tidak melakukan auto-zoom saat fokus mengetik.
   - **Native Touch Strips**: Pemilihan tanggal dapat digulir horizontal mulus (*touch swipe chip*), dan slot waktu tersusun dalam grid 3 kolom yang proporsional.
   - **Floating Quick Dock**: Dilengkapi floating bottom bar ramping yang mengambang di bawah layar untuk reservasi instan 1-ketukan tanpa perlu scroll jauh.

---

## 2. Tiga Referensi Model Desain yang Berbeda & Variatif

Untuk memberikan variasi dan kebebasan memilih kepada klien, telah dirancang **3 Model Desain dengan arsitektur, layout, tipografi, dan nuansa yang sepenuhnya berbeda**:

### 👑 Model 1: British Heritage Flagship (FINAL PRODUCTION MULTI-PAGE WEBSITE)
* **Arsitektur**: **Dedicated Multi-Page Website Architecture (Bukan Lagi Single Landing Page)**.
* **Struktur Halaman Mandiri**:
  1. **Home (`home.html` / `FIGMA_MODEL_1_BRITISH_HERITAGE.html`)**: The Grand Foyer, ikhtisar filosofi, highlight 4 pilar kepercayaan, ringkasan layanan, barber preview, dan teaser apothecary.
  2. **The Experience (`experience.html`)**: Pendalaman The Gentlemen's Retreat, filosofi ketenangan tanpa tergesa-gesa, 5 Sacred Rituals (Steamed Linen, Lathering Arts, Solingen Razor Glide, Alum Stone, Cranial Acupressure), instrumen Takara Belmont Apollo II, dan St. James Private VIP Suite.
  3. **Services Tariff (`services.html`)**: Portofolio 8 ritual lengkap standar Barberia Indonesia & Truefitt & Hill Chicago dengan interactive category filter (Haircuts, Shaving, Restorative, Color), rincian langkah ritual, dan tombol reservasi instan per layanan.
  4. **Master Barbers (`barbers.html`)**: Dossier lengkap 5 master bladesmiths (Aldi Pratama, Bramantyo Wardhana, Dimas Setiawan, Farhan Hakim, Rian Hidayat) dengan profil kredensial, filosofi kerja, dan link reservasi khusus kursi masing-masing.
  5. **Apothecary (`apothecary.html`)**: 6 formulasi grooming premium (Mayfair Shaving Cream, Botanical Pre-Shave Glaze, Silvertip Badger Brush, Post-Shave Balm, Matte Pomade, Beard Elixir) dengan fitur tambah ke kursi perawatan dan order via WhatsApp.
  6. **The Parlour (`parlour.html`)**: Dossier lokasi Ruko PancaTengah Kota Baru Parahyangan, peta interaktif Google Maps, layanan parkir mudah, jam operasional, dan pedoman etiket/FAQ.
  7. **Booking Suite (`booking.html`)**: Engine reservasi mandiri lengkap dengan stepper dinamis (Layanan, Barber, Tanggal & Sesi Jam, Add-on Produk, Data Tamu, Metode Bayar Transparan), ringkasan struk sticky live, dan Dispatch Modal Otomatis 3 Saluran (WhatsApp Admin +62 812-8899-7721, Google Calendar + .ics, Email Passport).
* **Pilar Desain & Referensi Multi-Koleksi**:
  1. **Pertahanan Teknis Warna Model 1**: Palet Obsidian & Velvet Emerald (`#030c08`, `#06150e`, `#063827`) dipadu Antique Gold (`#c59b48`, `#e2be6c`) dan Cream Alabaster (`#f7f2e7`) bebas silau (WCAG AAA).
  2. **Gaya Bahasa & Copywriting [Patek Philippe Manufacture]**: Gaya bahasa agung khas horologi tinggi (*Quality and Fine Workmanship / Chronograph Watches*). Menggunakan diksi kepakaran artisan: *Surgical Shear Geometry*, *Ceremonial Straight-Razor Stroke*, *Inalterable Precision*, *Measured Cadence*, dan *Noble Botanical Infusions*. Bebas em-dash, tanpa kalimat hiperbolik murahan.
  3. **Arsitektur Struktur Barbershop [Barberia Indonesia Reference]**: Portofolio layanan: *The Superior Barber Cut*, *Traditional Hot Towel Wet Shave*, *The Full Grooming Experience*, *The Executive Beard Sculpture*, *Scalp & Shoulder Acupressure*, dan *The Little Gentleman Cut*. Dilengkapi profil Parlour Kota Baru Parahyangan dengan Chesterfield lounge dan interactive Google Maps.
  4. **Pilar Produk, Barber, Jadwal, Payment & Booking [Truefitt & Hill Chicago]**:
     * **Produk (Curated Apothecary)**: Portofolio produk otentik (1805 Shaving Cream Bowl, Trafalgar Pre-Shave Oil, Silvertip Badger Handmade Brush, Ultimate Comfort Aftershave Balm, Bay Rum Scalp Tonic, C.A.R. Hair Dressing Cream) dengan fitur interaktif tambah ke reservasi kursi.
     * **Barber**: Roster 5 Master Barbers (Bramantyo, Rian Pratama, Dimas Setiawan, Farhan Akbar, Aldi Maulana) dengan penugasan Kursi I s/d V dan opsi "First Available Master Chair".
     * **Jadwal (Time Cadence)**: Pembagian sesi waktu (Morning Quiet Hours 10:00-12:00, Afternoon Executive Sessions 12:00-16:30, Evening Private Sessions 17:00-20:30) dengan status ketersediaan live.
     * **Payment**: Pilihan metode pembayaran transparan (Pay In-Chair via Cash/Debit/Card, QRIS Instant Dynamic, VIP Bank Transfer Virtual Account BCA) dengan rincian biaya nett bebas biaya siluman.
     * **Booking Engine 5 Langkah**: Alur mulus dari Treatment -> Barber -> Schedule -> Products -> Guest Details & Payment.
  5. **Sistem Notifikasi Otomatis 3 Saluran**:
     * **Notifikasi WhatsApp Admin**: Auto-generate payload lengkap dan tombol instan kirim ke kasir admin (`+62 812-8899-7721`).
     * **Notifikasi Google Calendar**: Pembuatan event 1-klik via Google Calendar URL resmi dan file `.ics` (iCalendar RFC 5545) siap unduh langsung.
     * **Notifikasi Email**: E-passport tanda terima digital otomatis ke email tamu dan admin (`admin@greenwoodbarbers.com`) lengkap dengan fitur Live HTML Email Preview.

### 🌑 Model 2: The Velvet Noir Atelier (Architectural Minimalist Luxury)
* **File**: `FIGMA_MODEL_2_MODERN_NOIR.html`
* **Konsep & Arsitektur**: Speakeasy grooming atelier kontemporer dengan estetika arsitektur gelap (Tokyo Ginza meets London Noir).
* **Karakteristik Visual**:
  * Kanvas ultra-gelap Pitch Noir (`#020704`, `#05140b`) dengan aksen Champagne Gold (`#dfc17b`).
  * *Hero*: Tipografi fashion editorial berukuran besar di tengah dengan **Quick-Booking Bar Horizontal mengambang langsung di dalam hero** (pilih ritual, pilih barber, pilih jam, klik reservasi).
  * *Treatment Atelier*: **Bukan format buku 2 kolom**, melainkan **Horizontal Split Rows (01, 02, 03, 04)** memanjang penuh dengan deskripsi arsitektural dan tombol seleksi cepat.
  * *Lookbook*: Kolase foto asimetris (1 foto vertikal besar di kiri, 2 foto kartu stacked di kanan).
  * *Artisans*: Foto monokrom kontras tinggi yang bertransformasi menjadi warna saat di-hover.
  * *Booking Console*: Konsol booking minimalis modern dengan tab horizontal tipis.

### 🥃 Model 3: The St. James's Private Suite & Apothecary (Warm Amber Mahogany & Heritage Craft)
* **File**: `FIGMA_MODEL_3_ARTISANAL_AMBER.html`
* **Konsep & Arsitektur**: Ruang cukur privat eksekutif berpadu dengan apotek botani klasik Inggris.
* **Karakteristik Visual**:
  * Palet kayu mahoni tua pekat (`#140b06`), hijau spruce (`#030f08`), dan kilau emas amber cognac hangat (`#cf8a38`, `#f0b865`).
  * *Hero*: Panoramic masthead ruang privat dengan 3 Comfort Pillars (Acoustic Privacy, Complimentary Pour, Zero Waiting).
  * *Treatment Formulary*: Portofolio layanan dengan **siku kuningan vintage (brass corner brackets)**, merinci formula bahan botani alami (Eucalyptus dingin, Sandalwood, Minyak Jojoba).
  * *Artisans*: Roster master craftsman dengan penugasan kursi suite khusus.
  * *Booking Engine*: Penjadwalan berdasarkan pembagian waktu eksekutif (Morning Quiet Hours, Afternoon Executive Sessions, Evening Private Sessions).

---

## 3. Koleksi Aset Fotografi (14 Foto Terintegrasi di `assets/`)

1. `hero_barbershop.jpg`: Interior autentik Mayfair London & kursi Belmont.
2. `transformation_master_cut.jpg`: Transformasi Before & After gentleman di kursi master.
3. `gallery_haircut_style.jpg`: Tailored gentleman dengan busana rapi menikmati suasana lounge.
4. `sanctuary_lounge.jpg`: Ruang tunggu Chesterfield leather lounge, kristal decanter & majalah.
5. `tools_artisan.jpg`: Pisau lipat Sheffield, gunting Jepang, dan botol ramuan tonik botani.
6. `service_haircut.jpg`, `service_shave.jpg`, `service_beard.jpg`, `service_treatment.jpg`: 4 foto aksi ritual layanan.
7. `barber_bramantyo.jpg` s/d `barber_aldi.jpg`: 5 potret Master Barber untuk 5 Kursi Guild.

---

## 4. Validasi Teknis & Akses

* **Server Lokal**: `http://localhost:8080/`
* **Model 1**: `http://localhost:8080/FIGMA_MODEL_1_BRITISH_HERITAGE.html`
* **Model 2**: `http://localhost:8080/FIGMA_MODEL_2_MODERN_NOIR.html`
* **Model 3**: `http://localhost:8080/FIGMA_MODEL_3_ARTISANAL_AMBER.html`
* **Master Showcase Hub**: `http://localhost:8080/index.html`
* **Arsip ZIP Siap Kirim**: `greenwood_barbers_client_preview.zip`
