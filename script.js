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
    const fadeElems = document.querySelectorAll('.category-card, .alquimia-content, .faq-item, .contact-container, .ingredient-block');
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

    // Animate the Golden Drop Line in the Materials Section
    const goldenDrop = document.querySelector('.golden-drop');
    if (goldenDrop) {
        gsap.to(goldenDrop, {
            top: '100%',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.alquimia-container',
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 1
            }
        });
        gsap.from(goldenDrop, { opacity: 0 });
    }

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

    // Carousel: Navegación por scroll nativo (sin JS translateX para evitar conflictos)
    const initCarousel = () => {
        const container = document.querySelector('.carousel-container');
        if (!container) return;

        const slides = Array.from(container.querySelectorAll('.carousel-item'));
        const nextButton = document.querySelector('.carousel-btn.next-btn');
        const prevButton = document.querySelector('.carousel-btn.prev-btn');

        if (!slides.length) return;

        const scrollToSlide = (index) => {
            const slide = slides[index];
            if (!slide) return;
            // Usar scrollLeft para navegar sin interferir con CSS scroll-snap
            container.scrollTo({
                left: slide.offsetLeft - container.offsetLeft - (container.clientWidth / 2) + (slide.clientWidth / 2),
                behavior: 'smooth'
            });
        };

        let currentIndex = 0;

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = Math.min(currentIndex + 1, slides.length - 1);
                scrollToSlide(currentIndex);
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = Math.max(currentIndex - 1, 0);
                scrollToSlide(currentIndex);
            });
        }

        // Auto-play solo en desktop, usando scroll nativo
        if (window.innerWidth > 768) {
            let autoPlay = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                scrollToSlide(currentIndex);
            }, 5000);
            container.addEventListener('mouseenter', () => clearInterval(autoPlay));
            container.addEventListener('mouseleave', () => {
                autoPlay = setInterval(() => {
                    currentIndex = (currentIndex + 1) % slides.length;
                    scrollToSlide(currentIndex);
                }, 5000);
            });
        }

        // Asegurar que todas las cards sean siempre visibles y clickeables
        slides.forEach(slide => {
            slide.style.opacity = '1';
            slide.style.transform = 'none';
        });
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
