/**
 * ProjectDossier.js — Unified Editorial Project Experience
 * 
 * Fuses:
 * 1. Magnetic Floating Editorial Preview (Lerping cursor snapshot)
 * 2. Archival Specimen Slips (Perforated telemetry boarding passes)
 * 3. Editorial Broadsheet Fold-Out (Inline accordion broadside expansion)
 * 4. Interactive In-Situ Simulators:
 *    - Compress I/O: Local GPU NVENC hardware benchmark slider
 *    - Linkit: Zero-Trust Post-Quantum ML-KEM + AES-256 live encryption simulator
 * 5. Procedural Web Audio micro-haptics (paper slide & mechanical tick)
 */

import gsap from 'gsap';

export class ProjectDossier {
  constructor() {
    this.list = document.getElementById('project-list');
    this.items = Array.from(document.querySelectorAll('.project-item'));
    this.floatingCard = document.getElementById('project-preview-img');
    this.audioCtx = null;
    this.activeDossier = null;

    if (!this.list || this.items.length === 0) return;

    this.initAudio();
    this.initFloatingPreview();
    this.initDossierFoldOuts();
    this.initCompressSimulator();
    this.initCryptoSimulator();
  }

  // ─── PROCEDURAL WEB AUDIO MICRO-HAPTICS ─────────────────────
  initAudio() {
    const unlockAudio = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext && !this.audioCtx) {
          this.audioCtx = new AudioContext();
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
      } catch (e) {
        // Audio optional / suppressed
      }
      window.removeEventListener('pointerdown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true });
  }

  playHaptic(type = 'tick') {
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      if (type === 'tick') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(820, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'unfold') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.09);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch (e) {}
  }

  // ─── 1. MAGNETIC FLOATING CURSOR PREVIEW ────────────────────
  initFloatingPreview() {
    if (!this.floatingCard) return;

    const previewData = {
      linkit: {
        title: 'LINKIT',
        folio: 'NO. 01/26',
        subtitle: 'Creator Profiles at the Edge',
        image: '/linkit-logo.png',
        tag: 'ZERO-TRUST VAULT',
        color: '#C85A17'
      },
      compress: {
        title: 'COMPRESS I/O',
        folio: 'NO. 02/25',
        subtitle: '100% Offline Hardware Media Suite',
        image: '/compress-logo.png',
        tag: 'GPU ACCELERATED',
        color: '#768E1B'
      }
    };

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isVisible = false;
    let isHoveringOpenDossier = false;

    // Smooth lerp ticker
    gsap.ticker.add(() => {
      if (!isVisible || isHoveringOpenDossier) return;
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      gsap.set(this.floatingCard, {
        x: currentX,
        y: currentY,
        force3D: true
      });
    });

    const onMouseMove = (e) => {
      targetX = e.clientX + 24;
      targetY = e.clientY - 90;

      // Clamp so preview doesn't clip off right or bottom edge
      const maxW = window.innerWidth - 320;
      if (targetX > maxW) {
        targetX = e.clientX - 300;
      }
      if (targetY < 20) {
        targetY = 20;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    this.items.forEach((item) => {
      const id = item.dataset.id;
      const data = previewData[id];
      if (!data) return;

      const triggerRow = item.querySelector('.project-row-trigger') || item;

      triggerRow.addEventListener('mouseenter', (e) => {
        // If this item's broadsheet is already open, do not distract with floating card
        const tray = item.querySelector('.project-dossier-tray');
        if (tray && tray.classList.contains('is-open')) return;

        this.playHaptic('tick');
        isVisible = true;

        this.floatingCard.innerHTML = `
          <div class="preview-card-inner" style="border-top: 3px solid ${data.color}">
            <div class="preview-card-header">
              <span class="preview-serial">${data.folio}</span>
              <span class="preview-badge" style="color:${data.color}">● ${data.tag}</span>
            </div>
            <div class="preview-img-frame">
              <img src="${data.image}" alt="${data.title} preview" class="preview-thumb" />
            </div>
            <div class="preview-footer">
              <span class="preview-title">${data.title}</span>
              <span class="preview-hint">CLICK TO UNFOLD ▾</span>
            </div>
          </div>
        `;

        targetX = e.clientX + 24;
        targetY = e.clientY - 90;
        currentX = targetX;
        currentY = targetY;

        gsap.to(this.floatingCard, {
          opacity: 1,
          scale: 1,
          duration: 0.28,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      });

      triggerRow.addEventListener('mouseleave', () => {
        isVisible = false;
        gsap.to(this.floatingCard, {
          opacity: 0,
          scale: 0.94,
          duration: 0.2,
          ease: 'power2.in',
          overwrite: 'auto'
        });
      });
    });
  }

  // ─── 2 & 3. EDITORIAL BROADSHEET UNFOLDING ───────────────────
  initDossierFoldOuts() {
    this.items.forEach((item) => {
      const triggerRow = item.querySelector('.project-row-trigger');
      const tray = item.querySelector('.project-dossier-tray');
      const unfoldBtn = item.querySelector('.unfold-toggle-btn');
      const closeBtn = item.querySelector('.dossier-close-btn');

      if (!triggerRow || !tray) return;

      const toggleDossier = (e) => {
        // Prevent toggle if clicking interactive controls inside the broadsheet
        if (e.target.closest('.dossier-interactive-zone') || e.target.closest('a') || e.target.closest('input')) {
          return;
        }

        const isOpen = tray.classList.contains('is-open');

        // Hide floating preview when clicking to unfold
        if (this.floatingCard) {
          gsap.to(this.floatingCard, { opacity: 0, scale: 0.9, duration: 0.15 });
        }

        if (isOpen) {
          this.closeDossier(tray, item);
        } else {
          // Close other open dossiers for clean accordion behavior
          this.items.forEach((other) => {
            if (other !== item) {
              const otherTray = other.querySelector('.project-dossier-tray');
              if (otherTray && otherTray.classList.contains('is-open')) {
                this.closeDossier(otherTray, other);
              }
            }
          });
          this.openDossier(tray, item);
        }
      };

      triggerRow.addEventListener('click', toggleDossier);
      if (unfoldBtn) unfoldBtn.addEventListener('click', toggleDossier);
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.closeDossier(tray, item);
        });
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeDossier) {
        const item = this.activeDossier.closest('.project-item');
        if (item) this.closeDossier(this.activeDossier, item);
      }
    });
  }

  openDossier(tray, item) {
    this.playHaptic('unfold');
    tray.classList.add('is-open');
    item.classList.add('dossier-active');

    const toggleText = item.querySelector('.unfold-label');
    const toggleIcon = item.querySelector('.unfold-icon');
    if (toggleText) toggleText.textContent = 'FOLD DOSSIER';
    if (toggleIcon) toggleIcon.textContent = '▲';

    this.activeDossier = tray;

    // Animate accordion height
    gsap.set(tray, { height: 'auto', display: 'block' });
    const fullHeight = tray.scrollHeight;
    gsap.fromTo(tray, 
      { height: 0, opacity: 0 },
      {
        height: fullHeight,
        opacity: 1,
        duration: 0.65,
        ease: 'power3.out',
        onComplete: () => {
          tray.style.height = 'auto';
        }
      }
    );

    // Stagger in internal broadsheet panels
    const innerPanels = tray.querySelectorAll('.broadsheet-header, .simulator-card, .broadsheet-grid, .broadsheet-actions');
    gsap.fromTo(innerPanels,
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.15 }
    );
  }

  closeDossier(tray, item) {
    this.playHaptic('tick');
    tray.classList.remove('is-open');
    item.classList.remove('dossier-active');

    const toggleText = item.querySelector('.unfold-label');
    const toggleIcon = item.querySelector('.unfold-icon');
    if (toggleText) toggleText.textContent = 'UNFOLD DOSSIER';
    if (toggleIcon) toggleIcon.textContent = '▼';

    if (this.activeDossier === tray) {
      this.activeDossier = null;
    }

    gsap.to(tray, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: () => {
        tray.style.display = 'none';
      }
    });
  }

  // ─── 4A. INTERACTIVE HARDWARE BENCHMARK: COMPRESS I/O ─────────
  initCompressSimulator() {
    const slider = document.getElementById('compress-slider');
    const inputValEl = document.getElementById('compress-input-val');
    const outputValEl = document.getElementById('compress-output-val');
    const ratioEl = document.getElementById('compress-ratio-val');
    const barFillEl = document.getElementById('compress-bar-fill');
    const timeSavedEl = document.getElementById('compress-speed-val');
    const presetBtns = document.querySelectorAll('.compress-preset-btn');

    if (!slider || !inputValEl) return;

    const updateMetrics = (targetMB) => {
      const originalMB = 1450; // 1.45 GB Raw 4K ProRes
      const target = Math.max(1, Math.min(originalMB - 1, targetMB));

      inputValEl.textContent = '1.45 GB (ProRes 4K)';
      outputValEl.textContent = target >= 1000 ? `${(target / 1024).toFixed(2)} GB` : `${target.toFixed(1)} MB`;

      const reduction = (((originalMB - target) / originalMB) * 100).toFixed(1);
      ratioEl.textContent = `-${reduction}%`;

      const barPct = Math.max(4, Math.min(100, (target / originalMB) * 100));
      if (barFillEl) barFillEl.style.width = `${barPct}%`;

      if (timeSavedEl) {
        // Simulated NVENC hardware frame encode rate
        const fps = Math.round(180 - (target / originalMB) * 45);
        timeSavedEl.textContent = `${fps} FPS (NVENC Silicon)`;
      }
    };

    slider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      updateMetrics(val);
      presetBtns.forEach(b => b.classList.remove('is-active'));
    });

    presetBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.playHaptic('tick');
        const targetSize = parseFloat(btn.dataset.size);
        slider.value = targetSize;
        presetBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        updateMetrics(targetSize);
      });
    });

    // Initial calculation
    updateMetrics(8);
  }

  // ─── 4B. INTERACTIVE CRYPTOGRAPHIC ENGINE: LINKIT ────────────
  initCryptoSimulator() {
    const input = document.getElementById('crypto-input');
    const encryptBtn = document.getElementById('crypto-encrypt-btn');
    const cipherOut = document.getElementById('crypto-cipher-out');
    const kemKeyOut = document.getElementById('crypto-kem-out');
    const zkStatus = document.getElementById('crypto-zk-status');

    if (!input || !encryptBtn || !cipherOut) return;

    const generateHex = (len) => {
      const chars = '0123456789abcdef';
      let res = '';
      for (let i = 0; i < len; i++) {
        res += chars[Math.floor(Math.random() * chars.length)];
      }
      return res;
    };

    const runSimulation = (isInitial = false) => {
      const text = input.value.trim();

      // STRICT VALIDATION: If empty, reject and prompt user
      if (!text) {
        this.playHaptic('tick');

        // Visual shake feedback on input field
        gsap.fromTo(input, 
          { x: -8 }, 
          { x: 8, duration: 0.06, repeat: 3, yoyo: true, onComplete: () => gsap.set(input, { x: 0 }) }
        );
        input.classList.add('input-error');

        cipherOut.textContent = '[ERROR: PAYLOAD CANNOT BE EMPTY — ENTER A MESSAGE]';
        cipherOut.style.color = '#D9381E';

        if (kemKeyOut) {
          kemKeyOut.textContent = 'ML-KEM-768: AWAITING NON-EMPTY BUFFER...';
        }

        if (zkStatus) {
          zkStatus.textContent = '● REJECTED: ZERO-BYTE PAYLOAD (CANNOT ENCRYPT EMPTY DATA)';
          zkStatus.style.color = '#D9381E';
        }

        input.focus();
        return;
      }

      // Valid text: clear error
      input.classList.remove('input-error');
      cipherOut.style.color = 'var(--orange)';

      this.playHaptic('tick');

      // Scramble / typing animation effect
      cipherOut.textContent = 'COMPUTING LATTICE ENCRYPTION...';
      cipherOut.classList.add('is-animating');

      if (zkStatus) {
        zkStatus.textContent = 'GENERATING ZK-SNARK WITNESS...';
        zkStatus.style.color = 'var(--orange)';
      }

      setTimeout(() => {
        // Generate simulated ML-KEM Kyber-768 ciphertext + AES-256-GCM block
        const kyberSeed = '0x' + generateHex(32).toUpperCase();
        const aesCipher = 'aes256_gcm:' + btoa(text).slice(0, 8) + '$' + generateHex(40) + '==';

        cipherOut.textContent = aesCipher;
        cipherOut.classList.remove('is-animating');

        if (kemKeyOut) {
          kemKeyOut.textContent = `ML-KEM-768: ${kyberSeed}`;
        }

        if (zkStatus) {
          zkStatus.textContent = '● snarkjs PROOF VALIDATED (0.08ms IPC)';
          zkStatus.style.color = '#768E1B';
        }
      }, isInitial ? 0 : 260);
    };

    encryptBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      runSimulation(false);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        runSimulation(false);
      }
    });

    // Real-time clearing feedback
    input.addEventListener('input', () => {
      input.classList.remove('input-error');
      if (input.value.trim() === '') {
        cipherOut.textContent = '[STANDBY — ENTER PAYLOAD TO ENCRYPT]';
        cipherOut.style.color = 'rgba(28, 26, 23, 0.45)';
        if (kemKeyOut) kemKeyOut.textContent = 'ML-KEM-768: STANDBY';
        if (zkStatus) {
          zkStatus.textContent = '● IDLE (INPUT REQUIRED)';
          zkStatus.style.color = 'rgba(28, 26, 23, 0.6)';
        }
      }
    });

    // Run initial demo state if input starts with a default value
    if (input.value.trim()) {
      runSimulation(true);
    }
  }
}
