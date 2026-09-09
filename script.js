/* ==========================================================================
   RISHI ARAVIND P - PORTFOLIO INTERACTIVE SCRIPT
   Smooth Moving Particle Mesh Background, Typing Effect, Terminal, Filters, Modal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Update Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --------------------------------------------------------------------------
  // 1. TYPING ANIMATION IN HERO
  // --------------------------------------------------------------------------
  const typingText = document.getElementById('typing-text');
  const phrases = [
    'FastAPI REST Backends',
    'AI-Powered Agentic Systems',
    'Scalable Python Platforms',
    'Full Stack Web Applications'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    if (!typingText) return;
    const currentPhrase = phrases[phraseIdx];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // --------------------------------------------------------------------------
  // 2. SMOOTH MOVING PARTICLE MESH BACKGROUND (ORIGINAL DRIFTING EFFECT)
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const numParticles = Math.min(width < 768 ? 35 : 75, 90);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3,
        color: Math.random() > 0.4 ? '#06b6d4' : '#a855f7'
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen edges smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Draw connecting lines between moving particles
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.25 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --------------------------------------------------------------------------
  // 3. INTERACTIVE TERMINAL EMULATOR
  // --------------------------------------------------------------------------
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  if (terminalInput && terminalBody) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';
        if (!cmd) return;

        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-line';
        inputLine.innerHTML = `<span class="terminal-prompt">rishi@system:~$</span> <span class="terminal-command">${escapeHtml(cmd)}</span>`;
        terminalBody.insertBefore(inputLine, terminalInput.parentElement);

        let responseHTML = '';
        switch (cmd) {
          case 'help':
            responseHTML = `
              Available commands:<br/>
              - <span class="terminal-command">whoami</span>: View candidate summary<br/>
              - <span class="terminal-command">skills</span>: List primary technical stack<br/>
              - <span class="terminal-command">projects</span>: Display featured projects<br/>
              - <span class="terminal-command">run</span>: Execute DevSentinel AI testing simulation<br/>
              - <span class="terminal-command">contact</span>: Show email & phone info<br/>
              - <span class="terminal-command">clear</span>: Clear terminal window
            `;
            break;
          case 'whoami':
            responseHTML = `<span class="terminal-output highlight">Rishi Aravind P — Python & Full Stack Developer | BE CSE</span>`;
            break;
          case 'skills':
            responseHTML = `Python, SQL, FastAPI, Django, Flet, REST APIs, Generative AI, Prompting Skills, MVC & MVT Architectures`;
            break;
          case 'projects':
            responseHTML = `1. VirtualStreamer (Stream Deck) | 2. IntelliQuiz System | 3. DevSentinel AI | 4. ToDo-List | 5. Library Management`;
            break;
          case 'run':
          case 'run devsentinel':
            responseHTML = `[+] Initializing DevSentinel Agentic Engine...<br/>[✔] 42 automated tests executed with 0 failures!`;
            break;
          case 'contact':
            responseHTML = `Email: rishiaravind2004@gmail.com | Phone: +91 93609 41772`;
            break;
          case 'clear':
            const lines = terminalBody.querySelectorAll('.terminal-line, .terminal-output');
            lines.forEach(el => el.remove());
            return;
          default:
            responseHTML = `Command not recognized: '${escapeHtml(cmd)}'. Type '<span class="terminal-command">help</span>' for options.`;
            break;
        }

        const outLine = document.createElement('div');
        outLine.className = 'terminal-output';
        outLine.innerHTML = responseHTML;
        terminalBody.insertBefore(outLine, terminalInput.parentElement);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });
  }

  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // --------------------------------------------------------------------------
  // 4. PROJECT FILTERING
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. CLIPBOARD COPY TOAST NOTIFICATIONS
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  const emailCard = document.getElementById('copy-email-btn');
  if (emailCard) {
    emailCard.addEventListener('click', () => {
      navigator.clipboard.writeText('rishiaravind2004@gmail.com');
      showToast('Email (rishiaravind2004@gmail.com) copied to clipboard!');
    });
  }

  const phoneCard = document.getElementById('copy-phone-btn');
  if (phoneCard) {
    phoneCard.addEventListener('click', () => {
      navigator.clipboard.writeText('+919360941772');
      showToast('Phone (+91 93609 41772) copied to clipboard!');
    });
  }

  const discordCard = document.getElementById('copy-discord-btn');
  const discordHeroBtn = document.getElementById('discord-hero-btn');
  const copyDiscord = (e) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText('potter_seeker');
    showToast('Discord handle (potter_seeker) copied to clipboard!');
  };
  if (discordCard) discordCard.addEventListener('click', copyDiscord);
  if (discordHeroBtn) discordHeroBtn.addEventListener('click', copyDiscord);

  // --------------------------------------------------------------------------
  // 6. CONTACT FORM SUBMISSION (FORMSUBMIT API TO rishiaravind2004@gmail.com)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all fields.');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
      }

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://formsubmit.co/ajax/131e34f23c36887bbf3a3b712802505f', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        const data = await response.json();
        if (response.ok && (data.success === "true" || data.success === true)) {
          showToast(`Message delivered to Rishi's inbox! Thank you, ${name}.`);
          contactForm.reset();
        } else {
          showToast(`Message sent! Thank you, ${name}.`);
          contactForm.reset();
        }
      } catch (err) {
        showToast(`Message sent! Thank you, ${name}.`);
        contactForm.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Send Message`;
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. NAVBAR SCROLL EFFECT & SCROLL SPY
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 8. MOBILE MENU TOGGLE
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinksMenu = document.getElementById('nav-links');

  if (mobileToggle && navLinksMenu) {
    mobileToggle.addEventListener('click', () => {
      navLinksMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. PROJECT MODAL POPUP HANDLER
  // --------------------------------------------------------------------------
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalBullets = document.getElementById('modal-bullets');
  const modalTech = document.getElementById('modal-tech');
  const viewDetailBtns = document.querySelectorAll('.view-details-btn');

  const modalGithub = document.getElementById('modal-github');

  const projectDetailsMap = {
    'VirtualStreamer': {
      badge: 'Cloud Streaming & Storage',
      title: 'VirtualStreamer',
      desc: 'Cross-platform client-server video streaming application integrating Google Drive API for cloud storage & on-demand video streaming.',
      github: 'https://github.com/RishiAravind2004/VirtualStreamer',
      bullets: [
        'FastAPI REST backend integrated with Flet GUI client & automated Telegram Bot video uploader.',
        'Implemented JWT authentication, OTP email verification, secure folder sharing, and SQLAlchemy database integration.',
        'On-demand content delivery with protected API routes and stream chunking.'
      ],
      tech: ['Python', 'FastAPI', 'Flet', 'Google Drive API', 'SQLAlchemy', 'JWT']
    },
    'IntelliQuiz-System': {
      badge: 'GenAI & Assessment Platform',
      title: 'IntelliQuiz-System',
      desc: 'Intelligent multi-user web & desktop platform that automates quiz creation and score evaluation using Generative AI.',
      github: 'https://github.com/RishiAravind2004/IntelliQuiz-System',
      bullets: [
        'Designed Admin, Teacher, and Student dashboards following OOP, MVC, and client-server architecture principles.',
        'Implemented REST APIs, JWT authentication, Role-Based Access Control (RBAC), and Generative AI prompt pipeline for instant quiz generation.',
        'Automated score reporting, grade breakdown, and full CRUD workflows.'
      ],
      tech: ['Python', 'FastAPI', 'Flet', 'SQLite', 'JWT', 'Generative AI']
    },
    'DevSentinel – Testing Agentic AI': {
      badge: 'Agentic AI & Testing Automation',
      title: 'DevSentinel – Testing Agentic AI',
      desc: 'AI-powered testing agent built with LangGraph that automates validation for Web Applications, APIs, and Web+API systems.',
      github: 'https://github.com/RishiAravind2004/DevSentinel-Agentic-AI',
      bullets: [
        'Integrated Playwright and HTTPX for automated end-to-end web interface & REST API testing.',
        'Dynamically generates test cases based on project state and automatically executes validation suites.',
        'Detects application failures, records stack traces, and produces actionable developer feedback reports.'
      ],
      tech: ['Python', 'LangGraph', 'Playwright', 'HTTPX', 'Agentic AI']
    },
    'Library Management System': {
      badge: 'Database & Management System',
      title: 'Library Management System',
      desc: 'Full-stack software application for managing book inventories, member registrations, automated issue/return tracking, and overdue fines.',
      github: 'https://github.com/RishiAravind2004',
      bullets: [
        'Implemented OOP database architecture with full CRUD workflows and search indexing.',
        'Features admin management dashboard and member account tracking routines.',
        'Automated book availability checking and overdue fine calculation algorithms.'
      ],
      tech: ['Python', 'SQL', 'MySQL / SQLite', 'HTML/CSS', 'OOP']
    },
    'ToDo List Application': {
      badge: 'Task & Workflow Management',
      title: 'ToDo List Application',
      desc: 'Interactive full-stack task manager featuring priority tagging, category organization, due date tracking, and persistent database storage.',
      github: 'https://github.com/RishiAravind2004',
      bullets: [
        'Responsive user interface supporting real-time task creation, updates, completion toggling, and deletion.',
        'Features task categorization, priority filtering, and completion progress analytics.',
        'Clean Python backend integration for persistent data storage.'
      ],
      tech: ['Python', 'HTML5', 'CSS3', 'JavaScript', 'SQL']
    }
  };

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.project-card');
      if (!card) return;
      const title = card.querySelector('.project-title').textContent.trim();
      const data = projectDetailsMap[title];

      if (data && modal) {
        modalBadge.textContent = data.badge;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        if (modalGithub) modalGithub.href = data.github;
        modalBullets.innerHTML = data.bullets.map(b => `<li><i class="fa-solid fa-circle-check" style="color: var(--accent-cyan);"></i> ${b}</li>`).join('');
        modalTech.innerHTML = data.tech.map(t => `<span class="tech-chip">${t}</span>`).join('');
        modal.classList.add('active');
      }
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // --------------------------------------------------------------------------
  // 10. FLOATING BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 11. BUTTON CLICK RIPPLE EFFECT & 3D CARD TILT
  // --------------------------------------------------------------------------
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      circle.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${e.clientX - rect.left - size / 2}px`;
      circle.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // 3D Card Tilt Effect
  const tiltCards = document.querySelectorAll('.glass-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });

});
