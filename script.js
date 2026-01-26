// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
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
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

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

