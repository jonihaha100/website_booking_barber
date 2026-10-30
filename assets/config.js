/**
 * GREENWOOD BARBERS — MASTER CONFIGURATION & DATA STORE
 * Kota Baru Parahyangan, Padalarang, West Bandung
 * Centralized business hours, contacts, grooming packages, master barbers, and booking engine.
 * Rev 7 Menu & Copywriting (28 October 2026)
 */

const GREENWOOD_CONFIG = {
  // 1. BRAND INFORMATION & OFFICIAL CONTACTS
  brand: {
    name: "Greenwood Barbers",
    tagline: "Bandung’s First Gentleman’s Retreat",
    location: "Ruko PancaTengah, Kota Baru Parahyangan",
    city: "Padalarang, West Bandung Regency 40553",
    fullAddress: "Ruko PancaTengah, Jl. Parahyangan No.87, Kota Baru Parahyangan, Padalarang 40553",
    whatsappNumber: "6281222302050", // International format without +
    whatsappDisplay: "+62 812-2230-2050",
    phoneDisplay: "+62 812-2230-2050",
    email: "contact@greenwoodbarbers.com",
    adminEmail: "admin@greenwood.id",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ruko+PancaTengah,+Kota+Baru+Parahyangan",
    mapsEmbedUrl: "https://maps.google.com/maps?q=-6.871273,107.466664&hl=en&z=17&output=embed",
    parkingInfo: "7 minutes from Whoosh Padalarang and 5 minutes from the Padalarang toll exit. Free parking right in front of the door.",
    paymentNotice: "",
    cancellationNotice: "Kindly advise our concierge at least 3 hours prior if you need to reschedule.",
    googleCalendarWebhookUrl: "https://script.google.com/macros/s/AKfycbwect-bFAQWQsuXbxhCGUEhUXlcs8dBnIKeKz0DsXY0bfLziMQSfV9_NJPIH58fvwH5pw/exec"
  },

  // 2. OPERATING HOURS (10 Hours Daily • TUESDAY CLOSED)
  hours: {
    openTime: "10:00",
    closeTime: "20:00",
    openHour: 10,
    closeHour: 20,
    closedDays: [2], // 0: Sun, 1: Mon, 2: Tue (CLOSED), 3: Wed, 4: Thu, 5: Fri, 6: Sat
    closedDayName: "Tuesday",
    dailySlots: [
      "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
      "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
      "16:00", "16:30", "17:00", "17:30", "18:00", "18:25",
      "18:45", "19:00", "19:15", "19:30"
    ],
    scheduleText: "Wednesday &ndash; Monday: 10:00 &ndash; 20:00 WIB &bull; Closed Tuesdays."
  },

  // 3. REV 7 GROOMING SERVICES (SINGLE SELECTION)
  // Components: 'haircut', 'wash', 'styling', 'massage', 'shave', 'scalp', 'mask'
  packages: [
    {
      id: "pkg-cut",
      name: "The Cut",
      duration: 45,
      price: 240000,
      components: ["haircut", "wash", "styling"],
      badge: "The Flagship",
      summary: "A conversation, a proper wash, the cut, a straight-razor neckline, a hot towel and styling.",
      steps: [
        "A conversation at the mirror; nothing is cut until we agree",
        "Cold towel",
        "Shampoo, conditioner and scalp massage",
        "Your haircut, scissor and clipper",
        "Hairline outlined, neck shaved with a straight razor",
        "Ears, nose and brows",
        "Hot towel",
        "Neck and shoulder massage",
        "Styled, with a quick lesson for home",
        "Your cut saved on your guest card"
      ]
    },
    {
      id: "pkg-shave-trim",
      name: "The Shave / Trim",
      duration: 30,
      price: 180000,
      components: ["shave"],
      badge: "Your Choice",
      summary: "A straight-razor shave or a beard trim. Tell your barber at the mirror. Same time, same price.",
      steps: [
        "Shave: hot towel · pre-shave oil · brushed lather · first pass with the grain · second pass against it · cold towel · balm · ears, nose and brows · face massage.",
        "Trim: hot towel · trim and shape · lather · straight-razor lines on the cheeks and neck · ears, nose and brows · oil and balm"
      ]
    },
    {
      id: "pkg-cut-shave-trim",
      name: "The Cut & Shave / Trim",
      duration: 75,
      price: 420000,
      components: ["haircut", "wash", "styling", "shave", "massage"],
      badge: "The Reset",
      summary: "The Cut, then a shave or trim in the same chair, with a ten-minute back and shoulder massage.",
      steps: [
        "Everything in The Cut",
        "A shave or beard trim, your choice at the mirror",
        "A 10-minute back and shoulder massage",
        "Styled last, so you walk out fresh"
      ]
    },
    {
      id: "pkg-ritual",
      name: "The Ritual",
      duration: 95,
      price: 590000,
      components: ["haircut", "wash", "styling", "shave", "massage", "scalp", "mask"],
      badge: "Everything We Do",
      summary: "The cut, a shave or trim, a steamed hair spa, and a black mask while we work on your back and shoulders.",
      steps: [
        "Everything in The Cut",
        "A shave or beard trim",
        "Hair spa during the wash",
        "Black mask, with a back and shoulder massage while it dries",
        "Styled last"
      ]
    }
  ],

  // 4. REV 7 A LA CARTE GROOMING ADD-ONS
  // Can only be selected if the component is NOT already included in the selected package
  addons: [
    {
      id: "addon-massage",
      name: "Back & Shoulder Massage",
      duration: 15,
      price: 60000,
      component: "massage",
      summary: "Shoulders, then upper back, then a hot towel across the neck. Fifteen minutes for the weight you carry all week."
    },
    {
      id: "addon-mask",
      name: "Black Mask",
      duration: 20,
      price: 90000,
      component: "mask",
      summary: "A cleansing mask that dries while we massage your neck and shoulders, finished with a cold towel. Your face feels clean and fresh."
    },
    {
      id: "addon-spa",
      name: "Hair Spa",
      duration: 20,
      price: 90000,
      component: "scalp",
      summary: "A hair mask worked in, a scalp massage, then ten minutes of warm steam."
    }
  ],

  // 5. BARBERS ROSTER (Rev 7 Voice)
  barbers: [
    {
      id: "any",
      name: "First available barber",
      role: "First Available Senior Barber",
      badge: "We’ll match you with the best barber free at your time.",
      avatarUrl: "assets/greenwood_monogram_cropped.png"
    },
    {
      id: "bramantyo",
      name: "Bramantyo",
      role: "Senior Barber",
      badge: "Classic scissor cuts",
      avatarUrl: "assets/barber_bramantyo.jpg"
    },
    {
      id: "rian",
      name: "Rian Pratama",
      role: "Senior Barber",
      badge: "Fades and tapers",
      avatarUrl: "assets/barber_rian.jpg"
    },
    {
      id: "dimas",
      name: "Dimas Setiawan",
      role: "Senior Barber",
      badge: "Hot-towel shaves",
      avatarUrl: "assets/barber_dimas.jpg"
    },
    {
      id: "farhan",
      name: "Farhan Akbar",
      role: "Barber",
      badge: "Texture and styling",
      avatarUrl: "assets/barber_farhan.jpg"
    },
    {
      id: "aldi",
      name: "Aldi Maulana",
      role: "Barber",
      badge: "Beard shaping and clean lines",
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

  // Retrieve all stored bookings
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
    // Seed initial appointments so schedule availability is authentic
    const seed = this.getSeedBookings();
    this.saveBookings(seed);
    return seed;
  },

  // Save bookings array
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

  // Add new confirmed booking
  addBooking: function(bookingData) {
    const list = this.getBookings();
    list.push(bookingData);
    this.saveBookings(list);
    return true;
  },

  // Update booking status
  updateBookingStatus: function(bookingCode, status) {
    const list = this.getBookings();
    const item = list.find(b => b.bookingCode === bookingCode);
    if (item) {
      item.status = status;
      this.saveBookings(list);
      return true;
    }
    return false;
  },

  // Delete booking by code
  deleteBooking: function(bookingCode) {
    let list = this.getBookings();
    const initialLen = list.length;
    list = list.filter(b => b.bookingCode !== bookingCode);
    this.saveBookings(list);
    return list.length < initialLen;
  },

  // Clear all bookings
  clearAllBookings: function() {
    this.saveBookings([]);
  },

  // Generate realistic official booking code: GWB-YYMMDD-XXXX
  generateBookingCode: function(dateStr) {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    return `GWB-${yy}${mm}${dd}-${randomHex}`;
  },

  // Get dynamic slot list for duration (following real service length)
  // Ensures last slot allows completion before 20:00 (e.g. 95 min ritual -> last slot 18:25)
  getSlotsForDuration: function(totalDurationMinutes) {
    const openH = GREENWOOD_CONFIG.hours.openHour; // 10
    const closeH = GREENWOOD_CONFIG.hours.closeHour; // 20
    const startMins = openH * 60; // 600
    const endMins = closeH * 60; // 1200
    const maxStartMins = endMins - totalDurationMinutes;

    const pad = (n) => String(n).padStart(2, '0');
    const toTimeStr = (m) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

    let slots = [];
    
    // Determine natural interval based on duration
    let step = 30;
    if (totalDurationMinutes === 45) {
      step = 45;
    } else if (totalDurationMinutes === 30) {
      step = 30;
    } else if (totalDurationMinutes === 75) {
      step = 75;
    } else if (totalDurationMinutes === 95) {
      step = 95;
    }

    let cur = startMins;
    while (cur <= maxStartMins) {
      slots.push(toTimeStr(cur));
      cur += step;
    }

    // Always include the maximum latest start time if not already present
    // For 95 min Ritual: 1200 - 95 = 1105 min (18:25 WIB)
    const latestSlotStr = toTimeStr(maxStartMins);
    if (!slots.includes(latestSlotStr) && maxStartMins >= startMins) {
      slots.push(latestSlotStr);
      // Sort chronologically
      slots.sort((a, b) => {
        const [ah, am] = a.split(':').map(Number);
        const [bh, bm] = b.split(':').map(Number);
        return (ah * 60 + am) - (bh * 60 + bm);
      });
    }

    return slots;
  },

  // Verify availability for date, time slot, duration, and barber
  isSlotAvailable: function(dateKey, timeSlotStr, totalDurationMinutes, barberId) {
    // 1. Check closing time (20:00). If start + duration exceeds 20:00, slot is unavailable
    const [startH, startM] = timeSlotStr.split(':').map(Number);
    const startMinutesFromMidnight = startH * 60 + startM;
    const endMinutesFromMidnight = startMinutesFromMidnight + totalDurationMinutes;
    const closingMinutes = GREENWOOD_CONFIG.hours.closeHour * 60; // 20:00 = 1200 mins

    if (endMinutesFromMidnight > closingMinutes) {
      return false; // Exceeds parlour closing time
    }

    const bookings = this.getBookings();
    const activeBarbers = GREENWOOD_CONFIG.barbers.filter(b => b.id !== 'any').map(b => b.id);

    // Bookings on target date
    const dayBookings = bookings.filter(b => b.dateKey === dateKey);

    if (barberId && barberId !== 'any') {
      // Specific barber: Check for overlapping bookings
      for (const b of dayBookings) {
        if (b.barberId === barberId || b.assignedBarberId === barberId) {
          const [bStartH, bStartM] = b.timeSlot.split(':').map(Number);
          const bStart = bStartH * 60 + bStartM;
          const bEnd = bStart + (b.totalDuration || 45);

          // Conflict if time intervals overlap
          if (startMinutesFromMidnight < bEnd && endMinutesFromMidnight > bStart) {
            return false;
          }
        }
      }
      return true;
    } else {
      // "First available barber": Check if AT LEAST ONE barber is free across the entire duration
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

  // Seed sample appointments
  getSeedBookings: function() {
    const today = new Date();
    const formatDateKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dateKeyTomorrow = formatDateKey(tomorrow);

    return [
      {
        bookingCode: "GWB-261028-1284",
        guestName: "Hartono Kusumo",
        guestPhone: "081289123456",
        dateKey: dateKeyTomorrow,
        timeSlot: "11:30",
        totalDuration: 45,
        barberId: "bramantyo",
        assignedBarberId: "bramantyo",
        packageName: "The Cut",
        totalPrice: 240000,
        timestamp: Date.now() - 3600000
      },
      {
        bookingCode: "GWB-261028-5521",
        guestName: "Adrian Wicaksono",
        guestPhone: "081377889900",
        dateKey: dateKeyTomorrow,
        timeSlot: "15:00",
        totalDuration: 75,
        barberId: "dimas",
        assignedBarberId: "dimas",
        packageName: "The Cut & Shave / Trim",
        totalPrice: 420000,
        timestamp: Date.now() - 7200000
      }
    ];
  }
};

// Export to global window and module.exports
if (typeof window !== 'undefined') {
  window.GREENWOOD_CONFIG = GREENWOOD_CONFIG;
  window.GreenwoodBookingStore = GreenwoodBookingStore;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GREENWOOD_CONFIG, GreenwoodBookingStore };
}
