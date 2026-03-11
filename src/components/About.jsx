import { useState, useEffect, useRef } from 'react';
import './About.css';

const skills = [
  { name: 'React / Next.js', level: 92, color: '#00b4ff' },
  { name: 'TypeScript', level: 85, color: '#0ea5e9' },
  { name: 'Node.js / Express', level: 80, color: '#0066cc' },
  { name: 'UI/UX Design', level: 88, color: '#38bdf8' },
  { name: 'CSS / Tailwind', level: 94, color: '#00b4ff' },
  { name: 'MYSQL / PostreSQL', level: 75, color: '#0284c7' },
];

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Vite', 'Tailwind',
  'MYSQL', 'PostgreSQL', 'Git', 'Figma', 'PHP',
];

function SkillBar({ name, level, color, animate }) {
  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct" style={{ color }}>{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{
            width: animate ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: animate ? `0 0 10px ${color}60` : 'none',
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section about-section" ref={sectionRef}>
      {/* BG accent */}
      <div className="about-bg-accent" />

      <div className="container">
        {/* Header */}
        <div className="section-header fade-in">
          <p className="section-label">About Me</p>
          <h2 className="section-title">The Person Behind<br />the Code</h2>
          <p className="section-subtitle">Passionate about building web experiences that are both technically solid and visually compelling.</p>
        </div>

        <div className="about-grid">
          {/* Profile Card */}
          <div className="about-profile fade-in delay-1">
            <div className="glass-card profile-card">
              {/* Avatar */}
              <div className="profile-avatar-wrap">
                <div className="profile-avatar">
                  <div className="avatar-inner">
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="avatar-svg">
                      <circle cx="40" cy="30" r="16" fill="rgba(0,180,255,0.15)" stroke="rgba(0,180,255,0.4)" strokeWidth="1.5" />
                      <path d="M8 72c0-17.673 14.327-32 32-32s32 14.327 32 32" fill="rgba(0,180,255,0.08)" stroke="rgba(0,180,255,0.3)" strokeWidth="1.5" />
                    </svg>
                    <span className="avatar-initial">RD</span>
                  </div>
                </div>
                <div className="avatar-ring" />
                <div className="avatar-glow" />
              </div>

              {/* Name + title */}
              <div className="profile-info">
                <h3 className="profile-name">RMNDZN</h3>
                <p className="profile-title">Full-Stack Web Developer</p>
                <div className="profile-badge">
                  <span className="badge-dot" />
                  Open to Work
                </div>
              </div>

              {/* Quick facts */}
              <div className="profile-facts">
                {[
                  { icon: '📍', text: 'Cavite, Philippines' },
                  { icon: '🎓', text: 'BSIT Graduate' },
                  { icon: '🌐', text: 'Full-Stack Web Developer' },
                ].map(({ icon, text }) => (
                  <div key={text} className="fact-row">
                    <span className="fact-icon">{icon}</span>
                    <span className="fact-text">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bio + Skills */}
          <div className="about-details">
            {/* Bio */}
            <div className="glass-card bio-card slide-right delay-1">
              <h3 className="bio-heading">Who I Am</h3>
              <p className="bio-text">
                I'm a full-stack web developer with a designer's eye. I specialize in building <strong>modern, responsive</strong> web applications using React, Node.js, and everything in between.
              </p>
              <p className="bio-text">
                I believe great software is both <strong>functionally flawless</strong> and visually delightful. Whether it's a sleek landing page or a complex web app, I bring the same attention to detail to every project.
              </p>
              <p className="bio-text">
                When I'm not coding, I'm exploring design trends, contributing to open source, or experimenting with emerging tech.
              </p>
            </div>

            {/* Skills */}
            <div className="glass-card skills-card slide-right delay-2">
              <h3 className="skills-heading">Core Skills</h3>
              <div className="skill-bars">
                {skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} animate={animated} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="tech-stack-wrap fade-in delay-3">
          <p className="section-label" style={{ justifyContent: 'center', marginBottom: '24px' }}>Tech Stack</p>
          <div className="tech-tags">
            {techStack.map((tech, i) => (
              <span key={tech} className="tech-tag zoom-in" style={{ transitionDelay: `${i * 0.04}s` }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
