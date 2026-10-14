/**
 * BotanicalDiagram.js — Living Botanical Diagram of The Arsenal
 * 
 * Interactive Gulmohar Tree with anatomical skill zones:
 * - Roots = Systems / Low-level Architecture (Rust, Node, Postgres, Redis)
 * - Trunk = Interface / Core Interaction (React 19, Next.js, Tailwind, GSAP)
 * - Canopy = Craft / Design & 3D (Figma, Three.js, WebGL, Tauri)
 * 
 * Features:
 * - Real-time floating Gulmohar petal particle physics
 * - Smooth biological sap/pulsing animations
 * - Bi-directional interaction with botanical tabs & hitboxes
 * - Editorial specimen panel transitions with GSAP
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class BotanicalDiagram {
  constructor() {
    this.section = document.getElementById('botanical-section');
    if (!this.section) return;

    this.activeZone = 'canopy'; // default active zone
    this.zones = ['canopy', 'trunk', 'roots'];
    
    this.tabs = document.querySelectorAll('.botanical-tab');
    this.svgZones = document.querySelectorAll('.tree-zone');
    this.panels = {
      canopy: document.getElementById('panel-canopy'),
      trunk: document.getElementById('panel-trunk'),
      roots: document.getElementById('panel-roots')
    };

    this.petalContainer = document.getElementById('petal-field');
    this.petals = [];
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.initPetals();
    this.initInteractions();
    this.initScrollReveal();
    this.setActiveZone(this.activeZone, false);
  }

  // ─── FLOATING GULMOHAR PETAL PARTICLES ───────────────────
  initPetals() {
    if (!this.petalContainer || this.isReducedMotion) return;

    const count = window.innerWidth < 768 ? 16 : 28;
    const colors = [
      '#C85A17', // Vermilion
      '#D6631E', // Rust orange
      '#E07838', // Amber flame
      '#B04A10', // Deep Gulmohar red
      '#C5D8B4'  // Pistachio leaf green
    ];

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'botanical-petal';
      
      const isLeaf = Math.random() < 0.2;
      const color = isLeaf ? '#C5D8B4' : colors[Math.floor(Math.random() * (colors.length - 1))];
      
      const width = isLeaf ? Math.random() * 12 + 10 : Math.random() * 10 + 7;
      const height = isLeaf ? Math.random() * 6 + 4 : Math.random() * 8 + 6;

      petal.style.width = `${width}px`;
      petal.style.height = `${height}px`;
      petal.style.backgroundColor = color;
      petal.style.borderRadius = isLeaf ? '50% 10% 50% 10%' : '60% 40% 70% 30% / 60% 30% 70% 40%';
      petal.style.opacity = (Math.random() * 0.45 + 0.35).toString();

      this.petalContainer.appendChild(petal);

      this.petals.push({
        el: petal,
        x: Math.random() * window.innerWidth,
        y: Math.random() * 700 - 50,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.7 + 0.35,
        rot: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 1.5,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayDist: Math.random() * 25 + 15,
        seed: Math.random() * 100
      });
    }

    // High performance animation loop
    let tick = 0;
    const updatePetals = () => {
      tick++;
      const bounds = this.petalContainer.getBoundingClientRect();
      const w = bounds.width || window.innerWidth;
      const h = bounds.height || 800;

      for (let i = 0; i < this.petals.length; i++) {
        const p = this.petals[i];
        p.y += p.vy;
        p.rot += p.vrot;
        
        const sway = Math.sin(tick * p.swaySpeed + p.seed) * (p.swayDist * 0.04);
        p.x += p.vx + sway;

        // Wrap around bounds
        if (p.y > h + 20) {
          p.y = -20;
          p.x = Math.random() * w;
        }
        if (p.x < -30) p.x = w + 20;
        if (p.x > w + 30) p.x = -20;

        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg)`;
      }

      this.rafId = requestAnimationFrame(updatePetals);
    };

    this.rafId = requestAnimationFrame(updatePetals);
  }

  // Trigger burst of petals when selecting an anatomical zone
  burstPetals(originY) {
    if (!this.petals.length || this.isReducedMotion) return;

    const bounds = this.petalContainer.getBoundingClientRect();
    const centerX = bounds.width / 2;
    const targetY = originY || bounds.height * 0.4;

    for (let i = 0; i < 8; i++) {
      const idx = Math.floor(Math.random() * this.petals.length);
      const p = this.petals[idx];
      p.x = centerX + (Math.random() - 0.5) * 100;
      p.y = targetY + (Math.random() - 0.5) * 50;
      p.vx = (Math.random() - 0.5) * 3;
      p.vy = -Math.random() * 2 - 1;
      p.vrot = (Math.random() - 0.5) * 6;
    }
  }

  // ─── INTERACTION LOGIC ──────────────────────────────────
  initInteractions() {
    // 1. Tab Buttons
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const zone = tab.dataset.zone;
        if (zone) this.setActiveZone(zone, true);
      });
    });

    // 2. SVG Hitboxes & Groups
    this.svgZones.forEach(zoneGroup => {
      const zone = zoneGroup.dataset.zone;
      if (!zone) return;

      zoneGroup.addEventListener('mouseenter', () => {
        this.setActiveZone(zone, true);
      });

      zoneGroup.addEventListener('click', () => {
        this.setActiveZone(zone, true);
      });
    });

    // 3. Keyboard Arrow Keys & Digits (1, 2, 3)
    window.addEventListener('keydown', (e) => {
      // Only if section is in viewport
      const rect = this.section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === '1') this.setActiveZone('canopy', true);
      if (e.key === '2') this.setActiveZone('trunk', true);
      if (e.key === '3') this.setActiveZone('roots', true);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const curIdx = this.zones.indexOf(this.activeZone);
        const next = this.zones[(curIdx + 1) % this.zones.length];
        this.setActiveZone(next, true);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const curIdx = this.zones.indexOf(this.activeZone);
        const prev = this.zones[(curIdx - 1 + this.zones.length) % this.zones.length];
        this.setActiveZone(prev, true);
      }
    });
  }

  // ─── SET ACTIVE ANATOMICAL ZONE ──────────────────────────
  setActiveZone(zoneName, animate = true) {
    if (!this.zones.includes(zoneName)) return;
    this.activeZone = zoneName;

    // 1. Update Tabs
    this.tabs.forEach(tab => {
      if (tab.dataset.zone === zoneName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // 2. Update SVG Classes
    this.svgZones.forEach(g => {
      const gZone = g.dataset.zone;
      if (gZone === zoneName) {
        g.classList.add('active');
        g.classList.remove('dimmed');
      } else {
        g.classList.remove('active');
        g.classList.add('dimmed');
      }
    });

    // 3. Highlight specific anatomy with micro-tweens
    if (animate && !this.isReducedMotion) {
      if (zoneName === 'roots') {
        gsap.fromTo('.root-path', 
          { strokeDashoffset: 40 },
          { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out', stagger: 0.06 }
        );
        this.burstPetals(750);
      } else if (zoneName === 'trunk') {
        gsap.fromTo('.trunk-bark',
          { opacity: 0.2 },
          { opacity: 0.8, yoyo: true, repeat: 1, duration: 0.4, stagger: 0.05 }
        );
        gsap.fromTo('.trunk-knot',
          { scale: 1 },
          { scale: 1.6, transformOrigin: 'center', duration: 0.4, yoyo: true, repeat: 1 }
        );
        this.burstPetals(500);
      } else if (zoneName === 'canopy') {
        gsap.fromTo('.flower-petal',
          { scale: 0.9 },
          { scale: 1.25, transformOrigin: 'center', duration: 0.5, stagger: 0.02, yoyo: true, repeat: 1, ease: 'back.out(2)' }
        );
        gsap.fromTo('.tree-leaf',
          { rotation: '+=5' },
          { rotation: '-=5', duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }
        );
        this.burstPetals(250);
      }
    }

    // 4. Smooth Panel Transitions
    Object.keys(this.panels).forEach(key => {
      const panel = this.panels[key];
      if (!panel) return;

      if (key === zoneName) {
        panel.classList.add('active');
        
        if (animate && !this.isReducedMotion) {
          gsap.fromTo(panel,
            { opacity: 0, y: 25, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out', overwrite: 'auto' }
          );

          // Stagger tech badges
          const techBadges = panel.querySelectorAll('.panel-tech');
          if (techBadges.length) {
            gsap.fromTo(techBadges,
              { opacity: 0, y: 15, scale: 0.9 },
              { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.04, ease: 'back.out(1.7)', delay: 0.1, overwrite: 'auto' }
            );
          }
        } else {
          panel.style.opacity = '1';
          panel.style.transform = 'translateY(0) scale(1)';
        }
      } else {
        panel.classList.remove('active');
        if (animate && !this.isReducedMotion) {
          gsap.to(panel, {
            opacity: 0,
            y: -15,
            scale: 0.98,
            duration: 0.35,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        } else {
          panel.style.opacity = '0';
        }
      }
    });
  }

  // ─── SCROLLTRIGGER ENTRANCE ANIMATION ───────────────────
  initScrollReveal() {
    if (this.isReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.section,
        start: 'top 70%',
        once: true
      }
    });

    // 1. Header & Tabs reveal
    tl.from(['.toolkit-header', '.botanical-tabs'], {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // 2. Trunk growth from bottom up
    tl.from('.trunk-main', {
      scaleY: 0,
      transformOrigin: 'bottom center',
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.6');

    // 3. Roots spreading downward
    tl.from('.root-path', {
      scaleY: 0,
      opacity: 0,
      transformOrigin: 'top center',
      duration: 1,
      stagger: 0.06,
      ease: 'power2.out'
    }, '-=0.8');

    // 4. Branches opening outward
    tl.from('.branch-path', {
      scale: 0,
      opacity: 0,
      transformOrigin: '400px 380px',
      duration: 1,
      stagger: 0.08,
      ease: 'back.out(1.4)'
    }, '-=0.6');

    // 5. Flowers blooming
    tl.from('.flower-petal', {
      scale: 0,
      opacity: 0,
      transformOrigin: 'center',
      duration: 0.8,
      stagger: 0.02,
      ease: 'elastic.out(1, 0.5)'
    }, '-=0.6');

    // 6. Leaves fluttering in
    tl.from('.tree-leaf', {
      scale: 0,
      opacity: 0,
      transformOrigin: 'center',
      duration: 0.6,
      stagger: 0.03,
      ease: 'power2.out'
    }, '-=0.5');

    // 7. Initial active panel reveal
    tl.from('.panel-canopy', {
      opacity: 0,
      x: 30,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4');
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}
