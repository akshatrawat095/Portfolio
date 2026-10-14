import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KineticDeck } from './effects/KineticDeck.js';
import { ProjectDossier } from './effects/ProjectDossier.js';
import { LineRevealLoader } from './effects/LineRevealLoader.js';

gsap.registerPlugin(ScrollTrigger);

// Project Data
const CASE_STUDIES = {
  linkit: {
    title: 'LINKIT',
    subtitle: 'Creator Profiles, Reimagined at the Edge.',
    image: '/linkit-logo.png',
    primaryLink: {
      label: 'LAUNCH LIVE PLATFORM',
      url: 'https://linkit-tan.vercel.app/',
      icon: '↗'
    },
    secondaryLink: {
      label: 'EXPLORE SOURCE REPO',
      url: 'https://github.com/akshatrawat095',
      icon: '↗'
    },
    body: `
      <p><span class="drop-cap" style="font-size:3rem; padding-right:10px;">O</span>ne link. Infinite possibilities. Most "link-in-bio" tools give you a static list of buttons and call it a day. Linkit is different.</p>
      
      <p>Every element in the interface draws from a highly interactive canvas — freeform drag layouts, liquid-glass effects, and generative WebGL backgrounds. It transforms the mundane act of link aggregation into a dynamic, personalized ritual.</p>
      
      <div style="margin-top: 4rem; padding-top: 2rem; border-top: 2px solid var(--ink);">
        <h3 style="font-family: var(--font-display-sans); font-size: 3rem; line-height: 1; margin-bottom: 3rem;">CORE ARCHITECTURE</h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem;">
          <div>
            <h4 style="font-family: var(--font-ui); font-size: 14px; letter-spacing: 2px; color: var(--orange); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
              STUDIO & DESIGN ENGINE
            </h4>
            <p style="font-size: 1rem; opacity: 0.9;">Fluid drag canvases, liquid-glass effects, and generative art backgrounds. Powered by 60+ premium CSS-variable driven themes and spatial stickers.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-ui); font-size: 14px; letter-spacing: 2px; color: var(--orange); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              COMMERCE SUITE
            </h4>
            <p style="font-size: 1rem; opacity: 0.9;">Digital products are protected via a Rust-compiled WASM validation engine before decryption. Features collaborative multi-creator payouts built natively over Razorpay.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-ui); font-size: 14px; letter-spacing: 2px; color: var(--orange); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
              ZERO-TRUST VAULT
            </h4>
            <p style="font-size: 1rem; opacity: 0.9;">A five-layer fortress. Private notes are encrypted using <code>AES-256-GCM</code> encapsulated by Post-Quantum <code>ML-KEM (Kyber)</code>. Features Zero-Knowledge Auth via <code>snarkjs</code>.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-ui); font-size: 14px; letter-spacing: 2px; color: var(--orange); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
              EDGE AI & COMPUTE
            </h4>
            <p style="font-size: 1rem; opacity: 0.9;">Powered by Google Gemini RAG and local ML models running directly in Web Workers to analyze and assist without blocking the main thread.</p>
          </div>
        </div>
      </div>

      <div class="tech-matrix-wrapper">
        <div class="tech-matrix-header">
          <h3 class="tech-matrix-title">THE TECHNOLOGY MATRIX</h3>
          <span class="tech-matrix-count">13 SPECIMEN RUNTIMES</span>
        </div>

        <div class="tech-matrix-sections">
          <!-- 01. FRONTEND ARCHITECTURE -->
          <div class="tech-matrix-group">
            <div class="tech-group-header">
              <span class="tech-group-label"><span class="tech-group-dot"></span>01 // CLIENT & PRESENTATION LAYER</span>
              <span class="tech-group-meta">6 RUNTIMES</span>
            </div>
            <div class="tech-matrix-grid">
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/react/1C1A17" class="matrix-tile-icon" alt="React" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">REACT 19</span>
                  <span class="matrix-tile-role">Concurrent Core</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/vite/1C1A17" class="matrix-tile-icon" alt="Vite" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">VITE 8</span>
                  <span class="matrix-tile-role">Next-Gen Bundler</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/reactrouter/1C1A17" class="matrix-tile-icon" alt="React Router" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">ROUTER 7</span>
                  <span class="matrix-tile-role">Framework Routing</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/greensock/1C1A17" class="matrix-tile-icon" alt="GSAP" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">GSAP 3</span>
                  <span class="matrix-tile-role">Kinetic Timeline</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/webgl/1C1A17" class="matrix-tile-icon" alt="WebGL" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">WEBGL</span>
                  <span class="matrix-tile-role">GPU Fragment Shaders</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/tailwindcss/1C1A17" class="matrix-tile-icon" alt="Tailwind CSS" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">TAILWIND 3</span>
                  <span class="matrix-tile-role">Design Tokens</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 02. EDGE & CLOUD INFRASTRUCTURE -->
          <div class="tech-matrix-group">
            <div class="tech-group-header">
              <span class="tech-group-label"><span class="tech-group-dot"></span>02 // EDGE & CLOUD INFRASTRUCTURE</span>
              <span class="tech-group-meta">3 NODES</span>
            </div>
            <div class="tech-matrix-grid">
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/vercel/1C1A17" class="matrix-tile-icon" alt="Vercel" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">VERCEL EDGE</span>
                  <span class="matrix-tile-role">Global CDN & V8 Compute</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/supabase/1C1A17" class="matrix-tile-icon" alt="Supabase" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">SUPABASE</span>
                  <span class="matrix-tile-role">PostgreSQL & Realtime</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/redis/1C1A17" class="matrix-tile-icon" alt="Redis" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">UPSTASH REDIS</span>
                  <span class="matrix-tile-role">Serverless KV Cache</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 03. CRYPTOGRAPHY & SECURITY -->
          <div class="tech-matrix-group">
            <div class="tech-group-header">
              <span class="tech-group-label"><span class="tech-group-dot"></span>03 // CRYPTOGRAPHIC & QUANTUM ENGINE</span>
              <span class="tech-group-meta">4 PROTOCOLS</span>
            </div>
            <div class="tech-matrix-grid">
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <svg class="matrix-tile-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">WEB CRYPTO API</span>
                  <span class="matrix-tile-role">Hardware AES-256-GCM</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <svg class="matrix-tile-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">SNARKJS</span>
                  <span class="matrix-tile-role">Zero-Knowledge Proofs</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <svg class="matrix-tile-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><circle cx="12" cy="11" r="3"></circle></svg>
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">ML-KEM (KYBER)</span>
                  <span class="matrix-tile-role">Post-Quantum Lattice</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <svg class="matrix-tile-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2a10 10 0 0 0-10 10c0 4.1 2.5 7.6 6 9.1"></path><path d="M12 6a6 6 0 0 0-6 6c0 2.5 1.5 4.6 3.6 5.5"></path><path d="M12 10a2 2 0 0 0-2 2c0 .8.5 1.5 1.2 1.8"></path><path d="M12 14v4"></path></svg>
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">FIDO2 WEBAUTHN</span>
                  <span class="matrix-tile-role">Biometric Hardware Passkey</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  compress: {
    title: 'COMPRESS I/O',
    subtitle: 'The Ultimate Offline Media Suite. Built for Privacy, Powered by Hardware.',
    image: '/compress-logo.png',
    primaryLink: {
      label: 'DOWNLOAD LATEST RELEASE',
      url: 'https://github.com/akshatrawat095/compress-io/releases',
      icon: '↓'
    },
    secondaryLink: {
      label: 'EXPLORE SOURCE REPO',
      url: 'https://github.com/akshatrawat095/compress-io',
      icon: '↗'
    },
    body: `
      <p><span class="drop-cap" style="font-size:3rem; padding-right:10px;">M</span>ost media tools fall into two traps: they either upload your private files to a cloud server, or they are impossible to use locally without a degree in computer science. Compress I/O is different.</p>
      
      <p>We engineered an ultra-premium, local-first media suite using <strong>Tauri, Rust, and React</strong>. It automatically hijacks your computer's dedicated GPU to compress, enhance, and scale media at breathtaking speeds — all from a stunning, glassmorphic UI.</p>
      
      <div style="margin-top: 4rem; padding-top: 2rem; border-top: 2px solid var(--ink);">
        <h3 style="font-family: var(--font-display-sans); font-size: 3rem; line-height: 1; margin-bottom: 3rem;">CORE CAPABILITIES</h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem;">
          <div>
            <h4 style="font-family: var(--font-ui); font-size: 14px; letter-spacing: 2px; color: var(--orange); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              SMART COMPRESSION ENGINE
            </h4>
            <p style="font-size: 1rem; opacity: 0.9;">Hit an exact target size (e.g., <i>"Make this exactly 8MB for Discord"</i>) using our binary search algorithm. Features a built-in <b>Smart Limit</b> that prevents artificial file padding.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-ui); font-size: 14px; letter-spacing: 2px; color: var(--orange); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>
              HYBRID ENGINE
            </h4>
            <p style="font-size: 1rem; opacity: 0.9;">Uses a smart <b>"Hybrid Mode"</b> (CPU Reads → GPU Writes) to ensure maximum stability. Process massive 8K files or corrupted inputs without crashing.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-ui); font-size: 14px; letter-spacing: 2px; color: var(--orange); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
              UNIVERSAL GPU ACCELERATION
            </h4>
            <p style="font-size: 1rem; opacity: 0.9;">Detects and utilizes your exact silicon. Fully supports <b>NVIDIA NVENC</b>, <b>AMD AMF</b>, <b>Intel QuickSync</b>, and <b>Apple VideoToolbox</b>.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-ui); font-size: 14px; letter-spacing: 2px; color: var(--orange); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              SMART DIAGNOSTICS
            </h4>
            <p style="font-size: 1rem; opacity: 0.9;">Hate cryptic errors? We parse every core processing failure (OOM, missing codecs, GPU crash) and display a beautiful "Error Toast" with a clickable Quick Fix.</p>
          </div>
        </div>
      </div>

      <div class="tech-matrix-wrapper">
        <div class="tech-matrix-header">
          <h3 class="tech-matrix-title">UNDER THE HOOD</h3>
          <span class="tech-matrix-count">11 SPECIMEN RUNTIMES</span>
        </div>

        <div class="tech-matrix-sections">
          <!-- 01. PRESENTATION LAYER -->
          <div class="tech-matrix-group">
            <div class="tech-group-header">
              <span class="tech-group-label"><span class="tech-group-dot"></span>01 // CLIENT & PRESENTATION LAYER</span>
              <span class="tech-group-meta">3 RUNTIMES</span>
            </div>
            <div class="tech-matrix-grid">
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/react/1C1A17" class="matrix-tile-icon" alt="React" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">REACT 19</span>
                  <span class="matrix-tile-role">Component Architecture</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/framer/1C1A17" class="matrix-tile-icon" alt="Framer Motion" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">FRAMER MOTION</span>
                  <span class="matrix-tile-role">120fps Glassmorphic UI</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/tailwindcss/1C1A17" class="matrix-tile-icon" alt="Tailwind CSS" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">TAILWIND CSS</span>
                  <span class="matrix-tile-role">Tailored Dark Theme</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 02. NATIVE DESKTOP & SYSTEMS CORE -->
          <div class="tech-matrix-group">
            <div class="tech-group-header">
              <span class="tech-group-label"><span class="tech-group-dot"></span>02 // NATIVE DESKTOP & SYSTEMS CORE</span>
              <span class="tech-group-meta">3 RUNTIMES</span>
            </div>
            <div class="tech-matrix-grid">
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/rust/1C1A17" class="matrix-tile-icon" alt="Rust" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">RUST</span>
                  <span class="matrix-tile-role">Memory-Safe Systems Core</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/tauri/1C1A17" class="matrix-tile-icon" alt="Tauri" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">TAURI V2</span>
                  <span class="matrix-tile-role">Zero-Overhead IPC Shell</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/webassembly/1C1A17" class="matrix-tile-icon" alt="WASM" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">WEBASSEMBLY</span>
                  <span class="matrix-tile-role">Isolated Validation Engine</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 03. HARDWARE ACCELERATION & MEDIA ENGINE -->
          <div class="tech-matrix-group">
            <div class="tech-group-header">
              <span class="tech-group-label"><span class="tech-group-dot"></span>03 // SILICON & MEDIA ENGINES</span>
              <span class="tech-group-meta">4 ENGINES</span>
            </div>
            <div class="tech-matrix-grid">
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/ffmpeg/1C1A17" class="matrix-tile-icon" alt="FFmpeg" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">STATIC FFMPEG</span>
                  <span class="matrix-tile-role">Hardware Custom Builds</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/nvidia/1C1A17" class="matrix-tile-icon" alt="NVIDIA" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">NVIDIA NVENC</span>
                  <span class="matrix-tile-role">Dedicated GPU Encoder</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/apple/1C1A17" class="matrix-tile-icon" alt="Apple" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">VIDEOTOOLBOX</span>
                  <span class="matrix-tile-role">Apple Silicon Metal API</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <img src="https://cdn.simpleicons.org/intel/1C1A17" class="matrix-tile-icon" alt="Intel" />
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">INTEL QUICKSYNC</span>
                  <span class="matrix-tile-role">Hardware Transcoding</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 04. SECURITY & IMMUTABILITY -->
          <div class="tech-matrix-group">
            <div class="tech-group-header">
              <span class="tech-group-label"><span class="tech-group-dot"></span>04 // SECURITY & IMMUTABILITY</span>
              <span class="tech-group-meta">2 PROTOCOLS</span>
            </div>
            <div class="tech-matrix-grid">
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <svg class="matrix-tile-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.56 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path></svg>
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">AIR-GAPPED OFFLINE</span>
                  <span class="matrix-tile-role">Zero Cloud Leaks</span>
                </div>
              </div>
              <div class="matrix-specimen-tile">
                <div class="matrix-tile-icon-wrap">
                  <svg class="matrix-tile-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                </div>
                <div class="matrix-tile-info">
                  <span class="matrix-tile-name">SHA-256 INTEGRITY</span>
                  <span class="matrix-tile-role">Immutable Checksums</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
};

// modal drawer state
const overlay = document.getElementById('project-detail-overlay');
const closeBtn = document.querySelector('.close-btn');
const contentArea = document.getElementById('overlay-content');

// sync download count straight from github releases
const RELEASES_ENDPOINT = 'https://api.github.com/repos/akshatrawat095/compress-io/releases?per_page=100';
let cachedDownloads = parseInt(localStorage.getItem('compress_downloads'), 10) || 591;

export function syncDownloadBadges(count) {
  const num = typeof count === 'number' ? count : parseInt(count, 10) || cachedDownloads;
  const label = `${num}`;

  const pill = document.getElementById('compress-downloads-pill');
  if (pill) pill.textContent = `↓ ${label} DL`;

  const broadsheet = document.getElementById('compress-broadsheet-count');
  if (broadsheet) broadsheet.textContent = `${label} DL`;

  const modalNote = document.getElementById('compress-modal-count');
  if (modalNote) modalNote.textContent = `${label} live GitHub downloads`;

  const btnStat = document.getElementById('compress-btn-stat');
  if (btnStat) btnStat.textContent = `${label} DL`;
}

export async function fetchLiveDownloads() {
  try {
    const res = await fetch(RELEASES_ENDPOINT, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });
    if (!res.ok) {
      syncDownloadBadges(cachedDownloads);
      return;
    }

    const releases = await res.json();
    if (!Array.isArray(releases)) return;

    const total = releases.reduce((sum, rel) => {
      const assetsCount = (rel.assets || []).reduce((aSum, a) => aSum + (a.download_count || 0), 0);
      return sum + assetsCount;
    }, 0);

    if (total > 0) {
      cachedDownloads = total;
      localStorage.setItem('compress_downloads', total.toString());
      syncDownloadBadges(total);
    }
  } catch (err) {
    // offline or rate limited, cached value has our back
    syncDownloadBadges(cachedDownloads);
  }
}

// grab stats on boot
fetchLiveDownloads();

// pop open case study drawer
export function openProject(id) {
  const data = CASE_STUDIES[id];
  if (!data) return;

  const imgHTML = data.image 
    ? `<div style="text-align:center; margin-bottom: 4rem;"><img src="${data.image}" alt="${data.title} Logo" style="max-height: 200px; border-radius: 40px; box-shadow: 0 10px 40px rgba(28,26,23,0.1);" /></div>`
    : `<div class="overlay-img" style="display:flex; align-items:center; justify-content:center; font-family: var(--font-ui); letter-spacing: 2px;">[ ${data.title} UI SCREENSHOT ]</div>`;

  const noteText = id === 'compress' 
    ? `Verified binary · <strong id="compress-modal-count" style="color: var(--orange); font-style: normal; font-weight: 700;">${cachedDownloads} live GitHub downloads</strong> · 100% offline.`
    : `Production build · Zero-trust telemetry · Instant deployment access.`;

  const footerDispatchHTML = data.primaryLink ? `
    <div class="overlay-footer-dispatch">
      <div class="dispatch-footer-meta">
        <span class="dispatch-folio-stamp">RELEASE // ARTIFACT DISPATCH</span>
        <p class="dispatch-folio-note">${noteText}</p>
      </div>
      <div class="dispatch-footer-buttons">
        <a href="${data.primaryLink.url}" target="_blank" rel="noopener noreferrer" class="overlay-cta-btn cta-primary">
          <span>${data.primaryLink.label}</span>
          ${id === 'compress' ? `<span class="cta-stat-tag" id="compress-btn-stat">${cachedDownloads} DL</span>` : ''}
          <span class="cta-arrow">${data.primaryLink.icon}</span>
        </a>
        ${data.secondaryLink ? `
        <a href="${data.secondaryLink.url}" target="_blank" rel="noopener noreferrer" class="overlay-cta-btn cta-secondary">
          <span>${data.secondaryLink.label}</span>
          <span class="cta-arrow">${data.secondaryLink.icon}</span>
        </a>` : ''}
      </div>
    </div>
  ` : '';

  contentArea.innerHTML = `
    <h1 class="overlay-hero-title">${data.title}</h1>
    <p style="font-family: var(--font-body); font-style: italic; font-size: 1.5rem; margin-bottom: 3rem; color: var(--orange);">${data.subtitle}</p>
    ${imgHTML}
    <div class="overlay-text-body">
      ${data.body}
    </div>
    ${footerDispatchHTML}
  `;
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // refresh stats if opening compress
  if (id === 'compress') {
    syncDownloadBadges(cachedDownloads);
    fetchLiveDownloads();
  }
}

export function closeOverlay() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// wire up modal triggers from accordion
document.querySelectorAll('.open-full-overlay-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openProject(btn.dataset.project);
  });
});

if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

// esc key bails out of modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) closeOverlay();
});


// page entrance & scroll choreography
document.addEventListener("DOMContentLoaded", () => {
  // hero typography & floral branch drop-in
  function revealHeroElements() {
    gsap.fromTo('.elegant-title span', 
      { y: 55, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3, stagger: 0.14, ease: 'power4.out', overwrite: 'auto' }
    );

    gsap.fromTo('.watermark-text',
      { opacity: 0, scale: 0.93 },
      { opacity: 0.05, scale: 1, duration: 2.2, ease: 'power3.out', overwrite: 'auto' }
    );
    
    gsap.fromTo('.hero-floral',
      { x: 80, y: -40, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 2.2, ease: 'power3.out', overwrite: 'auto' }
    );
  }

  // initial loader slice
  const lineLoader = new LineRevealLoader({
    onReveal: revealHeroElements
  });

  // back to top button in footer
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // replay button in footer
  const replayBtn = document.getElementById('replay-loader-btn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      lineLoader.replay();
    });
  }

  // scroll reveals
  gsap.from(['.dispatch-headline', '.dispatch-col', '.dispatch-footer'], {
    scrollTrigger: {
      trigger: '.zine-prologue',
      start: 'top 75%'
    },
    y: 35,
    opacity: 0,
    duration: 1.1,
    stagger: 0.12,
    ease: 'power3.out'
  });

  // Interactive Marginalia (Concept A: Editor's Margin Notes & Highlights)
  const highlights = document.querySelectorAll('.margin-highlight');
  const marginCards = document.querySelectorAll('.editorial-margin-card');

  highlights.forEach((hl) => {
    const targetId = hl.getAttribute('data-target');
    const targetCard = document.getElementById(targetId);

    hl.addEventListener('mouseenter', () => {
      targetCard?.classList.add('active-note');
      hl.classList.add('active-highlight');
    });

    hl.addEventListener('mouseleave', () => {
      targetCard?.classList.remove('active-note');
      hl.classList.remove('active-highlight');
    });

    hl.addEventListener('click', () => {
      targetCard?.classList.toggle('active-note');
      hl.classList.toggle('active-highlight');
      if (targetCard) {
        gsap.fromTo(targetCard, { scale: 0.97 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' });
      }
    });
  });

  marginCards.forEach((card) => {
    const cardId = card.id;
    const relatedHl = document.querySelector(`.margin-highlight[data-target="${cardId}"]`);

    card.addEventListener('mouseenter', () => {
      card.classList.add('active-note');
      relatedHl?.classList.add('active-highlight');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('active-note');
      relatedHl?.classList.remove('active-highlight');
    });

    card.addEventListener('click', () => {
      card.classList.toggle('active-note');
      relatedHl?.classList.toggle('active-highlight');
      gsap.fromTo(card, { scale: 0.97 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' });
    });
  });

  gsap.from('.project-item', {
    scrollTrigger: {
      trigger: '.zine-index',
      start: 'top 80%'
    },
    x: -40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
  });

  gsap.from('.footer-title span', {
    scrollTrigger: { trigger: '.zine-footer', start: 'top 80%' },
    y: 50, opacity: 0, duration: 1.5, ease: 'power4.out'
  });
  
  gsap.from('.footer-col', {
    scrollTrigger: { trigger: '.zine-footer', start: 'top 85%' },
    y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2
  });

  // Idea B: Tactile Stamp Dispatch & Audio Synthesizer
  function playTactileStampSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;
      
      // Crisp mechanical snap (typewriter latch)
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(850, now);
      snapOsc.frequency.exponentialRampToValueAtTime(80, now + 0.045);
      snapGain.gain.setValueAtTime(0.3, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start(now);
      snapOsc.stop(now + 0.05);

      // Deep tactile ink-press thud
      const thudOsc = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thudOsc.type = 'sine';
      thudOsc.frequency.setValueAtTime(140, now + 0.01);
      thudOsc.frequency.exponentialRampToValueAtTime(32, now + 0.12);
      thudGain.gain.setValueAtTime(0.35, now + 0.01);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      thudOsc.connect(thudGain);
      thudGain.connect(ctx.destination);
      thudOsc.start(now + 0.01);
      thudOsc.stop(now + 0.15);
    } catch (_) {}
  }

  const copyDispatchBtn = document.getElementById('copy-email-dispatch-btn');
  const stampTarget = document.getElementById('footer-stamp-target');

  if (copyDispatchBtn && stampTarget) {
    let stampTimeout = null;

    copyDispatchBtn.addEventListener('click', async () => {
      // Obfuscated email reconstruction to keep bots from scraping
      const email = atob('YWNybzk2OTY5QGdtYWlsLmNvbQ=='); // acro96969@gmail.com
      try {
        await navigator.clipboard.writeText(email);
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }

      // Play authentic tactile audio
      playTactileStampSound();

      // Button feedback
      copyDispatchBtn.classList.add('is-stamped');
      const topNote = copyDispatchBtn.querySelector('.btn-top-note');
      const emailText = copyDispatchBtn.querySelector('.btn-email-text');
      const origNote = topNote ? topNote.textContent : '';
      const origText = emailText ? emailText.textContent : '';
      
      if (topNote) topNote.textContent = '✓ DISPATCH COPIED TO CLIPBOARD';
      if (emailText) emailText.textContent = email;

      // Stamp element HTML
      stampTarget.innerHTML = `
        <div class="ink-stamp">
          <div class="stamp-outer-ring">
            <div class="stamp-line-top">
              <span>✦ SPECIMEN // FOLIO</span>
              <span>VERIFIED TRANSMISSION</span>
              <span>✦</span>
            </div>
            <div class="stamp-center">DISPATCH COPIED</div>
            <div class="stamp-line-bot">
              <span>${email}</span>
              <span>●</span>
              <span>READY TO COMPOSE</span>
            </div>
          </div>
        </div>
      `;

      // Haptic micro-shake on the button
      gsap.fromTo(copyDispatchBtn, 
        { scale: 0.96 }, 
        { scale: 1, duration: 0.4, ease: 'back.out(2.5)' }
      );

      clearTimeout(stampTimeout);
      stampTimeout = setTimeout(() => {
        copyDispatchBtn.classList.remove('is-stamped');
        if (topNote) topNote.textContent = origNote;
        if (emailText) emailText.textContent = origText;
        const currentStamp = stampTarget.querySelector('.ink-stamp');
        if (currentStamp) {
          gsap.to(currentStamp, {
            opacity: 0,
            y: -10,
            duration: 0.5,
            onComplete: () => {
              stampTarget.innerHTML = '';
            }
          });
        }
      }, 4000);
    });
  }

  // kick off 3d deck & accordion broadsheets
  new KineticDeck();
  new ProjectDossier();
});
