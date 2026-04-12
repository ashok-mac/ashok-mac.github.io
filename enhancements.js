// Enhancements for Interactive Animations

// Particle Generation
function createParticles() {
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        document.body.appendChild(particle);
        // Add animation logic here
    }
}

// Scroll-triggered Reveals
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    window.addEventListener('scroll', () => {
        for (const reveal of reveals) {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - 150) {
                reveal.classList.add('active');
            }
        }
    });
}

// Parallax Effect
function initParallax() {
    const layers = document.querySelectorAll('.parallax-layer');
    window.addEventListener('scroll', () => {
        layers.forEach(layer => {
            const depth = layer.getAttribute('data-depth');
            const movement = -(window.scrollY * depth);
            layer.style.transform = `translateY(${movement}px)`;
        });
    });
}

// Mouse Tracking
function initMouseTracking() {
    const mouseX = document.getElementById('mouse-x');
    const mouseY = document.getElementById('mouse-y');
    document.addEventListener('mousemove', (event) => {
        mouseX.textContent = event.clientX;
        mouseY.textContent = event.clientY;
    });
}

// Code Block Line Reveals
function revealCodeLines() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(code => {
        const text = code.textContent.split('\n');
        code.innerHTML = text.map((line, index) => `<span class='line' data-line='${index}'>${line}</span>`).join('');
    });
}

// Hero Title Word Animation
function animateHeroTitle() {
    const title = document.querySelector('.hero-title');
    const words = title.innerText.split(' ');
    title.innerHTML = words.map(word => `<span class='word'>${word}</span>`).join(' ');
    // Add animation logic here
}

// Micro-interactions
function initMicroInteractions() {
    const buttons = document.querySelectorAll('.micro-interaction');
    buttons.forEach(button => {
        button.addEventListener('hover', () => {
            // Add hover effect logic here
        });
    });
}

// Initialize all enhancements
function initEnhancements() {
    createParticles();
    revealOnScroll();
    initParallax();
    initMouseTracking();
    revealCodeLines();
    animateHeroTitle();
    initMicroInteractions();
}

window.onload = initEnhancements;