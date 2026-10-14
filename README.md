<div align="center">

# ✦ A K S H A T &nbsp; R A W A T ✦
### *Selected Works & Digital Architecture // Folio Edition*

[![Live Domain](https://img.shields.io/badge/LIVE%20TRANSMISSION-akshatrawat.is--a.dev-d4af37?style=for-the-badge&logo=vercel&logoColor=white)](https://akshatrawat.is-a.dev)
[![Vite](https://img.shields.io/badge/VITE-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![GSAP 3](https://img.shields.io/badge/GSAP-3.15-0AE448?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com)
[![Three.js](https://img.shields.io/badge/THREE.JS-0.186-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org)
[![Vanilla Craft](https://img.shields.io/badge/CSS-ZERO%20FRAMEWORKS-F58233?style=for-the-badge&logo=css3&logoColor=white)](https://akshatrawat.is-a.dev)

<br/>

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║   SPECIMEN TYPE   ::  ARCHIVAL EDITORIAL ZINE & SPATIAL INTERACTION RUNTIME      ║
║   AUTHOR          ::  AKSHAT RAWAT (CREATIVE DEVELOPER & ARCHITECT)             ║
║   CORE STATUS     ::  PRODUCTION [200 OK] · ZERO TAILWIND BLOAT · 120 FPS RAF     ║
║   LIVE DEPLOYMENT ::  https://akshatrawat.is-a.dev                                ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

<p align="center">
  <b>"Where bespoke editorial typography meets physical computing in the browser."</b><br/>
  <i>An archival, tactile portfolio exploring digital craft, systems architecture, and physical-digital interactions.</i>
</p>

[Explore Live Folio ↗](https://akshatrawat.is-a.dev) • [Featured Systems](#-featured-systems-matrix) • [Architecture](#-runtime-architecture) • [Micro-Interactions](#-micro-interaction-dossier) • [Installation](#-local-transmission)

---

</div>

<br/>

## 🧭 Navigation Index

```
folio://2026/
 ├── 01. RUNTIME ARCHITECTURE ........ [System pipeline & dataflow]
 ├── 02. MICRO-INTERACTION DOSSIER ... [Incision loader, Web Audio, kinetic physics]
 ├── 03. FEATURED SYSTEMS MATRIX ..... [Linkit & Compress I/O architecture]
 ├── 04. THE TECHNOLOGY MATRIX ....... [Hardware, WASM, crypto, & shaders]
 ├── 05. BENCHMARKS & PHILOSOPHY ..... [Zero-bloat engineering manifesto]
 └── 06. LOCAL TRANSMISSION .......... [CLI boot sequence & preview]
```

---

## ⚡ Runtime Architecture

The portfolio functions as an **analogue-digital hybrid engine**. Instead of generic utility cascades, rendering is broken into five decoupled interaction layers:

```
                            [ HTTP GET :: https://akshatrawat.is-a.dev ]
                                                │
                                                ▼
     ┌─────────────────────────────────────────────────────────────────────────────────────┐
     │ 01. ARCHITECTURAL INCISION LAYER                                                    │
     │     Dual-curtain mechanical shutter reveal (50.5vw split)                           │
     │     High-speed live telemetry increment (000 → 100) with ember filament flare       │
     └──────────────────────────────────────────┬──────────────────────────────────────────┘
                                                │
                                                ▼
     ┌─────────────────────────────────────────────────────────────────────────────────────┐
     │ 02. EDITORIAL ZINE SURFACE (DOM)                                                    │
     │     • Typography: Instrument Serif, Cormorant Garamond, Bebas Neue, Inter          │
     │     • Micro-Texture: Bespoke warm archival paper (#FDFBF7) & ink bleed              │
     │     • Dynamic Marginalia: Bidirectional hover linkage between prose & margin notes │
     └─────────────────────┬─────────────────────────────────────────┬─────────────────────┘
                           │                                         │
                           ▼                                         ▼
     ┌───────────────────────────────────┐     ┌───────────────────────────────────────────┐
     │ 03. SPATIAL KINETIC DECK          │     │ 04. TACTILE AUDIO SYNTHESIZER             │
     │     • Multi-axis pointer parallax │     │     • Web Audio API Dual Oscillator       │
     │     • Specular foil light sweeps  │     │     • 850Hz → 80Hz mechanical latch snap  │
     │     • Spring inertia easing       │     │     • 140Hz → 32Hz deep ink-press thud    │
     └─────────────────────┬─────────────┘     └─────────────────────┬─────────────────────┘
                           │                                         │
                           └────────────────────┬────────────────────┘
                                                │
                                                ▼
     ┌─────────────────────────────────────────────────────────────────────────────────────┐
     │ 05. EDGE TELEMETRY & DISPATCH                                                       │
     │     • Realtime GitHub Releases asset polling (Compress I/O live download metrics)   │
     │     • Base64 client-side email dispatch with haptic verification ink stamp          │
     └─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔬 Micro-Interaction Dossier

<details open>
<summary><b>1. Architectural Incision Shutter</b> <i>(LineRevealLoader.js)</i></summary>

<br/>

The boot sequence departs from conventional spinning loaders. Two monolithic curtain slabs (`.curtain-left`, `.curtain-right`) split the viewport at `50.5vw` with an intentional sub-pixel overlap to eliminate light leakage.
* **Laser Incision Line**: An animated center track (`#loader-incision-track`) cuts downward across the page.
* **Telemetry Gauge**: An authentic odometer counter (`000` to `100`) runs parallel with the incision cut.
* **Replay Capability**: Users can re-trigger the incision choreography directly from the footer telemetry controls.

</details>

<details open>
<summary><b>2. Web Audio Mechanical Synthesizer</b> <i>(Authentic Sound Design)</i></summary>

<br/>

Zero MP3 audio bloat. Every tactile audio event is synthesized **on-the-fly via the Web Audio API**:

```javascript
// Dual-stage physical sound synthesis
const snapOsc = ctx.createOscillator();   // Typewriter Latch (Triangle wave: 850Hz -> 80Hz in 45ms)
const thudOsc = ctx.createOscillator();   // Ink-Press Thud   (Sine wave:     140Hz -> 32Hz in 120ms)
```

Clicking the **"Request Dispatch"** button fires this dual acoustic impulse while stamping an authentic editorial wax seal into the DOM:
```
✦ SPECIMEN // FOLIO · VERIFIED TRANSMISSION · READY TO COMPOSE ✦
```

</details>

<details open>
<summary><b>3. Bidirectional Editorial Marginalia</b> <i>(Interactive Zine Reading)</i></summary>

<br/>

Reading editorial prose triggers spatial interaction. Hovering over any `.margin-highlight` text instantly locates, highlights, and scales its corresponding `.editorial-margin-card` in the right gutter with a spring easing curve (`back.out(2)`), bridging historical book design with modern web ergonomics.

</details>

---

## 💼 Featured Systems Matrix

<table>
  <thead>
    <tr>
      <th width="30%">PROJECT SPECIMEN</th>
      <th width="45%">SYSTEM ARCHITECTURE & CAPABILITIES</th>
      <th width="25%">CORE TECHNOLOGIES</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <b>LINKIT</b><br/>
        <i>Creator Profiles Reimagined at the Edge</i><br/><br/>
        <a href="https://linkit-tan.vercel.app/"><b>Launch Platform ↗</b></a>
      </td>
      <td>
        • <b>Studio & Design Engine</b>: 60+ CSS-variable driven themes with spatial stickers and liquid-glass filters.<br/>
        • <b>Zero-Trust Vault</b>: Hardware-accelerated <code>AES-256-GCM</code> encapsulated by Post-Quantum <b>ML-KEM (Kyber)</b> lattice cryptography.<br/>
        • <b>ZK-Auth</b>: Zero-Knowledge proofs powered by <code>snarkjs</code> and biometric FIDO2 WebAuthn.
      </td>
      <td>
        <code>React 19</code><br/>
        <code>WebGL Shaders</code><br/>
        <code>Post-Quantum Kyber</code><br/>
        <code>Supabase</code><br/>
        <code>Vercel Edge</code>
      </td>
    </tr>
    <tr>
      <td>
        <b>COMPRESS I/O</b><br/>
        <i>Offline Hardware-Accelerated Media Engine</i><br/><br/>
        <a href="https://github.com/akshatrawat095/compress-io/releases"><b>Download Releases ↓</b></a>
      </td>
      <td>
        • <b>Hybrid Core</b>: CPU reads + GPU write pipelines processing 8K video without memory exhaustion.<br/>
        • <b>Silicon Auto-Detection</b>: Native support for NVIDIA NVENC, AMD AMF, Intel QuickSync, and Apple VideoToolbox.<br/>
        • <b>100% Air-Gapped</b>: Zero cloud leaks, verified SHA-256 checksums, and Rust WASM isolation.
      </td>
      <td>
        <code>Rust</code><br/>
        <code>Tauri v2</code><br/>
        <code>Hardware FFmpeg</code><br/>
        <code>React 19</code><br/>
        <code>NVENC / Metal</code>
      </td>
    </tr>
  </tbody>
</table>

---

## 🛠 The Technology Matrix

<div align="center">

| Client & Presentation | Systems & Desktop | Cryptography & Security | Cloud & Infrastructure |
| :---: | :---: | :---: | :---: |
| ![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB) | ![Rust](https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white) | ![AES](https://img.shields.io/badge/AES--256--GCM-Hardware-1C1A17?style=flat-square) | ![Vercel](https://img.shields.io/badge/Vercel_Edge-000000?style=flat-square&logo=vercel&logoColor=white) |
| ![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white) | ![Tauri](https://img.shields.io/badge/Tauri_v2-24C8DB?style=flat-square&logo=tauri&logoColor=white) | ![Post Quantum](https://img.shields.io/badge/ML--KEM-Kyber_Lattice-D4AF37?style=flat-square) | ![Cloudflare](https://img.shields.io/badge/Cloudflare_DNS-F38020?style=flat-square&logo=cloudflare&logoColor=white) |
| ![GSAP](https://img.shields.io/badge/GSAP_3-0AE448?style=flat-square&logo=greensock&logoColor=white) | ![WASM](https://img.shields.io/badge/WebAssembly-654FF0?style=flat-square&logo=webassembly&logoColor=white) | ![ZK](https://img.shields.io/badge/snarkjs-Zero_Knowledge-4B32C3?style=flat-square) | ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) |
| ![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=flat-square&logo=three.js&logoColor=white) | ![FFmpeg](https://img.shields.io/badge/FFmpeg-Hardware_GPU-007808?style=flat-square&logo=ffmpeg&logoColor=white) | ![FIDO2](https://img.shields.io/badge/FIDO2-WebAuthn-2B579A?style=flat-square) | ![Upstash](https://img.shields.io/badge/Upstash-Redis_Cache-00E9A3?style=flat-square&logo=redis&logoColor=white) |

</div>

---

## 📊 Engineering Principles & Benchmarks

| Metric / Attribute | Standard Industry Template | Akshat's Portfolio Architecture |
| :--- | :--- | :--- |
| **Styling Strategy** | Bloated utility framework (300KB+ CSS) | **0% CSS Frameworks** — Pure Vanilla CSS Design Tokens |
| **Audio Pipeline** | Heavy static MP3 assets (1MB - 5MB) | **0.0 KB** — 100% Real-time Web Audio API frequency synthesis |
| **Animation Choreography** | CPU-bound CSS transforms | **Hardware-accelerated RAF pipeline** with GSAP ScrollTrigger |
| **Frame Stability** | Frequent micro-stutters | **Pinned 120 FPS** on high-refresh ProMotion & Gaming displays |
| **Domain Architecture** | Generic free tier subdomains | **Custom Verified Edge Domain** (`akshatrawat.is-a.dev`) |

---

## 💻 Local Transmission

Clone the repository and experience the full development environment locally:

```bash
# 1. Acquire the repository
git clone https://github.com/akshatrawat095/Portfolio.git

# 2. Enter workspace
cd Portfolio

# 3. Install dependencies
npm install

# 4. Initiate the local development server (with HMR)
npm run dev
```

The dev server will boot on `http://localhost:5173/`.

### Production Assembly

```bash
# Compile and optimize asset graph
npm run build

# Preview optimized production bundle locally
npm run preview
```

---

<div align="center">

```
  ┌─────────────────────────────────────────────────────────────┐
  │   TRANSMISSION END  ::  VERIFIED FOLIO SIGNATURE             │
  │   AKSHAT RAWAT      ::  acro96969@gmail.com                 │
  │   DISPATCH PROTOCOL ::  HTTP/2.0 · TLS 1.3 · VERCEL EDGE    │
  └─────────────────────────────────────────────────────────────┘
```

**Designed & Architected with pure aesthetic craft by [Akshat Rawat](https://akshatrawat.is-a.dev).**  
*All selected works and design specimens © 2026. All rights reserved.*

[Back to top ↑](#-akshat--rawat-)

</div>
