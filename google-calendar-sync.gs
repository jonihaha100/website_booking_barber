/**
 * GREENWOOD BARBERS — GOOGLE CALENDAR AUTOMATED BOOKING SYNC
 * 
 * CARA MEMASANG (HANYA 1 MENIT):
 * 1. Buka https://script.google.com/ di browser Anda (pastikan login dengan akun Google Barber / Salon).
 * 2. Klik tombol "Proyek Baru" (New Project).
 * 3. Hapus semua teks yang ada di editor, lalu COPY dan PASTE seluruh isi script ini.
 * 4. Klik tombol "Terapkan" (Deploy) di kanan atas -> Pilih "Penerapan baru" (New deployment).
 * 5. Pilih jenis: "Aplikasi Web" (Web app).
 * 6. Pada kolom "Siapa saja yang memiliki akses" (Who has access), pilih: "Siapa saja" (Anyone).
 * 7. Klik "Terapkan" (Deploy) -> Berikan izin akses Google Calendar akun Anda.
 * 8. Salin URL Aplikasi Web yang dihasilkan (contoh: https://script.google.com/macros/s/AKfycb.../exec).
 * 9. Tempelkan URL tersebut ke file assets/config.js pada bagian "googleCalendarWebhookUrl".
 * 
 * SELESAI! Setiap ada pelanggan yang booking:
 * - Jadwal otomatis masuk ke Google Calendar Barber.
 * - Email pelanggan otomatis menerima undangan resmi Google Calendar dengan notifikasi pengingat.
 */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No payload received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    
    // Ambil Kalender Utama akun Google ini
    var calendar = CalendarApp.getDefaultCalendar();
    
    // Parse tanggal dan waktu (dateKey: YYYY-MM-DD, timeSlot: HH:mm WIB)
    var dateParts = data.dateKey.split("-");
    var timeParts = data.timeSlot.split(":");
    
    var year = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; // Bulan di JS dimulai dari 0 (Januari = 0)
    var day = parseInt(dateParts[2], 10);
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);
    
    var startTime = new Date(year, month, day, hours, minutes, 0);
    var durationMins = data.totalDuration || 45;
    var endTime = new Date(startTime.getTime() + (durationMins * 60 * 1000));
    
    // Judul & Deskripsi Event
    var eventTitle = "Greenwood Barbers: " + (data.serviceName || "Grooming Ritual") + " - " + (data.guestName || "VIP Guest");
    
    var description = 
      "====================================\n" +
      "GREENWOOD BARBERS • RESERVASI RESMI\n" +
      "====================================\n" +
      "Kode Booking: " + (data.bookingCode || "-") + "\n" +
      "Nama Tamu: " + (data.guestName || "-") + "\n" +
      "No. WhatsApp: " + (data.guestPhone || "-") + "\n" +
      "Email: " + (data.guestEmail || "-") + "\n" +
      "Barber Bertugas: " + (data.barberName || "Bramantyo") + "\n" +
      "Ritual Layanan: " + (data.serviceName || "-") + "\n" +
      "Total Biaya: " + (data.totalPrice || "-") + "\n" +
      "Catatan Khusus: " + (data.guestNotes || "Tidak ada") + "\n\n" +
      "Lokasi: Ruko PancaTengah Blok B No. 08, Kota Baru Parahyangan, Padalarang, Bandung Barat\n" +
      "Concierge WhatsApp: +62 821-2345-6789\n";
      
    var location = data.location || "Ruko PancaTengah Blok B No. 08, Kota Baru Parahyangan, Padalarang, West Bandung";

    // Opsi Pembuatan Event (Invite Email Pelanggan & Kirim Notifikasi Kalender)
    var options = {
      description: description,
      location: location,
      sendInvites: true // Otomatis mengirimkan email undangan resmi Google Calendar ke pelanggan!
    };
    
    if (data.guestEmail && data.guestEmail.indexOf("@") !== -1) {
      options.guests = data.guestEmail;
    }

    // Buat Event di Google Calendar
    var event = calendar.createEvent(eventTitle, startTime, endTime, options);
    
    // Setel pengingat default 30 menit & 2 jam sebelumnya
    event.addPopupReminder(30);
    event.addEmailReminder(120);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      eventId: event.getId(),
      message: "Event successfully added to Google Calendar and invite sent to " + data.guestEmail
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Greenwood Barbers Google Calendar Sync Webhook is Active.")
    .setMimeType(ContentService.MimeType.TEXT);
}
