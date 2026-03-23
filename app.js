/* =============================================
   DHRUVESH SINGH OM — PORTFOLIO JAVASCRIPT
   ============================================= */

(function () {
    'use strict';

    /* ===========================
       PRELOADER
    =========================== */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) preloader.classList.add('hidden');
            initReveal();
        }, 800);
    });

    /* ===========================
       SECTION NAVIGATION
    =========================== */
    function showSection(id) {
        const controls = document.querySelectorAll('.control');
        const sections = document.querySelectorAll('.container');

        sections.forEach(s => s.classList.remove('active'));
        controls.forEach(c => c.classList.remove('active-btn'));

        const target = document.getElementById(id);
        const btn = document.querySelector(`.control[data-id="${id}"]`);

        if (target) target.classList.add('active');
        if (btn) btn.classList.add('active-btn');

        // Trigger progress bars when skills section shown
        if (id === 'skills') animateProgressBars();
        if (id === 'about') animateCounters();
        initReveal();
    }

    // Expose globally for footer buttons & hero links
    window.showSection = showSection;

    document.querySelectorAll('.control').forEach(btn => {
        btn.addEventListener('click', function () {
            showSection(this.dataset.id);
        });
    });

    /* ===========================
       THEME TOGGLE
    =========================== */
    const themeBtn = document.getElementById('theme-btn');
    const body = document.getElementById('body');

    if (themeBtn) {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') {
            body.classList.add('light-mode');
            themeBtn.querySelector('i').className = 'fas fa-sun';
        }

        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            themeBtn.querySelector('i').className = isLight ? 'fas fa-sun' : 'fas fa-moon';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    /* ===========================
       TYPING ANIMATION
    =========================== */
    const typedEl = document.getElementById('typed-text');
    const roles = [
        'Frontend Developer',
        'Data Science Enthusiast',
        'DSA Problem Solver',
        'Java Coder',
        'UI/UX Focused Dev',
        'Hackathon Warrior',
    ];
    let roleIdx = 0, charIdx = 0, isDeleting = false;

    function typeLoop() {
        if (!typedEl) return;
        const current = roles[roleIdx];

        if (isDeleting) {
            typedEl.textContent = current.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typedEl.textContent = current.substring(0, charIdx + 1);
            charIdx++;
        }

        if (!isDeleting && charIdx === current.length) {
            isDeleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
        if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }

        setTimeout(typeLoop, isDeleting ? 60 : 100);
    }

    setTimeout(typeLoop, 1200);

    /* ===========================
       ANIMATED STAT COUNTERS
    =========================== */
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        document.querySelectorAll('.large-text[data-count]').forEach(el => {
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || '';
            let current = 0;
            const step = Math.ceil(target / 40);
            const interval = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = current + suffix;
                if (current >= target) clearInterval(interval);
            }, 40);
        });
    }

    /* ===========================
       PROGRESS BARS
    =========================== */
    let barsAnimated = false;

    function animateProgressBars() {
        if (barsAnimated) return;
        barsAnimated = true;
        document.querySelectorAll('.progress span').forEach(span => {
            const target = span.style.getPropertyValue('--target-width') || span.className === 'html' && '80%';
            if (target) {
                setTimeout(() => { span.style.width = target; }, 100);
            }
        });
    }

    /* ===========================
       SCROLL REVEAL
    =========================== */
    function initReveal() {
        const reveals = document.querySelectorAll('.reveal:not(.revealed)');
        if (!reveals.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, i * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        reveals.forEach(el => observer.observe(el));
    }

    // Initial reveal for home section
    initReveal();

    /* ===========================
       PORTFOLIO FILTER
    =========================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active-filter'));
            this.classList.add('active-filter');

            const filter = this.dataset.filter;
            portfolioItems.forEach(item => {
                const cat = item.dataset.category;
                if (filter === 'all' || cat === filter) {
                    item.classList.remove('hidden-project');
                    item.style.animation = 'sectionAppear 0.4s ease';
                } else {
                    item.classList.add('hidden-project');
                }
            });
        });
    });

    /* ===========================
       TESTIMONIAL CAROUSEL
    =========================== */
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testi-dot');
    let currentTesti = 0;
    let testiTimer;

    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.remove('active-testimonial'));
        dots.forEach(d => d.classList.remove('active-dot'));

        currentTesti = (index + testimonials.length) % testimonials.length;
        testimonials[currentTesti].classList.add('active-testimonial');
        dots[currentTesti].classList.add('active-dot');
    }

    function startTestiTimer() {
        clearInterval(testiTimer);
        testiTimer = setInterval(() => showTestimonial(currentTesti + 1), 5000);
    }

    document.getElementById('testi-next')?.addEventListener('click', () => {
        showTestimonial(currentTesti + 1);
        startTestiTimer();
    });

    document.getElementById('testi-prev')?.addEventListener('click', () => {
        showTestimonial(currentTesti - 1);
        startTestiTimer();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showTestimonial(i);
            startTestiTimer();
        });
    });

    startTestiTimer();

    /* ===========================
       CONTACT FORM
    =========================== */
    const form = document.getElementById('contact-form');

    function getField(id) { return document.getElementById(id); }
    function showError(errId, msg) {
        const el = document.getElementById(errId);
        if (el) el.textContent = msg;
    }
    function clearErrors() {
        ['name-error', 'email-error', 'subject-error', 'message-error'].forEach(id => showError(id, ''));
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            clearErrors();

            const name = getField('form-name');
            const email = getField('form-email');
            const subject = getField('form-subject');
            const message = getField('form-message');
            const success = document.getElementById('form-success');
            let valid = true;

            if (!name.value.trim()) { showError('name-error', 'Name is required.'); valid = false; }
            if (!email.value.trim()) {
                showError('email-error', 'Email is required.'); valid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                showError('email-error', 'Please enter a valid email.'); valid = false;
            }
            if (!subject.value.trim()) { showError('subject-error', 'Subject is required.'); valid = false; }
            if (!message.value.trim()) { showError('message-error', 'Message cannot be empty.'); valid = false; }

            if (valid) {
                // Mailto fallback
                const mailtoLink = `mailto:dhruvesh.singhom@gmail.com?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent('From: ' + name.value + ' (' + email.value + ')\n\n' + message.value)}`;
                window.location.href = mailtoLink;
                if (success) success.textContent = '✅ Opening your mail client… Thank you for reaching out!';
                form.reset();
                setTimeout(() => { if (success) success.textContent = ''; }, 6000);
            }
        });
    }

    /* ===========================
       SCROLL TOP BUTTON
    =========================== */
    const scrollTopBtn = document.getElementById('scroll-top');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        });
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ===========================
       FOOTER COPYRIGHT YEAR
    =========================== */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ===========================
       PARTICLES BACKGROUND
    =========================== */
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        const count = window.innerWidth < 768 ? 10 : 22;

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            const size = Math.random() * 12 + 4;
            p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 18 + 10}s;
        animation-delay: ${Math.random() * 8}s;
      `;
            container.appendChild(p);
        }
    }

    createParticles();

})();
