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
