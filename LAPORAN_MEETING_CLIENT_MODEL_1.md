# LAPORAN EKSEKUTIF PROYEK WEBSITE — MODEL 1: BRITISH HERITAGE
## GREENWOOD BARBERS — FLAGSHIP KOTA BARU PARAHYANGAN

**Dokumen Presentasi & Laporan Resmi Klien**  
*Dipersiapkan Khusus untuk Agenda Rapat Evaluasi & Peluncuran Website*  
*Tanggal: 14 Oktober 2026*  
*Versi Desain: Model 1 — British Heritage (Production Final)*  

---

## 1. RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)

Website **Greenwood Barbers** dikembangkan dengan standar kemewahan tertinggi (*Ultra-Luxury British Heritage*) yang memadukan prestise pangkas rambut pria legendaris Mayfair London (**Truefitt & Hill**) dengan disiplin tipografi jam tangan mewah dunia (**Patek Philippe – Quality & Fine Workmanship**).

**Model 1 (British Heritage)** telah ditetapkan sebagai konsep final untuk diajukan kepada klien. Konsep ini secara khusus dirancang untuk menarik kalangan eksekutif, ekspatriat, dan warga terhormat kawasan **Kota Baru Parahyangan (KBP)** serta para komuter Kereta Cepat **Whoosh Padalarang – Jakarta**.

### Keunggulan Utama Model 1:
1. **Navigasi Bersih & Terfokus**: Struktur multi-page mewah tanpa menu berlebih (**Home • The Parlour • Book Appointment**).
2. **Tipografi Haute Horlogerie (Patek Philippe)**: Menggunakan tipografi klasik *Cormorant Garamond* (Title Case anggun, tanpa huruf kapital berteriak) dan *Plus Jakarta Sans* bobot Light 300 yang nyaman dibaca.
3. **Murni Tipografi (Zero Emoji Clutter)**: Seluruh icon/emoji yang tidak perlu telah dihilangkan sehingga fokus 100% pada teks editorial yang berwibawa.
4. **Foto Asli / Real Photography**: Menggunakan dokumentasi visual interior nyata barbershop (kursi kulit hidrolik, interior kayu jati, panel hijau emerald), **bukan ilustrasi AI**.
5. **Mesin Reservasi 3-Langkah (Truefitt & Hill Chicago)**: Alur pemesanan kursi yang mulus, terintegrasi WhatsApp Concierge otomatis, kalender 14-hari interaktif, pemilihan 5 Master Barber, dan produk Mayfair Apothecary.
6. **Kebijakan Cash Control Resmi**: Garansi struk resmi (*"A Complimentary Haircut whenever you do not receive an official registered electronic register receipt"*).

---

## 2. ARSITEKTUR STRUKTUR WEBSITE MODEL 1

Website Model 1 terdiri dari 3 halaman utama yang terintegrasi secara modular:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        GREENWOOD BARBERS KBP                           │
├────────────────────┬─────────────────────────────┬─────────────────────┤
│    1. HOME         │       2. THE PARLOUR        │ 3. BOOK APPOINTMENT │
│  (home.html)       │       (parlour.html)        │    (booking.html)   │
├────────────────────┼─────────────────────────────┼─────────────────────┤
│ • Cinematic Hero   │ • Foto Nyata Sanctuary      │ • 3-Step Chicago    │
│ • Patek Typography │ • Blueprint Arsitektur KBP  │ • 8 Menu Ritual     │
│ • Central Action   │ • Strategic Transit (Whoosh)│ • 5 Master Barbers  │
│   (Book Chair)     │ • 4 Protokol & Fasilitas    │ • 6 Produk Rawat    │
│ • Mayfair Vibe     │ • Peta Google Maps Akses    │ • Dispatch WhatsApp │
└────────────────────┴─────────────────────────────┴─────────────────────┘
```

---

## 3. RINCIAN PER HALAMAN

### Halaman 1: Home (`home.html` / `FIGMA_MODEL_1_BRITISH_HERITAGE.html`)
- **Fokus Visual**: Cinematic Hero satu layar penuh (*dead-center in the middle of photo*).
- **Hierarki Teks Patek Philippe**:
  - **Eyebrow**: `Quality & Fine Workmanship • Kota Baru Parahyangan` (Emas, 11px, spasi 2.8px, mengambang elegan tanpa underline).
  - **Headline**: `A Nonpareil Grooming Experience for Discerning Gentlemen` (Cormorant Garamond, 46px, Title Case, bobot 400 seimbang).
  - **Editorial Subtitle**: `Bespoke scissor craftsmanship, ceremonial hot-linen wet shaves, and unhurried acoustic seclusion in an executive Mayfair sanctuary.` (Plus Jakarta Sans Light 300, 15px, line-height 1.75).
- **Tombol Aksi Utama**: Tombol sentral tunggal berukuran presisi 250px × 50px: **`BOOK APPOINTMENT →`** yang langsung mengarahkan klien ke sistem reservasi.

### Halaman 2: The Parlour (`parlour.html`)
- **Fokus Visual**: Banner foto interior asli (*Real Photo*) dengan badge `FLAGSHIP SANCTUARY • KOTA BARU PARAHYANGAN`.
- **Dua Kotak Informasi Sejajar (Format Sama Persis dengan Booking Suite)**:
  1. **Establishment Blueprint**:
     - *Civic Address*: Ruko PancaTengah, Kota Baru Parahyangan, Padalarang, West Java 40553.
     - *Operating Hours*: Senin – Minggu: 10:00 – 22:00 WIB (Strict by Appointment).
     - *Concierge Desk*: +62 812-8899-7721 • info@greenwoodbarbers.com.
     - *Cashless & Policy*: QRIS, Debit, Kartu Kredit, Bank Mandiri VA, Struk Garansi Resmi.
  2. **Strategic Transit & Amenities (Whoosh Hub)**:
     - *High-Speed Rail*: 7 Menit dari Stasiun Kereta Cepat Whoosh Padalarang (koneksi 28 menit ke Halim Jakarta).
     - *Highway Access*: Akses langsung Tol Padalarang Timur via bulevar arteri utama KBP.
     - *Dedicated Parking*: Parkir eksekutif tepat di depan pintu Parlour dengan pengawasan sekuriti 24 jam.
     - *Private Hospitality*: Peredaman suara akustik, welcome drink (Sumatran drip coffee / single malt / sparkling water).
     - *Master Stations*: 5 Kursi hidrolik Takara Belmont Apollo II dengan recline penuh untuk kenyamanan spinal.
- **Pembersihan Icon**: Seluruh emoji/icon dihapus, menghasilkan tampilan tipografi yang rapi, sejajar ke kiri (*perfect alignment*), dan tenang.

### Halaman 3: Gentlemen's Appointment Suite (`booking.html`)
- **Fokus Sistem**: Engine reservasi berstandar internasional Truefitt & Hill Chicago.
- **Langkah 1: Ritual & Produk**:
  - Accordion kategori ritus layanan dengan detail menit dan tarif resmi.
  - Alokasi spesifik Master Barber per layanan (atau opsi *Any Available Master*).
  - Tambah produk Mayfair Apothecary ke dalam keranjang perawatan (*In-Chair Add-on*).
- **Langkah 2: Kalender & Waktu (Date & Time)**:
  - Carousel tanggal 14 hari dinamis.
  - Sesi Pagi (10:00 – 12:00), Sesi Siang (13:00 – 17:00), Sesi Malam (18:00 – 21:00).
  - Indikator ketersediaan kursi real-time (*Open* / *FULL 5/5*).
  - Fitur **Priority Waitlist Modal** (apabila jam sibuk terisi penuh).
- **Langkah 3: Konfirmasi & Pembayaran**:
  - Form data diri tamu (Nama, WhatsApp, Email, Preferensi Khusus).
  - Pilihan metode penyelesaian cashless: QRIS Instant, Mandiri VA, EDC In-Parlour.
  - Kartu *Appointment Integrity Protocol* & Nomor Seri Struk Garansi.
  - Tombol submit yang otomatis memformat dan mengirim pesan reservasi resmi ke WhatsApp Concierge Greenwood Barbers (`+62 812-8899-7721`).

---

## 4. DAFTAR TARIF LAYANAN RESMI (GREENWOOD TARIFF MANIFESTO)

Sesuai dokumen acuan resmi Greenwood Barbers Kota Baru Parahyangan:

| No | Nama Layanan / Ritual | Durasi | Tarif Resmi | Deskripsi Layanan |
| :---: | :--- | :---: | :---: | :--- |
| 1 | **The Superior Barber Cut** | 45 Menit | **Rp 160.000** | Konsultasi profil kepala, gunting presisi, cuci rambut air hangat, pendingin mint, pijat tengkuk, blow-dry & styling pomade. |
| 2 | **Traditional Hot Towel Wet Shave** | 35 Menit | **Rp 120.000** | Ritual cukur pisau lipat bedah, minyak pra-cukur Trafalgar, 3 lapis handuk panas beruap, busa 1805 hangat, dan cold stone soothing balm. |
| 3 | **The Full Grooming Experience** | 75 Menit | **Rp 250.000** | Kombinasi paripurna *Superior Barber Cut* dan *Traditional Hot Towel Wet Shave* dengan pijat akupresur relaksasi kepala dan pundak. |
| 4 | **Executive Beard Sculpture** | 30 Menit | **Rp 95.000** | Pembentukan dan penipisan jenggot simetris dengan gunting dan outline straight-razor tajam, diakhiri botanical beard conditioning serum. |
| 5 | **Scalp & Shoulder Acupressure** | 25 Menit | **Rp 85.000** | Pijat titik meridian kepala, leher, dan belikat menggunakan minyak esensial aromaterapi untuk meredakan ketegangan eksekutif. |
| 6 | **Little Gentleman Cut** | 35 Menit | **Rp 110.000** | Layanan gunting khusus anak usia di bawah 12 tahun dengan pendekatan telaten, sabar, dan hasil klasik rapi terpelajar. |
| 7 | **Charcoal Scalp Detox & Wash** | 30 Menit | **Rp 90.000** | Pembersihan mendalam kulit kepala dari residu polusi dan minyak berlebih menggunakan formulasi arang aktif bambu dan tonik dingin. |
| 8 | **Royal Botanical Hair Coloring** | 60 Menit | **Rp 220.000** | Pewarnaan rambut alami tanpa amonia untuk penyamaran uban elegan (*natural blending*) atau peremajaan warna rambut pria. |

---

## 5. DAFTAR MASTER BARBERS (ATELIER BLADESMITHS)

Greenwood Barbers memiliki 5 Master Barber terlatih yang bertugas di 5 stasiun kursi hidrolik:

1. **Bramantyo — Head Barber & Founder (Chair I)**:
   - *Keahlian*: Classic English Tapers, Architectural Scissor Layering, Executive Silhouette Sculpting.
2. **Rian Pratama — Master Barber (Chair II)**:
   - *Keahlian*: Traditional Hot Linen Wet Shaves, Straight-Razor Precision, Signature Beard Detailing.
3. **Dimas Setiawan — Master Barber (Chair III)**:
   - *Keahlian*: Precision Shear Texturing, Botanical Scalp Detox, Cranial Pressure Point Release.
4. **Farhan Akbar — Master Stylist (Chair IV)**:
   - *Keahlian*: Modern Gentleman Pompadours, Scissor-over-Comb Graduation, Texture Craft.
5. **Aldi Maulana — Artisan Barber (Chair V)**:
   - *Keahlian*: Razor Line Outlining, Taper Fades, Little Gentleman Haircuts.

---

## 6. SISTEM DESIGN & STANDAR TIPOGRAFI HAUTE HORLOGERIE

### A. Palet Warna (The Royal Mayfair Palette)
- **Deep Obsidian Noir**: `#020704` (Latar belakang pekat kontras tinggi)
- **Sanctuary Emerald**: `#063827` (Warna identitas hijau botol khas Inggris)
- **Antique Gilded Gold**: `#c59b48` & `#e2be6c` (Aksen emas terhormat untuk border dan label)
- **Warm Parchment Cream**: `#f7f2e7` (Warna teks lembut yang tidak menyilaukan mata)

### B. Spesifikasi Tipografi (Patek Philippe Alignment)
- **Headings (Judul)**:
  - Font: `Cormorant Garamond` (Google Fonts)
  - Style: **Title Case** (Huruf besar di awal kata, bukan ALL CAPS)
  - Weight: 400 – 500 (Langsing dan elegan, tidak tebal kaku)
  - Letter Spacing: 0.3px – 0.5px
  - Line Height: 1.18 – 1.22
- **Body & Subtitles (Teks Narasi)**:
  - Font: `Plus Jakarta Sans` (Google Fonts)
  - Weight: 300 (Light) & 400 (Regular)
  - Letter Spacing: 0.2px
  - Line Height: 1.75 (Sangat lega, standar katalog mewah internasional)
  - Color: `rgba(247, 242, 231, 0.82)`

---

## 7. POIN-POIN PEMBAHASAN UNTUK MEETING DENGAN KLIEN (TALKING POINTS)

Gunakan poin-poin berikut saat mempresentasikan website kepada klien:

1. **Mengapa Model 1 yang Dipilih?**
   - *"Model 1 British Heritage adalah representasi paling otentik dari positioning Greenwood Barbers. Menggabungkan kemewahan klasik Mayfair dengan sentuhan modern yang langsung dapat dipahami oleh warga KBP dan para eksekutif penglaju Whoosh."*

2. **Bagaimana dengan Kualitas Foto?**
   - *"Kami telah mengganti foto banner dengan foto interior nyata yang menampilkan tekstur kursi kulit, cermin kayu, dan tata ruang asli barbershop, sehingga klien melihat representasi fisik yang jujur, bukan gambar AI yang terkesan fiktif."*

3. **Kemudahan Reservasi Klien**:
   - *"Sistem booking dirancang dengan pola 3-langkah Truefitt & Hill Chicago: pilih perawatan & produk -> pilih tanggal & jam -> konfirmasi. Pesanan langsung terkirim ke WhatsApp Concierge resmi, siap dikelola tanpa kerumitan aplikasi pihak ketiga."*

4. **Kejelasan Nilai Komersial & Garansi Struk**:
   - *"Kebijakan Cash Control Guarantee ('A Free Haircut whenever you do not receive an official receipt') dipasang secara transparan di website untuk membangun kepercayaan penuh antara pemilik bisnis, staf kasir, dan para tamu."*

5. **Kesiapan Teknis & Performa Kilat**:
   - *"Website telah dioptimasi dengan server ringan, waktu loading di bawah 1 detik, aset gambar terkompresi dengan baik, dan telah dibersihkan dari icon emoji yang tidak perlu demi menjaga wibawa brand premium."*

---

## 8. TAUTAN DEMO WEBSITE SAAT INI (LOCAL SERVER)

- **Halaman Beranda (Home)**: `http://localhost:3000/home.html`
- **Halaman Profil Tempat (The Parlour)**: `http://localhost:3000/parlour.html`
- **Halaman Reservasi (Book Appointment)**: `http://localhost:3000/booking.html`
- **Showcase Figma Terpusat**: `http://localhost:3000/index.html`

---
*Laporan ini disusun dengan penuh integritas dan standar kualitas tertinggi untuk kesuksesan peluncuran Greenwood Barbers Kota Baru Parahyangan.*
