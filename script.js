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

// Observe skills section text content (chip animation now runs on page load)
const skillsText = document.querySelector('.skills-text');

if (skillsText) {
    skillsText.classList.add('animate-translate');
    skillsText.style.opacity = '0';
    skillsText.style.transform = 'translateY(30px)';
    skillsText.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(skillsText);
}

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

