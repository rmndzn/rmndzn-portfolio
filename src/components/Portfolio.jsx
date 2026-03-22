import { useState } from 'react';
import './Portfolio.css';

const projects = [
  {
    id: 1,
    title: 'BOXHEAD: ZOMBIE ARENA',
    description: 'A 1: 1 browser clone of the classic Boxhead(Y8 version) — built with pure HTML, CSS & Vanilla JavaScript.No frameworks.No dependencies.Just open and play.',
    tech: ['HTML5', 'CSS', 'JavaScript ES6+'],
    category: 'Full-Stack',
    demo: 'https://rmndzn.github.io/BXHD-ZOMBIE-ARENA-WEBGAME/',
    github: 'https://github.com/rmndzn/BXHD-ZOMBIE-ARENA-WEBGAME',
    featured: true,
    color: '#00b4ff',
    icon: '🎮',
  },
  {
    id: 2,
    title: 'Web-Based Appointment System',
    description: 'A full-stack web application designed to modernize salon operations by streamlining appointment scheduling, client inquiries, and admin management.',
    tech: ['HTML5 + PHP', 'CSS', 'Javascript', 'Bootstrap', 'MYSQL'],
    category: 'Frontend',
    demo: 'https://github.com/rmndzn/Web-based-Appointment-System-with-Inquiry-for-Minell-s-Hair-Nail-and-Lashes-Salon',
    github: 'https://github.com/rmndzn/Web-based-Appointment-System-with-Inquiry-for-Minell-s-Hair-Nail-and-Lashes-Salon',
    featured: true,
    color: '#3b82f6',
    icon: '📊',
  },
  {
    id: 3,
    title: 'Grow-A-Garden WebGame',
    description: '1:1 Clone Webgame of Roblox game "Grow-A-Garden"',
    tech: ['HTML5', 'CSS', 'JavaScript ES6+'],
    category: 'Full-Stack',
    demo: 'https://rmndzn.github.io/GAGWEB/',
    github: 'https://github.com/rmndzn/GAGWEB',
    featured: false,
    color: '#00b4ff',
    icon: '🎮',
  },
  {
    id: 4,
    title: 'AnimanDex',
    description: 'A modern anime database website with user accounts, anime tracking, and a rank progression system. Built with a dark orange glassmorphism aesthetic and powered by live data from the Jikan API.',
    tech: ['REACT.JS', 'SUPABASE', 'JIKAN API'],
    category: 'Full-Stack',
    demo: 'https://animandexv2.vercel.app',
    github: 'https://github.com/rmndzn/animandexv2',
    featured: false,
    color: '#00b4ff',
    icon: '🎮',
  },
];

const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'AI / SaaS'];

function ProjectCard({ project }) {
  return (
    <div className="glass-card project-card">
      {project.featured && <div className="featured-badge">Featured</div>}

      <div className="project-icon-wrap" style={{ '--card-color': project.color }}>
        <span className="project-icon">{project.icon}</span>
        <div className="project-icon-glow" />
      </div>

      <div className="project-category-tag">{project.category}</div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>

      <div className="project-tech">
        {project.tech.map((t) => (
          <span key={t} className="tech-pill">{t}</span>
        ))}
      </div>

      <div className="project-actions">
        <a href={project.demo} className="project-btn project-btn-demo" target="_blank" rel="noopener noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15,3 21,3 21,9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Live Demo
        </a>
        <a href={project.github} className="project-btn project-btn-github" target="_blank" rel="noopener noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>

      <div className="card-shine" />
    </div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="portfolio-bg-accent" />

      <div className="container">
        {/* Header */}
        <div className="portfolio-header fade-in">
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Selected Work</h2>
          <p className="section-subtitle">A collection of projects I've built — from full-stack apps to design systems and open-source tools.</p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs fade-in delay-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid — key forces remount so animations replay on filter change */}
        <div className="projects-grid" key={activeFilter}>
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="project-card-anim"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="portfolio-cta fade-in">
          <p className="cta-text">Want to see more? Check out my GitHub for all projects.</p>
          <a href="https://github.com/rmndzn" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
