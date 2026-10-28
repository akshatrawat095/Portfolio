/**
 * KineticDeck.js — The Botanical Arsenal Specimen Deck
 * 
 * Tactile, physics-driven card engine:
 * - Dynamic luxury foil sheen tracking ("Shine Thing")
 * - Living micro-animation stages:
 *   1. Interface: Interactive 2D coordinate mesh with spring cursor tracking
 *   2. Systems: Live IPC telemetry & zero-trust lattice pulse
 *   3. Craft: Procedural 3D rotating wireframe octahedron
 * - Deck fanning physics (adjacent cards fan away on hover)
 * - 3D Card Flip with Gulmohar petal particle bursts
 * - Atropos 3D parallax depth rig
 */

import Atropos from 'atropos';
import 'atropos/css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class KineticDeck {
  constructor() {
    this.section = document.getElementById('arsenal-section');
    if (!this.section) return;

    this.stage = document.getElementById('deck-stage');
    this.cards = Array.from(document.querySelectorAll('.specimen-card'));
    this.petalContainer = document.getElementById('petal-field');
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.rafIds = [];

    this.initAtropos();
    this.initPetals();
    this.initSheen();
    this.initDeckFanning();
    this.initCardClicks();
    this.initMicroStages();
    this.initScrollReveal();
  }

  // ─── ATROPOS 3D PARALLAX RIG ───────────────────────────
  initAtropos() {
    if (this.isReducedMotion) return;
    this.atroposInstances = [];

    this.cards.forEach((cardEl) => {
      try {
        const instance = Atropos({
          el: cardEl,
          activeOffset: 30,
          shadowScale: 1.03,
          highlight: false, // Customized paper foil sheen in CSS & JS
          shadow: false,    // Refined tactile paper shadow in CSS
          rotateXMax: 9,
          rotateYMax: 9,
          rotateTouch: 'scroll-y',
          duration: 380
        });
        this.atroposInstances.push(instance);
      } catch (err) {
        console.warn('Atropos init note:', err);
      }
    });
  }

  // ─── DYNAMIC LUXURY FOIL SHEEN ("SHINE THING") ──────────
  initSheen() {
    this.cards.forEach((cardEl) => {
      const faces = cardEl.querySelectorAll('.card-face');

      const onPointerMove = (e) => {
        const rect = cardEl.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

        faces.forEach(face => {
          face.style.setProperty('--sheen-x', `${x.toFixed(1)}%`);
          face.style.setProperty('--sheen-y', `${y.toFixed(1)}%`);
          face.style.setProperty('--sheen-opacity', '0.85');
        });
      };

      const onPointerLeave = () => {
        faces.forEach(face => {
          face.style.setProperty('--sheen-opacity', '0');
        });
      };

      cardEl.addEventListener('pointermove', onPointerMove, { passive: true });
      cardEl.addEventListener('pointerleave', onPointerLeave, { passive: true });
    });
  }

  // ─── DECK FANNING MECHANICS ────────────────────────────
  initDeckFanning() {
    if (!this.stage) return;

    this.cards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        this.stage.classList.remove('is-hovering-0', 'is-hovering-1', 'is-hovering-2');
        this.stage.classList.add(`is-hovering-${index}`);
      });

      card.addEventListener('mouseleave', () => {
        this.stage.classList.remove(`is-hovering-${index}`);
      });
    });
  }

  // ─── LIVING MICRO-ANIMATION STAGES ─────────────────────
  initMicroStages() {
    if (this.isReducedMotion) return;

    // 1. Interface Card: Interactive Spring Coordinate Mesh
    this.initInterfaceCanvas();

    // 2. Systems Card: Quantum Lattice & Zero-Trust Waveform
    this.initSystemsCanvas();

    // 3. Craft Card: Procedural 3D Wireframe Polyhedron
    this.initCraftCanvas();
  }

  // 1. Interface Canvas: Reactive 2D Spring Crosshair
  initInterfaceCanvas() {
    const canvas = document.getElementById('canvas-interface');
    const coordsEl = document.getElementById('interface-coords');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let width = (canvas.width = (canvas.offsetWidth || 240) * dpr);
    let height = (canvas.height = (canvas.offsetHeight || 88) * dpr);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let springX = mouseX;
    let springY = mouseY;
    let vx = 0;
    let vy = 0;
    let isHovered = false;
    let time = 0;

    const card = canvas.closest('.specimen-card');
    if (card) {
      card.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) * dpr;
        mouseY = (e.clientY - rect.top) * dpr;
        isHovered = true;

        if (coordsEl) {
          const normX = Math.round(((e.clientX - rect.left) / Math.max(1, rect.width)) * 100);
          const normY = Math.round(((e.clientY - rect.top) / Math.max(1, rect.height)) * 100);
          coordsEl.textContent = `X: ${normX} · Y: ${normY}`;
        }
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
      });
    }

    const drawInterface = () => {
      if (canvas.offsetWidth > 0) {
        const targetW = canvas.offsetWidth * dpr;
        const targetH = canvas.offsetHeight * dpr;
        if (canvas.width !== targetW || canvas.height !== targetH) {
          width = canvas.width = targetW;
          height = canvas.height = targetH;
        }
      }

      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Idle smooth Lissajous figure when not hovered
      if (!isHovered) {
        mouseX = width / 2 + Math.sin(time) * (width * 0.28);
        mouseY = height / 2 + Math.cos(time * 0.7) * (height * 0.24);
      }

      // Spring physics
      const ax = (mouseX - springX) * 0.085;
      const ay = (mouseY - springY) * 0.085;
      vx = (vx + ax) * 0.82;
      vy = (vy + ay) * 0.82;
      springX += vx;
      springY += vy;

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(28, 26, 23, 0.07)';
      ctx.lineWidth = 1;
      const stepX = width / 6;
      for (let x = stepX; x < width; x += stepX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      const stepY = height / 4;
      for (let y = stepY; y < height; y += stepY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw crosshairs at spring point
      ctx.strokeStyle = 'rgba(200, 90, 23, 0.28)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(springX, 0);
      ctx.lineTo(springX, height);
      ctx.moveTo(0, springY);
      ctx.lineTo(width, springY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw connection tether line from center
      ctx.strokeStyle = 'rgba(200, 90, 23, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(width / 2, height / 2);
      ctx.lineTo(springX, springY);
      ctx.stroke();

      // Draw spring node circle
      ctx.fillStyle = '#C85A17';
      ctx.beginPath();
      ctx.arc(springX, springY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Pulse ring
      ctx.strokeStyle = 'rgba(200, 90, 23, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      const pulseR = 7 + Math.sin(time * 3) * 3;
      ctx.arc(springX, springY, pulseR, 0, Math.PI * 2);
      ctx.stroke();

      this.interfaceRafId = requestAnimationFrame(drawInterface);
    };

    drawInterface();
  }

  // 2. Systems Canvas: Quantum Lattice & Zero-Trust Telemetry Waveform
  initSystemsCanvas() {
    const canvas = document.getElementById('canvas-systems');
    const ipcEl = document.getElementById('term-ipc');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let width = (canvas.width = (canvas.offsetWidth || 240) * dpr);
    let height = (canvas.height = (canvas.offsetHeight || 88) * dpr);

    let time = 0;
    let isHovered = false;
    let mouseNormX = 0.5;

    const card = canvas.closest('.specimen-card');
    if (card) {
      card.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseNormX = Math.max(0, Math.min(1, (e.clientX - rect.left) / Math.max(1, rect.width)));
        isHovered = true;
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        mouseNormX = 0.5;
      });
    }

    // Telemetry text jitter
    const latencies = ['0.07ms · 100% SECURE', '0.08ms · 100% SECURE', '0.06ms · 100% SECURE', '0.05ms PEAK', '0.09ms · AES-256'];
    let jitterIdx = 0;
    const interval = setInterval(() => {
      jitterIdx = (jitterIdx + 1) % latencies.length;
      if (ipcEl) ipcEl.textContent = latencies[jitterIdx];
    }, 1100);
    this.systemsInterval = interval;

    const drawSystems = () => {
      if (canvas.offsetWidth > 0) {
        const targetW = canvas.offsetWidth * dpr;
        const targetH = canvas.offsetHeight * dpr;
        if (canvas.width !== targetW || canvas.height !== targetH) {
          width = canvas.width = targetW;
          height = canvas.height = targetH;
        }
      }

      time += isHovered ? 0.045 : 0.025;
      ctx.clearRect(0, 0, width, height);

      // Grid mesh with matrix dots
      ctx.strokeStyle = 'rgba(39, 55, 12, 0.08)';
      ctx.lineWidth = 1;
      const stepX = width / 8;
      const stepY = height / 4;
      for (let x = stepX; x < width; x += stepX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = stepY; y < height; y += stepY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Dual quantum lattice sine waves
      const cy = height * 0.44;
      const amplitude = height * (isHovered ? 0.28 : 0.22);
      const freq = 0.022 + (isHovered ? mouseNormX * 0.015 : 0.005);

      // Secondary shadow carrier wave
      ctx.strokeStyle = 'rgba(120, 145, 25, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        const y = cy + Math.sin(x * freq + time * 1.2) * (amplitude * 0.7);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Primary active waveform
      ctx.strokeStyle = '#587309';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        const y = cy + Math.sin(x * freq + time * 1.8 + Math.cos(time * 0.5)) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Telemetry packet nodes traveling on the wave
      const packetCount = 4;
      for (let i = 0; i < packetCount; i++) {
        const packetOffset = ((time * 30 + i * (width / packetCount)) % width);
        const packetY = cy + Math.sin(packetOffset * freq + time * 1.8 + Math.cos(time * 0.5)) * amplitude;
        
        ctx.fillStyle = '#C0D72F';
        ctx.beginPath();
        ctx.arc(packetOffset, packetY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#384D12';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(packetOffset, packetY, 5.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      this.systemsRafId = requestAnimationFrame(drawSystems);
    };

    drawSystems();
  }

  // 3. Craft Canvas: Procedural 3D Wireframe Polyhedron
  initCraftCanvas() {
    const canvas = document.getElementById('canvas-craft');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let width = (canvas.width = (canvas.offsetWidth || 240) * dpr);
    let height = (canvas.height = (canvas.offsetHeight || 88) * dpr);

    // 3D Octahedron vertices
    const vertices = [
      { x:  0, y: -1, z:  0 }, // top
      { x:  0, y:  1, z:  0 }, // bottom
      { x: -1, y:  0, z:  0 }, // left
      { x:  1, y:  0, z:  0 }, // right
      { x:  0, y:  0, z: -1 }, // back
      { x:  0, y:  0, z:  1 }  // front
    ];

    // Octahedron edges connecting vertex pairs
    const edges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2]
    ];

    let angleX = 0.2;
    let angleY = 0.4;
    let rotSpeedX = 0.012;
    let rotSpeedY = 0.018;

    const card = canvas.closest('.specimen-card');
    if (card) {
      card.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
        rotSpeedY = 0.018 + nx * 0.04;
        rotSpeedX = 0.012 + ny * 0.03;
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        rotSpeedX = 0.012;
        rotSpeedY = 0.018;
      });
    }

    const drawCraft = () => {
      if (canvas.offsetWidth > 0) {
        const targetW = canvas.offsetWidth * dpr;
        const targetH = canvas.offsetHeight * dpr;
        if (canvas.width !== targetW || canvas.height !== targetH) {
          width = canvas.width = targetW;
          height = canvas.height = targetH;
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Subtle background grid
      ctx.strokeStyle = 'rgba(28, 26, 23, 0.05)';
      ctx.lineWidth = 1;
      const stepX = width / 6;
      for (let x = stepX; x < width; x += stepX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      angleX += rotSpeedX;
      angleY += rotSpeedY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const scale = Math.min(width, height) * 0.38;
      const cx = width / 2;
      const cy = height * 0.46;

      // Rotate and project vertices to 2D
      const projected = vertices.map(v => {
        // Rotate around Y
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;

        // Rotate around X
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX;

        // Perspective projection
        const fov = 3.2;
        const pz = fov / (fov + z2);

        return {
          x: cx + x1 * scale * pz,
          y: cy + y2 * scale * pz,
          z: z2
        };
      });

      // Draw wireframe edges
      ctx.strokeStyle = 'rgba(28, 26, 23, 0.48)';
      ctx.lineWidth = 1.3;

      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw vertices with ivory & orange accents
      projected.forEach(p => {
        ctx.fillStyle = '#C85A17';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      });

      this.craftRafId = requestAnimationFrame(drawCraft);
    };

    drawCraft();
  }

  // ─── FLOATING GULMOHAR PETALS SIMULATION ────────────────
  initPetals() {
    if (!this.petalContainer || this.isReducedMotion) return;

    const count = window.innerWidth < 768 ? 14 : 22;
    const colors = ['#C85A17', '#D45E1B', '#DF7330', '#B0460D', '#C5D8B4'];
    this.petals = [];

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'botanical-petal';
      
      const isLeaf = Math.random() < 0.22;
      const color = isLeaf ? '#C5D8B4' : colors[Math.floor(Math.random() * (colors.length - 1))];
      const w = isLeaf ? Math.random() * 12 + 10 : Math.random() * 11 + 7;
      const h = isLeaf ? Math.random() * 6 + 4 : Math.random() * 8 + 6;

      petal.style.width = `${w}px`;
      petal.style.height = `${h}px`;
      petal.style.backgroundColor = color;
      petal.style.borderRadius = isLeaf ? '50% 10% 50% 10%' : '65% 35% 70% 30% / 60% 30% 70% 40%';
      petal.style.opacity = (Math.random() * 0.45 + 0.35).toString();

      this.petalContainer.appendChild(petal);

      this.petals.push({
        el: petal,
        x: Math.random() * window.innerWidth,
        y: Math.random() * 750 - 50,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.65 + 0.35,
        rot: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 1.6,
        swaySpeed: Math.random() * 0.02 + 0.012,
        swayDist: Math.random() * 22 + 12,
        seed: Math.random() * 100
      });
    }

    let tick = 0;
    const updatePetals = () => {
      tick++;
      const bounds = this.petalContainer.getBoundingClientRect();
      const w = bounds.width || window.innerWidth;
      const h = bounds.height || 850;

      for (let i = 0; i < this.petals.length; i++) {
        const p = this.petals[i];
        p.y += p.vy;
        p.rot += p.vrot;
        
        const sway = Math.sin(tick * p.swaySpeed + p.seed) * (p.swayDist * 0.04);
        p.x += p.vx + sway;

        if (p.y > h + 25) {
          p.y = -25;
          p.x = Math.random() * w;
        }
        if (p.x < -30) p.x = w + 20;
        if (p.x > w + 30) p.x = -20;

        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg)`;
      }

      this.petalRafId = requestAnimationFrame(updatePetals);
    };

    this.petalRafId = requestAnimationFrame(updatePetals);
  }

  burstPetals(cardEl) {
    if (!this.petals || !this.petals.length || this.isReducedMotion) return;
    const cardRect = cardEl.getBoundingClientRect();
    const containerRect = this.petalContainer.getBoundingClientRect();

    const originX = cardRect.left - containerRect.left + cardRect.width / 2;
    const originY = cardRect.top - containerRect.top + cardRect.height / 2;

    for (let i = 0; i < 8; i++) {
      const idx = Math.floor(Math.random() * this.petals.length);
      const p = this.petals[idx];
      p.x = originX + (Math.random() - 0.5) * 80;
      p.y = originY + (Math.random() - 0.5) * 40;
      p.vx = (Math.random() - 0.5) * 4;
      p.vy = -Math.random() * 2.5 - 1;
      p.vrot = (Math.random() - 0.5) * 8;
    }
  }

  // ─── CARD CLICKS & FLIP ─────────────────────────────────
  initCardClicks() {
    this.cards.forEach((card) => {
      // Keyboard accessibility
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleCardFlip(card);
        }
      });

      // Click to FLIP
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('input')) return;
        this.toggleCardFlip(card);
      });
    });
  }

  toggleCardFlip(card) {
    const isFlipped = card.classList.contains('is-flipped');

    // Unflip other cards so only one is active at a time
    this.cards.forEach(c => {
      if (c !== card) c.classList.remove('is-flipped');
    });

    if (isFlipped) {
      card.classList.remove('is-flipped');
    } else {
      card.classList.add('is-flipped');
      this.burstPetals(card);
    }
  }

  // ─── SCROLL ENTRANCE ────────────────────────────────────
  initScrollReveal() {
    if (this.isReducedMotion) return;

    gsap.from('.arsenal-floral-wrap', {
      scrollTrigger: {
        trigger: this.section,
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out'
    });
  }

  destroy() {
    if (this.petalRafId) cancelAnimationFrame(this.petalRafId);
    if (this.interfaceRafId) cancelAnimationFrame(this.interfaceRafId);
    if (this.craftRafId) cancelAnimationFrame(this.craftRafId);
    if (this.systemsInterval) clearInterval(this.systemsInterval);
    if (this.atroposInstances) {
      this.atroposInstances.forEach(inst => {
        try { if (inst && inst.destroy) inst.destroy(); } catch (e) {}
      });
    }
  }
}
