/* ============================================
   TARA SHRI PORTFOLIO — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobile = window.innerWidth <= 768;

  /* --- Custom Cursor --- */
  function initCursor() {
    if (prefersReducedMotion || isTouchDevice || isMobile) {
      document.body.classList.add('no-cursor');
      return;
    }

    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursorTrail');
    const spotlight = document.getElementById('cursorSpotlight');
    if (!cursor || !trail || !spotlight) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      trailX += (mouseX - trailX) * 0.08;
      trailY += (mouseY - trailY) * 0.08;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      trail.style.left = trailX + 'px';
      trail.style.top = trailY + 'px';
      spotlight.style.left = mouseX + 'px';
      spotlight.style.top = mouseY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, input, textarea, .glass-card');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    const buttonTargets = document.querySelectorAll('[data-cursor="button"], .btn, .magnetic-btn');
    buttonTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('button-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('button-hover'));
    });
  }

  /* --- Liquid Purple Glow --- */
  function initLiquidGlow() {
    if (isTouchDevice || prefersReducedMotion) return;

    document.querySelectorAll('.liquid-glow').forEach((el) => {
      let currentX = 50;
      let currentY = 50;
      let targetX = 50;
      let targetY = 50;
      let rafId = null;
      let isHovering = false;

      function tick() {
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;
        el.style.setProperty('--lx', currentX + '%');
        el.style.setProperty('--ly', currentY + '%');

        const settling = Math.abs(currentX - targetX) > 0.05 || Math.abs(currentY - targetY) > 0.05;
        if (isHovering || settling) {
          rafId = requestAnimationFrame(tick);
        } else {
          rafId = null;
        }
      }

      function start() {
        if (!rafId) rafId = requestAnimationFrame(tick);
      }

      el.addEventListener('mouseenter', () => {
        isHovering = true;
        el.style.setProperty('--glow-o', '1');
        start();
      });

      el.addEventListener('mouseleave', () => {
        isHovering = false;
        el.style.setProperty('--glow-o', '0');
        targetX = 50;
        targetY = 50;
        start();
      });

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        targetX = ((e.clientX - rect.left) / rect.width) * 100;
        targetY = ((e.clientY - rect.top) / rect.height) * 100;
        start();
      });
    });
  }

  /* --- Typing Effect --- */
  function initTyping() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const roles = [
      'Information Technology Student',
      'Future Software Developer',
      'Creative Problem Solver'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = roles[roleIndex];

      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 500;
      }

      setTimeout(type, delay);
    }

    type();
  }

  /* --- Stars --- */
  function initStars() {
    const container = document.getElementById('stars');
    if (!container) return;

    const count = prefersReducedMotion ? 30 : 80;
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
      star.style.setProperty('--delay', Math.random() * 5 + 's');
      const size = Math.random() > 0.7 ? 3 : 2;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      container.appendChild(star);
    }
  }

  /* --- Particle Canvas --- */
  function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      const count = Math.min(60, Math.floor(window.innerWidth / 20));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => cancelAnimationFrame(animId);
  }

  /* --- Parallax --- */
  function initParallax() {
    if (prefersReducedMotion || isTouchDevice) return;

    const elements = document.querySelectorAll('[data-parallax]');
    if (!elements.length) return;

    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      elements.forEach((el) => {
        const factor = parseFloat(el.dataset.parallax) || 0.03;
        el.style.transform = `translate(${x * factor * 100}px, ${y * factor * 100}px)`;
      });
    });
  }

  /* --- Navbar --- */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((link) => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach((section) => observer.observe(section));
  }

  /* --- Scroll Reveal --- */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal:not(.stagger)');
    const staggerGroups = document.querySelectorAll('.skills-grid, .projects-grid');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach((el) => observer.observe(el));

    staggerGroups.forEach((group) => {
      const items = group.querySelectorAll('.reveal.stagger');
      if (!items.length) return;

      const staggerObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), i * 120);
          });
          staggerObserver.disconnect();
        }
      }, { threshold: 0.1 });

      staggerObserver.observe(group);
    });
  }

  /* --- Animated Counters --- */
  function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach((counter) => {
            const target = parseInt(counter.dataset.target, 10);
            const duration = 2000;
            const start = performance.now();

            function update(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              counter.textContent = Math.floor(eased * target);
              if (progress < 1) requestAnimationFrame(update);
              else counter.textContent = target + '+';
            }

            requestAnimationFrame(update);
          });
        }
      });
    }, { threshold: 0.5 });

    const grid = document.querySelector('.counters-grid');
    if (grid) observer.observe(grid);
  }

  /* --- Progress Bars --- */
  function initProgressBars() {
    const fills = document.querySelectorAll('.progress-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const progress = fill.dataset.progress;
          fill.style.width = progress + '%';
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.5 });

    fills.forEach((fill) => observer.observe(fill));
  }

  /* --- Contact Form --- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const overlay = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('popupClose');
    const submitBtn = document.getElementById('submitBtn');
    const formError = document.getElementById('formError');
    const submitText = submitBtn?.querySelector('.submit-text');
    const submitLoading = submitBtn?.querySelector('.submit-loading');

    if (!form) return;

    const FORM_ENDPOINT = 'https://formsubmit.co/ajax/tarashri3008@gmail.com';

    form.querySelectorAll('input:not([type="hidden"]), textarea').forEach((input) => {
      input.setAttribute('placeholder', ' ');
    });

    function setLoading(isLoading) {
      if (!submitBtn) return;
      submitBtn.disabled = isLoading;
      submitBtn.classList.toggle('is-loading', isLoading);
      if (submitText) submitText.hidden = isLoading;
      if (submitLoading) submitLoading.hidden = !isLoading;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (formError) formError.hidden = true;

      const honey = form.querySelector('[name="_honey"]');
      if (honey && honey.value) return;

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) return;

      setLoading(true);

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: 'New Portfolio Message — Tara Shri Website',
            _captcha: 'false'
          })
        });

        const data = await response.json();

        if (response.ok && data.success !== false) {
          overlay.classList.add('active');
          form.reset();
        } else if (formError) {
          formError.hidden = false;
        }
      } catch {
        if (formError) formError.hidden = false;
      } finally {
        setLoading(false);
      }
    });

    closeBtn?.addEventListener('click', () => overlay.classList.remove('active'));
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  }

  /* --- Back To Top --- */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Education Section --- */
  function initEducation() {
    const section = document.getElementById('education');
    const titleEl = document.getElementById('educationTitle');
    const particlesContainer = document.getElementById('eduParticles');
    if (!section || !titleEl) return;

    const title = 'Education';
    title.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'edu-letter';
      span.textContent = char;
      span.style.animationDelay = `${i * 0.07}s`;
      titleEl.appendChild(span);
    });

    if (particlesContainer) {
      const count = prefersReducedMotion ? 6 : 12;
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('span');
        particle.className = 'edu-particle';
        particle.style.left = (15 + Math.random() * 70) + '%';
        particle.style.top = (20 + Math.random() * 60) + '%';
        particle.style.setProperty('--float-dur', (3 + Math.random() * 3) + 's');
        particle.style.setProperty('--float-delay', (Math.random() * 2) + 's');
        particle.style.setProperty('--dx', (Math.random() * 16 - 8) + 'px');
        particle.style.setProperty('--dy', (Math.random() * -20 - 5) + 'px');
        particle.style.setProperty('--particle-opacity', (0.2 + Math.random() * 0.4).toString());
        particlesContainer.appendChild(particle);
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add('animated');
          observer.disconnect();
        }
      });
    }, { threshold: 0.35 });

    observer.observe(section);

    if (prefersReducedMotion) {
      section.classList.add('animated');
    }
  }

  /* --- Smooth Anchor Scroll --- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* --- Initialize --- */
  function init() {
    initCursor();
    initLiquidGlow();
    initTyping();
    initStars();
    initParticles();
    initParallax();
    initNavbar();
    initScrollReveal();
    initCounters();
    initProgressBars();
    initContactForm();
    initBackToTop();
    initEducation();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
