/**
 * TransitionSweep.js — Cinematic leaf-sweep page transition.
 * Spawns dark autumn leaf particles that sweep across the viewport
 * to mask the transition between the desk scene and case studies.
 */
import gsap from 'gsap';

export class TransitionSweep {
  constructor() {
    this.canvas = document.getElementById('transition-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.leaves = [];
    this.isAnimating = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth * window.devicePixelRatio;
    this.canvas.height = window.innerHeight * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  createLeaf() {
    const side = Math.random() > 0.5 ? -1 : 1; // Left or right entry
    return {
      x: side === -1 ? -60 : window.innerWidth + 60,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 35 + 15,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      speedX: side * -(Math.random() * 12 + 6), // Move inward
      speedY: (Math.random() - 0.5) * 3,
      opacity: Math.random() * 0.6 + 0.4,
      color: this.getLeafColor(),
      shape: Math.floor(Math.random() * 3), // 0=maple, 1=oval, 2=narrow
      phase: 0,
    };
  }

  getLeafColor() {
    const colors = [
      '#2C1F0E', '#3D2B14', '#4A2810', '#1A1208',
      '#5C3317', '#3B1C0A', '#8B4513', '#654321',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  drawLeaf(leaf) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(leaf.x, leaf.y);
    ctx.rotate(leaf.rotation);
    ctx.globalAlpha = leaf.opacity;
    ctx.fillStyle = leaf.color;

    ctx.beginPath();
    const s = leaf.size;

    if (leaf.shape === 0) {
      // Maple-like
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const outerR = s;
        const innerR = s * 0.4;
        const outerX = Math.cos(angle) * outerR;
        const outerY = Math.sin(angle) * outerR;
        const midAngle = angle + Math.PI / 5;
        const midX = Math.cos(midAngle) * innerR;
        const midY = Math.sin(midAngle) * innerR;

        if (i === 0) ctx.moveTo(outerX, outerY);
        else ctx.lineTo(outerX, outerY);
        ctx.lineTo(midX, midY);
      }
      ctx.closePath();
    } else if (leaf.shape === 1) {
      // Oval leaf
      ctx.ellipse(0, 0, s * 0.4, s * 0.8, 0, 0, Math.PI * 2);
    } else {
      // Narrow willow-like
      ctx.ellipse(0, 0, s * 0.2, s, 0, 0, Math.PI * 2);
    }

    ctx.fill();

    // Leaf vein
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.7);
    ctx.lineTo(0, s * 0.7);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Play the leaf sweep transition.
   * @param {Function} onMidpoint — Called when leaves cover the screen (switch content here)
   * @param {Function} onComplete — Called when transition finishes
   */
  play(onMidpoint, onComplete) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.canvas.classList.add('active');
    this.leaves = [];

    const totalLeaves = 50;
    const duration = 1200; // ms
    const midpointTime = duration * 0.4;
    let midpointFired = false;
    let startTime = null;

    // Spawn leaves in waves
    for (let i = 0; i < totalLeaves; i++) {
      const leaf = this.createLeaf();
      leaf.spawnDelay = Math.random() * midpointTime * 0.8;
      this.leaves.push(leaf);
    }

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw all active leaves
      let activeLeaves = 0;
      for (const leaf of this.leaves) {
        if (elapsed < leaf.spawnDelay) continue;

        const leafTime = elapsed - leaf.spawnDelay;
        leaf.x += leaf.speedX * 1.2;
        leaf.y += leaf.speedY + Math.sin(leafTime * 0.005) * 2;
        leaf.rotation += leaf.rotationSpeed;

        // Only draw if on screen (with margin)
        if (leaf.x > -100 && leaf.x < window.innerWidth + 100) {
          this.drawLeaf(leaf);
          activeLeaves++;
        }
      }

      // Midpoint callback — switch content when leaves cover most of screen
      if (!midpointFired && elapsed > midpointTime) {
        midpointFired = true;
        if (onMidpoint) onMidpoint();
      }

      // Continue animation until all leaves have crossed or time exceeded
      if (elapsed < duration || activeLeaves > 5) {
        requestAnimationFrame(animate);
      } else {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.canvas.classList.remove('active');
        this.isAnimating = false;
        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(animate);
  }

  dispose() {
    this.leaves = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
