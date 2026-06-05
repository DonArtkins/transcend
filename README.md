<div align="center">

# ✦ TRANSCEND ✦

### The Next Era of Digital Experiences

_Step into the Nexus — a boundless metagame layer where Web2 and Web3 converge into one interconnected universe of play._

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock&logoColor=black)](https://gsap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-fde047.svg)](./LICENSE)

</div>

---

## ◇ Enter the Nexus Realm

**Transcend** is an immersive, award-style landing experience built to feel less
like a website and more like a portal. Scroll-driven cinematics, clip-path reveals,
3D tilt cards, and a cosmic accent palette pull visitors through five interconnected
realms — from the interactive video Hero to the boundless "build the new era" call
to action.

It's a love letter to motion-first web design: every section is choreographed with
GSAP, every video is delivered adaptively through Cloudinary, and the whole thing
stays buttery on mobile.

## ◇ Realms of the Experience

The site is composed as a journey through distinct, themed sections:

| Realm | Section | What awaits |
| :---- | :------ | :---------- |
| **Nexus** | `Hero` | An interactive video core — hover and click the center to warp between ten cinematic clips, with a scroll-driven clip-path reveal. |
| **Vortex** | `About` | A pinned, full-screen image expansion that opens into the cosmic expanse with an immersive caption. |
| **The Nexus Layer** | `Features` | A bento grid of realms — Lumina, Aether, Synapse, Orion — each on a 3D tilt card with cursor-tracking glow. |
| **The Hidden Realm** | `Story` | A mouse-reactive 3D parallax image masked into a hexagonal portal. |
| **Join the Nexus** | `Contact` | Floating clipped image shards and a bold "build the new era of experiences together" finale. |

## ◇ Powers & Mechanics

- **Scroll-choreographed motion** — GSAP + ScrollTrigger drive pinned sections, clip-path reveals, and staggered entrances.
- **Interactive video Hero** — a click-to-warp core that cycles ten clips while gracefully handling rapid clicks and mobile resize quirks.
- **Adaptive media delivery** — Cloudinary transformations (`q_auto`, `f_auto`, poster frames) keep heavy video light and sharp.
- **3D tilt & cursor glow** — bento cards and the Story portal respond to pointer movement in real time.
- **On-brand loader** — a custom "Nexus portal" of counter-rotating orbital rings around a pulsing accent core.
- **Responsive command center** — a morphing hamburger overlay, scroll-aware floating nav, and an active-section indicator.
- **Themed details everywhere** — gradient scrollbar, sonar discovery beacon, 404 glitch, and a bleeding brand watermark.

## ◇ The Tech Constellation

| Layer | Technology |
| :---- | :--------- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router) + [React 19](https://react.dev/) |
| Language | [TypeScript 5.9](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) with `@theme` tokens + custom `@utility` classes |
| Animation | [GSAP 3](https://gsap.com/) + ScrollTrigger, `@gsap/react` |
| Media | [Cloudinary](https://cloudinary.com/) adaptive video & posters |
| Icons | [lucide-react](https://lucide.dev/) + [react-icons](https://react-icons.github.io/react-icons/) |
| Utilities | `clsx`, `tailwind-merge`, `class-variance-authority` |

## ◇ Open the Portal (Getting Started)

### Prerequisites

- **Node.js** 18.18+ (Node 20 LTS recommended)
- **npm** (or your package manager of choice)

### Summon the project

```bash
# 1. Clone the realm
git clone https://github.com/DonArtkins/transcend.git
cd transcend

# 2. Install the constellation of dependencies
npm install

# 3. Launch the dev portal
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) and step into the Nexus.

### Incantations (Scripts)

| Command | What it does |
| :------ | :----------- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production bundle |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint across the project |
| `npm run clean` | Clear the Next.js cache |

## ◇ Map of the Realm (Project Structure)

```
transcend/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout, metadata, Loader wrapper
│   ├── page.tsx          # Composes all realm sections
│   ├── globals.css       # Theme tokens, utilities & keyframe animations
│   ├── error.tsx         # Error boundary
│   └── not-found.tsx     # Glitch-styled 404
├── components/           # The realms & shared UI
│   ├── Hero.tsx          # Interactive video core
│   ├── About.tsx         # Pinned cosmic expansion
│   ├── Features.tsx      # Bento grid of realms
│   ├── Story.tsx         # Hidden realm portal
│   ├── Contact.tsx       # Join the Nexus finale
│   ├── Navbar.tsx        # Scroll-aware nav + mobile overlay
│   ├── Footer.tsx        # Brand, links & social
│   ├── Loader.tsx        # Nexus portal loader
│   ├── AnimatedTitle.tsx # Word-by-word title reveal
│   ├── Button.tsx        # Themed CTA button
│   ├── OptimizedVideo.tsx# Lazy, adaptive video player
│   └── ScrollToTop.tsx   # Back-to-top control
├── hooks/                # Custom React hooks
├── lib/                  # Cloudinary + className utilities
└── public/               # Fonts, icons & manifest
```

## ◇ Shaping the Realm (Theming)

The entire cosmic identity lives as design tokens in
[`app/globals.css`](./app/globals.css), inside a single Tailwind v4 `@theme`
block. It's the one source of truth — adjust a token and the whole universe
shifts with you. Nothing visual is hard-coded in components; they reference
these tokens through Tailwind utilities (`text-accent`, `bg-primary-50`,
`rounded-frame`) or `var(--token)`.

### Color

```css
/* Brand core — luminous off-whites */
--color-primary:     #f0f2fa;
--color-primary-50:  #dfdff0;   /* body background */
--color-primary-75:  #dfdff2;
--color-primary-100: #f0f2fa;
--color-primary-200: #010101;
--color-primary-300: #4fb7dd;

/* Signature electric gold */
--color-accent: #fde047;
--accent-rgb:   253 224 71;     /* channels: rgb(var(--accent-rgb) / <alpha>) */

/* Secondary acid-lime accents */
--color-secondary-100: #8e983f;
--color-secondary-300: #edff66;

/* Cosmic violets */
--color-violet:      #5d3fd3;   /* loader rings + ambient glow */
--violet-rgb:        93 63 211; /* channels: rgb(var(--violet-rgb) / <alpha>) */
--color-violet-deep: #5724ff;   /* gallery tile backdrop */

/* Off-white channels for translucent gradients/text */
--primary-50-rgb: 223 223 240;
```

> The `*-rgb` channel tokens exist so a single color can be reused at any
> opacity via `rgb(var(--accent-rgb) / 0.4)` — used by the loader, hero beacon,
> shimmer text, and the bento cursor glow.

### Typography

Custom faces are loaded from `public/fonts` via `@font-face` and exposed as
font tokens (usable as `font-zentry`, `font-general`, etc.):

```css
--font-zentry:         "zentry", ui-sans-serif, system-ui, sans-serif;
--font-general:        "general", …;   /* default body font */
--font-circular:       "circular-web", …;
--font-robert-medium:  "robert-medium", …;
--font-robert-regular: "robert-regular", …;
```

### Radii, surfaces & motion

```css
/* Corner radii */
--radius-card:  0.375rem;   /* bento tiles */
--radius-frame: 0.5rem;     /* hero/contact cards, floating nav, gallery */

/* Glass surfaces (the frosted outline + glow shared across cards) */
--color-glass-border: rgb(255 255 255 / 0.2);
--shadow-glass: inset 0 1px 1px …, inset 0 0 24px …, 0 18px 40px -12px …;

/* Shared easing curve for nav + loader transitions */
--ease-nav: cubic-bezier(0.65, 0.05, 0.36, 1);
```

### Global spacing rhythm

The recurring layout rhythm (page padding, section spacing, nav offsets) is
tokenized too, so the whole site breathes consistently:

```css
--spacing-page-x:      1.25rem;  /* base horizontal page padding */
--spacing-page-x-lg:   5rem;     /* desktop horizontal page padding */
--spacing-section-y:   6rem;     /* vertical section rhythm */
--spacing-nav-offset:  1rem;     /* fixed nav top offset */
--spacing-nav-link-gap:2.5rem;   /* gap between desktop nav links */
--spacing-title-x:     8rem;     /* animated-title side padding (>=sm) */
```

Reusable visual effects (`border-hsla`, `hero-heading`, `bento-tilt_*`,
`nav-hover-btn`, and more) live as `@utility` classes that consume these tokens,
so there are no magic numbers or stray hex values scattered through the realm.

## ◇ Contributing

Pioneers welcome. If you'd like to help shape the next era of experiences, read the
[**Contributing Guide**](./CONTRIBUTING.md) before opening a portal (pull request).

## ◇ License

Released under the [MIT License](./LICENSE). Build freely, explore boundlessly.

---

<div align="center">

_Enter the Nexus Realm. Pioneer the Digital Frontier._

**© Transcend 2026**

</div>
