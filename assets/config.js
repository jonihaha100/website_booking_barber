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
    tagline: "Bandung’s First Gentlemen’s Retreat",
    location: "Ruko PancaTengah, Kota Baru Parahyangan",
    city: "Padalarang, West Bandung Regency 40553",
    fullAddress: "Ruko PancaTengah, Jl. Parahyangan No.87, Kota Baru Parahyangan, Padalarang 40553",
    whatsappNumber: "6281222302050", // International format without +
    whatsappDisplay: "+62 812-2230-2050",
    phoneDisplay: "+62 812-2230-2050",
    email: "admin@greenwood.id",
    adminEmail: "salretailventures@gmail.com",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=-6.871083,107.466639",
    mapsEmbedUrl: "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s-6.871083,107.466639!6i17!3m1!1sen!5m1!1sen",
    coordinates: {
      lat: -6.871083,
      lng: 107.466639,
      dms: "6°52'15.9\"S 107°27'59.9\"E"
    },
    parkingInfo: "7 minutes from Whoosh Padalarang and 5 minutes from the Padalarang toll exit. Free parking right in front of the door.",
    paymentNotice: "",
    cancellationNotice: "Kindly advise our concierge at least 3 hours prior if you need to reschedule.",
    googleCalendarWebhookUrl: "https://script.google.com/macros/s/AKfycbwcWUr-r7PIFXD3JRWnCJoQufIB5rZNyVfGgk5Pocz8l51_9tfusRYbo0tsGFrAU5Xa6g/exec"
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
      "10:00", "10:15", "10:30", "10:45",
      "11:00", "11:15", "11:30", "11:45",
      "12:00", "12:15", "12:30", "12:45",
      "13:00", "13:15", "13:30", "13:45",
      "14:00", "14:15", "14:30", "14:45",
      "15:00", "15:15", "15:30", "15:45",
      "16:00", "16:15", "16:30", "16:45",
      "17:00", "17:15", "17:30", "17:45",
      "18:00", "18:15", "18:30", "18:45",
      "19:00", "19:15"
    ],
    scheduleText: "Wednesday &ndash; Monday: 10:00 &ndash; 20:00 WIB &bull; Closed Tuesdays."
  },

  // 3. GROOMING SERVICES (SINGLE SELECTION)
  // Components: 'haircut', 'wash', 'styling', 'massage', 'shave', 'scalp', 'mask'
  packages: [
    {
      id: "pkg-cut",
      name: "The Cut",
      duration: 45,
      price: 240000,
      components: ["haircut", "wash", "styling"],
      badge: "",
      summary: "Our flagship. We listen first, then take 45 minutes to make you look as good as you deserve.",
      steps: [
        "A conversation at the mirror; nothing is cut until we agree",
        "Cold towel",
        "Shampoo, conditioner and scalp massage",
        "Your haircut, scissor and clipper",
        "Hairline outlined, neck shaved with a straight razor",
        "Ears, nose and brows",
        "Hot towel",
        "Neck and shoulder massage",
        "Styled, with a quick lesson for home"
      ]
    },
    {
      id: "pkg-shave-trim",
      name: "The Shave / Trim",
      duration: 30,
      price: 180000,
      components: ["shave"],
      badge: "",
      summary: "A straight-razor shave or a beard trim. Tell your barber at the mirror. Same time, same price.",
      steps: [
        "Shave: hot towel · pre-shave oil · brushed lather · first pass with the grain · second pass against it · cold towel · balm · ears, nose and brows · face massage.",
        "Trim: hot towel · trim and shape · lather · clean lines on the cheeks and neck · ears, nose and brows · oil and balm"
      ]
    },
    {
      id: "pkg-cut-shave-trim",
      name: "The Cut & Shave / Trim",
      duration: 75,
      price: 420000,
      components: ["haircut", "wash", "styling", "shave", "massage"],
      badge: "",
      summary: "Our go-to package. The Cut, then a hot towel shave or beard trim in the same chair, finished with a 15-minute back and shoulder massage.",
      steps: [
        "Everything in The Cut",
        "A hot towel shave or beard trim, your choice at the mirror",
        "A 15-minute back and shoulder massage",
        "Styled last, so you walk out fresh"
      ]
    },
    {
      id: "pkg-ritual",
      name: "The Ritual",
      duration: 95,
      price: 590000,
      components: ["haircut", "wash", "styling", "shave", "massage", "scalp", "mask"],
      badge: "",
      summary: "For the days that matter. Everything included: the cut, a hot towel shave or beard trim, a hair spa and a black mask, finished with a back and shoulder massage.",
      steps: [
        "Everything in The Cut",
        "A hot towel shave or beard trim",
        "Hair spa",
        "Black mask",
        "Back and shoulder massage",
        "Styled last, so you walk out fresh"
      ]
    }
  ],

  // 4. A LA CARTE GROOMING ADD-ONS
  // Can only be selected if the component is NOT already included in the selected package
  addons: [
    {
      id: "addon-massage",
      name: "Back & Shoulder Massage",
      duration: 15,
      price: 60000,
      component: "massage",
      summary: "Shoulders, then upper back, then a hot towel across the neck."
    },
    {
      id: "addon-mask",
      name: "Black Mask",
      duration: 20,
      price: 90000,
      component: "mask",
      summary: "A cleansing peel-off mask that dries while we massage your neck and shoulders, finished with a cold towel."
    },
    {
      id: "addon-spa",
      name: "Hair Spa",
      duration: 20,
      price: 90000,
      component: "scalp",
      summary: "A hair mask worked in, a scalp massage, then warm steam and a rinse."
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

  // Alias for backward compatibility with estate-records
  updateStatus: function(bookingCode, status) {
    return this.updateBookingStatus(bookingCode, status);
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

  // Get dynamic slot list for duration (following client feedback: interval 15 menit dari buka sampai tutup)
  // Ensures last slot allows completion before 20:00 (e.g. 45 min cut -> last slot 19:15, 95 min ritual -> last slot 18:25)
  getSlotsForDuration: function(totalDurationMinutes) {
    const openH = GREENWOOD_CONFIG.hours.openHour; // 10
    const closeH = GREENWOOD_CONFIG.hours.closeHour; // 20
    const startMins = openH * 60; // 600
    const endMins = closeH * 60; // 1200
    const maxStartMins = endMins - totalDurationMinutes;

    const pad = (n) => String(n).padStart(2, '0');
    const toTimeStr = (m) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

    let slots = [];
    const step = 15; // Feedback Client: setiap 15 menit dari jam buka sampai jam tutup

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
