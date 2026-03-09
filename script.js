document.addEventListener("DOMContentLoaded", () => {

    // 0. VIDEO: Forzar reproducción si el navegador la bloqueó (ej. ahorro de batería)
    document.querySelectorAll('.hero-video-fresh').forEach(vid => {
        // Intento inmediato
        vid.play().catch(() => {
            // Al primer toque del usuario, arrancar
            const onInteract = () => {
                vid.play();
                document.removeEventListener('touchstart', onInteract);
                document.removeEventListener('scroll', onInteract);
            };
            document.addEventListener('touchstart', onInteract, { passive: true });
            document.addEventListener('scroll', onInteract, { passive: true, once: true });
        });
    });

    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.padding = '1rem 5%';
        } else {
            navbar.style.background = 'rgba(3, 3, 3, 0.8)';
            navbar.style.padding = '1.5rem 5%';
        }
    });

    // 3. GSAP ScrollTrigger Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Parallax
    gsap.to(".hero-content", {
        y: "30%",
        opacity: 0,
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Fade In Animations for Sections
    const fadeElems = document.querySelectorAll('.category-card, .alquimia-content, .faq-item, .contact-container');
    fadeElems.forEach(elem => {
        gsap.from(elem, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 4. Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('open');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('open');
            });
        });
    }

    // Carousel Logic
    const initCarousel = () => {
        const track = document.querySelector('.carousel-track');
        if (!track) return;

        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-btn.next');
        const prevButton = document.querySelector('.carousel-btn.prev');

        let currentIndex = 0;

        const updateCarousel = () => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * (slideWidth + 30)}px)`;

            // Opacity and Scale Effect
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.style.opacity = '1';
                    slide.style.transform = 'scale(1)';
                } else {
                    slide.style.opacity = '0.5';
                    slide.style.transform = 'scale(0.9)';
                }
            });
        };

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel();
            });
        }

        // Auto-play
        let autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }, 5000);

        track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        track.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            }, 5000);
        });

        // Initial setup
        updateCarousel();
    };

    initCarousel();

    // Initialize VanillaTilt for cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }
});
