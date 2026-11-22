/**
 * GREENWOOD BARBERS — BILINGUAL ENGINE (ID | EN)
 * Complete Dual-language system (Bahasa Indonesia baku EYD V & British Mayfair English).
 * Consistent across all pages: Home (index.html), About (about.html), Contact (contact.html), Booking (booking.html).
 * Defaults strictly to Indonesian ('id') unless user toggles English ('en').
 * Prevents Google Translate machine translation collisions.
 * Developed for Greenwood Barbers Kota Baru Parahyangan.
 */

(function () {
  'use strict';

  // 1. COMPREHENSIVE DICTIONARY MAPPINGS (ID <-> EN)
  var translations = {
    id: {
      // Document Metadata (Index)
      pageTitle: "Greenwood Barbers · Tempat Singgah Perawatan Pria Pertama di Bandung",
      metaDesc: "Pangkas rambut presisi, cukur handuk hangat, dan perawatan janggut dengan reservasi di Kota Baru Parahyangan, Padalarang. Tanpa antre. Reservasi kursi Anda secara online.",

      // Navigation
      navHome: "Beranda",
      navAbout: "Tentang Kami",
      navContact: "Hubungi Kami",
      navReserve: "RESERVASI KURSI",
      
      // Index Hero
      heroBadge: "KOTA BARU PARAHYANGAN",
      heroTitle: "Tempat Singgah Perawatan Pria Pertama di Bandung",
      heroSubtitle: "Waktu seutuhnya milik Anda. Barbershop tenang dan eksklusif di perbukitan Bandung Barat.",
      heroCtaBook: "RESERVASI KURSI",
      
      // Index Section Headlines & Services
      menuEyebrow: "PILIHAN LAYANAN",
      menuHeadline: "Layanan Kami",
      menuSubtext: "Setiap kunjungan diawali dengan konsultasi mendalam dan handuk dingin, serta diakhiri dengan hasil presisi yang membanggakan.",
      
      // Package 1: The Cut
      pkg1Title: "The Cut",
      pkg1Price: "Rp 240.000",
      pkg1Dur: "45 Menit",
      pkg1Desc: "Layanan pangkas rambut utama kami. Kami mendengarkan kebutuhan gaya Anda terlebih dahulu di depan cermin, kemudian mendedikasikan 45 menit untuk hasil presisi terbaik yang Anda dambakan.",
      
      // Package 2: The Cut & Shave / Trim
      pkg2Title: "The Cut & Shave / Trim",
      pkg2Price: "Rp 420.000",
      pkg2Dur: "75 Menit",
      pkg2Desc: "Paket terfavorit para tamu. Pangkas rambut utama dilanjutkan dengan cukur handuk hangat atau perapian janggut di kursi yang sama, disempurnakan dengan pijat relaksasi punggung dan bahu selama 15 menit.",
      
      // Package 3: The Ritual
      pkg3Title: "The Ritual",
      pkg3Price: "Rp 590.000",
      pkg3Dur: "95 Menit",
      pkg3Desc: "Perawatan paripurna untuk momen istimewa Anda. Seluruh layanan tercakup: pemotongan rambut presisi, cukur handuk hangat atau perapian janggut, hair spa kulit kepala, masker wajah, dan pijat punggung & bahu.",
      
      btnReserve: "RESERVASI KURSI",
      
      // Values
      valueTitle1: "Kebersihan yang Nyata Terlihat dan Terasa",
      valueDesc1: "Satu silet baru sekali pakai untuk setiap tamu. Handuk hangat higienis. Seluruh peralatan disterilkan tuntas setiap sesi.",
      valueTitle2: "Perawatan Tenang Tanpa Terburu-buru",
      valueDesc2: "Kami mendedikasikan 45 hingga 95 menit untuk setiap sesi. Dimulai dengan konsultasi mendalam di depan cermin sebelum pemotongan.",
      valueTitle3: "Parkir Gratis Tepat di Depan Pintu",
      valueDesc3: "Bebas biaya parkir dan tanpa perlu berputar-putar. Parkir tepat di depan Ruko PancaTengah, hanya 7 menit dari Stasiun Whoosh.",
      
      // Footer (All Pages)
      footerHours: "Buka Rabu–Senin, 10:00–20:00 WIB • Tutup Setiap Hari Selasa",
      footerTagline: "Tempat Singgah Perawatan Pria Pertama di Bandung • Kota Baru Parahyangan",
      footerCopyright: "© 2026 Greenwood Barbers. Hak cipta dilindungi undang-undang.",
      footerContactBtn: "Hubungi WhatsApp Concierge",

      // ======================================================================
      // ABOUT PAGE TRANSLATIONS (about.html)
      // ======================================================================
      aboutPageTitle: "Kisah Kami · Greenwood Barbers Kota Baru Parahyangan",
      aboutMetaDesc: "Tempat singgah pria di Kota Baru Parahyangan, dirancang khusus untuk Anda yang ingin melepas penat sejenak, dirawat dengan perhatian penuh, dan kembali tampil segar.",
      aboutBadge: "KISAH KAMI",
      aboutHeroTitle: "Kami membangun barbershop yang kami sendiri ingin tempati.",
      aboutHeroSub: "Tenang, bersih, dan tanpa terburu-buru. Tempat untuk meletakkan ponsel Anda sejenak dan kembali tampil segar sebagai diri Anda seutuhnya.",
      aboutWhyTitle: "Mengapa Greenwood",
      aboutWhyP1: "Kami mendirikan Greenwood karena kami sulit menemukan barbershop di Bandung yang membuat kami benar-benar betah. Banyak tempat bisa memangkas rambut Anda. Namun tidak ada yang membuat kami ingin kembali sebelum benar-benar terpaksa.",
      aboutQuote: "&ldquo;Kami tidak mengukur hari yang baik dari berapa banyak kepala yang kami pangkas. Kami mengukurnya dari berapa banyak pria yang pulang dengan perasaan lebih ringan daripada saat mereka datang.&rdquo;",
      aboutWhyP2: "Maka kami merancang tempat singgah pria di Kota Baru Parahyangan: handuk dingin saat Anda duduk, percakapan bermakna, serta handuk hangat dan pijat relaksasi di akhir sesi. Pria jarang meluangkan waktu seutuhnya untuk diri sendiri. Di sini, Anda bisa. Anda akan melangkah keluar dengan percaya diri.",
      aboutValuesEyebrow: "PRINSIP KAMI",
      aboutValuesTitle: "Tiga hal yang tak pernah kami kompromikan",
      aboutVal1Title: "Waktu seutuhnya milik Anda",
      aboutVal1Desc: "Setiap sesi direservasi khusus selama 45 hingga 95 menit. Barber kami mendampingi Anda sepanjang waktu, dan kami tak pernah memburu-buru pengerjaan demi tamu berikutnya.",
      aboutVal2Title: "Kebersihan nyata terlihat dan terasa",
      aboutVal2Desc: "Silet baru, peralatan disterilkan, dan ruangan higienis. Menjaga kebersihan adalah tugas kami, agar Anda dapat beristirahat dengan tenang.",
      aboutVal3Title: "Ruangan yang memberi ketenangan",
      aboutVal3Desc: "Udara sejuk, pencahayaan lembut, alunan musik tenang, dan kursi yang nyaman. Nikmati espresso, teh, atau air mineral saat Anda bersiap memulai sesi.",

      // ======================================================================
      // CONTACT PAGE TRANSLATIONS (contact.html)
      // ======================================================================
      contactPageTitle: "Hubungi Kami · Greenwood Barbers Kota Baru Parahyangan",
      contactMetaDesc: "Ruko PancaTengah, Kota Baru Parahyangan. Hubungi kami melalui WhatsApp atau telepon setiap hari operasional. Rabu sampai Senin, 10:00–20:00 WIB.",
      contactBadge: "KUNJUNGI · TELEPON · PESAN",
      contactHeroTitle: "Kunjungi Tempat Singgah Kami.",
      contactHeroSub: "Kami berada di Ruko PancaTengah, Kota Baru Parahyangan. Kirim pesan WhatsApp atau hubungi kami kapan saja selama jam operasional, staf concierge kami siap menyambut Anda.",
      contactWaSub: "Cara tercepat untuk reservasi, ubah jadwal, atau bertanya &rarr;",
      contactPhoneTitle: "Telepon",
      contactPhoneSub: "Ingin berbincang langsung? Hubungi meja resepsionis kami &rarr;",
      contactEmailTitle: "Email",
      contactEmailSub: "Reservasi rombongan, voucher hadiah, dan pertanyaan lainnya &rarr;",
      contactPanelHeading: "Lokasi & Jam Buka",
      contactAddressLabel: "Alamat",
      contactParkingNote: "Bebas biaya parkir tepat di depan pintu.",
      contactHoursLabel: "Jam Operasional",
      contactDaysText: "<strong>Rabu &ndash; Senin:</strong> 10:00 &ndash; 20:00 WIB",
      contactBadgeOpen: "Buka",
      contactTuesdayText: "<strong>Selasa:</strong> Hari libur untuk pembersihan & sterilisasi",
      contactBadgeClosed: "TUTUP",
      contactOpenMapsBtn: "Buka di Google Maps &nearr;",

      // ======================================================================
      // BOOKING PAGE TRANSLATIONS (booking.html)
      // ======================================================================
      bookingPageTitle: "Reservasi Kursi · Greenwood Barbers Kota Baru Parahyangan",
      bookingEyebrow: "KOTA BARU PARAHYANGAN",
      bookingTitle: "Reservasi Kursi",
      bookingSubtitle: "Pilih layanan, barber pilihan Anda, dan waktu sesi. Hanya butuh satu menit, dan kursi Anda siap menanti.",

      // Stepper
      step1Label: "1. Layanan",
      step2Label: "2. Barber",
      step3Label: "3. Tanggal & Jam",
      step4Label: "4. Data Tamu",

      // Step 1: Select Ritual
      step1Title: "Pilih Layanan Anda",
      step1Badge: "Langkah 1 dari 4",
      step1Sub: "Pilih satu paket utama. Anda dapat menambahkan layanan pelengkap di bawah.",
      step1UpgradeTitle: "Otomatis Ditingkatkan ke The Ritual",
      step1UpgradeDesc: "Anda memilih Cut & Shave ditambah Black Mask & Hair Spa. Kami otomatis menggabungkannya ke dalam paket <strong>The Ritual</strong> seharga <strong>Rp 590.000</strong> (menghemat Rp 10.000 dan 20 menit)!",
      addonsHeading: "Layanan Tambahan",
      step1NextBtn: "Lanjut: pilih barber Anda &rarr;",
      addonAlreadyIncluded: "✓ Sudah termasuk dalam paket",
      minsLabel: "Menit",

      // Step 2: Select Barber
      step2Title: "Pilih Barber Pilihan Anda",
      step2Badge: "Langkah 2 dari 4",
      step2AnyBarberTitle: "Barber Pertama yang Tersedia",
      step2AnyBarberDesc: "Kami pilihkan barber terbaik yang siap melayani pada jadwal Anda.",
      step2OrChoose: "Atau tentukan barber Anda:",
      step2BackBtn: "&larr; Kembali",
      step2NextBtn: "Lanjut: pilih jam sesi &rarr;",

      // Step 3: Date & Time
      step3Title: "Kapan Waktu Terbaik Anda?",
      step3Badge: "Langkah 3 dari 4",
      step3ChooseDay: "Pilih Hari",
      step3ClosedTuesdays: "Tutup Setiap Hari Selasa",
      step3Sub: "Reservasi dibuka hingga 14 hari ke depan.",
      step3AvailableTimes: "Waktu Tersedia",
      step3VisitDurationPrefix: "Estimasi sesi: ",
      step3Minutes: "menit",
      step3SelectDateFirst: "Silakan pilih tanggal reservasi di atas untuk melihat jam yang tersedia.",
      step3ClosedBadge: "Tutup",
      step3ClosedTooltip: "Barbershop Tutup Setiap Hari Selasa",
      step3BackBtn: "&larr; Kembali",
      step3NextBtn: "Lanjut: isi data diri &rarr;",

      // Step 4: Guest Details & Summary
      step4Title: "Langkah Terakhir",
      step4Badge: "Langkah 4 dari 4",
      summaryEyebrow: "Ringkasan Reservasi",
      summaryLabelService: "Layanan:",
      summaryLabelBarber: "Barber:",
      summaryLabelDateTime: "Tanggal & Jam:",
      summaryPickTimeNotice: "Pilih jadwal di langkah 3",
      formNameLabel: "Nama Lengkap *",
      formNamePlaceholder: "Nama panggilan yang Anda sukai",
      formPhoneLabel: "Nomor WhatsApp *",
      formPhonePlaceholder: "contoh: 0812-xxxx-xxxx",
      formEmailLabel: "Email (opsional)",
      formEmailPlaceholder: "Untuk konfirmasi kalender dan pengingat",
      formNotesLabel: "Catatan khusus untuk barber? (opsional)",
      formNotesPlaceholder: "Referensi gaya rambut, kulit sensitif, atau preferensi lainnya…",
      step4BackBtn: "&larr; Ganti Jam",
      btnConfirmBooking: "Konfirmasi Kursi Saya &rarr;",

      // Confirmed Pass Screen
      passConfirmedBadge: "Terkonfirmasi • Greenwood Barbers",
      passMainTitle: "Kursi Anda Telah Terkonfirmasi.",
      passMainSubtitle: "Barber Anda siap menyambut Anda tepat waktu. Sampai jumpa di Greenwood.",
      passBrandSubtitle: "Tiket Reservasi Greenwood",
      passLabelGuest: "Tamu",
      passLabelWa: "WhatsApp",
      passLabelBarber: "Barber",
      passLabelDateTime: "Tanggal & Jam",
      passLabelService: "Layanan",
      passLabelTotal: "Total",
      passBtnWa: "Hubungi Kami di WhatsApp",
      passBtnMaps: "Buka di Google Maps",
      feedbackTitle: "Beri Ulasan Layanan • Rate Your Experience",
      feedbackSubtitle: "Bantu kami menyempurnakan ritual perawatan Anda di Greenwood Barbers.",
      feedbackPlaceholder: "Tuliskan ulasan atau preferensi Anda untuk kunjungan berikutnya...",
      feedbackSubmitBtn: "Kirim Ulasan &rarr;",
      feedbackSuccess: "✓ Terima kasih atas ulasan Anda! Catatan ini telah disimpan ke sistem CRM kami.",
      passBookAnother: "+ Reservasi Kursi Lain",
      passBackHome: "Kembali ke Beranda &rarr;",

      // Modal
      modalWhatIncluded: "Rincian Layanan",
      modalCloseBtn: "Tutup",

      // Interactive Alerts
      alertSelectPackage: "Silakan pilih layanan utama pangkas rambut terlebih dahulu.",
      alertSelectDate: "Silakan pilih tanggal kedatangan Anda.",
      alertSelectTime: "Silakan pilih jam sesi yang tersedia.",
      alertMissingFields: "Mohon lengkapi nama lengkap dan nomor WhatsApp aktif Anda.",
      alertInvalidPhone: "Nomor WhatsApp tidak valid. Mohon masukkan nomor aktif (contoh: 08123456789).",
      alertInvalidEmail: "Format email tidak valid. Mohon periksa kembali alamat email Anda.",
      alertSlotFull: "Mohon maaf, jam yang Anda pilih baru saja terisi penuh. Silakan pilih jam atau barber lain."
    },
    en: {
      // Document Metadata (Index)
      pageTitle: "Greenwood Barbers · Bandung’s First Gentlemen’s Retreat",
      metaDesc: "Precision haircuts, hot towel shaves, and beard trims by appointment in Kota Baru Parahyangan, Padalarang. No queue. Reserve your chair online.",

      // Navigation
      navHome: "Home",
      navAbout: "About Us",
      navContact: "Contact Us",
      navReserve: "RESERVE A CHAIR",
      
      // Index Hero
      heroBadge: "KOTA BARU PARAHYANGAN",
      heroTitle: "Bandung's First Gentlemen's Retreat",
      heroSubtitle: "The hour is yours. A quiet barbershop in the hills of West Bandung.",
      heroCtaBook: "RESERVE A CHAIR",
      
      // Index Section Headlines & Services
      menuEyebrow: "THE MENU",
      menuHeadline: "Our Services",
      menuSubtext: "Every visit starts with a conversation and a cold towel, and ends with a finish you’ll be glad to walk out in.",
      
      // Package 1: The Cut
      pkg1Title: "The Cut",
      pkg1Price: "IDR 240,000",
      pkg1Dur: "45 Mins",
      pkg1Desc: "Our flagship. We listen first at the mirror, then dedicate 45 minutes to craft the sharp, refined look you deserve.",
      
      // Package 2: The Cut & Shave / Trim
      pkg2Title: "The Cut & Shave / Trim",
      pkg2Price: "IDR 420,000",
      pkg2Dur: "75 Mins",
      pkg2Desc: "Our go-to package. The Cut followed by a hot towel shave or beard trim in the same chair, finished with a 15-minute relaxing back and shoulder massage.",
      
      // Package 3: The Ritual
      pkg3Title: "The Ritual",
      pkg3Price: "IDR 590,000",
      pkg3Dur: "95 Mins",
      pkg3Desc: "For the days that matter. Everything included: precision haircut, hot towel shave or beard trim, revitalising hair spa, cleansing facial mask, and an extended back & shoulder massage.",
      
      btnReserve: "RESERVE A CHAIR",
      
      // Values
      valueTitle1: "Clean you can see and smell",
      valueDesc1: "New razor blade for every guest. Steamed hot towels freshly laundered. All tools sanitized between chairs.",
      valueTitle2: "Unhurried appointments",
      valueDesc2: "We dedicate 45 to 95 minutes per session. Nothing is rushed; every cut begins with a thorough mirror consultation.",
      valueTitle3: "Free parking at the door",
      valueDesc3: "No circling or parking fees. Pull up directly in front of Ruko PancaTengah, 7 minutes from Whoosh Padalarang.",
      
      // Footer (All Pages)
      footerHours: "Open Wednesday–Monday, 10:00–20:00 WIB • Closed Tuesdays",
      footerTagline: "Bandung's First Gentlemen's Retreat • Kota Baru Parahyangan",
      footerCopyright: "© 2026 Greenwood Barbers. All rights reserved.",
      footerContactBtn: "Chat WhatsApp Concierge",

      // ======================================================================
      // ABOUT PAGE TRANSLATIONS (about.html)
      // ======================================================================
      aboutPageTitle: "Our Story · Greenwood Barbers Kota Baru Parahyangan",
      aboutMetaDesc: "A gentlemen’s retreat in Kota Baru Parahyangan, built for men who want to switch off, be looked after and feel like themselves again.",
      aboutBadge: "OUR STORY",
      aboutHeroTitle: "We built the barbershop we wanted to sit in.",
      aboutHeroSub: "Quiet, clean and in no hurry. A place to put your phone down for an hour and come out looking like yourself again.",
      aboutWhyTitle: "Why Greenwood",
      aboutWhyP1: "We opened Greenwood because we couldn’t find a barbershop in Bandung where we actually wanted to stay. Plenty of places will cut your hair. None of them made us want to come back before we needed to.",
      aboutQuote: "&ldquo;We don’t measure a good day by how many heads we cut. We measure it by how many men leave lighter than they came in.&rdquo;",
      aboutWhyP2: "So we built a gentlemen’s retreat in Kota Baru Parahyangan: a cold towel when you sit down, a real conversation, a hot towel and a massage at the end. Men don’t often take time for themselves. Here, you can. You’ll walk out feeling like yourself again.",
      aboutValuesEyebrow: "What We Hold To",
      aboutValuesTitle: "Three things we never compromise on",
      aboutVal1Title: "Time that belongs to you",
      aboutVal1Desc: "Every appointment is reserved for 30 to 95 minutes. Your barber is with you for all of it, and we never hurry the finish to catch the next guest.",
      aboutVal2Title: "Clean you can see and smell",
      aboutVal2Desc: "Fresh blades, sterilised tools and a spotless room. Hygiene is our job, so relaxing can be yours.",
      aboutVal3Title: "A room that lets you rest",
      aboutVal3Desc: "Cool air, soft light, low music and a comfortable chair. An espresso, tea or water while you settle in.",

      // ======================================================================
      // CONTACT PAGE TRANSLATIONS (contact.html)
      // ======================================================================
      contactPageTitle: "Contact Us · Greenwood Barbers Kota Baru Parahyangan",
      contactMetaDesc: "Ruko PancaTengah, Kota Baru Parahyangan. Message or call us any time we’re open. Wednesday to Monday, 10:00–20:00 WIB.",
      contactBadge: "VISIT · CALL · MESSAGE",
      contactHeroTitle: "Come and see us.",
      contactHeroSub: "We’re at Ruko PancaTengah, Kota Baru Parahyangan. Message or call us any time we’re open, and our dedicated staff will answer.",
      contactWaSub: "The fastest way to book, change or ask &rarr;",
      contactPhoneTitle: "Phone",
      contactPhoneSub: "Prefer to talk? Call the front desk &rarr;",
      contactEmailTitle: "Email",
      contactEmailSub: "Group bookings, gifts and everything else &rarr;",
      contactPanelHeading: "Where and when",
      contactAddressLabel: "Address",
      contactParkingNote: "Free parking right at the door.",
      contactHoursLabel: "Opening hours",
      contactDaysText: "<strong>Wednesday &ndash; Monday:</strong> 10:00 &ndash; 20:00 WIB",
      contactBadgeOpen: "Open",
      contactTuesdayText: "<strong>Tuesday:</strong> Our day to rest, clean and sharpen",
      contactBadgeClosed: "CLOSED",
      contactOpenMapsBtn: "Open in Google Maps &nearr;",

      // ======================================================================
      // BOOKING PAGE TRANSLATIONS (booking.html)
      // ======================================================================
      bookingPageTitle: "Reserve a Chair · Greenwood Barbers Kota Baru Parahyangan",
      bookingEyebrow: "KOTA BARU PARAHYANGAN",
      bookingTitle: "Reserve a Chair",
      bookingSubtitle: "Pick your service, your barber and your time. It takes about a minute, and your chair will be waiting.",

      // Stepper
      step1Label: "1. Service",
      step2Label: "2. Barber",
      step3Label: "3. Date & Time",
      step4Label: "4. Your Details",

      // Step 1: Select Ritual
      step1Title: "Choose your service",
      step1Badge: "Step 1 of 4",
      step1Sub: "Pick one. You can add a little more below.",
      step1UpgradeTitle: "Automatically Upgraded to The Ritual",
      step1UpgradeDesc: "You selected Cut & Shave plus Black Mask & Hair Spa. We’ve automatically bundled this into <strong>The Ritual</strong> package at <strong>Rp 590.000</strong> (saving you Rp 10.000 and 20 mins)!",
      addonsHeading: "Add a little more",
      step1NextBtn: "Next: choose your barber &rarr;",
      addonAlreadyIncluded: "✓ Already in your package",
      minsLabel: "Mins",

      // Step 2: Select Barber
      step2Title: "Pick your favourite barber",
      step2Badge: "Step 2 of 4",
      step2AnyBarberTitle: "First available barber",
      step2AnyBarberDesc: "We’ll match you with the best barber free at your time.",
      step2OrChoose: "Or choose your barber:",
      step2BackBtn: "&larr; Back",
      step2NextBtn: "Next: pick a time &rarr;",

      // Step 3: Date & Time
      step3Title: "When suits you?",
      step3Badge: "Step 3 of 4",
      step3ChooseDay: "Choose a day",
      step3ClosedTuesdays: "Closed on Tuesdays",
      step3Sub: "Book any day in the next two weeks.",
      step3AvailableTimes: "Available times",
      step3VisitDurationPrefix: "Your visit: ",
      step3Minutes: "minutes",
      step3SelectDateFirst: "Please select an appointment date above to view available time slots.",
      step3ClosedBadge: "Closed",
      step3ClosedTooltip: "Parlour Closed Every Tuesday",
      step3BackBtn: "&larr; Back",
      step3NextBtn: "Next: your details &rarr;",

      // Step 4: Guest Details & Summary
      step4Title: "Almost there",
      step4Badge: "Step 4 of 4",
      summaryEyebrow: "Your reservation",
      summaryLabelService: "Service:",
      summaryLabelBarber: "Barber:",
      summaryLabelDateTime: "Date & time:",
      summaryPickTimeNotice: "Pick a time in step 3",
      formNameLabel: "Full name *",
      formNamePlaceholder: "How should we greet you?",
      formPhoneLabel: "WhatsApp number *",
      formPhonePlaceholder: "e.g. 0812-xxxx-xxxx",
      formEmailLabel: "Email (optional)",
      formEmailPlaceholder: "For your calendar invite and reminders",
      formNotesLabel: "Anything we should know? (optional)",
      formNotesPlaceholder: "A style you like, a photo you’ll bring, sensitive skin…",
      step4BackBtn: "&larr; Change time",
      btnConfirmBooking: "Confirm my chair &rarr;",

      // Confirmed Pass Screen
      passConfirmedBadge: "Confirmed • Greenwood Barbers",
      passMainTitle: "Your chair is reserved.",
      passMainSubtitle: "Your barber will be ready for you. See you soon.",
      passBrandSubtitle: "Your Greenwood pass",
      passLabelGuest: "Guest",
      passLabelWa: "WhatsApp",
      passLabelBarber: "Barber",
      passLabelDateTime: "Date & time",
      passLabelService: "Service",
      passLabelTotal: "Total",
      passBtnWa: "WhatsApp Us",
      passBtnMaps: "Open in Maps",
      feedbackTitle: "Rate Your Experience • Beri Ulasan Layanan",
      feedbackSubtitle: "Help us refine your grooming ritual at Greenwood Barbers.",
      feedbackPlaceholder: "Leave a note or style preference for your next visit...",
      feedbackSubmitBtn: "Submit Review &rarr;",
      feedbackSuccess: "✓ Thank you for your feedback! This note has been saved to your guest profile.",
      passBookAnother: "+ Book another chair",
      passBackHome: "Back to home &rarr;",

      // Modal
      modalWhatIncluded: "What’s included",
      modalCloseBtn: "Close",

      // Interactive Alerts
      alertSelectPackage: "Please select a signature grooming ritual first.",
      alertSelectDate: "Please select your appointment date.",
      alertSelectTime: "Please select an available time slot.",
      alertMissingFields: "Please provide your full name and active WhatsApp number.",
      alertInvalidPhone: "Invalid WhatsApp number. Please enter an active phone number (e.g. 08123456789).",
      alertInvalidEmail: "Invalid email format. Please verify your email address.",
      alertSlotFull: "We apologize, the time slot you selected has just been fully reserved. Please select another time or barber."
    }
  };

  // 2. LANGUAGE CONTROLLER (Default: ALWAYS Bahasa Indonesia 'id' unless user explicitly selected 'en')
  function detectInitialLanguage() {
    try {
      var stored = localStorage.getItem('greenwood_lang_v5') || 
                   localStorage.getItem('greenwood_lang_v4') || 
                   localStorage.getItem('greenwood_lang_v3') || 
                   localStorage.getItem('greenwood_lang');
      if (stored === 'id' || stored === 'en') return stored;
    } catch(e) {}
    return 'id'; // Canonical default: Bahasa Indonesia
  }

  var currentLang = detectInitialLanguage();

  function applyLanguage(lang) {
    if (!translations[lang]) lang = 'id';
    currentLang = lang;
    try {
      localStorage.setItem('greenwood_lang_v5', lang);
      localStorage.setItem('greenwood_lang_v4', lang);
      localStorage.setItem('greenwood_lang_v3', lang);
      localStorage.setItem('greenwood_lang', lang);
    } catch (e) {}
    
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('translate', 'no'); // Prevent crude browser auto-translate collisions

    var dict = translations[lang];

    // Update Document Title
    var pathname = window.location.pathname;
    if (pathname.indexOf('booking.html') !== -1 && dict.bookingPageTitle) {
      document.title = dict.bookingPageTitle;
    } else if (pathname.indexOf('about.html') !== -1 && dict.aboutPageTitle) {
      document.title = dict.aboutPageTitle;
    } else if (pathname.indexOf('contact.html') !== -1 && dict.contactPageTitle) {
      document.title = dict.contactPageTitle;
    } else if (dict.pageTitle && document.title) {
      document.title = dict.pageTitle;
    }

    // Update Meta Description
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      if (pathname.indexOf('about.html') !== -1 && dict.aboutMetaDesc) {
        metaDesc.setAttribute('content', dict.aboutMetaDesc);
      } else if (pathname.indexOf('contact.html') !== -1 && dict.contactMetaDesc) {
        metaDesc.setAttribute('content', dict.contactMetaDesc);
      } else if (dict.metaDesc) {
        metaDesc.setAttribute('content', dict.metaDesc);
      }
    }

    // Update Language Toggle Active State
    var btns = document.querySelectorAll('.lang-btn');
    btns.forEach(function (btn) {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Nav Links Across All Pages
    var navLinks = document.querySelectorAll('nav.main-nav a, .mobile-nav-overlay a');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (href.indexOf('index.html') !== -1 || href === '/' || href === '') {
        link.textContent = dict.navHome;
      } else if (href.indexOf('about.html') !== -1 || href.indexOf('about') !== -1) {
        link.textContent = dict.navAbout;
      } else if (href.indexOf('contact.html') !== -1 || href.indexOf('contact') !== -1) {
        link.textContent = dict.navContact;
      } else if (href.indexOf('booking.html') !== -1 || href.indexOf('booking') !== -1) {
        if (!link.classList.contains('btn-primary')) {
          link.textContent = dict.navReserve;
        }
      }
    });

    // Update CTA Book buttons in header
    var headerBookBtns = document.querySelectorAll('.btn-header-book, .mobile-nav-overlay .btn-primary');
    headerBookBtns.forEach(function (btn) {
      btn.textContent = dict.navReserve;
    });

    // Update Elements with data-i18n attribute (plain text)
    var i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (key === 'heroCtaBook') {
          el.innerHTML = dict[key] + ' &rarr;';
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Update Elements with data-i18n-html attribute (HTML permitted)
    var i18nHtmlElements = document.querySelectorAll('[data-i18n-html]');
    i18nHtmlElements.forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update Elements with data-i18n-placeholder attribute
    var i18nPlaceholders = document.querySelectorAll('[data-i18n-placeholder]');
    i18nPlaceholders.forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Fallback for homepage elements if missing data-i18n
    var heroBadge = document.querySelector('.clean-hero-badge');
    if (heroBadge && !heroBadge.hasAttribute('data-i18n')) heroBadge.textContent = dict.heroBadge;

    var heroTitle = document.querySelector('.clean-hero-title');
    if (heroTitle && !heroTitle.hasAttribute('data-i18n')) heroTitle.textContent = dict.heroTitle;

    var heroSubtitle = document.querySelector('.clean-hero-subtitle');
    if (heroSubtitle && !heroSubtitle.hasAttribute('data-i18n')) heroSubtitle.textContent = dict.heroSubtitle;

    var heroCtaBook = document.querySelector('.clean-hero-actions .btn-primary, .clean-hero-actions .btn-clean-reserve');
    if (heroCtaBook && !heroCtaBook.hasAttribute('data-i18n')) {
      heroCtaBook.innerHTML = dict.heroCtaBook + " &rarr;";
    }

    var cardReserveBtns = document.querySelectorAll('.btn-card-reserve');
    cardReserveBtns.forEach(function (btn) {
      if (!btn.hasAttribute('data-i18n')) {
        btn.textContent = dict.btnReserve;
      }
    });

    // Dispatch Event for Page-specific listeners
    window.dispatchEvent(new CustomEvent('greenwood-language-changed', { detail: { lang: lang, dict: dict } }));
  }

  // 3. INJECT LANGUAGE SWITCHER (DESKTOP & MOBILE)
  function injectLanguageSwitcher() {
    var ctaGroups = document.querySelectorAll('.header-cta-group');
    ctaGroups.forEach(function (ctaGroup) {
      if (ctaGroup.querySelector('.lang-switch-wrap')) return;

      var switchWrap = document.createElement('div');
      switchWrap.className = 'lang-switch-wrap notranslate';
      switchWrap.setAttribute('translate', 'no');
      switchWrap.setAttribute('aria-label', 'Pilihan Bahasa / Language Selector');
      switchWrap.innerHTML = 
        '<button type="button" class="lang-btn ' + (currentLang === 'id' ? 'active' : '') + '" data-lang="id">ID</button>' +
        '<span class="lang-divider">|</span>' +
        '<button type="button" class="lang-btn ' + (currentLang === 'en' ? 'active' : '') + '" data-lang="en">EN</button>';

      ctaGroup.insertBefore(switchWrap, ctaGroup.firstChild);
    });

    // Also add to mobile nav overlay
    var mobileNav = document.getElementById('mobileNavOverlay');
    if (mobileNav && !mobileNav.querySelector('.lang-switch-mobile')) {
      var mobileSwitch = document.createElement('div');
      mobileSwitch.className = 'lang-switch-wrap lang-switch-mobile notranslate';
      mobileSwitch.setAttribute('translate', 'no');
      mobileSwitch.innerHTML = 
        '<span style="font-size:11px; letter-spacing:1.5px; color:var(--text-muted); text-transform:uppercase; margin-right:8px;">BAHASA:</span>' +
        '<button type="button" class="lang-btn ' + (currentLang === 'id' ? 'active' : '') + '" data-lang="id">ID</button>' +
        '<span class="lang-divider">|</span>' +
        '<button type="button" class="lang-btn ' + (currentLang === 'en' ? 'active' : '') + '" data-lang="en">EN</button>';
      
      mobileNav.insertBefore(mobileSwitch, mobileNav.firstChild.nextSibling);
    }

    // Attach click handlers to language buttons
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var targetLang = this.getAttribute('data-lang');
        applyLanguage(targetLang);
      });
    });
  }

  // 4. PUBLIC API
  window.GreenwoodI18n = {
    setLanguage: applyLanguage,
    getLanguage: function () { return currentLang; },
    getDictionary: function () { return translations[currentLang]; },
    t: function (key) {
      return (translations[currentLang] && translations[currentLang][key]) || key;
    }
  };

  // 5. INITIALIZE ON DOM READY
  function init() {
    injectLanguageSwitcher();
    applyLanguage(currentLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
