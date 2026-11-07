/**
 * GREENWOOD BARBERS — BILINGUAL ENGINE (EN | ID)
 * Dual-language toggle (British Mayfair English / Bahasa Indonesia).
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
      navReserve: "RESERVE A CHAIR",
      
      // Index Hero
      heroBadge: "KOTA BARU PARAHYANGAN",
      heroTitle: "Bandung's First Gentlemen's Retreat",
      heroSubtitle: "The hour is yours. A quiet barbershop in the hills of West Bandung.",
      heroCtaBook: "RESERVE A CHAIR",
      
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
      footerContactBtn: "Chat WhatsApp Concierge"
    },
    id: {
      // Navigation
      navHome: "Beranda",
      navAbout: "Tentang Kami",
      navContact: "Kontak",
      navReserve: "RESERVASI KURSI",
      
      // Index Hero
      heroBadge: "KOTA BARU PARAHYANGAN",
      heroTitle: "Tempat Singgah Perawatan Pria Pertama di Bandung",
      heroSubtitle: "Waktu seutuhnya milik Anda. Barbershop tenang dan eksklusif di perbukitan Bandung Barat.",
      heroCtaBook: "RESERVASI KURSI",
      
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
      footerContactBtn: "Hubungi WhatsApp Concierge"
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

    var heroCtaBook = document.querySelector('.clean-hero-actions .btn-primary, .clean-hero-actions .btn-clean-reserve');
    if (heroCtaBook && !heroCtaBook.hasAttribute('data-i18n')) {
      heroCtaBook.textContent = dict.heroCtaBook + " →";
    }

    // Dispatch Event for Page-specific listeners
    window.dispatchEvent(new CustomEvent('greenwood-language-changed', { detail: { lang: lang, dict: dict } }));
  }

  // 3. INJECT LANGUAGE SWITCHER
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
