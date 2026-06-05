# Transcend — Full Recreation Prompt

> Copy everything inside the prompt block below and paste it into any capable AI coding agent (Claude Code, Google AI Studio, Cursor, v0, etc.) to recreate this site **exactly** as it is. The prompt is self-contained: it includes the tech stack, design tokens, every section, all animations, exact copy, and the precise CSS values used.

---

## PROMPT (copy from here)

Build a single-page, dark, cinematic, gaming/web3-themed marketing website called **Transcend** — a polished clone of the Zentry aesthetic. It is a scroll-driven experience with looping background videos, GSAP scroll animations, a morphing video frame, a pinned full-screen image reveal, a bento feature grid, 3D tilt interactions, and a custom branded loader. Match every detail below precisely.

### 1. Tech Stack (use exactly this)

- **Framework:** Next.js 15 (App Router, `app/` directory), React 19, TypeScript (strict mode).
- **Styling:** Tailwind CSS **v4** (the CSS-first config style — `@import "tailwindcss";` plus an `@theme { ... }` block and `@utility` directives inside `globals.css`). Do **not** use a `tailwind.config.js`. PostCSS config uses `@tailwindcss/postcss` and `autoprefixer`.
- **Animation:** `gsap` ^3.x with the `ScrollTrigger` plugin, plus `@gsap/react`.
- **Icons:** `react-icons` (use `react-icons/fa` for `FaDiscord`, `FaTwitter`, `FaYoutube`, `FaMedium`, and `react-icons/ti` for `TiLocationArrow`) AND `lucide-react` (for `Play`, `ChevronUp`).
- **Utilities:** `clsx`, `tailwind-merge` (combine into a `cn()` helper), `class-variance-authority`.
- **TypeScript paths:** alias `@/*` → project root (so `@/components/...`, `@/lib/...`).
- **Scripts:** `dev: next dev`, `build: next build`, `start: next start`, `lint: eslint .`.
- `next.config.ts`: enable `reactStrictMode`, `compress`, set `eslint.ignoreDuringBuilds: true`, image `formats: ["image/avif","image/webp"]`, and `remotePatterns` allowing `res.cloudinary.com` and `images.unsplash.com`.

### 2. Project Structure

```
app/
  layout.tsx        (metadata, fonts, wraps children in <Loader>)
  page.tsx          (assembles all sections in order)
  globals.css       (Tailwind v4 theme + all custom utilities/animations)
  error.tsx         (error boundary)
  not-found.tsx     (custom glitchy 404)
components/
  Navbar.tsx
  Hero.tsx
  About.tsx
  Features.tsx
  Story.tsx
  Contact.tsx
  Footer.tsx
  Loader.tsx
  AnimatedTitle.tsx
  Button.tsx
  OptimizedVideo.tsx
  ScrollToTop.tsx
hooks/
  use-mobile.ts
lib/
  utils.ts
public/
  fonts/  (zentry-regular, general, circular-web, robert-medium, robert-regular — all .woff2)
  favicons + site.webmanifest
```

`app/page.tsx` renders, inside `<main className="relative min-h-[100dvh] w-screen overflow-x-hidden bg-black text-white selection:bg-primary selection:text-black">`, in this exact order:
`<Navbar /> <Hero /> <About /> <Features /> <Story /> <Contact /> <Footer /> <ScrollToTop />`.

### 3. Fonts (self-hosted via `@font-face`)

Load these five WOFF2 faces from `/public/fonts/` with `font-display: swap`. (If you don't have the original Zentry font files, substitute visually similar faces: **zentry** ≈ a heavy condensed display font like a bold geometric/grotesque, **general** ≈ a clean uppercase sans like a tracking-friendly grotesque, **circular-web** ≈ a humanist geometric sans, **robert-medium/regular** ≈ a neutral sans.)

```css
@font-face { font-family: "zentry"; src: url("/fonts/zentry-regular.woff2") format("woff2"); font-weight: normal; font-display: swap; }
@font-face { font-family: "general"; src: url("/fonts/general.woff2") format("woff2"); font-weight: normal; font-display: swap; }
@font-face { font-family: "circular-web"; src: url("/fonts/circularweb-book.woff2") format("woff2"); font-weight: normal; font-display: swap; }
@font-face { font-family: "robert-medium"; src: url("/fonts/robert-medium.woff2") format("woff2"); font-weight: 500; font-display: swap; }
@font-face { font-family: "robert-regular"; src: url("/fonts/robert-regular.woff2") format("woff2"); font-weight: 400; font-display: swap; }
```

### 4. Design Tokens (put inside `@theme { }` in globals.css)

Typography families:
- `--font-zentry: "zentry", ui-sans-serif, system-ui, sans-serif;`
- `--font-general: "general", ...;`
- `--font-circular: "circular-web", ...;`
- `--font-robert-medium`, `--font-robert-regular` similarly.

Color palette:
- `--color-primary: #f0f2fa;`
- `--color-primary-50: #dfdff0;` `--color-primary-75: #dfdff2;` `--color-primary-100: #f0f2fa;` `--color-primary-200: #010101;` `--color-primary-300: #4fb7dd;`
- **Signature electric gold accent:** `--color-accent: #fde047;` and `--accent-rgb: 253 224 71;`
- Acid-lime secondaries: `--color-secondary-100: #8e983f;` `--color-secondary-300: #edff66;`
- Cosmic violets: `--color-violet: #5d3fd3;` `--violet-rgb: 93 63 211;` `--color-violet-deep: #5724ff;`
- `--primary-50-rgb: 223 223 240;`

Radii: `--radius-card: 0.375rem;` (bento tiles), `--radius-frame: 0.5rem;` (hero/contact/nav/gallery).

Glass surfaces:
- `--color-glass-border: rgb(255 255 255 / 0.2);`
- `--shadow-glass: inset 0 1px 1px rgb(255 255 255 / 0.25), inset 0 0 24px rgb(255 255 255 / 0.04), 0 18px 40px -12px rgb(0 0 0 / 0.7);`

Spacing rhythm tokens: `--spacing-page-x: 1.25rem;` `--spacing-page-x-lg: 5rem;` `--spacing-section-y: 6rem;` `--spacing-nav-offset: 1rem;` `--spacing-nav-link-gap: 2.5rem;` `--spacing-title-x: 8rem;`

Motion: `--ease-nav: cubic-bezier(0.65, 0.05, 0.36, 1);`

Global `body`: `font-family: var(--font-general); width: 100dvw; background-color: var(--color-primary-50); overflow-x: hidden; font-feature-settings: "rlig" 1, "calt" 1;`

**Themed scrollbar:** thin 6px rail, track black, thumb = `var(--color-accent)` (gold) fully rounded; Firefox `scrollbar-width: thin; scrollbar-color: var(--color-accent) black;`

### 5. Custom Utilities (Tailwind v4 `@utility` directives in globals.css)

Define these exactly:

- `.border-hsla` → `border: 1px solid var(--color-glass-border); box-shadow: var(--shadow-glass);`
- `.nav-hover-btn` → `position: relative; margin-left: var(--spacing-nav-link-gap); font-family: var(--font-general); font-size: 0.75rem; line-height: 1rem; text-transform: uppercase; color: var(--color-primary-50); cursor: pointer; transition: color 0.3s var(--ease-nav);` with an `::after` underline (`bottom: -0.125rem; height: 2px; width: 100%; background: var(--color-accent); transform-origin: bottom right; transform: scaleX(0); transition: transform 0.3s var(--ease-nav);`). On `:hover` color becomes accent and the underline does a wipe-in (`transform-origin: bottom left; transform: scaleX(1)`). An `.is-active` state mirrors the hover (accent text + underline shown).
- `.floating-nav` → `background-color: black; border-radius: var(--radius-frame); border: 1px solid;`
- `.absolute-center` → absolute, top/left 50%, `translate(-50%, -50%)`.
- `.flex-center` → flex + center + center.
- `.mask-clip-path` → `clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);`
- `.hero-heading` → `text-transform: uppercase; font-family: var(--font-zentry); font-weight: 900; font-size: 3rem; line-height: 1;` responsive: `sm` → `right: 2.5rem; font-size: 4.5rem;` `md` → `8rem;` `lg` → `12rem;`
- `.about-subtext` → absolute, `bottom: -80dvh; left: 50%; width:100%; max-width:24rem; translateX(-50%); text-align:center; font-family: var(--font-circular); font-size:1.125rem; line-height:1.75rem;` `md` → `max-width: 34rem;`
- `.about-image` → absolute, `left:50%; top:0; z-index:20; height:50vh; width:24rem; translateX(-50%); transform-origin:center; overflow:hidden; border-radius:1.5rem;` `md` → `width: 30vw;`
- `.animated-title` → `display:flex; flex-direction:column; gap:0.25rem; font-size:4.5rem; line-height:1; text-transform:uppercase; color:white;` `sm` → side padding `var(--spacing-title-x)`; `md` → `font-size: 6rem;`
- `.animated-word` → `font-family: var(--font-zentry); font-weight:900; opacity:0; transform: translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg); transform-origin: 50% 50% -150px !important; will-change: opacity, transform; font-feature-settings: "ss01" on;`
- `.bento-tilt_1` → `position:relative; grid-column: span 2; overflow:hidden; border-radius: var(--radius-card); border: 1px solid var(--color-glass-border); box-shadow: var(--shadow-glass); transition: transform 0.3s ease-out; will-change: transform;`
- `.bento-tilt_2` → same but `grid-column: span 1; grid-row: span 1;`
- `.bento-title` → `text-transform:uppercase; font-size:2.25rem; line-height:2.5rem; font-weight:900; font-family: var(--font-zentry);` `md` → `font-size:3.75rem; line-height:1;`
- `.story-img-container` → `position:relative; width:100%; height:90vh; filter: url("#flt_tag");` `md` → `height:100dvh;`
- `.story-img-mask` → absolute full, overflow hidden, `clip-path: polygon(4% 0, 83% 21%, 100% 73%, 0% 100%);` `md` → `left:20%; top:-10%; width:80%; height:80%;`
- `.story-img-content` → absolute, `width:100%; height:50dvh; opacity:1; left:2.5rem; top:4rem;` 3D transform reset; `md`/`lg` reposition.
- `.gallery-img-container` / `.gallery-img` / `.gallery-img-4` (256px boxes, violet-deep bg, cover; `.gallery-img-4` rounds + scales up at sm/md).
- `.sword-man-clip-path` → `clip-path: polygon(16% 0, 89% 15%, 75% 100%, 0 97%);`
- `.contact-clip-path-1` → `clip-path: polygon(25% 0%, 74% 0, 69% 64%, 34% 73%);`
- `.contact-clip-path-2` → `clip-path: polygon(29% 15%, 85% 30%, 50% 100%, 10% 64%);`
- `.special-font` → `font-family: var(--font-zentry);` and `.special-font b` → same family with `font-feature-settings: "ss01" on;` (the `<b>` tags are used inside headings to swap in stylistic-alternate glyphs — they are NOT bold-weight changes).

**Indicator line** (audio equalizer bars):
```css
.indicator-line { height: 0.25rem; width: 1px; border-radius: 9999px; background: white; transition: all 0.2s ease-in-out; }
.indicator-line.active { background: var(--color-accent); animation: indicator-line 0.5s ease infinite; animation-delay: calc(var(--animation-order) * 0.1s); }
@keyframes indicator-line { 0%{height:4px;transform:translateY(0)} 50%{height:16px;transform:translateY(-4px)} 100%{height:4px;transform:translateY(0)} }
```

### 6. `lib/utils.ts` — Cloudinary helpers + cn()

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// Inject Cloudinary transforms (q_auto,f_auto,w_<width>) into /upload/ URLs.
export function cldVideo(url: string, width = 1280): string {
  if (!url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/q_auto,f_auto,w_${width}/`);
}

// Derive a sharp poster (frame at second 0) as an optimized .jpg.
export function cldPoster(url: string, width = 1280): string {
  if (!url.includes("/upload/")) return url;
  return url
    .replace("/upload/", `/upload/so_0,q_auto,f_auto,w_${width}/`)
    .replace(/\.(mp4|webm|mov|m4v)$/i, ".jpg");
}
```

> Media note: all videos/images come from a Cloudinary account (`res.cloudinary.com/dqyzd8vqh/...`). If you can't reach those exact assets, swap in your own looping MP4 clips (cosmic / sci-fi / DNA / orbital / synapse themes) and cosmic still images, keeping the same `cldVideo`/`cldPoster` rewrite logic.

### 7. `app/layout.tsx` — Metadata + Loader wrapper

- `<html lang="en" className="dark">`, `<body suppressHydrationWarning>` wrapping `{children}` inside `<Loader>`.
- Title: `"Transcend | The Next Era of Digital Experiences"`.
- Description: `"Step into the Nexus. A boundless metagame layer where Web2 and Web3 converge into one interconnected universe of play."`
- `applicationName: "Transcend"`, `manifest: "/site.webmanifest"`, full favicon set (`favicon.ico`, 16/32 png, apple-touch-icon 180), OpenGraph + Twitter `summary_large_image` cards using `/android-chrome-512x512.png`.
- `viewport.themeColor: "#000000"`.

### 8. `components/Loader.tsx` — "Nexus Portal" loader

A client component wrapping children. State `isLoading` (true initially). On mount: if `document.readyState === "complete"` hide after 400ms; otherwise hide 400ms after `window` `load` event; ALWAYS a 3500ms safety-fallback timeout so it never hangs. Lock `document.body.style.overflow = "hidden"` while loading.

When loading, render a full-screen `fixed inset-0 z-[9999] bg-black flex-center flex-col gap-8` overlay containing:
- Ambient cosmic glow: an absolute layer with two blurred radial blobs — a centered `h-[60vh] w-[60vw] rounded-full bg-violet-600/20 blur-[140px]` and a bottom-right `h-72 w-72 rounded-full bg-accent/10 blur-[120px]`.
- The portal: `<div class="nexus-loader">` with three `<span class="nexus-loader__ring">` + one `<span class="nexus-loader__core">`.
- Brand label: `<h2 class="special-font text-2xl font-black uppercase tracking-wider text-primary-100">Tr<b>a</b>nsc<b>e</b>nd</h2>` and a shimmering `<span class="nexus-loader-text font-general text-xs uppercase tracking-[0.35em]">Entering the Nexus...</span>`.

Loader CSS (in globals.css):
```css
.nexus-loader { --nl-size: 7rem; position: relative; display:inline-block; height: var(--nl-size); width: var(--nl-size); }
.nexus-loader__ring { position:absolute; inset:0; border-radius:9999px; border:2px solid transparent; }
.nexus-loader__ring:nth-child(1){ border-top-color: var(--color-accent); border-right-color: rgb(var(--accent-rgb)/0.25); animation: nexus-spin 1.6s var(--ease-nav) infinite; }
.nexus-loader__ring:nth-child(2){ inset:1.1rem; border-bottom-color: var(--color-violet); border-left-color: rgb(var(--violet-rgb)/0.3); animation: nexus-spin-reverse 1.15s var(--ease-nav) infinite; }
.nexus-loader__ring:nth-child(3){ inset:2.2rem; border-top-color: rgb(255 255 255/0.7); animation: nexus-spin 0.85s linear infinite; }
.nexus-loader__core { position:absolute; inset:0; margin:auto; height:0.85rem; width:0.85rem; border-radius:9999px; background: var(--color-accent); box-shadow: 0 0 16px 2px rgb(var(--accent-rgb)/0.6); animation: nexus-core-pulse 1.6s ease-in-out infinite; }
@keyframes nexus-spin { to { transform: rotate(360deg); } }
@keyframes nexus-spin-reverse { to { transform: rotate(-360deg); } }
@keyframes nexus-core-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:0.65} }
@keyframes nexus-text-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
.nexus-loader-text { background: linear-gradient(90deg, rgb(var(--primary-50-rgb)/0.35) 0%, rgb(var(--primary-50-rgb)/0.35) 40%, var(--color-accent) 50%, rgb(var(--primary-50-rgb)/0.35) 60%, rgb(var(--primary-50-rgb)/0.35) 100%); background-size:200% auto; -webkit-background-clip:text; background-clip:text; color:transparent; animation: nexus-text-shimmer 2.6s linear infinite; }
```

### 9. `components/Button.tsx` — Sliding-label pill button

Props: `id?`, `title`, `leftIcon?`, `rightIcon?`, `containerClass?`, `onClick?`. Renders:
```
<button class="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black transition-colors duration-500 {containerClass || 'bg-accent'}">
  {leftIcon}
  <span class="relative inline-flex overflow-hidden font-general text-xs uppercase font-semibold">
    <div class="translate-y-0 transition-transform duration-500 group-hover:-translate-y-[160%]">{title}</div>
    <div class="absolute inset-0 translate-y-[160%] transition-transform duration-500 group-hover:translate-y-0">{title}</div>
  </span>
  {rightIcon}
</button>
```
The effect: on hover the label slides up out of view while a duplicate slides up into place (vertical text swap).

### 10. `components/AnimatedTitle.tsx` — Word-by-word 3D reveal

Client component. Props: `title: string`, `containerClass?`. The `title` may contain `<br />` for line breaks and `<b>...</b>` for stylistic-alternate glyphs. Render `<div class="animated-title {containerClass}">`; split title on `"<br />"` into lines, each line a `flex-center flex-wrap gap-2 px-10 md:gap-3 justify-center` row; split each line on spaces into `<span class="animated-word special-font" dangerouslySetInnerHTML={{__html: word}} />`.

GSAP (registered ScrollTrigger): inside a `gsap.context` scoped to the container, a timeline triggered when the container hits `start: "100 bottom"`, `end: "center bottom"`, `toggleActions: "play none none reverse"`. Animate `.animated-word` to `{ opacity: 1, transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)", ease: "power2.inOut", stagger: 0.02 }` at position 0. Words start hidden/rotated (from the `.animated-word` utility) and flip into place as you scroll in.

### 11. `components/Navbar.tsx` — Fixed glass nav with scroll behavior

Client component. Data:
- `navItems = ["Nexus", "About", "Vault", "Prologue", "Contact"]`.
- `navSectionIds = { Nexus:"hero", About:"about", Vault:"features", Prologue:"story", Contact:"contact" }`.
- `socialLinks = [Discord, Twitter, YouTube, Medium]` (react-icons/fa), each `href:"#"` with a `label`.

Behavior:
- **Hide/show on scroll:** track `lastScrollY`. At `scrollY === 0`: nav visible, remove `floating-nav` class. Scrolling down: hide nav, add `floating-nav`. Scrolling up: show nav, add `floating-nav`. Animate the container with GSAP `gsap.to(ref, { y: isNavVisible?0:-100, opacity: isNavVisible?1:0, duration: 0.2 })`.
- **Active section highlight:** on scroll/resize (throttled via `requestAnimationFrame`), find which mapped section's bounding box covers the viewport vertical center (fallback: nearest by distance) and set `activeSection` to that element id; apply `is-active` to the matching `.nav-hover-btn`.
- **Audio toggle:** an equalizer of four `.indicator-line` bars next to a hidden `<audio loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3">`. Clicking toggles `isAudioPlaying` (plays/pauses the audio), toggles `.active` on the bars, and randomizes each bar height between 4–16px when active (reset to 4px when off). Bars also have staggered `animationDelay` of `bar * 0.1s`.
- **Mobile menu:** a morphing hamburger (three `h-0.5 w-6` white bars; when open the top/bottom rotate ±45° to form an X and the middle fades out). Opens a full-screen `fixed inset-0 z-40 bg-black/95 backdrop-blur-xl` overlay (hidden on `md+`) animated with GSAP (panel fades in 0.4s; `.mobile-nav-item`s stagger up `y:32→0`, stagger 0.07, delay 0.12). Lock body scroll while open. Auto-close at `innerWidth >= 768`. Overlay contains the nav links as big numbered entries (`01`, `02`, …) in `special-font text-5xl uppercase`, a full-width "Products" Button, and the four social icons.

Layout/markup:
- Outer: `<div class="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">` (this is the ref that gets the GSAP transform + `floating-nav` class).
- Inside: `<header class="absolute top-1/2 w-full -translate-y-1/2">` → `<nav class="flex size-full items-center justify-between p-4 mix-blend-difference text-white">` (note `mix-blend-difference` so the nav inverts against whatever is behind it).
- Left group (`flex items-center gap-7`): a logo `<Link href="/" class="special-font text-3xl tracking-widest font-bold ml-4 hover:opacity-80">` rendering `<span class="text-accent">TR</span><span class="text-primary">NS.</span>`, then a desktop-only gold "Products" `Button` (`containerClass="bg-accent md:flex hidden items-center justify-center gap-1 !px-4 !py-2 !text-xs"`, rightIcon = a small `w-2 h-2 rounded-full bg-black/60` dot).
- Right group (`flex h-full items-center`): desktop-only `<div class="hidden md:block">` mapping nav items to `<a class="nav-hover-btn {is-active?}" href="#{sectionId}">{label}</a>`; then the audio equalizer button (`ml-10`); then the mobile hamburger (`ml-6 md:hidden`).

### 12. `components/Hero.tsx` — Morphing video frame with interactive center

Client component; register `gsap` + `ScrollTrigger` and call `ScrollTrigger.config({ ignoreMobileResize: true })` (prevents mobile address-bar resize from re-triggering the clip animation).

Data: an array `VIDEO_URLS` of 10 Cloudinary MP4 URLs (cosmic/sci-fi loops: Orion, Hero, DNA, World, Synapse, BENTO themes). `totalVideos = VIDEO_URLS.length`. Helpers `getVideoSrc(i)` → `cldVideo(VIDEO_URLS[(i-1)%total])`, `getPosterSrc(i)` → `cldPoster(...)`. A `safePlay(video)` helper that calls `video.play()` and swallows the AbortError from interrupted plays.

State: `currentIndex` (start 1), `hasClicked` (false), a `isTransitioning` ref (locks clicks during the 1s transition), `nextVdRef`. `upcomingVideoIndex = (currentIndex % totalVideos) + 1`.

Interaction: clicking the center mini-video (only when not transitioning) sets `hasClicked=true`, advances `currentIndex` to `upcomingVideoIndex`, and locks until the GSAP transition completes.

Animations (two effects):
1. On `hasClicked`/`currentIndex` change: `gsap.set("#next-video", {visibility:"visible"})`, then `gsap.to("#next-video", { transformOrigin:"center center", scale:1, width:"100%", height:"100%", duration:1, ease:"power1.inOut", onStart: () => safePlay(nextVdRef.current), onComplete: () => isTransitioning.current=false })`, and `gsap.from("#current-video", { transformOrigin:"center center", scale:0, duration:1.5, ease:"power1.inOut" })`.
2. On mount: `gsap.set("#video-frame", { clipPath:"polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)", borderRadius:"0 0 40% 10%" })` then `gsap.from("#video-frame", { clipPath:"polygon(0% 0%,100% 0%,100% 100%,0% 100%)", borderRadius:"0 0 0 0", ease:"power1.inOut", scrollTrigger:{ trigger:"#video-frame", start:"center center", end:"bottom center", scrub:true } })`. (As you scroll, the rectangular video frame morphs into the angled, rounded shape.)

Markup:
- Root `<div id="hero" class="relative h-[100dvh] w-screen overflow-x-hidden bg-blue-50">`.
- `<div id="video-frame" class="relative z-10 h-[100dvh] w-screen overflow-hidden rounded-lg bg-primary-75">` containing:
  - The interactive center: `<div class="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg group">` → an inner `<div onClick={handleMiniVdClick} class="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">` containing a muted looping `<video id="current-video" class="size-64 origin-center scale-150 object-cover object-center">` (the next clip, previewed). So the preview is invisible/shrunk until hovered, then pops to full.
  - **Discovery beacon** (only while `!hasClicked`, `pointer-events-none`, fades out on group hover): two sonar ring `<span>`s (`size-20 rounded-full border border-accent/60` with `animation: hero-sonar 2.4s ease-out infinite`, the second delayed 1.2s), a pulsing accent core `<span class="size-12 rounded-full bg-accent text-black flex items-center justify-center" style="animation: hero-beacon-pulse 2.4s ease-in-out infinite">` containing a filled `<Play size={20} fill="currentColor" class="ml-0.5"/>`, and a hint label `<span>` reading **"Hover & Click"** in `font-general text-[10px] uppercase tracking-[0.2em] text-primary-100` with `animation: hero-hint-bob 2.4s ease-in-out infinite`, positioned just below the core.
  - `<video ref={nextVdRef} id="next-video" loop muted playsInline preload="metadata" class="absolute left-1/2 top-1/2 z-20 size-64 -translate-x-1/2 -translate-y-1/2 object-cover object-center invisible">`.
  - The main background `<video autoPlay loop muted playsInline preload="metadata" class="absolute left-0 top-0 size-full object-cover object-center">` (its src uses `currentIndex === totalVideos-1 ? 1 : currentIndex`).
  - Bottom-right big word: `<h1 class="special-font hero-heading absolute bottom-5 right-5 z-40 text-primary-75">C<b>E</b>ND</h1>`.
  - Top-left content block (`absolute left-0 top-0 z-40 size-full` → inner `mt-24 px-5 sm:px-10`): `<h1 class="special-font hero-heading text-primary-100">TR<b>A</b>NS</h1>`, then `<p class="mb-5 max-w-64 font-general text-primary-100 text-lg uppercase">Enter the Nexus Realm. <br/> Pioneer the Digital Frontier.</p>`, then a gold "Watch Trailer" `Button` with a `leftIcon={<Play size={16} class="mr-2 icon-sm"/>}`.
- A second, duplicated bottom-right `<h1 class="special-font hero-heading absolute bottom-5 right-5 text-black">C<b>E</b>ND</h1>` OUTSIDE the clipped frame (so the word shows in black underneath as the frame clips away).

Hero keyframes (globals.css):
```css
@keyframes hero-sonar { 0%{transform:scale(0.55);opacity:0.55} 100%{transform:scale(2.3);opacity:0} }
@keyframes hero-beacon-pulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgb(var(--accent-rgb)/0.45)} 50%{transform:scale(1.08);box-shadow:0 0 0 12px rgb(var(--accent-rgb)/0)} }
@keyframes hero-hint-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
```

### 13. `components/About.tsx` — Pinned full-screen image reveal

Client component; register ScrollTrigger + `ignoreMobileResize`. Root `<div id="about" class="min-h-screen w-screen bg-blue-50 pt-20">`.

Top block (`relative mb-8 mt-36 flex flex-col items-center gap-5`):
- Eyebrow `<p class="font-general text-sm uppercase md:text-[10px] !text-black">Welcome to Vortex</p>`.
- `<AnimatedTitle title="The Univ<b>e</b>rse of <br /> Experien<b>c</b>es Begins Here" containerClass="mt-5 !text-black text-center" />`.
- `<div class="about-subtext mt-20 text-center font-general text-xl text-black">` with `<p>The Nexus Layer unites every platform from countless dimensions</p>` and `<p class="text-gray-500">A new era of interoperable digital living is upon us.</p>`.

The reveal: `<div class="h-dvh w-screen" id="about-clip">` → `<div class="about-image-mask mask-clip-path about-image">` containing a Next `<Image fill priority sizes="100vw" class="object-cover object-center">` of a cosmic stars/galaxies photo, a vignette overlay (`bg-gradient-to-b from-black/20 via-transparent to-black/40`), and an `about-immersive-caption` (`absolute inset-x-0 bottom-16 px-6 text-center opacity-0`) with `<p class="font-zentry text-4xl uppercase text-white md:text-6xl">Step Into the Nexus</p>` and `<p class="font-circular text-sm text-white/70 md:text-base max-w-xl mx-auto mt-3">Every world, every dimension, woven into a single boundless layer.</p>`.

GSAP timeline (scoped via context), scrollTrigger on `#about-clip`: `start:"center center"`, `end:"+=1600 center"`, `scrub:0.5`, `pin:true`, `pinSpacing:true`. Phases: (1) `.to(".about-image-mask", { width:"100vw", height:"100vh", borderRadius:0, ease:"power1.inOut", duration:1 })` — the small framed image grows to fill the screen; (2) `.fromTo(".about-immersive-caption", {opacity:0,y:24}, {opacity:1,y:0,ease:"power1.out",duration:0.25}, ">-0.1")` — caption fades in; (3) `.to({}, {duration:0.9})` — empty hold so the full-screen image stays pinned a while.

### 14. `components/Features.tsx` — Bento grid with tilt + cursor-light

Client component. Two inner helpers:
- **`BentoTilt`** (`children`, `className`): tracks mouse over the element and applies `transform: perspective(700px) rotateX(<(relY-0.5)*5>deg) rotateY(<(relX-0.5)*-5>deg) scale3d(0.98,0.98,0.98)` on mousemove, clearing on mouseleave.
- **`BentoCard`** (`src`, `title`, `description?`, `isComingSoon?`): if `src` ends in `.mp4` render `<OptimizedVideo autoPlay loop muted>` else a Next `<Image fill>`; a glassy top-down sheen overlay (`bg-gradient-to-b from-white/10 via-transparent to-black/40`); content area (`relative z-10 flex size-full flex-col justify-between p-5 text-blue-50`) with `<h1 class="bento-title special-font">{title}</h1>` and optional `<p class="mt-3 max-w-64 text-xs md:text-base font-circular text-blue-50/90">{description}</p>`. If `isComingSoon`, a `border-hsla` pill button (`rounded-full bg-black px-5 py-2 text-xs uppercase text-accent/60 hover:text-accent`) with a `TiLocationArrow` + "coming soon", and a radial spotlight (`radial-gradient(120px circle at <cursorX>px <cursorY>px, rgb(var(--accent-rgb)/0.4), rgb(0 0 0/0.15))`) that follows the cursor and fades in on hover.

Section `<section id="features" class="bg-black pb-52 text-white">` → `<div class="container mx-auto px-3 md:px-10">`:
- Intro block (`px-5 py-32`): `<p class="font-circular text-lg text-blue-50 uppercase tracking-widest">Into the Nexus Layer</p>` and `<p class="max-w-md font-circular text-lg text-blue-50 opacity-50 mt-4">Immerse yourself in a rich and ever-expanding universe where a vibrant array of digital tools converge into an interconnected overlay experience that transforms the way you interact on your world.</p>`.
- Big feature tile: `<BentoTilt class="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65dvh]">` → `BentoCard` (DNA video) title `Lumi<b>n</b>a`, description "A cross-platform app turning your activities across Web2 and Web3 into a rewarding adventure."
- Grid `<div class="grid h-[135dvh] w-full grid-cols-2 grid-rows-3 gap-7">`:
  - `BentoTilt class="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2"` → `Aet<b>h</b>er` (World video), "A futuristic environment primed for exploration and limitless collaboration."
  - `BentoTilt class="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0"` → `Syn<b>a</b>pse` (Synapse video), "A gamified social hub adding a new dimension of play."
  - `BentoTilt class="bento-tilt_1 me-14 md:col-span-1 md:me-0"` → `Or<b>i</b>on` (Orion video), "A cross-world AI Agent making gameplay and workflow efficient.", `isComingSoon`.
  - `BentoTilt class="bento-tilt_2"` → a `bg-violet-300` tile with `<h1 class="bento-title special-font max-w-64 text-black">M<b>o</b>re co<b>m</b>ing s<b>o</b>on.</h1>` and a giant `TiLocationArrow` (`m-5 scale-[30] self-end text-black`).
  - `BentoTilt class="bento-tilt_2"` → a plain `OptimizedVideo` (BENTO loop, autoPlay loop muted, `size-full object-cover`).

### 15. `components/OptimizedVideo.tsx`

`forwardRef` `<video>` wrapper. Props extend video attrs minus `src`/`poster`, plus `width=1280`, `wrapperClassName`, `showSkeleton=true`. Rewrites `src` via `cldVideo(src,width)` and `poster` via `cldPoster(src,width)`, `preload="metadata"`, `playsInline`. Tracks `ready` state (set true on `onCanPlay`/`onLoadedData`); shows an `animate-pulse` zinc gradient skeleton until ready, and fades the video in (`transition-opacity duration-500`, `opacity-0`→`opacity-100`). Wrapper is `relative size-full overflow-hidden`.

### 16. `components/Story.tsx` — 3D-tilt clipped image

Client component. Root `<section id="story" class="min-h-dvh w-screen bg-black text-blue-50 py-20 px-5">` → `<div class="flex size-full flex-col items-center py-10 pb-24">`:
- Eyebrow `<p class="font-general text-sm uppercase md:text-[10px]">The Multiversal IP World</p>`.
- `<div class="relative size-full">` with `<AnimatedTitle title="The st<b>o</b>ry of <br /> a hidden real<b>m</b>" containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10" />` and a clipped image container `<div class="story-img-container h-[50vh] md:h-[70vh] w-[80vw] md:w-[60vw] mx-auto mt-[-5vh] md:mt-[-10vh]">` → inner mask `<div class="story-img-mask ... rounded-[20px] hover:scale-105" style="clip-path: polygon(4% 0, 83% 21%, 100% 73%, 0 100%)">` → Next `<Image fill>` of a dungeon/entrance image.
- **3D tilt:** on mousemove over the image, `gsap.to(element, { duration:0.3, rotateX: ((y-centerY)/centerY)*-10, rotateY: ((x-centerX)/centerX)*10, transformPerspective:500, ease:"power1.inOut" })`; reset rotateX/rotateY to 0 on mouseleave/up/enter.
- Below (`-mt-20 md:-mt-8 flex w-full justify-center md:me-44 md:justify-end`): a column with `<p class="w-full max-w-sm text-sm text-blue-50 opacity-80 md:text-base font-general">Where realms converge, lies Vortex and the boundless pillar. Discover its secrets and shape your fate amidst infinite opportunities.</p>` and a gold "Discover Prologue" `Button` (`containerClass="bg-accent text-black font-bold"`).

### 17. `components/Contact.tsx` — Clipped image collage CTA

Client component; register ScrollTrigger. Root `<div id="contact" ref class="mt-20 min-h-96 w-screen bg-blue-50 px-5 md:px-20 py-24">` → a black card `<div class="contact-card relative isolate rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">`:
- Left cluster (`absolute -left-20 top-0 z-10 hidden h-full w-72 overflow-hidden sm:block lg:left-10 lg:w-96`): two stacked clipped images each `mix-blend-difference` — first `contact-shard contact-clip-path-1 relative h-80 w-full`, second `contact-shard contact-clip-path-2 relative top-60 h-80 w-full lg:-top-20` (Next `<Image fill>` cosmic gateway images).
- Right "swordman" image (`absolute -top-64 left-20 z-10 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80`): `contact-shard sword-man-clip-path relative h-96 w-full mix-blend-difference md:scale-125` with a multi-layer mask (combine four `mask-image` gradients with `mask-composite: intersect` / `-webkit-mask-composite: source-in` so the top-left + bottom corners and top/bottom edges fade softly into black):
  - `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, #000 14%)`
  - `linear-gradient(to top, rgba(0,0,0,0.25) 0%, #000 22%)`
  - `radial-gradient(ellipse 75% 75% at 0% 0%, transparent 0%, rgba(0,0,0,0.4) 30%, #000 68%)`
  - `radial-gradient(ellipse 75% 60% at 45% 100%, transparent 0%, rgba(0,0,0,0.4) 30%, #000 68%)`
- Content (`flex flex-col items-center text-center`): `<p class="contact-eyebrow font-general text-[10px] uppercase">Join the Nexus</p>`, then `<h1 class="contact-title special-font mt-10 w-full text-5xl font-black uppercase leading-[0.9] md:text-[96px]">Let&#39;s b<b>u</b>ild the <br /> new e<b>r</b>a of <br /> exper<b>ie</b>nces t<b>o</b>gether</h1>`, then a `contact-cta mt-10` gold "Contact Us" `Button` (`containerClass="bg-accent text-black px-10 font-bold"`).

GSAP (scoped, scrollTrigger on `.contact-card` `start:"top 75%"`, `toggleActions:"play none none reverse"`): timeline fades `.contact-shard` from `opacity:0` (stagger 0.1, duration 0.8) — opacity-only so positions/overflow stay intact — then fades `[.contact-eyebrow, .contact-title, .contact-cta]` from `{opacity:0, y:24}` (stagger 0.1, duration 0.6) at `"-=0.4"`.

### 18. `components/Footer.tsx`

`<footer class="relative w-screen overflow-hidden bg-black text-blue-50">`. Ambient glow (two blurred blobs: top `bg-violet-600/20 blur-[120px]`, bottom-right `bg-accent/10 blur-[110px]`). Container `relative z-10 container mx-auto px-5 pt-20 md:px-10`:
- Top row (border-bottom `border-white/10 pb-12`, `md:flex-row md:items-end`): brand `<h2 class="special-font hero-heading uppercase leading-[0.85] text-blue-50">Tr<b>a</b>nsc<b>e</b>nd</h2>` + tagline `<p class="mt-6 max-w-md font-circular text-sm text-blue-50/60">Step into the Nexus. A boundless metagame layer where Web2 and Web3 converge into one interconnected universe of play.</p>`; and a "Back to top" `border-hsla` pill `<a href="#hero">` (gold `TiLocationArrow` rotated -90°, hover bg accent).
- Link columns (`grid grid-cols-2 md:grid-cols-4 gap-10 py-14`): **Explore** (Nexus→#hero, About→#about, Vault→#features, Prologue→#story), **Realms** (Lumina, Aether, Synapse, Orion → #features), **Connect** (Contact→#contact, Whitepaper, Careers, Support → #). Column headers `font-general text-xs uppercase tracking-[0.2em] text-accent`; links `font-circular text-sm text-blue-50/60 hover:text-blue-50`. Plus a **Follow** column with the four social icon buttons (`border-hsla size-10 rounded-full bg-white/5 hover:bg-accent hover:text-black hover:scale-110`).
- Bottom bar (border-top `border-white/10 py-8`): `© Transcend 2026. All rights reserved.` and "Privacy Policy" / "Terms" links (`hover:text-accent`).
- Oversized watermark bleeding off the bottom: `<span class="special-font block bg-gradient-to-b from-white/[0.06] to-transparent bg-clip-text text-[22vw] font-black uppercase leading-none text-transparent">Trns</span>`.

### 19. `components/ScrollToTop.tsx`

Client component. Shows a fixed `bottom-8 right-8 z-50 size-12 rounded-full bg-accent text-black` button with a `ChevronUp` (lucide) once `window.scrollY > 300`; smooth-scrolls to top on click. Hidden state: `pointer-events-none translate-y-10 opacity-0`; visible: `translate-y-0 opacity-100`; hover `scale-110 bg-white`.

### 20. `app/not-found.tsx` — Glitch 404

Server component. Full-screen `bg-black text-blue-50` centered. Ambient cosmic glow (violet + accent blurred blobs). A glitching "404": three stacked `<h1 class="special-font text-[28vw] md:text-[16rem] font-black uppercase leading-none">4<b>0</b>4</h1>` layers — base in `text-primary-100`, an accent layer with `[animation:glitch-shift_3s_steps(2,end)_infinite]`, and a `text-violet-400` layer with `[animation:glitch-shift-alt_3s_steps(2,end)_infinite]` (both `aria-hidden`, absolutely overlaid for an RGB-split flicker). Eyebrow "Lost in the Nexus" (accent, tracked). Body copy: "This realm doesn't exist on the digital frontier. The signal you were chasing has drifted beyond the known coordinates." A `border-hsla` "Return to Nexus" `<Link href="/">` pill with a `TiLocationArrow`. Oversized `Trns` watermark bleeding off the bottom.

404 keyframes (globals.css):
```css
@keyframes glitch-shift { 0%,92%,100%{transform:translate(0,0);opacity:0} 93%{transform:translate(-3px,1px);opacity:0.75} 95%{transform:translate(3px,-1px);opacity:0.75} 97%{transform:translate(-2px,-1px);opacity:0.75} }
@keyframes glitch-shift-alt { 0%,90%,100%{transform:translate(0,0);opacity:0} 91%{transform:translate(3px,-1px);opacity:0.7} 94%{transform:translate(-3px,1px);opacity:0.7} 96%{transform:translate(2px,1px);opacity:0.7} }
```

### 21. `app/error.tsx`

Client error boundary: logs the error in `useEffect`; renders a centered `bg-black text-white` view with "Something went wrong!" and a `reset()` button (`bg-accent text-black hover:bg-white`).

### 22. `hooks/use-mobile.ts`

`useIsMobile()` returning a boolean via `window.matchMedia("(max-width: 767px)")` (breakpoint 768).

### 23. Behavior & polish checklist (must all be true)

- Default site state is dark; `<html class="dark">`. Text selection is gold bg / black text.
- All major headings use `special-font` (the zentry display face) with embedded `<b>` tags swapping in stylistic-alternate glyphs (`ss01`) — these are glyph swaps, not weight changes.
- The accent gold `#fde047` is the single signature color, used for the logo "TR", active nav underline, buttons, beacon, scrollbar, hovers, and the loader.
- GSAP `ScrollTrigger` drives: AnimatedTitle word reveals, the Hero frame clip-morph, the About pinned grow-to-fullscreen, and the Contact stagger-in. Use `gsap.context()` for cleanup in every component and `ScrollTrigger.config({ ignoreMobileResize: true })` in Hero + About.
- Videos are muted, looping, `playsInline`, `preload="metadata"`, with Cloudinary `q_auto,f_auto,w_*` transforms and `so_0` posters.
- Fully responsive (mobile-first). Mobile gets the hamburger overlay; desktop gets inline nav links + the "Products" pill.
- Everything is one scrollable page (SPA-feel) with smooth in-page anchor navigation to section ids `hero / about / features / story / contact`.

Deliver a complete, runnable Next.js 15 project implementing all of the above exactly.

## (end of prompt)

---

### Notes for whoever runs this prompt

- **Assets:** This site uses a private Cloudinary library for its 10+ looping videos and cosmic stills. Replace the `res.cloudinary.com/dqyzd8vqh/...` URLs with your own Cloudinary (or any MP4/JPG host) assets — the `cldVideo`/`cldPoster` helpers only transform URLs containing `/upload/` and pass everything else through untouched.
- **Fonts:** The original uses the licensed Zentry-style font set (`zentry`, `general`, `circular-web`, `robert-medium`, `robert-regular`). Supply your own `.woff2` files in `public/fonts/`, or substitute visually similar faces as noted in section 3.
- **Audio:** The navbar ambient-audio toggle points at a SoundHelix demo MP3; swap for your own track if desired.
