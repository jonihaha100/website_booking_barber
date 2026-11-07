/**
 * GREENWOOD BARBERS — BILINGUAL ENGINE & STORE INFO CONTROLLER (v1.0)
 * Dual-language toggle (English / Bahasa Indonesia) and Store Info Visitor Guide.
 * Developed for Greenwood Barbers Kota Baru Parahyangan.
 */

(function () {
  'use strict';

  // 1. DICTIONARY MAPPINGS (EN <-> ID)
  var translations = {
    en: {
      // Navigation
      navHome: "Home",
      navAbout: "About Us",
      navContact: "Contact Us",
      navInfo: "Store Info",
      navReserve: "RESERVE A CHAIR",
      
      // Index Hero
      heroBadge: "KOTA BARU PARAHYANGAN",
      heroTitle: "Bandung's First Gentlemen's Retreat",
      heroSubtitle: "The hour is yours. A quiet barbershop in the hills of West Bandung.",
      heroCtaBook: "RESERVE A CHAIR",
      heroCtaInfo: "VISITING INFO",
      
      // Index Values
      valueTitle1: "Clean you can see and smell",
      valueDesc1: "New razor blade for every guest. Steamed hot towels freshly laundered. All tools sanitized between chairs.",
      valueTitle2: "Unhurried appointments",
      valueDesc2: "We dedicate 45 to 95 minutes per session. Nothing is rushed; every cut begins with a thorough mirror consultation.",
      valueTitle3: "Free parking at the door",
      valueDesc3: "No circling or parking fees. Pull up directly in front of Ruko PancaTengah, 7 minutes from Whoosh Padalarang.",
      
      // Section Headlines
      menuHeadline: "Essential grooming, done properly",
      menuSub: "Four straightforward services. No hidden upsells.",
      hoursHeadline: "Quiet, unhurried chairs in Kota Baru Parahyangan.",
      hoursDetail: "Wednesday – Monday: 10:00 – 20:00 WIB • Closed Tuesdays",
      addressText: "Ruko PancaTengah, Jl. Parahyangan No. 87, Kota Baru Parahyangan, Padalarang 40553",
      
      // Footer
      footerTagline: "Bandung's First Gentlemen's Retreat • Kota Baru Parahyangan",
      footerCopyright: "© 2026 Greenwood Barbers. All rights reserved.",
      footerContactBtn: "Chat WhatsApp Concierge",
      
      // Store Info Modal
      modalTitle: "Store Info & Visiting Guide",
      modalSubtitle: "Greenwood Barbers • Flagship Kota Baru Parahyangan",
      modalHoursLabel: "Operating Hours",
      modalHoursVal: "Wednesday – Monday: 10:00 – 20:00 WIB (Closed Tuesdays)",
      modalLocationLabel: "Civic Address",
      modalLocationVal: "Ruko PancaTengah, Jl. Parahyangan No. 87, Kota Baru Parahyangan, Padalarang, West Bandung 40553",
      modalTransitLabel: "Transit & Accessibility",
      modalTransitVal: "7 minutes from Whoosh High-Speed Rail Padalarang Station • 5 minutes from Padalarang Toll Exit.",
      modalParkingLabel: "Parking Facility",
      modalParkingVal: "Complimentary reserved parking directly in front of the parlour door.",
      modalBookingPolicyLabel: "Appointment & Reschedule",
      modalBookingPolicyVal: "Online reservation recommended. To reschedule, kindly notify via WhatsApp at least 3 hours prior.",
      modalPaymentLabel: "Payment Methods",
      modalPaymentVal: "Cashless accepted (QRIS, Debit Card, Credit Card, Mandiri Virtual Account).",
      modalBtnBook: "RESERVE A CHAIR ONLINE",
      modalBtnWa: "CHAT WHATSAPP (+62 819-9115-3322)",
      modalBtnMaps: "OPEN IN GOOGLE MAPS",
      modalClose: "Close"
    },
    id: {
      // Navigation
      navHome: "Beranda",
      navAbout: "Tentang Kami",
      navContact: "Kontak",
      navInfo: "Info Toko",
      navReserve: "RESERVASI KURSI",
      
      // Index Hero
      heroBadge: "KOTA BARU PARAHYANGAN",
      heroTitle: "Tempat Singgah Perawatan Pria Pertama di Bandung",
      heroSubtitle: "Waktu seutuhnya milik Anda. Barbershop tenang dan eksklusif di perbukitan Bandung Barat.",
      heroCtaBook: "RESERVASI KURSI",
      heroCtaInfo: "INFO LOKASI & TOKO",
      
      // Index Values
      valueTitle1: "Kebersihan yang Nyata Terlihat dan Terasa",
      valueDesc1: "Satu silet baru sekali pakai untuk setiap tamu. Handuk hangat higienis. Seluruh peralatan disterilkan tuntas setiap sesi.",
      valueTitle2: "Perawatan Tenang Tanpa Terburu-buru",
      valueDesc2: "Kami mendedikasikan 45 hingga 95 menit untuk setiap sesi. Dimulai dengan konsultasi mendalam di depan cermin sebelum pemotongan.",
      valueTitle3: "Parkir Gratis Tepat di Depan Pintu",
      valueDesc3: "Bebas biaya parkir dan tanpa perlu berputar-putar. Parkir tepat di depan Ruko PancaTengah, hanya 7 menit dari Stasiun Whoosh.",
      
      // Section Headlines
      menuHeadline: "Perawatan Esensial, Dikerjakan dengan Sempurna",
      menuSub: "Empat paket layanan utama berstandar tinggi. Tanpa biaya tersembunyi.",
      hoursHeadline: "Suasana pangkas rambut tenang dan privat di Kota Baru Parahyangan.",
      hoursDetail: "Rabu – Senin: 10:00 – 20:00 WIB • Tutup Setiap Hari Selasa",
      addressText: "Ruko PancaTengah, Jl. Parahyangan No. 87, Kota Baru Parahyangan, Padalarang 40553",
      
      // Footer
      footerTagline: "Tempat Singgah Perawatan Pria Pertama di Bandung • Kota Baru Parahyangan",
      footerCopyright: "© 2026 Greenwood Barbers. Hak cipta dilindungi undang-undang.",
      footerContactBtn: "Hubungi WhatsApp Concierge",
      
      // Store Info Modal
      modalTitle: "Informasi Toko & Panduan Tamu",
      modalSubtitle: "Greenwood Barbers • Flagship Kota Baru Parahyangan",
      modalHoursLabel: "Jam Operasional",
      modalHoursVal: "Rabu – Senin: 10:00 – 20:00 WIB (Tutup Hari Selasa)",
      modalLocationLabel: "Alamat Resmi",
      modalLocationVal: "Ruko PancaTengah, Jl. Parahyangan No. 87, Kota Baru Parahyangan, Padalarang, Bandung Barat 40553",
      modalTransitLabel: "Akses Transportasi",
      modalTransitVal: "7 menit dari Stasiun Kereta Cepat Whoosh Padalarang • 5 menit dari Gerbang Tol Padalarang.",
      modalParkingLabel: "Fasilitas Parkir",
      modalParkingVal: "Parkir gratis tepat di depan pintu masuk parlour.",
      modalBookingPolicyLabel: "Kebijakan Reservasi & Reschedule",
      modalBookingPolicyVal: "Reservasi online sangat disarankan. Untuk perubahan jadwal, mohon konfirmasi melalui WhatsApp minimal 3 jam sebelumnya.",
      modalPaymentLabel: "Metode Pembayaran",
      modalPaymentVal: "Menerima pembayaran nontunai (QRIS, Kartu Debit, Kartu Kredit, Mandiri Virtual Account).",
      modalBtnBook: "RESERVASI KURSI ONLINE",
      modalBtnWa: "CHAT WHATSAPP (+62 819-9115-3322)",
      modalBtnMaps: "BUKA DI GOOGLE MAPS",
      modalClose: "Tutup"
    }
  };

  // 2. STATE CONTROLLER
  var currentLang = localStorage.getItem('greenwood_lang') || 'en';

  function applyLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('greenwood_lang', lang);
    document.documentElement.lang = lang;

    var dict = translations[lang];

    // Update Language Toggle Active State
    var btns = document.querySelectorAll('.lang-btn');
    btns.forEach(function (btn) {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Nav Links
    var navLinks = document.querySelectorAll('nav.main-nav a, .mobile-nav-overlay a');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (href.indexOf('index.html') !== -1 || href === '/' || href === '') {
        link.textContent = dict.navHome;
      } else if (href.indexOf('about.html') !== -1 || href.indexOf('about') !== -1) {
        link.textContent = dict.navAbout;
      } else if (href.indexOf('contact.html') !== -1 || href.indexOf('contact') !== -1) {
        link.textContent = dict.navContact;
      } else if (href.indexOf('info.html') !== -1 || href.indexOf('info') !== -1) {
        link.textContent = dict.navInfo;
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

    // Update Elements with data-i18n attribute
    var i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update Known Homepage Text If on index
    var heroBadge = document.querySelector('.clean-hero-badge');
    if (heroBadge && !heroBadge.hasAttribute('data-i18n')) heroBadge.textContent = dict.heroBadge;

    var heroTitle = document.querySelector('.clean-hero-title');
    if (heroTitle && !heroTitle.hasAttribute('data-i18n')) heroTitle.textContent = dict.heroTitle;

    var heroSubtitle = document.querySelector('.clean-hero-subtitle');
    if (heroSubtitle && !heroSubtitle.hasAttribute('data-i18n')) heroSubtitle.textContent = dict.heroSubtitle;

    var heroCtaBook = document.querySelector('.clean-hero-actions .btn-primary');
    if (heroCtaBook && !heroCtaBook.hasAttribute('data-i18n')) heroCtaBook.textContent = dict.heroCtaBook;

    var heroCtaInfo = document.querySelector('.clean-hero-actions .btn-secondary');
    if (heroCtaInfo && !heroCtaInfo.hasAttribute('data-i18n')) heroCtaInfo.textContent = dict.heroCtaInfo;

    // Update Modal Content
    var modalTitle = document.getElementById('gwModalTitle');
    if (modalTitle) modalTitle.textContent = dict.modalTitle;

    var modalSubtitle = document.getElementById('gwModalSubtitle');
    if (modalSubtitle) modalSubtitle.textContent = dict.modalSubtitle;

    var modalClose = document.getElementById('gwModalCloseBtn');
    if (modalClose) modalClose.textContent = dict.modalClose;

    // Dispatch Event for Page-specific listeners
    window.dispatchEvent(new CustomEvent('greenwood-language-changed', { detail: { lang: lang, dict: dict } }));
  }

  // 3. INJECT LANGUAGE SWITCHER & STORE INFO LINK
  function injectLanguageSwitcher() {
    var ctaGroups = document.querySelectorAll('.header-cta-group');
    ctaGroups.forEach(function (ctaGroup) {
      if (ctaGroup.querySelector('.lang-switch-wrap')) return;

      var switchWrap = document.createElement('div');
      switchWrap.className = 'lang-switch-wrap';
      switchWrap.setAttribute('aria-label', 'Language Selector');
      switchWrap.innerHTML = 
        '<button type="button" class="lang-btn ' + (currentLang === 'en' ? 'active' : '') + '" data-lang="en">EN</button>' +
        '<span class="lang-divider">|</span>' +
        '<button type="button" class="lang-btn ' + (currentLang === 'id' ? 'active' : '') + '" data-lang="id">ID</button>';

      ctaGroup.insertBefore(switchWrap, ctaGroup.firstChild);
    });

    // Also add to mobile nav overlay
    var mobileNav = document.getElementById('mobileNavOverlay');
    if (mobileNav && !mobileNav.querySelector('.lang-switch-mobile')) {
      var mobileSwitch = document.createElement('div');
      mobileSwitch.className = 'lang-switch-wrap lang-switch-mobile';
      mobileSwitch.innerHTML = 
        '<span style="font-size:11px; letter-spacing:1.5px; color:var(--text-muted); text-transform:uppercase; margin-right:8px;">LANGUAGE:</span>' +
        '<button type="button" class="lang-btn ' + (currentLang === 'en' ? 'active' : '') + '" data-lang="en">EN</button>' +
        '<span class="lang-divider">|</span>' +
        '<button type="button" class="lang-btn ' + (currentLang === 'id' ? 'active' : '') + '" data-lang="id">ID</button>';
      
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

    // Inject "Store Info" into main navigation if not already present
    var mainNavs = document.querySelectorAll('nav.main-nav');
    mainNavs.forEach(function (nav) {
      if (!nav.querySelector('a[href*="info"]')) {
        var infoLink = document.createElement('a');
        infoLink.href = 'info.html';
        infoLink.textContent = currentLang === 'id' ? 'Info Toko' : 'Store Info';
        if (window.location.pathname.indexOf('info') !== -1) {
          infoLink.className = 'active';
        }
        nav.appendChild(infoLink);
      }
    });

    // Inject "Store Info" into mobile nav overlay
    if (mobileNav && !mobileNav.querySelector('a[href*="info"]')) {
      var mobileInfoLink = document.createElement('a');
      mobileInfoLink.href = 'info.html';
      mobileInfoLink.textContent = currentLang === 'id' ? 'Info Toko' : 'Store Info';
      if (window.location.pathname.indexOf('info') !== -1) {
        mobileInfoLink.className = 'active';
      }
      var bookBtn = mobileNav.querySelector('.btn-primary');
      if (bookBtn) {
        mobileNav.insertBefore(mobileInfoLink, bookBtn);
      } else {
        mobileNav.appendChild(mobileInfoLink);
      }
    }
  }

  // 4. INJECT STORE INFO MODAL
  function injectStoreInfoModal() {
    if (document.getElementById('gwStoreInfoModal')) return;

    var dict = translations[currentLang];
    var modalHtml = 
      '<div id="gwStoreInfoModal" class="gw-info-modal-backdrop" style="display:none;" role="dialog" aria-modal="true" aria-labelledby="gwModalTitle">' +
      '  <div class="gw-info-modal-card">' +
      '    <div class="gw-info-modal-header">' +
      '      <div>' +
      '        <div style="font-size:10px; letter-spacing:2.5px; text-transform:uppercase; color:var(--accent-gold); font-weight:600;" id="gwModalSubtitle">' + dict.modalSubtitle + '</div>' +
      '        <h2 id="gwModalTitle" style="font-family:var(--font-serif); font-size:22px; color:var(--accent-gold); margin:4px 0 0;">' + dict.modalTitle + '</h2>' +
      '      </div>' +
      '      <button type="button" class="gw-info-modal-close" onclick="window.GreenwoodI18n.closeInfoModal()" aria-label="Close dialog">&times;</button>' +
      '    </div>' +
      '    <div class="gw-info-modal-body">' +
      '      <div class="gw-info-row">' +
      '        <div class="gw-info-label">' + dict.modalHoursLabel + '</div>' +
      '        <div class="gw-info-val">' + dict.modalHoursVal + '</div>' +
      '      </div>' +
      '      <div class="gw-info-row">' +
      '        <div class="gw-info-label">' + dict.modalLocationLabel + '</div>' +
      '        <div class="gw-info-val">' + dict.modalLocationVal + '</div>' +
      '      </div>' +
      '      <div class="gw-info-row">' +
      '        <div class="gw-info-label">' + dict.modalTransitLabel + '</div>' +
      '        <div class="gw-info-val">' + dict.modalTransitVal + '</div>' +
      '      </div>' +
      '      <div class="gw-info-row">' +
      '        <div class="gw-info-label">' + dict.modalParkingLabel + '</div>' +
      '        <div class="gw-info-val">' + dict.modalParkingVal + '</div>' +
      '      </div>' +
      '      <div class="gw-info-row">' +
      '        <div class="gw-info-label">' + dict.modalBookingPolicyLabel + '</div>' +
      '        <div class="gw-info-val">' + dict.modalBookingPolicyVal + '</div>' +
      '      </div>' +
      '      <div class="gw-info-row">' +
      '        <div class="gw-info-label">' + dict.modalPaymentLabel + '</div>' +
      '        <div class="gw-info-val">' + dict.modalPaymentVal + '</div>' +
      '      </div>' +
      '    </div>' +
      '    <div class="gw-info-modal-footer">' +
      '      <a href="booking.html" class="btn-primary" style="text-align:center; text-decoration:none; display:inline-block; padding:10px 18px; font-size:12px;">' + dict.modalBtnBook + '</a>' +
      '      <a href="https://wa.me/6281991153322?text=Halo%20Greenwood%20Barbers,%20saya%20ingin%20bertanya%20mengenai%20layanan%20dan%20jadwal" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="text-align:center; text-decoration:none; display:inline-block; padding:10px 18px; font-size:12px;">' + dict.modalBtnWa + '</a>' +
      '      <button type="button" class="btn-secondary" id="gwModalCloseBtn" onclick="window.GreenwoodI18n.closeInfoModal()" style="padding:10px 16px; font-size:12px;">' + dict.modalClose + '</button>' +
      '    </div>' +
      '  </div>' +
      '</div>';

    var container = document.createElement('div');
    container.innerHTML = modalHtml;
    document.body.appendChild(container.firstChild);

    // Close on backdrop click or ESC
    var modal = document.getElementById('gwStoreInfoModal');
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) window.GreenwoodI18n.closeInfoModal();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') window.GreenwoodI18n.closeInfoModal();
    });
  }

  // 5. PUBLIC API
  window.GreenwoodI18n = {
    setLanguage: applyLanguage,
    getLanguage: function () { return currentLang; },
    getDictionary: function () { return translations[currentLang]; },
    openInfoModal: function () {
      var modal = document.getElementById('gwStoreInfoModal');
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    },
    closeInfoModal: function () {
      var modal = document.getElementById('gwStoreInfoModal');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
  };

  // 6. INITIALIZE ON DOM READY
  function init() {
    injectLanguageSwitcher();
    injectStoreInfoModal();
    applyLanguage(currentLang);

    // Auto-open modal if hash is #store-info or #info
    if (window.location.hash === '#store-info' || window.location.hash === '#info') {
      setTimeout(function () {
        window.GreenwoodI18n.openInfoModal();
      }, 300);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
