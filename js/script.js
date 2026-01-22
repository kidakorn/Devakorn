/* --- INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // Preloader
    setTimeout(() => {
        document.getElementById('preloader').style.opacity = '0';
        document.getElementById('preloader').style.visibility = 'hidden';
    }, 2000);
});

/* --- PROJECT DATA --- */
const projects = [
    {
        title: "Neon Finance",
        category: "web",
        tags: ["React", "D3.js"],
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Cyberpunk HUD",
        category: "design",
        tags: ["Figma", "After Effects"],
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "HealthTrack AI",
        category: "mobile",
        tags: ["React Native", "AI"],
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "AeroSpace Viz",
        category: "web",
        tags: ["Three.js", "WebGL"],
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    }
];

/* --- RENDER PROJECTS --- */
const projectContainer = document.getElementById('project-container');

function renderProjects(filter = 'all') {
    projectContainer.innerHTML = '';
    projects.forEach(proj => {
        if (filter === 'all' || proj.category === filter) {
            const card = document.createElement('div');
            card.className = 'project-card hover-trigger reveal';
            card.innerHTML = `
                        <div class="card-img"><img src="${proj.img}" alt="${proj.title}"></div>
                        <div class="card-content">
                            <div class="card-tags">${proj.tags.join(' / ')}</div>
                            <h3>${proj.title}</h3>
                            <div class="card-links">
                                <a href="#" style="color:var(--text-main); font-size:0.9rem;">View Case</a>
                                <a href="#" style="color:var(--primary); font-size:0.9rem;"><i data-lucide="github" style="width:16px;"></i></a>
                            </div>
                        </div>
                    `;
            // Add 3D Tilt Event
            card.addEventListener('mousemove', handleTilt);
            card.addEventListener('mouseleave', resetTilt);
            projectContainer.appendChild(card);
        }
    });
    lucide.createIcons();
    observeElements(); // Re-observe new elements
}

renderProjects();

// Filter Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

/* --- 3D TILT LOGIC --- */
function handleTilt(e) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetTilt(e) {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
}

/* --- TYPING ANIMATION --- */
const typingText = document.querySelector('.typing-text');
const roles = ["UI/UX Architect", "Creative Developer", "Tech Visionary"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}
type();

/* --- CUSTOM CURSOR --- */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Small delay for follower
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 50);
});

document.body.addEventListener('mouseover', (e) => {
    if (e.target.closest('.hover-trigger') || e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        document.body.classList.add('hovered');
    } else {
        document.body.classList.remove('hovered');
    }
});

/* --- SCROLL ANIMATIONS --- */
const navbar = document.getElementById('navbar');

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Animate skills if visible
                if (entry.target.querySelector('.progress-fill')) {
                    const bar = entry.target.querySelector('.progress-fill');
                    bar.style.width = bar.getAttribute('data-width');
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.querySelectorAll('.skill-item').forEach(el => observer.observe(el));
}
observeElements();

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

/* --- PARTICLES CANVAS BACKGROUND --- */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() * 1) - 0.5;
        this.speedY = (Math.random() * 1) - 0.5;
        this.color = 'rgba(255, 42, 42, 0.3)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

/* --- THEME TOGGLE --- */
const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', () => {
    document.querySelector('html').classList.toggle('light');
    const icon = document.querySelector('html').classList.contains('light') ? 'moon' : 'sun';
    themeBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
    lucide.createIcons();
});

/* --- FORM HANDLING --- */
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'Sent!';
    btn.style.background = '#25D366'; // Green success
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});
