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
    whatsappNumber: "6281991153322", // International format without +
    whatsappDisplay: "+62 819-9115-3322",
    phoneDisplay: "+62 819-9115-3322",
    email: "salretailventures@gmail.com",
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
    googleCalendarWebhookUrl: "https://script.google.com/macros/s/AKfycbxTz-1pKwj_Dd0ebm1_CfY7V9801L91Qw6qvwTa3LA6MLV7oULTA76GCRA5K8ic1LSTwQ/exec"
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

  // Compute effective slot duration in minutes (supports Early-Release & Overrun Auto-Extend)
  getEffectiveBookingDuration: function(b) {
    if (!b) return 45;
    const st = (b.status || '').toLowerCase();
    if (st === 'cancelled' || st === 'no-show') return 0;
    const standardDur = Number(b.totalDuration) || 45;

    if (st === 'completed' && typeof b.actualDuration === 'number' && b.actualDuration > 0) {
      return b.actualDuration;
    }

    if (st === 'in-progress' && b.startedAt) {
      const liveElapsed = Math.max(1, Math.ceil((Date.now() - Number(b.startedAt)) / 60000));
      return Math.max(standardDur, liveElapsed);
    }

    return standardDur;
  },

  // Resolve canonical barber ID from barber ID or display name
  resolveBarberId: function(barberIdOrName) {
    const raw = String(barberIdOrName || '').toLowerCase().trim();
    if (!raw || raw === 'any' || raw.includes('first available') || raw.includes('pertama')) return 'any';
    const match = GREENWOOD_CONFIG.barbers.find(b =>
      b.id !== 'any' && (
        raw === b.id ||
        raw.includes(b.id) ||
        raw.includes(b.name.toLowerCase().split(' ')[0])
      )
    );
    return match ? match.id : raw;
  },

  // Estimate standard SOP duration (minutes) from package/service title when not explicitly provided
  inferStandardDuration: function(serviceName) {
    const s = String(serviceName || '').toLowerCase();
    let base = 45;
    if (s.includes('ritual')) return 95;
    if (s.includes('cut') && (s.includes('shave') || s.includes('trim'))) base = 75;
    else if (s.includes('shave') || s.includes('trim') || s.includes('beard')) base = 30;
    else base = 45;

    if (s.includes('black mask') || s.includes('mask')) base += 20;
    if (s.includes('hair spa') || s.includes('spa')) base += 20;
    if (s.includes('massage')) base += 20;
    return base;
  },

  // Normalize a booking row received from Google Sheets Cloud Vault
  normalizeCloudBooking: function(raw) {
    if (!raw || !raw.bookingCode) return null;
    const code = String(raw.bookingCode).trim();
    const calStatus = String(raw.calendarStatus || '');
    const notesStr = String(raw.guestNotes || raw.notes || '');
    const isPosReceipt = code.startsWith('RCP-') || calStatus.toLowerCase().includes('pos walk-in') || raw.isPosTransaction === true;

    const bName = String(raw.assignedBarberName || raw.barberName || raw.barber || 'Bramantyo').trim();
    const resolvedId = this.resolveBarberId(raw.assignedBarberId || raw.barberId || bName);
    const stdDur = Number(raw.totalDuration) || this.inferStandardDuration(raw.serviceName || raw.packageName);

    // Parse fallback session close tag embedded in POS receipt notes: [SESSION:GWB-...|ACT:18|STD:45]
    let linkedBookingCode = raw.linkedBookingCode || '';
    let linkedActualDur = null;
    let linkedStdDur = null;
    const sessMatch = notesStr.match(/\[SESSION:([^|\]]+)\|ACT:(\d+)\|STD:(\d+)\]/);
    if (sessMatch) {
      linkedBookingCode = sessMatch[1].trim();
      linkedActualDur = parseInt(sessMatch[2], 10);
      linkedStdDur = parseInt(sessMatch[3], 10);
    }

    let status = raw.status || 'Confirmed';
    if (isPosReceipt) status = 'Completed';

    const actualDur = Number(raw.actualDuration) > 0 ? Number(raw.actualDuration) : null;
    const startedAt = Number(raw.startedAt) > 0 ? Number(raw.startedAt) : null;
    const completedAt = Number(raw.completedAt) > 0 ? Number(raw.completedAt) : null;
    const paymentLocked = Boolean(raw.paymentLocked) || (status === 'Completed' && (Boolean(raw.receiptNumber) || isPosReceipt));

    // Normalize HH:mm time slot
    let timeSlot = String(raw.timeSlot || raw.time || '10:00').trim();
    const tMatch = timeSlot.match(/(\d{1,2}):(\d{2})/);
    if (tMatch) {
      timeSlot = `${String(parseInt(tMatch[1], 10)).padStart(2, '0')}:${tMatch[2]}`;
    }

    return {
      bookingCode: code,
      guestName: String(raw.guestName || raw.name || 'Tamu').trim(),
      guestPhone: String(raw.guestPhone || raw.phone || '').trim(),
      guestEmail: String(raw.guestEmail || raw.email || '').trim(),
      guestNotes: notesStr,
      dateKey: String(raw.dateKey || '').trim(),
      timeSlot: timeSlot,
      totalDuration: stdDur,
      actualDuration: actualDur,
      startedAt: startedAt,
      completedAt: completedAt,
      paymentLocked: paymentLocked,
      receiptNumber: raw.receiptNumber || (isPosReceipt ? code : ''),
      totalPrice: Number(raw.totalPrice || raw.total) || 0,
      packageName: String(raw.packageName || raw.serviceName || 'The Cut').trim(),
      serviceName: String(raw.serviceName || raw.packageName || 'The Cut').trim(),
      barberId: resolvedId === 'any' ? 'bramantyo' : resolvedId,
      assignedBarberId: resolvedId === 'any' ? 'bramantyo' : resolvedId,
      assignedBarberName: bName,
      barberName: bName,
      status: status,
      isPosReceipt: isPosReceipt,
      linkedBookingCode: linkedBookingCode,
      linkedActualDuration: linkedActualDur,
      linkedStandardDuration: linkedStdDur,
      calendarStatus: calStatus,
      waStatus: raw.waStatus || '',
      auditFlag: raw.auditFlag || 'HEALTHY',
      timestamp: Number(raw.timestamp) || Date.now(),
      source: 'cloud'
    };
  },

  // Merge cloud bookings from Google Sheets with local store without losing active/locked session progress
  mergeCloudBookings: function(cloudBookings) {
    if (!Array.isArray(cloudBookings)) return this.getBookings();
    const localList = this.getBookings();
    const byCode = new Map();

    // Index existing local bookings first
    localList.forEach(b => {
      if (b && b.bookingCode) byCode.set(b.bookingCode, Object.assign({}, b));
    });

    // Collect POS receipt close-links (works immediately even before Apps Script redeployment!)
    const posClosureMap = new Map();
    const normalizedCloud = [];
    cloudBookings.forEach(raw => {
      const nb = this.normalizeCloudBooking(raw);
      if (!nb) return;
      normalizedCloud.push(nb);
      if (nb.linkedBookingCode) {
        posClosureMap.set(nb.linkedBookingCode, {
          receiptNumber: nb.bookingCode,
          actualDuration: nb.linkedActualDuration || nb.actualDuration || nb.totalDuration || 45,
          totalDuration: nb.linkedStandardDuration || nb.totalDuration || 45,
          completedAt: nb.timestamp || Date.now()
        });
      }
    });

    const statusRank = { 'pending': 1, 'confirmed': 2, 'in-progress': 3, 'completed': 4, 'cancelled': 4, 'no-show': 4 };

    normalizedCloud.forEach(cb => {
      const existing = byCode.get(cb.bookingCode);
      if (!existing) {
        byCode.set(cb.bookingCode, cb);
      } else {
        // Keep whichever state is further along in the Opsi 1 lifecycle (Confirmed -> In-Progress -> Completed Lock)
        const exRank = statusRank[(existing.status || 'confirmed').toLowerCase()] || 2;
        const cbRank = statusRank[(cb.status || 'confirmed').toLowerCase()] || 2;

        if (cbRank > exRank || (cb.paymentLocked && !existing.paymentLocked)) {
          byCode.set(cb.bookingCode, Object.assign({}, existing, cb));
        } else {
          // Keep local live stopwatch / locked POS completion, while refreshing metadata from cloud
          byCode.set(cb.bookingCode, Object.assign({}, cb, {
            status: existing.status,
            startedAt: existing.startedAt || cb.startedAt,
            completedAt: existing.completedAt || cb.completedAt,
            actualDuration: existing.actualDuration || cb.actualDuration,
            paymentLocked: existing.paymentLocked || cb.paymentLocked,
            receiptNumber: existing.receiptNumber || cb.receiptNumber,
            totalDuration: existing.totalDuration || cb.totalDuration
          }));
        }
      }
    });

    // Reconcile any GWB-... booking closed via a synced RCP-... POS receipt row
    posClosureMap.forEach((closure, targetBookingCode) => {
      const target = byCode.get(targetBookingCode);
      if (target && !target.paymentLocked) {
        target.status = 'Completed';
        target.paymentLocked = true;
        target.actualDuration = closure.actualDuration;
        if (closure.totalDuration) target.totalDuration = closure.totalDuration;
        target.completedAt = target.completedAt || closure.completedAt;
        target.receiptNumber = closure.receiptNumber;
      }
    });

    const merged = Array.from(byCode.values()).sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0));
    this.saveBookings(merged);
    return merged;
  },

  // Pull live bookings from Google Sheets Cloud Vault (usable by BOTH booking.html & estate-records.html)
  syncFromCloud: function(customWebhookUrl) {
    const webhookUrl = customWebhookUrl || (GREENWOOD_CONFIG.brand && GREENWOOD_CONFIG.brand.googleCalendarWebhookUrl);
    if (!webhookUrl || typeof fetch === 'undefined') {
      return Promise.resolve({ status: 'offline', bookings: this.getBookings(), cloudCount: 0 });
    }
    const url = webhookUrl + (webhookUrl.includes('?') ? '&' : '?') + 'action=get_bookings&key=gw_ledger_sec_2050&t=' + Date.now();
    return fetch(url)
      .then(r => r.json())
      .then(res => {
        if (res && res.status === 'success' && Array.isArray(res.bookings)) {
          const merged = this.mergeCloudBookings(res.bookings);
          return {
            status: 'success',
            bookings: merged,
            cloudBookings: res.bookings,
            cloudCount: res.count || res.bookings.length,
            sheetUrl: res.sheetUrl || ''
          };
        }
        return { status: 'offline', bookings: this.getBookings(), cloudCount: 0 };
      })
      .catch(err => {
        console.warn('GreenwoodBookingStore.syncFromCloud fallback to local:', err);
        return { status: 'offline', bookings: this.getBookings(), cloudCount: 0 };
      });
  },

  // Start live stopwatch when guest checks in at Cashier (START) — accepts optional cloud fallback record
  startBookingSession: function(bookingCode, fallbackBooking) {
    const list = this.getBookings();
    let item = list.find(b => b.bookingCode === bookingCode);
    if (!item && fallbackBooking) {
      item = this.normalizeCloudBooking(fallbackBooking) || Object.assign({}, fallbackBooking);
      list.unshift(item);
    }
    if (!item) return null;
    item.status = 'In-Progress';
    if (!item.startedAt) item.startedAt = Date.now();
    item.paymentLocked = false;
    this.saveBookings(list);
    return item;
  },

  // Lock & stop stopwatch automatically when Payment POS completes (OPSI 1 AUTO-STOP)
  completeBookingSession: function(bookingCode, receiptNumber, overrideActualMinutes, fallbackBooking) {
    const list = this.getBookings();
    let item = list.find(b => b.bookingCode === bookingCode);
    if (!item && fallbackBooking) {
      item = this.normalizeCloudBooking(fallbackBooking) || Object.assign({}, fallbackBooking);
      list.unshift(item);
    }
    if (!item) return null;
    const now = Date.now();
    let actualMins = Number(overrideActualMinutes);
    if (!actualMins || isNaN(actualMins)) {
      if (item.startedAt) {
        actualMins = Math.max(1, Math.round((now - Number(item.startedAt)) / 60000));
      } else {
        actualMins = Number(item.totalDuration) || 45;
      }
    }
    item.status = 'Completed';
    item.completedAt = now;
    item.actualDuration = actualMins;
    item.paymentLocked = true;
    if (receiptNumber) item.receiptNumber = receiptNumber;
    this.saveBookings(list);
    return item;
  },

  // Aggregate Actual vs Standard duration efficiency for Owner & Manager evaluation
  getDurationEfficiencyStats: function() {
    const list = this.getBookings();
    const completed = list.filter(b => (b.status || '').toLowerCase() === 'completed' && typeof b.actualDuration === 'number' && b.actualDuration > 0);
    const byService = {};
    const byBarber = {};
    let sumActual = 0, sumStandard = 0, fasterCount = 0, onTimeCount = 0, overrunCount = 0;

    completed.forEach(b => {
      const std = Number(b.totalDuration) || 45;
      const act = Number(b.actualDuration);
      const diff = act - std;
      sumActual += act;
      sumStandard += std;
      if (diff <= -5) fasterCount++;
      else if (diff >= 5) overrunCount++;
      else onTimeCount++;

      const svcName = b.packageName || b.serviceName || 'The Cut';
      if (!byService[svcName]) byService[svcName] = { name: svcName, count: 0, sumStd: 0, sumAct: 0, faster: 0, overrun: 0 };
      byService[svcName].count++;
      byService[svcName].sumStd += std;
      byService[svcName].sumAct += act;
      if (diff <= -5) byService[svcName].faster++;
      if (diff >= 5) byService[svcName].overrun++;

      const barberName = b.assignedBarberName || b.barberName || (GREENWOOD_CONFIG.barbers.find(x => x.id === (b.assignedBarberId || b.barberId))?.name) || 'Bramantyo';
      if (!byBarber[barberName]) byBarber[barberName] = { name: barberName, count: 0, sumStd: 0, sumAct: 0, faster: 0, overrun: 0 };
      byBarber[barberName].count++;
      byBarber[barberName].sumStd += std;
      byBarber[barberName].sumAct += act;
      if (diff <= -5) byBarber[barberName].faster++;
      if (diff >= 5) byBarber[barberName].overrun++;
    });

    const total = completed.length;
    return {
      totalLockedSessions: total,
      avgActual: total > 0 ? Math.round(sumActual / total) : 0,
      avgStandard: total > 0 ? Math.round(sumStandard / total) : 0,
      fasterCount: fasterCount,
      onTimeCount: onTimeCount,
      overrunCount: overrunCount,
      byService: Object.values(byService).map(s => ({
        name: s.name,
        count: s.count,
        avgStd: Math.round(s.sumStd / s.count),
        avgAct: Math.round(s.sumAct / s.count),
        delta: Math.round((s.sumAct - s.sumStd) / s.count),
        faster: s.faster,
        overrun: s.overrun
      })),
      byBarber: Object.values(byBarber).map(b => ({
        name: b.name,
        count: b.count,
        avgStd: Math.round(b.sumStd / b.count),
        avgAct: Math.round(b.sumAct / b.count),
        delta: Math.round((b.sumAct - b.sumStd) / b.count),
        faster: b.faster,
        overrun: b.overrun
      }))
    };
  },

  // Verify availability for date, time slot, duration, and barber (Live 15-min Early-Release & Overrun Sync)
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

    // Bookings on target date (exclude Cancelled, No-Show, and standalone POS receipts to avoid double-blocking)
    const dayBookings = bookings.filter(b => {
      if (!b || b.dateKey !== dateKey) return false;
      if (b.isPosReceipt || String(b.bookingCode || '').startsWith('RCP-')) return false;
      const st = (b.status || '').toLowerCase();
      return st !== 'cancelled' && st !== 'no-show';
    });

    const matchesBarber = (b, targetId) => {
      const bId = this.resolveBarberId(b.assignedBarberId || b.barberId || b.assignedBarberName || b.barberName);
      return bId === targetId;
    };

    if (barberId && barberId !== 'any') {
      // Specific barber: Check for overlapping bookings using live effective duration
      for (const b of dayBookings) {
        if (matchesBarber(b, barberId)) {
          const [bStartH, bStartM] = (b.timeSlot || '10:00').split(':').map(Number);
          const bStart = bStartH * 60 + bStartM;
          const bEnd = bStart + this.getEffectiveBookingDuration(b);

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
          if (matchesBarber(b, bId)) {
            const [bStartH, bStartM] = (b.timeSlot || '10:00').split(':').map(Number);
            const bStart = bStartH * 60 + bStartM;
            const bEnd = bStart + this.getEffectiveBookingDuration(b);
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

  // Seed sample appointments (includes realistic Today 15-min stopwatch states: Faster, Overrun, Live In-Progress, Booked)
  getSeedBookings: function() {
    const today = new Date();
    const formatDateKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dateKeyToday = formatDateKey(today);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dateKeyTomorrow = formatDateKey(tomorrow);

    return [
      {
        bookingCode: "GWB-LIVE-1001",
        guestName: "Bpk. Alexander Wijaya",
        guestPhone: "081234567890",
        dateKey: dateKeyToday,
        timeSlot: "10:00",
        totalDuration: 45,
        actualDuration: 30,
        status: "Completed",
        paymentLocked: true,
        receiptNumber: "RCP-20261125-01",
        startedAt: Date.now() - 1000 * 60 * 180,
        completedAt: Date.now() - 1000 * 60 * 150,
        barberId: "bramantyo",
        assignedBarberId: "bramantyo",
        assignedBarberName: "Bramantyo",
        packageName: "The Cut",
        totalPrice: 240000,
        timestamp: Date.now() - 1000 * 60 * 210
      },
      {
        bookingCode: "GWB-LIVE-1002",
        guestName: "dr. Kevin Pratama",
        guestPhone: "081987654321",
        dateKey: dateKeyToday,
        timeSlot: "10:15",
        totalDuration: 45,
        actualDuration: 60,
        status: "Completed",
        paymentLocked: true,
        receiptNumber: "RCP-20261125-02",
        startedAt: Date.now() - 1000 * 60 * 165,
        completedAt: Date.now() - 1000 * 60 * 105,
        barberId: "rian",
        assignedBarberId: "rian",
        assignedBarberName: "Rian Pratama",
        packageName: "The Cut",
        totalPrice: 240000,
        timestamp: Date.now() - 1000 * 60 * 195
      },
      {
        bookingCode: "GWB-LIVE-1003",
        guestName: "Farid Nurhadi",
        guestPhone: "087811223344",
        dateKey: dateKeyToday,
        timeSlot: "11:00",
        totalDuration: 45,
        status: "In-Progress",
        paymentLocked: false,
        startedAt: Date.now() - 1000 * 60 * 18,
        barberId: "dimas",
        assignedBarberId: "dimas",
        assignedBarberName: "Dimas Setiawan",
        packageName: "The Cut",
        totalPrice: 240000,
        timestamp: Date.now() - 1000 * 60 * 60
      },
      {
        bookingCode: "GWB-LIVE-1004",
        guestName: "Tomy Sugiarto",
        guestPhone: "085699887766",
        dateKey: dateKeyToday,
        timeSlot: "13:00",
        totalDuration: 30,
        status: "Confirmed",
        paymentLocked: false,
        barberId: "farhan",
        assignedBarberId: "farhan",
        assignedBarberName: "Farhan Akbar",
        packageName: "The Shave / Trim",
        totalPrice: 180000,
        timestamp: Date.now() - 1000 * 60 * 30
      },
      {
        bookingCode: "GWB-261028-1284",
        guestName: "Hartono Kusumo",
        guestPhone: "081289123456",
        dateKey: dateKeyTomorrow,
        timeSlot: "11:30",
        totalDuration: 45,
        status: "Confirmed",
        barberId: "bramantyo",
        assignedBarberId: "bramantyo",
        assignedBarberName: "Bramantyo",
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
        status: "Confirmed",
        barberId: "dimas",
        assignedBarberId: "dimas",
        assignedBarberName: "Dimas Setiawan",
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
