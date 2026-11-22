/**
 * GREENWOOD BARBERS — BILINGUAL ENGINE (ID | EN)
 * Dual-language toggle (Bahasa Indonesia / British Mayfair English).
 * Smart Browser Language Detection (auto-detects English or Indonesian).
 * Prevents Google Translate machine translation collisions.
 * Developed for Greenwood Barbers Kota Baru Parahyangan.
 */

(function () {
  'use strict';

  // 1. DICTIONARY MAPPINGS (ID <-> EN)
  var translations = {
    id: {
      // Document Metadata
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
      
      // Section Headlines & Services
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
      
      // Values (if referenced)
      valueTitle1: "Kebersihan yang Nyata Terlihat dan Terasa",
      valueDesc1: "Satu silet baru sekali pakai untuk setiap tamu. Handuk hangat higienis. Seluruh peralatan disterilkan tuntas setiap sesi.",
      valueTitle2: "Perawatan Tenang Tanpa Terburu-buru",
      valueDesc2: "Kami mendedikasikan 45 hingga 95 menit untuk setiap sesi. Dimulai dengan konsultasi mendalam di depan cermin sebelum pemotongan.",
      valueTitle3: "Parkir Gratis Tepat di Depan Pintu",
      valueDesc3: "Bebas biaya parkir dan tanpa perlu berputar-putar. Parkir tepat di depan Ruko PancaTengah, hanya 7 menit dari Stasiun Whoosh.",
      
      // Footer
      footerHours: "Buka Rabu–Senin, 10:00–20:00 WIB • Tutup Setiap Hari Selasa",
      footerTagline: "Tempat Singgah Perawatan Pria Pertama di Bandung • Kota Baru Parahyangan",
      footerCopyright: "© 2026 Greenwood Barbers. Hak cipta dilindungi undang-undang.",
      footerContactBtn: "Hubungi WhatsApp Concierge"
    },
    en: {
      // Document Metadata
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
      
      // Section Headlines & Services
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
      
      // Footer
      footerHours: "Open Wednesday–Monday, 10:00–20:00 WIB • Closed Tuesdays",
      footerTagline: "Bandung's First Gentlemen's Retreat • Kota Baru Parahyangan",
      footerCopyright: "© 2026 Greenwood Barbers. All rights reserved.",
      footerContactBtn: "Chat WhatsApp Concierge"
    }
  };

  // 2. SMART LANGUAGE CONTROLLER (Auto-detect browser preference if not manually selected)
  function detectInitialLanguage() {
    var stored = localStorage.getItem('greenwood_lang_v3');
    if (stored === 'id' || stored === 'en') return stored;

    // Check legacy storage
    var legacy = localStorage.getItem('greenwood_lang_v2') || localStorage.getItem('greenwood_lang');
    if (legacy === 'id' || legacy === 'en') return legacy;

    // Smart auto-detection based on user's browser language
    var browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || '';
    browserLang = browserLang.toLowerCase();
    if (browserLang.indexOf('en') === 0) {
      return 'en';
    }
    return 'id'; // Default to Indonesian
  }

  var currentLang = detectInitialLanguage();

  function applyLanguage(lang) {
    if (!translations[lang]) lang = 'id';
    currentLang = lang;
    try {
      localStorage.setItem('greenwood_lang_v3', lang);
      localStorage.setItem('greenwood_lang_v2', lang);
      localStorage.setItem('greenwood_lang', lang);
    } catch (e) {}
    
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('translate', 'no'); // Prevent crude browser auto-translate collisions

    var dict = translations[lang];

    // Update Document Title & Meta Description
    if (dict.pageTitle && document.title) {
      document.title = dict.pageTitle;
    }
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.metaDesc) {
      metaDesc.setAttribute('content', dict.metaDesc);
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
        if (key === 'heroCtaBook') {
          el.innerHTML = dict[key] + ' &rarr;';
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Update Known Homepage Text if missing data-i18n
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

    // Update Reserve buttons on package cards
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
    getDictionary: function () { return translations[currentLang]; }
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
