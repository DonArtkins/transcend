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

The cosmic identity lives in [`app/globals.css`](./app/globals.css). The core palette
is defined as Tailwind `@theme` tokens:

```css
--color-primary: #f0f2fa;   /* luminous off-white */
--color-accent:  #fde047;   /* signature electric gold */
```

Custom typography (`zentry`, `general`, `circular-web`, `robert-*`) is loaded from
`public/fonts`, and reusable visual effects live as `@utility` classes
(`border-hsla`, `hero-heading`, `bento-tilt_*`, and more). Adjust the tokens and the
whole universe shifts with you.

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
