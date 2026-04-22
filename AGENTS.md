# AGENTS.md

## Project Overview

Build two high-quality scrollytelling websites:

1. Anandwan (focus: differently-abled empowerment, crafts, human impact)
2. Govigyan (focus: environment, sustainability, soil, nature)

Both websites should be visually immersive, highly animated, and production-ready.

---

## Tech Stack

Frontend:

* React (Vite)
* Tailwind CSS
* Framer Motion (for animations)

Backend:

* Node.js
* Express.js
* MongoDB

Assets:

* Cloudinary (all images optimized with transformations)

---

## Core Features

### Scrollytelling

* Each section should animate on scroll
* Use smooth transitions and parallax effects
* Avoid heavy video unless necessary
* Prefer image sequences + motion

### Animations

* Smooth, premium feel (Apple-level inspiration)
* Add global toggle to disable animations
* Use GPU-friendly animations (transform, opacity)

### Image Handling

* Always use Cloudinary optimized URLs:

  * w_1600,q_auto,f_auto (hero)
  * w_1000,q_auto,f_auto (sections)
  * w_600,q_auto,f_auto (cards)
* Lazy loading required
* Optional blur placeholder

---

## Authentication Rules

* Users can view products without login
* Login/Signup REQUIRED to purchase
* Use JWT-based authentication

---

## E-commerce Rules

* Product listing (public)
* Add to cart (logged in only)
* Order system (protected routes)
* Fake payment success flow (CEP project)

---

## Admin Panel

* Separate admin login
* Add / update / delete products
* Manage inventory

---

## Pages Required

### Both Websites

* Home (scrollytelling heavy)
* About (mission + impact)
* Contact
* Donate
* Products
* Login / Signup

---

## Donate Page

* Emotional storytelling
* Impact-based donation tiers
* No real payment required (simulate success)

---

## Code Rules

* No inline CSS
* Use reusable components
* Keep files modular
* Max ~150–200 lines per file
* Use proper folder structure

---

## Performance Rules

* Optimize images
* Lazy load sections
* Avoid blocking scripts
* Ensure mobile responsiveness

---

## Behavior Instructions

* Always generate COMPLETE working code (not partial)
* Avoid placeholders like “add your logic here”
* If errors occur → FIX them automatically
* Prefer clean UI over complexity
* Maintain consistency across both websites

---

## UI/UX Philosophy

* Minimal but powerful
* Emotion-driven storytelling
* Clean typography
* Strong visual hierarchy

---

## Priority Order

1. UI + Scrollytelling
2. Performance
3. Features
4. Backend integration