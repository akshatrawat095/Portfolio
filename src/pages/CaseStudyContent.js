/**
 * CaseStudyContent.js (DOM Version)
 */

export const CASE_STUDIES = {
  linkit: {
    id: 'linkit',
    title: 'Linkit',
    subtitle: 'A nature-inspired link-in-bio platform that treats every profile like a living garden.',
    sections: [
      {
        title: 'Approach',
        body: 'Every element in the interface draws from botanical illustration traditions — hand-drawn borders, leaf-vein routing lines, and seasonal color shifts that change with the time of year. The platform transforms the mundane act of link aggregation into a meditative, garden-tending ritual.',
      },
      {
        title: 'Architecture',
        body: 'Built as a full-stack application with server-rendered pages for instant loading and SEO. Each user\'s garden is a living document that evolves: links can bloom, wither, or seed new connections.',
      },
    ],
    techStack: ['Next.js', 'React', 'TailwindCSS', 'Framer Motion'],
    year: '2026',
  },
  compress: {
    id: 'compress',
    title: 'Compress I/O',
    subtitle: 'An industrial-grade media compression tool. Squeezing every byte out of images and videos locally.',
    sections: [
      {
        title: 'Approach',
        body: 'Most compression tools are either bloated cloud apps or command-line-only utilities. Compress I/O occupies the space between — processing media files locally with a minimal, no-nonsense interface that respects the user\'s attention.',
      },
      {
        title: 'Performance',
        body: 'The compression pipeline leverages multi-threading and optimized codecs. Batch processing of 100+ files completes rapidly locally without uploading gigabytes to the cloud.',
      },
    ],
    techStack: ['Tauri', 'Rust', 'FFmpeg', 'WebAssembly'],
    year: '2025',
  },
};

export function renderCaseStudy(id) {
  const study = CASE_STUDIES[id];
  if (!study) return '';

  const sectionsHTML = study.sections.map(s => `
    <div class="cs-section">
      <h2 class="cs-section-title">${s.title}</h2>
      <p class="cs-body">${s.body}</p>
    </div>
  `).join('');

  const techHTML = study.techStack.map(t => 
    `<span class="cs-tech-tag">${t}</span>`
  ).join('');

  return `
    <div class="cs-header">
      <h1 class="cs-title">${study.title}</h1>
      <hr class="cs-rule" />
      <p class="cs-subtitle">${study.subtitle}</p>
    </div>

    <div class="cs-hero-box animate-in">
      [ PROJECT PREVIEW AREA ]
    </div>

    <div class="cs-columns">
      <div>${sectionsHTML}</div>
      <div>
        <div class="cs-section">
          <h2 class="cs-section-title">Stack</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${techHTML}
          </div>
        </div>
        <div class="cs-section">
          <h2 class="cs-section-title">Year</h2>
          <p class="cs-body" style="font-family: var(--font-mono);">${study.year}</p>
        </div>
      </div>
    </div>
  `;
}

export function animateCaseStudyIn() {
  requestAnimationFrame(() => {
    const elements = ['.cs-title', '.cs-rule', '.cs-subtitle', '.cs-hero-box'];
    elements.forEach((sel, i) => {
      const el = document.querySelector(sel);
      if (el) setTimeout(() => el.classList.add('animate-in'), 100 + i * 150);
    });
  });
}
