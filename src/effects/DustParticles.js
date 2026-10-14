/**
 * DustParticles.js — Floating ambient dust motes in the warm light.
 * These react to cursor velocity (cursor wind).
 */
import * as THREE from 'three';

export class DustParticles {
  constructor(scene, count = 150) {
    this.scene = scene;
    this.count = count;
    this.velocities = [];
    this.windForce = { x: 0, y: 0 };
    this.targetWindForce = { x: 0, y: 0 };

    this.init();
  }

  init() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.count * 3);
    const sizes = new Float32Array(this.count);
    const opacities = new Float32Array(this.count);
    const speeds = new Float32Array(this.count);

    for (let i = 0; i < this.count; i++) {
      // Spread particles across the scene
      positions[i * 3]     = (Math.random() - 0.5) * 10;  // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;   // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 + 1; // z (in front of desk)

      sizes[i] = Math.random() * 3 + 1;
      opacities[i] = Math.random() * 0.4 + 0.1;
      speeds[i] = Math.random() * 0.5 + 0.2;

      this.velocities.push({
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.001 + 0.0005, // slight upward drift
        z: (Math.random() - 0.5) * 0.001,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_color: { value: new THREE.Color(0xFFDCB4) },
        u_pixelRatio: { value: window.devicePixelRatio },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aOpacity;
        attribute float aSpeed;
        uniform float u_time;
        uniform float u_pixelRatio;
        varying float vOpacity;
        
        void main() {
          vOpacity = aOpacity;
          
          vec3 pos = position;
          // Gentle floating motion
          pos.x += sin(u_time * aSpeed * 0.5 + position.y * 2.0) * 0.03;
          pos.y += sin(u_time * aSpeed * 0.3 + position.x * 1.5) * 0.02;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aSize * u_pixelRatio * (100.0 / -mvPosition.z);
          gl_PointSize = clamp(gl_PointSize, 0.5, 8.0);
        }
      `,
      fragmentShader: `
        uniform vec3 u_color;
        varying float vOpacity;
        
        void main() {
          // Soft circular particle
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.1, dist) * vOpacity;
          gl_FragColor = vec4(u_color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  applyWind(dx, dy) {
    this.targetWindForce.x = dx * 0.0005;
    this.targetWindForce.y = dy * 0.0003;
  }

  update(time, deltaTime) {
    if (!this.particles) return;

    this.particles.material.uniforms.u_time.value = time;

    // Lerp wind force (springy decay)
    this.windForce.x += (this.targetWindForce.x - this.windForce.x) * 0.08;
    this.windForce.y += (this.targetWindForce.y - this.windForce.y) * 0.08;
    this.targetWindForce.x *= 0.92;
    this.targetWindForce.y *= 0.92;

    const positions = this.particles.geometry.attributes.position.array;

    for (let i = 0; i < this.count; i++) {
      const idx = i * 3;

      // Apply velocity + wind
      positions[idx]     += this.velocities[i].x + this.windForce.x;
      positions[idx + 1] += this.velocities[i].y + this.windForce.y;
      positions[idx + 2] += this.velocities[i].z;

      // Wrap around boundaries
      if (positions[idx] > 5)      positions[idx] = -5;
      if (positions[idx] < -5)     positions[idx] = 5;
      if (positions[idx + 1] > 3)  positions[idx + 1] = -3;
      if (positions[idx + 1] < -3) positions[idx + 1] = 3;
      if (positions[idx + 2] > 3)  positions[idx + 2] = -1;
      if (positions[idx + 2] < -1) positions[idx + 2] = 3;
    }

    this.particles.geometry.attributes.position.needsUpdate = true;
  }

  setDensity(factor) {
    // Adjust opacity based on decay/time
    const opacities = this.particles.geometry.attributes.aOpacity.array;
    for (let i = 0; i < this.count; i++) {
      opacities[i] = (Math.random() * 0.4 + 0.1) * factor;
    }
    this.particles.geometry.attributes.aOpacity.needsUpdate = true;
  }

  dispose() {
    if (this.particles) {
      this.particles.geometry.dispose();
      this.particles.material.dispose();
      this.scene.remove(this.particles);
    }
  }
}
