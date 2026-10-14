import gsap from 'gsap';

export class LineRevealLoader {
  constructor(options = {}) {
    this.wrapper = document.getElementById('line-loader');
    if (!this.wrapper) return;

    this.curtainLeft = this.wrapper.querySelector('.curtain-left');
    this.curtainRight = this.wrapper.querySelector('.curtain-right');
    this.incisionLine = this.wrapper.querySelector('.loader-incision-line');
    this.crosshair = this.wrapper.querySelector('.loader-center-crosshair');
    this.hud = this.wrapper.querySelector('.loader-hud');
    this.percentNum = document.getElementById('loader-percent-num');
    this.barFill = document.getElementById('loader-bar-fill');
    this.phaseText = document.getElementById('loader-hud-phase');
    this.centerStage = this.wrapper.querySelector('.loader-center-stage');
    this.frameTop = this.wrapper.querySelector('.loader-frame-top');
    this.frameBottomRight = this.wrapper.querySelector('.loader-frame-bottom-right');
    
    this.onReveal = options.onReveal || null;
    this.hasRun = false;

    this.init();
  }

  init() {
    // Lock scroll during loader
    document.body.classList.add('loading-locked');

    // Create the master timeline
    this.tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        document.body.classList.remove('loading-locked');
        this.wrapper.style.display = 'none';
        this.wrapper.style.pointerEvents = 'none';
      }
    });

    this.buildTimeline();
    
    // Auto-start loader
    this.play();

    // Expose global replay function and instance
    window.__lineLoader = this;
    window.replayLineLoader = () => this.replay();
  }

  buildTimeline() {
    this.tl.clear();

    // Deterministic initial states attached to timeline head
    this.tl.set(this.wrapper, { display: 'block', pointerEvents: 'auto', opacity: 1 });
    this.tl.set([this.curtainLeft, this.curtainRight], { xPercent: 0 });
    this.tl.set(this.incisionLine, { 
      scaleY: 0, 
      scaleX: 1, 
      opacity: 1, 
      filter: 'brightness(1) drop-shadow(0 0 12px rgba(200, 90, 23, 0.95))', 
      transformOrigin: '50% 50%' 
    });
    this.tl.set(this.crosshair, { opacity: 0, scale: 0.5, rotation: -30 });
    this.tl.set(this.centerStage, { opacity: 0, y: 16, scale: 0.97 });
    this.tl.set([this.frameTop, this.hud, this.frameBottomRight], { opacity: 0, y: 10 });
    
    if (this.percentNum) this.percentNum.textContent = '00';
    if (this.barFill) gsap.set(this.barFill, { width: '0%' });
    if (this.phaseText) {
      this.phaseText.textContent = 'Gathering artifacts & typography';
      gsap.set(this.phaseText, { opacity: 0.85, y: 0 });
    }

    const counterObj = { val: 0 };
    let currentPhase = 'Gathering artifacts & typography';

    const updatePhase = (newPhase) => {
      if (!this.phaseText || currentPhase === newPhase) return;
      currentPhase = newPhase;
      gsap.to(this.phaseText, {
        opacity: 0,
        y: -4,
        duration: 0.12,
        onComplete: () => {
          this.phaseText.textContent = newPhase;
          gsap.to(this.phaseText, { opacity: 0.85, y: 0, duration: 0.16 });
        }
      });
    };

    // Beat 1: Atmospheric Fade-In of Frame, Centerpiece Brand & Crosshair
    this.tl
      .to([this.frameTop, this.hud, this.frameBottomRight], {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out'
      })
      .to(this.centerStage, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out'
      }, '<0.05')
      .to(this.crosshair, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(1.5)'
      }, '<0.1')

      // Beat 2: Vertical Laser Incision & Smooth Progress with Dynamic Narrative Transitions
      .to(this.incisionLine, {
        scaleY: 1,
        duration: 1.45,
        ease: 'power2.inOut'
      }, '-=0.25')
      .to(counterObj, {
        val: 100,
        duration: 1.45,
        ease: 'power2.inOut',
        onUpdate: () => {
          const rounded = Math.round(counterObj.val);
          if (this.percentNum) {
            this.percentNum.textContent = rounded < 10 ? `0${rounded}` : `${rounded}`;
          }
          if (this.barFill) {
            this.barFill.style.width = `${rounded}%`;
          }

          if (rounded >= 100) {
            updatePhase('Ready');
          } else if (rounded >= 85) {
            updatePhase('Unfolding digital craft');
          } else if (rounded >= 55) {
            updatePhase('Polishing interactive surfaces');
          } else if (rounded >= 25) {
            updatePhase('Preparing tactile canvases');
          } else {
            updatePhase('Gathering artifacts & typography');
          }
        }
      }, '<')

      // Beat 3: Laser Surge Flare & Ethereal Text Dissolve at 100%
      .to(this.incisionLine, {
        scaleX: 3.5,
        filter: 'brightness(2.2) drop-shadow(0 0 25px #C85A17) drop-shadow(0 0 60px rgba(255, 139, 66, 0.9))',
        duration: 0.22,
        ease: 'power2.in'
      })
      .to([this.centerStage, this.hud, this.frameTop, this.frameBottomRight, this.crosshair], {
        opacity: 0,
        y: -14,
        duration: 0.22,
        ease: 'power2.in'
      }, '<')

      // Beat 4: Architectural Incision Split — Obsidian Curtains Part
      .addLabel('split')
      .to(this.incisionLine, {
        opacity: 0,
        scaleY: 1.15,
        duration: 0.35,
        ease: 'power2.out'
      }, 'split')
      .to(this.curtainLeft, {
        xPercent: -100.5,
        duration: 1.05,
        ease: 'power4.inOut'
      }, 'split')
      .to(this.curtainRight, {
        xPercent: 100.5,
        duration: 1.05,
        ease: 'power4.inOut'
      }, 'split')

      // Beat 5: Fire Hero Reveal as curtains part
      .call(() => {
        if (typeof this.onReveal === 'function') {
          this.onReveal();
        }
      }, null, 'split+=0.18');
  }

  play() {
    this.tl.play(0);
  }

  replay() {
    this.wrapper.style.display = 'block';
    this.wrapper.style.pointerEvents = 'auto';
    document.body.classList.add('loading-locked');
    this.buildTimeline();
    this.tl.play(0);
  }
}

