/**
 * GREENWOOD BARBERS — MASTER CONFIGURATION & DATA STORE
 * Kota Baru Parahyangan, Padalarang, Bandung Barat
 * Terpusat untuk jam operasional, kontak, paket layanan, barber, dan sistem booking.
 */

const GREENWOOD_CONFIG = {
  // 1. INFORMASI TOKO & KONTAK RESMI
  brand: {
    name: "Greenwood Barbers",
    tagline: "The Gentlemen's Grooming Sanctuary",
    location: "Ruko PancaTengah, Kota Baru Parahyangan",
    city: "Padalarang, Kabupaten Bandung Barat 40553",
    fullAddress: "Ruko PancaTengah Blok B No. 08, Kota Baru Parahyangan, Padalarang, Bandung Barat 40553",
    whatsappNumber: "6282123456789", // Format internasional tanpa tanda +
    whatsappDisplay: "+62 821-2345-6789",
    phoneDisplay: "+62 821-2345-6789",
    email: "contact@greenwoodbarbers.com",
    mapsUrl: "https://maps.google.com/?q=Kota+Baru+Parahyangan+Padalarang",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15844.629559384877!2d107.47250644498305!3d-6.871758509012351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e37bb033481b%3A0xe54fb9e2c6501a35!2sKota%20Baru%20Parahyangan!5e0!3m2!1sid!2sid!4v1729240000000!5m2!1sid!2sid",
    parkingInfo: "7 menit dari Stasiun Kereta Cepat Whoosh Padalarang & Gerbang Tol Padalarang. Parkir mobil & motor luas dan aman tepat di depan toko.",
    paymentNotice: "Pembayaran di tempat: QRIS, debit, dan kartu kredit.",
    cancellationNotice: "Mohon kabari kami minimal 3 jam sebelumnya jika berhalangan."
  },

  // 2. JAM OPERASIONAL (10 Jam per hari, SELASA TUTUP)
  hours: {
    openTime: "10:00",
    closeTime: "20:00",
    openHour: 10,
    closeHour: 20,
    closedDays: [2], // 0: Minggu, 1: Senin, 2: Selasa (TUTUP), 3: Rabu, 4: Kamis, 5: Jumat, 6: Sabtu
    closedDayName: "Selasa",
    dailySlots: [
      "10:00", "10:45", "11:30", "12:15", "13:00", 
      "13:45", "14:30", "15:15", "16:00", "16:45", 
      "17:30", "18:15", "19:00"
    ],
    scheduleText: "Rabu &ndash; Senin: 10:00 &ndash; 20:00 WIB &bull; Selasa: TUTUP"
  },

  // 3. DAFTAR PAKET UTAMA (PILIHAN TUNGGAL / RADIO BUTTON)
  // Komponen dasar: 'haircut', 'wash', 'styling', 'massage', 'shave', 'scalp', 'coloring'
  packages: [
    {
      id: "pkg-classic",
      name: "Classic Haircut & Styling",
      duration: 45,
      price: 110000,
      components: ["haircut", "wash", "styling"],
      badge: "Layanan Dasar",
      summary: "Konsultasi gaya rambut, cuci rambut relaksasi, gunting presisi, dan styling profesional.",
      steps: [
        "Konsultasi bentuk wajah dan arah pertumbuhan rambut.",
        "Cuci rambut dengan sampo herbal yang menyegarkan.",
        "Pemotongan rambut presisi dengan teknik scissor & clipper.",
        "Pembersihan garis rambut leher dan cambang.",
        "Pengeringan dan penataan rambut (styling pomade/matte paste)."
      ]
    },
    {
      id: "pkg-signature",
      name: "Paket Signature Grooming",
      duration: 60,
      price: 150000,
      components: ["haircut", "wash", "styling", "massage"],
      badge: "Paling Populer",
      summary: "Haircut lengkap ditambah pijat kepala & leher relaksasi serta kompres handuk hangat aromaterapi.",
      steps: [
        "Semua langkah Classic Haircut & Styling lengkap.",
        "Kompres handuk hangat aromaterapi lavender untuk membuka pori dan relaksasi.",
        "Pijat relaksasi kepala, tengkuk, dan bahu untuk meredakan ketegangan.",
        "Aplikasi hair tonic rosemary untuk menyegarkan kulit kepala.",
        "Finishing styling dengan produk pilihan."
      ]
    },
    {
      id: "pkg-executive",
      name: "Paket Executive Complete",
      duration: 75,
      price: 210000,
      components: ["haircut", "wash", "styling", "massage", "shave"],
      badge: "Rekomendasi Utama",
      summary: "Haircut, kompres handuk hangat, traditional hot towel shave / beard trim, dan pijat relaksasi.",
      steps: [
        "Konsultasi lengkap rambut dan bentuk janggut/kumis.",
        "Gunting rambut presisi dan cuci rambut relaksasi.",
        "Pre-shave oil dan busa cukur hangat dengan kuas silvertip.",
        "Traditional hot towel wet shave dengan pisau cukur satu kali pakai.",
        "Pijat kepala, tengkuk, dan bahu yang menenangkan.",
        "Cold towel penutup pori, aftershave balm, dan styling rambut."
      ]
    },
    {
      id: "pkg-royal",
      name: "Paket Royal Treatment",
      duration: 90,
      price: 270000,
      components: ["haircut", "wash", "styling", "massage", "shave", "scalp"],
      badge: "Perawatan Menyeluruh",
      summary: "Perawatan total: Haircut, hot towel shave, pembersihan mendalam kulit kepala (scalp detox), dan pijat relaksasi.",
      steps: [
        "Pemeriksaan menyeluruh kulit kepala dan pola rambut.",
        "Perawatan scalp detox untuk membersihkan ketombe dan sisa minyak berlebih.",
        "Haircut presisi disesuaikan dengan kontur wajah.",
        "Traditional wet shave dengan handuk hangat aromaterapi.",
        "Pijat relaksasi menyeluruh (kepala, leher, dan bahu).",
        "Tonic nutrisi folikel, kompres dingin penutup, dan styling akhir."
      ]
    }
  ],

  // 4. DAFTAR ADD-ON (Hanya bisa dipilih jika komponennya BELUM ada di paket yang dipilih)
  addons: [
    {
      id: "addon-shave",
      name: "Traditional Hot Towel Shave",
      duration: 30,
      price: 70000,
      component: "shave",
      summary: "Cukur janggut/kumis rapi dengan handuk hangat, busa lembut, dan aftershave balm."
    },
    {
      id: "addon-massage",
      name: "Extra Head & Shoulder Massage",
      duration: 20,
      price: 45000,
      component: "massage",
      summary: "Pijat tambahan area kepala, tengkuk, dan bahu untuk melepas lelah."
    },
    {
      id: "addon-scalp",
      name: "Scalp Treatment & Detox",
      duration: 25,
      price: 65000,
      component: "scalp",
      summary: "Eksfoliasi dan pembersihan kulit kepala dari minyak berlebih serta ketombe."
    },
    {
      id: "addon-color",
      name: "Natural Hair Grey Blending",
      duration: 35,
      price: 90000,
      component: "coloring",
      summary: "Pewarnaan natural hitam/cokelat gelap untuk menyamarkan uban dengan rapi."
    }
  ],

  // 5. DAFTAR BARBER
  barbers: [
    {
      id: "any",
      name: "Any Available Barber",
      role: "Barber Pertama yang Tersedia",
      badge: "Rekomendasi • Waktu Paling Fleksibel",
      avatarUrl: "assets/greenwood_monogram_cropped.png"
    },
    {
      id: "bramantyo",
      name: "Bramantyo",
      role: "Senior Barber",
      badge: "Klasik & Scissor Work",
      avatarUrl: "assets/barber_bramantyo.jpg"
    },
    {
      id: "rian",
      name: "Rian Pratama",
      role: "Senior Barber",
      badge: "Precision Fade & Taper",
      avatarUrl: "assets/barber_rian.jpg"
    },
    {
      id: "dimas",
      name: "Dimas Setiawan",
      role: "Senior Barber",
      badge: "Traditional Wet Shave",
      avatarUrl: "assets/barber_dimas.jpg"
    },
    {
      id: "farhan",
      name: "Farhan Akbar",
      role: "Barber",
      badge: "Modern Texture & Styling",
      avatarUrl: "assets/barber_farhan.jpg"
    },
    {
      id: "aldi",
      name: "Aldi Maulana",
      role: "Barber",
      badge: "Beard Sculpting & Beard Care",
      avatarUrl: "assets/barber_aldi.jpg"
    }
  ]
};

// =============================================================================
// STORAGE & DOUBLE-BOOKING PREVENTION ENGINE
// =============================================================================
const GreenwoodBookingStore = {
  STORAGE_KEY: "greenwood_confirmed_bookings_v2",

  _memoryBookings: null,

  // Ambil semua booking yang tersimpan
  getBookings: function() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) {
          return JSON.parse(data);
        }
      } else if (this._memoryBookings) {
        return this._memoryBookings;
      }
    } catch (e) {
      console.warn("Error reading bookings from localStorage:", e);
    }
    // Seed data awal yang realistis agar toko terasa aktif dan teruji
    const seed = this.getSeedBookings();
    this.saveBookings(seed);
    return seed;
  },

  // Simpan array booking
  saveBookings: function(bookings) {
    this._memoryBookings = bookings;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
      }
    } catch (e) {
      console.warn("Error saving bookings to localStorage:", e);
    }
  },

  // Tambahkan booking baru
  addBooking: function(bookingData) {
    const list = this.getBookings();
    list.push(bookingData);
    this.saveBookings(list);
    return bookingData;
  },

  // Generate kode booking unik & realistis: GWB-YYMMDD-XXXX
  generateBookingCode: function(dateStr) {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    return `GWB-${yy}${mm}${dd}-${randomHex}`;
  },

  // Cek apakah slot waktu tertentu pada tanggal & barber tertentu tersedia
  // Mengakomodasi durasi layanan total!
  isSlotAvailable: function(dateKey, timeSlotStr, totalDurationMinutes, barberId) {
    // 1. Cek jam tutup toko (20:00). Jika waktu mulai + durasi melebihi 20:00, tidak boleh
    const [startH, startM] = timeSlotStr.split(':').map(Number);
    const startMinutesFromMidnight = startH * 60 + startM;
    const endMinutesFromMidnight = startMinutesFromMidnight + totalDurationMinutes;
    const closingMinutes = GREENWOOD_CONFIG.hours.closeHour * 60; // 20:00 = 1200 mins

    if (endMinutesFromMidnight > closingMinutes) {
      return false; // Melebihi jam operasional toko
    }

    const bookings = this.getBookings();
    const activeBarbers = GREENWOOD_CONFIG.barbers.filter(b => b.id !== 'any').map(b => b.id);

    // Ambil semua booking di tanggal tersebut
    const dayBookings = bookings.filter(b => b.dateKey === dateKey);

    if (barberId && barberId !== 'any') {
      // Untuk barber spesifik: Cek bentrok waktu dengan booking lain yang melibatkan barber ini
      for (const b of dayBookings) {
        if (b.barberId === barberId || b.assignedBarberId === barberId) {
          const [bStartH, bStartM] = b.timeSlot.split(':').map(Number);
          const bStart = bStartH * 60 + bStartM;
          const bEnd = bStart + (b.totalDuration || 45);

          // Bentrok jika interval waktu tumpang tindih
          if (startMinutesFromMidnight < bEnd && endMinutesFromMidnight > bStart) {
            return false;
          }
        }
      }
      return true;
    } else {
      // Untuk "Any Available Barber": Cek apakah setidaknya ADA SATU barber dari 5 barber yang bebas
      // pada seluruh rentang durasi ini
      let availableBarberCount = 0;
      for (const bId of activeBarbers) {
        let isBarberFree = true;
        for (const b of dayBookings) {
          if (b.barberId === bId || b.assignedBarberId === bId) {
            const [bStartH, bStartM] = b.timeSlot.split(':').map(Number);
            const bStart = bStartH * 60 + bStartM;
            const bEnd = bStart + (b.totalDuration || 45);
            if (startMinutesFromMidnight < bEnd && endMinutesFromMidnight > bStart) {
              isBarberFree = false;
              break;
            }
          }
        }
        if (isBarberFree) {
          availableBarberCount++;
        }
      }
      return availableBarberCount > 0;
    }
  },

  // Seed awal untuk demonstrasi slot real
  getSeedBookings: function() {
    const today = new Date();
    const formatDateKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    // Contoh: Besok jam 11:30 dan 15:15 ada booking
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dateKeyTomorrow = formatDateKey(tomorrow);

    return [
      {
        bookingCode: "GWB-261019-1284",
        guestName: "Hartono Kusumo",
        guestPhone: "081289123456",
        dateKey: dateKeyTomorrow,
        timeSlot: "11:30",
        totalDuration: 60,
        barberId: "bramantyo",
        assignedBarberId: "bramantyo",
        packageName: "Paket Signature Grooming",
        totalPrice: 150000,
        timestamp: Date.now() - 3600000
      },
      {
        bookingCode: "GWB-261019-5521",
        guestName: "Adrian Wicaksono",
        guestPhone: "081377889900",
        dateKey: dateKeyTomorrow,
        timeSlot: "15:15",
        totalDuration: 75,
        barberId: "dimas",
        assignedBarberId: "dimas",
        packageName: "Paket Executive Complete",
        totalPrice: 210000,
        timestamp: Date.now() - 7200000
      }
    ];
  }
};

// Export ke global window dan module.exports agar dapat diakses di mana pun
if (typeof window !== 'undefined') {
  window.GREENWOOD_CONFIG = GREENWOOD_CONFIG;
  window.GreenwoodBookingStore = GreenwoodBookingStore;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GREENWOOD_CONFIG, GreenwoodBookingStore };
}
