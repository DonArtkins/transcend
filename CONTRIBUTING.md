<div align="center">

# ✦ Contributing to TRANSCEND ✦

_Help pioneer the digital frontier. Every contribution shapes the Nexus._

</div>

---

Thanks for your interest in contributing to **Transcend**. Whether you're fixing a
flicker in a GSAP timeline, sharpening a clip-path, or adding a whole new realm, this
guide will help you enter the codebase smoothly and keep the universe consistent.

## ◇ Code of Conduct

Be kind, be constructive, be inclusive. We're building a welcoming realm for explorers
of every skill level. Harassment, gatekeeping, and hostility have no place in the Nexus.
Assume good intent, give thoughtful feedback, and help newcomers find their footing.

## ◇ Before You Begin

- **Search first.** Check existing [issues](../../issues) and [pull requests](../../pulls)
  to avoid duplicating work already in motion.
- **Open an issue for big changes.** For new realms, dependency changes, or anything
  that reshapes the experience, start a discussion before writing code so we can align
  on direction.
- **Small fixes need no ceremony.** Typos, broken links, and obvious bugs can go
  straight to a pull request.

## ◇ Setting Up Your Portal

```bash
# 1. Fork the repo, then clone your fork
git clone https://github.com/<your-username>/transcend.git
cd transcend

# 2. Install dependencies
npm install

# 3. Launch the dev server
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000). See the
[README](./README.md) for the full map of the realm and available scripts.

## ◇ Branching & Workflow

1. Create a focused branch off `main`:
   ```bash
   git checkout -b feat/your-realm-name
   ```
2. Make your changes in small, logical commits.
3. Keep the realm building and linting cleanly (see [Quality Gate](#-quality-gate-before-you-push)).
4. Push to your fork and open a pull request against `main`.

Use clear branch prefixes so intent is obvious at a glance:

| Prefix | For |
| :----- | :-- |
| `feat/` | A new feature or realm |
| `fix/` | A bug fix |
| `style/` | Visual, animation, or CSS-only changes |
| `docs/` | Documentation updates |
| `refactor/` | Code restructuring without behavior change |
| `chore/` | Tooling, deps, config |

## ◇ Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/). Keep the
subject under ~70 characters and in the imperative mood.

```
feat(hero): warp between clips on keyboard arrow keys
fix(navbar): keep active indicator in sync on resize
style(footer): soften the brand watermark gradient
docs(readme): add theming section
```

## ◇ Coding Conventions

Transcend is motion-first and detail-obsessed. Keep contributions in step with the
existing universe:

- **TypeScript everywhere.** Type your props and avoid `any`. Components are typed
  function components exported by name (e.g. `export const Hero = () => { ... }`).
- **Tailwind for styling.** Reach for utility classes first. Shared visual effects
  belong in `app/globals.css` as `@theme` tokens or `@utility` classes — don't
  hard-code the accent color, use `var(--color-accent)` / `text-accent`.
- **Respect the palette.** The signature electric gold (`#fde047`) and cosmic
  off-white (`#f0f2fa`) carry the brand. New colors should be deliberate and tokenized.
- **Animation with GSAP.** Use `gsap.context()` and clean up with `ctx.revert()` in
  effects. Register plugins behind a `typeof window !== "undefined"` guard, mirroring
  the existing components.
- **Media through Cloudinary.** Deliver video and posters with the `cldVideo` /
  `cldPoster` helpers in `lib/utils.ts` so nothing ships a 4K file into a 256px box.
- **Comment the "why."** The codebase explains tricky motion and mobile-viewport
  decisions in comments. Preserve that context when you touch those areas.
- **Accessibility matters.** Keep `aria-label`s on interactive controls, respect
  keyboard users, and don't trap focus. Decorative layers should be `pointer-events-none`.
- **Mobile is first-class.** Test scroll behavior on small viewports — pinned sections
  and clip-paths are sensitive to mobile address-bar resizing.

## ◇ Quality Gate (Before You Push)

Run these and make sure they pass:

```bash
npm run lint     # ESLint must be clean
npm run build    # Production build must succeed
```

Then manually sanity-check your change in the browser at desktop **and** mobile widths.
Motion bugs rarely show up in a diff.

## ◇ Opening a Pull Request

A great PR makes review effortless:

- **Title** in Conventional Commit style.
- **Summary** of what changed and why.
- **Screenshots or screen recordings** for anything visual — this is a motion-heavy
  project, so a short clip is worth a thousand words.
- **Testing notes** — what you checked, and on which viewports.
- **Linked issue** if one exists (`Closes #123`).

Keep PRs focused. One realm, one fix, one idea per PR makes for faster, friendlier review.

## ◇ Reporting Issues

Found a rift in the Nexus? Open an issue with:

- A clear, descriptive title.
- Steps to reproduce.
- Expected vs. actual behavior.
- Browser, OS, and viewport size (mobile vs. desktop matters here).
- A screenshot or recording if it's visual.

For feature ideas, describe the experience you imagine and how it fits Transcend's
cosmic, motion-first identity.

## ◇ License

By contributing, you agree that your contributions are licensed under the project's
[MIT License](./LICENSE).

---

<div align="center">

_Pioneer the Digital Frontier. We're glad you're here._

</div>
