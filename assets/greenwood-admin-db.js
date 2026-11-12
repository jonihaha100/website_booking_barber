/**
 * Greenwood Barbers: POS, CRM and Management Database Engine
 * Acuan: Minutes App & Luxury Barbershop Workflow
 * 
 * Modul Didukung:
 * - Modul D: CRM & Profil Pelanggan (Internal Notes, Riwayat Kunjungan, Filter Last Visit, Birthday, Tag Pasif)
 * - Modul B: Point of Sale (POS Kasir Cepat, Pembayaran Manual, Tip, Diskon, Nota Digital)
 * - Modul C: Manajemen Staf & Komisi Akuntan (Shift, Absensi Clock-in/out, Perhitungan Komisi)
 * - Modul G & H: Laporan Analitik, Retensi, Export CSV/Excel, RBAC, Multi-cabang branch_id
 * - Modul A: Google API Sandbox & Testing Environment
 */

(function(window) {
  'use strict';

  const DB_PREFIX = 'greenwood_pos_crm_';
  const KEYS = {
    CUSTOMERS: DB_PREFIX + 'customers_v1',
    TRANSACTIONS: DB_PREFIX + 'transactions_v1',
    STAFF: DB_PREFIX + 'staff_v1',
    ATTENDANCE: DB_PREFIX + 'attendance_v1',
    LOGS: DB_PREFIX + 'activity_logs_v1',
    CONFIG: DB_PREFIX + 'system_config_v1',
    SANDBOX: DB_PREFIX + 'sandbox_state_v1',
    ROLES: DB_PREFIX + 'role_permissions_v2',
    ROLE_PINS: DB_PREFIX + 'role_pins_v1'
  };

  const DEFAULT_ROLE_PINS = {
    Owner: "2050",
    Manager: "3030",
    Cashier: "1010",
    Barber: "0000"
  };

  const DEFAULT_BRANCH_ID = 'kbp-main'; // Kota Baru Parahyangan Main Branch
  // Initial seed dataset
  const SEED_CUSTOMERS = [
    {
      id: "CUST-001",
      name: "Bpk. Alexander Wijaya",
      phone: "081234567890",
      email: "alexander.w@example.com",
      birthday: "1988-06-15",
      internalNotes: "Fade #2 samping, trim jenggot tipis natural. Suka kopi hitam dingin tanpa gula. Langganan Bramantyo.",
      tags: ["VIP", "Reguler"],
      totalSpend: 1450000,
      visitCount: 5,
      firstVisit: "2026-08-10",
      lastVisit: "2026-11-04",
      lastBarber: "Bramantyo",
      lastService: "The Ritual",
      passiveFlag: false,
      branch_id: DEFAULT_BRANCH_ID,
      visitHistory: [
        { date: "2026-11-04", receiptId: "RCP-20261104-01", barberName: "Bramantyo", serviceName: "The Ritual", total: 350000, tip: 50000, notes: "Persiapan gala dinner" },
        { date: "2026-10-12", receiptId: "RCP-20261012-03", barberName: "Bramantyo", serviceName: "The Cut & Shave", total: 210000, tip: 30000, notes: "Rapihkan cambang" },
        { date: "2026-09-18", receiptId: "RCP-20260918-05", barberName: "Bramantyo", serviceName: "The Ritual", total: 350000, tip: 50000, notes: "Creambath santai" },
        { date: "2026-08-30", receiptId: "RCP-20260830-02", barberName: "Bramantyo", serviceName: "The Cut", total: 150000, tip: 20000, notes: "Quick trim" },
        { date: "2026-08-10", receiptId: "RCP-20260810-01", barberName: "Bramantyo", serviceName: "The Ritual", total: 390000, tip: 40000, notes: "Kunjungan perdana" }
      ]
    },
    {
      id: "CUST-002",
      name: "dr. Kevin Pratama",
      phone: "081987654321",
      email: "dr.kevin.p@example.com",
      birthday: "1992-11-20",
      internalNotes: "Taper low fade, gunting atas sisir samping (side part klasik). Kulit kepala sensitif, gunakan handuk hangat suhu sedang.",
      tags: ["Reguler"],
      totalSpend: 630000,
      visitCount: 3,
      firstVisit: "2026-09-02",
      lastVisit: "2026-10-28",
      lastBarber: "Rian Pratama",
      lastService: "The Cut & Shave",
      passiveFlag: false,
      branch_id: DEFAULT_BRANCH_ID,
      visitHistory: [
        { date: "2026-10-28", receiptId: "RCP-20261028-02", barberName: "Rian Pratama", serviceName: "The Cut & Shave", total: 210000, tip: 25000, notes: "Konsultasi pomade matte" },
        { date: "2026-09-29", receiptId: "RCP-20260929-04", barberName: "Rian Pratama", serviceName: "The Cut", total: 150000, tip: 20000, notes: "Side part klasik" },
        { date: "2026-09-02", receiptId: "RCP-20260902-01", barberName: "Rian Pratama", serviceName: "The Cut & Shave", total: 270000, tip: 30000, notes: "Addon hot towel" }
      ]
    },
    {
      id: "CUST-003",
      name: "Bpk. Hendra Gunawan",
      phone: "081377889900",
      email: "hendra.kbp@example.com",
      birthday: "1975-03-08",
      internalNotes: "Scissor cut full (tanpa clipper), natural finish. Selalu minta teh hangat camomile.",
      tags: ["VIP", "Pasif"],
      totalSpend: 1050000,
      visitCount: 3,
      firstVisit: "2026-07-15",
      lastVisit: "2026-09-10", // Lebih dari 60 hari yang lalu (Pasif)
      lastBarber: "Dimas Setiawan",
      lastService: "The Ritual",
      passiveFlag: true,
      branch_id: DEFAULT_BRANCH_ID,
      visitHistory: [
        { date: "2026-09-10", receiptId: "RCP-20260910-02", barberName: "Dimas Setiawan", serviceName: "The Ritual", total: 350000, tip: 50000, notes: "Perawatan lengkap" },
        { date: "2026-08-12", receiptId: "RCP-20260812-01", barberName: "Dimas Setiawan", serviceName: "The Ritual", total: 350000, tip: 50000, notes: "Scissor cut" },
        { date: "2026-07-15", receiptId: "RCP-20260715-03", barberName: "Dimas Setiawan", serviceName: "The Ritual", total: 350000, tip: 50000, notes: "Kunjungan pertama" }
      ]
    },
    {
      id: "CUST-004",
      name: "Farid Nurhadi",
      phone: "087811223344",
      email: "farid.n@example.com",
      birthday: "1998-11-12",
      internalNotes: "Textured crop, taper fade #1. Minat beli pomade matte water-based.",
      tags: ["Ulang Tahun Bulan Ini", "Reguler"],
      totalSpend: 360000,
      visitCount: 2,
      firstVisit: "2026-10-05",
      lastVisit: "2026-11-06",
      lastBarber: "Farhan Akbar",
      lastService: "The Cut",
      passiveFlag: false,
      branch_id: DEFAULT_BRANCH_ID,
      visitHistory: [
        { date: "2026-11-06", receiptId: "RCP-20261106-03", barberName: "Farhan Akbar", serviceName: "The Cut + Pomade", total: 210000, tip: 20000, notes: "Potong + beli pomade" },
        { date: "2026-10-05", receiptId: "RCP-20261005-02", barberName: "Farhan Akbar", serviceName: "The Cut", total: 150000, tip: 15000, notes: "Textured crop" }
      ]
    },
    {
      id: "CUST-005",
      name: "Tomy Sugiarto",
      phone: "085699887766",
      email: "tomy.s@example.com",
      birthday: "1985-01-24",
      internalNotes: "Beard sculpting presisi, garis leher tinggi. Suka wangi sandalwood.",
      tags: ["Pasif"],
      totalSpend: 270000,
      visitCount: 2,
      firstVisit: "2026-08-01",
      lastVisit: "2026-09-04", // > 60 hari yang lalu (Pasif)
      lastBarber: "Aldi Maulana",
      lastService: "Beard Grooming",
      passiveFlag: true,
      branch_id: DEFAULT_BRANCH_ID,
      visitHistory: [
        { date: "2026-09-04", receiptId: "RCP-20260904-01", barberName: "Aldi Maulana", serviceName: "Beard Grooming + Shave", total: 180000, tip: 20000, notes: "Beard oil styling" },
        { date: "2026-08-01", receiptId: "RCP-20260801-04", barberName: "Aldi Maulana", serviceName: "Beard Grooming", total: 90000, tip: 10000, notes: "Garis leher presisi" }
      ]
    }
  ];

  const SEED_STAFF = [
    {
      id: "barber-bramantyo",
      name: "Bramantyo",
      role: "Master Barber",
      phone: "081991153322",
      serviceCommissionRate: 45, // 45% komisi jasa
      productCommissionRate: 10, // 10% komisi produk
      shift: "10:00 - 18:00",
      offDays: ["Tuesday"],
      isClockedIn: true,
      clockInTime: "09:48 WIB",
      branch_id: DEFAULT_BRANCH_ID
    },
    {
      id: "barber-rian",
      name: "Rian Pratama",
      role: "Senior Barber",
      phone: "081223344556",
      serviceCommissionRate: 40,
      productCommissionRate: 10,
      shift: "12:00 - 20:00",
      offDays: ["Tuesday"],
      isClockedIn: true,
      clockInTime: "11:50 WIB",
      branch_id: DEFAULT_BRANCH_ID
    },
    {
      id: "barber-dimas",
      name: "Dimas Setiawan",
      role: "Senior Barber",
      phone: "081334455667",
      serviceCommissionRate: 40,
      productCommissionRate: 10,
      shift: "10:00 - 18:00",
      offDays: ["Tuesday"],
      isClockedIn: false,
      clockInTime: null,
      branch_id: DEFAULT_BRANCH_ID
    },
    {
      id: "barber-farhan",
      name: "Farhan Akbar",
      role: "Barber",
      phone: "081445566778",
      serviceCommissionRate: 35,
      productCommissionRate: 10,
      shift: "10:00 - 18:00",
      offDays: ["Tuesday"],
      isClockedIn: true,
      clockInTime: "09:55 WIB",
      branch_id: DEFAULT_BRANCH_ID
    },
    {
      id: "barber-aldi",
      name: "Aldi Maulana",
      role: "Barber",
      phone: "081556677889",
      serviceCommissionRate: 35,
      productCommissionRate: 10,
      shift: "12:00 - 20:00",
      offDays: ["Tuesday"],
      isClockedIn: true,
      clockInTime: "11:45 WIB",
      branch_id: DEFAULT_BRANCH_ID
    }
  ];

  const SEED_TRANSACTIONS = [
    {
      id: "TX-20261111-001",
      receiptNumber: "RCP-20261111-01",
      timestamp: Date.now() - 3600000 * 2,
      dateFormatted: "11 Nov 2026",
      timeFormatted: "10:30 WIB",
      customerId: "CUST-001",
      customerName: "Bpk. Alexander Wijaya",
      customerPhone: "081234567890",
      barberId: "barber-bramantyo",
      barberName: "Bramantyo",
      items: [
        { type: "service", name: "The Cut", price: 150000, qty: 1 },
        { type: "addon", name: "Hot Towel Refresh", price: 40000, qty: 1 }
      ],
      subtotal: 190000,
      discount: 0,
      tip: 30000,
      total: 220000,
      paymentMethod: "QRIS Statis",
      cashTendered: 0,
      changeDue: 0,
      barberServiceCommission: 85500, // 45% of 190k
      barberProductCommission: 0,
      totalBarberCommission: 115500, // 85.5k + 30k tip
      status: "Paid",
      notes: "Suka kopi hitam dingin",
      branch_id: DEFAULT_BRANCH_ID
    },
    {
      id: "TX-20261111-002",
      receiptNumber: "RCP-20261111-02",
      timestamp: Date.now() - 3600000 * 1,
      dateFormatted: "11 Nov 2026",
      timeFormatted: "11:15 WIB",
      customerId: "CUST-002",
      customerName: "dr. Kevin Pratama",
      customerPhone: "081987654321",
      barberId: "barber-rian",
      barberName: "Rian Pratama",
      items: [
        { type: "service", name: "The Cut & Shave", price: 210000, qty: 1 },
        { type: "product", name: "Classic Matte Dressing Pomade", price: 160000, qty: 1 }
      ],
      subtotal: 370000,
      discount: 20000,
      tip: 25000,
      total: 375000,
      paymentMethod: "Transfer",
      cashTendered: 0,
      changeDue: 0,
      barberServiceCommission: 84000, // 40% of 210k
      barberProductCommission: 16000, // 10% of 160k
      totalBarberCommission: 125000, // 84k + 16k + 25k tip
      status: "Paid",
      notes: "Side part klasik",
      branch_id: DEFAULT_BRANCH_ID
    }
  ];
  // Role permissions matrix (Zoho and Minutes App RBAC model)
  const DEFAULT_ROLE_PERMISSIONS = {
    Owner: {
      id: "Owner",
      name: "Owner",
      badge: "Super Admin",
      title: "Owner (Pemilik Toko)",
      subtitle: "Akses Penuh Tanpa Batas (Super Admin)",
      description: "Memiliki wewenang tertinggi untuk seluruh data omzet finansial, audit trail, konfigurasi sistem multi-cabang, dan otorisasi kasir.",
      isSuperAdmin: true,
      permissions: {
        pos_view: true,
        pos_create: true,
        pos_discount: true,
        pos_tip: true,
        pos_void: true,
        crm_view: true,
        crm_notes: true,
        crm_phone: true,
        crm_create: true,
        crm_export: true,
        booking_view: true,
        booking_create: true,
        booking_edit: true,
        booking_cancel: true,
        staff_clockin: true,
        staff_comm_self: true,
        staff_comm_all: true,
        staff_comm_export: true,
        analytics_view: true,
        analytics_export: true,
        settings_sandbox: true,
        settings_passkey: true,
        settings_roles: true
      }
    },
    Manager: {
      id: "Manager",
      name: "Manager",
      badge: "Store Manager",
      title: "👔 Store Manager (Kepala Toko)",
      subtitle: "Operasional Kasir, Staf & Komisi",
      description: "Mengawasi operasional harian kasir, menyetujui diskon & void transaksi, mengelola jadwal shift absensi, serta rekap komisi akuntan.",
      isSuperAdmin: false,
      permissions: {
        pos_view: true,
        pos_create: true,
        pos_discount: true,
        pos_tip: true,
        pos_void: true,
        crm_view: true,
        crm_notes: true,
        crm_phone: true,
        crm_create: true,
        crm_export: true,
        booking_view: true,
        booking_create: true,
        booking_edit: true,
        booking_cancel: true,
        staff_clockin: true,
        staff_comm_self: true,
        staff_comm_all: true,
        staff_comm_export: true,
        analytics_view: true,
        analytics_export: true,
        settings_sandbox: true,
        settings_passkey: false, // Hanya Owner yang boleh mengganti master passkey
        settings_roles: false
      }
    },
    Cashier: {
      id: "Cashier",
      name: "Cashier",
      badge: "Front Desk",
      title: "💳 Kasir (Front Desk Operator)",
      subtitle: "POS Kasir, Order & CRM Harian",
      description: "Operasional cepat di meja kasir: mencatat transaksi layanan dan produk, input uang tip barber, registrasi data tamu baru, dan cetak nota digital.",
      isSuperAdmin: false,
      permissions: {
        pos_view: true,
        pos_create: true,
        pos_discount: true,
        pos_tip: true,
        pos_void: false, // Kasir dilarang membatalkan transaksi tanpa otorisasi manager
        crm_view: false, // Tab CRM disembunyikan total dari Kasir (data pelanggan dilindungi)
        crm_notes: false,
        crm_phone: false,
        crm_create: false,
        crm_export: false, // Cegah ekspor database pelanggan
        booking_view: true,
        booking_create: true,
        booking_edit: true,
        booking_cancel: false,
        staff_clockin: true,
        staff_comm_self: false,
        staff_comm_all: false,
        staff_comm_export: false, // Dilarang ekspor komisi barber
        analytics_view: false, // Kasir fokus kasir cepat, omzet toko hanya diakses Owner/Manager
        analytics_export: false,
        settings_sandbox: false,
        settings_passkey: false,
        settings_roles: false
      }
    },
    Barber: {
      id: "Barber",
      name: "Barber",
      badge: "Stylist",
      title: "💈 Barber / Hair Stylist",
      subtitle: "Catatan Rambut & Komisi Pribadi",
      description: "Akses teknis pemotongan rambut: melihat jadwal antrean tamu, membaca catatan formula potongan pelanggan, absensi shift, dan pantau komisi sendiri.",
      isSuperAdmin: false,
      permissions: {
        pos_view: false, // Barber tidak melayani transaksi kasir
        pos_create: false,
        pos_discount: false,
        pos_tip: false,
        pos_void: false,
        crm_view: true,
        crm_notes: true, // SANGAT PENTING: Wajib bisa baca formula potongan rambut
        crm_phone: false, // Nomor telepon disamarkan demi privasi pelanggan
        crm_create: false,
        crm_export: false,
        booking_view: true, // Melihat jadwal kerja sendiri
        booking_create: false,
        booking_edit: false,
        booking_cancel: false,
        staff_clockin: true, // Clock-in / Clock-out mandiri
        staff_comm_self: true, // Melihat komisi diri sendiri
        staff_comm_all: false, // Dilarang mengintip komisi barber lain
        staff_comm_export: false, // Dilarang ekspor rekap akuntan
        analytics_view: false, // Dilarang melihat omzet finansial toko
        analytics_export: false,
        settings_sandbox: false,
        settings_passkey: false,
        settings_roles: false
      }
    }
  };
  // Storage helpers
  function getStorage(key, fallback) {
    try {
      if (typeof localStorage !== 'undefined') {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : fallback;
      }
      return fallback;
    } catch(e) {
      console.warn("Storage read error:", key, e);
      return fallback;
    }
  }

  function setStorage(key, value) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch(e) {
      console.warn("Storage write error:", key, e);
    }
  }
  // Core database API
  const GreenwoodAdminDB = {
    DEFAULT_BRANCH_ID: DEFAULT_BRANCH_ID,
    init: function() {
      if (typeof localStorage === 'undefined') return;
      if (!localStorage.getItem(KEYS.CUSTOMERS)) {
        setStorage(KEYS.CUSTOMERS, SEED_CUSTOMERS);
      }
      if (!localStorage.getItem(KEYS.STAFF)) {
        setStorage(KEYS.STAFF, SEED_STAFF);
      }
      if (!localStorage.getItem(KEYS.TRANSACTIONS)) {
        setStorage(KEYS.TRANSACTIONS, SEED_TRANSACTIONS);
      }
      if (!localStorage.getItem(KEYS.CONFIG)) {
        setStorage(KEYS.CONFIG, {
          branchName: "Greenwood Barbers (Kota Baru Parahyangan)",
          branchId: DEFAULT_BRANCH_ID,
          activeRole: "Owner", // Owner | Manager | Cashier | Barber
          roles: ["Owner", "Manager", "Cashier", "Barber"],
          passiveThresholdDays: 35, // Pelanggan tidak berkunjung > 35 hari dianggap Pasif
          currency: "IDR"
        });
      }
      if (!localStorage.getItem(KEYS.SANDBOX)) {
        setStorage(KEYS.SANDBOX, {
          enabled: false, // true: Simulasi Google API & Notifikasi, false: Live
          mockDelayMs: 600,
          mockCalendarSuccess: true,
          mockWaSuccess: true,
          lastSimulationPayload: null,
          lastSimulationResponse: null
        });
      }
      if (!localStorage.getItem(KEYS.ROLES)) {
        setStorage(KEYS.ROLES, DEFAULT_ROLE_PERMISSIONS);
      }
      if (!localStorage.getItem(KEYS.ROLE_PINS)) {
        const legacyPin = localStorage.getItem('greenwood_ledger_passkey_v1');
        const initialPins = Object.assign({}, DEFAULT_ROLE_PINS);
        if (legacyPin && legacyPin.trim()) {
          initialPins.Owner = legacyPin.trim();
        }
        setStorage(KEYS.ROLE_PINS, initialPins);
      }
      this.recalculatePassiveCustomers();
    },
    // CRM and customer management
    getCustomers: function(filterOptions) {
      let list = getStorage(KEYS.CUSTOMERS, SEED_CUSTOMERS);
      const opts = filterOptions || {};

      // Auto update passive flag based on lastVisit
      const now = new Date();
      const thresholdDays = this.getConfig().passiveThresholdDays || 35;

      list.forEach(c => {
        if (c.lastVisit) {
          const diffDays = Math.floor((now - new Date(c.lastVisit)) / (1000 * 60 * 60 * 24));
          c.passiveFlag = diffDays > thresholdDays;
          c.daysSinceLastVisit = diffDays;
        } else {
          c.passiveFlag = false;
          c.daysSinceLastVisit = 0;
        }
      });
      if (opts.keyword) {
        const kw = opts.keyword.toLowerCase().trim();
        list = list.filter(c => 
          (c.name && c.name.toLowerCase().includes(kw)) ||
          (c.phone && c.phone.includes(kw)) ||
          (c.internalNotes && c.internalNotes.toLowerCase().includes(kw))
        );
      }
      if (opts.category) {
        if (opts.category === 'passive') {
          list = list.filter(c => c.passiveFlag === true);
        } else if (opts.category === 'vip') {
          list = list.filter(c => c.tags && c.tags.includes('VIP'));
        } else if (opts.category === 'birthday_this_month') {
          const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0');
          list = list.filter(c => c.birthday && c.birthday.split('-')[1] === currentMonth);
        }
      }
      if (opts.sortBy) {
        if (opts.sortBy === 'spend_desc') {
          list.sort((a, b) => (b.totalSpend || 0) - (a.totalSpend || 0));
        } else if (opts.sortBy === 'visits_desc') {
          list.sort((a, b) => (b.visitCount || 0) - (a.visitCount || 0));
        } else if (opts.sortBy === 'last_visit_desc') {
          list.sort((a, b) => new Date(b.lastVisit || 0) - new Date(a.lastVisit || 0));
        } else if (opts.sortBy === 'last_visit_asc') {
          list.sort((a, b) => new Date(a.lastVisit || 0) - new Date(b.lastVisit || 0));
        }
      }

      return list;
    },

    getCustomerById: function(id) {
      const list = getStorage(KEYS.CUSTOMERS, []);
      return list.find(c => c.id === id) || null;
    },

    findCustomerByPhoneOrName: function(query) {
      if (!query) return null;
      const q = query.toLowerCase().replace(/[^0-9a-z]/g, "");
      const list = getStorage(KEYS.CUSTOMERS, []);
      return list.find(c => {
        const cleanPhone = (c.phone || "").replace(/[^0-9]/g, "");
        const cleanName = (c.name || "").toLowerCase().replace(/[^a-z]/g, "");
        return (cleanPhone && cleanPhone.includes(q)) || (cleanName && cleanName.includes(q));
      }) || null;
    },

    saveCustomer: function(customerData) {
      let list = getStorage(KEYS.CUSTOMERS, []);
      if (!customerData.id) {
        customerData.id = "CUST-" + Date.now().toString().slice(-6);
        customerData.firstVisit = customerData.firstVisit || new Date().toISOString().split('T')[0];
        customerData.totalSpend = customerData.totalSpend || 0;
        customerData.visitCount = customerData.visitCount || 0;
        customerData.visitHistory = customerData.visitHistory || [];
        customerData.branch_id = customerData.branch_id || DEFAULT_BRANCH_ID;
        list.unshift(customerData);
        this.logActivity("Tambah Pelanggan Baru", `Menambahkan profil ${customerData.name} (${customerData.phone})`);
      } else {
        const idx = list.findIndex(c => c.id === customerData.id);
        if (idx !== -1) {
          list[idx] = Object.assign({}, list[idx], customerData);
          this.logActivity("Perbarui Data Pelanggan", `Mengubah profil ${customerData.name}`);
        } else {
          list.unshift(customerData);
        }
      }
      setStorage(KEYS.CUSTOMERS, list);
      return customerData;
    },

    updateInternalNotes: function(customerId, notesText) {
      let list = getStorage(KEYS.CUSTOMERS, []);
      const item = list.find(c => c.id === customerId);
      if (item) {
        item.internalNotes = notesText;
        setStorage(KEYS.CUSTOMERS, list);
        this.logActivity("Update Internal Notes", `Catatan formula/preferensi ${item.name} diperbarui.`);
        return true;
      }
      return false;
    },

    recalculatePassiveCustomers: function() {
      const now = new Date();
      const thresholdDays = this.getConfig().passiveThresholdDays || 35;
      let list = getStorage(KEYS.CUSTOMERS, []);
      list.forEach(c => {
        if (c.lastVisit) {
          const diffDays = Math.floor((now - new Date(c.lastVisit)) / (1000 * 60 * 60 * 24));
          c.passiveFlag = diffDays > thresholdDays;
        }
      });
      setStorage(KEYS.CUSTOMERS, list);
    },
    // Point of Sale transactions
    createTransaction: function(txData) {
      let transactions = getStorage(KEYS.TRANSACTIONS, []);
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0].replace(/-/g, "");
      const countToday = transactions.filter(t => t.id && t.id.includes(dateStr)).length + 1;
      
      const receiptNum = `RCP-${dateStr}-${String(countToday).padStart(2, '0')}`;
      const txId = `TX-${dateStr}-${String(countToday).padStart(3, '0')}`;

      // Ambil rasio komisi barber
      const staffList = this.getStaff();
      const barber = staffList.find(s => s.id === txData.barberId || s.name === txData.barberName);
      const servRate = barber ? (barber.serviceCommissionRate || 40) : 40;
      const prodRate = barber ? (barber.productCommissionRate || 10) : 10;

      // Hitung komisi jasa dan produk
      let serviceSubtotal = 0;
      let productSubtotal = 0;
      (txData.items || []).forEach(it => {
        const itemTotal = (it.price || 0) * (it.qty || 1);
        if (it.type === 'product') {
          productSubtotal += itemTotal;
        } else {
          serviceSubtotal += itemTotal;
        }
      });

      const serviceComm = Math.round(serviceSubtotal * (servRate / 100));
      const productComm = Math.round(productSubtotal * (prodRate / 100));
      const tipAmount = Number(txData.tip || 0);
      const totalBarberComm = serviceComm + productComm + tipAmount;

      const record = {
        id: txId,
        receiptNumber: receiptNum,
        timestamp: Date.now(),
        dateFormatted: UtilitiesFormatDate(now),
        timeFormatted: UtilitiesFormatTime(now),
        customerId: txData.customerId || null,
        customerName: txData.customerName || "Walk-In Guest",
        customerPhone: txData.customerPhone || "-",
        barberId: txData.barberId,
        barberName: txData.barberName,
        items: txData.items || [],
        subtotal: txData.subtotal || 0,
        discount: txData.discount || 0,
        tip: tipAmount,
        total: txData.total || 0,
        paymentMethod: txData.paymentMethod || "Cash", // Cash | Transfer | QRIS Statis | Card
        cashTendered: txData.cashTendered || 0,
        changeDue: txData.changeDue || 0,
        barberServiceCommission: serviceComm,
        barberProductCommission: productComm,
        totalBarberCommission: totalBarberComm,
        status: "Paid",
        notes: txData.notes || "",
        branch_id: DEFAULT_BRANCH_ID
      };

      transactions.unshift(record);
      setStorage(KEYS.TRANSACTIONS, transactions);

      // Sinkronkan riwayat transaksi ke Profil CRM Pelanggan
      if (txData.customerPhone && txData.customerPhone !== "-") {
        this.syncTransactionToCustomer(record);
      }

      this.logActivity("Transaksi Kasir Baru", `${receiptNum} senilai Rp ${Number(record.total).toLocaleString('id-ID')} via ${record.paymentMethod} (${record.barberName})`);

      return record;
    },

    syncTransactionToCustomer: function(txRecord) {
      let customers = getStorage(KEYS.CUSTOMERS, []);
      let cust = customers.find(c => c.phone === txRecord.customerPhone || (txRecord.customerId && c.id === txRecord.customerId));
      
      const itemSummary = txRecord.items.map(i => i.name).join(', ');

      if (cust) {
        cust.totalSpend = (cust.totalSpend || 0) + txRecord.total;
        cust.visitCount = (cust.visitCount || 0) + 1;
        cust.lastVisit = new Date().toISOString().split('T')[0];
        cust.lastBarber = txRecord.barberName;
        cust.lastService = txRecord.items[0] ? txRecord.items[0].name : "The Cut";
        cust.passiveFlag = false;
        cust.visitHistory = cust.visitHistory || [];
        cust.visitHistory.unshift({
          date: new Date().toISOString().split('T')[0],
          receiptId: txRecord.receiptNumber,
          barberName: txRecord.barberName,
          serviceName: itemSummary,
          total: txRecord.total,
          tip: txRecord.tip,
          notes: txRecord.notes
        });
      } else {
        // Buat otomatis profil pelanggan baru jika belum terdaftar
        const newCust = {
          id: "CUST-" + Date.now().toString().slice(-6),
          name: txRecord.customerName,
          phone: txRecord.customerPhone,
          email: "",
          birthday: "",
          internalNotes: txRecord.notes || "Pelanggan baru dari kasir POS",
          tags: ["Baru"],
          totalSpend: txRecord.total,
          visitCount: 1,
          firstVisit: new Date().toISOString().split('T')[0],
          lastVisit: new Date().toISOString().split('T')[0],
          lastBarber: txRecord.barberName,
          lastService: itemSummary,
          passiveFlag: false,
          branch_id: DEFAULT_BRANCH_ID,
          visitHistory: [{
            date: new Date().toISOString().split('T')[0],
            receiptId: txRecord.receiptNumber,
            barberName: txRecord.barberName,
            serviceName: itemSummary,
            total: txRecord.total,
            tip: txRecord.tip,
            notes: txRecord.notes
          }]
        };
        customers.unshift(newCust);
      }
      setStorage(KEYS.CUSTOMERS, customers);
    },

    getTransactions: function(limit) {
      const list = getStorage(KEYS.TRANSACTIONS, []);
      return limit ? list.slice(0, limit) : list;
    },
    // Staff attendance and commission accounting
    getStaff: function() {
      return getStorage(KEYS.STAFF, SEED_STAFF);
    },

    toggleClockIn: function(staffId) {
      let staff = getStorage(KEYS.STAFF, []);
      const member = staff.find(s => s.id === staffId);
      if (member) {
        member.isClockedIn = !member.isClockedIn;
        const nowStr = UtilitiesFormatTime(new Date());
        if (member.isClockedIn) {
          member.clockInTime = nowStr;
        } else {
          member.lastClockOutTime = nowStr;
        }
        setStorage(KEYS.STAFF, staff);

        // Catat di log absensi
        let att = getStorage(KEYS.ATTENDANCE, []);
        att.unshift({
          timestamp: Date.now(),
          date: new Date().toISOString().split('T')[0],
          staffId: member.id,
          staffName: member.name,
          action: member.isClockedIn ? "Clock-In" : "Clock-Out",
          time: nowStr,
          branch_id: DEFAULT_BRANCH_ID
        });
        setStorage(KEYS.ATTENDANCE, att);

        this.logActivity("Absensi Staf", `${member.name} melakukan ${member.isClockedIn ? 'Clock-In (' + nowStr + ')' : 'Clock-Out (' + nowStr + ')'}`);
        return member;
      }
      return null;
    },

    getCommissionReport: function(period) {
      // Periode: 'today', 'week', 'month', 'all'
      const transactions = getStorage(KEYS.TRANSACTIONS, []);
      const staffList = this.getStaff();
      const now = new Date();

      const summary = {};
      staffList.forEach(s => {
        summary[s.id] = {
          staffId: s.id,
          staffName: s.name,
          role: s.role,
          serviceCommissionRate: s.serviceCommissionRate,
          productCommissionRate: s.productCommissionRate,
          totalServicesDone: 0,
          totalProductsSold: 0,
          serviceGrossRevenue: 0,
          productGrossRevenue: 0,
          totalGrossRevenue: 0,
          totalTipsReceived: 0,
          earnedServiceCommission: 0,
          earnedProductCommission: 0,
          totalPayoutCommission: 0
        };
      });

      transactions.forEach(tx => {
        const txDate = new Date(tx.timestamp);
        let match = true;

        if (period === 'today') {
          match = txDate.toDateString() === now.toDateString();
        } else if (period === 'week') {
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
          match = txDate >= sevenDaysAgo;
        } else if (period === 'month') {
          match = (txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear());
        }

        if (match && summary[tx.barberId]) {
          const s = summary[tx.barberId];
          (tx.items || []).forEach(it => {
            const itTotal = (it.price || 0) * (it.qty || 1);
            if (it.type === 'product') {
              s.totalProductsSold += (it.qty || 1);
              s.productGrossRevenue += itTotal;
            } else {
              s.totalServicesDone += (it.qty || 1);
              s.serviceGrossRevenue += itTotal;
            }
          });
          s.totalGrossRevenue += tx.subtotal;
          s.totalTipsReceived += (tx.tip || 0);
          s.earnedServiceCommission += (tx.barberServiceCommission || 0);
          s.earnedProductCommission += (tx.barberProductCommission || 0);
          s.totalPayoutCommission += (tx.totalBarberCommission || 0);
        }
      });

      return Object.values(summary);
    },
    // Analytics and business reporting
    getAnalyticsOverview: function() {
      const txs = getStorage(KEYS.TRANSACTIONS, []);
      const customers = getStorage(KEYS.CUSTOMERS, []);
      const now = new Date();

      let revenueToday = 0;
      let revenueThisWeek = 0;
      let revenueThisMonth = 0;
      let totalRevenue = 0;

      const hourlyBusy = {};
      for (let h = 10; h <= 20; h++) {
        hourlyBusy[h] = 0;
      }

      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);

      txs.forEach(t => {
        const d = new Date(t.timestamp);
        const amount = t.total || 0;
        totalRevenue += amount;

        if (d.toDateString() === now.toDateString()) {
          revenueToday += amount;
        }
        if (d >= sevenDaysAgo) {
          revenueThisWeek += amount;
        }
        if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
          revenueThisMonth += amount;
        }

        const hour = d.getHours();
        if (hourlyBusy[hour] !== undefined) {
          hourlyBusy[hour]++;
        }
      });

      // Retensi: Pelanggan Baru vs Pelanggan Kembali (Repeat)
      const repeatCustomersCount = customers.filter(c => (c.visitCount || 0) > 1).length;
      const singleVisitCustomersCount = customers.filter(c => (c.visitCount || 0) <= 1).length;
      const totalCust = customers.length || 1;
      const repeatRatePercent = Math.round((repeatCustomersCount / totalCust) * 100);

      return {
        revenueToday: revenueToday,
        revenueThisWeek: revenueThisWeek,
        revenueThisMonth: revenueThisMonth,
        totalRevenue: totalRevenue,
        totalTransactions: txs.length,
        totalCustomers: customers.length,
        repeatRatePercent: repeatRatePercent,
        repeatCustomersCount: repeatCustomersCount,
        newCustomersCount: singleVisitCustomersCount,
        hourlyBusy: hourlyBusy
      };
    },
    getConfig: function() {
      return getStorage(KEYS.CONFIG, {
        branchName: "Greenwood Barbers (Kota Baru Parahyangan)",
        branchId: DEFAULT_BRANCH_ID,
        activeRole: "Owner",
        passiveThresholdDays: 35,
        enableBarberTips: true
      });
    },

    saveConfig: function(updates) {
      let cfg = this.getConfig();
      cfg = Object.assign(cfg, updates);
      setStorage(KEYS.CONFIG, cfg);
      this.logActivity("Update Konfigurasi", `Pengaturan cabang/CRM diperbarui.`);
      return cfg;
    },

    setActiveRole: function(newRole) {
      let cfg = this.getConfig();
      cfg.activeRole = newRole;
      setStorage(KEYS.CONFIG, cfg);
      this.logActivity("Ganti Peran Akses", `Peran aktif diubah menjadi: ${newRole}`);
      return cfg;
    },
    // Role-based access control
    getRolePermissions: function() {
      const stored = getStorage(KEYS.ROLES, null);
      if (!stored) {
        setStorage(KEYS.ROLES, DEFAULT_ROLE_PERMISSIONS);
        return JSON.parse(JSON.stringify(DEFAULT_ROLE_PERMISSIONS));
      }
      // Ensure Cashier CRM & analytics_view adhere to strict business isolation
      if (stored.Cashier && stored.Cashier.permissions) {
        let updated = false;
        if (stored.Cashier.permissions.analytics_view === true) {
          stored.Cashier.permissions.analytics_view = false;
          updated = true;
        }
        if (stored.Cashier.permissions.crm_view === true) {
          stored.Cashier.permissions.crm_view = false;
          stored.Cashier.permissions.crm_notes = false;
          stored.Cashier.permissions.crm_phone = false;
          stored.Cashier.permissions.crm_create = false;
          updated = true;
        }
        if (updated) setStorage(KEYS.ROLES, stored);
      }
      return stored;
    },

    getRoleDetails: function(roleId) {
      const all = this.getRolePermissions();
      return all[roleId] || DEFAULT_ROLE_PERMISSIONS[roleId] || null;
    },

    saveRolePermissions: function(roleId, newPermissions) {
      const all = this.getRolePermissions();
      if (all[roleId]) {
        all[roleId].permissions = Object.assign({}, all[roleId].permissions, newPermissions);
        setStorage(KEYS.ROLES, all);
        this.logActivity("Update Hak Akses", `Matriks izin peran '${roleId}' berhasil diperbarui.`);
      }
      return all[roleId];
    },

    resetRolePermissionsToDefault: function(roleId) {
      const all = this.getRolePermissions();
      if (DEFAULT_ROLE_PERMISSIONS[roleId]) {
        all[roleId] = JSON.parse(JSON.stringify(DEFAULT_ROLE_PERMISSIONS[roleId]));
        setStorage(KEYS.ROLES, all);
        this.logActivity("Reset Hak Akses", `Matriks izin peran '${roleId}' dikembalikan ke setelan default.`);
      }
      return all[roleId];
    },

    getActiveRole: function() {
      return this.getConfig().activeRole || "Owner";
    },

    getRolePins: function() {
      let pins = getStorage(KEYS.ROLE_PINS, null);
      if (!pins) {
        const legacyPin = localStorage.getItem('greenwood_ledger_passkey_v1');
        pins = Object.assign({}, DEFAULT_ROLE_PINS);
        if (legacyPin && legacyPin.trim()) {
          pins.Owner = legacyPin.trim();
        }
        setStorage(KEYS.ROLE_PINS, pins);
      }
      return pins;
    },

    saveRolePins: function(pins) {
      const current = this.getRolePins();
      const updated = Object.assign({}, current, pins);
      setStorage(KEYS.ROLE_PINS, updated);
      if (updated.Owner) {
        localStorage.setItem('greenwood_ledger_passkey_v1', updated.Owner);
      }
      this.logActivity("Update PIN Peran", "PIN otentikasi peran staf diperbarui.");
      return updated;
    },

    verifyPinAndGetRole: function(enteredPin) {
      if (!enteredPin) return null;
      const clean = String(enteredPin).trim();
      const pins = this.getRolePins();
      const roles = ["Owner", "Manager", "Cashier", "Barber"];
      for (let r of roles) {
        if (pins[r] && clean === String(pins[r]).trim()) {
          return r;
        }
      }
      return null;
    },

    verifyRolePin: function(role, enteredPin) {
      if (!enteredPin || !role) return false;
      const clean = String(enteredPin).trim();
      const pins = this.getRolePins();
      return pins[role] && clean === String(pins[role]).trim();
    },

    hasPermission: function(permKey, roleOverride) {
      const role = roleOverride || this.getActiveRole();
      const all = this.getRolePermissions();
      const roleObj = all[role];
      if (!roleObj) return false;
      if (roleObj.isSuperAdmin) return true;
      return !!(roleObj.permissions && roleObj.permissions[permKey]);
    },
    logActivity: function(action, details) {
      let logs = getStorage(KEYS.LOGS, []);
      const cfg = this.getConfig();
      logs.unshift({
        timestamp: Date.now(),
        dateFormatted: UtilitiesFormatDate(new Date()) + " " + UtilitiesFormatTime(new Date()),
        actor: cfg.activeRole || "Owner",
        action: action,
        details: details,
        branch_id: DEFAULT_BRANCH_ID
      });
      // Simpan maksimal 100 log terakhir
      if (logs.length > 100) logs = logs.slice(0, 100);
      setStorage(KEYS.LOGS, logs);
    },

    getActivityLogs: function(limit) {
      const logs = getStorage(KEYS.LOGS, []);
      return limit ? logs.slice(0, limit) : logs;
    },
    // Google Calendar API sandbox simulation
    getSandboxState: function() {
      return getStorage(KEYS.SANDBOX, {
        enabled: false,
        mockDelayMs: 600,
        mockCalendarSuccess: true,
        mockWaSuccess: true,
        lastSimulationPayload: null,
        lastSimulationResponse: null
      });
    },

    setSandboxState: function(state) {
      setStorage(KEYS.SANDBOX, state);
      this.logActivity("Konfigurasi Sandbox", `Mode simulasi API diatur: ${state.enabled ? 'AKTIF (Sandbox)' : 'NON-AKTIF (Live Webhook)'}`);
      return state;
    },

    simulateGoogleApiDispatch: function(payload) {
      const state = this.getSandboxState();
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockResponse = {
            status: state.mockCalendarSuccess ? "success" : "error",
            sandboxMode: true,
            executionTimestamp: new Date().toISOString(),
            eventId: state.mockCalendarSuccess ? "sandbox_gcal_evt_" + Date.now() : null,
            calendarMessage: state.mockCalendarSuccess ? "Google Calendar event created successfully (SIMULATED)" : "Calendar quota limit exceeded (SIMULATED ERROR)",
            whatsappStatus: state.mockWaSuccess ? "WhatsApp Sent (200 - SIMULATED)" : "WhatsApp Gateway Offline (SIMULATED WARNING)",
            notes: "Eksekusi berhasil disimulasikan di Sandbox tanpa memotong kuota gateway atau mengubah kalender produksi."
          };
          
          state.lastSimulationPayload = payload;
          state.lastSimulationResponse = mockResponse;
          this.setSandboxState(state);

          this.logActivity("Sandbox Simulation Dispatch", `Menguji simulasi webhook untuk kode: ${payload.bookingCode || 'TEST-RUN'}`);
          resolve(mockResponse);
        }, state.mockDelayMs || 500);
      });
    }
  };

  // Helper Format Tanggal & Waktu Lokal WIB
  function UtilitiesFormatDate(d) {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  function UtilitiesFormatTime(d) {
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm} WIB`;
  }
  window.GreenwoodAdminDB = GreenwoodAdminDB;
  GreenwoodAdminDB.init();

})(window);
