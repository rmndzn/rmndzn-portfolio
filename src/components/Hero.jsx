import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;
        if (this.life > this.maxLife) this.reset();
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        const fade = this.life < 30 ? this.life / 30 : this.life > this.maxLife - 30 ? (this.maxLife - this.life) / 30 : 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 255, ${this.opacity * fade})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1, i + 6).forEach(p2 => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 180, 255, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Background orbs */}
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />

      {/* Grid overlay */}
      <div className="hero-grid bg-grid" />

      <div className="container hero-content">
        {/* Eyebrow */}
        <div className="hero-eyebrow fade-in">
          <span className="eyebrow-dot" />
          <span>Available for Projects</span>
          <span className="eyebrow-dot" />
        </div>

        {/* Main heading */}
        <h1 className="hero-title fade-in delay-1">
          <span className="title-line">Hi, I'm</span>
          <span className="title-name gradient-text">RMNDZN</span>
        </h1>

        <p className="hero-tagline fade-in delay-2">
          Full Stack Web Developer
        </p>

        <p className="hero-desc fade-in delay-3">
          I craft <strong>modern, performant</strong> digital experiences that blend clean code with bold design. From concept to deployment — pixel-perfect, every time.
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions fade-in delay-4">
          <a href="#portfolio" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span>View My Work</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Let's Talk
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats fade-in delay-5">
          {[
            { value: '3+', label: 'Projects Created' },
          ].map(({ value, label }) => (
            <div key={label} className="stat-item glass">
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line">
          <div className="scroll-dot" />
        </div>
      </div>
    </section>
  );
}
