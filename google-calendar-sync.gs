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
    
    // Parse tanggal dan waktu secara presisi dalam WIB (UTC+7)
    // Menggunakan format ISO 8601 dengan offset +07:00 menjamin jam tidak meleset karena timezone server
    var startTime = new Date(data.dateKey + "T" + data.timeSlot + ":00+07:00");
    var durationMins = data.totalDuration || 45;
    var endTime = new Date(startTime.getTime() + (durationMins * 60 * 1000));
    
    // Judul & Deskripsi Event (In-Person Grooming Session, Not an Online Meeting)
    var eventTitle = "💈 Greenwood Barbers Session: " + (data.serviceName || "Grooming Ritual") + " - " + (data.guestName || "Guest");
    
    var description = 
      "==================================================\n" +
      "💈 GREENWOOD BARBERS • PARLOUR APPOINTMENT SCHEDULE\n" +
      "==================================================\n" +
      "🏛️ IN-PERSON PARLOUR GROOMING SESSION (NOT A VIRTUAL MEETING)\n" +
      "--------------------------------------------------\n" +
      "• Booking Pass  : " + (data.bookingCode || "-") + "\n" +
      "• Guest Name    : " + (data.guestName || "-") + "\n" +
      "• Barber        : " + (data.barberName || "Bramantyo") + "\n" +
      "• Treatment     : " + (data.serviceName || "-") + "\n" +
      "• Schedule      : " + (data.dateKey || "-") + " @ " + (data.timeSlot || "-") + " WIB\n" +
      "• Total Amount  : " + (data.totalPrice || "-") + "\n" +
      "• Special Notes : " + (data.guestNotes || "None") + "\n\n" +
      "📍 Parlour Location (Open in Google Maps):\n" +
      "Ruko PancaTengah Blok B No. 08, Kota Baru Parahyangan\n" +
      "https://www.google.com/maps/search/?api=1&query=Ruko+PancaTengah,+Kota+Baru+Parahyangan\n\n" +
      "🔔 Please arrive 5–10 minutes prior to your allocated time.\n" +
      "Concierge WhatsApp: +62 812-2230-2050\n";
      
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

    // Mencegah dan menghapus Google Meet / Video Conference jika akun mengaktifkannya secara otomatis
    try {
      var rawId = event.getId();
      var cleanId = rawId.indexOf('@') !== -1 ? rawId.split('@')[0] : rawId;
      
      // 1. Coba hapus via Advanced Service jika aktif
      if (typeof Calendar !== 'undefined' && Calendar.Events) {
        Calendar.Events.patch({ conferenceData: null }, 'primary', cleanId, { conferenceDataVersion: 1 });
      } else {
        // 2. Hapus langsung via Google Calendar REST API menggunakan OAuth token bawaan script
        var patchUrl = "https://www.googleapis.com/calendar/v3/calendars/primary/events/" + encodeURIComponent(cleanId) + "?conferenceDataVersion=1";
        UrlFetchApp.fetch(patchUrl, {
          method: "patch",
          contentType: "application/json",
          headers: {
            Authorization: "Bearer " + ScriptApp.getOAuthToken()
          },
          payload: JSON.stringify({ conferenceData: null }),
          muteHttpExceptions: true
        });
      }
    } catch (confErr) {
      console.warn("Conference cleanup notice:", confErr);
    }

    // Kirim email konfirmasi resmi langsung ke inbox tamu via MailApp (100% pasti masuk ke inbox)
    if (data.guestEmail && data.guestEmail.indexOf("@") !== -1) {
      try {
        MailApp.sendEmail({
          to: data.guestEmail,
          subject: "🔔 Appointment Confirmation: Greenwood Barbers - " + (data.serviceName || "Grooming Ritual"),
          htmlBody: 
            "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #030c08; color: #f5f4ef; padding: 24px; border-radius: 8px; border: 1px solid #c59b48;'>" +
              "<div style='text-align: center; margin-bottom: 20px;'>" +
                "<h2 style='color: #c59b48; margin: 0; letter-spacing: 2px;'>GREENWOOD BARBERS</h2>" +
                "<p style='color: #828f86; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 4px 0 0;'>Official Parlour Appointment (In-Person)</p>" +
              "</div>" +
              "<div style='background: #091c13; padding: 18px; border-radius: 6px; border: 1px solid rgba(197, 155, 72, 0.25); margin: 20px 0; font-size: 14px; line-height: 1.7;'>" +
                "<p style='margin: 4px 0;'><strong>Booking Pass:</strong> <span style='color: #c59b48; font-family: monospace; font-size: 16px;'>" + (data.bookingCode || "-") + "</span></p>" +
                "<p style='margin: 4px 0;'><strong>Guest Name:</strong> " + (data.guestName || "-") + "</p>" +
                "<p style='margin: 4px 0;'><strong>Barber:</strong> " + (data.barberName || "-") + "</p>" +
                "<p style='margin: 4px 0;'><strong>Schedule:</strong> " + (data.dateKey || "-") + " @ " + (data.timeSlot || "-") + " WIB</p>" +
                "<p style='margin: 4px 0;'><strong>Treatment:</strong> " + (data.serviceName || "-") + "</p>" +
                "<p style='margin: 4px 0; color: #e5b95f;'><strong>Total Amount:</strong> " + (data.totalPrice || "-") + "</p>" +
              "</div>" +
              "<p style='font-size: 13px; color: #c2cac3; line-height: 1.6;'>📍 <strong>Parlour Location:</strong><br>Ruko PancaTengah Blok B No. 08, Kota Baru Parahyangan, Padalarang, West Bandung</p>" +
              "<p style='font-size: 12px; color: #828f86; margin-top: 15px;'>🔔 <em>Note: This is an exclusive in-person session at our parlour (Not an online meeting). Please arrive 5–10 minutes prior to your allocated time.</em></p>" +
            "</div>"
        });
      } catch (mailErr) {
        console.warn("MailApp error:", mailErr);
      }
    }

    // Rekap Otomatis ke Google Sheets (Spreadsheet Database)
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      if (ss) {
        var sheet = ss.getActiveSheet();
        if (sheet.getLastRow() === 0) {
          sheet.appendRow([
            "Booking Time", "Booking Pass", "Guest Name", "WhatsApp", "Email", 
            "Barber", "Date", "Time", "Treatment", "Total Amount", "Special Notes", "Status"
          ]);
          sheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#091c13").setFontColor("#c59b48");
        }
        sheet.appendRow([
          new Date(),
          data.bookingCode || "-",
          data.guestName || "-",
          data.guestPhone || "-",
          data.guestEmail || "-",
          data.barberName || "-",
          data.dateKey || "-",
          data.timeSlot || "-",
          data.serviceName || "-",
          data.totalPrice || "-",
          data.guestNotes || "-",
          "Confirmed"
        ]);
      }
    } catch (sheetErr) {
      // Quiet fallback jika Google Apps Script dijalankan standalone tanpa file Sheets
    }

    // =========================================================================
    // 5. KIRIM PESAN WHATSAPP OTOMATIS VIA GATEWAY FONNTE
    // =========================================================================
    var waNotificationStatus = "Not configured";
    var FONNTE_API_TOKEN = "o9bqV14GRCyNLfXiRfBV"; // Token Fonnte Greenwood Barbers
    var ADMIN_PHONE = "628122147734"; // Nomor WhatsApp Pengelola / Admin Greenwood

    if (FONNTE_API_TOKEN && data.guestPhone) {
      try {
        var cleanPhone = data.guestPhone.replace(/[^0-9]/g, "");
        if (cleanPhone.indexOf("0") === 0) {
          cleanPhone = "62" + cleanPhone.substring(1);
        } else if (cleanPhone.indexOf("8") === 0) {
          cleanPhone = "62" + cleanPhone;
        }
        
        var waMessage = 
          "🔔 *GREENWOOD BARBERS — APPOINTMENT CONFIRMATION* 🏛️\n" +
          "_Private Grooming Session at Kota Baru Parahyangan_\n\n" +
          "Dear *" + (data.guestName || "Distinguished Guest") + "*,\n\n" +
          "Your grooming reservation is officially confirmed and scheduled in our system: ✨\n\n" +
          "• *Booking Pass*  : " + (data.bookingCode || "-") + "\n" +
          "• *Treatment*     : " + (data.serviceName || "-") + "\n" +
          "• *Barber*        : " + (data.barberName || "Bramantyo") + "\n" +
          "• *Schedule*      : " + (data.dateKey || "-") + " @ " + (data.timeSlot || "-") + " WIB\n" +
          "• *Total Amount*  : " + (data.totalPrice || "-") + "\n\n" +
          "📍 *Location & Directions (Google Maps)*:\n" +
          "Ruko PancaTengah Blok B No. 08, Kota Baru Parahyangan\n" +
          "https://www.google.com/maps/search/?api=1&query=Ruko+PancaTengah,+Kota+Baru+Parahyangan\n\n" +
          "✉️ *Calendar & Email*: Official calendar invitation has been dispatched to (" + (data.guestEmail || "-") + ").\n\n" +
          "Please arrive 5–10 minutes prior to your allocated session. Our chair is dedicated exclusively to you.\n\n" +
          "— _Concierge Greenwood Barbers (+62 812-2230-2050)_";

        // 1. Kirim pesan konfirmasi ke nomor tamu (Guest)
        var waResponse = UrlFetchApp.fetch("https://api.fonnte.com/send", {
          method: "post",
          headers: {
            Authorization: FONNTE_API_TOKEN
          },
          payload: {
            target: cleanPhone,
            message: waMessage
          },
          muteHttpExceptions: true
        });

        // 2. Jika tamu adalah nomor berbeda, kirim juga alert ke WhatsApp Admin / Barber
        if (ADMIN_PHONE && cleanPhone !== ADMIN_PHONE) {
          try {
            var adminMessage = 
              "🚨 *NEW RESERVATION ALERT — GREENWOOD BARBERS* 🏛️\n\n" +
              "A new appointment has been scheduled via website:\n" +
              "• *Guest*         : " + (data.guestName || "-") + " (" + (data.guestPhone || "-") + ")\n" +
              "• *Booking Pass*  : " + (data.bookingCode || "-") + "\n" +
              "• *Barber*        : " + (data.barberName || "-") + "\n" +
              "• *Schedule*      : " + (data.dateKey || "-") + " @ " + (data.timeSlot || "-") + " WIB\n" +
              "• *Treatment*     : " + (data.serviceName || "-") + "\n" +
              "• *Total Amount*  : " + (data.totalPrice || "-") + "\n" +
              "• *Notes*         : " + (data.guestNotes || "-") + "\n\n" +
              "The session has been automatically recorded to Google Calendar.";

            UrlFetchApp.fetch("https://api.fonnte.com/send", {
              method: "post",
              headers: {
                Authorization: FONNTE_API_TOKEN
              },
              payload: {
                target: ADMIN_PHONE,
                message: adminMessage
              },
              muteHttpExceptions: true
            });
          } catch(adminErr) {}
        }

        waNotificationStatus = "WhatsApp Sent (" + waResponse.getResponseCode() + ")";
      } catch (waErr) {
        waNotificationStatus = "WhatsApp Error: " + waErr.toString();
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      eventId: event.getId(),
      whatsappStatus: waNotificationStatus,
      message: "Event successfully added to Google Calendar & email invite sent to " + (data.guestEmail || "-")
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

/**
 * FUNGSI UJI COBA LANGSUNG DI EDITOR GOOGLE APPS SCRIPT
 * Pilih fungsi 'testRunDirectly' di atas, lalu klik tombol 'Jalankan' (Run)
 * untuk menguji skrip tanpa error 'No payload received'.
 */
function testRunDirectly() {
  var dummyEvent = {
    postData: {
      contents: JSON.stringify({
        bookingCode: "GWB-TEST-APPSCRIPT",
        guestName: "Syamhari Abidin",
        guestPhone: "08122147734",
        guestEmail: "jonihaha100@gmail.com",
        serviceName: "The Signature Grooming Ritual",
        barberName: "Bramantyo",
        dateKey: "2026-10-27",
        timeSlot: "14:00",
        totalDuration: 60,
        totalPrice: "Rp 150.000",
        guestNotes: "Direct manual test verification from Google Apps Script"
      })
    }
  };
  var output = doPost(dummyEvent);
  Logger.log("Hasil Eksekusi Test:");
  Logger.log(output.getContent());
}
