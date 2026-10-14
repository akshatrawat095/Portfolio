/**
 * Cursor.js — The Maker's Hand.
 * Custom cursor that casts a shadow on the desk and glows on artifact hover.
 */

export class Cursor {
  constructor() {
    this.shadow = document.getElementById('cursor-shadow');
    this.glow = document.getElementById('cursor-glow');
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    this.targetX = this.x;
    this.targetY = this.y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.lastX = this.x;
    this.lastY = this.y;
    this.isHovering = false;
    this.isVisible = false;

    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;

      // Calculate velocity for wind effect
      this.velocityX = e.clientX - this.lastX;
      this.velocityY = e.clientY - this.lastY;
      this.lastX = e.clientX;
      this.lastY = e.clientY;

      if (!this.isVisible) {
        this.isVisible = true;
        this.shadow.classList.add('visible');
      }
    });

    document.addEventListener('mouseleave', () => {
      this.isVisible = false;
      this.shadow.classList.remove('visible');
      this.glow.classList.remove('hovering');
    });
  }

  setHovering(hovering) {
    this.isHovering = hovering;
    if (hovering) {
      this.shadow.classList.add('hovering');
      this.glow.classList.add('hovering');
    } else {
      this.shadow.classList.remove('hovering');
      this.glow.classList.remove('hovering');
    }
  }

  update() {
    // Smooth lerp for organic feel
    this.x += (this.targetX - this.x) * 0.12;
    this.y += (this.targetY - this.y) * 0.12;

    // Shadow offset — shifts opposite to movement direction (natural light physics)
    const offsetX = -this.velocityX * 0.3;
    const offsetY = -this.velocityY * 0.3;

    this.shadow.style.left = `${this.x + offsetX}px`;
    this.shadow.style.top = `${this.y + offsetY + 15}px`; // Shadow below cursor

    this.glow.style.left = `${this.x}px`;
    this.glow.style.top = `${this.y}px`;

    // Decay velocity
    this.velocityX *= 0.9;
    this.velocityY *= 0.9;
  }

  getVelocity() {
    return {
      x: this.velocityX,
      y: this.velocityY,
      magnitude: Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2),
    };
  }

  getNormalized() {
    return {
      x: (this.targetX / window.innerWidth) * 2 - 1,  // -1 to 1
      y: -(this.targetY / window.innerHeight) * 2 + 1, // -1 to 1 (inverted)
    };
  }
}
