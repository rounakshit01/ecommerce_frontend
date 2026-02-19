# LUXE — Considered Objects
## E-Commerce Website — Complete Frontend

---

### Project Overview

A premium, editorial-aesthetic e-commerce website built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies. Designed around the concept of "considered objects": handcrafted goods chosen for their longevity and quality.

---

### Folder Structure

```
luxe-store/
├── index.html          ← Main file (all pages via SPA routing)
├── css/
│   └── style.css       ← Complete design system + all styles
├── js/
│   ├── products.js     ← Product data (JSON-like JS objects)
│   └── app.js          ← Application logic
└── README.md           ← This file
```

---

### Design Language

**Aesthetic Direction:** Editorial luxury — inspired by high-end design magazines and artisan goods brands. Not a typical e-commerce template.

**Color Palette:**
- `--ink` (#1a1814) — Deep warm charcoal, primary
- `--parchment` (#f5f0e8) — Warm off-white, background
- `--gold` (#b8935a) — Copper/gold accent
- `--parchment-dark` (#ede8dc) — Secondary background

**Typography:**
- Display: `Cormorant Garamond` — Serif, editorial, elegant
- Body: `DM Sans` — Clean, modern, readable

**Spacing:** 4px base grid (--space-1 through --space-32)

---

### Features Implemented

#### Core Pages
- [x] **Home** — Hero, ticker, featured products, categories, editorial strip, testimonials, newsletter
- [x] **Shop** — Product grid with filters, sorting, live search
- [x] **Product Detail** — Image gallery, rating, quantity selector, add to cart, wishlist, accordions, reviews
- [x] **Cart** — Item management, quantity controls, order summary, coupon field
- [x] **Checkout** — Full form with real-time validation, payment method selection
- [x] **Login & Signup** — Auth UIs with social login option
- [x] **Footer** — Multi-column with social icons, legal links

#### E-Commerce Features
- [x] Add to cart / remove from cart
- [x] Dynamic cart badge count (localStorage persistent)
- [x] Product filtering by category
- [x] Price range filtering
- [x] Sorting (featured, newest, price asc/desc, rating)
- [x] Live search (debounced, 300ms)
- [x] Wishlist toggle with localStorage persistence
- [x] Product image hover zoom effect
- [x] Fully responsive (mobile, tablet, desktop)
- [x] Smooth page transitions
- [x] Sticky navbar with scroll effect (glass morphism)

#### Technical
- [x] Semantic HTML5
- [x] CSS custom properties (design tokens)
- [x] CSS Grid + Flexbox layout
- [x] Intersection Observer for scroll-triggered reveals
- [x] Form validation (real-time, on submit)
- [x] Card number / expiry input formatting
- [x] Toast notification system
- [x] SPA-style routing (no page reloads)
- [x] localStorage for cart + wishlist persistence
- [x] Accessible (ARIA labels, focus states, roles)

---

### How to Run

Simply open `index.html` in any modern browser. No build step required.

```bash
# Or serve with a local server:
npx serve luxe-store
# or
python3 -m http.server 8000
```

---

### Product Data

Edit `js/products.js` to add/modify products. Each product object:

```javascript
{
  id: 1,                          // Unique integer
  name: "Product Name",
  category: "home",               // home | kitchen | lighting | fashion | stationery
  price: 189,                     // Number
  originalPrice: 240,             // Number | null (for sale items)
  rating: 4.8,                    // 0-5
  reviews: 124,                   // Integer
  badge: "Bestseller",            // "Bestseller" | "Sale" | "New" | null
  description: "...",
  details: ["Detail 1", ...],     // Array of strings
  images: ["url1", "url2", ...],  // Array of image URLs (min 1)
  tags: ["tag1", "tag2"]          // For search
}
```

---

### Browser Support

All modern browsers (Chrome, Firefox, Safari, Edge). IE not supported.
