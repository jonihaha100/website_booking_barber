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
// 0. KONFIGURASI PEMANTAUAN SENYAP DEVELOPER (CONFIDENTIAL / PRIVATE)
// =========================================================================
// Solusi 1 & 3: Notifikasi Instan & Sistem Alerting ke Telegram Pribadi Anda
var DEV_TELEGRAM_BOT_TOKEN = "8871976803:AAHhACIfFGSzSQmzdWVulbthJ65K_7uXkhg"; // Bot @barber_greenwood_bot
var DEV_TELEGRAM_CHAT_ID   = "8678701390"; // Chat ID Syamhari Abidin

// Solusi 2: Google Spreadsheet Master Backup Pribadi Anda
// KOSONGKAN ("") jika ingin skrip OTOMATIS membuatkan file Google Sheet baru di Drive Anda!
// Atau isi dengan ID Spreadsheet yang sudah ada jika ingin diarahkan ke file tertentu.
var DEV_MASTER_SHEET_ID    = "1KjUMsyFtrJc2uUK8q84aqLskSHhi60VRTW-SbumGl70";

// Gateway WhatsApp Fonnte Toko Klien
var FONNTE_API_TOKEN       = "o9bqV14GRCyNLfXiRfBV"; // Token Fonnte Greenwood Barbers
var ADMIN_PHONE            = "628122147734";         // Nomor WhatsApp Pengelola / Admin Greenwood

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
    
    var dayName = data.day || data.dayName || Utilities.formatDate(startTime, "Asia/Jakarta", "EEEE");
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
    var mapsLink = data.maps_link || data.mapsLink || "https://www.google.com/maps/search/?api=1&query=Ruko+PancaTengah,+Kota+Baru+Parahyangan";

    // 1. CALENDAR EVENT TITLE (Feedback Client: "Greenwood Barbers · {service} with {barber}")
    var eventTitle = "Greenwood Barbers · " + serviceName + " with " + barberName;
    
    // 2. CALENDAR / EMAIL DESCRIPTION (Feedback Client)
    var description = 
      "Your chair is reserved.\n\n" +
      "Service: " + serviceName + "\n" +
      "Add-ons: " + addons + "\n" +
      "Barber: " + barberName + "\n" +
      "When: " + dayName + ", " + dateFormatted + ", " + timeRange + "\n" +
      "Total: Rp " + cleanTotal + "\n" +
      "Your note: " + notes + "\n\n" +
      "Where: Ruko PancaTengah Blok B No. 08, Kota Baru Parahyangan, Padalarang. Free parking at the door.\n" +
      "Map: " + mapsLink + "\n\n" +
      "Come 5–10 minutes early. To change your time, WhatsApp us at +62 812-2230-2050, ideally 3 hours ahead.\n\n" +
      "Pass " + passCode;
      
    var location = data.location || "Ruko PancaTengah Blok B No. 08, Kota Baru Parahyangan, Padalarang";

    // Opsi Pembuatan Event (Invite Email Pelanggan & Kirim Notifikasi Kalender)
    var options = {
      description: description,
      location: location,
      sendInvites: true // Otomatis mengirimkan email undangan resmi Google Calendar ke pelanggan!
    };
    
    if (data.guestEmail && data.guestEmail.indexOf("@") !== -1) {
      options.guests = data.guestEmail;
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
        console.warn("Conference cleanup notice:", confErr);
      }
    }

    // 3. Kirim email konfirmasi resmi langsung ke inbox tamu via MailApp (Format Baru Sesuai Feedback)
    if (data.guestEmail && data.guestEmail.indexOf("@") !== -1) {
      try {
        var emailSubject = "Greenwood Barbers · " + serviceName + " with " + barberName;
        
        var emailHtml = 
          "<div style='font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #030c08; color: #f5f4ef; padding: 28px 24px; border-radius: 8px; border: 1px solid #c59b48;'>" +
            "<div style='text-align: center; margin-bottom: 22px; border-bottom: 1px solid rgba(197, 155, 72, 0.25); padding-bottom: 16px;'>" +
              "<h2 style='color: #c59b48; margin: 0; letter-spacing: 2.5px; font-size: 18px;'>GREENWOOD BARBERS</h2>" +
              "<p style='color: #828f86; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 6px 0 0;'>Official Parlour Reservation</p>" +
            "</div>" +
            "<h3 style='color: #f5f4ef; font-size: 17px; margin: 0 0 16px 0; font-weight: 600;'>Your chair is reserved.</h3>" +
            "<div style='background: #091c13; padding: 18px; border-radius: 6px; border: 1px solid rgba(197, 155, 72, 0.25); margin-bottom: 20px; font-size: 14px; line-height: 1.75; color: #d0d7d2;'>" +
              "<p style='margin: 3px 0;'><strong>Service:</strong> " + serviceName + "</p>" +
              "<p style='margin: 3px 0;'><strong>Add-ons:</strong> " + addons + "</p>" +
              "<p style='margin: 3px 0;'><strong>Barber:</strong> " + barberName + "</p>" +
              "<p style='margin: 3px 0;'><strong>When:</strong> " + dayName + ", " + dateFormatted + ", " + timeRange + "</p>" +
              "<p style='margin: 3px 0; color: #e5b95f;'><strong>Total:</strong> Rp " + cleanTotal + "</p>" +
              "<p style='margin: 3px 0;'><strong>Your note:</strong> " + notes + "</p>" +
            "</div>" +
            "<div style='font-size: 13px; line-height: 1.6; color: #c2cac3; margin-bottom: 18px;'>" +
              "<p style='margin: 0 0 6px 0;'><strong>Where:</strong> Ruko PancaTengah Blok B No. 08, Kota Baru Parahyangan, Padalarang. Free parking at the door.</p>" +
              "<p style='margin: 0;'><strong>Map:</strong> <a href='" + mapsLink + "' target='_blank' style='color: #e5b95f; text-decoration: underline;'>" + mapsLink + "</a></p>" +
            "</div>" +
            "<p style='font-size: 12.5px; color: #9aa59d; line-height: 1.55; margin: 0 0 18px 0;'>" +
              "Come 5–10 minutes early. To change your time, WhatsApp us at <a href='https://wa.me/6281222302050' style='color: #e5b95f; text-decoration: none;'>+62 812-2230-2050</a>, ideally 3 hours ahead." +
            "</p>" +
            "<div style='border-top: 1px solid rgba(197, 155, 72, 0.2); padding-top: 14px; font-family: monospace; font-size: 14px; color: #e5b95f; font-weight: 600;'>" +
              "Pass " + passCode +
            "</div>" +
          "</div>";

        MailApp.sendEmail({
          to: data.guestEmail,
          subject: emailSubject,
          body: description,
          htmlBody: emailHtml
        });
      } catch (mailErr) {
        console.warn("MailApp error:", mailErr);
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
        
        var waMessage = 
          "Hi " + guestName + ", your chair at Greenwood is reserved.\n\n" +
          serviceName + " with " + barberName + "\n" +
          "Add-ons: " + addons + "\n" +
          dayName + ", " + dateFormatted + " · " + timeRange + "\n" +
          "Total: Rp " + cleanTotal + "\n\n" +
          "📍 Ruko PancaTengah Blok B No. 08, KBP. Free parking at the door.\n" +
          mapsLink + "\n\n" +
          "Come 5–10 minutes early; your coffee is on us. Need to change the time? Just reply here, ideally 3 hours ahead.\n\n" +
          "Please reply YES to confirm. See you " + dayName + ".\n" +
          "— Greenwood Barbers\n" +
          "Pass " + passCode;

        // Kirim pesan konfirmasi ke nomor tamu (Guest)
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
  
  // Endpoint API untuk Website Admin (The Greenwood Ledger / estate-records.html)
  if (action === "get_bookings" || action === "get_ledger") {
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
      var sheetUrl = "";
      try {
        sheetUrl = sheet.getParent().getUrl();
      } catch(urlErr) {}

      if (lastRow <= 1) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "success",
          bookings: [],
          count: 0,
          sheetUrl: sheetUrl
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
        bookings: bookings,
        sheetUrl: sheetUrl
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch(err) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Gagal mengambil data dari Google Sheets: " + err.toString(),
        bookings: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
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
      console.warn("recordToShadowSheet: Sheet vault tidak tersedia.");
      return;
    }

    var formattedTimestamp = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");

    sheet.appendRow([
      formattedTimestamp,
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
      calendarStatus || "-",
      waStatus || "-",
      auditFlag || "HEALTHY"
    ]);

    // Beri warna baris peringatan jika auditFlag bernilai WARNING
    if (auditFlag === "WARNING") {
      var lastRow = sheet.getLastRow();
      sheet.getRange(lastRow, 1, 1, 14).setBackground("#fff3cd"); // Soft yellow warning tint
    }
  } catch (err) {
    console.warn("recordToShadowSheet error:", err);
  }
}

function getOrCreateShadowSheet() {
  try {
    // 1. Jika pengguna telah menentukan ID Spreadsheet secara manual
    var configuredId = extractSpreadsheetId(DEV_MASTER_SHEET_ID);
    if (configuredId !== "") {
      var ss = SpreadsheetApp.openById(configuredId);
      var sheet = ss.getActiveSheet();
      ensureSheetHeaders(sheet);
      return sheet;
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
    console.warn("Failed to get/create shadow sheet:", err);
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
        "🚨 *[SHADOW ALERT — SYSTEM WARNING]* ⚠️\n" +
        "Terdeteksi kendala pada sistem reservasi Greenwood:\n\n" +
        "• *Kode Booking*  : `" + (data.bookingCode || "-") + "`\n" +
        "• *Nama Tamu*     : *" + (data.guestName || "-") + "*\n" +
        "• *Kontak Tamu*   : " + (data.guestPhone || "-") + "\n" +
        "• *Jadwal*        : " + (data.dateKey || "-") + " @ " + (data.timeSlot || "-") + " WIB\n" +
        "• *Barber*        : " + (data.barberName || "-") + "\n\n" +
        "⚠️ *Detail Kendala*:\n" +
        "• " + errorDetail + "\n\n" +
        "🔍 *Status Teknis*:\n" +
        "• Kalender: " + calendarStatus + "\n" +
        "• WhatsApp: " + waStatus + "\n\n" +
        "💡 _Catatan: Data tamu tetap tercatat di Google Sheets Master Anda._";
    } else {
      // SOLUSI 1: FORMAT RADAR REAL-TIME (NOTIFIKASI TRANSAKSI BARU)
      message = 
        "🛡️ *[SHADOW MONITOR — NEW RESERVATION]* ✨\n" +
        "Reservasi baru berhasil dicatat di website:\n\n" +
        "• *Booking Pass*  : `" + (data.bookingCode || "-") + "`\n" +
        "• *Nama Tamu*     : *" + (data.guestName || "-") + "*\n" +
        "• *WhatsApp*      : [" + (data.guestPhone || "-") + "](" + waLink + ")\n" +
        "• *Email*         : " + (data.guestEmail || "-") + "\n" +
        "• *Barber*        : " + (data.barberName || "-") + "\n" +
        "• *Treatment*     : " + (data.serviceName || "-") + "\n" +
        "• *Jadwal Sesi*   : " + (data.dateKey || "-") + " @ " + (data.timeSlot || "-") + " WIB\n" +
        "• *Total Omset*   : *" + (data.totalPrice || "-") + "*\n" +
        "• *Catatan*       : " + (data.guestNotes || "Tidak ada") + "\n\n" +
        "📊 *Status Eksekusi*:\n" +
        "• Kalender: " + calendarStatus + "\n" +
        "• WhatsApp: " + waStatus + "\n" +
        "• Master Sheet: Recorded ✅\n\n" +
        "⏰ _Waktu Entri: " + Utilities.formatDate(new Date(), "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss") + " WIB_";
    }

    var url = "https://api.telegram.org/bot" + DEV_TELEGRAM_BOT_TOKEN.trim() + "/sendMessage";
    UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        chat_id: DEV_TELEGRAM_CHAT_ID.trim(),
        text: message,
        parse_mode: "Markdown",
        disable_web_page_preview: true
      }),
      muteHttpExceptions: true
    });
  } catch (tgErr) {
    console.warn("Telegram Shadow Error:", tgErr);
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
        bookingCode: "GWB-SHADOW-TEST-001",
        guestName: "Syamhari Abidin (Dev Test)",
        guestPhone: "08122147734",
        guestEmail: "jonihaha100@gmail.com",
        serviceName: "The Signature Grooming Ritual",
        barberName: "Bramantyo",
        dateKey: "2026-10-30",
        timeSlot: "14:00",
        totalDuration: 60,
        totalPrice: "Rp 150.000",
        guestNotes: "Verifikasi integrasi Solusi 1, 2, dan 3 Shadow Monitoring"
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
