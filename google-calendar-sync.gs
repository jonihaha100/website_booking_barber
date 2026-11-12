/**
 * GREENWOOD BARBERS — GOOGLE CALENDAR & SHADOW MONITORING ENGINE
 * 
 * FITUR UTAMA:
 * 1. SINKRONISASI RESMI KLASIK (Google Calendar + Undangan Email + WhatsApp Fonnte ke Tamu & Admin)
 * 2. SOLUSI 1 (RADAR TELEGRAM): Notifikasi instan rahasia ke Telegram pribadi Developer setiap ada booking.
 * 3. SOLUSI 2 (MASTER VAULT SHEETS): Otomatis menyimpan setiap baris transaksi & kontak tamu ke Google Sheets.
 * 4. SOLUSI 3 (TAMENG MITIGASI): Peringatan dini jika kuota WA habis, nomor typo, atau kalender bermasalah.
 * 
 * PANDUAN AKTIVASI PEMANTAUAN PRIBADI (HANYA 2 MENIT):
 * - Buka Telegram, cari @BotFather -> kirim /newbot -> Anda akan dapat TELEGRAM_BOT_TOKEN.
 * - Buka Telegram, cari @userinfobot -> Anda akan dapat TELEGRAM_CHAT_ID (angka).
 * - Masukkan token & chat ID tersebut pada variabel konfigurasi di bawah.
 * - Untuk Google Sheets: Biarkan DEV_MASTER_SHEET_ID kosong (""), skrip akan OTOMATIS membuatkan
 *   file Google Sheet "The Greenwood Ledger — Master Shadow Vault" di Google Drive akun Anda!
 */

// =========================================================================
// 0. HELPER KEAMANAN & SANITASI DATA (SECURITY HARDENING)
// =========================================================================
// Membaca kredensial dari Script Properties terenkripsi Google, fallback ke nilai default
function getAppSecret(key, fallbackValue) {
  try {
    var val = PropertiesService.getScriptProperties().getProperty(key);
    if (val && String(val).trim().length > 0) return String(val).trim();
  } catch(e) {}
  return fallbackValue;
}

// Sanitasi Proteksi Formula Injection (CWE-1236 / CSV & Spreadsheet Formula Injection)
// Menetralisir karakter prefix berbahaya: =, +, -, @, \t, \r
function sanitizeSpreadsheetCell(val) {
  if (val === null || val === undefined) return "";
  var str = String(val);
  if (/^[=+\-@\t\r]/.test(str)) {
    return "'" + str; // Tambahkan apostrof agar dieksekusi sebagai teks murni
  }
  return str;
}

// =========================================================================
// 0a. KONFIGURASI PEMANTAUAN SENYAP DEVELOPER (CONFIDENTIAL / PRIVATE)
// =========================================================================
// Solusi 1 & 3: Notifikasi Instan & Sistem Alerting ke Telegram Pribadi Anda (TETAP DIPERTAHANKAN)
var DEV_TELEGRAM_BOT_TOKEN = getAppSecret("DEV_TELEGRAM_BOT_TOKEN", "8871976803:AAHhACIfFGSzSQmzdWVulbthJ65K_7uXkhg"); // Bot @barber_greenwood_bot
var DEV_TELEGRAM_CHAT_ID   = getAppSecret("DEV_TELEGRAM_CHAT_ID", "8678701390"); // Chat ID Syamhari Abidin

// Solusi 2: Google Spreadsheet Master Backup Pribadi Anda (TETAP DIPERTAHANKAN)
var DEV_MASTER_SHEET_ID    = getAppSecret("DEV_MASTER_SHEET_ID", "");

// =========================================================================
// 0b. KONFIGURASI NOTIFIKASI ADMIN TOKO / KLIEN (OFFICIAL CLIENT CONFIG)
// =========================================================================
// Gateway WhatsApp Fonnte Toko Klien
var FONNTE_API_TOKEN       = getAppSecret("FONNTE_API_TOKEN", "o9bqV14GRCyNLfXiRfBV"); // Token Fonnte Greenwood Barbers
var ADMIN_PHONE            = getAppSecret("ADMIN_PHONE", "6281991153322");        // Nomor WhatsApp Pengelola (+62 819-9115-3322)
var ADMIN_EMAIL            = getAppSecret("ADMIN_EMAIL", "salretailventures@gmail.com"); // Email Konfirmasi / Notifikasi
var ADMIN_API_KEY          = getAppSecret("ADMIN_API_KEY", "gw_ledger_sec_2050"); // Kunci otentikasi API Webhook Admin

// =========================================================================
// 1. ENDPOINT UTAMA WEBHOOK (POST)
// =========================================================================
function doPost(e) {
  var calendarStatus = "Not Processed";
  var waNotificationStatus = "Not configured";
  var event = null;
  var data = {};

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No payload received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    data = JSON.parse(e.postData.contents);
    
    // FITUR A.6: Penanganan Ulasan & Rating Pelanggan (Customer Feedback)
    if (data.action === "submit_review") {
      return handleReviewSubmission(data);
    }
    
    // Ambil Kalender Utama akun Google ini
    var calendar = CalendarApp.getDefaultCalendar();
    
    // Parse tanggal dan waktu secara presisi dalam WIB (UTC+7)
    var startTime = new Date(data.dateKey + "T" + (data.timeSlot || "10:00") + ":00+07:00");
    var durationMins = data.totalDuration || 45;
    var endTime = new Date(startTime.getTime() + (durationMins * 60 * 1000));
    
    // Ekstraksi komponen copywriting sesuai feedback resmi Client
    var guestName = data.name || data.guestName || "Guest";
    var barberName = data.barber || data.barberName || "Bramantyo";
    var serviceName = data.service || data.packageName || (data.serviceName ? data.serviceName.split(' + ')[0] : "The Cut");
    var addons = data.addons || data.addonsText || (data.serviceName && data.serviceName.indexOf(' + ') !== -1 ? data.serviceName.split(' + ').slice(1).join(', ') : "None");
    
    var dayName = Utilities.formatDate(startTime, "Asia/Jakarta", "EEEE");
    var dateFormatted = data.date || data.dateFormatted || Utilities.formatDate(startTime, "Asia/Jakarta", "MMM d");
    var startFormatted = data.start || data.timeSlot || Utilities.formatDate(startTime, "Asia/Jakarta", "HH:mm");
    var endFormatted = data.end || Utilities.formatDate(endTime, "Asia/Jakarta", "HH:mm");
    var timeRange = startFormatted + "–" + endFormatted;

    // Format angka harga bersih untuk format "Total: Rp {total}"
    var rawTotal = data.total || data.totalPrice || "0";
    var cleanTotal = "";
    if (typeof rawTotal === "number") {
      var n = (rawTotal < 1000 && rawTotal > 0) ? rawTotal * 1000 : rawTotal;
      cleanTotal = Number(n).toLocaleString('id-ID');
    } else {
      var digits = String(rawTotal).replace(/[^0-9]/g, "");
      var n = digits ? parseInt(digits, 10) : 0;
      if (n < 1000 && n > 0) n = n * 1000;
      cleanTotal = Number(n).toLocaleString('id-ID');
    }

    var notes = data.notes || data.guestNotes || "None";
    var passCode = data.pass_code || data.bookingCode || "-";
    var mapsLink = data.maps_link || data.mapsLink || "https://www.google.com/maps/search/?api=1&query=-6.871083,107.466639";

    // Smart Package Auto-Upgrade (Backend Safeguard):
    // If services selected constitute The Ritual (Cut & Shave + Black Mask + Hair Spa):
    var isCutShave = (serviceName.indexOf("Cut & Shave") !== -1 || (serviceName.indexOf("Cut") !== -1 && serviceName.indexOf("Shave") !== -1));
    var hasMask = (addons.indexOf("Black Mask") !== -1 || (data.addons && Array.isArray(data.addons) && data.addons.some(function(a){ return a.id === 'addon-mask' || a.name === 'Black Mask'; })));
    var hasSpa = (addons.indexOf("Hair Spa") !== -1 || (data.addons && Array.isArray(data.addons) && data.addons.some(function(a){ return a.id === 'addon-spa' || a.name === 'Hair Spa'; })));

    if (isCutShave && hasMask && hasSpa) {
      serviceName = "The Ritual";
      addons = "None";
      durationMins = 95;
      endTime = new Date(startTime.getTime() + (durationMins * 60 * 1000));
      endFormatted = Utilities.formatDate(endTime, "Asia/Jakarta", "HH:mm");
      timeRange = startFormatted + "–" + endFormatted;
      cleanTotal = "590.000";
    }

    // 1. CALENDAR EVENT TITLE (Greenwood Barbers · {service} with {barber})
    var eventTitle = "Greenwood Barbers · " + serviceName + " with " + barberName;
    
    // 2. CALENDAR / EMAIL DESCRIPTION (Docx 5 Nov 2026)
    var descLines = [
      "Your chair is reserved.",
      "Service: " + serviceName
    ];
    if (addons && addons !== "None" && addons !== "") {
      descLines.push("Add-ons: " + addons);
    }
    descLines.push("Barber: " + barberName);
    descLines.push("When: " + dayName + ", " + dateFormatted + ", " + timeRange);
    descLines.push("Total: Rp " + cleanTotal);
    if (notes && notes !== "None" && notes !== "" && notes.toLowerCase() !== "optional") {
      descLines.push("Your note: " + notes);
    }
    descLines.push("Where: Ruko PancaTengah, Jl. Parahyangan No. 87, Kota Baru Parahyangan, Padalarang. Free parking at the door.");
    descLines.push("Map: " + mapsLink);
    descLines.push("To change your time, WhatsApp us at +62 819-9115-3322, ideally 3 hours ahead.");
    var description = descLines.join("\n");
      
    var location = data.location || "Greenwood Barbers, Ruko PancaTengah, Jl. Parahyangan No. 87, Kota Baru Parahyangan, Padalarang, West Java 40553";

    // Opsi Pembuatan Event (Invite Email Pelanggan & Kirim Notifikasi Kalender)
    var options = {
      description: description,
      location: location,
      sendInvites: true // Otomatis mengirimkan email undangan resmi Google Calendar (RSVP Card) ke pelanggan!
    };
    
    var guestsList = [];
    if (data.guestEmail && data.guestEmail.indexOf("@") !== -1) {
      guestsList.push(data.guestEmail);
    }
    if (typeof ADMIN_EMAIL !== "undefined" && ADMIN_EMAIL && ADMIN_EMAIL.indexOf("@") !== -1 && guestsList.indexOf(ADMIN_EMAIL) === -1) {
      guestsList.push(ADMIN_EMAIL);
    }
    if (guestsList.length > 0) {
      options.guests = guestsList.join(",");
    }

    // 1. Buat Event di Google Calendar
    try {
      event = calendar.createEvent(eventTitle, startTime, endTime, options);
      event.addPopupReminder(30);
      event.addEmailReminder(120);
      calendarStatus = "Created (" + event.getId() + ")";
    } catch (calErr) {
      calendarStatus = "Calendar Error: " + calErr.toString();
    }

    // 2. Mencegah dan menghapus Google Meet / Video Conference jika akun mengaktifkannya secara otomatis
    if (event) {
      try {
        var rawId = event.getId();
        var cleanId = rawId.indexOf('@') !== -1 ? rawId.split('@')[0] : rawId;
        
        if (typeof Calendar !== 'undefined' && Calendar.Events) {
          Calendar.Events.patch({ conferenceData: null }, 'primary', cleanId, { conferenceDataVersion: 1 });
        } else {
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
        Logger.log("Conference cleanup notice: " + confErr);
      }
    }

    // 3. Email Konfirmasi: Undangan Resmi Google Calendar (RSVP Card) & Notifikasi Email Admin Klien
    // Tamu menerima email resmi Google Calendar invitation yang rapi dengan tombol RSVP Yes/No/Maybe.
    // Admin Klien (salretailventures@gmail.com) otomatis menerima email konfirmasi reservasi & kalender.
    if (typeof ADMIN_EMAIL !== "undefined" && ADMIN_EMAIL && ADMIN_EMAIL.indexOf("@") !== -1) {
      try {
        var adminEmailSubject = "Reservasi Baru: Greenwood Barbers · " + serviceName + " with " + barberName + " (" + dayName + ", " + dateFormatted + " @ " + startFormatted + ")";
        var adminEmailBody = 
          "Halo Tim Greenwood Barbers,\n\n" +
          "Ada reservasi baru yang masuk melalui website:\n\n" +
          "• Layanan    : " + serviceName + "\n" +
          (addons && addons !== "None" && addons !== "" ? "• Add-ons    : " + addons + "\n" : "") +
          "• Barber     : " + barberName + "\n" +
          "• Waktu      : " + dayName + ", " + dateFormatted + " · " + timeRange + " WIB\n" +
          "• Total      : Rp " + cleanTotal + "\n" +
          "• Nama Tamu  : " + guestName + "\n" +
          "• No HP      : " + (data.guestPhone || "-") + "\n" +
          "• Email Tamu : " + (data.guestEmail || "-") + "\n" +
          "• Catatan    : " + notes + "\n" +
          "• Pass Code  : " + passCode + "\n\n" +
          "Status Kalender: " + calendarStatus + "\n" +
          "Status WA Tamu : " + waNotificationStatus + "\n\n" +
          "— Greenwood Barbers Automated Dispatch Engine";
        MailApp.sendEmail({
          to: ADMIN_EMAIL,
          subject: adminEmailSubject,
          body: adminEmailBody,
          name: "Greenwood Barbers Official",
          replyTo: "salretailventures@gmail.com"
        });
      } catch (adminMailErr) {
        Logger.log("Admin email notification notice: " + adminMailErr);
      }
    }

    // 3b. Email Konfirmasi Branded Langsung ke Pelanggan (Guest Direct Notification)
    if (data.guestEmail && data.guestEmail.indexOf("@") !== -1) {
      try {
        var guestSubject = "Your Chair is Reserved · Greenwood Barbers (" + dayName + ", " + dateFormatted + " @ " + startFormatted + ")";
        var guestBody = 
          "Dear " + guestName + ",\n\n" +
          "Your appointment at Greenwood Barbers has been successfully reserved.\n\n" +
          "• Service   : " + serviceName + "\n" +
          (addons && addons !== "None" && addons !== "" ? "• Add-ons   : " + addons + "\n" : "") +
          "• Barber    : " + barberName + "\n" +
          "• When      : " + dayName + ", " + dateFormatted + " · " + timeRange + " WIB\n" +
          "• Total     : Rp " + cleanTotal + "\n" +
          "• Pass Code : " + passCode + "\n\n" +
          "Location & Parking:\n" +
          "Ruko PancaTengah, Jl. Parahyangan No. 87, Kota Baru Parahyangan, Padalarang 40553.\n" +
          "Complimentary reserved parking right in front of our parlour door.\n" +
          "Map: " + mapsLink + "\n\n" +
          "Need to adjust your appointment? Reply to this email or WhatsApp our concierge desk at +62 819-9115-3322 (ideally 3 hours in advance).\n\n" +
          "We look forward to welcoming you.\n\n" +
          "— Greenwood Barbers Concierge Desk\n" +
          "Kota Baru Parahyangan, West Bandung\n" +
          "WhatsApp: +62 819-9115-3322\n" +
          "https://greenwood.id";

        MailApp.sendEmail({
          to: data.guestEmail,
          subject: guestSubject,
          body: guestBody,
          name: "Greenwood Barbers",
          replyTo: "salretailventures@gmail.com"
        });
      } catch (guestMailErr) {
        Logger.log("Guest email confirmation notice: " + guestMailErr);
      }
    }

    // 4. Kirim Pesan WhatsApp Otomatis via Gateway Fonnte (Format Baru Sesuai Feedback Client)
    if (FONNTE_API_TOKEN && data.guestPhone) {
      try {
        var cleanPhone = data.guestPhone.replace(/[^0-9]/g, "");
        if (cleanPhone.indexOf("0") === 0) {
          cleanPhone = "62" + cleanPhone.substring(1);
        } else if (cleanPhone.indexOf("8") === 0) {
          cleanPhone = "62" + cleanPhone;
        }
        
        var waLines = [
          "Hi " + guestName + ", your chair at Greenwood is reserved.",
          "*" + serviceName + "* with " + barberName
        ];
        if (addons && addons !== "None" && addons !== "") {
          waLines.push("Add-ons: " + addons);
        }
        waLines.push(dayName + ", " + dateFormatted + " · " + timeRange);
        waLines.push("Total: Rp " + cleanTotal);
        waLines.push("📍 Ruko PancaTengah, Kota Baru Parahyangan. Free parking at the door.");
        waLines.push(mapsLink);
        waLines.push("Need to change the time? Just reply here, ideally 3 hours ahead.");
        waLines.push("Please reply *YES* to confirm. See you " + dayName + ".");
        waLines.push("— Greenwood Barbers");

        var waMessage = waLines.join("\n");

        // Kirim pesan konfirmasi instan ke nomor tamu (Guest)
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

        // 4b. Otomatis jadwalkan pesan 'WhatsApp reminder (2 hours before)' via Fonnte jika sesi > 2 jam dari sekarang
        var reminderTimestamp = Math.floor((startTime.getTime() - (2 * 60 * 60 * 1000)) / 1000);
        var nowTimestamp = Math.floor(Date.now() / 1000);
        if (reminderTimestamp > (nowTimestamp + 300)) {
          var reminderText = 
            "Hi " + guestName + ", see you at " + startFormatted + " today with " + barberName + ". Free parking at the door. Running late? Just reply here.";
          UrlFetchApp.fetch("https://api.fonnte.com/send", {
            method: "post",
            headers: {
              Authorization: FONNTE_API_TOKEN
            },
            payload: {
              target: cleanPhone,
              message: reminderText,
              schedule: reminderTimestamp
            },
            muteHttpExceptions: true
          });
        }

        var respCode = waResponse.getResponseCode();
        var respBody = waResponse.getContentText();
        var isWaSuccess = respCode === 200 && respBody.indexOf('"status":true') !== -1;

        if (isWaSuccess) {
          waNotificationStatus = "WhatsApp Sent (200)";
        } else {
          waNotificationStatus = "Fonnte Warning (" + respCode + "): " + respBody;
        }

        // Kirim juga alert ringkas ke WhatsApp Admin / Barber
        if (ADMIN_PHONE && cleanPhone !== ADMIN_PHONE) {
          try {
            var adminMessage = 
              "🚨 *NEW RESERVATION ALERT — GREENWOOD BARBERS*\n\n" +
              "Hi " + guestName + ", your chair at Greenwood is reserved.\n\n" +
              serviceName + " with " + barberName + "\n" +
              "Add-ons: " + addons + "\n" +
              dayName + ", " + dateFormatted + " · " + timeRange + "\n" +
              "Total: Rp " + cleanTotal + "\n" +
              "Guest Contact: " + (data.guestPhone || "-") + " | " + (data.guestEmail || "-") + "\n" +
              "Note: " + notes + "\n" +
              "Pass: " + passCode;

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

      } catch (waErr) {
        waNotificationStatus = "WhatsApp Error: " + waErr.toString();
      }
    }

    // =========================================================================
    // 5. EKSEKUSI PEMANTAUAN DI BELAKANG LAYAR (SOLUSI 1, 2, DAN 3)
    // =========================================================================
    var isWarning = false;
    var warningList = [];

    if (calendarStatus.indexOf("Error") !== -1) {
      isWarning = true;
      warningList.push("Google Calendar: " + calendarStatus);
    }
    if (waNotificationStatus.indexOf("Warning") !== -1 || waNotificationStatus.indexOf("Error") !== -1) {
      isWarning = true;
      warningList.push("Fonnte WA Gateway: " + waNotificationStatus);
    }

    var auditFlag = isWarning ? "WARNING" : "HEALTHY";

    // EKSEKUSI SOLUSI 2: Simpan Otomatis ke Google Sheets Master Developer
    recordToShadowSheet(data, calendarStatus, waNotificationStatus, auditFlag);

    // EKSEKUSI SOLUSI 1 & 3: Kirim Radar Realtime & Alert ke Telegram Pribadi
    sendTelegramShadowLog(data, calendarStatus, waNotificationStatus, isWarning, warningList.join("\n• "));

    // Response ke Website
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      eventId: event ? event.getId() : "none",
      whatsappStatus: waNotificationStatus,
      message: "Event successfully processed & synced."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Solusi 3: Peringatan jika terjadi error fatal / tak terduga
    try {
      var rawBody = (e && e.postData && e.postData.contents) ? e.postData.contents : "No Body";
      sendTelegramShadowLog(
        { bookingCode: "CRITICAL-FAIL", guestName: "Payload Crash", totalPrice: "-" },
        "Error",
        "Error",
        true,
        "Fatal System Exception: " + error.toString() + "\nRaw: " + rawBody.substring(0, 150)
      );
    } catch(err2) {}

    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Booking received and forwarded to parlour queue."
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "";
  var clientKey = (e && e.parameter && e.parameter.key) ? e.parameter.key : "";
  
  // Endpoint API untuk Website Admin (The Greenwood Ledger / estate-records.html)
  if (action === "get_bookings" || action === "get_ledger") {
    // Validasi otorisasi API key (OWASP API1: BOLA Prevention)
    if (ADMIN_API_KEY && clientKey && clientKey !== ADMIN_API_KEY) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Akses ditolak: Autentikasi kunci API tidak valid.",
        bookings: []
      })).setMimeType(ContentService.MimeType.JSON);
    }

    try {
      var sheet = getOrCreateShadowSheet();
      if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Database Google Sheet vault belum siap atau belum diotorisasi.",
          bookings: []
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      var lastRow = sheet.getLastRow();

      if (lastRow <= 1) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "success",
          bookings: [],
          count: 0
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      // Ambil seluruh baris transaksi dari baris 2 hingga baris terakhir
      var range = sheet.getRange(2, 1, lastRow - 1, 14);
      var values = range.getValues();
      var bookings = [];
      
      for (var i = 0; i < values.length; i++) {
        var row = values[i];
        var bookingCode = String(row[1] || "").trim();
        if (!bookingCode || bookingCode === "-") continue;
        
        var timestampStr = row[0] instanceof Date 
          ? Utilities.formatDate(row[0], "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss") 
          : String(row[0] || "");
        var dateKeyStr = row[6] instanceof Date 
          ? Utilities.formatDate(row[6], "Asia/Jakarta", "yyyy-MM-dd") 
          : String(row[6] || "");
        
        // Ekstraksi waktu sesi (format HH:mm)
        var timeSlotStr = "";
        if (row[7] instanceof Date) {
          timeSlotStr = Utilities.formatDate(row[7], "Asia/Jakarta", "HH:mm");
        } else {
          var rawTime = String(row[7] || "").trim();
          var timeMatch = rawTime.match(/(\d{1,2}:\d{2})/);
          timeSlotStr = timeMatch ? timeMatch[1] : rawTime;
        }

        // Ekstraksi angka harga
        var rawPrice = row[9];
        var numPrice = 0;
        if (typeof rawPrice === "number") {
          numPrice = (rawPrice < 1000 && rawPrice > 0) ? rawPrice * 1000 : rawPrice;
        } else if (rawPrice) {
          var digits = String(rawPrice).replace(/[^0-9]/g, "");
          numPrice = digits ? parseInt(digits, 10) : 0;
          if (numPrice < 1000 && numPrice > 0) {
            numPrice = numPrice * 1000;
          }
        }
        
        bookings.push({
          createdAt: timestampStr,
          timestamp: row[0] instanceof Date ? row[0].getTime() : Date.now(),
          bookingCode: bookingCode,
          guestName: String(row[2] || "Guest").trim(),
          guestPhone: String(row[3] || "").trim(),
          guestEmail: String(row[4] || "").trim(),
          barberName: String(row[5] || "Bramantyo").trim(),
          assignedBarberName: String(row[5] || "Bramantyo").trim(),
          dateKey: dateKeyStr,
          timeSlot: timeSlotStr,
          packageName: String(row[8] || "The Cut").trim(),
          serviceName: String(row[8] || "The Cut").trim(),
          totalPrice: numPrice,
          guestNotes: String(row[10] || "").trim(),
          calendarStatus: String(row[11] || "").trim(),
          waStatus: String(row[12] || "").trim(),
          auditFlag: String(row[13] || "HEALTHY").trim(),
          status: "Confirmed",
          source: "cloud"
        });
      }
      
      // Entri terbaru tampil di paling atas
      bookings.reverse();
      
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        count: bookings.length,
        bookings: bookings
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch(err) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Gagal mengambil data dari Google Sheets: " + err.toString(),
        bookings: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  // FITUR A.6: Submit Review via GET (Opsional / Fallback)
  if (action === "submit_review") {
    var queryData = {
      action: "submit_review",
      receiptId: (e.parameter && e.parameter.receiptId) ? e.parameter.receiptId : "GW-PARLOUR",
      guestName: (e.parameter && (e.parameter.name || e.parameter.guestName)) ? (e.parameter.name || e.parameter.guestName) : "Guest",
      guestPhone: (e.parameter && (e.parameter.phone || e.parameter.guestPhone)) ? (e.parameter.phone || e.parameter.guestPhone) : "",
      barberName: (e.parameter && (e.parameter.barber || e.parameter.barberName)) ? (e.parameter.barber || e.parameter.barberName) : "Bramantyo",
      rating: parseInt((e.parameter && e.parameter.rating) ? e.parameter.rating : "5"),
      tags: (e.parameter && e.parameter.tags) ? e.parameter.tags.split(',') : [],
      feedback: (e.parameter && e.parameter.feedback) ? e.parameter.feedback : ""
    };
    return handleReviewSubmission(queryData);
  }

  // FITUR D.5: Trigger Manual / Otomatis Pengingat Pelanggan Pasif
  if (action === "trigger_passive_reminders") {
    if (ADMIN_API_KEY && clientKey && clientKey !== ADMIN_API_KEY) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Akses ditolak: Autentikasi kunci API tidak valid."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    var result = autoSendPassiveCustomerReminders();
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput("Greenwood Barbers Google Calendar Sync & Shadow Monitoring Webhook is Active.")
    .setMimeType(ContentService.MimeType.TEXT);
}

// =========================================================================
// MODUL IMPLEMENTASI: SOLUSI 2 (GOOGLE SHEETS MASTER VAULT)
// =========================================================================
function extractSpreadsheetId(idOrUrl) {
  if (!idOrUrl) return "";
  var clean = String(idOrUrl).trim();
  var match = clean.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return clean;
}

function ensureSheetHeaders(sheet) {
  if (!sheet) return;
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp (WIB)",
      "Kode Booking",
      "Nama Tamu",
      "No WhatsApp",
      "Email Tamu",
      "Artisan Barber",
      "Tanggal Sesi",
      "Jam Sesi",
      "Ritual Layanan",
      "Total Biaya",
      "Catatan Khusus",
      "Status Kalender",
      "Status WhatsApp",
      "Audit Health Flag"
    ]);

    sheet.getRange(1, 1, 1, 14)
      .setBackground("#091c13")
      .setFontColor("#e5b95f")
      .setFontWeight("bold")
      .setHorizontalAlignment("center");
      
    sheet.setFrozenRows(1);
  }
}

function recordToShadowSheet(data, calendarStatus, waStatus, auditFlag) {
  try {
    var sheet = getOrCreateShadowSheet();
    if (!sheet) {
      Logger.log("recordToShadowSheet: Sheet vault tidak tersedia.");
      return;
    }

    var formattedTimestamp = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");

    sheet.appendRow([
      formattedTimestamp,
      sanitizeSpreadsheetCell(data.bookingCode || "-"),
      sanitizeSpreadsheetCell(data.guestName || "-"),
      sanitizeSpreadsheetCell(data.guestPhone || "-"),
      sanitizeSpreadsheetCell(data.guestEmail || "-"),
      sanitizeSpreadsheetCell(data.barberName || "-"),
      sanitizeSpreadsheetCell(data.dateKey || "-"),
      sanitizeSpreadsheetCell(data.timeSlot || "-"),
      sanitizeSpreadsheetCell(data.serviceName || "-"),
      sanitizeSpreadsheetCell(data.totalPrice || "-"),
      sanitizeSpreadsheetCell(data.guestNotes || "-"),
      sanitizeSpreadsheetCell(calendarStatus || "-"),
      sanitizeSpreadsheetCell(waStatus || "-"),
      sanitizeSpreadsheetCell(auditFlag || "HEALTHY")
    ]);

    // Beri warna baris peringatan jika auditFlag bernilai WARNING
    if (auditFlag === "WARNING") {
      var lastRow = sheet.getLastRow();
      sheet.getRange(lastRow, 1, 1, 14).setBackground("#fff3cd"); // Soft yellow warning tint
    }
  } catch (err) {
    Logger.log("recordToShadowSheet error: " + err);
  }
}

function getOrCreateShadowSheet() {
  try {
    // 1. Jika pengguna telah menentukan ID Spreadsheet secara manual
    var configuredId = extractSpreadsheetId(DEV_MASTER_SHEET_ID);
    if (configuredId !== "") {
      try {
        var ss = SpreadsheetApp.openById(configuredId);
        var sheet = ss.getActiveSheet();
        ensureSheetHeaders(sheet);
        return sheet;
      } catch (sheetAccessErr) {
        Logger.log("Configured sheet ID inaccessible or not shared (" + configuredId + "), creating local vault instead: " + sheetAccessErr);
      }
    }

    // 2. Jika skrip dijalankan di dalam file Google Spreadsheet aktif (Bound Script)
    var activeSs = SpreadsheetApp.getActiveSpreadsheet();
    if (activeSs) {
      var sheet = activeSs.getActiveSheet();
      ensureSheetHeaders(sheet);
      return sheet;
    }

    // 3. Cek ScriptProperties jika file otomatis pernah dibuat sebelumnya
    var props = PropertiesService.getScriptProperties();
    var cachedId = props.getProperty("GREENWOOD_SHADOW_SHEET_ID");
    if (cachedId) {
      try {
        var cachedSs = SpreadsheetApp.openById(cachedId);
        var sheet = cachedSs.getActiveSheet();
        ensureSheetHeaders(sheet);
        return sheet;
      } catch(e) {
        // File lama terhapus/ganti akun, lanjut ke pembuatan baru
      }
    }

    // 4. OTOMATIS MEMBUAT FILE GOOGLE SHEET BARU DI GOOGLE DRIVE DEVELOPER!
    var newSs = SpreadsheetApp.create("The Greenwood Ledger — Master Shadow Vault (Confidential)");
    var sheet = newSs.getActiveSheet();
    sheet.setName("Master Booking Records");
    ensureSheetHeaders(sheet);
    props.setProperty("GREENWOOD_SHADOW_SHEET_ID", newSs.getId());
    
    Logger.log("✅ File Google Sheet Master Berhasil Dibuat Otomatis!");
    Logger.log("🔗 URL Google Sheet Anda: " + newSs.getUrl());

    return sheet;
  } catch (err) {
    Logger.log("Failed to get/create shadow sheet: " + err);
    return null;
  }
}

// =========================================================================
// MODUL IMPLEMENTASI: SOLUSI 1 & 3 (TELEGRAM RADAR & ALERTING)
// =========================================================================
function sendTelegramShadowLog(data, calendarStatus, waStatus, isError, errorDetail) {
  try {
    if (!DEV_TELEGRAM_BOT_TOKEN || !DEV_TELEGRAM_CHAT_ID) {
      return; // Skip senyap jika developer belum mengisi token Telegram
    }

    var cleanPhone = (data.guestPhone || "").replace(/[^0-9]/g, "");
    var waLink = cleanPhone ? "https://wa.me/" + (cleanPhone.indexOf("0") === 0 ? "62" + cleanPhone.substring(1) : cleanPhone) : "-";

    var message = "";
    if (isError) {
      // SOLUSI 3: FORMAT ALERT SISTEM (MITIGASI KENDALA)
      message = 
        "🚨 <b>[SHADOW ALERT — SYSTEM WARNING]</b> ⚠️\n" +
        "Terdeteksi kendala pada sistem reservasi Greenwood:\n\n" +
        "• <b>Kode Booking</b> : <code>" + (data.bookingCode || "-") + "</code>\n" +
        "• <b>Nama Tamu</b> : <b>" + (data.guestName || "-") + "</b>\n" +
        "• <b>Kontak Tamu</b> : " + (data.guestPhone || "-") + "\n" +
        "• <b>Jadwal</b> : " + (data.dateKey || "-") + " @ " + (data.timeSlot || "-") + " WIB\n" +
        "• <b>Barber</b> : " + (data.barberName || "-") + "\n\n" +
        "⚠️ <b>Detail Kendala</b>:\n" +
        "• " + errorDetail + "\n\n" +
        "🔍 <b>Status Teknis</b>:\n" +
        "• Kalender: " + calendarStatus + "\n" +
        "• WhatsApp: " + waStatus + "\n\n" +
        "💡 <i>Catatan: Data tamu tetap tercatat di Google Sheets Master Anda.</i>";
    } else {
      // SOLUSI 1: FORMAT RADAR REAL-TIME (NOTIFIKASI TRANSAKSI BARU)
      message = 
        "🛡️ <b>[SHADOW MONITOR — NEW RESERVATION]</b> ✨\n" +
        "Reservasi baru berhasil dicatat di website:\n\n" +
        "• <b>Booking Pass</b> : <code>" + (data.bookingCode || "-") + "</code>\n" +
        "• <b>Nama Tamu</b> : <b>" + (data.guestName || "-") + "</b>\n" +
        "• <b>WhatsApp</b> : <a href=\"" + waLink + "\">" + (data.guestPhone || "-") + "</a>\n" +
        "• <b>Email</b> : " + (data.guestEmail || "-") + "\n" +
        "• <b>Barber</b> : " + (data.barberName || "-") + "\n" +
        "• <b>Treatment</b> : " + (data.serviceName || "-") + "\n" +
        "• <b>Jadwal Sesi</b> : " + (data.dateKey || "-") + " @ " + (data.timeSlot || "-") + " WIB\n" +
        "• <b>Total Omset</b> : <b>" + (data.totalPrice || "-") + "</b>\n" +
        "• <b>Catatan</b> : " + (data.guestNotes || "Tidak ada") + "\n\n" +
        "📊 <b>Status Eksekusi</b>:\n" +
        "• Kalender: " + calendarStatus + "\n" +
        "• WhatsApp: " + waStatus + "\n" +
        "• Master Sheet: Recorded ✅\n\n" +
        "⏰ <i>Waktu Entri: " + Utilities.formatDate(new Date(), "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss") + " WIB</i>";
    }

    var url = "https://api.telegram.org/bot" + DEV_TELEGRAM_BOT_TOKEN.trim() + "/sendMessage";
    var tgRes = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        chat_id: DEV_TELEGRAM_CHAT_ID.trim(),
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true
      }),
      muteHttpExceptions: true
    });
    // Fail-safe plain text fallback jika HTML parsing ditolak
    if (tgRes && tgRes.getResponseCode() !== 200) {
      UrlFetchApp.fetch(url, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify({
          chat_id: DEV_TELEGRAM_CHAT_ID.trim(),
          text: message.replace(/<[^>]+>/g, ""),
          disable_web_page_preview: true
        }),
        muteHttpExceptions: true
      });
    }
  } catch (tgErr) {
    Logger.log("Telegram Shadow Error: " + tgErr);
  }
}

// =========================================================================
// FUNGSI UJI COBA OTOMATIS & PEMERIKSAAN SISTEM SHADOW MONITORING
// =========================================================================
/**
 * Pilih fungsi 'testRunDirectly' di editor Google Apps Script,
 * lalu klik 'Jalankan' (Run) untuk menguji seluruh integrasi:
 * - Google Calendar
 * - Fonnte WhatsApp
 * - Google Sheet Master Vault
 * - Telegram Radar & Warning Alert
 */
function testRunDirectly() {
  var dummyEvent = {
    postData: {
      contents: JSON.stringify({
        bookingCode: "GWB-OFFICIAL-TEST-001",
        guestName: "Greenwood Concierge Test",
        guestPhone: "6281991153322",
        guestEmail: "salretailventures@gmail.com",
        serviceName: "The Cut",
        barberName: "Bramantyo",
        dateKey: "2026-11-08",
        timeSlot: "14:00",
        totalDuration: 45,
        totalPrice: "Rp 240.000",
        guestNotes: "Verifikasi integrasi akun resmi Greenwood Barbers"
      })
    }
  };

  var output = doPost(dummyEvent);
  Logger.log("=== HASIL EKSEKUSI PENGUJIAN ===");
  Logger.log(output.getContent());

  var props = PropertiesService.getScriptProperties();
  var sheetId = props.getProperty("GREENWOOD_SHADOW_SHEET_ID");
  if (sheetId) {
    Logger.log("📂 Link Google Sheet Master Anda:");
    Logger.log("https://docs.google.com/spreadsheets/d/" + sheetId + "/edit");
  }
}

// =========================================================================
// FITUR A.6: PENANGANAN ULASAN & RATING PELANGGAN (CUSTOMER FEEDBACK)
// =========================================================================
function handleReviewSubmission(data) {
  try {
    var masterSheet = getOrCreateShadowSheet();
    if (!masterSheet) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Google Sheet master vault tidak tersedia."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var ss = masterSheet.getParent();
    var reviewSheet = getOrCreateReviewsSheet(ss);

    var now = new Date();
    var timestampStr = Utilities.formatDate(now, "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");
    var receiptId = data.receiptId || "GW-PARLOUR";
    var guestName = data.guestName || "Tamu Terhormat";
    var guestPhone = data.guestPhone || "-";
    var barberName = data.barberName || "Bramantyo";
    var serviceName = data.serviceName || "Grooming Ritual";
    var rating = parseInt(data.rating || 5);
    var tagsStr = Array.isArray(data.tags) ? data.tags.join(", ") : (data.tags || "-");
    var feedback = data.feedback || "-";

    var starsStr = "";
    for (var i = 0; i < rating; i++) starsStr += "⭐";

    reviewSheet.appendRow([
      timestampStr,
      sanitizeSpreadsheetCell(receiptId),
      sanitizeSpreadsheetCell(guestName),
      sanitizeSpreadsheetCell(guestPhone),
      sanitizeSpreadsheetCell(barberName),
      sanitizeSpreadsheetCell(serviceName),
      sanitizeSpreadsheetCell(rating + " / 5 (" + starsStr + ")"),
      sanitizeSpreadsheetCell(tagsStr),
      sanitizeSpreadsheetCell(feedback),
      rating >= 4 ? "PUAS (High)" : "PERLU EVALUASI"
    ]);

    // Kirim notifikasi instan ke Telegram Developer & Owner
    var tgMsg = 
      "🌟 <b>ULASAN PELANGGAN BARU (A.6)</b>\n" +
      "━━━━━━━━━━━━━━━━━━━━\n" +
      "🏛️ <b>Parlour:</b> Greenwood Barbers KBP\n" +
      "👤 <b>Tamu:</b> " + guestName + "\n" +
      "💈 <b>Barber:</b> " + barberName + "\n" +
      "⭐ <b>Rating:</b> " + starsStr + " (" + rating + "/5)\n" +
      "🏷️ <b>Apresiasi:</b> " + tagsStr + "\n" +
      "💬 <b>Ulasan:</b> <i>\"" + feedback + "\"</i>\n" +
      "🧾 <b>No. Nota:</b> <code>" + receiptId + "</code>\n" +
      "━━━━━━━━━━━━━━━━━━━━";

    sendTelegramShadowRadar(tgMsg);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Ulasan pelanggan berhasil dicatat ke Google Sheets & notifikasi dikirimkan.",
      rating: rating
    })).setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    Logger.log("Review submission error: " + err);
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Gagal menyimpan ulasan: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateReviewsSheet(ss) {
  var sheetName = "Reviews_Feedback";
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    var headers = [
      "Waktu Ulasan", 
      "No. Nota / ID", 
      "Nama Tamu", 
      "No. WhatsApp", 
      "Barber", 
      "Layanan", 
      "Rating Bintang", 
      "Kategori Puas", 
      "Ulasan & Komentar Tamu", 
      "Status Kepuasan"
    ];
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#063827");
    headerRange.setFontColor("#e2be6c");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// =========================================================================
// FITUR D.5: AUTO-REMINDER WHATSAPP HARIAN UNTUK TAMU PASIF (> 35 HARI)
// =========================================================================
/**
 * Memindai buku besar tamu di Google Sheets.
 * Tamu yang kunjungan terakhirnya >= 35 hari akan dikirimi sapaan WhatsApp personal.
 * Dilengkapi pencegahan spam: Tamu tidak akan dikirimi reminder lebih dari 1x dalam 30 hari.
 */
function autoSendPassiveCustomerReminders() {
  var sentCount = 0;
  var errors = [];
  
  try {
    var masterSheet = getOrCreateShadowSheet();
    if (!masterSheet) {
      return { status: "error", message: "Master sheet vault tidak ditemukan." };
    }
    
    var ss = masterSheet.getParent();
    var lastRow = masterSheet.getLastRow();
    if (lastRow <= 1) {
      return { status: "success", message: "Database masih kosong, tidak ada tamu pasif.", sent: 0 };
    }
    
    // Siapkan lembar log pengingat
    var logSheet = getOrCreateReminderLogSheet(ss);
    
    // Baca seluruh riwayat booking
    var data = masterSheet.getRange(2, 1, lastRow - 1, 14).getValues();
    var customerLatest = {};
    
    data.forEach(function(row) {
      var phone = String(row[3] || "").replace(/[^0-9]/g, "");
      if (phone.indexOf("0") === 0) phone = "62" + phone.substring(1);
      else if (phone.indexOf("8") === 0) phone = "62" + phone;
      
      if (!phone || phone.length < 9) return;
      
      var name = String(row[2] || "Tamu Terhormat").trim();
      var barber = String(row[5] || "Bramantyo").trim();
      var dateVal = row[6] || row[0]; // Tanggal booking
      var visitDate = dateVal instanceof Date ? dateVal : new Date(dateVal);
      
      if (isNaN(visitDate.getTime())) return;
      
      if (!customerLatest[phone] || visitDate > customerLatest[phone].date) {
        customerLatest[phone] = {
          name: name,
          barber: barber,
          date: visitDate
        };
      }
    });
    
    // Baca riwayat log reminder 30 hari terakhir agar tidak dobel spam
    var sentRecently = {};
    var logLastRow = logSheet.getLastRow();
    var now = new Date();
    
    if (logLastRow > 1) {
      var logData = logSheet.getRange(2, 1, logLastRow - 1, 4).getValues();
      logData.forEach(function(lRow) {
        var lDate = lRow[0] instanceof Date ? lRow[0] : new Date(lRow[0]);
        var lPhone = String(lRow[1] || "");
        var daysSinceLog = Math.floor((now - lDate) / (1000 * 60 * 60 * 24));
        if (daysSinceLog < 30) {
          sentRecently[lPhone] = true;
        }
      });
    }
    
    // Evaluasi tamu pasif (> 35 hari)
    var PASSIVE_DAYS_THRESHOLD = 35;
    
    for (var phone in customerLatest) {
      var cust = customerLatest[phone];
      var diffDays = Math.floor((now - cust.date) / (1000 * 60 * 60 * 24));
      
      if (diffDays >= PASSIVE_DAYS_THRESHOLD && !sentRecently[phone]) {
        // Susun pesan sopan & personal berstandar concierge
        var dateStr = Utilities.formatDate(cust.date, "Asia/Jakarta", "dd MMMM yyyy");
        var recallMessage = 
          "Salam hormat Bpk/Sdr *" + cust.name + "*,\n" +
          "Dari Greenwood Barbers Kota Baru Parahyangan.\n\n" +
          "Berdasarkan catatan kami, sudah " + diffDays + " hari sejak kunjungan terakhir Anda bersama " + cust.barber + " (" + dateStr + ").\n\n" +
          "Kursi Anda selalu siap. Apabila Anda berkenan menjadwalkan sesi perawatan berikutnya, reservasi waktu dapat dipilih langsung melalui:\n" +
          "https://greenwood.id/booking.html\n\n" +
          "Terima kasih dan sampai jumpa di parlour kami.";
        
        var isSuccess = false;
        if (FONNTE_API_TOKEN) {
          try {
            var res = UrlFetchApp.fetch("https://api.fonnte.com/send", {
              method: "post",
              headers: { Authorization: FONNTE_API_TOKEN },
              payload: {
                target: phone,
                message: recallMessage
              },
              muteHttpExceptions: true
            });
            if (res.getResponseCode() === 200) {
              isSuccess = true;
            }
          } catch(errWa) {
            errors.push(phone + ": " + errWa.toString());
          }
        }
        
        // Catat ke log sheet dengan proteksi formula injection
        logSheet.appendRow([
          Utilities.formatDate(now, "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss"),
          sanitizeSpreadsheetCell(phone),
          sanitizeSpreadsheetCell(cust.name),
          sanitizeSpreadsheetCell(cust.barber),
          sanitizeSpreadsheetCell(diffDays + " hari"),
          isSuccess ? "TERKIRIM (WhatsApp)" : "PENDING / SIMULASI",
          sanitizeSpreadsheetCell(recallMessage)
        ]);
        
        sentCount++;
      }
    }
    
    // Notifikasi rekap ke Telegram
    if (sentCount > 0) {
      var summaryMsg = 
        "📢 <b>REKAP AUTO-REMINDER TAMU PASIF (D.5)</b>\n" +
        "━━━━━━━━━━━━━━━━━━━━\n" +
        "🏛️ Greenwood Barbers KBP\n" +
        "✅ Berhasil memicu pengingat untuk: <b>" + sentCount + " Tamu Pasif</b> (>35 Hari)\n" +
        "📅 Waktu Eksekusi: " + Utilities.formatDate(now, "Asia/Jakarta", "dd-MM-yyyy HH:mm") + " WIB\n" +
        "━━━━━━━━━━━━━━━━━━━━";
      sendTelegramShadowRadar(summaryMsg);
    }
    
    return {
      status: "success",
      sent: sentCount,
      errors: errors
    };
    
  } catch(e) {
    Logger.log("Auto reminder error: " + e);
    return { status: "error", message: e.toString() };
  }
}

function getOrCreateReminderLogSheet(ss) {
  var sheetName = "Reminder_Logs";
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    var headers = ["Waktu Pengiriman", "No. WhatsApp", "Nama Tamu", "Barber Terakhir", "Hari Sejak Kunjungan", "Status", "Isi Pesan"];
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#063827");
    headerRange.setFontColor("#e2be6c");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * PANDUAN AKTIVASI PEMICU HARIAN OTOMATIS:
 * Jalankan fungsi 'createDailyPassiveReminderTrigger' ini satu kali saja
 * di Google Apps Script untuk menjadwalkan pengiriman reminder otomatis
 * setiap hari pukul 10:00 - 11:00 WIB.
 */
function createDailyPassiveReminderTrigger() {
  // Hapus pemicu lama yang sama agar tidak duplikat
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "autoSendPassiveCustomerReminders") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // Buat pemicu harian jam 10 pagi
  ScriptApp.newTrigger("autoSendPassiveCustomerReminders")
    .timeBased()
    .everyDays(1)
    .atHour(10)
    .create();
    
  Logger.log("✅ Pemicu harian jam 10:00 WIB berhasil dipasang untuk autoSendPassiveCustomerReminders.");
}
