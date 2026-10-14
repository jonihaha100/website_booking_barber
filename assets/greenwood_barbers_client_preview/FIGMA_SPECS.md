# Greenwood Barbers: Luxury Brand Design System & Specification Tokens

This document serves as the technical blueprint, luxury design token reference, and copywriting standard for the 3 distinct Figma Design Models of **Greenwood Barbers**, designed around the high-end British barbering reference (**Truefitt & Hill London, St. James's & Mayfair Heritage**).

---

## 1. Brand Color Standards (Luxury Palette)

| Token Name | Hex Code | Purpose & Application |
| :--- | :--- | :--- |
| `--brand-deep-emerald` | `#053827` | Primary deep emerald green, regal backdrop, brand pillars |
| `--brand-noir-emerald` | `#021a12` | Dark charcoal emerald noir for high-contrast containers |
| `--brand-gray-orange-gold` | `#ad8330` | Official gray-orange / antique ochre gold: titles, borders, buttons |
| `--brand-gold-bright` | `#cda34b` | Bright gold accent highlight, active indicators, hover states |
| `--brand-gold-light` | `#f3e6c8` | Soft cream gold text for metadata and status badges |
| `--card-white` | `#ffffff` | Pure white card surfaces for high legibility (senior-friendly 50+) |
| `--card-text` | `#0f172a` | Deep slate text inside white cards (WCAG AAA contrast) |

---

## 2. Typography Reference (Truefitt & Hill London Standards)

- **Headings & Display**: `'Cormorant Garamond', Georgia, serif` (Google Fonts: 400, 500, 600, 700).
  - Characterized by classical proportion, dignified serifs, and royal heraldic authority.
  - Subheadings and kickers use uppercase tracking (`letter-spacing: 2px` to `3px`).
- **Body & Interactive Fields**: `'Plus Jakarta Sans', system-ui, sans-serif` (400, 500, 600, 700).
  - Modern humanist grotesque ensuring maximum legibility across screen sizes and accessibility for guests aged 50+.

---

## 3. The 5 In-House Master Barbers

1. **Bramantyo**: Head Barber & Founder - Classic English Tapers & Precision Shear Layering.
2. **Rian Pratama**: Master Barber - Traditional Hot Towel Wet Shaves & Signature Beard Sculptures.
3. **Dimas Setiawan**: Master Barber - Precision Shear Texturing & Botanical Scalp Therapies.
4. **Farhan Akbar**: Master Stylist - Modern Gentleman Pompadours & Contemporary Scissor Craft.
5. **Aldi Maulana**: Artisan Barber - Straight-Razor Outlining & Luxury Beard Detailing.

---

## 4. The 3 Distinct Luxury Landing Page Concepts

### Model 1: British Heritage Flagship (FINAL CHOSEN PRODUCTION DESIGN)
- **File**: `FIGMA_MODEL_1_BRITISH_HERITAGE.html`
- **Status**: **CONFIRMED & FINAL CHOICE FOR PRODUCTION DEVELOPMENT**.
- **Aesthetic & Technical Standards**:
  - **Color Tokens Strictly Maintained**: Deep Obsidian Pine (`#030c08`), Deep Forest Pine (`#06150e`), Brand Emerald (`#063827`), Gilded Antique Gold (`#c59b48`, `#e2be6c`), and Warm British Cream (`#f7f2e7`).
  - **Copywriting Excellence (Patek Philippe Reference)**: Haute horlogerie fine workmanship tone (*Quality and Fine Workmanship / Chronograph Watches*). Precision shear architecture, ceremonial straight-razor glides, noble botanical tonics, unalterable artisanal mastery, zero AI clichés, zero em-dashes.
  - **Barbershop Architecture (Barberia Indonesia Reference)**: Luxury gentlemen's barbershop structure in Jakarta. 6 signature treatments (*The Superior Barber Cut*, *Traditional Wet Shave*, *The Full Grooming Experience*, *Executive Beard Sculpture*, *Scalp & Shoulder Acupressure*, *Little Gentleman Cut*), Senopati flagship dossier, interactive Google Maps, and doorstep valet.
  - **Truefitt & Hill Chicago Components (Products, Barbers, Schedule, Payment, Booking)**:
    - *Produk*: Curated grooming apothecary (1805 Shaving Cream, Trafalgar Pre-Shave Oil, Silvertip Badger Brush, Aftershave Balm, Bay Rum Tonic, C.A.R. Hair Dressing) with interactive add-to-chair feature.
    - *Barber*: 5 Master Barbers (Bramantyo, Rian Pratama, Dimas Setiawan, Farhan Akbar, Aldi Maulana) across Chairs I to V with individual selection.
    - *Schedule (Jadwal)*: 7-day date selector with Morning Quiet Hours, Afternoon Executive Sessions, and Evening Private Sessions.
    - *Payment*: In-Chair (Cash/Debit/Card), QRIS Instant Dynamic, and VIP Bank Transfer (BCA Virtual Account).
    - *Booking*: Intuitive 5-step wizard.
  - **Automated 3-Channel Notification Center**:
    - WhatsApp Admin automated payload & direct dispatch link to `+62 812-8899-7721`.
    - Google Calendar 1-click sync link & instant downloadable `.ics` calendar invite file.
    - Email Passport automated dispatch to guest inbox & admin email (`admin@greenwoodbarbers.com`) with interactive live HTML email receipt preview.

### Model 2: Velvet Emerald Noir (Architectural Luxury Night - Approved Reference)
- **File**: `FIGMA_MODEL_2_MODERN_NOIR.html`
- **Aesthetic**: Exclusive Private Night Clubroom. Intimate velvet emerald night canvas (`#031c14` & `#06271c`), antique gold borders, high-contrast serif typography.
- **Key UX Features**:
  - Razor-sharp 1px architectural gridlines in gray-orange gold (`#ad8330`).
  - Sleek compact treatment cards in an intimate luxury grid.
  - High-end dark mode 4-step wizard.
  - Approved by client as core modern luxury reference.

### Model 3: The Mayfair Private Suite (Executive Grooming Lounge & Clean Aligned Menu)
- **File**: `FIGMA_MODEL_3_ARTISANAL_AMBER.html`
- **Aesthetic**: Executive VIP Private Suite inspired by Truefitt & Hill Mayfair VIP rooms. Unified dark velvet emerald palette (`#031c14`, `#083325`, `#053827`, `#ad8330`, `#cda34b`), 100% refined commercial English, serene executive privacy, and natural readability for senior gentlemen (50+).
- **Key UX Features**:
  - Panoramic Executive Masthead with 4 Comfort Pillars (Acoustic Privacy, Zero Wait Guarantee, Dedicated Master Barber, Doorstep Valet).
  - Clean, perfectly aligned Master Grooming Menu structured as a 2-column architectural grid matching Model 2 standards with balanced card heights, gold hair-line dividers, and instant step-jump selection.
  - Executive Atelier Gallery of 5 Master Barbers with private suite credentials.
  - Private Suite Quality Charter.
  - Unhurried 4-step concierge reservation engine with categorized time bands (Morning Quiet Hours, Afternoon Executive Sessions, Evening Suite Sessions).

---

## 4. Master Showcase Hub
- **File**: `index.html`
- **URL**: `http://localhost:3000/index.html`
- **Features**:
  - Live switcher between the 3 distinct luxury models.
  - Responsive frame previews: Desktop (1440px), Mobile iPhone (390px), and Figma Multi-Frame Canvas (all 3 models side-by-side).
  - Luxury Brand Token Drawer displaying live color swatches and hex codes.

---

## 5. PRD Compliance & Strict Architecture Rule
- **ZERO Admin / Cashier Screens**: No cashier login, no admin tables. The cashier monitors incoming bookings solely via automated WhatsApp alerts.
- **Instant Booking Ticket**:
  - Official WhatsApp customer confirmation ticket generated automatically.
  - Automatic cashier WhatsApp dispatch notification.
  - One-click Google Calendar sync URL and downloadable `.ics` calendar file.
- **100% Anti-Slop Compliant**: Zero em-dashes, zero AI clichés, transparent commercial buyer guarantees.
