# PANDUAN EKSEKUTIF SERAH TERIMA AKUN RESMI (WHATSAPP & GOOGLE CALENDAR / EMAIL)
## GREENWOOD BARBERS — KOTA BARU PARAHYANGAN
**Dokumen Standar Operasional & Integrasi Identitas Resmi Toko**  
*Tanggal: 7 November 2026*  
*Ditujukan Untuk: Pengelola Toko Greenwood Barbers & Client Executive (Tarik)*

---

### RINGKASAN TUJUAN
Dokumen ini disusun untuk menyelesaikan pengalihan identitas pengirim dari nomor/email pengembang (*development environment*) ke akun resmi **Greenwood Barbers**:
1. **WhatsApp Notifikasi Otomatis**: Dialihkan 100% ke nomor resmi toko (`+62 819-9115-3322`).
2. **Email RSVP & Konfirmasi Reservasi**: Dialihkan 100% ke akun Google resmi Greenwood Barbers (`salretailventures@gmail.com`).

---

### BAGIAN 1: PENGALIHAN WHATSAPP GATEWAY KE NOMOR TOKO (+62 819-9115-3322)
*Estimasi waktu: 2 menit*

Sistem website menggunakan gateway WhatsApp Fonnte untuk mengirimkan pesan konfirmasi instan ke nomor WhatsApp tamu yang memesan.

#### Langkah-langkah:
1. Buka website **[https://fonnte.com](https://fonnte.com)** dan login ke akun Fonnte toko Greenwood. *(Jika belum punya akun toko tersendiri, buat akun baru menggunakan email `salretailventures@gmail.com`)*.
2. Masuk ke menu **Device** di sidebar dashboard.
3. Klik tombol **Connect / Scan QR Code**. Layar akan menampilkan QR Code aktivasi WhatsApp Web.
4. Buka aplikasi WhatsApp di HP Toko Greenwood Barbers (`+62 819-9115-3322`):
   - Klik menu **Titik Tiga (Android)** atau **Pengaturan (iPhone)**.
   - Pilih **Perangkat Tertaut (Linked Devices)** &rarr; **Tautkan Perangkat (Link a Device)**.
   - Scan QR Code yang ada di layar dashboard Fonnte.
5. Status di dashboard Fonnte akan berubah menjadi **Connected**.
6. Salin kode **Token** device yang muncul.
7. Buka skrip integrasi `google-calendar-sync.gs` di baris 34:
   ```javascript
   var FONNTE_API_TOKEN = "MASUKKAN_TOKEN_BARU_DI_SINI";
   ```
8. **Selesai!** Mulai saat ini, setiap reservasi yang masuk di website akan otomatis mengirimkan pesan konfirmasi langsung dari nomor WhatsApp resmi toko (`+62 819-9115-3322`).

---

### BAGIAN 2: PENGALIHAN GOOGLE CALENDAR & EMAIL RESMI (salretailventures@gmail.com)
*Estimasi waktu: 3 menit*

Selama masa pembuatan dan uji coba sistem, skrip Google Apps Script berjalan di akun Google pengembang. Untuk memastikan bahwa undangan Google Calendar (RSVP Card) dan email konfirmasi dikirim **langsung dari akun resmi toko**:

#### Langkah-langkah:
1. Login ke browser menggunakan akun Google resmi toko: **`salretailventures@gmail.com`**.
2. Buka link: **[https://script.google.com](https://script.google.com)**.
3. Klik tombol **Proyek Baru (New Project)** di kiri atas.
4. Beri nama proyek di bagian atas: `Greenwood Barbers Dispatch Engine`.
5. Buka file `google-calendar-sync.gs` di repositori website, salin seluruh kodenya (`Ctrl+A` / `Cmd+A` lalu `Ctrl+C`), dan tempelkan ke editor kode Google Apps Script.
6. Klik ikon **Simpan (Save)**.
7. Di pojok kanan atas, klik tombol biru **Terapkan (Deploy)** &rarr; pilih **Penerapan baru (New deployment)**.
8. Klik ikon roda gigi di sebelah kiri "Pilih jenis", pilih **Aplikasi web (Web app)**.
9. Isi konfigurasi sebagai berikut:
   - **Deskripsi**: `Production Official Greenwood Release`
   - **Jalankan sebagai (Execute as)**: `Saya (salretailventures@gmail.com)` *(Wajib! Ini yang memastikan email pengirim adalah akun toko)*
   - **Siapa yang memiliki akses (Who has access)**: `Siapa saja (Anyone)`
10. Klik tombol **Terapkan (Deploy)**.
11. Google akan meminta izin otorisasi pertama kali:
    - Klik **Review permissions** &rarr; Pilih akun `salretailventures@gmail.com`.
    - Klik **Advanced (Lanjutan)** di bawah &rarr; Klik **Go to Greenwood Barbers Dispatch Engine (unsafe / tidak aman)**.
    - Klik **Allow (Izinkan)**.
12. Salin **URL Aplikasi Web (Web App URL)** yang berakhiran `/exec`.
13. Perbarui baris konfigurasi `googleCalendarWebhookUrl` di file `assets/config.js` pada website dengan URL baru tersebut:
    ```javascript
    googleCalendarWebhookUrl: "URL_BARU_DARI_DEPLOYMENT_SALRETAILVENTURES"
    ```
14. **Selesai!** Semua notifikasi kalender, email undangan dengan tombol RSVP Yes/No/Maybe, dan email rincian reservasi akan terkirim resmi dari `salretailventures@gmail.com` atas nama **Greenwood Barbers Official**.

---

### BAGIAN 3: VERIFIKASI IDENTITAS RESMI (CHECKLIST)

| Komponen | Status Saat Ini | Tindakan Serah Terima | Status Akhir |
| :--- | :--- | :--- | :--- |
| **WhatsApp Pengirim** | WhatsApp Dev Test Token | Hubungkan nomor `+62 819-9115-3322` di Fonnte | Terkirim dari Greenwood Barbers |
| **Kalender Google** | Kalender Dev Test | Deploy Web App di akun `salretailventures@gmail.com` | Kalender resmi `salretailventures@gmail.com` |
| **Email Pengirim** | Akun Dev Test | Deploy Web App di akun `salretailventures@gmail.com` | Terkirim dari `salretailventures@gmail.com` |
| **Versi Informasi (Store Info)** | Baru selesai dibuat (`/info`) | Sudah aktif di navigasi & halaman `/info.html` | Live di website |
| **Versi Bahasa Indonesia (Indo)** | Baru selesai dibuat (`EN \| ID`) | Sudah aktif dengan toggle bilingual realtime | Live di website |

---
*Dokumen ini diterbitkan oleh tim teknis pengembang Greenwood Barbers untuk memastikan kelancaran operasional dan standar profesionalitas tingkat tinggi.*
