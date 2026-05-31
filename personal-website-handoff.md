# Personal Website — Design & Content Handoff

> Handoff document for a copilot agent to implement a personal website from scratch.

---

## Overview

A single-page personal website for **Mashrur** — a Quantitative Developer based in London with a background in applied mathematics and quantitative finance. The site should feel like a **cyberpunk video game menu** — dark, terminal-inspired, precise, and technical — while conveying genuine depth as a researcher and engineer.

---

## Tech Stack (Recommended)

- **Framework**: React (Vite) or plain HTML/CSS/JS — single `index.html` is acceptable
- **Fonts**: `Orbitron` (headings/display) + `Share Tech Mono` (body/code) — load from Google Fonts
- **No UI libraries** — all styling hand-written to preserve aesthetic fidelity
- **Animations**: CSS-only (no GSAP, no heavy deps)
- **Deploy target**: GitHub Pages or Vercel

---

## Visual Design System

### Colour Palette

| Role | Value |
|---|---|
| Background (primary) | `#020810` |
| Background (panel) | `rgba(0, 10, 20, 0.8)` |
| Accent (primary) | `#00ffc8` (teal-green) |
| Text (primary) | `#e0f0ff` |
| Text (muted) | `rgba(160, 200, 240, 0.6)` |
| Text (dim) | `rgba(120, 160, 200, 0.45)` |
| Border | `rgba(0, 255, 200, 0.15)` |
| Glitch red | `rgba(255, 0, 100, 0.7)` |
| Glitch blue | `rgba(0, 200, 255, 0.7)` |

### Typography

- **Display / headings**: `Orbitron`, weights 700 and 900
- **Body / mono**: `Share Tech Mono`, weight 400
- No fallback to system fonts — load from CDN

### Background Effects

1. **Grid overlay** — fixed, full-viewport, `background-image` with two `linear-gradient` at 1px thickness, 40px spacing, `rgba(0,255,200,0.04)`. Non-interactive, `pointer-events: none`.
2. **Scanlines overlay** — fixed, full-viewport, `repeating-linear-gradient` creating 2px dark / 2px faint horizontal stripes. `pointer-events: none`.

### Panel Style

Bordered container with:
- `border: 1px solid rgba(0,255,200,0.15)`
- `background: rgba(0,10,20,0.8)`
- Corner bracket decorators — four `::before`/`::after` pseudo-elements (or four child `<span>` elements), 12×12px, positioned at each corner, using 1px solid `#00ffc8` borders on two sides each (top-left, top-right, bottom-left, bottom-right)
- `data-label` attribute rendered as a floating top-left caption: `position: absolute; top: -10px; left: 16px; background: #020810; padding: 0 8px; font-size: 10px; letter-spacing: 2px; color: #00ffc8; text-transform: uppercase`

### Section Labels

```
// section name ─────────────────────
```

Rendered as: `font-size: 10px; letter-spacing: 3px; color: rgba(0,255,200,0.4); text-transform: uppercase` with a flex `::after` pseudo-element line to fill the row.

### Interactive States (Nav Items)

- Default: dark background, muted text
- Hover: `background: rgba(0,255,200,0.06)` + left-side 3px `#00ffc8` border animates in (scaleY from 0 → 1, transform-origin bottom, 0.2s)
- Active: same as hover, persisted

### Animations

- **Glitch** on the name: CSS `::before` (red channel) + `::after` (blue channel), `clip-path` slicing, keyframe `translateX` nudges triggered every ~4s
- **Pulse dots**: `opacity` 1 → 0.4 → 1, 2s ease-in-out infinite
- **Blinking cursor** `█` in footer: `animation: blink 1s step-end infinite`
- **Skill bars**: animate width on load (from 0 to target), 0.8s ease-out, staggered by 100ms per bar

---

## Site Structure

The site is **single-page**, scrollable, with a fixed header and anchor-based section navigation.

```
Header (hero)
  └── Name, tagline, status bar

Nav Menu (4 items)
  ├── 01 · ABOUT
  ├── 02 · RESEARCH
  ├── 03 · PROJECTS
  └── 04 · CONTACT

Skill Loadout panel

About section

Research section

Projects section

Contact section

Footer
```

---

## Content

### Header / Hero

- **Name**: MASHRUR (display large, glitch effect)
- **Tagline**: `[ QUANT DEV · MATHEMATICIAN · RESEARCHER ]`
- **System tag**: `// system online — v2.0.26`
- **Status bar** (three pulse-dot items):
  - 🟢 `OPEN TO OPPORTUNITIES`
  - 🟡 `LONDON, GBR`
  - 🔵 `IMPERIAL COLLEGE · MSci 2024`

---

### Nav Menu

Four numbered items in a 2×2 grid. Each item has: number, title, short descriptor, keyboard hint label.

| # | Title | Descriptor | Key |
|---|---|---|---|
| 01 | ABOUT | Background & origin story | ↵ |
| 02 | RESEARCH | BSDEs, CVA, neural PDEs | R |
| 03 | PROJECTS | Monte Carlo, XVA tooling | P |
| 04 | CONTACT | Establish uplink | C |

Clicking a nav item smooth-scrolls to the corresponding section. Keyboard shortcuts (R, P, C, Enter) should also trigger scroll.

---

### Skill Loadout Panel

Label: `// attributes`

Skill bars with animated fill on scroll-into-view:

| Skill | Value |
|---|---|
| STOCHASTIC CALC | 92 |
| DEEP LEARNING | 80 |
| C++ / PYTHON | 88 |
| MONTE CARLO SIM | 95 |
| XVA / CVA | 85 |

Each row: `[skill name 120px] [bar track] [value]`
Bar fill: `linear-gradient(90deg, #00ffc8, rgba(0,255,200,0.4))` with a glowing right-edge marker.

---

### About Section

Label: `// about`

**Suggested copy** (agent should use this as a base, light editing fine):

> Quantitative Developer at a large sell-side bank in London, specialising in Counterparty Credit Risk — Monte Carlo simulation engines for CVA and CCR. First Class Honours MSci in Mathematics from Imperial College London (2024).
>
> I sit at the intersection of rigorous mathematical theory and production engineering. My current intellectual focus is on deep learning methods for solving high-dimensional PDEs — particularly deep BSDEs and neural operators applied to XVA problems.
>
> Outside of quant finance, I think carefully about AI/ML foundations and mathematical physics. I've presented on the history of mathematical market models to sell-side audiences, and judged algorithmic trading hackathons.

**Interest tags** (render as small bordered pill badges):
`#StochasticCalculus` `#DeepLearning` `#BSDEs` `#QuantFinance` `#AIResearch` `#SciFi` `#MechanicalWatches`

---

### Research Section

Label: `// research`

Introductory line: *Active research directions and technical interests.*

**Research directions** — render as 2-column card grid, each card in panel style:

**Card 1 — Deep BSDEs for XVA**
> Applying the Han-Jentzen-E deep BSDE framework to wrong-way risk-adjusted XVA PDEs. The goal is to replace Monte Carlo nesting with a neural network that learns the solution to the backward SDE directly, scaling to high-dimensional exposure profiles.

**Card 2 — Neural Operators for CVA Sensitivities**
> Using Fourier Neural Operators (FNO) and DeepONet architectures to learn solution operators for CVA sensitivity computation — eliminating the need for full re-simulation under bumped market scenarios.

**Card 3 — Score-Based Diffusion for Exposure Simulation**
> Exploring score-based generative models as a replacement for parametric copulas in joint exposure simulation, targeting more faithful tail dependence in multi-asset CCR portfolios.

**Card 4 — PINNs for SIMM / MVA Dynamics**
> Physics-Informed Neural Networks applied to Initial Margin dynamics under SIMM, targeting efficient MVA calculation without finite-difference grid methods.

Each card should show: title, body text, and a small tag cluster (e.g. `[BSDE]` `[XVA]` `[Deep Learning]`).

---

### Projects Section

Label: `// projects`

Render as a vertical list of project entries, each with: project name, description, tech stack tags, and a placeholder link icon.

**Project 1 — Monte Carlo CVA Engine**
> High-performance Monte Carlo simulation framework for Counterparty Credit Risk, implementing exposure profile generation across multi-asset portfolios with netting set aggregation and collateral modelling.
> Tags: `C++` `Python` `Monte Carlo` `CVA` `CCR`

**Project 2 — Market Models: A History**
> 14-slide presentation tracing the evolution of mathematical market models from Bachelier (1900) through Black-Scholes-Merton to Neural SDEs, delivered to a sell-side audience. Covers Itô calculus, HJM, LIBOR Market Model, and modern ML approaches.
> Tags: `Quantitative Finance` `Stochastic Calculus` `Presentation`

**Project 3 — Deep BSDE Solver (WIP)**
> Working implementation of the Han-Jentzen-E deep BSDE method applied to high-dimensional parabolic PDEs, with experimental extensions toward CVA-relevant payoff structures.
> Tags: `Python` `PyTorch` `BSDEs` `PDEs` `Research`

**Project 4 — This Website**
> Cyberpunk game-menu personal site. Dark terminal aesthetic with CSS grid, scanlines, glitch effects, and animated skill bars. No frameworks.
> Tags: `HTML` `CSS` `JS`

---

### Contact Section

Label: `// contact`

Short intro line: *Open to research collaborations, quant roles, and interesting conversations.*

Render three contact links as large nav-style rows (same hover style as main menu):

| Icon | Label | Value |
|---|---|---|
| `[GH]` | GITHUB | `github.com/[username]` — placeholder |
| `[LI]` | LINKEDIN | `linkedin.com/in/[username]` — placeholder |
| `[ML]` | EMAIL | `[email@domain.com]` — placeholder |

Agent note: leave link values as clearly-marked `[PLACEHOLDER]` strings so the owner can fill them in.

---

### Footer

```
SYS::PERSONAL_SITE_v2  |  IMPERIAL_MSci_2024  |  © 2026 MASHRUR          █
```

Right-aligned blinking cursor. Full-width border-top `rgba(0,255,200,0.1)`.

---

## Implementation Notes for Agent

1. **Mobile responsiveness**: Nav grid collapses to 1×4 on screens <600px. Skill bar label truncates to 10 chars. Font sizes scale down ~15%.
2. **Scroll animation**: Use `IntersectionObserver` to trigger skill bar fill animations and section fade-ins on scroll.
3. **Keyboard nav**: Bind `R`, `P`, `C`, `Enter` globally (when no input is focused) to scroll to corresponding sections.
4. **No JavaScript frameworks required** — vanilla JS + CSS is preferred to keep the bundle minimal and load fast.
5. **Placeholder links**: All external links (GitHub, LinkedIn, email) must be clearly marked `[PLACEHOLDER]` in both the rendered text and the HTML `href`.
6. **Accessibility**: Each section should have a proper `<section>` element with an `aria-label`. The decorative grid/scanlines overlays must have `aria-hidden="true"`.
7. **Glitch effect**: Implement as CSS-only using `::before` / `::after` on the name element. Do not use JavaScript for this.
8. **File structure**:
   ```
   index.html
   style.css
   main.js
   README.md
   ```

---

*End of handoff document.*
