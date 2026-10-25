/**
 * GREENWOOD BARBERS — MASTER CONFIGURATION & DATA STORE
 * Kota Baru Parahyangan, Padalarang, West Bandung
 * Centralized business hours, contacts, grooming packages, master barbers, and booking engine.
 */

const GREENWOOD_CONFIG = {
  // 1. BRAND INFORMATION & OFFICIAL CONTACTS
  brand: {
    name: "Greenwood Barbers",
    tagline: "The Gentlemen's Grooming Sanctuary",
    location: "Ruko PancaTengah, Kota Baru Parahyangan",
    city: "Padalarang, West Bandung Regency 40553",
    fullAddress: "Ruko PancaTengah Blok B No. 08, Kota Baru Parahyangan, Padalarang, West Bandung 40553",
    whatsappNumber: "6281222302050", // International format without +
    whatsappDisplay: "+62 812-2230-2050",
    phoneDisplay: "+62 812-2230-2050",
    email: "contact@greenwoodbarbers.com",
    mapsUrl: "https://maps.google.com/?q=Kota+Baru+Parahyangan+Padalarang",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15844.629559384877!2d107.47250644498305!3d-6.871758509012351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e37bb033481b%3A0xe54fb9e2c6501a35!2sKota%20Baru%20Parahyangan!5e0!3m2!1sid!2sid!4v1729240000000!5m2!1sid!2sid",
    parkingInfo: "7 minutes from Whoosh High-Speed Rail Padalarang Station & Padalarang Toll Gate. Ample complimentary private parking right in front of the parlour.",
    paymentNotice: "",
    cancellationNotice: "Kindly advise our concierge at least 3 hours prior if you need to reschedule.",
    googleCalendarWebhookUrl: "https://script.google.com/macros/s/AKfycbz0dE6c_Tj5sHcwc4oEHRZwur3BMmE8XNDkmpV37XISEQ6Sdyco08AhSs9cgbWtyH0tzg/exec"
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
      "10:00", "10:45", "11:30", "12:15", "13:00", 
      "13:45", "14:30", "15:15", "16:00", "16:45", 
      "17:30", "18:15", "19:00"
    ],
    scheduleText: "Wednesday &ndash; Monday: 10:00 &ndash; 20:00 WIB &bull; Tuesday: CLOSED"
  },

  // 3. CURATED SIGNATURE RITUALS (SINGLE SELECTION)
  // Base components: 'haircut', 'wash', 'styling', 'massage', 'shave', 'scalp', 'coloring'
  packages: [
    {
      id: "pkg-classic",
      name: "Classic Haircut & Styling",
      duration: 45,
      price: 110000,
      components: ["haircut", "wash", "styling"],
      badge: "Essential Ritual",
      summary: "Bespoke cranial consultation, botanical hair wash, precision shear & clipper cut, razor detailing, and executive finish.",
      steps: [
        "Consultation on cranial anatomy and natural growth patterns.",
        "Botanical scalp wash with invigorating herbal extracts.",
        "Precision scissor and clipper craftsmanship tailored to facial contours.",
        "Straight-razor detailing of the neckline and sideburn perimeters.",
        "Blow-dry styling with artisan matte paste or natural pomade."
      ]
    },
    {
      id: "pkg-signature",
      name: "The Signature Grooming Ritual",
      duration: 60,
      price: 150000,
      components: ["haircut", "wash", "styling", "massage"],
      badge: "Most Popular",
      summary: "Complete Classic Cut paired with therapeutic head & neck acupressure and aromatherapy lavender hot-linen wrap.",
      steps: [
        "Complete Classic Haircut & Styling ritual.",
        "Ceremonial lavender aromatherapy hot-linen compress to open pores and induce tranquility.",
        "Restorative head, neck, and shoulder acupressure massage.",
        "Invigorating rosemary follicle stimulation tonic.",
        "Executive styling finish with premium grooming pomade."
      ]
    },
    {
      id: "pkg-executive",
      name: "The Executive Complete Ritual",
      duration: 75,
      price: 210000,
      components: ["haircut", "wash", "styling", "massage", "shave"],
      badge: "Curated Recommendation",
      summary: "Bespoke Haircut, hot-towel straight-razor shave or beard contouring, and neck relaxation therapy.",
      steps: [
        "Comprehensive consultation on cranial silhouette and beard contouring.",
        "Precision haircut ritual and restorative hair wash.",
        "Pre-shave botanical oils and warm lather whipped with silvertip brush.",
        "Traditional hot-linen straight-razor wet shave with surgical carbon steel.",
        "Soothing cervical and temple acupressure massage.",
        "Pore-tightening cold towel wrap, post-shave balm, and executive styling."
      ]
    },
    {
      id: "pkg-royal",
      name: "The Royal Treatment Immersion",
      duration: 90,
      price: 270000,
      components: ["haircut", "wash", "styling", "massage", "shave", "scalp"],
      badge: "Comprehensive Immersion",
      summary: "The complete immersion: Bespoke Haircut, traditional hot-linen shave, deep purifying scalp detox, and full upper-body relaxation.",
      steps: [
        "Comprehensive scalp dermis examination and follicle analysis.",
        "Botanical scalp detox scrub removing sebum accumulation and dead cells.",
        "Precision scissor cut sculpted to facial proportions.",
        "Ceremonial wet shave with essential oil hot-linen towels.",
        "Deep restorative head, cervical, and shoulder acupressure.",
        "Nutritive dermal tonic, ice-cold pore seal, and bespoke styling finish."
      ]
    }
  ],

  // 4. A LA CARTE GROOMING ADD-ONS
  // Can only be selected if the component is NOT already included in the selected package
  addons: [
    {
      id: "addon-shave",
      name: "Traditional Hot Towel Shave",
      duration: 30,
      price: 70000,
      component: "shave",
      summary: "Ceremonial straight-razor shave with warm lather, hot-linen wrap, and restorative aftershave balm."
    },
    {
      id: "addon-massage",
      name: "Extra Head & Shoulder Massage",
      duration: 20,
      price: 45000,
      component: "massage",
      summary: "Targeted acupressure across temples, neck, and shoulder blades to dissolve muscular fatigue."
    },
    {
      id: "addon-scalp",
      name: "Scalp Treatment & Detox Therapy",
      duration: 25,
      price: 65000,
      component: "scalp",
      summary: "Deep botanical dermis purification removing excess sebum, flaking, and environmental impurities."
    },
    {
      id: "addon-color",
      name: "Natural Grey Blending & Camouflage",
      duration: 35,
      price: 90000,
      component: "coloring",
      summary: "Discreet demi-permanent toning formulation for an organic, refined, and youthful salt-and-pepper look."
    }
  ],

  // 5. MASTER BARBERS ROSTER
  barbers: [
    {
      id: "any",
      name: "Any Available Barber",
      role: "First Available Senior Barber",
      badge: "Recommended • Maximum Schedule Flexibility",
      avatarUrl: "assets/greenwood_monogram_cropped.png"
    },
    {
      id: "bramantyo",
      name: "Bramantyo",
      role: "Senior Barber",
      badge: "Classic Scissor & Scissor-Over-Comb",
      avatarUrl: "assets/barber_bramantyo.jpg"
    },
    {
      id: "rian",
      name: "Rian Pratama",
      role: "Senior Barber",
      badge: "Precision Fade & Taper Specialist",
      avatarUrl: "assets/barber_rian.jpg"
    },
    {
      id: "dimas",
      name: "Dimas Setiawan",
      role: "Senior Barber",
      badge: "Traditional Hot-Towel Wet Shave",
      avatarUrl: "assets/barber_dimas.jpg"
    },
    {
      id: "farhan",
      name: "Farhan Akbar",
      role: "Barber",
      badge: "Contemporary Texture & Styling",
      avatarUrl: "assets/barber_farhan.jpg"
    },
    {
      id: "aldi",
      name: "Aldi Maulana",
      role: "Barber",
      badge: "Beard Sculpting & Perimeter Detailing",
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
    // Seed initial realistic appointments so schedule availability is authentic
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
    if (!bookingData.status) {
      bookingData.status = "Confirmed";
    }
    list.push(bookingData);
    this.saveBookings(list);
    return bookingData;
  },

  // Update booking status ('Confirmed', 'Completed', 'Cancelled')
  updateStatus: function(bookingCode, status) {
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
      // "Any Available Barber": Check if AT LEAST ONE barber is free across the entire duration
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
        bookingCode: "GWB-261019-1284",
        guestName: "Hartono Kusumo",
        guestPhone: "081289123456",
        dateKey: dateKeyTomorrow,
        timeSlot: "11:30",
        totalDuration: 60,
        barberId: "bramantyo",
        assignedBarberId: "bramantyo",
        packageName: "The Signature Grooming Ritual",
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
        packageName: "The Executive Complete Ritual",
        totalPrice: 210000,
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
