/**
 * KUSTOV SERVICE - Auto Painting Website
 * Interactive JavaScript with Animations
 */

// ========================================
// DOM Elements
// ========================================
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const scrollTopBtn = document.getElementById('scrollTop');
const modalOverlay = document.getElementById('modalOverlay');
const baSlider = document.getElementById('baSlider');
const baHandle = document.getElementById('baHandle');
const contactForm = document.getElementById('contactForm');
const modalForm = document.getElementById('modalForm');

// Spray paint effect
let lastScrollY = window.scrollY;
let sprayTimeout = null;

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initScrollAnimations();
    initCounter();
    initBeforeAfterSlider();
    initPortfolioFilter();
    initReviewsSlider();
    initSmoothScroll();
    initSprayPaintEffect();
    createSprayContainer();
});

// ========================================
// Navbar Scroll Effect
// ========================================
window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll to top button
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// ========================================
// Mobile Menu Toggle
// ========================================
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ========================================
// Particles Animation
// ========================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// ========================================
// Spray Paint Effect Container
// ========================================
function createSprayContainer() {
    const sprayContainer = document.createElement('div');
    sprayContainer.id = 'sprayContainer';
    sprayContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
        overflow: hidden;
    `;
    document.body.appendChild(sprayContainer);
}

// ========================================
// Spray Paint Effect - SIDE VIEW REALISTIC
// ========================================
function initSprayPaintEffect() {
    const sprayGun = document.getElementById('sprayGun');
    const sprayMist = document.getElementById('sprayMist');
    let lastScrollTop = 0;
    let sprayTimeout = null;
    
    // Paint colors for particles
    const paintColors = [
        '#ff6b35', '#ff8c5a', '#e55a2b',
        '#ff4500', '#ff6347', '#ffa500',
        '#ffd700', '#ff1493'
    ];

    // Create spray cone (mist/fog)
    function createSprayCone(x, y, angle) {
        const sprayContainer = document.getElementById('sprayContainer');
        if (!sprayContainer) return;

        const cone = document.createElement('div');
        const coneWidth = Math.random() * 40 + 30;
        const coneLength = Math.random() * 80 + 60;
        
        cone.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${coneLength}px;
            height: ${coneWidth}px;
            background: linear-gradient(90deg, 
                rgba(255, 255, 255, 0.3) 0%, 
                rgba(255, 255, 255, 0.1) 40%, 
                transparent 100%);
            transform-origin: left center;
            transform: rotate(${angle}deg) translateY(-50%);
            filter: blur(4px);
            opacity: 0.6;
            pointer-events: none;
            border-radius: 50%;
        `;
        
        sprayContainer.appendChild(cone);
        
        const animation = cone.animate([
            {
                transform: `rotate(${angle}deg) translateY(-50%) scaleX(1)`,
                opacity: 0.6
            },
            {
                transform: `rotate(${angle + (Math.random() - 0.5) * 10}deg) translateY(-50%) scaleX(1.3)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 400 + 600,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => cone.remove();
    }

    // Create paint stream lines
    function createPaintStream(x, y, angle) {
        const sprayContainer = document.getElementById('sprayContainer');
        if (!sprayContainer) return;

        const streamCount = Math.floor(Math.random() * 3 + 2);
        
        for (let i = 0; i < streamCount; i++) {
            setTimeout(() => {
                const stream = document.createElement('div');
                const streamLength = Math.random() * 60 + 40;
                const streamWidth = Math.random() * 2 + 1;
                const streamAngle = angle + (Math.random() - 0.5) * 15;
                const color = paintColors[Math.floor(Math.random() * paintColors.length)];
                
                stream.className = 'spray-stream';
                stream.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y + (Math.random() - 0.5) * 20}px;
                    width: ${streamLength}px;
                    height: ${streamWidth}px;
                    background: linear-gradient(90deg, 
                        ${color} 0%, 
                        ${color}80 60%, 
                        transparent 100%);
                    transform-origin: left center;
                    transform: rotate(${streamAngle}deg);
                    opacity: 0.8;
                    border-radius: 50%;
                `;
                
                sprayContainer.appendChild(stream);
                
                const animation = stream.animate([
                    {
                        transform: `rotate(${streamAngle}deg) scaleX(1)`,
                        opacity: 0.8
                    },
                    {
                        transform: `rotate(${streamAngle}deg) scaleX(0.5)`,
                        opacity: 0
                    }
                ], {
                    duration: Math.random() * 300 + 400,
                    easing: 'ease-out'
                });
                
                animation.onfinish = () => stream.remove();
            }, i * 30);
        }
    }

    // Create paint droplets
    function createDroplets(x, y, angle) {
        const sprayContainer = document.getElementById('sprayContainer');
        if (!sprayContainer) return;

        const dropletCount = Math.floor(Math.random() * 8 + 5);
        
        for (let i = 0; i < dropletCount; i++) {
            setTimeout(() => {
                const droplet = document.createElement('div');
                const size = Math.random() * 5 + 3;
                const color = paintColors[Math.floor(Math.random() * paintColors.length)];
                const spreadAngle = angle + (Math.random() - 0.5) * 25;
                const distance = Math.random() * 100 + 80;
                
                const radians = spreadAngle * (Math.PI / 180);
                const endX = Math.cos(radians) * distance;
                const endY = Math.sin(radians) * distance;
                
                droplet.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle at 30% 30%, 
                        ${color} 0%, 
                        ${color}cc 60%, 
                        ${color}88 100%);
                    border-radius: 50%;
                    opacity: 0.9;
                    pointer-events: none;
                    box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
                `;
                
                sprayContainer.appendChild(droplet);
                
                const animation = droplet.animate([
                    {
                        transform: 'translate(0, 0) scale(1)',
                        opacity: 0.9
                    },
                    {
                        transform: `translate(${endX}px, ${endY}px) scale(0.4)`,
                        opacity: 0
                    }
                ], {
                    duration: Math.random() * 500 + 700,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                });
                
                animation.onfinish = () => droplet.remove();
            }, i * 40);
        }
    }

    // Create fine mist particles
    function createMistParticles(x, y, angle) {
        const sprayContainer = document.getElementById('sprayContainer');
        if (!sprayContainer) return;

        const particleCount = Math.floor(Math.random() * 15 + 10);
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const size = Math.random() * 3 + 1;
                const color = paintColors[Math.floor(Math.random() * paintColors.length)];
                const spreadAngle = angle + (Math.random() - 0.5) * 30;
                const distance = Math.random() * 150 + 100;
                
                const radians = spreadAngle * (Math.PI / 180);
                const endX = Math.cos(radians) * distance;
                const endY = Math.sin(radians) * distance;
                
                particle.style.cssText = `
                    position: absolute;
                    left: ${x + (Math.random() - 0.5) * 20}px;
                    top: ${y + (Math.random() - 0.5) * 20}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    opacity: 0.7;
                    pointer-events: none;
                    filter: blur(0.5px);
                `;
                
                sprayContainer.appendChild(particle);
                
                const animation = particle.animate([
                    {
                        transform: 'translate(0, 0) scale(1)',
                        opacity: 0.7
                    },
                    {
                        transform: `translate(${endX}px, ${endY}px) scale(0.2)`,
                        opacity: 0
                    }
                ], {
                    duration: Math.random() * 800 + 1200,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                });
                
                animation.onfinish = () => particle.remove();
            }, i * 25);
        }
    }

    // Main spray function
    function createPaintSpray(x, y, angle, intensity = 1) {
        // Create spray cone (visible mist)
        createSprayCone(x, y, angle);
        
        // Create paint streams
        createPaintStream(x, y, angle);
        
        // Create droplets
        createDroplets(x, y, angle);
        
        // Create mist particles
        createMistParticles(x, y, angle);
    }

    // Throttle function
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function(...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime < delay) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    lastExecTime = currentTime;
                    func.apply(this, args);
                }, delay);
            } else {
                lastExecTime = currentTime;
                func.apply(this, args);
            }
        };
    }

    // Scroll event handler
    const handleScroll = throttle(() => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const direction = currentScrollTop > lastScrollTop ? 'down' : 'up';
        const scrollDelta = Math.abs(currentScrollTop - lastScrollTop);
        
        if (scrollDelta > 2) {
            const gunRect = sprayGun ? sprayGun.getBoundingClientRect() : null;
            
            // Get nozzle position (left side of gun since it faces left)
            const sprayX = gunRect ? gunRect.left + 20 : window.innerWidth - 100;
            const sprayY = gunRect ? gunRect.top + 60 : window.innerHeight / 2;
            
            // Angle based on scroll direction
            const baseAngle = direction === 'down' ? -10 : 10;
            const angle = baseAngle + (Math.random() - 0.5) * 15;
            
            const intensity = Math.min(scrollDelta / 15, 4);
            
            // Create spray effect
            createPaintSpray(sprayX, sprayY, angle, intensity);
            
            // Add recoil animation
            if (sprayGun) {
                sprayGun.classList.add('spraying');
                clearTimeout(sprayTimeout);
                sprayTimeout = setTimeout(() => {
                    sprayGun.classList.remove('spraying');
                }, 80);
            }
        }
        
        lastScrollTop = currentScrollTop;
        
        // Move gun based on scroll
        if (sprayGun) {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = currentScrollTop / maxScroll;
            const gunY = 30 + scrollPercent * 60;
            const tilt = direction === 'down' ? -3 : 3;
            sprayGun.style.transform = `translateY(${gunY - 30}px) rotate(${tilt}deg)`;
        }
    }, 20);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Mouse spray (continuous when holding)
    if (window.innerWidth > 768) {
        let isMouseDown = false;
        let sprayInterval = null;
        
        document.addEventListener('mousedown', () => { isMouseDown = true; });
        document.addEventListener('mouseup', () => { 
            isMouseDown = false;
            if (sprayInterval) {
                clearInterval(sprayInterval);
                sprayInterval = null;
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isMouseDown) {
                if (!sprayInterval) {
                    sprayInterval = setInterval(() => {
                        const angle = (Math.random() - 0.5) * 20;
                        createPaintSpray(e.clientX, e.clientY, angle, 0.8);
                    }, 40);
                }
            } else if (Math.random() > 0.9) {
                createPaintSpray(e.clientX, e.clientY, (Math.random() - 0.5) * 10, 0.2);
            }
        });
    }
    
    // Click burst
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                createPaintSpray(
                    e.clientX,
                    e.clientY,
                    (Math.random() - 0.5) * 40,
                    2
                );
            }, i * 60);
        }
    });
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// Counter Animation
// ========================================
function initCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// Before/After Slider
// ========================================
function initBeforeAfterSlider() {
    if (!baSlider || !baHandle) return;

    let isDragging = false;
    const baAfter = baSlider.querySelector('.ba-after');

    // Mouse events
    baHandle.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);

    // Touch events
    baHandle.addEventListener('touchstart', startDrag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', endDrag);

    function startDrag(e) {
        isDragging = true;
        baHandle.style.transition = 'none';
    }

    function drag(e) {
        if (!isDragging) return;

        const rect = baSlider.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

        baAfter.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        baHandle.style.left = percentage + '%';
    }

    function endDrag() {
        isDragging = false;
        baHandle.style.transition = 'all 0.3s ease';
    }

    // BA Controls
    const baControls = document.querySelectorAll('.ba-control');
    const baImages = [
        { before: '🔴', after: '🟢', text: 'Повреждения ЛКП' },
        { before: '🚗', after: '✨', text: 'Вмятина на двери' },
        { before: '🎯', after: '💎', text: 'Царапины на бампере' }
    ];

    baControls.forEach((control, index) => {
        control.addEventListener('click', () => {
            baControls.forEach(c => c.classList.remove('active'));
            control.classList.add('active');

            const beforePlaceholder = baSlider.querySelector('.ba-before .ba-placeholder');
            const afterPlaceholder = baSlider.querySelector('.ba-after .ba-placeholder');
            
            beforePlaceholder.innerHTML = `
                <span class="placeholder-icon">${baImages[index].before}</span>
                <span class="placeholder-text">ДО: ${baImages[index].text}</span>
            `;
            
            afterPlaceholder.innerHTML = `
                <span class="placeholder-icon">${baImages[index].after}</span>
                <span class="placeholder-text">ПОСЛЕ: Идеальное покрытие</span>
            `;

            // Reset slider
            baAfter.style.clipPath = 'inset(0 50% 0 0)';
            baHandle.style.left = '50%';
        });
    });
}

// ========================================
// Portfolio Filter
// ========================================
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioItems.forEach((item, index) => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========================================
// Reviews Slider
// ========================================
function initReviewsSlider() {
    const prevBtn = document.querySelector('.review-nav-btn.prev');
    const nextBtn = document.querySelector('.review-nav-btn.next');
    const reviewCards = document.querySelectorAll('.review-card');
    const dotsContainer = document.querySelector('.review-dots');
    
    if (!prevBtn || !nextBtn || reviewCards.length === 0) return;

    let currentIndex = 0;
    const totalSlides = reviewCards.length;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'review-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.review-dot');

    function updateSlider() {
        reviewCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto play
    setInterval(nextSlide, 5000);

    // Initialize
    updateSlider();
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// Scroll to Top
// ========================================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========================================
// Modal Functions
// ========================================
function openModal(service = '') {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (service) {
        const modalTitle = modalOverlay.querySelector('h2');
        modalTitle.textContent = `Заказать: ${service}`;
    }
}

function closeModal(event) {
    if (!event || event.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ========================================
// Form Submissions
// ========================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
    contactForm.reset();
});

modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Спасибо! Мы перезвоним вам в течение 15 минут.', 'success');
    modalForm.reset();
    closeModal();
});

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${getMessageIcon(type)}</span>
        <p>${message}</p>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'};
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 3000;
        animation: slideInRight 0.5s ease-out;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

function getMessageIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Parallax Effect for Hero
// ========================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.auto-hero');
    const scrolled = window.pageYOffset;
    
    if (hero && scrolled < hero.offsetHeight) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = 0.1 + (index * 0.02);
            particle.style.transform = `translateY(-${scrolled * speed}px)`;
        });
    }
});

// ========================================
// Service Card Hover Effect
// ========================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// Pricing Row Animation
// ========================================
document.querySelectorAll('.pricing-row').forEach((row, index) => {
    row.style.transitionDelay = `${index * 50}ms`;
});

// ========================================
// Console Welcome
// ========================================
console.log('%c🚗 KUSTOV SERVICE', 'font-size: 24px; font-weight: bold; color: #ff6b35;');
console.log('%cПрофессиональная покраска автомобилей', 'font-size: 14px; color: #9ca3af;');
console.log('%cСайт разработан с ❤️', 'font-size: 12px; color: #6b7280;');
