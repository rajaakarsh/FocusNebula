# FocusNebula

A pixel-perfect recreation of [focusnebula.in](https://focusnebula.in/) built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 15 (App Router)** – Core framework for routing and rendering
- **React 19** – Component-based UI rendering
- **TypeScript** – Type safety and development tooling
- **Tailwind CSS v4** – Utility-first styling system
- **WebGL (GLSL shaders)** – Custom animated nebula background

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Features

### SPA Architecture
- Fixed-position sections controlled with the `.active` class
- Internal scrolling within each section
- State management handled via the `page.tsx` controller

### WebGL Background
- Built with raw GLSL shaders (no Three.js dependency)
- Uses fractional Brownian motion (`fbm`) for nebula field generation
- GPU tier detection with automated performance scaling:
  - **Ultra:** 45 FPS
  - **High:** 36 FPS
  - **Medium:** 30 FPS
  - **Low:** 20 FPS
- Includes CSS fallback for low-end devices

### Tubelight Navigation
- Animated lamp indicator with smooth transitions
- Calculates positions using `offsetWidth` and `offsetLeft` to prevent layout thrashing
- Uses CSS transition: `0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`

## Content Sections

| Section | Key Elements |
| --- | --- |
| **Home** | Hero section with glow text and "Beta · v1.0" badge, 3 live stat cards (Supabase count-up), Two Focus Modes faction grid, 3-step How It Works flow, Design Principles, and CTA |
| **About** | Centered "Experience a New Era of Focus" glow text |
| **Pilots** | Faction preview with lock icon, "Faction Locked" badge, and coming soon message |
| **Spacewalkers** | Full faction page with space mockup, celestial arc, orbit counter, milestones, and 5-rank progression |

## Project Structure

```text
app/
├── layout.tsx        # Root layout: fonts, metadata, SVG glow filter
├── page.tsx          # SPA controller: manages active section state
└── globals.css       # Global styles: keyframes, custom properties

components/
└── landing/
    ├── BgCanvas.tsx    # WebGL shader background implementation
    ├── BgOverlay.tsx   # Gradient overlay and navigation fade
    ├── TubelightNav.tsx # Animated navigation component
    ├── GlowText.tsx    # Text component with SVG filter animation
    └── sections/
        ├── HomeSection.tsx         # Hero, stats, faction grid, CTA
        ├── AboutSection.tsx        # Centered glow text section
        ├── PilotsSection.tsx       # Locked faction preview
        └── SpacewalkersSection.tsx # Full faction page with visual mockup
```

## Design System

### Fonts
- **Outfit** (300–900 weights) – Primary UI font
- **Space Grotesk** – Monospace and data display

### Colors
| Token | Value | Usage |
| --- | --- | --- |
| Body BG | `#0C0D11` | Page background |
| Card BG | `#121622` | Stat cards and PS blocks |
| Cyan | `#9FE8FF` | Spacewalkers accent |
| Purple | `#C7B8FF` | Faction color |
| Nav Lamp | `#C77DFF` | Active navigation indicator |

## Animations

- `particleDrift` – Hero particles (16s, transform and opacity only)
- `mfOrbit` – Faction preview orbital dot (14s linear infinite)
- `fpOrbit` – Planet orbital system (26s)
- `onloadopacity` – Glow text reveal (1.5s cubic-bezier)
- `fadeIn` – Section transitions (0.4s)
- **Scroll reveal** – `IntersectionObserver` with `.reveal.in` class

## Responsive Design

| Breakpoint | Layout |
| --- | --- |
| `> 1000px` | Multi-column layout |
| `≤ 1000px` | Single-column grids |
| `≤ 560px` | Mobile-optimized: scrollable nav, full-width buttons, condensed padding |

## Asset Notes

The `video/spacewalker.mp4` file is a placeholder. Replace it with the original video when available.

The current implementation utilizes:
- Radial gradient space background
- Animated star field
- Orbiting planet with glow ring
- HUD timer overlay