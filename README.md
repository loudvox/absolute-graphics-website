# Absolute Graphics Co. — Website

**Custom apparel, embroidery, stickers, and signs. Printed with precision in Jacksonville, FL since 1999.**

This is the primary marketing website and future customer-facing quote/order platform for Absolute Graphics. The homepage is largely complete. The product catalog, quote flow, product decorator, and all secondary pages still need to be built.

---

## Current Status

| Area | Status |
|---|---|
| Homepage / Hero | Near complete |
| Scroll-scrubbed canvas animation | Complete |
| Navigation | Static (no routing yet) |
| Services section | Complete (static) |
| Trust stats / counters | Complete |
| Portfolio gallery (marquee) | Complete (placeholder images) |
| "For Whom" section | Complete (placeholder images) |
| Google Reviews integration | Component exists, requires Place ID in `.env` |
| Meet Steve section | Complete |
| Final CTA section | Complete (not connected to a form) |
| Footer | Complete (static links) |
| Secondary pages | Not started |
| Product catalog | Not started |
| Quote request flow | Not started |
| Product decorator / mockup tool | Not started |
| Admin backend | Not started |
| SanMar integration | Not started |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 6 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | GSAP 3 + ScrollTrigger, Lenis smooth scroll |
| Icons | Lucide React |
| Google Reviews | Custom component using Google Places API |
| Build tool | Vite |
| Package manager | npm |

**No backend or router is currently implemented.** The site is a single-page React application.

---

## What Is Implemented

### Homepage Sections (in order)

- **Fixed navigation header** with logo, nav links, phone number, and CTA button
- **Hero section**
  - Dark full-bleed layout with brand headline ("Bands & Brands, Print Here.")
  - Scroll-scrubbed canvas animation: 73 JPEG frames extracted from `hero.mp4`, rendered via `<CanvasSequence />` and synchronized with GSAP ScrollTrigger
  - Desktop only: hero section pins in place while the user scrolls through the frame sequence; unpins when the final frame is reached
  - Mobile: standard scroll behavior (no pin, no animation)
  - Entrance animation: headline lines reveal upward, underline draws in, description and CTAs fade in
- **Services grid** (Print / Stitch / Stick / Sign) with hover wash effect
- **Trust stats** with animated scroll-triggered number counters (20+ years, 100% recommendation)
- **Scrolling marquee** (services keywords and placeholder client names)
- **"For Whom" cards** (Bands / Brands / Schools / Businesses) with hover image wipe effect and 3D tilt
- **Google Reviews** component (renders live reviews when Place ID and API key are set in `.env`)
- **Portfolio gallery** with two opposing-direction auto-scrolling marquee rows (local images in `/public/gallery/`)
- **Meet Steve** section with portrait, quote, and bio
- **Final CTA section** with countdown timer gimmick (decorative only, not connected to a form)
- **Footer** with address, phone, email, social links, and navigation columns

### Components

| File | Purpose |
|---|---|
| `src/components/CanvasSequence.tsx` | Preloads and renders a JPEG frame sequence to an HTML canvas, scrubbed via GSAP ScrollTrigger |
| `src/components/CustomCursor.tsx` | Custom cursor overlay for desktop |
| `src/components/GoogleReviews.tsx` | Fetches and displays Google Place reviews |
| `src/components/MagneticButton.tsx` | Mouse-tracking magnetic pull effect on interactive elements |
| `src/components/Marquee.tsx` | Infinite auto-scrolling marquee, supports left/right direction |

### Assets in `/public`

| Path | Contents |
|---|---|
| `public/hero-sequence/` | 73 JPEG frames (frame_0001.jpg through frame_0073.jpg) at 834x1112px, 100% JPEG quality |
| `public/gallery/` | 12 local portfolio images (1.jpg through 12.jpg) |
| `public/logo.png` | Absolute Graphics Co. logo |
| `public/steve.jpg` | Owner portrait used in the "Meet Steve" section |
| `public/front.jpg` | Original static hero image (no longer in use) |

---

## What Still Needs To Be Built

### Pages
- [ ] Products / catalog page
- [ ] Product detail page
- [ ] Quote request page
- [ ] About page
- [ ] Contact page
- [ ] Artwork guidelines page
- [ ] Shipping and returns page
- [ ] Privacy policy page

### Quote and Order Flow
- [ ] Product selection
- [ ] Color and size picker
- [ ] Quantity input
- [ ] Decoration method selector (screen print, embroidery, DTG, vinyl)
- [ ] Artwork upload
- [ ] Product decorator / mockup placement tool
- [ ] Quote estimation logic
- [ ] Quote submission form
- [ ] Email notification on submission
- [ ] Quote confirmation page

### Product Catalog
- [ ] Product data model (name, category, colors, sizes, base price)
- [ ] Manual product entry for curated SanMar products
- [ ] Product images (hosted on Cloudflare R2)
- [ ] Color swatches
- [ ] Filtering and search

### Admin / Backend
- [ ] Product catalog management
- [ ] Quote request management and review
- [ ] Artwork file management
- [ ] Pricing rule configuration
- [ ] Manual quote adjustment before sending to customer
- [ ] SanMar product/pricing sync (future)

### Technical
- [ ] React Router or equivalent for multi-page navigation
- [ ] Replace Unsplash placeholder images with real client photos
- [ ] Connect footer and header nav links to real pages
- [ ] Connect "Get a Quote" CTA to the actual quote form
- [ ] Add Google Place ID to `.env` so live reviews load
- [ ] Set up Cloudflare R2 for image and file storage
- [ ] Set up backend API (Cloudflare Workers or equivalent)
- [ ] Set up database (Cloudflare D1 or MySQL, TBD)
- [ ] Production build and deployment pipeline

---

## Planned Architecture

```
Frontend (React/Vite)
  |
  +-- Product catalog (fetched from API or static JSON)
  +-- Quote flow (multi-step form)
  +-- Decorator (canvas-based mockup placement tool)
  +-- Assets loaded from Cloudflare R2 CDN URLs

Backend API (Cloudflare Workers or lightweight Node service)
  |
  +-- Product endpoints (list, detail, variants)
  +-- Quote request endpoints (submit, list, update)
  +-- Artwork upload (signed R2 upload URLs)
  +-- Email notification (new quote alert to admin)
  +-- SanMar sync (future, manual for MVP)

Storage (Cloudflare R2)
  |
  +-- Product images
  +-- Color swatch images
  +-- Uploaded customer artwork
  +-- Generated mockup previews
  +-- Quote PDFs or exports

Database (Cloudflare D1 or MySQL)
  |
  +-- Products, variants, colors, sizes
  +-- Quote requests
  +-- Artwork placement JSON
  +-- Pricing rules
```

---

## Planned Quote Flow

1. Customer selects a product category and specific product
2. Customer selects shirt/hat color
3. Customer enters sizes and quantities
4. Customer selects decoration location and method
5. Customer uploads artwork file
6. Customer places, scales, and rotates artwork on the product mockup in the decorator
7. System saves mockup preview image and placement data as JSON
8. System generates an estimated price
9. Customer submits quote request
10. Admin reviews the request, checks SanMar stock manually if needed, adjusts pricing, and sends the final quote to the customer

---

## Planned Product Decorator

The decorator should feel native to the website, not like an external tool. It should:

- Render a product mockup image (from Cloudflare R2) on a canvas
- Let the user drag, scale, and rotate their uploaded artwork onto the mockup
- Constrain placement to a defined print/embroidery zone per product
- Export a flattened preview image and a JSON payload describing placement (x, y, scale, rotation)
- Store both in Cloudflare R2 attached to the quote record

---

## Planned SanMar Integration

SanMar is the primary blank goods supplier. For MVP:

- Products will be entered manually or imported as a curated batch
- SanMar API is **not required for launch**
- Pricing, inventory, and product data can be managed manually through the admin interface

Future:
- Automate product sync via the SanMar API
- Pull live pricing and inventory availability
- Trigger purchase orders automatically when a quote is confirmed

---

## Project Structure

```
absolute-graphics/
  public/
    gallery/          Local portfolio images (1-12)
    hero-sequence/    73 JPEG frames for the scroll animation
    logo.png
    steve.jpg
    front.jpg         (unused, original static hero)
  src/
    components/
      CanvasSequence.tsx
      CustomCursor.tsx
      GoogleReviews.tsx
      MagneticButton.tsx
      Marquee.tsx
    App.tsx           All homepage sections live here currently
    index.css         Global design tokens (colors, fonts, utilities)
    main.tsx          React entry point
  index.html
  vite.config.ts
  tsconfig.json
  package.json
  .env.example
```

> As the project grows, `App.tsx` should be broken into individual page and section components and connected via a router.

---

## Local Development

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment file and fill in your values:
   ```bash
   cp .env.example .env
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

**Other scripts:**

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Build for production into `/dist` |
| `npm run preview` | Preview the production build locally |
| `npm run clean` | Remove the `/dist` folder |
| `npm run lint` | Run TypeScript type checking |

---

## Environment Variables

See `.env.example` for all supported variables. The minimum required for Google Reviews to work:

```
VITE_GOOGLE_API_KEY=your_google_api_key
VITE_GOOGLE_PLACE_ID=your_google_place_id
```

---

## Hero Animation Notes

The scroll-scrubbed hero animation is powered by GSAP ScrollTrigger and a custom `<CanvasSequence />` component.

- Source: `hero.mp4` (not committed to the repo to keep it lean)
- Frames were extracted using:
  ```bash
  ffmpeg -i public/hero.mp4 -qscale:v 2 public/hero-sequence/frame_%04d.jpg
  ```
- If the source video changes, delete the current frames and re-run the command above
- The component currently loads 73 frames (`frame_0001.jpg` through `frame_0073.jpg`)
- On desktop (`>= 1024px`): the hero section pins while the user scrolls through the sequence; standard scroll resumes after the last frame
- On mobile: no pin, no animation; the canvas element is hidden via Tailwind's `hidden lg:block` class

---

## Deployment Notes

- The frontend is a static Vite build and can be deployed to any static host (Cloudflare Pages, Netlify, shared hosting)
- Product images, uploaded artwork, and generated mockups should be served from Cloudflare R2, not bundled into the repo or the build
- Do not commit `.env` files; use the host's environment variable settings for production secrets
- When adding a backend, Cloudflare Workers are the preferred option to keep everything on the same edge network as R2 and D1

---

## Roadmap

### Phase 1 (current) - Homepage
- [x] Homepage design and layout
- [x] Scroll-scrubbed hero animation
- [x] All homepage sections
- [x] Google Reviews component
- [ ] Replace placeholder images with real client photos
- [ ] Connect all CTA links to real destinations

### Phase 2 - Secondary Pages and Routing
- [ ] Set up React Router
- [ ] About page
- [ ] Contact page
- [ ] Products landing page
- [ ] Artwork guidelines and shipping pages

### Phase 3 - Product Catalog
- [ ] Product data model and admin entry
- [ ] Product catalog page and product detail pages
- [ ] Cloudflare R2 for product images

### Phase 4 - Quote Flow and Decorator
- [ ] Multi-step quote request form
- [ ] Canvas-based product decorator
- [ ] Artwork upload to R2
- [ ] Quote estimation and submission
- [ ] Admin quote review interface
- [ ] Email notifications

### Phase 5 - Backend and Operations
- [ ] Backend API (Cloudflare Workers or equivalent)
- [ ] Database (Cloudflare D1 or MySQL)
- [ ] Admin dashboard
- [ ] SanMar product data import (manual batch for MVP)
- [ ] Future: SanMar API sync

---

*Built by GreenRock Creative for Absolute Graphics Jax, LLC.*
