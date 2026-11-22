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
    CUSTOMERS: DB_PREFIX + 'customers_v2',
    CUSTOMERS_LEGACY: DB_PREFIX + 'customers_v1',
    TRANSACTIONS: DB_PREFIX + 'transactions_v1',
    STAFF: DB_PREFIX + 'staff_v1',
    ATTENDANCE: DB_PREFIX + 'attendance_v1',
    LOGS: DB_PREFIX + 'activity_logs_v1',
    CONFIG: DB_PREFIX + 'system_config_v1',
    SANDBOX: DB_PREFIX + 'sandbox_state_v1',
    ROLES: DB_PREFIX + 'role_permissions_v3',
    ROLE_PINS: DB_PREFIX + 'role_pins_v1',
    BARBER_PINS: DB_PREFIX + 'barber_pins_v1',
    INVENTORY: DB_PREFIX + 'inventory_v1',
    SHIFTS: DB_PREFIX + 'shifts_v1',
    ACTIVE_SHIFT: DB_PREFIX + 'active_shift_v1'
  };

  const DEFAULT_ROLE_PINS = {
    Owner: "2050",
    Manager: "3030",
    Cashier: "1010",
    Barber: "0000"
  };

  const DEFAULT_BARBER_PINS = {
    "barber-bramantyo": "0001",
    "barber-rian": "0002",
    "barber-dimas": "0003",
    "barber-farhan": "0004",
    "barber-aldi": "0005"
  };

  const DEFAULT_BRANCH_ID = 'kbp-main'; // Kota Baru Parahyangan Main Branch

  // Initial Seed Inventory for Grooming Apothecary Products (Stock & Thresholds)
  const SEED_INVENTORY = [
    { id: "prd-shave-cream", name: "Mayfair Sandalwood Shaving Cream", category: "Apothecary", stock: 24, minStockAlert: 5, unit: "tub", price: 220000 },
    { id: "prd-pre-shave", name: "Botanical Pre-Shave Glaze Oil", category: "Apothecary", stock: 18, minStockAlert: 4, unit: "dropper", price: 175000 },
    { id: "prd-brush", name: "Silvertip Badger Shaving Brush", category: "Tools", stock: 8, minStockAlert: 2, unit: "pcs", price: 350000 },
    { id: "prd-balm", name: "Post-Shave Soothing Relief Balm", category: "Apothecary", stock: 15, minStockAlert: 3, unit: "jar", price: 185000 },
    { id: "prd-tonic", name: "Botanical Scalp Tonic", category: "Apothecary", stock: 20, minStockAlert: 5, unit: "dropper", price: 195000 },
    { id: "prd-pomade", name: "Classic Matte Dressing Pomade", category: "Styling", stock: 30, minStockAlert: 6, unit: "jar", price: 160000 }
  ];

  // Initial seed dataset
    const SEED_CUSTOMERS = [
    {
      id: "CUST-001",
      name: "Bpk. Alexander Wijaya",
      howToAddress: "Bpk. Alexander",
      phone: "081234567890",
      email: "alexander.w@example.com",
      birthday: "1988-06-15",
      internalNotes: "Fade #2 samping, trim jenggot tipis natural. Suka kopi hitam dingin tanpa gula. Langganan Bramantyo.",
      managerNotes: "Klien eksekutif korporat mitra bisnis pemilik, prioritaskan kenyamanan terbaik.",
      tags: ["VIP", "Reguler"],
      totalSpend: 1450000,
      visitCount: 5,
      firstVisit: "2026-08-10",
      lastVisit: "2026-11-04",
      lastBarber: "Bramantyo",
      lastService: "The Cut",
      passiveFlag: false,
      branch_id: DEFAULT_BRANCH_ID,
      hospitality: {
        drinkPreference: "Iced black coffee no sugar (Kopi Hitam Dingin tanpa gula)",
        chatPreference: "quiet",
        preferredBarber: "Bramantyo",
        sensitivities: "Kulit leher sensitif terhadap pisau razor langsung. Wajib foam hangat & clipper guard 0.",
        specialNotes: "Selalu terburu-buru saat hari kerja (urgent weekday meeting). Harap tepat waktu."
      },
      consent: {
        referencePhotos: true,
        portfolioUse: false,
        agreedAt: "2026-08-10T10:30:00.000Z",
        wordingVersion: "UU-PDP-2026.1",
        agreedWithStaffId: "barber-bramantyo",
        withdrawnDate: null
      },
      rapportTopics: ["Sepak Bola (Persib)", "Bersepeda / Cycling", "Properti & Real Estate"],
      conversationNotes: [
        {
          id: "CN-001",
          authorBarberId: "barber-bramantyo",
          authorBarberName: "Bramantyo",
          layer: "shared",
          text: "Resep potongan rapi, es kopi hitam tanpa gula, lebih menyukai suasana tenang.",
          followUp: false,
          followUpText: "",
          isDone: false,
          createdAt: "2026-11-04T10:00:00.000Z",
          expiresAt: null
        },
        {
          id: "CN-002",
          authorBarberId: "barber-bramantyo",
          authorBarberName: "Bramantyo",
          layer: "personal",
          text: "Mengantar keluarga liburan ke Bali pada 15 Des, tanyakan kesan dan pengalamannya.",
          followUp: true,
          followUpText: "Tanyakan pengalaman liburan keluarga ke Bali",
          isDone: false,
          createdAt: "2026-11-04T10:15:00.000Z",
          expiresAt: "2027-01-03T10:15:00.000Z" // 60 days
        }
      ],
      visitHistory: [
        {
          visitId: "VST-20261104-01",
          date: "2026-11-04",
          receiptId: "RCP-20261104-01",
          barberName: "Bramantyo",
          barberId: "barber-bramantyo",
          chair: "Kursi 1",
          serviceName: "The Cut",
          total: 350000,
          tip: 50000,
          rebookedAtCheckout: true,
          rebookedDate: "2026-12-09",
          notes: "Persiapan gala dinner",
          cutRecord: {
            styleName: "Textured crop, mid fade",
            sidesBackGuard: "Guard #2 to #0.5, mid fade",
            fadeHeightType: "Mid, skin / drop / taper",
            topLengthTechnique: "4 cm, point-cut texture",
            fringePart: "Forward fringe, no part",
            neckline: "Tapered natural",
            beard: "Trim #3, sharp cheek line",
            productsUsed: "Matte clay, sea-salt spray",
            styling: "Blow-dried forward, rough finish",
            hairNotes: "Cowlick at the crown (pusar rambut ganda), sisakan 1 cm lebih panjang di area ubun-ubun agar tidak jabrik",
            verdict: "loved",
            nextTimeNotes: "Go 0.5 cm shorter on top",
            photos: {
              front: "assets/cuts/cust001_front.svg",
              left: "assets/cuts/cust001_left.svg",
              right: "assets/cuts/cust001_right.svg",
              back: "assets/cuts/cust001_back.svg",
              top: ""
            },
            isComplete: true
          }
        },
        {
          visitId: "VST-20261012-03",
          date: "2026-10-12",
          receiptId: "RCP-20261012-03",
          barberName: "Bramantyo",
          barberId: "barber-bramantyo",
          chair: "Kursi 1",
          serviceName: "The Cut & Shave",
          total: 210000,
          tip: 30000,
          rebookedAtCheckout: true,
          rebookedDate: "2026-11-04",
          notes: "Rapihkan cambang",
          cutRecord: {
            styleName: "Classic Side Part, Low Taper",
            sidesBackGuard: "Guard #3 to #1, taper fade",
            fadeHeightType: "Low taper",
            topLengthTechnique: "5 cm, scissor over comb",
            fringePart: "Side part kiri, combed back",
            neckline: "Blocked / square",
            beard: "Clean shaven with hot towel",
            productsUsed: "Water-based Pomade High Shine",
            styling: "Side parted comb, neat look",
            hairNotes: "Sisakan panjang di atas pusar rambut",
            verdict: "fine",
            nextTimeNotes: "Coba textured crop lebih modern di pertemuan berikutnya",
            photos: {
              front: "assets/cuts/cust001_oct_front.svg",
              left: "assets/cuts/cust001_oct_left.svg",
              right: "assets/cuts/cust001_oct_right.svg",
              back: "assets/cuts/cust001_oct_back.svg",
              top: ""
            },
            isComplete: true
          }
        },
        {
          visitId: "VST-20260918-05",
          date: "2026-09-18",
          receiptId: "RCP-20260918-05",
          barberName: "Bramantyo",
          barberId: "barber-bramantyo",
          chair: "Kursi 1",
          serviceName: "The Ritual",
          total: 350000,
          tip: 50000,
          rebookedAtCheckout: true,
          rebookedDate: "2026-10-12",
          notes: "Creambath santai"
        },
        {
          visitId: "VST-20260830-02",
          date: "2026-08-30",
          receiptId: "RCP-20260830-02",
          barberName: "Bramantyo",
          barberId: "barber-bramantyo",
          chair: "Kursi 1",
          serviceName: "The Cut",
          total: 150000,
          tip: 20000,
          rebookedAtCheckout: true,
          rebookedDate: "2026-09-18",
          notes: "Quick trim"
        },
        {
          visitId: "VST-20260810-01",
          date: "2026-08-10",
          receiptId: "RCP-20260810-01",
          barberName: "Bramantyo",
          barberId: "barber-bramantyo",
          chair: "Kursi 1",
          serviceName: "The Ritual",
          total: 390000,
          tip: 40000,
          rebookedAtCheckout: true,
          rebookedDate: "2026-08-30",
          notes: "Kunjungan perdana"
        }
      ]
    },
    {
      id: "CUST-002",
      name: "dr. Kevin Pratama",
      howToAddress: "dr. Kevin",
      phone: "081987654321",
      email: "dr.kevin.p@example.com",
      birthday: "1992-11-20",
      internalNotes: "Taper low fade, gunting atas sisir samping (side part klasik). Kulit kepala sensitif, gunakan handuk hangat suhu sedang.",
      managerNotes: "Dokter spesialis bedah saraf, jadwal sering mendadak. Fleksibel jika mundur 15 menit.",
      tags: ["Reguler"],
      totalSpend: 630000,
      visitCount: 3,
      firstVisit: "2026-09-02",
      lastVisit: "2026-10-28",
      lastBarber: "Rian Pratama",
      lastService: "The Cut & Shave",
      passiveFlag: false,
      branch_id: DEFAULT_BRANCH_ID,
      hospitality: {
        drinkPreference: "Teh Hijau Panas Tanpa Gula (Hot Green Tea)",
        chatPreference: "chatty",
        preferredBarber: "Rian Pratama",
        sensitivities: "Kulit kepala mudah kering, hindari tonik beralkohol tinggi.",
        specialNotes: "Jadwal praktek rumah sakit padat, konfirmasi via WhatsApp sebelum kedatangan."
      },
      consent: {
        referencePhotos: true,
        portfolioUse: true,
        agreedAt: "2026-09-02T14:00:00.000Z",
        wordingVersion: "UU-PDP-2026.1",
        agreedWithStaffId: "barber-rian",
        withdrawnDate: null
      },
      rapportTopics: ["Dunia Medis / Bedah", "Koleksi Jam Tangan", "Lari Marathon"],
      conversationNotes: [
        {
          id: "CN-003",
          authorBarberId: "barber-rian",
          authorBarberName: "Rian Pratama",
          layer: "shared",
          text: "Teh hijau hangat, senang diskusi santai tentang olahraga lari.",
          followUp: false,
          followUpText: "",
          isDone: false,
          createdAt: "2026-10-28T14:30:00.000Z",
          expiresAt: null
        },
        {
          id: "CN-004",
          authorBarberId: "barber-rian",
          authorBarberName: "Rian Pratama",
          layer: "personal",
          text: "Baru menyelesaikan Bandung Half Marathon, tanyakan perolehan waktu personal best.",
          followUp: true,
          followUpText: "Tanyakan hasil lari Bandung Half Marathon",
          isDone: false,
          createdAt: "2026-10-28T14:35:00.000Z",
          expiresAt: "2026-12-27T14:35:00.000Z"
        }
      ],
      visitHistory: [
        {
          visitId: "VST-20261028-02",
          date: "2026-10-28",
          receiptId: "RCP-20261028-02",
          barberName: "Rian Pratama",
          barberId: "barber-rian",
          chair: "Kursi 2",
          serviceName: "The Cut & Shave",
          total: 210000,
          tip: 25000,
          rebookedAtCheckout: true,
          rebookedDate: "2026-11-26",
          notes: "Konsultasi pomade matte",
          cutRecord: {
            styleName: "Side Part Taper Fade",
            sidesBackGuard: "Guard #2 to #1, low taper",
            fadeHeightType: "Low taper",
            topLengthTechnique: "5 cm, scissor point cut",
            fringePart: "Side swept right",
            neckline: "Tapered natural",
            beard: "Clean shaven with warm foam",
            productsUsed: "Water-based Matte Pomade",
            styling: "Combed side, slight volume",
            hairNotes: "Rambut lurus jatuh rapi",
            verdict: "loved",
            nextTimeNotes: "Pertahankan panjang poni 5 cm",
            photos: {
              front: "assets/cuts/cust001_front.svg",
              left: "assets/cuts/cust001_left.svg",
              right: "assets/cuts/cust001_right.svg",
              back: "assets/cuts/cust001_back.svg",
              top: ""
            },
            isComplete: true
          }
        },
        {
          visitId: "VST-20260929-04",
          date: "2026-09-29",
          receiptId: "RCP-20260929-04",
          barberName: "Rian Pratama",
          barberId: "barber-rian",
          chair: "Kursi 2",
          serviceName: "The Cut",
          total: 150000,
          tip: 20000,
          rebookedAtCheckout: false,
          notes: "Side part klasik"
        },
        {
          visitId: "VST-20260902-01",
          date: "2026-09-02",
          receiptId: "RCP-20260902-01",
          barberName: "Rian Pratama",
          barberId: "barber-rian",
          chair: "Kursi 2",
          serviceName: "The Cut & Shave",
          total: 270000,
          tip: 30000,
          rebookedAtCheckout: true,
          notes: "Addon hot towel"
        }
      ]
    },
    {
      id: "CUST-003",
      name: "Bpk. Hendra Gunawan",
      howToAddress: "Bpk. Hendra",
      phone: "081377889900",
      email: "hendra.kbp@example.com",
      birthday: "1975-03-08",
      internalNotes: "Scissor cut full (tanpa clipper), natural finish. Selalu minta teh hangat camomile.",
      managerNotes: "Pengusaha tekstil lokal, langganan VIP sejak pembukaan toko.",
      tags: ["VIP", "Pasif"],
      totalSpend: 1050000,
      visitCount: 3,
      firstVisit: "2026-07-15",
      lastVisit: "2026-09-10",
      lastBarber: "Dimas Setiawan",
      lastService: "The Ritual",
      passiveFlag: true,
      branch_id: DEFAULT_BRANCH_ID,
      hospitality: {
        drinkPreference: "Teh Chamomile Hangat Tanpa Gula",
        chatPreference: "quiet",
        preferredBarber: "Dimas Setiawan",
        sensitivities: "Kulit sensitif pisau cukur, jangan gunakan pisau tajam tanpa pelumas tebal.",
        specialNotes: "Lebih menyukai potongan klasik gunting tangan (scissor cut)."
      },
      consent: {
        referencePhotos: true,
        portfolioUse: false,
        agreedAt: "2026-07-15T11:00:00.000Z",
        wordingVersion: "UU-PDP-2026.1",
        agreedWithStaffId: "barber-dimas",
        withdrawnDate: null
      },
      rapportTopics: ["Bisnis Manufaktur", "Tanaman Hias & Bonsai", "Golf"],
      conversationNotes: [
        {
          id: "CN-005",
          authorBarberId: "barber-dimas",
          authorBarberName: "Dimas Setiawan",
          layer: "shared",
          text: "Teh chamomile hangat, scissor cut tradisional tanpa mesin clipper.",
          followUp: false,
          followUpText: "",
          isDone: false,
          createdAt: "2026-09-10T11:30:00.000Z",
          expiresAt: null
        }
      ],
      visitHistory: [
        {
          visitId: "VST-20260910-02",
          date: "2026-09-10",
          receiptId: "RCP-20260910-02",
          barberName: "Dimas Setiawan",
          barberId: "barber-dimas",
          chair: "Kursi 3",
          serviceName: "The Ritual",
          total: 350000,
          tip: 50000,
          rebookedAtCheckout: false,
          notes: "Perawatan lengkap",
          cutRecord: {
            styleName: "Classic Scissor Cut",
            sidesBackGuard: "Scissor over comb (No clipper)",
            fadeHeightType: "Natural taper",
            topLengthTechnique: "6 cm, layered scissor",
            fringePart: "Slick back natural",
            neckline: "Natural tapered",
            beard: "Natural trim",
            productsUsed: "Hair Tonic & Light Grooming Cream",
            styling: "Finger combed natural",
            hairNotes: "Rambut sedikit ikal di ujung",
            verdict: "loved",
            nextTimeNotes: "Rapihkan bagian leher saja",
            photos: {
              front: "assets/cuts/cust001_oct_front.svg",
              left: "assets/cuts/cust001_oct_left.svg",
              right: "assets/cuts/cust001_oct_right.svg",
              back: "assets/cuts/cust001_oct_back.svg",
              top: ""
            },
            isComplete: true
          }
        },
        {
          visitId: "VST-20260812-01",
          date: "2026-08-12",
          receiptId: "RCP-20260812-01",
          barberName: "Dimas Setiawan",
          barberId: "barber-dimas",
          chair: "Kursi 3",
          serviceName: "The Ritual",
          total: 350000,
          tip: 50000,
          rebookedAtCheckout: true,
          notes: "Scissor cut"
        },
        {
          visitId: "VST-20260715-03",
          date: "2026-07-15",
          receiptId: "RCP-20260715-03",
          barberName: "Dimas Setiawan",
          barberId: "barber-dimas",
          chair: "Kursi 3",
          serviceName: "The Ritual",
          total: 350000,
          tip: 50000,
          rebookedAtCheckout: true,
          notes: "Kunjungan pertama"
        }
      ]
    },
    {
      id: "CUST-004",
      name: "Farid Nurhadi",
      howToAddress: "Mas Farid",
      phone: "087811223344",
      email: "farid.n@example.com",
      birthday: "1998-11-12",
      internalNotes: "Textured crop, taper fade #1. Minat beli pomade matte water-based.",
      managerNotes: "Anggota komunitas kreatif Kota Baru Parahyangan.",
      tags: ["Ulang Tahun Bulan Ini", "Reguler"],
      totalSpend: 360000,
      visitCount: 2,
      firstVisit: "2026-10-05",
      lastVisit: "2026-11-06",
      lastBarber: "Dimas Setiawan",
      lastService: "The Cut",
      passiveFlag: false,
      branch_id: DEFAULT_BRANCH_ID,
      hospitality: {
        drinkPreference: "Air Mineral Dingin (Chilled Mineral Water)",
        chatPreference: "chatty",
        preferredBarber: "Dimas Setiawan",
        sensitivities: "Tidak ada sensitivitas produk khusus.",
        specialNotes: "Menyukai tren gaya rambut modern eropa."
      },
      consent: {
        referencePhotos: true,
        portfolioUse: true,
        agreedAt: "2026-10-05T15:00:00.000Z",
        wordingVersion: "UU-PDP-2026.1",
        agreedWithStaffId: "barber-dimas",
        withdrawnDate: null
      },
      rapportTopics: ["Desain Grafis / UI/UX", "Kopi Spesialti", "Musik Indie"],
      conversationNotes: [
        {
          id: "CN-006",
          authorBarberId: "barber-dimas",
          authorBarberName: "Dimas Setiawan",
          layer: "shared",
          text: "Textured crop dengan fade tinggi, air mineral dingin.",
          followUp: false,
          followUpText: "",
          isDone: false,
          createdAt: "2026-11-06T15:30:00.000Z",
          expiresAt: null
        }
      ],
      visitHistory: [
        {
          visitId: "VST-20261106-03",
          date: "2026-11-06",
          receiptId: "RCP-20261106-03",
          barberName: "Dimas Setiawan",
          barberId: "barber-dimas",
          chair: "Kursi 3",
          serviceName: "The Cut + Pomade",
          total: 210000,
          tip: 20000,
          rebookedAtCheckout: true,
          rebookedDate: "2026-12-04",
          notes: "Potong + beli pomade",
          cutRecord: {
            styleName: "French Textured Crop",
            sidesBackGuard: "Guard #1.5 to skin fade",
            fadeHeightType: "High skin drop fade",
            topLengthTechnique: "3.5 cm, blunt point cut",
            fringePart: "Straight forward blunt fringe",
            neckline: "Blocked clean",
            beard: "Clean shaven",
            productsUsed: "Styling Hair Powder & Matte Clay",
            styling: "Messy forward matte finish",
            hairNotes: "Tekstur tebal mudah ditata",
            verdict: "loved",
            nextTimeNotes: "Tetap dengan model ini",
            photos: {
              front: "assets/cuts/cust001_front.svg",
              left: "assets/cuts/cust001_left.svg",
              right: "assets/cuts/cust001_right.svg",
              back: "assets/cuts/cust001_back.svg",
              top: ""
            },
            isComplete: true
          }
        },
        {
          visitId: "VST-20261005-02",
          date: "2026-10-05",
          receiptId: "RCP-20261005-02",
          barberName: "Dimas Setiawan",
          barberId: "barber-dimas",
          chair: "Kursi 3",
          serviceName: "The Cut",
          total: 150000,
          tip: 15000,
          rebookedAtCheckout: true,
          notes: "Textured crop"
        }
      ]
    },
    {
      id: "CUST-005",
      name: "Tomy Sugiarto",
      howToAddress: "Mas Tomy",
      phone: "085699887766",
      email: "tomy.s@example.com",
      birthday: "1995-04-18",
      internalNotes: "Buzz cut fade #1. Cepat, praktis, tanpa cuci rambut berlama-lama.",
      managerNotes: "Pelanggan express, prioritaskan selesai tepat 25 menit.",
      tags: ["Reguler"],
      totalSpend: 150000,
      visitCount: 1,
      firstVisit: "2026-11-01",
      lastVisit: "2026-11-01",
      lastBarber: "Bramantyo",
      lastService: "The Cut",
      passiveFlag: false,
      branch_id: DEFAULT_BRANCH_ID,
      hospitality: {
        drinkPreference: "Kopi Hitam Dingin",
        chatPreference: "quiet",
        preferredBarber: "Bramantyo",
        sensitivities: "Kulit kepala berminyak, gunakan tonik mint dingin.",
        specialNotes: "Selalu pesan slot terawal pagi jam 10:00."
      },
      consent: {
        referencePhotos: true,
        portfolioUse: false,
        agreedAt: "2026-11-01T10:15:00.000Z",
        wordingVersion: "UU-PDP-2026.1",
        agreedWithStaffId: "barber-bramantyo",
        withdrawnDate: null
      },
      rapportTopics: ["Otomotif & Motor Klasik", "Gym / Fitness"],
      conversationNotes: [
        {
          id: "CN-007",
          authorBarberId: "barber-bramantyo",
          authorBarberName: "Bramantyo",
          layer: "shared",
          text: "Buzz cut fade #1, kopi hitam dingin.",
          followUp: false,
          followUpText: "",
          isDone: false,
          createdAt: "2026-11-01T10:30:00.000Z",
          expiresAt: null
        }
      ],
      visitHistory: [
        {
          visitId: "VST-20261101-01",
          date: "2026-11-01",
          receiptId: "RCP-20261101-01",
          barberName: "Bramantyo",
          barberId: "barber-bramantyo",
          chair: "Kursi 1",
          serviceName: "The Cut",
          total: 150000,
          tip: 20000,
          rebookedAtCheckout: false,
          notes: "Kunjungan pertama",
          cutRecord: {
            styleName: "Buzz Cut Taper",
            sidesBackGuard: "Guard #1 to skin fade",
            fadeHeightType: "Mid skin fade",
            topLengthTechnique: "Guard #3 buzz crop",
            fringePart: "Micro fringe",
            neckline: "Natural tapered",
            beard: "Stubble 3-day",
            productsUsed: "Cooling Scalp Tonic",
            styling: "Natural wash & go",
            hairNotes: "Pertumbuhan rambut cepat",
            verdict: "loved",
            nextTimeNotes: "Potong rutin per 3 minggu",
            photos: {
              front: "assets/cuts/cust001_front.svg",
              left: "assets/cuts/cust001_left.svg",
              right: "assets/cuts/cust001_right.svg",
              back: "assets/cuts/cust001_back.svg",
              top: ""
            },
            isComplete: true
          }
        }
      ]
    }
  ];

  const SEED_STAFF = [
    {
      id: "barber-bramantyo",
      name: "Bramantyo",
      role: "Barber",
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
      role: "Barber",
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
      role: "Barber",
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
      description: "Memiliki wewenang tertinggi untuk seluruh data omzet finansial, audit trail, resep pangkas kartu tamu, pengaturan peran dan ekspor CSV akuntan.",
      isSuperAdmin: true,
      permissions: {
        pos_view: true,
        pos_create: true,
        pos_discount: true,
        pos_tip: true,
        pos_void: true,
        pos_inventory: true,
        pos_shift: true,
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
        settings_roles: true,
        // Client Spec: Guest Card & UU PDP Access
        guest_card_view: true,
        guest_card_photo_upload: true,
        guest_card_photo_delete: true,
        guest_card_hospitality_edit: true,
        guest_card_rapport_add: true,
        guest_card_personal_notes: true,
        guest_card_manager_notes: true,
        team_gainshare_view: true
      }
    },
    Manager: {
      id: "Manager",
      name: "Manager",
      badge: "Store Manager",
      title: "👔 Store Manager (Kepala Toko)",
      subtitle: "Operasional Kasir, Staf & Komisi",
      description: "Mengawasi operasional harian kasir, menyetujui diskon & void transaksi, kartu tamu, kelola jadwal shift absensi, serta rekap komisi akuntan.",
      isSuperAdmin: false,
      permissions: {
        pos_view: true,
        pos_create: true,
        pos_discount: true,
        pos_tip: true,
        pos_void: true,
        pos_inventory: true,
        pos_shift: true,
        crm_view: true,
        crm_notes: true,
        crm_phone: true,
        crm_create: true,
        crm_export: false, // Client spec: Reports only (no CSV export)
        booking_view: true,
        booking_create: true,
        booking_edit: true,
        booking_cancel: true,
        staff_clockin: true,
        staff_comm_self: true,
        staff_comm_all: true,
        staff_comm_export: true,
        analytics_view: true,
        analytics_export: false, // Client spec: Reports only
        settings_sandbox: true,
        settings_passkey: false,
        settings_roles: false,
        // Client Spec: Guest Card & UU PDP Access
        guest_card_view: true,
        guest_card_photo_upload: true,
        guest_card_photo_delete: true, // logged
        guest_card_hospitality_edit: true,
        guest_card_rapport_add: true,
        guest_card_personal_notes: true, // audit only, logged
        guest_card_manager_notes: true,
        team_gainshare_view: true
      }
    },
    Cashier: {
      id: "Cashier",
      name: "Cashier",
      badge: "Front Desk",
      title: "💳 Kasir (Front of House)",
      subtitle: "POS Kasir, Order & Kartu Tamu",
      description: "Operasional meja depan: melayani checkout POS, jadwal reservasi semua kursi, buka kartu tamu & hospitalitas minuman, dan rebooking tamu.",
      isSuperAdmin: false,
      permissions: {
        pos_view: true,
        pos_create: true,
        pos_discount: false,
        pos_tip: true,
        pos_void: false,
        pos_inventory: false,
        pos_shift: true,
        crm_view: true, // Client spec: Cashier sees Guest Cards (all chairs)
        crm_notes: true,
        crm_phone: true, // Client spec: Cashier can view phone for contact
        crm_create: true,
        crm_export: false,
        booking_view: true, // All chairs
        booking_create: true,
        booking_edit: true,
        booking_cancel: false,
        staff_clockin: true,
        staff_comm_self: false,
        staff_comm_all: false,
        staff_comm_export: false,
        analytics_view: false,
        analytics_export: false,
        settings_sandbox: false,
        settings_passkey: false,
        settings_roles: false,
        // Client Spec: Guest Card & UU PDP Access
        guest_card_view: true, // All chairs
        guest_card_photo_upload: false, // Kasir tidak upload foto pangkas di cermin
        guest_card_photo_delete: false,
        guest_card_hospitality_edit: true, // Kasir mencatat pesanan minuman & preferensi
        guest_card_rapport_add: false, // Read only
        guest_card_personal_notes: false, // Dilarang mengintip obrolan privat barber
        guest_card_manager_notes: false,
        team_gainshare_view: true // Client spec: team gainshare visible to all
      }
    },
    Barber: {
      id: "Barber",
      name: "Barber",
      badge: "Stylist",
      title: "💈 Barber / Hair Stylist (Station)",
      subtitle: "Cermin Konsultasi 10 Detik & Komisi Pribadi",
      description: "Akses teknis cermin pangkas (station mirror): konsultasi resep kartu tamu, unggah foto 4 sudut berizin UU PDP, catat topik obrolan, dan pantau komisi mandiri.",
      isSuperAdmin: false,
      permissions: {
        pos_view: false, // Barber tidak melayani kasir
        pos_create: false,
        pos_discount: false,
        pos_tip: false,
        pos_void: false,
        pos_inventory: false,
        pos_shift: false,
        crm_view: true, // Client spec: Barber accesses Guest Cards for own chair & served guests
        crm_notes: false,
        crm_phone: false, // Client spec: Phone is masked / hidden for Barber
        crm_create: false,
        crm_export: false,
        booking_view: true, // Own chair, today & tomorrow
        booking_create: false,
        booking_edit: false,
        booking_cancel: false,
        staff_clockin: true,
        staff_comm_self: true, // Komisi pribadi
        staff_comm_all: false,
        staff_comm_export: false,
        analytics_view: false,
        analytics_export: false,
        settings_sandbox: false,
        settings_passkey: false,
        settings_roles: false,
        // Client Spec: Guest Card & UU PDP Access
        guest_card_view: true, // Own chair / served guests
        guest_card_photo_upload: true, // Ya, dengan consent on file
        guest_card_photo_delete: false, // Barber tidak boleh hapus foto
        guest_card_hospitality_edit: false, // Read only
        guest_card_rapport_add: true, // Read and add topics
        guest_card_personal_notes: true, // Own notes only
        guest_card_manager_notes: false,
        team_gainshare_view: true // Client spec: gainshare visible to all
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
      // Auto-migrate legacy customers to customers_v2 with Guest Card structure
      if (!localStorage.getItem(KEYS.CUSTOMERS)) {
        const legacy = localStorage.getItem(KEYS.CUSTOMERS_LEGACY);
        if (legacy) {
          try {
            const parsed = JSON.parse(legacy);
            // Merge seed enhancements for demo customers
            const merged = SEED_CUSTOMERS.map(seed => {
              const match = parsed.find(p => p.id === seed.id);
              return match ? Object.assign({}, seed, match, {
                hospitality: Object.assign({}, seed.hospitality, match.hospitality || {}),
                consent: Object.assign({}, seed.consent, match.consent || {}),
                rapportTopics: match.rapportTopics || seed.rapportTopics,
                conversationNotes: match.conversationNotes || seed.conversationNotes,
                visitHistory: (match.visitHistory && match.visitHistory.length > 0) ? match.visitHistory.map((v, idx) => {
                  const seedV = (seed.visitHistory && seed.visitHistory[idx]) ? seed.visitHistory[idx] : {};
                  return Object.assign({}, seedV, v, { cutRecord: v.cutRecord || seedV.cutRecord });
                }) : seed.visitHistory
              }) : seed;
            });
            setStorage(KEYS.CUSTOMERS, merged);
          } catch(e) {
            setStorage(KEYS.CUSTOMERS, SEED_CUSTOMERS);
          }
        } else {
          setStorage(KEYS.CUSTOMERS, SEED_CUSTOMERS);
        }
      }
      if (!localStorage.getItem(KEYS.TRANSACTIONS)) {
        setStorage(KEYS.TRANSACTIONS, SEED_TRANSACTIONS);
      }
      if (!localStorage.getItem(KEYS.STAFF)) {
        setStorage(KEYS.STAFF, SEED_STAFF);
      }

      if (!localStorage.getItem(KEYS.CONFIG)) {
        setStorage(KEYS.CONFIG, {
          shopName: "Greenwood Barbers",
          branchName: "Kota Baru Parahyangan (KBP)",
          branchId: DEFAULT_BRANCH_ID,
          passiveThresholdDays: 35,
          defaultServiceCommission: 45,
          defaultProductCommission: 10,
          gcalSyncEnabled: true,
          waReminderEnabled: true
        });
      }
      if (!localStorage.getItem(KEYS.SANDBOX)) {
        setStorage(KEYS.SANDBOX, {
          enabled: false,
          mockDelayMs: 600,
          mockCalendarSuccess: true,
          mockWaSuccess: true,
          lastSimulationPayload: null,
          lastSimulationResponse: null
        });
      }
      // Always ensure latest Role Access Matrix v3
      setStorage(KEYS.ROLES, DEFAULT_ROLE_PERMISSIONS);

      if (!localStorage.getItem(KEYS.ROLE_PINS)) {
        const legacyPin = localStorage.getItem('greenwood_ledger_passkey_v1');
        const initialPins = Object.assign({}, DEFAULT_ROLE_PINS);
        if (legacyPin && legacyPin.trim()) {
          initialPins.Owner = legacyPin.trim();
        }
        setStorage(KEYS.ROLE_PINS, initialPins);
      }
      if (!localStorage.getItem(KEYS.INVENTORY)) {
        setStorage(KEYS.INVENTORY, SEED_INVENTORY);
      }
      if (!localStorage.getItem(KEYS.SHIFTS)) {
        setStorage(KEYS.SHIFTS, []);
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

      // Kurangi stok produk secara otomatis dan catat pergerakan inventory
      (txData.items || []).forEach(it => {
        if (it.type === 'product' && it.id) {
          this.deductStock(it.id, it.qty || 1);
        }
      });

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

    // Inventory and stock management (Apothecary Products)
    getInventory: function() {
      let inv = getStorage(KEYS.INVENTORY, null);
      if (!inv || !Array.isArray(inv) || inv.length === 0) {
        setStorage(KEYS.INVENTORY, SEED_INVENTORY);
        return SEED_INVENTORY.slice();
      }
      return inv;
    },

    getProductStock: function(productId) {
      const inv = this.getInventory();
      const item = inv.find(p => p.id === productId);
      return item ? Number(item.stock || 0) : 0;
    },

    updateProductStock: function(productId, newStock, notes) {
      let inv = this.getInventory();
      const item = inv.find(p => p.id === productId);
      if (item) {
        const oldStock = item.stock;
        item.stock = Math.max(0, Number(newStock) || 0);
        setStorage(KEYS.INVENTORY, inv);
        this.logActivity("Perbarui Stok Fisik", `${item.name}: ${oldStock} -> ${item.stock} ${item.unit}. ${notes || ''}`.trim());
        return item;
      }
      return null;
    },

    deductStock: function(productId, qty) {
      let inv = this.getInventory();
      const item = inv.find(p => p.id === productId);
      if (item) {
        const deductQty = Math.max(1, Number(qty) || 1);
        item.stock = Math.max(0, (item.stock || 0) - deductQty);
        setStorage(KEYS.INVENTORY, inv);
        this.logActivity("Pengurangan Stok Kasir", `Penjualan ${item.name} (-${deductQty} ${item.unit}, sisa ${item.stock})`);
        return item.stock;
      }
      return 0;
    },

    restockProduct: function(productId, qtyToAdd, notes) {
      let inv = this.getInventory();
      const item = inv.find(p => p.id === productId);
      if (item) {
        const added = Math.max(1, Number(qtyToAdd) || 1);
        item.stock = (item.stock || 0) + added;
        setStorage(KEYS.INVENTORY, inv);
        this.logActivity("Restock Produk Masuk", `Restock ${item.name} (+${added} ${item.unit}, total ${item.stock}). ${notes || ''}`.trim());
        return item;
      }
      return null;
    },

    getLowStockAlerts: function() {
      const inv = this.getInventory();
      return inv.filter(p => Number(p.stock) <= Number(p.minStockAlert));
    },

    // Cash Drawer & Shift Management
    getActiveShift: function() {
      return getStorage(KEYS.ACTIVE_SHIFT, null);
    },

    openShift: function(params) {
      params = params || {};
      const now = new Date();
      const shift = {
        id: "SHIFT-" + now.toISOString().slice(0, 10).replace(/-/g, "") + "-" + Date.now().toString().slice(-4),
        cashierId: params.cashierId || "Cashier",
        cashierName: params.cashierName || "Front Desk Kasir",
        openedAt: Date.now(),
        openedAtFormatted: UtilitiesFormatDate(now) + " " + UtilitiesFormatTime(now),
        openingCashFloat: Number(params.openingCashFloat) || 0,
        expenses: [],
        totalExpenses: 0,
        status: "OPEN",
        notes: params.notes || "Buka Kasir Operasional Harian",
        branch_id: DEFAULT_BRANCH_ID
      };

      setStorage(KEYS.ACTIVE_SHIFT, shift);
      this.logActivity("Buka Shift Kasir", `${shift.cashierName} membuka kasir dengan modal awal Rp ${Number(shift.openingCashFloat).toLocaleString('id-ID')}`);
      return shift;
    },

    recordShiftExpense: function(amount, note) {
      const shift = this.getActiveShift();
      if (!shift) throw new Error("Tidak ada shift kasir yang sedang aktif.");
      shift.expenses = shift.expenses || [];
      const expAmt = Math.max(0, Number(amount) || 0);
      const expenseItem = {
        id: "EXP-" + Date.now(),
        amount: expAmt,
        note: note || "Pengeluaran kas kecil operasional",
        timeFormatted: UtilitiesFormatTime(new Date()),
        timestamp: Date.now()
      };
      shift.expenses.push(expenseItem);
      shift.totalExpenses = (shift.totalExpenses || 0) + expAmt;
      setStorage(KEYS.ACTIVE_SHIFT, shift);
      this.logActivity("Kas Keluar Laci", `Pengeluaran Rp ${expAmt.toLocaleString('id-ID')} (${expenseItem.note})`);
      return expenseItem;
    },

    getShiftCurrentSummary: function() {
      const shift = this.getActiveShift();
      if (!shift) {
        return { active: false };
      }

      const allTx = this.getTransactions();
      const shiftTxs = allTx.filter(t => t.timestamp >= shift.openedAt);

      let cashSales = 0;
      let nonCashSales = 0;
      const breakdown = {
        Cash: { count: 0, total: 0 },
        Transfer: { count: 0, total: 0 },
        "QRIS Statis": { count: 0, total: 0 },
        Card: { count: 0, total: 0 }
      };

      shiftTxs.forEach(t => {
        const method = t.paymentMethod || "Cash";
        const amt = Number(t.total) || 0;
        if (!breakdown[method]) {
          breakdown[method] = { count: 0, total: 0 };
        }
        breakdown[method].count++;
        breakdown[method].total += amt;

        if (method === "Cash") {
          cashSales += amt;
        } else {
          nonCashSales += amt;
        }
      });

      const totalExpenses = shift.totalExpenses || (shift.expenses || []).reduce((sum, e) => sum + (e.amount || 0), 0);
      const expectedCashInDrawer = shift.openingCashFloat + cashSales - totalExpenses;
      const totalSales = cashSales + nonCashSales;

      return {
        active: true,
        shift: shift,
        openingCashFloat: shift.openingCashFloat,
        cashSales: cashSales,
        nonCashSales: nonCashSales,
        totalExpenses: totalExpenses,
        expenses: shift.expenses || [],
        totalSales: totalSales,
        expectedCashInDrawer: expectedCashInDrawer,
        txCount: shiftTxs.length,
        breakdown: breakdown,
        transactions: shiftTxs
      };
    },

    closeShift: function(params) {
      params = params || {};
      const summary = this.getShiftCurrentSummary();
      if (!summary.active) {
        throw new Error("Tidak ada shift kasir yang sedang aktif.");
      }

      const now = new Date();
      const actualCash = Number(params.actualCash) || 0;
      const expectedCash = summary.expectedCashInDrawer;
      const variance = actualCash - expectedCash;
      let varianceStatus = "BALANCED";
      if (variance > 0) varianceStatus = "SURPLUS";
      if (variance < 0) varianceStatus = "DEFICIT";

      const closedRecord = {
        id: summary.shift.id,
        cashierId: summary.shift.cashierId,
        cashierName: summary.shift.cashierName,
        openedAt: summary.shift.openedAt,
        openedAtFormatted: summary.shift.openedAtFormatted,
        closedAt: Date.now(),
        closedAtFormatted: UtilitiesFormatDate(now) + " " + UtilitiesFormatTime(now),
        openingCashFloat: summary.openingCashFloat,
        totalCashSales: summary.cashSales,
        totalNonCashSales: summary.nonCashSales,
        totalExpenses: summary.totalExpenses,
        expenses: summary.expenses,
        totalSales: summary.totalSales,
        expectedCashInDrawer: expectedCash,
        actualCashInDrawer: actualCash,
        variance: variance,
        varianceStatus: varianceStatus,
        closingNotes: params.closingNotes || "",
        status: "CLOSED",
        txCount: summary.txCount,
        breakdown: summary.breakdown,
        branch_id: DEFAULT_BRANCH_ID
      };

      let history = getStorage(KEYS.SHIFTS, []);
      history.unshift(closedRecord);
      setStorage(KEYS.SHIFTS, history);
      setStorage(KEYS.ACTIVE_SHIFT, null);

      const varianceText = variance === 0 ? "Cocok (Rp 0)" : (variance > 0 ? `Surplus +Rp ${variance.toLocaleString('id-ID')}` : `Defisit -Rp ${Math.abs(variance).toLocaleString('id-ID')}`);
      this.logActivity("Tutup Shift Kasir", `${closedRecord.cashierName} menutup kasir. Fisik: Rp ${actualCash.toLocaleString('id-ID')}, Harapan: Rp ${expectedCash.toLocaleString('id-ID')} (${varianceText})`);

      return closedRecord;
    },

    getShiftHistory: function() {
      return getStorage(KEYS.SHIFTS, []);
    },
    // Staff attendance and commission accounting
    getStaff: function() {
      let list = getStorage(KEYS.STAFF, SEED_STAFF);
      let changed = false;
      list.forEach(s => {
        if (s.role && (s.role.includes("Master") || s.role.includes("Senior"))) {
          s.role = "Barber";
          changed = true;
        }
      });
      if (changed) setStorage(KEYS.STAFF, list);
      return list;
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
      // Ensure Cashier & Barber CRM & analytics_view adhere to strict business isolation
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
      if (stored.Barber && stored.Barber.permissions) {
        let updated = false;
        if (stored.Barber.permissions.crm_view === true) {
          stored.Barber.permissions.crm_view = false;
          stored.Barber.permissions.crm_notes = false;
          stored.Barber.permissions.crm_phone = false;
          stored.Barber.permissions.crm_create = false;
          stored.Barber.permissions.crm_export = false;
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
      if (typeof sessionStorage !== 'undefined') {
        const sRole = sessionStorage.getItem('greenwood_authenticated_role');
        if (sRole) return sRole;
      }
      return this.getConfig().activeRole || "Owner";
    },

    isSuperAdmin: function() {
      return this.getActiveRole() === 'Owner';
    },

    getActiveBarberId: function() {
      if (typeof sessionStorage !== 'undefined') {
        const s = sessionStorage.getItem('greenwood_active_barber_id');
        if (s) return s;
      }
      return 'barber-bramantyo';
    },

    getActiveBarberName: function() {
      if (typeof sessionStorage !== 'undefined') {
        const s = sessionStorage.getItem('greenwood_active_barber_name');
        if (s) return s;
      }
      const staff = this.getStaff().find(x => x.id === this.getActiveBarberId());
      return staff ? staff.name : 'Bramantyo';
    },

    setActiveBarber: function(barberId, barberName) {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('greenwood_active_barber_id', barberId);
        if (barberName) {
          sessionStorage.setItem('greenwood_active_barber_name', barberName);
        }
      }
    },

    getBarberPins: function() {
      return getStorage(KEYS.BARBER_PINS, DEFAULT_BARBER_PINS);
    },

    saveBarberPins: function(pins) {
      const cur = this.getBarberPins();
      const updated = Object.assign({}, cur, pins);
      setStorage(KEYS.BARBER_PINS, updated);
      return updated;
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
      if (pins.Owner && clean === String(pins.Owner).trim()) return 'Owner';
      if (pins.Manager && clean === String(pins.Manager).trim()) return 'Manager';
      if (pins.Cashier && clean === String(pins.Cashier).trim()) return 'Cashier';
      if (pins.Barber && clean === String(pins.Barber).trim()) {
        this.setActiveBarber('barber-bramantyo', 'Bramantyo');
        return 'Barber';
      }

      // Check dedicated Barber pins (0001 - 0005)
      const bPins = this.getBarberPins();
      const staffList = this.getStaff();
      for (let sId in bPins) {
        if (clean === String(bPins[sId]).trim()) {
          const staff = staffList.find(s => s.id === sId);
          this.setActiveBarber(sId, staff ? staff.name : 'Barber');
          return 'Barber';
        }
      }
      return null;
    },

    verifyRolePin: function(role, enteredPin) {
      if (!enteredPin || !role) return false;
      const clean = String(enteredPin).trim();
      const pins = this.getRolePins();
      if (pins[role] && clean === String(pins[role]).trim()) return true;
      if (role === 'Barber') {
        const bPins = this.getBarberPins();
        for (let sId in bPins) {
          if (clean === String(bPins[sId]).trim()) return true;
        }
      }
      return false;
    },

    hasPermission: function(permKey, roleOverride) {
      const role = roleOverride || this.getActiveRole();
      if (role === 'Owner') return true;
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

// ==========================================
    // CLIENT SPEC: GUEST CARD (KARTU TAMU) & UU PDP
    // ==========================================

    /**
     * Buka Kartu Tamu 4-Zona terstruktur dengan isolasi peran & UU PDP
     */
    getGuestCard: function(customerId, requesterRole, requesterBarberId) {
      const cust = this.getCustomerById(customerId);
      if (!cust) return null;

      const role = requesterRole || this.getActiveRole() || 'Owner';
      const barberId = requesterBarberId || this.getActiveBarberId() || '';
      const now = new Date();

      // Sanitasi Catatan Obrolan 3-Layer & Kadaluarsa 60 Hari
      const rawNotes = cust.conversationNotes || [];
      const validNotes = [];
      let pendingFollowUp = null;

      rawNotes.forEach(n => {
        // Cek kadaluarsa 60 hari untuk catatan layer personal
        if (n.layer === 'personal' && n.expiresAt) {
          const exp = new Date(n.expiresAt);
          if (exp < now && !n.isDone) {
            return; // Kadaluarsa otomatis terhapus (purged)
          }
        }

        // Layer 1 (Shared) -> Terbuka untuk semua barber & kasir meja depan
        if (n.layer === 'shared') {
          validNotes.push(n);
        }
        // Layer 2 (Rapport Topics) -> Hanya topik obrolan umum (tanpa detail privat)
        else if (n.layer === 'rapport') {
          validNotes.push(n);
        }
        // Layer 3 (Personal) -> Hanya boleh dilihat oleh barber pembuat catatan (atau audit manager)
        else if (n.layer === 'personal') {
          if (role === 'Barber') {
            if (n.authorBarberId === barberId) {
              validNotes.push(n);
              if (n.followUp && !n.isDone) {
                pendingFollowUp = n;
              }
            }
          } else if (role === 'Owner' || role === 'Manager') {
            validNotes.push(Object.assign({}, n, { isAuditView: true }));
          }
          // Kasir (Front of House) TIDAK PERNAH melihat catatan personal layer 3
        }
      });

      // Isolasi nomor telepon untuk Barber (UU PDP)
      const sanitizedPhone = (role === 'Barber')
        ? (cust.phone ? cust.phone.substring(0, 4) + '••••' + cust.phone.slice(-3) : '-')
        : (cust.phone || '-');

      // Sanitasi catatan internal manajer
      const managerNotes = (role === 'Owner' || role === 'Manager') ? (cust.managerNotes || '') : null;

      // Ambil resep pangkas terakhir dan sebelumnya untuk komparasi 2 kunjungan
      const history = cust.visitHistory || [];
      let lastCut = null;
      let previousCut = null;

      for (let i = 0; i < history.length; i++) {
        if (history[i].cutRecord) {
          if (!lastCut) {
            lastCut = Object.assign({ visitId: history[i].visitId || ('VST-' + history[i].date), date: history[i].date, barberName: history[i].barberName, serviceName: history[i].serviceName }, history[i].cutRecord);
          } else if (!previousCut) {
            previousCut = Object.assign({ visitId: history[i].visitId || ('VST-' + history[i].date), date: history[i].date, barberName: history[i].barberName, serviceName: history[i].serviceName }, history[i].cutRecord);
            break;
          }
        }
      }

      return {
        customer: {
          id: cust.id,
          name: cust.name,
          howToAddress: cust.howToAddress || cust.name.split(' ')[0],
          phone: sanitizedPhone,
          rawPhone: (role !== 'Barber') ? cust.phone : null,
          email: cust.email || '-',
          birthday: cust.birthday || '-',
          tags: cust.tags || [],
          visitCount: cust.visitCount || history.length,
          lastVisit: cust.lastVisit || (history[0] ? history[0].date : '-'),
          lastBarber: cust.lastBarber || (history[0] ? history[0].barberName : 'Barber'),
          totalSpend: cust.totalSpend || 0,
          managerNotes: managerNotes
        },
        hospitality: cust.hospitality || {
          drinkPreference: "Air Mineral / Kopi Hitam",
          chatPreference: "quiet",
          preferredBarber: cust.lastBarber || "Bramantyo",
          sensitivities: "Tidak ada keluhan alergi",
          specialNotes: ""
        },
        consent: cust.consent || {
          referencePhotos: false,
          portfolioUse: false,
          agreedAt: null,
          wordingVersion: "UU-PDP-2026.1",
          agreedWithStaffId: null,
          withdrawnDate: null
        },
        rapportTopics: cust.rapportTopics || [],
        conversationNotes: validNotes,
        pendingFollowUp: pendingFollowUp,
        lastCut: lastCut,
        previousCut: previousCut,
        allVisits: history,
        permissions: {
          canUploadPhotos: (role !== 'Cashier'),
          canDeletePhotos: (role === 'Owner' || role === 'Manager'),
          canEditHospitality: (role !== 'Barber'),
          canAddRapport: true,
          canEditRecipe: (role !== 'Cashier'),
          canViewPhone: (role !== 'Barber')
        }
      };
    },

    /**
     * Fitur 1-Tap 'Repeat Last Cut': Mengkopi resep kunjungan sebelumnya ke sesi hari ini
     */
    repeatLastCut: function(customerId) {
      const card = this.getGuestCard(customerId);
      if (!card || !card.lastCut) return null;

      // Salin struktur resep tetap tanpa ID kunjungan lama
      const recipeCopy = Object.assign({}, card.lastCut);
      delete recipeCopy.visitId;
      delete recipeCopy.date;
      return recipeCopy;
    },

    /**
     * Simpan Resep Pangkas (Cut Record) ke Kunjungan Tertentu
     */
    saveCutRecord: function(customerId, visitId, cutRecordData) {
      const list = getStorage(KEYS.CUSTOMERS, []);
      const idx = list.findIndex(c => c.id === customerId);
      if (idx === -1) return null;

      const cust = list[idx];
      cust.visitHistory = cust.visitHistory || [];
      let visit = cust.visitHistory.find(v => (v.visitId === visitId || v.date === visitId));

      if (!visit) {
        // Buat kunjungan baru jika belum ada
        const nowStr = new Date().toISOString().split('T')[0];
        visit = {
          visitId: visitId || ('VST-' + nowStr + '-' + Date.now().toString().slice(-4)),
          date: nowStr,
          receiptId: 'RCP-' + Date.now().toString().slice(-8),
          barberName: this.getActiveBarberName() || 'Barber',
          barberId: this.getActiveBarberId() || 'barber-bramantyo',
          chair: 'Kursi 1',
          serviceName: 'The Cut',
          total: 150000,
          tip: 0,
          rebookedAtCheckout: false
        };
        cust.visitHistory.unshift(visit);
        cust.visitCount = cust.visitHistory.length;
        cust.lastVisit = visit.date;
        cust.lastBarber = visit.barberName;
      }

      // Evaluasi apakah kartu memenuhi syarat lengkap:
      // Syarat client: style name, sides, top, neckline, verdict dan minimal foto depan & belakang
      const photos = cutRecordData.photos || {};
      const isComplete = Boolean(
        cutRecordData.styleName &&
        cutRecordData.sidesBackGuard &&
        cutRecordData.topLengthTechnique &&
        cutRecordData.neckline &&
        cutRecordData.verdict &&
        photos.front &&
        photos.back
      );

      visit.cutRecord = Object.assign({}, cutRecordData, { isComplete: isComplete });
      setStorage(KEYS.CUSTOMERS, list);

      this.logActivity(
        "Simpan Resep Pangkas",
        `Resep pangkas '${cutRecordData.styleName || 'Gaya'}' tamu ID: ${customerId} disimpan oleh ${this.getActiveBarberName() || 'Barber'}. Status: ${isComplete ? 'LENGKAP' : 'BELUM LENGKAP'}`
      );
      return cust;
    },

    /**
     * Catat Persetujuan Foto UU PDP (Undang-Undang No 27 Tahun 2022)
     */
    recordPhotoConsent: function(customerId, consentData) {
      const list = getStorage(KEYS.CUSTOMERS, []);
      const idx = list.findIndex(c => c.id === customerId);
      if (idx === -1) return null;

      const cust = list[idx];
      cust.consent = {
        referencePhotos: Boolean(consentData.referencePhotos),
        portfolioUse: Boolean(consentData.portfolioUse),
        agreedAt: new Date().toISOString(),
        wordingVersion: "UU-PDP-2026.1",
        agreedWithStaffId: this.getActiveBarberId() || 'barber-bramantyo',
        withdrawnDate: null
      };

      setStorage(KEYS.CUSTOMERS, list);
      this.logActivity(
        "Persetujuan UU PDP Dicatat",
        `Persetujuan foto tamu ID: ${customerId} diperbarui (Foto Referensi: ${cust.consent.referencePhotos ? 'YA' : 'TIDAK'}, Portofolio Medsos: ${cust.consent.portfolioUse ? 'YA' : 'TIDAK'})`
      );
      return cust;
    },

    /**
     * Cabut Persetujuan UU PDP & Hapus Semua Foto Permanen (Deleted, not hidden)
     */
    withdrawPhotoConsent: function(customerId) {
      const list = getStorage(KEYS.CUSTOMERS, []);
      const idx = list.findIndex(c => c.id === customerId);
      if (idx === -1) return null;

      const cust = list[idx];
      cust.consent = {
        referencePhotos: false,
        portfolioUse: false,
        agreedAt: cust.consent ? cust.consent.agreedAt : null,
        wordingVersion: "UU-PDP-2026.1",
        agreedWithStaffId: this.getActiveBarberId() || 'STAFF',
        withdrawnDate: new Date().toISOString()
      };

      // UU PDP: Hapus seluruh foto dari riwayat kunjungan (tidak hanya disembunyikan)
      if (cust.visitHistory) {
        cust.visitHistory.forEach(v => {
          if (v.cutRecord && v.cutRecord.photos) {
            v.cutRecord.photos = { front: "", left: "", right: "", back: "", top: "" };
            v.cutRecord.isComplete = false;
          }
        });
      }

      setStorage(KEYS.CUSTOMERS, list);
      this.logActivity(
        "Pencabutan Izin Foto UU PDP",
        `Tamu ID: ${customerId} mencabut izin foto. Seluruh file foto pangkas telah dihapus permanen dari basis data.`
      );
      return cust;
    },

    /**
     * Hapus Foto Pangkas Spesifik (Manager / Owner dengan audit log wajib)
     */
    deleteCutPhotos: function(customerId, visitId, reason) {
      const role = this.getActiveRole();
      if (role !== 'Owner' && role !== 'Manager') {
        alert("Akses Ditolak: Hanya Store Manager dan Owner yang berwenang menghapus foto pangkas.");
        return false;
      }

      const list = getStorage(KEYS.CUSTOMERS, []);
      const cust = list.find(c => c.id === customerId);
      if (!cust || !cust.visitHistory) return false;

      const visit = cust.visitHistory.find(v => (v.visitId === visitId || v.date === visitId));
      if (visit && visit.cutRecord && visit.cutRecord.photos) {
        visit.cutRecord.photos = { front: "", left: "", right: "", back: "", top: "" };
        visit.cutRecord.isComplete = false;
        setStorage(KEYS.CUSTOMERS, list);

        this.logActivity(
          "Audit Penghapusan Foto",
          `Foto kunjungan '${visitId}' tamu ID: ${customerId} dihapus oleh ${role}. Alasan: ${reason || 'Permintaan penghapusan UU PDP'}`
        );
        return true;
      }
      return false;
    },

    /**
     * Tambah Catatan Obrolan 3-Layer (Shared, Rapport, Personal)
     */
    addConversationNote: function(customerId, noteData) {
      const list = getStorage(KEYS.CUSTOMERS, []);
      const idx = list.findIndex(c => c.id === customerId);
      if (idx === -1) return null;

      const cust = list[idx];
      cust.conversationNotes = cust.conversationNotes || [];

      // Validasi UU PDP: Jangan catat politik, agama, drama keluarga, info medis sensitif
      const text = noteData.text || '';
      const sensitiveKeywords = ['politik', 'partai', 'pemilu', 'agama', 'hutang', 'cerai', 'penyakit'];
      const hasSensitive = sensitiveKeywords.some(kw => text.toLowerCase().includes(kw));

      const newNote = {
        id: 'CN-' + Date.now(),
        authorBarberId: this.getActiveBarberId() || 'barber-bramantyo',
        authorBarberName: this.getActiveBarberName() || 'Barber',
        layer: noteData.layer || 'shared',
        text: text,
        followUp: Boolean(noteData.followUp),
        followUpText: noteData.followUpText || '',
        isDone: false,
        createdAt: new Date().toISOString(),
        expiresAt: (noteData.layer === 'personal') ? new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString() : null
      };

      cust.conversationNotes.push(newNote);
      setStorage(KEYS.CUSTOMERS, list);

      this.logActivity(
        "Catatan Obrolan Ditambahkan",
        `Catatan layer '${newNote.layer}' tamu ID: ${customerId} ditambahkan oleh ${newNote.authorBarberName}${hasSensitive ? ' (Catatan: terdeteksi kata sensitif, pastikan patuhi UU PDP)' : ''}`
      );
      return newNote;
    },

    /**
     * Tandai Selesai Pengingat 'Ask About' Follow-Up
     */
    markFollowUpDone: function(customerId, noteId) {
      const list = getStorage(KEYS.CUSTOMERS, []);
      const cust = list.find(c => c.id === customerId);
      if (!cust || !cust.conversationNotes) return false;

      const note = cust.conversationNotes.find(n => n.id === noteId);
      if (note) {
        note.isDone = true;
        setStorage(KEYS.CUSTOMERS, list);
        this.logActivity("Follow-Up Obrolan Selesai", `Pengingat '${note.followUpText || note.text}' tamu ID: ${customerId} ditandai selesai.`);
        return true;
      }
      return false;
    },

    /**
     * Simpan Topik Rapport (Minat Umum)
     */
    saveRapportTopics: function(customerId, topicsArray) {
      const list = getStorage(KEYS.CUSTOMERS, []);
      const cust = list.find(c => c.id === customerId);
      if (!cust) return false;

      cust.rapportTopics = Array.isArray(topicsArray) ? topicsArray : [];
      setStorage(KEYS.CUSTOMERS, list);
      return true;
    },

    /**
     * Simpan Preferensi Hospitalitas Tamu
     */
    saveHospitalityPreferences: function(customerId, hospitalityData) {
      const list = getStorage(KEYS.CUSTOMERS, []);
      const cust = list.find(c => c.id === customerId);
      if (!cust) return false;

      cust.hospitality = Object.assign({}, cust.hospitality || {}, hospitalityData);
      setStorage(KEYS.CUSTOMERS, list);
      this.logActivity("Preferensi Hospitalitas Disimpan", `Preferensi minuman & kenyamanan tamu ID: ${customerId} diperbarui.`);
      return true;
    },

    // ==========================================
    // CLIENT SPEC: KPI DASHBOARD & GAINSHARE
    // ==========================================

    /**
     * Heatmap Utilisasi Kursi (Chair Utilisation: Day x Hour)
     * Mengukur porsi menit kursi yang terpakai dari total kapasitas menit yang tersedia. Target: 65%.
     */
    getChairUtilisationHeatmap: function() {
      const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
      const hours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      const chairCount = 3;
      const capacityMinutesPerHour = chairCount * 60; // 180 menit kapasitas 3 kursi

      // Seed matrix dengan baseline representatif sesuai jam sibuk operasional barbershop
      const matrix = [];
      let totalBookedMinutes = 0;
      let totalCapacityMinutes = days.length * hours.length * capacityMinutesPerHour;

      const baselinePattern = [
        [30, 45, 90, 110, 120, 105, 120, 150, 135, 120, 60], // Senin
        [20, 40, 80, 100, 110,  95, 115, 140, 130, 110, 50], // Selasa
        [35, 50, 95, 115, 125, 110, 130, 155, 140, 125, 65], // Rabu
        [40, 60, 105, 125, 130, 120, 140, 160, 150, 130, 70], // Kamis
        [50, 80, 130, 150, 160, 155, 170, 180, 175, 160, 90], // Jumat
        [90, 135, 165, 180, 180, 175, 180, 180, 170, 160, 110], // Sabtu (Peak)
        [80, 125, 160, 175, 180, 170, 175, 170, 160, 150, 95]   // Minggu (Peak)
      ];

      for (let d = 0; d < days.length; d++) {
        const row = [];
        for (let h = 0; h < hours.length; h++) {
          const booked = baselinePattern[d][h];
          const pct = Math.round((booked / capacityMinutesPerHour) * 100);
          totalBookedMinutes += booked;
          row.push({
            day: days[d],
            hour: hours[h],
            bookedMinutes: booked,
            capacityMinutes: capacityMinutesPerHour,
            pct: pct
          });
        }
        matrix.push(row);
      }

      const overallUtilisation = Math.round((totalBookedMinutes / totalCapacityMinutes) * 100);

      return {
        days: days,
        hours: hours,
        matrix: matrix,
        overallUtilisation: overallUtilisation, // Baseline ~67%
        targetUtilisation: 65,
        totalBookedMinutes: totalBookedMinutes,
        totalCapacityMinutes: totalCapacityMinutes
      };
    },

    /**
     * Pendapatan vs Titik Impas (Break-even) & Ambang Batas Gainshare Tim
     */
    getRevenueVsBreakEven: function() {
      const an = this.getAnalyticsOverview();
      const currentRevenue = an.revenueThisMonth || 28450000;
      const breakEvenTarget = 35000000; // Rp 35.000.000 (Target Operasional Toko)
      const gainshareThreshold = 45000000; // Rp 45.000.000 (Ambang Bonus Tim Gainshare)

      const pctToBreakEven = Math.min(100, Math.round((currentRevenue / breakEvenTarget) * 100));
      const pctToGainshare = Math.min(100, Math.round((currentRevenue / gainshareThreshold) * 100));
      const gainsharePool = (currentRevenue > gainshareThreshold)
        ? Math.round((currentRevenue - gainshareThreshold) * 0.15)
        : 0;

      return {
        currentRevenue: currentRevenue,
        breakEvenTarget: breakEvenTarget,
        gainshareThreshold: gainshareThreshold,
        pctToBreakEven: pctToBreakEven,
        pctToGainshare: pctToGainshare,
        gainsharePool: gainsharePool,
        isOnTrack: currentRevenue >= (breakEvenTarget * 0.7)
      };
    },

    /**
     * Rasio Kelengkapan Kartu Tamu (Guest Card Completion Rate)
     * Dihitung dari kunjungan yang memiliki: nama gaya, guard samping, teknik atas, leher, verdict & foto depan+belakang
     */
    getGuestCardCompletionStats: function() {
      const customers = this.getCustomers();
      let totalVisits = 0;
      let completeVisits = 0;
      const barberMap = {
        "Bramantyo": { total: 0, complete: 0 },
        "Rian Pratama": { total: 0, complete: 0 },
        "Dimas Setiawan": { total: 0, complete: 0 }
      };

      customers.forEach(c => {
        (c.visitHistory || []).forEach(v => {
          totalVisits++;
          const barber = v.barberName || "Bramantyo";
          if (!barberMap[barber]) barberMap[barber] = { total: 0, complete: 0 };
          barberMap[barber].total++;

          if (v.cutRecord && v.cutRecord.isComplete) {
            completeVisits++;
            barberMap[barber].complete++;
          }
        });
      });

      const overallPct = totalVisits > 0 ? Math.round((completeVisits / totalVisits) * 100) : 0;
      const perBarber = [];

      for (const [name, stats] of Object.entries(barberMap)) {
        const pct = stats.total > 0 ? Math.round((stats.complete / stats.total) * 100) : 0;
        perBarber.push({
          name: name,
          total: stats.total,
          complete: stats.complete,
          pct: pct
        });
      }

      return {
        totalVisits: totalVisits,
        completeVisits: completeVisits,
        overallPct: overallPct,
        targetPct: 80,
        perBarber: perBarber
      };
    },

    /**
     * Tiket Rata-Rata (Average Ticket) vs Target Rp 380,000
     */
    getAverageTicketStats: function() {
      const customers = this.getCustomers();
      let sum = 0;
      let count = 0;
      customers.forEach(c => {
        (c.visitHistory || []).forEach(v => {
          sum += (v.total || 0);
          count++;
        });
      });
      const avg = count > 0 ? Math.round(sum / count) : 310000;
      return {
        currentAvgTicket: avg,
        targetAvgTicket: 380000,
        pct: Math.round((avg / 380000) * 100)
      };
    },

    /**
     * Penjualan Add-on per Tamu vs Target Rp 115,000
     */
    getAddonPerGuestStats: function() {
      return {
        currentAddonAvg: 95000,
        targetAddonAvg: 115000,
        pct: Math.round((95000 / 115000) * 100)
      };
    },

    /**
     * Tingkat Rebooking Saat Checkout (Per Week, Per Barber)
     */
    getRebookingStats: function() {
      const customers = this.getCustomers();
      let total = 0;
      let rebooked = 0;
      const barberMap = {
        "Bramantyo": { total: 0, rebooked: 0 },
        "Rian Pratama": { total: 0, rebooked: 0 },
        "Dimas Setiawan": { total: 0, rebooked: 0 }
      };

      customers.forEach(c => {
        (c.visitHistory || []).forEach(v => {
          total++;
          const barber = v.barberName || "Bramantyo";
          if (!barberMap[barber]) barberMap[barber] = { total: 0, rebooked: 0 };
          barberMap[barber].total++;

          if (v.rebookedAtCheckout) {
            rebooked++;
            barberMap[barber].rebooked++;
          }
        });
      });

      const overallPct = total > 0 ? Math.round((rebooked / total) * 100) : 0;
      const perBarber = [];
      for (const [name, stats] of Object.entries(barberMap)) {
        const pct = stats.total > 0 ? Math.round((stats.rebooked / stats.total) * 100) : 0;
        perBarber.push({
          name: name,
          total: stats.total,
          rebooked: stats.rebooked,
          pct: pct
        });
      }

      return {
        total: total,
        rebooked: rebooked,
        overallPct: overallPct,
        targetPct: 50,
        perBarber: perBarber
      };
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
