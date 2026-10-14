/**
 * LiquidCards.js — Organic Liquid Morph Card Effects
 * 
 * Creates SVG displacement filters for wavy blob borders,
 * cursor-reactive ripple distortions, morph-flip animations,
 * and pulsing gradient backgrounds on skill cards.
 */

import gsap from 'gsap';

// ─── SVG FILTER INJECTION ────────────────────────────────
// We inject a single SVG with multiple filter definitions that
// the cards reference via CSS `filter: url(#...)`.

const FILTER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
  <defs>
    <!-- Liquid border warp — low-frequency organic wobble -->
    <filter id="liquid-warp" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
      <feTurbulence
        id="liquid-turb"
        type="fractalNoise"
        baseFrequency="0.012 0.008"
        numOctaves="3"
        seed="2"
        result="noise"
      />
      <feDisplacementMap
        id="liquid-displace"
        in="SourceGraphic"
        in2="noise"
        scale="8"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>

    <!-- Hover ripple — higher frequency, animated turbulence -->
    <filter id="liquid-ripple" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">
      <feTurbulence
        id="ripple-turb"
        type="turbulence"
        baseFrequency="0.025 0.02"
        numOctaves="2"
        seed="5"
        result="rippleNoise"
      />
      <feDisplacementMap
        id="ripple-displace"
        in="SourceGraphic"
        in2="rippleNoise"
        scale="0"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>

    <!-- Morph flip distortion — extreme warp during flip transition -->
    <filter id="liquid-morph" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
      <feTurbulence
        id="morph-turb"
        type="fractalNoise"
        baseFrequency="0.015 0.012"
        numOctaves="2"
        seed="8"
        result="morphNoise"
      />
      <feDisplacementMap
        id="morph-displace"
        in="SourceGraphic"
        in2="morphNoise"
        scale="0"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </defs>
</svg>
`;


export class LiquidCards {
  constructor() {
    // Inject SVG filters into DOM
    const container = document.createElement('div');
    container.innerHTML = FILTER_SVG;
    document.body.prepend(container.firstElementChild);

    // Cache filter elements
    this.liquidTurb = document.getElementById('liquid-turb');
    this.liquidDisplace = document.getElementById('liquid-displace');
    this.rippleDisplace = document.getElementById('ripple-displace');
    this.rippleTurb = document.getElementById('ripple-turb');
    this.morphDisplace = document.getElementById('morph-displace');
    this.morphTurb = document.getElementById('morph-turb');

    // State
    this.cards = [];
    this.hoveredCard = null;
    this.animatingFlip = new Set();
    this.time = 0;

    this._init();
  }

  _init() {
    this.cards = Array.from(document.querySelectorAll('.skill-card'));
    if (this.cards.length === 0) return;

    // Apply liquid warp filter to all cards
    this.cards.forEach((card) => {
      card.classList.add('liquid-card');
      this._bindCardEvents(card);
      this._injectGradientOverlay(card);
    });

    // Hijack the global toggleCard to add morph-flip
    this._hijackFlipLogic();

    // Start the ambient animation loop
    this._startAmbientLoop();
  }


  // ─── GRADIENT OVERLAY ────────────────────────────────
  _injectGradientOverlay(card) {
    // Inject a gradient overlay div into each card-face for the pulsing effect
    const faces = card.querySelectorAll('.card-face');
    faces.forEach((face) => {
      const overlay = document.createElement('div');
      overlay.className = 'liquid-gradient-overlay';
      face.appendChild(overlay);
    });
  }


  // ─── CARD EVENTS ─────────────────────────────────────
  _bindCardEvents(card) {
    card.addEventListener('mouseenter', () => {
      this.hoveredCard = card;
      card.classList.add('liquid-hover');
      
      // Animate ripple displacement scale up
      gsap.to(this, {
        _rippleScale: 12,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => {
          this.rippleDisplace.setAttribute('scale', this._rippleScale);
        }
      });

      // Animate the turbulence frequency shift for "disturbed water"
      gsap.to(this, {
        _rippleFreqX: 0.04,
        _rippleFreqY: 0.035,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          this.rippleTurb.setAttribute(
            'baseFrequency',
            `${this._rippleFreqX} ${this._rippleFreqY}`
          );
        }
      });
    });

    card.addEventListener('mouseleave', () => {
      this.hoveredCard = null;
      card.classList.remove('liquid-hover');
      
      // Settle ripple back to zero
      gsap.to(this, {
        _rippleScale: 0,
        duration: 1.0,
        ease: 'power3.inOut',
        onUpdate: () => {
          this.rippleDisplace.setAttribute('scale', this._rippleScale);
        }
      });

      gsap.to(this, {
        _rippleFreqX: 0.025,
        _rippleFreqY: 0.02,
        duration: 1.0,
        ease: 'power3.inOut',
        onUpdate: () => {
          this.rippleTurb.setAttribute(
            'baseFrequency',
            `${this._rippleFreqX} ${this._rippleFreqY}`
          );
        }
      });
    });

    // Cursor-position-reactive: modulate ripple seed based on mouse position
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      
      // Shift turbulence seed for spatial variation
      const seed = Math.floor(nx * 10 + ny * 10);
      this.rippleTurb.setAttribute('seed', seed);
    });
  }


  // ─── MORPH FLIP LOGIC ───────────────────────────────
  _hijackFlipLogic() {
    const originalToggle = window.toggleCard;
    
    window.toggleCard = (card) => {
      if (this.animatingFlip.has(card)) return; // Prevent spam
      
      const isActive = card.classList.contains('active-card');
      
      if (isActive) {
        // UN-FLIP: morph distortion out
        this._morphFlipOut(card, () => {
          originalToggle(card);
        });
      } else {
        // FLIP: morph distortion in, then flip, then settle
        this._morphFlipIn(card, () => {
          originalToggle(card);
        });
      }
    };
  }

  _morphFlipIn(card, onFlip) {
    this.animatingFlip.add(card);
    card.classList.add('liquid-morphing');

    const tl = gsap.timeline({
      onComplete: () => {
        this.animatingFlip.delete(card);
        card.classList.remove('liquid-morphing');
      }
    });

    // Phase 1: Ramp up morph distortion (card melts)
    tl.to(this, {
      _morphScale: 22,
      duration: 0.35,
      ease: 'power2.in',
      onUpdate: () => {
        this.morphDisplace.setAttribute('scale', this._morphScale);
      }
    });

    // Phase 2: Trigger actual CSS flip at peak distortion
    tl.call(() => {
      onFlip();
    }, null, 0.3);

    // Phase 3: Settle distortion back to 0 (card solidifies)
    tl.to(this, {
      _morphScale: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
      onUpdate: () => {
        this.morphDisplace.setAttribute('scale', this._morphScale);
      }
    }, 0.45);

    // Phase 3b: Gentle scale bounce
    tl.fromTo(card, 
      { scale: 1 },
      { scale: 1.08, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 },
      0.3
    );
  }

  _morphFlipOut(card, onFlip) {
    this.animatingFlip.add(card);
    card.classList.add('liquid-morphing');

    const tl = gsap.timeline({
      onComplete: () => {
        this.animatingFlip.delete(card);
        card.classList.remove('liquid-morphing');
      }
    });

    tl.to(this, {
      _morphScale: 16,
      duration: 0.25,
      ease: 'power2.in',
      onUpdate: () => {
        this.morphDisplace.setAttribute('scale', this._morphScale);
      }
    });

    tl.call(() => {
      onFlip();
    }, null, 0.2);

    tl.to(this, {
      _morphScale: 0,
      duration: 0.5,
      ease: 'power3.out',
      onUpdate: () => {
        this.morphDisplace.setAttribute('scale', this._morphScale);
      }
    }, 0.35);
  }


  // ─── AMBIENT ANIMATION LOOP ─────────────────────────
  _startAmbientLoop() {
    // Internal state for GSAP-animated filter values
    this._rippleScale = 0;
    this._rippleFreqX = 0.025;
    this._rippleFreqY = 0.02;
    this._morphScale = 0;

    // Animate the ambient liquid-warp turbulence seed over time
    // This creates a slow, organic undulation on the card borders
    gsap.ticker.add(() => {
      this.time += 0.008;
      
      // Slow organic wobble — shift the turbulence seed to create movement
      const ambientSeed = Math.floor(Math.sin(this.time * 0.5) * 5 + 5);
      if (this.liquidTurb) {
        this.liquidTurb.setAttribute('seed', ambientSeed);
      }

      // Breathe the displacement scale gently
      const breathe = 6 + Math.sin(this.time * 1.2) * 3;
      if (this.liquidDisplace) {
        this.liquidDisplace.setAttribute('scale', breathe);
      }
    });

    // Pulsing gradient animation via GSAP (targets CSS custom property)
    this.cards.forEach((card, i) => {
      const overlays = card.querySelectorAll('.liquid-gradient-overlay');
      overlays.forEach((overlay) => {
        // Stagger the pulse phase per card
        gsap.to(overlay, {
          '--gradient-angle': '360deg',
          duration: 6 + i * 0.8,
          repeat: -1,
          ease: 'none'
        });

        gsap.to(overlay, {
          '--gradient-opacity': 0.15,
          duration: 2.5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });
    });
  }
}
