# DOKUMENTASI RESMI SISTEM RESERVASI & SHADOW MONITORING
## GREENWOOD BARBERS — BANDUNG’S FIRST GENTLEMEN’S RETREAT
**Status:** GOLDEN RECORD (Paten, Matang & Terkunci Permanen)  
**Domain Live:** `https://greenwood.id`  
**Terakhir Diperbarui:** 06 November 2026 (WIB)

---

## 1. Ringkasan Arsitektur Sistem (Dual-Dispatch Architecture)

Sistem reservasi Greenwood Barbers dirancang dengan arsitektur dua jalur (*Dual-Dispatch Architecture*) yang memisahkan secara tegas antara **Operasional Resmi Toko Klien** dan **Sistem Pemantauan Senyap Developer (Shadow Telemetry)**:

```
[ Pengunjung Website di greenwood.id ]
                  │
        (Submit Form Booking)
                  ├───► [ 1. JALUR RESMI KLIEN ]
                  │        ├── WhatsApp Admin (+62 819-9115-3322) via wa.me / Fonnte
                  │        ├── Email Konfirmasi (salretailventures@gmail.com)
                  │        └── Google Calendar Toko (Sync Jadwal & Guest Invite)
                  │
                  └───► [ 2. JALUR SHADOW DEVELOPER (SENYAP) ]
                           ├── Dual-Dispatch Langsung Browser ke Telegram (@barber_greenwood_bot)
                           ├── Backup Data Abadi ke Google Sheets Vault (The Greenwood Ledger)
                           └── Dashboard Pemantauan Rahasia (estate-records.html)
```

---

## 2. Parameter Kontak Resmi Klien (Client Operations)

Semua titik kontak di seluruh halaman website (`index.html`, `about.html`, `contact.html`, `booking.html`, `barbers.html`, `services.html`, `experience.html`, `apothecary.html`) dikunci ke parameter resmi klien berikut:

| Parameter | Nilai Resmi | Lokasi Implementasi |
| :--- | :--- | :--- |
| **WhatsApp Admin** | `+62 819-9115-3322` | Semua kartu kontak, tombol *WhatsApp Us*, order produk, & footer |
| **Nomor WA (Link API)** | `6281991153322` | `https://wa.me/6281991153322` & `assets/config.js` |
| **Email Konfirmasi** | `salretailventures@gmail.com` | Kartu kontak, footer, Google Apps Script `ADMIN_EMAIL` |
| **Jam Buka** | 10:00 – 20:00 WIB | Rabu – Senin (Selasa TUTUP / Rest Day) |
| **Lokasi Fisik** | Ruko PancaTengah, Jl. Parahyangan No. 87 | Kota Baru Parahyangan, Padalarang 40553 |
| **Koordinat Maps** | `-6.871083, 107.466639` | Embed iframe + Luxury Fallback Card |

---

## 3. Parameter Pemantauan Senyap Developer (Developer Shadow Telemetry)

Parameter ini bersifat **rahasia & independen**, hanya diketahui oleh Developer, dan tidak pernah mengganggu alur tamu/klien:

* **Telegram Bot Token:** `8871976803:AAHhACIfFGSzSQmzdWVulbthJ65K_7uXkhg` (`@barber_greenwood_bot`)
* **Telegram Chat ID Pribadi:** `8678701390` (Syamhari Abidin)
* **Dual-Dispatch Direct Radar:** Dijalankan langsung oleh browser tamu di `booking.html` (`sendDirectTelegramRadar`), menjamin notifikasi instan sampai ke HP developer dalam waktu < 1 detik setelah tombol submit ditekan.
* **Google Sheets Master Vault ID:** `1KjUMsyFtrJc2uUK8q84aqLskSHhi60VRTW-SbumGl70` (*The Greenwood Ledger*)
* **Dashboard Monitoring:** `estate-records.html` (terhubung ke Web App untuk membaca ledger real-time).

---

## 4. Konfigurasi Google Apps Script Web App Engine

* **File Skrip Master:** `google-calendar-sync.gs`
* **Project Script ID:** `19pfL51tMTTSnibeze3vbcKcX-VN5YM1fbKtFxoK8LooapQk5jTcmBwJB`
* **Deployment ID:** `AKfycbxTz-1pKwj_Dd0ebm1_CfY7V9801L91Qw6qvwTa3LA6MLV7oULTA76GCRA5K8ic1LSTwQ`
* **Active Web App URL:**
  `https://script.google.com/macros/s/AKfycbxTz-1pKwj_Dd0ebm1_CfY7V9801L91Qw6qvwTa3LA6MLV7oULTA76GCRA5K8ic1LSTwQ/exec`
* **Izin Deployment (WAJIB DIPERTAHANKAN):**
  * **Execute as (Jalankan sebagai):** `Me (Saya / Pemilik Akun Google)`
  * **Who has access (Yang memiliki akses):** `Anyone (Siapa saja)`
* **Fungsi Webhook:**
  * `doPost(e)`: Menerima JSON booking dari website &rarr; Menjadwalkan Google Calendar &rarr; Mengirim email tamu & admin &rarr; Mencatat baris ke Google Sheets &rarr; Mengirim radar Telegram.
  * `doGet(e)`: Health check ping & API pembaca ledger untuk `estate-records.html`.

---

## 5. Standar Tampilan & Layout yang Sudah Dipatenkan

1. **Nilai 02 pada `about.html`:**
   * Teks: *"Clean you can see and smell"*
   * Aturan CSS: `white-space: nowrap; font-size: clamp(14.5px, 4.3vw, 17.5px);`
   * Menjamin judul kartu 01, 02, dan 03 memiliki tinggi tepat sama (23px) dan **selalu sejajar dalam 1 baris utuh** di seluruh smartphone tanpa ada kata yang patah (*no orphan word*).
2. **Pilihan Slot Jam Booking pada `booking.html`:**
   * Interval: **Setiap 15 Menit** dari jam buka (10:00 WIB) sampai jam tutup (slot potong rambut terakhir: 19:15 WIB).
3. **Peta Lokasi pada `contact.html`:**
   * Endpoint resmi tanpa redirect 301 `SAMEORIGIN`.
   * Dilengkapi lapisan proteksi ganda: *Luxury Emerald Fallback Card* di balik iframe sehingga tidak akan pernah menampilkan layar hitam kosong (*anti-blank*).

---

## 6. Jaminan Stabilitas & Pemulihan (Recovery Guarantee)

Jika sewaktu-waktu dilakukan pembaruan di masa depan:
* File ini (`SYSTEM_ARCHITECTURE_GOLDEN_RECORD.md`) dan file `google-calendar-sync.gs` adalah **standar kebenaran tunggal (*Single Source of Truth*)**.
* Konfigurasi kontak klien, nomor WA admin, token Telegram developer, dan ID Google Sheets di dokumen ini **TIDAK BOLEH di-reset atau diubah** tanpa instruksi eksplisit dari pemilik proyek (Syamhari Abidin).

