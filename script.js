/* ============================================
   DEVAKORN PORTFOLIO - JAVASCRIPT
   Modern 2026 Interactive Features
   ============================================ */

// ============================================
// PARTICLE BACKGROUND
// ============================================

class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        
        this.resize();
        this.initParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                vx: Math.random() * 0.5 - 0.25,
                vy: Math.random() * 0.5 - 0.25
            });
        }
    }
    
    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let particle of this.particles) {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.fillStyle = `rgba(255, 42, 42, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw lines between nearby particles
            for (let other of this.particles) {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.strokeStyle = `rgba(255, 42, 42, ${0.2 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// TYPING TEXT ANIMATION
// ============================================

class TypingAnimation {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;
        
        this.roles = [
            'Fullstack Developer',
            'Web Developer',
            'UI/UX Enthusiast',
            'Creative Problem Solver',
            'Tech Innovator'
        ];
        
        this.currentRole = 0;
        this.isDeleting = false;
        this.text = '';
        this.charIndex = 0;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.delayBetween = 2000;
        
        this.type();
    }
    
    type() {
        const currentText = this.roles[this.currentRole];
        
        if (!this.isDeleting) {
            this.text = currentText.substring(0, this.charIndex);
            this.element.textContent = this.text;
            this.charIndex++;
            
            if (this.charIndex > currentText.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.delayBetween);
                return;
            }
        } else {
            this.text = currentText.substring(0, this.charIndex);
            this.element.textContent = this.text;
            this.charIndex--;
            
            if (this.charIndex < 0) {
                this.isDeleting = false;
                this.currentRole = (this.currentRole + 1) % this.roles.length;
                this.charIndex = 0;
                setTimeout(() => this.type(), 500);
                return;
            }
        }
        
        const speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        setTimeout(() => this.type(), speed);
    }
}

// ============================================
// NAVIGATION MENU
// ============================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Mobile menu toggle
        this.menuToggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when link is clicked
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Update active link and navbar style on scroll
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    toggleMenu() {
        this.menuToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }
    
    closeMenu() {
        this.menuToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
    
    handleScroll() {
        const scrollPosition = window.scrollY;
        
        // Update navbar styling
        if (scrollPosition > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        let currentSection = '';
        for (const link of this.navLinks) {
            const section = link.getAttribute('data-section');
            const element = document.getElementById(section);
            
            if (element && element.offsetTop <= scrollPosition + 100) {
                currentSection = section;
            }
        }
        
        this.navLinks.forEach(link => {
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('section > .container > *');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        if (index % 2 === 0) {
                            entry.target.classList.add('slide-in-left');
                        } else {
                            entry.target.classList.add('slide-in-right');
                        }
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// ============================================
// SKILL BARS ANIMATION
// ============================================

class SkillBars {
    constructor() {
        this.skillFills = document.querySelectorAll('.skill-fill');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkill(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.skillFills.forEach(fill => observer.observe(fill));
    }
    
    animateSkill(element) {
        const skill = parseInt(element.getAttribute('data-skill'));
        element.style.setProperty('--skill-width', skill + '%');
        element.classList.add('animated');
    }
}

// ============================================
// PROJECT FILTERING
// ============================================

class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }
    
    init() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });
    }
    
    handleFilter(e) {
        const filter = e.target.getAttribute('data-filter');
        
        // Update button states
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        e.target.classList.add('active');
        e.target.setAttribute('aria-pressed', 'true');
        
        // Filter projects
        this.projectCards.forEach(card => {
            const tags = card.getAttribute('data-tags');
            
            if (filter === 'all' || tags.includes(filter)) {
                card.style.display = '';
                setTimeout(() => card.classList.add('scale-in'), 10);
            } else {
                card.style.display = 'none';
                card.classList.remove('scale-in');
            }
        });
    }
}

// ============================================
// CONTACT FORM VALIDATION
// ============================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;
        
        this.inputs = this.form.querySelectorAll('input, textarea');
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        this.inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';
        
        if (!value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email';
            }
        } else if (field.name === 'message' && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters';
        }
        
        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.clearError(field);
        }
        
        return isValid;
    }
    
    showError(field, message) {
        field.classList.add('error');
        const errorEl = document.getElementById(field.id + '-error');
        if (errorEl) {
            errorEl.textContent = message;
        }
    }
    
    clearError(field) {
        field.classList.remove('error');
        const errorEl = document.getElementById(field.id + '-error');
        if (errorEl) {
            errorEl.textContent = '';
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        let isFormValid = true;
        this.inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            this.submitForm();
        }
    }
    
    submitForm() {
        const messageEl = document.getElementById('formMessage');
        
        // Simulate form submission
        messageEl.textContent = 'Sending message...';
        messageEl.className = '';
        
        setTimeout(() => {
            messageEl.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            messageEl.className = 'form-message success';
            
            // Reset form
            this.form.reset();
            
            setTimeout(() => {
                messageEl.textContent = '';
                messageEl.className = '';
            }, 5000);
        }, 1000);
    }
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollToTop');
        if (!this.button) return;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.button.addEventListener('click', () => this.scrollToTop());
    }
    
    handleScroll() {
        if (window.scrollY > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

class LazyLoadImages {
    constructor() {
        if ('IntersectionObserver' in window) {
            this.init();
        }
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            observer.observe(img);
        });
    }
}

// ============================================
// 3D CARD TILT EFFECT
// ============================================

class CardTilt {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleTilt(e, card));
            card.addEventListener('mouseleave', () => this.resetTilt(card));
        });
    }
    
    handleTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.02)
        `;
    }
    
    resetTilt(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
}

// ============================================
// SECTION FADE-IN ON SCROLL
// ============================================

class SectionFadeIn {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        this.sections.forEach(section => {
            section.style.opacity = '0';
            observer.observe(section);
        });
    }
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ParticleBackground('particleCanvas');
    new TypingAnimation('typingText');
    new Navigation();
    new ScrollReveal();
    new SkillBars();
    new ProjectFilter();
    new ContactForm();
    new ScrollToTop();
    new LazyLoadImages();
    new CardTilt();
    new SectionFadeIn();
    new SmoothScroll();
    
    console.log('🚀 DEVAKORN Portfolio loaded successfully!');
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Preload fonts
const link = document.createElement('link');
link.rel = 'preconnect';
link.href = 'https://fonts.googleapis.com';
document.head.appendChild(link);

// Service Worker Registration (optional PWA feature)
if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA features
    // navigator.serviceWorker.register('/sw.js');
}
