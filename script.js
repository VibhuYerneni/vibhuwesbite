// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Initial page load animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-loaded');

    // Auto-play chip wires animation after page load (no scroll needed)
    const chipWires = document.querySelector('.chip-wires');
    if (chipWires) {
        // Ensure the chip graphic itself is visible
        chipWires.style.opacity = '1';
        chipWires.style.transform = 'translateY(0)';

        // Slight delay so the chip appears, then branches extend
        setTimeout(() => {
            chipWires.classList.add('active');
        }, 400);
    }
});

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll (keep same blue theme)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(26, 26, 46, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            if (entry.target.classList.contains('animate-translate')) {
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('animate-translate');
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe skills section graphic (fade-in on scroll)
const skillsGraphic = document.querySelector('.skills-graphic');

if (skillsGraphic) {
    skillsGraphic.classList.add('animate-translate');
    skillsGraphic.style.opacity = '0';
    skillsGraphic.style.transform = 'translateY(30px)';
    skillsGraphic.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(skillsGraphic);
}

// Skills video: play only when user scrolls DOWN to the section; lock view for first 5 seconds
(function () {
    const section = document.getElementById('skills');
    const video = section && section.querySelector('video');
    if (!section || !video) return;

    let isLocked = false;
    let unlockTimeout = null;
    let placeholder = null;
    let hasUserScrolled = false;

    window.addEventListener('scroll', () => { hasUserScrolled = true; }, { passive: true });

    const skillsObserver = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.target !== section) continue;
                const ratio = entry.intersectionRatio;
                // Only start when user has scrolled down to the section (not on load)
                if (ratio >= 0.35 && !isLocked && hasUserScrolled) {
                    lock();
                } else if (ratio === 0 && !isLocked) {
                    video.pause();
                }
            }
        },
        { threshold: [0, 0.35] }
    );

    function lock() {
        isLocked = true;
        const height = section.offsetHeight;
        placeholder = document.createElement('div');
        placeholder.className = 'skills-lock-placeholder';
        placeholder.style.height = height + 'px';
        placeholder.setAttribute('aria-hidden', 'true');
        section.parentNode.insertBefore(placeholder, section);

        document.body.classList.add('scroll-locked');
        section.classList.add('is-locked');
        video.play().catch(() => {});

        unlockTimeout = setTimeout(unlock, 5000);
    }

    function unlock() {
        if (unlockTimeout) {
            clearTimeout(unlockTimeout);
            unlockTimeout = null;
        }
        section.classList.remove('is-locked');
        if (placeholder && placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
        }
        placeholder = null;
        document.body.classList.remove('scroll-locked');
        isLocked = false;
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    skillsObserver.observe(section);
})();

// Project links now navigate to individual project pages
// No need to prevent default behavior

// Phone Frame Carousel - Auto-switch every 2 seconds (No Animation)
(function() {
    const carouselTrack = document.getElementById('carouselTrack');
    
    if (!carouselTrack) return;
    
    const images = carouselTrack.querySelectorAll('.carousel-image');
    if (images.length === 0) return;
    
    let currentIndex = 0;
    let autoSwitchInterval = null;
    let isPaused = false;
    
    // Update carousel position - no transition for instant switch
    function updateCarousel() {
        carouselTrack.style.transition = 'none';
        const translateX = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
    }
    
    // Switch to next image
    function switchToNext() {
        if (isPaused) return;
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }
    
    // Auto-switch every 2 seconds
    function startAutoSwitch() {
        if (autoSwitchInterval) {
            clearInterval(autoSwitchInterval);
        }
        isPaused = false;
        autoSwitchInterval = setInterval(switchToNext, 2000);
    }
    
    // Stop auto-switch on hover
    const phoneScreen = document.querySelector('.phone-screen');
    if (phoneScreen) {
        phoneScreen.addEventListener('mouseenter', () => {
            isPaused = true;
            if (autoSwitchInterval) {
                clearInterval(autoSwitchInterval);
                autoSwitchInterval = null;
            }
        });
        phoneScreen.addEventListener('mouseleave', () => {
            isPaused = false;
            startAutoSwitch();
        });
    }
    
    // Initialize
    updateCarousel();
    startAutoSwitch();
    
    // Ensure it keeps running even if something interrupts it
    setInterval(() => {
        if (!isPaused && !autoSwitchInterval) {
            startAutoSwitch();
        }
    }, 1000);
})();

